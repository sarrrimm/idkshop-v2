import { timeAgo } from "@/helper/timeCalc";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const searchParams = new URL(req.url).searchParams;

  const featured = searchParams.get("featured") === "1";
  const recent = searchParams.get("recent") === "1";
  const category = searchParams.get("category")?.toLowerCase();
  const sort = searchParams.get("sort") || "newest";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;

  const query = { price: { $gte: minPrice, $lte: maxPrice } };
  if (category && category !== "all") {
    query.category = new RegExp(`^${category}$`, "i");
  }

  const sortOption = { featured: -1 };
  switch (sort) {
    case "oldest":
      sortOption.createdAt = 1;
      break;
    case "priceLow":
      sortOption.price = 1;
      break;
    case "priceHigh":
      sortOption.price = -1;
      break;
    default:
      sortOption.createdAt = -1;
  }

  try {
    const [products, featuredProducts, recentProducts] = await Promise.all([
      Product.find(query).sort(sortOption).lean(),
      featured
        ? Product.find({ featured: true }).limit(4).lean()
        : Promise.resolve([]),
      recent
        ? Product.find().sort({ createdAt: -1 }).limit(4).lean()
        : Promise.resolve([]),
    ]);

    const formattedProducts = products.map((prod) => ({
      ...prod,
      timeAgo: timeAgo(prod.createdAt),
      _id: prod._id.toString(),
    }));

    return NextResponse.json({
      products: formattedProducts,
      featuredProducts: featuredProducts.map((prod) => ({
        ...prod,
        _id: prod._id.toString(),
      })),
      recentProducts: recentProducts.map((prod) => ({
        ...prod,
        _id: prod._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
