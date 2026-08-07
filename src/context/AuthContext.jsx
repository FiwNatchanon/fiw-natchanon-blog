import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  clearAuthSession,
  getAuthSession,
  loginUser,
  registerUser,
  updateUserPassword as updateUserPasswordStorage,
  updateUserProfile as updateUserProfileStorage,
} from "@/lib/authStorage";

const AuthContext = createContext(null);
const SERVER_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("access_token") || "");
  const [loading, setLoading] = useState(false);

  // Restore session from Backend or LocalStorage on app load
  useEffect(() => {
    async function restoreSession() {
      const savedToken = localStorage.getItem("access_token");
      if (savedToken) {
        try {
          const res = await axios.get(`${SERVER_URL}/auth/get-user`, {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          if (res.data) {
            setUser(res.data);
            setToken(savedToken);
            return;
          }
        } catch (err) {
          console.warn("Backend token verification failed:", err);
          localStorage.removeItem("access_token");
        }
      }

      const savedUser = getAuthSession();
      setUser(savedUser);
    }

    restoreSession();
  }, []);

  async function handleRegister(userData) {
    try {
      setLoading(true);
      const res = await axios.post(`${SERVER_URL}/auth/register`, userData);
      setLoading(false);
      if (res.status === 201) {
        return { success: true };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || err.message || "Registration failed";
      
      if (errorMsg.toLowerCase().includes("username")) {
        return { error: "username", message: errorMsg };
      }
      if (errorMsg.toLowerCase().includes("email")) {
        return { error: "email", message: errorMsg };
      }
      
      // Try local storage registration fallback if backend is offline / unreachable
      if (!err.response) {
        return registerUser(userData);
      }

      return { error: "general", message: errorMsg };
    }

    return registerUser(userData);
  }

  async function handleLogin(email, password) {
    try {
      setLoading(true);
      const res = await axios.post(`${SERVER_URL}/auth/login`, { email, password });
      if (res.data?.access_token) {
        const accessToken = res.data.access_token;
        localStorage.setItem("access_token", accessToken);
        setToken(accessToken);

        const userRes = await axios.get(`${SERVER_URL}/auth/get-user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(userRes.data);
        setLoading(false);
        return { success: true, user: userRes.data };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || "Your password is incorrect or this email doesn't exist";
      return { error: errorMsg };
    }

    const result = loginUser(email, password);
    if (result.success) {
      setUser(getAuthSession());
    }
    setLoading(false);
    return result;
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    clearAuthSession();
    setUser(null);
    setToken("");
  }

  async function handleUpdateProfile(profileData, avatarFile = null) {
    if (!user) {
      return { error: "Not logged in." };
    }

    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      try {
        const formData = new FormData();
        formData.append("name", profileData.name);
        formData.append("username", profileData.username);
        if (avatarFile) {
          formData.append("avatar", avatarFile);
        }

        const res = await axios.put(`${SERVER_URL}/profiles`, formData, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data?.user) {
          setUser(res.data.user);
          return { success: true, user: res.data.user };
        }
      } catch (err) {
        console.error("Backend profile update failed:", err);
        const errorMsg = err.response?.data?.error || err.message;
        if (errorMsg?.toLowerCase().includes("username")) {
          return { error: "username", message: errorMsg };
        }
        if (errorMsg?.toLowerCase().includes("email")) {
          return { error: "email", message: errorMsg };
        }
      }
    }

    const result = updateUserProfileStorage(user.email, profileData);
    if (result.success) {
      setUser(getAuthSession());
    }
    return result;
  }

  async function handleUpdatePassword(currentPassword, newPassword) {
    if (!user) {
      return { error: "Not logged in." };
    }

    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      try {
        const res = await axios.put(
          `${SERVER_URL}/auth/reset-password`,
          { oldPassword: currentPassword, newPassword },
          { headers: { Authorization: `Bearer ${savedToken}` } }
        );
        if (res.status === 200) {
          return { success: true };
        }
      } catch (err) {
        if (err.response?.data?.error) {
          return { error: "currentPassword", message: err.response.data.error };
        }
      }
    }

    return updateUserPasswordStorage(user.email, currentPassword, newPassword);
  }

  const authValue = {
    user,
    token,
    loading,
    isLoggedIn: user !== null,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    updatePassword: handleUpdatePassword,
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
