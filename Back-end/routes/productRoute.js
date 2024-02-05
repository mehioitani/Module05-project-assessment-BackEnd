import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";
import upload from "../middlewares/multerMiddleware.js";
import Protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/products")
  .get(getAllProducts)
  .post(upload.single("image"), Protect, createProduct);

router
  .route("/products/:id")
  .put(upload.single("image"), Protect, updateProduct)
  .delete(Protect, deleteProduct)
  .get(getProductById);

export default router;
