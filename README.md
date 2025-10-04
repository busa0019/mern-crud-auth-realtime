# Codveda Full-Stack Showcase (MERN + Auth + Realtime)

This project was built as part of the **Codveda Full-Stack Development Internship**.  
It combines three major tasks into one cohesive application:

1. **Authentication & Authorization (JWT + bcrypt)** – Secure signup/login, role-based access control  
2. **WebSockets (Socket.IO)** – Real-time product notifications  
3. **Full-Stack Application (MERN)** – Products CRUD with protected actions, role-aware updates, and a modern React UI  

---

## 🚀 Quick Start

### 1) Backend
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and client origin
npm install
npm run dev
# server runs at http://localhost:5000
```

Health Check:  
`GET http://localhost:5000/api/health`

### 2) Frontend
```bash
cd ../client
npm install
npm run dev
# app runs at http://localhost:5173
```

---

## ✨ Features

- 🔐 **Auth**: Signup/Login, logout, `/api/auth/me`, HTTP-only cookie + Bearer token supported  
- 👥 **Roles**: `user` (default) and `admin` – only owners/admins can update or delete products  
- 📦 **Products**: Public list/read; create/update/delete require authentication  
- ⚡ **Realtime**: When a product is created, all connected clients see a live banner via Socket.IO  
- 🔒 **Security**: Password hashing, JWT, validation, 401/403 guards  
- 🎨 **Modern UI**: React (Vite) frontend styled with responsive cards, forms, and buttons  

---

## ✅ Submission Checklist (Codveda)

- [x] Code pushed to GitHub (server + client)  
- [x] `.env` ignored, `.env.example` included  

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/signup` → `{ name, email, password, role? }`
- `POST /api/auth/login` → `{ email, password }`
- `GET /api/auth/me` → requires Bearer token or HTTP-only cookie
- `POST /api/auth/logout`

### Products
- `GET /api/products` (public)  
- `GET /api/products/:id` (public)  
- `POST /api/products` (auth required)  
- `PUT /api/products/:id` (auth, owner/admin)  
- `DELETE /api/products/:id` (auth, owner/admin)  

---

## 📝 Notes

- To create an admin quickly, set `"role":"admin"` during signup or update in DB  
- If developing over HTTPS, set `COOKIE_SECURE=true` in `.env`  
- Project intentionally kept clean and minimal for clarity in demos  

---

## 👤 Author

**Faoziyyah  Busari**  
Full-Stack Developer (MERN)    
