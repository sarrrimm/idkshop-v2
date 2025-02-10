import { NextResponse } from "next/server";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { timeAgo } from "@/helper/timeCalc";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { cat } = await params;
    if (!cat) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }
    await connectDB();
    const categories = await Category.find({}).sort({ name: 1 }).lean();

    const prods = await Product.find({
      category: { $regex: new RegExp(`^${cat}$`, "i") },
    })
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    const updatedProducts = prods.map((p) => ({
      ...p,
      timeAgo: timeAgo(p.createdAt),
    }));

    return NextResponse.json({ prods: updatedProducts, categories });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
