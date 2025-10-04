import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { signup } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      nav("/");
    } catch (e) {
      setErr(e.message || "Signup failed");
    }
  };

  return (
    <div className="center">
      <div className="card" style={{width:420}}>
        <h2>Create account</h2>
        <p className="muted" style={{marginTop:-6}}>Start managing your products</p>
        {err && <div className="banner" style={{marginTop:10}}>{err}</div>}
        <form onSubmit={onSubmit} className="stack" style={{marginTop:12}}>
          <input className="input" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <div className="actions">
            <button className="btn btn-primary" type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
