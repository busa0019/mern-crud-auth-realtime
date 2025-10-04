import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

export default function ProductForm({ onCreated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const { token, API_BASE } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    
    const cleanPrice = Number(String(price).replace(/[^\d.]/g, ""));
    const r = await fetch(API_BASE + "/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({ name, price: cleanPrice, description }),
    });

    if (!r.ok) {
      const t = await r.json().catch(()=>({message:"Error"}));
      setErr(t.message || "Failed to create");
      return;
    }

    const p = await r.json();
    onCreated?.(p);
    setName(""); setPrice(""); setDescription("");
  };

  return (
    <form onSubmit={onSubmit} className="stack" style={{marginTop:8}}>
      {err && <div className="banner">{err}</div>}
      <input className="input" placeholder="Product name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input className="input" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
      <textarea className="input" placeholder="Description" rows="3" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <div className="actions">
        <button className="btn btn-primary" type="submit">Add Product</button>
      </div>
    </form>
  );
}
