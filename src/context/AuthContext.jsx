import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearAuthSession,
  getAuthSession,
  loginUser,
  registerUser,
} from "@/lib/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getAuthSession());
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      register: registerUser,
      login: (email, password) => {
        const result = loginUser(email, password);

        if (result.success) {
          setUser(getAuthSession());
        }

        return result;
      },
      logout: () => {
        clearAuthSession();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
