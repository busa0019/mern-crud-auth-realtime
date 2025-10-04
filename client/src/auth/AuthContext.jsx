import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "" );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetch(API_BASE + "/api/auth/me", {
        headers: { Authorization: "Bearer " + token }
      }).then(r => r.json()).then(data => {
        setUser(data.user);
      }).catch(() => setUser(null));
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const r = await fetch(API_BASE + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!r.ok) throw new Error("Login failed");
    const data = await r.json();
    setToken(data.token);
  };

  const signup = async (name, email, password) => {
    const r = await fetch(API_BASE + "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    if (!r.ok) throw new Error("Signup failed");
    const data = await r.json();
    setToken(data.token);
  };

  const logout = async () => {
    await fetch(API_BASE + "/api/auth/logout", {
      method: "POST",
      headers: { Authorization: "Bearer " + token }
    });
    setToken("");
  };

  const value = { token, user, login, signup, logout, API_BASE };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
