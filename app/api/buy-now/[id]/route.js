import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const {
    name,
    email,
    phone,
    address,
    city,
    notes,
    deliveryMethod,
    totalAmount,
  } = await body;
  if (!name || !deliveryMethod || !totalAmount || !email || !phone) {
    return NextResponse.json({ msg: "Incomplete details" }, { status: 400 });
  }
  try {
    await connectDB();

    // const prod = await Product.findByIdAndUpdate(id, { $set: { sold: true } });
    const prod = await Product.findById(id);
    if (!prod) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    const order = await Order.create({
      name,
      orderType: deliveryMethod,
      totalAmount,
      email,
      contact: phone,
      productId: id,
      notes,
      address,
      city,
    });

    if (order) {
      const product = await Product.findByIdAndUpdate(id, {
        $set: { sold: true },
      });
      const { data, error } = Resend.emails.send({
        from: "CuratedFinds <onboarding@resend.dev>",
        to: ["sarim.accp@gmail.com"],
        subject: "New Order Recieved",
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Recieved</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
              }
              .header {
                  text-align: center;
                  padding: 10px;
              }
              .header h1 {
                  font-size: 24px;
                  color: #333;
              }
              .content {
                  margin-top: 20px;
              }
              .content p {
                  font-size: 16px;
                  color: #333;
              }
              .content ul {
                  list-style-type: none;
                  padding: 0;
              }
              .content ul li {
                  margin: 8px 0;
              }
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 14px;
                  color: #777;
              }
              .images img {
                  width: 100%;
                  max-width: 300px;
                  margin: 10px 0;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>New Product Request</h1>
              </div>
              <div class="content">
                  <ul>
                      <li><strong>Buyer Name:</strong> ${order?.name}</li>
                      <li><strong>Product Id:</strong> ${order?.productId}</li>
                      <li><strong>Order Type:</strong> ${order?.orderType}</li>
                      <li><strong>Total Amounr:</strong> ${order?.totalAmount}</li>
                      <li><strong>Address:</strong> ${order?.address}</li>
                      <li><strong>City:</strong> ${order?.city}</li>
                      <li><strong>Email:</strong> ${order?.email}</li>
                      <li><strong>Contact:</strong> ${order?.contact}</li>
                  </ul>
              </div>
              <div class="footer">
              </div>
          </div>
      </body>
      </html>
      `,
      });
      if (error) {
        return Response.json({ status: 500 });
      }
      return NextResponse.json({
        msg: "Order created successfully",
        order,
        product,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }

  return NextResponse.json({ msg: "Order Created", bodyy: body });
}
