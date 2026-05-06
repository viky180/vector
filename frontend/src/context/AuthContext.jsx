import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("skillbridge_token") || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("skillbridge_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("skillbridge_token", token);
    } else {
      localStorage.removeItem("skillbridge_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("skillbridge_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("skillbridge_user");
    }
  }, [user]);

  const login = async (payload) => {
    const data = await apiRequest("/auth/login", { method: "POST", body: payload });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const signup = async (payload) => {
    const data = await apiRequest("/auth/signup", { method: "POST", body: payload });
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const fetchCurrentUser = async () => {
    if (!token) return;
    const me = await apiRequest("/auth/me", { token });
    setUser(me);
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, signup, logout, fetchCurrentUser }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
