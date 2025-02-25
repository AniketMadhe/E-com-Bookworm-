const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    role: {
      type: String,
      enum: { values: ["user", "admin"] },
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
