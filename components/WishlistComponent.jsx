import { useWishlist } from "@/context/wishlistContext";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const WishlistComponent = ({ isOpen, onClose }) => {
  const { wl, removeFromWishlist, clearWishlist } = useWishlist();
  return (
    <div
      className={`absolute top-0 right-0 h-screen w-[80%] max-w-[350px] bg-white shadow-lg border-l px-6 py-4 z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Your Wishlist</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300">
        {wl.length > 0 ? (
          wl.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-3 rounded-lg shadow-sm"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill={true}
                  quality={100}
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <Link href={`/products/${item._id}`}>
                  <h2 className="font-medium text-gray-900 hover:text-teal-600 line-clamp-2">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600">Rs {item.price}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Heart className="h-5 w-5 fill-current" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-5  ">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishlistComponent;
