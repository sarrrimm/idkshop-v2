"use client";
import { useEffect, useState } from "react";
import { Filter, SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { useSearchParams, useRouter } from "next/navigation";
import ProductSearch from "@/components/Search";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State Variables
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || "newest"
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 100000,
  ]);
  const [loading, setLoading] = useState(true);

  const [currentFilters, setCurrentFilters] = useState({
    category: selectedCategory,
    sort: selectedSort,
    priceRange: priceRange,
  });

  const fetchProducts = async (filters) => {
    setLoading(true);
    const query = new URLSearchParams({
      category: filters.category !== "all" ? filters.category : "",
      sort: filters.sort,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
    }).toString();

    const res = await fetch(`/api/products?${query}`);
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);

    router.push(`/products?${query}`, { scroll: false });
  };

  const applyFilters = () => {
    setCurrentFilters({
      category: selectedCategory,
      sort: selectedSort,
      priceRange: priceRange,
    });
  };

  useEffect(() => {
    fetchProducts(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.cats);
    };

    getCategories();
  }, []);

  const categoryOptions = [{ name: "All", _id: "all" }, ...categories];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
  ];

  const handlePriceInputChange = (index, value) => {
    const newValue = Number(value);
    if (!isNaN(newValue)) {
      const newPriceRange = [...priceRange];
      newPriceRange[index] = newValue;
      setPriceRange(newPriceRange);
    }
  };

  return (
    <div className="min-h-screen relative ">
      <Sheet>
        <SheetTrigger asChild>
          <div className="fixed top-20 z-[100] bg-teal-600/50 h-10 w-10 flex items-center justify-center rounded-r-full cursor-pointer">
            <Filter className="text-xs" />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="h-fit top-20 rounded-r-lg pb-10">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-x-2">
              <Filter className="h-5 w-5" /> Sort & Filter
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat._id} value={cat.name.toLowerCase()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium">Price Range (Rs)</label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              step={100}
              className="mt-2"
            />
            <div className="flex justify-between gap-2 mt-2">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceInputChange(0, e.target.value)}
                className="w-full"
                placeholder="Min"
              />
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceInputChange(1, e.target.value)}
                className="w-full"
                placeholder="Max"
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium">Sort By</label>
            <Select
              value={selectedSort}
              onValueChange={(value) => setSelectedSort(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full flex-row gap-2 mt-2">
            <Button
              onClick={applyFilters}
              className="w-full bg-teal-600 hover:bg-teal-600/90"
            >
              Apply Filters
            </Button>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange([0, 1000000]);
                setSelectedSort("newest");
                setCurrentFilters({
                  category: "",
                  sort: "newest",
                  priceRange: [0, 100000],
                });
              }}
              className="w-full border border-teal-600 text-teal-600 bg-white hover:bg-teal-100/60"
            >
              Reset Filters
            </Button>
          </div>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}

            {/* Main Content */}
            <div className="flex-1 lg:pl-[275px">
              <ProductSearch
                products={products}
                setFilteredProducts={setFilteredProducts}
                filteredLength={filteredProducts.length}
              />
              {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 max-w-screen-2xl mx-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500 col-span-full">
                      No products found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
};

export default ProductsPage;
