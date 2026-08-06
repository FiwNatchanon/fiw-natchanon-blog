import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode, isTokenExpired } from "@/lib/jwtDecode";
import {
  clearAuthSession,
  getAuthSession,
  saveAuthSession,
  updateUserPassword as updateUserPasswordStorage,
  updateUserProfile as updateUserProfileStorage,
} from "@/lib/authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      if (token) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        clearAuthSession();
      }
      setState({
        user: null,
        loading: false,
        error: null,
      });
      return null;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const decodedUser = jwtDecode(token);
      const savedUser = getAuthSession();
      const activeUser = decodedUser
        ? { ...savedUser, ...decodedUser }
        : savedUser;

      setState({
        user: activeUser,
        loading: false,
        error: null,
      });
      return activeUser;
    } catch {
      setState({
        user: null,
        loading: false,
        error: null,
      });
      return null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (emailOrData, password) => {
    let loginPayload;
    if (typeof emailOrData === "object" && emailOrData !== null) {
      loginPayload = emailOrData;
    } else {
      loginPayload = { email: emailOrData, password };
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginPayload
      );

      const token =
        response.data.access_token ||
        response.data.accessToken ||
        response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const decoded = token ? jwtDecode(token) : null;
      const userData =
        response.data.user ||
        decoded || {
          email: loginPayload.email,
          name: loginPayload.email?.split("@")[0] || "User",
        };

      saveAuthSession(userData);

      setState({
        user: userData,
        loading: false,
        error: null,
      });

      return { success: true, user: userData, token };
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMsg,
      }));

      return { error: errorMsg };
    }
  };

  const register = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        data
      );

      setState((prevState) => ({ ...prevState, loading: false, error: null }));

      return { success: true, data: response.data };
    } catch (error) {
      const errorData = error.response?.data;
      const errorMsg =
        errorData?.message || errorData?.error || "Registration failed";

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMsg,
      }));

      if (typeof errorData?.error === "string" && errorData?.message) {
        return { error: errorData.error, message: errorData.message };
      }

      return { error: "general", message: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    clearAuthSession();
    setState({
      user: null,
      loading: false,
      error: null,
    });
  };

  const updateProfile = async (profileData) => {
    if (!state.user) {
      return { error: "Not logged in." };
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/user/profile`,
            profileData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const updatedUser =
            res.data.user || { ...state.user, ...profileData };
          saveAuthSession(updatedUser);
          setState({ user: updatedUser, loading: false, error: null });
          return { success: true, user: updatedUser };
        } catch {
          // Fallback to local storage update if backend profile endpoint is unavailable
        }
      }

      const result = updateUserProfileStorage(
        state.user.email,
        profileData
      );

      if (result.success) {
        const updatedUser = getAuthSession();
        setState({ user: updatedUser, loading: false, error: null });
      } else {
        setState((prevState) => ({ ...prevState, loading: false }));
      }

      return result;
    } catch (err) {
      setState((prevState) => ({ ...prevState, loading: false }));
      return { error: err.message };
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    if (!state.user) {
      return { error: "Not logged in." };
    }

    try {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await axios.put(
            `${API_BASE_URL}/user/password`,
            { currentPassword, newPassword },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return { success: true };
        } catch (err) {
          if (err.response?.data?.message) {
            return {
              error: "currentPassword",
              message: err.response.data.message,
            };
          }
        }
      }

      return updateUserPasswordStorage(
        state.user.email,
        currentPassword,
        newPassword
      );
    } catch (err) {
      return { error: err.message };
    }
  };

  const authValue = {
    state,
    user: state.user,
    loading: state.loading,
    error: state.error,
    isLoggedIn: Boolean(state.user),
    isAuthenticated: Boolean(state.user),
    fetchUser,
    getUser: fetchUser,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
