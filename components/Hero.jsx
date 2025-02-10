import React from "react";
import { ArrowRight, Clock, Star, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = ({ latestProduct }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-teal-50 opacity-70" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-16 pb-16 px-4 sm:px-6 lg:px-8">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="text-teal-600 font-medium text-sm tracking-wide uppercase">
              Every Item Tells a Story
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Discover Unique
              <span className="block text-teal-600">One-of-a-Kind Finds</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              From vintage furniture to rare collectibles, explore our carefully
              curated collection of unique items. Each piece has its own history
              and character.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href={"/products?category=&sort=newest&minPrice=0&maxPrice=0"}
                className="px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                Browse Collection
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={"/sell-with-us"}
                className="px-8 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Sell Your Items
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-3 gap-6 text-gray-600">
              <div className="flex flex-col items-center lg:items-start gap-2 text-sm sm:text-base">
                <Clock className="h-6 w-6 text-teal-600" />
                <span className="font-medium">New Items Daily</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 text-sm sm:text-base">
                <Star className="h-6 w-6 text-teal-600" />
                <span className="font-medium">Curated Selection</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 text-sm sm:text-base">
                <Box className="h-6 w-6 text-teal-600" />
                <span className="font-medium">Local Pickup</span>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506355/sofa_tti1ps.jpg"
                  alt="Vintage furniture"
                  fill={true}
                  quality={100}
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506380/unique_rrv92c.jpg"
                  alt="Collectible item"
                  fill={true}
                  quality={100}
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506382/decor_h2elzw.jpg"
                  alt="Unique decor"
                  fill={true}
                  quality={100}
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506372/thrift_suizbq.jpg"
                  alt="Thrift find"
                  fill={true}
                  quality={100}
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Card */}
            <Link
              href={`/products/${latestProduct._id}`}
              className="absolute -bottom-4 hover:-bottom-2 transition-all -right-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal-600">
                    Latest Add
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {latestProduct?.name}
                  </p>
                </div>
                <p className="text-2xl font-bold text-teal-600">
                  Rs{latestProduct?.price}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
