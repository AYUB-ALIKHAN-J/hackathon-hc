import express from "express";
import { searchItems } from "../controllers/itemsController.js";

const router = express.Router();

// Route to search items
router.get("/", searchItems);

export default router;
