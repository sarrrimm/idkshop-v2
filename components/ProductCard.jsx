import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import FeaturedFlag from "./FeaturedFlag";
import { useWishlist } from "@/context/wishlistContext";
import Image from "next/image";
const ProductCard = ({ product }) => {
  const { wl, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  return (
    <div
      className="relative bg-white rounded-lg shadow group cursor-pointer flex flex-col h-full"
      // onClick={() => router.push(`/products/${product._id}`)}
    >
      {product?.featured ? <FeaturedFlag /> : null}
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-square rounded-t-lg overflow-hidden bg-gray-100">
          <Image
            src={`${product.images[0]}`}
            alt={product.name}
            fill={true}
            quality={100}
            placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start flex-1">
            <div>
              <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 capitalize">
                {product.category}
              </p>
            </div>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 z-50 ${
                  isInWishlist(product._id)
                    ? "fill-red-500  text-red-500"
                    : "fill-none"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  isInWishlist(product._id)
                    ? removeFromWishlist(product._id)
                    : addToWishlist(product);
                }}
              />
              {/* <span className="text-xs">{product.likes}</span> */}
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <p className="font-bold text-teal-600 text-sm sm:text-base">
                Rs {product.price}
              </p>
              <span className="text-xs text-gray-500">{product.timeAgo}</span>
            </div>
            <div className="mt-1 sm:mt-2 relative">
              <span className="inline-block px-2 py-1 text-xs font-medium text-teal-600 bg-teal-50 rounded capitalize">
                {product.condition}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
