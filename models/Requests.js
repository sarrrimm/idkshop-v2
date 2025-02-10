import mongoose from "mongoose";
const ProductRequestSchema = new mongoose.Schema(
  {
    name: String,
    sellerName: String,
    sellerContact: String,
    sellerEmail: String,
    price: Number,
    method: String,
    description: String,
    brand: String,
    model: String,
    material: String,
    category: String,
    condition: String,
    location: { type: String, default: "pakistan" },
    status: { type: String, default: "pending" },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
  },
  { timestamps: true }
);

const ProductRequest =
  mongoose.models.ProductRequest ||
  mongoose.model("ProductRequest", ProductRequestSchema);

export default ProductRequest;
