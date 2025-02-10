import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import FeaturedFlag from "./FeaturedFlag";
import Image from "next/image";
import { useWishlist } from "@/context/wishlistContext";
const FeaturedProducts = ({ featuredProducts }) => {
  const { wl, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="featured"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Finds</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
        {featuredProducts.map((item) => (
          <Link href={`/products/${item._id}`} key={item._id}>
            <div className="relative group hover:group cursor-pointer">
              <FeaturedFlag />
              <div className="relative aspect-[4/3] rounded-t-lg overflow-hidden bg-gray-100">
                <Image
                  src={`https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506355/sofa_tti1ps.jpg`}
                  alt={item.name}
                  fill={true}
                  quality={100}
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              {/* bottom-1 sm:bottom-2 left-2 right-2 sm:left-4 sm:right-4 */}
              <div className="relative border top-full w-full bg-white/90 backdrop-blur-sm rounded-b-lg p-2 sm:p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 text-[0.8em] sm:text-[0.9em] md:text-[1em] line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="font-bold text-teal-600 mt-1 text-[0.8em] sm:text-[0.9em] md:text-[1em]">
                      Rs {item.price}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 text-gray-500`}>
                    <Heart
                      className={`h-4 w-4 sm:h-5 sm:w-5 z-50 ${
                        isInWishlist(item._id)
                          ? "fill-red-500  text-red-500"
                          : "fill-none"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        isInWishlist(item._id)
                          ? removeFromWishlist(item._id)
                          : addToWishlist(item);
                      }}
                    />
                    {/* <span className="text-sm sm:text-base text-gray-500">
                      {item.likes}
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
