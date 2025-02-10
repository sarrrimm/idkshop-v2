import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const categoryCounts = await Product.aggregate([
      { $group: { _id: { $toLower: "$category" }, count: { $sum: 1 } } },
    ]);

    const categoryCountsMap = new Map(
      categoryCounts.map((c) => [c._id, c.count])
    );

    const categories = await Category.find({}).sort({ name: 1 }).lean();

    const updatedCategories = categories.map((cat) => ({
      ...cat,
      count: categoryCountsMap.get(cat.name.toLowerCase()) || 0,
    }));

    return NextResponse.json({ cats: updatedCategories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
