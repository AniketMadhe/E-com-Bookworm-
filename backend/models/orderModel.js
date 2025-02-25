const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    userAddress: { type: String, required: true },
    status: {
      type: String,
      enum: { values: ["pending", "out for delivery", "canceled"] },
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Order", orderSchema);
