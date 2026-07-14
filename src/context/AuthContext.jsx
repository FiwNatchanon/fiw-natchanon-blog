import { createContext, useContext, useEffect, useState } from "react";
import {
  clearAuthSession,
  getAuthSession,
  loginUser,
  registerUser,
  updateUserPassword,
  updateUserProfile,
} from "@/lib/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // โหลด session จาก localStorage ตอนเปิดเว็บ
  useEffect(() => {
    const savedUser = getAuthSession();
    setUser(savedUser);
  }, []);

  function handleLogin(email, password) {
    const result = loginUser(email, password);

    if (result.success) {
      setUser(getAuthSession());
    }

    return result;
  }

  function handleLogout() {
    clearAuthSession();
    setUser(null);
  }

  function handleUpdateProfile(profileData) {
    if (!user) {
      return { error: "Not logged in." };
    }

    const result = updateUserProfile(user.email, profileData);

    if (result.success) {
      setUser(getAuthSession());
    }

    return result;
  }

  function handleUpdatePassword(currentPassword, newPassword) {
    if (!user) {
      return { error: "Not logged in." };
    }

    return updateUserPassword(user.email, currentPassword, newPassword);
  }

  const authValue = {
    user: user,
    isLoggedIn: user !== null,
    register: registerUser,
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
