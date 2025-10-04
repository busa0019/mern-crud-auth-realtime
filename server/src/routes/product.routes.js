import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
