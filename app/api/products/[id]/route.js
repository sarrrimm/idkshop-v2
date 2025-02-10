import { timeAgo } from "@/helper/timeCalc";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }
    await connectDB();
    // Fetch product
    const prod = await Product.findById(id).lean();
    if (!prod) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Attach timeAgo
    const product = { ...prod, timeAgo: timeAgo(prod.createdAt) };

    // Fetch similar products
    const similarProducts = await Product.find({
      _id: { $ne: id },
      $or: [
        { category: new RegExp(`^${prod.category}$`, "i") }, // Case-insensitive exact match
        { name: new RegExp(`\\b${prod.name.split(" ")[0]}\\b`, "i") }, // Whole-word match
      ],
    })
      .sort({ featured: -1, createdAt: -1 })
      .limit(4)
      .lean();

    return NextResponse.json({ product, similarProducts });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
