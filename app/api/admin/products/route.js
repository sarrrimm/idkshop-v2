import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { formData } = await body;

  try {
    const addedProduct = await Product.create(formData);
    if (addedProduct) {
      return NextResponse.json({ msg: "Product added" });
    }
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
