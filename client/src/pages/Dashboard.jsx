import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import ProductForm from "../components/ProductForm.jsx";
import { io } from "socket.io-client";

export default function Dashboard() {
  const { user, API_BASE, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState("");

  useEffect(() => {
    fetch(API_BASE + "/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));

    const socket = io(API_BASE, { transports: ["websocket"], withCredentials: true });
    socket.on("product:created", (p) => {
      setBanner(`New product: ${p.name} ($${p.price})`);
      setProducts((prev) => [p, ...prev]);
      setTimeout(() => setBanner(""), 4000);
    });
    return () => socket.close();
  }, [API_BASE]);

  return (
    <div className="stack">
      <div className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h2 style={{marginBottom:4}}>Dashboard</h2>
          <div className="muted">Welcome, {user?.name} ({user?.role})</div>
        </div>
        <button className="btn btn-ghost" onClick={logout}>Logout</button>
      </div>

      {banner && <div className="banner">{banner}</div>}

      <div className="grid">
        <div className="card">
          <h3>Create Product</h3>
          <ProductForm onCreated={(p)=>setProducts(prev=>[p, ...prev])} />
        </div>

        <div className="card">
          <h3>Products</h3>
          <ul className="products">
            {products.map(p => (
              <li key={p._id || p.id} className="product">
                <div>
                  <div className="name">{p.name}</div>
                  <div className="muted" style={{marginTop:6}}>{p.description}</div>
                </div>
                <div className="price">${p.price}</div>
              </li>
            ))}
            {!products.length && <li className="muted">No products yet—add your first one.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
