const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const { authenticate, adminAuth } = require("./auth/authenticate");

router.post("/addBook", authenticate, adminAuth, async (req, res) => {
  try {
    const { title, author, price, description, imageUrl } = req.body;
    if (price <= 0) return res.status(400).json("Negative price");
    const book = new Book({ title, author, price, description, imageUrl });
    const savedBook = await book.save();

    if (!savedBook)
      return res.status(400).json("problem while server processing ");
    res.status(201).json("Book created successfully!");
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

router.get("/getAllOrders", authenticate, adminAuth, async (req, res) => {
  try {
    const allOrders = await Order.find().populate({
      path: "bookId",
    });
    if (!allOrders) return res.status(404).json("Orders not found");
    res.status(200).json(allOrders);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.put(
  "/handleOrderStatus/:id",
  authenticate,
  adminAuth,
  async (req, res) => {
    try {
      const id = req.params.id;
      const statusValue = req.body.statusValue;
      const updatedStatus = await Order.findByIdAndUpdate(
        id,
        { status: statusValue },
        { new: true }
      );

      if (!updatedStatus) return res.status(401).json("Invalid credentials");
      res.status(200).json("Status Updated successfully");
    } catch (e) {
      res.status(500).json("Internal server error");
    }
  }
);

router.put(
  "/adminUpdateBook/:id",
  authenticate,
  adminAuth,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, price, description, imageUrl } = req.body;
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, price, description, imageUrl },
        { new: true }
      );
      if (!updatedBook) return res.status(404).json("Invalid credentials");
      res.status(200).json("Book updated Successfully");
    } catch (e) {
      res.status(500).json("Internal server error");
    }
  }
);

router.delete(
  "/adminDeleteBook/:id",
  authenticate,
  adminAuth,
  async (req, res) => {
    const { id } = req.params;
    try {
      const response = await Book.findByIdAndDelete(id);
      if (!response) return res.status(400).json("something went wrong");
      res.status(200).json("Book deleted successfully!");
    } catch (e) {
      res.status(500).json("Internal server error");
    }
  }
);

module.exports = router;
