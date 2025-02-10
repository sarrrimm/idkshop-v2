"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  Clipboard,
  MapPin,
  ChevronRight,
  CircleCheckBig,
  Truck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useWishlist } from "@/context/wishlistContext";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [similarProducts, setsimilarProducts] = useState([]);
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(await data.product);
        setsimilarProducts(await data.similarProducts);
        setLoading(false);
      }
    };
    getProduct();
  }, [loading]);
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <LoadingSkeleton />
      ) : product ? (
        <div>
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-teal-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />

            <Link
              href={`/categories?category=${product?.category.toLowerCase()}`}
              className="hover:text-teal-600 capitalize"
            >
              {product?.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{product?.name}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card className="border-none">
                <CardContent className="p-0">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product?.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              fill={true}
                              quality={100}
                              placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </CardContent>
              </Card>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2 mx-auto">
                {product?.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-teal-600 transition-colors"
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill={true}
                      quality={100}
                      placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge
                      variant="outline"
                      className="text-teal-600 border-teal-600 capitalize"
                    >
                      {product?.condition} Condition
                    </Badge>
                    {product?.featured ? (
                      <span className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-100 bg-opacity-80 w-fit rounded text-[0.9em] ml-2">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        if (isInWishlist(product._id)) {
                          removeFromWishlist(product._id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                        isInWishlist(product._id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      <Heart
                        className="h-6 w-6"
                        fill={
                          isInWishlist(product._id) ? `currentColor` : "none"
                        }
                      />
                    </button>
                    <Popover>
                      <PopoverTrigger className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                        <Share2 className="h-6 w-6" />
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="text-sm font-medium ">
                          Share this product
                        </p>
                        <span className="text-xs text-muted-foreground mb-2">
                          Thankyou for sharing the product!
                        </span>
                        <div className="flex items-center gap-2">
                          <Input
                            value={window.location.href}
                            readOnly
                            className="flex-1"
                          />
                          <Button
                            onClick={handleCopy}
                            size="icon"
                            variant="ghost"
                          >
                            <Clipboard className="h-5 w-5" />
                          </Button>
                        </div>
                        {copied && (
                          <p className="text-xs text-green-600 mt-2">
                            Copied to clipboard!
                          </p>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-2xl font-bold text-teal-600">
                  {product?.price ? `Rs${product.price}` : "Call for price"}
                </p>
              </div>

              <Separator />

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium capitalize">
                      {product?.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Brand</p>
                    <p className="font-medium capitalize">
                      {product?.brand || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Age/Model</p>
                    <p className="font-medium">{product?.model || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Material</p>
                    <p className="font-medium">{product?.material || "N/A"}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Description
                </h2>
                <p className="text-gray-600">{product?.description}</p>
              </div>

              {/* Seller Info */}
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col gap-y-1">
                      <div className="flex items-center justify-start gap-x-1 text-sm text-gray-900">
                        <CircleCheckBig />
                        Verified & Inspected
                      </div>
                      <div className="flex items-center justify-start gap-x-1 text-sm text-gray-900">
                        <Truck />
                        Delivery Available
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm capitalize">
                        {product?.location || "Pakistan"}
                      </span>
                    </div>
                    <div className="flex gap-x-1 gap-y-2 flex-col md:flex-row">
                      <Button className="bg-teal-100/50 text-teal-600 border-teal-600 hover:bg-teal-50">
                        Contact Support
                      </Button>
                      <Link href={`/buy-now/${product._id}`}>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarProducts.length > 0 ? (
                similarProducts.map((item) => (
                  <ProductCard product={item} key={item._id} />
                ))
              ) : (
                <p>No similar products are available at the moment :/</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
