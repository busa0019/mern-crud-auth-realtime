import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) => jwt.sign(
  { id: user._id, email: user.email, role: user.role, name: user.name },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
);

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: role === "admin" ? "admin" : "user" });
    const token = signToken(user);
    res.cookie("token", token, { httpOnly: true, secure: process.env.COOKIE_SECURE === "true", sameSite: "lax", maxAge: 7*24*60*60*1000 });
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.cookie("token", token, { httpOnly: true, secure: process.env.COOKIE_SECURE === "true", sameSite: "lax", maxAge: 7*24*60*60*1000 });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};
