import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const categories = await Category.find({}).sort({ name: 1 });
  return NextResponse.json({ categories });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { name, icon } = await body;
  const addedCategory = await Category.create({
    name,
    count: 0,
    icon,
  });
  return NextResponse.json({ msg: "added category", addedCategory });
}
