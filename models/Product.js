import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brand: String,
    model: String,
    material: String,
    category: { type: String, required: true },
    condition: { type: String, required: true },
    featured: { type: Boolean, default: false },
    location: { type: String, default: "pakistan" },
    sold: { type: Boolean, default: false },
    images: [String],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
