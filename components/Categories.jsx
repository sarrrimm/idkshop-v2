"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { LoadingSkeleton } from "./LoadingSkeleton";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.cats);
        setLoading(false);
      }
    };
    getCategories();
  }, []);
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Browse Categories
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        navigation={{ enabled: true }}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
      >
        {/* className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" */}
        {loading ? (
          <LoadingSkeleton />
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <SwiperSlide
              key={category.name}
              className="bg-white rounded-lg p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <Link
                href={`/categories?category=${category.name.toLowerCase()}`}
              >
                <span className="text-3xl sm:text-4xl mb-2 sm:mb-4 block">
                  {category.icon}
                </span>
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {category.count} items
                </p>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </Swiper>
    </section>
  );
};

export default Categories;
