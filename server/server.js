import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server as SocketIOServer } from "socket.io";

import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
  }
});

// Attach io to app for use in controllers
app.set("io", io);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Socket.IO
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

// DB + Server
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server listening on :${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
