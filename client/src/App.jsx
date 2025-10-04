import React from "react";
import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="nav">
        <div className="nav-inner">
          <div className="brand"><Link to="/" style={{textDecoration:"none", color:"inherit"}}>Codveda Full-Stack</Link></div>
          <div>
            <NavLink to="/" className={({isActive})=> isActive ? "active" : undefined}>Dashboard</NavLink>
            <NavLink to="/login" className={({isActive})=> isActive ? "active" : undefined}>Login</NavLink>
            <NavLink to="/signup" className={({isActive})=> isActive ? "active" : undefined}>Signup</NavLink>
          </div>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
