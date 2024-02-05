import Product from "../models/productModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// GET all Products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "products retrieved successfully",
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to retrieve products",
      status: 500,
      data: null,
    });
  }
});

// GET a single Product
const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "not a valid ID",
        status: 404,
        data: null,
      });
    }
    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "product retrieved successfully",
      status: 200,
      data: singleProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to retrieve the requested product",
      status: 500,
      data: null,
    });
  }
});

// CREATE a new Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const image = req.file?.path;

    const { title, price, description } = req.body;
    if (!title || !price || !description || !image) {
      res.status(404).json({
        success: false,
        message: "please add all fields",
        status: 404,
        data: null,
      });
    } else {
      const newProduct = await Product.create({ ...req.body, image: image });
      res.status(201).json({
        success: true,
        message: "product created successfully",
        status: 200,
        data: newProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "failed to create Product",
      status: 500,
      data: null,
    });
  }
});

// UPDATE a Product
const updateProduct = asyncHandler(async (req, res) => {
  let image;
  if (req.file) {
    image = req.file.path;
  }

  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "not a valid ID",
        status: 404,
        data: null,
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
        status: 404,
        data: null,
      });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: image },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "product updated successfully",
        status: 200,
        data: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update the requested product",
      status: 500,
      data: null,
    });
  }
});

// DELETE a Product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "not a valid ID",
        status: 404,
        data: null,
      });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
        status: 404,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "product deleted successfully",
        status: 200,
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete the requested product",
      status: 500,
      data: null,
    });
  }
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
