const express = require("express");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePasswords,
  authenticate,
} = require("./auth/authenticate");
const { populate } = require("dotenv");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("welocme jjjj");
});
router.get("/welcome", authenticate, async (req, res) => {
  const userDetails = await User.findById(req.user.id);
  res.status(200).json(userDetails);
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, pin } = req.body;
    if (username.length < 5)
      return res.status(400).json({
        message: "Username length should be greater than 5 characters",
      });
    if (password.length < 5)
      return res.status(400).json({
        message: "password length should be greater than 5 characters",
      });

    const fullAddress = `${address}, - ${pin}`;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address: fullAddress,
    });
    await newUser.save();
    res.status(201).json("User registered successfully");
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json("User not found");
    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) return res.status(401).json("Incorrect credentials");
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      `${process.env.SEC_KEY}`,
      { expiresIn: "15d" }
    );

    if (!token) return res.status(500).json("failed to generate token");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json("Ho gaya logout");
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error");
  }
});

router.get("/getBooks", authenticate, async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (!allBooks) return res.status(404).json("Books not found");
    res.status(200).json(allBooks);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

{
  /**route for books when user not logged In */
}
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) return res.status(404).json("Books not found");
    res.status(200).json(books);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.get("/getBook/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json("Book not found");
    res.status(200).json(book);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.post("/addToCart", authenticate, async (req, res) => {
  try {
    const { bookId } = req.body;
    const fetchedBook = await Book.findById(bookId);
    if (!fetchedBook) return res.status(404).json("Book not found");
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { cart: bookId } },
      { new: true }
    );
    if (updatedUser) {
      return res.status(200).json("Book added to cart successfully");
    }

    res.status(200).json("Cart array");
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
});

router.post("/cartBookRemove", authenticate, async (req, res) => {
  try {
    const { bookId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { cart: bookId } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json("User not found!");
    res.status(200).json("Book removed from cart");
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
});

router.get("/getCartBooks", authenticate, async (req, res) => {
  try {
    const cartBooks = await User.findById(req.user.id).populate("cart");
    if (!cartBooks) return res.status(404).json("No books found");
    res.status(200).json(cartBooks);
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
});

router.post("/handleOrder", authenticate, async (req, res) => {
  try {
    const email = req.user.email;
    const { cartBooks, userAddress } = req.body;
    if (!cartBooks || cartBooks.length === 0)
      return res.status(400).json("Cart is empty, cannot place order");
    const bookId = cartBooks.map((book) => book._id);
    const order = new Order({ email, bookId: bookId, userAddress });
    const newOrder = await order.save();
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { orders: newOrder._id }, $set: { cart: [] } },
      { new: true }
    );
    res.status(201).json({ message: "Order successful", newOrder });
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.get("/orderHistory", authenticate, async (req, res) => {
  try {
    const userOrder = await User.findById(req.user.id).populate({
      path: "orders",
      populate: {
        path: "bookId",
        model: "Book",
      },
    });
    if (!userOrder) return res.status(404).json("User not found!");
    res.status(200).json(userOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
});

router.put("/updateUserAddress/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { userAddress } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { address: userAddress },
      { new: true }
    );
    if (!user) return res.status(401).json("Invalid credentials");
    res.status(200).json("User address updated successfully!");
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
