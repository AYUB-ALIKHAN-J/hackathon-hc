import express from "express";
import { searchProducts } from "../controllers/productController.js";

const router = express.Router();

// Route for searching products
router.get("/", searchProducts);

export default router;
