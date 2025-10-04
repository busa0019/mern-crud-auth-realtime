import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  };

  return (
    <div className="center">
      <div className="card" style={{width:420}}>
        <h2>Welcome back</h2>
        <p className="muted" style={{marginTop:-6}}>Log in to your dashboard</p>
        {err && <div className="banner" style={{marginTop:10}}>{err}</div>}
        <form onSubmit={onSubmit} className="stack" style={{marginTop:12}}>
          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <div className="actions">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
