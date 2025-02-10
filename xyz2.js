"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Filter, Menu, Package, Heart } from "lucide-react";
import FeaturedFlag from "@/components/FeaturedFlag";
import ProductCard from "@/components/ProductCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const CategoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const res = await fetch(`/api/categories`);
  //     const data = await res.json();
  //     console.log(res);
  //     if (res.ok) {
  //       setCategories(data.cats);
  //       setLoading(false);
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch(`/api/categories/${cat}`);
  //     const data = await res.json();
  //     setProducts(data.prods);
  //   };
  //   if (cat) {
  //     fetchProducts();
  //   }
  // }, [cat]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();

        if (res.ok) {
          setCategories(data.cats);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) {
        console.log(categories);

        console.log("Ustaad category shaat hai, undefined");

        return;
      }
      try {
        const res = await fetch(`/api/categories/${category}`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.prods);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category]);
  const handleCategoryChange = (cat) => {
    router.push(`/categories?category=${cat}`);
    setCategory(cat);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Package className="h-5 w-5" /> Categories
              </h2>
              <div className="mt-4">
                <ul className="space-y-1 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:grid-cols-1">
                  {categories.map((cat, i) => (
                    <li
                      key={cat._id}
                      onClick={() => {
                        handleCategoryChange(cat.name.toLowerCase());
                      }}
                    >
                      {/* href={`/categories?category=${i}`} */}
                      <div
                        className={`block px-4 py-2 rounded-lg transition cursor-pointer ${
                          category == cat.name.toLowerCase()
                            ? "bg-teal-600 text-white"
                            : "hover:bg-gray-200 text-gray-900"
                        }`}
                      >
                        <span className="text-lg ">{cat.icon}</span>
                        <span className="text-base ml-2">{cat.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="capitalize text-2xl md:text-3xl my-3 font-semibold">
              Collection
            </h1>
            {category
              ? !loading &&
                products.length === 0 && (
                  <p>No products found for this category </p>
                )
              : setCategory(categories[0].name.toLowerCase())}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
