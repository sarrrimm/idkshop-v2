"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const ProductSearch = ({ products, setFilteredProducts, filteredLength }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, products, setFilteredProducts]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-center w-full mb-3 gap-3">
      <Label htmlFor="product-search" className="text-xl">
        All Products
      </Label>
      <div className="relative w-full sm:max-w-[300px]">
        <Input
          id="product-search"
          className="pr-10"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <span className="text-xs text-muted-foreground">
        Showing {filteredLength} of {filteredLength} products
      </span>
    </div>
  );
};

export default ProductSearch;
