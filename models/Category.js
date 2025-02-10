import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    name: String,
    count: Number,
    icon: String,
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
