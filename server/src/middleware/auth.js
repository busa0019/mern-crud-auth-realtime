import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const bearer = req.headers.authorization || "";
    const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : (req.cookies?.token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
