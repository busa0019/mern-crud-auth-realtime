import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, createdBy: req.user.id });
    // Emit realtime event
    const io = req.app.get("io");
    io.emit("product:created", { id: product._id, name: product.name, price: product.price, createdAt: product.createdAt });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ message: "Invalid product data" });
  }
};

export const listProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  return res.json(products);
};

export const getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  return res.json(p);
};

export const updateProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  // Only owner or admin can update
  if (String(p.createdBy) !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  Object.assign(p, req.body);
  await p.save();
  return res.json(p);
};

export const deleteProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  if (String(p.createdBy) !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  await p.deleteOne();
  return res.json({ message: "Deleted" });
};
