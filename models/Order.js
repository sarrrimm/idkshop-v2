import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    orderType: String,
    productId: { type: mongoose.Schema.ObjectId, ref: "Products" },
    totalAmount: Number,
    orderStatus: String,
    notes: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    email: String,
    contact: String,
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
