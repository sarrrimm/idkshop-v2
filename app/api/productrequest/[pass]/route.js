import { connectDB } from "@/lib/db";
import ProductRequest from "@/models/Requests";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
const uploadToCloudinary = async (file, productName, index) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const sanitizedProductName = productName.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to dashes
    const uniqueId = Date.now(); // Ensure unique filenames
    const publicId = `product-submissions/${sanitizedProductName}-${index}-${uniqueId}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "product-submissions", // Organize uploads
        public_id: publicId, // Custom filename
        overwrite: true, // Avoid duplicate names
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    uploadStream.end(buffer);
  });
};

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const sellerData = JSON.parse(formData.get("sellerData"));
    const productData = JSON.parse(formData.get("productData"));
    const method = formData.get("method");
    const productName = productData.name || "product";
    // const pass = JSON.parse(formData.get("pass"));
    const files = formData.getAll("images");

    // console.log(pass);

    const uploadPromises = files.map((file, index) =>
      uploadToCloudinary(file, productName, index)
    );
    const uploadedImages = await Promise.all(uploadPromises);

    const finalData = {
      ...sellerData,
      ...productData,
      status: "pending",
      method,
      images: uploadedImages.map((img) => ({
        url: img.secure_url,
        publicId: img.public_id,
      })),
    };
    const { data, error } = resend.emails.send({
      from: "CuratedFinds <onboarding@resend.dev>",
      to: ["sarim.accp@gmail.com"],
      subject: "New Product Request",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Submission Confirmation</title>
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
                <p>Dear ${finalData.sellerName},</p>
                <p>Thank you for submitting your product. Here's a summary of the details:</p>
                <ul>
                    <li><strong>Product Name:</strong> ${finalData.name}</li>
                    <li><strong>Description:</strong> ${finalData.description}</li>
                    <li><strong>Price:</strong> ${finalData.price}</li>
                    <li><strong>Category:</strong> ${finalData.category}</li>
                    <li><strong>Brand:</strong> ${finalData.brand}</li>
                    <li><strong>Condition:</strong> ${finalData.condition}</li>
                    <li><strong>Model:</strong> ${finalData.model}</li>
                    <li><strong>Material:</strong> ${finalData.material}</li>
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
    const request = await ProductRequest.create(finalData);

    return NextResponse.json(
      {
        message: "Item submitted successfully",
        data: request,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      {
        message: "Error processing submission",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
