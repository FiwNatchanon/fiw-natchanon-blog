import { createContext, useContext, useEffect, useState } from "react";
import {
  clearAuthSession,
  getAuthSession,
  loginUser,
  registerUser,
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

  const authValue = {
    user: user,
    isLoggedIn: user !== null,
    register: registerUser,
    login: handleLogin,
    logout: handleLogout,
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
