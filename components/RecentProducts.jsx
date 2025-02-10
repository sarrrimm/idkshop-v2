import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FeaturedFlag from "./FeaturedFlag";
import ProductCard from "./ProductCard";
const RecentProducts = ({ recentItems }) => {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="recent"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
        <Link
          href="/products?category=&sort=newest&minPrice=0&maxPrice=0"
          className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
        >
          View All
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      {/* Updated grid to show 2 columns on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {recentItems.map((item) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </section>
  );
};

export default RecentProducts;
