"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { LoadingSkeleton } from "../LoadingSkeleton";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  const updateFeatured = async (prod) => {
    setLoading(true);
    // const res = await fetch(`/api/admin/products/updatefeatured`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: prod._id,
    //     featured: !prod.featured,
    //   }),
    // });
    // const data = await res.json();
    setLoading(false);

    // router.push(`/admin`, { scroll: false });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : product.status === statusFilter;
    const matchesFeatured =
      featuredFilter === "all"
        ? true
        : product.featured === (featuredFilter === "featured");
    return matchesSearch && matchesStatus && matchesFeatured;
  });

  const markAsSold = (productId) => {
    setProducts(
      products.map((product) =>
        product._id === productId
          ? { ...product, status: "sold", quantity: 0 }
          : product
      )
    );
  };

  const toggleFeatured = (productId) => {
    setProducts(
      products.map((product) =>
        product._id === productId
          ? { ...product, featured: !product.featured }
          : product
      )
    );
  };
  if (loading) return <LoadingSkeleton />;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Products
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("in-stock")}>
                In Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("sold")}>
                Sold
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFeaturedFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFeaturedFilter("featured")}>
                Featured
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFeaturedFilter("not-featured")}
              >
                Not Featured
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  <Link href={`/products/${product._id}`}>{product.name}</Link>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === "in-stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.status === "in-stock" ? "In Stock" : "Sold"}
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={product.featured}
                    // onClick={() => toggleFeatured(product._id)}
                    onClick={() => updateFeatured(product)}
                  />
                  {/* {product.featured ? "Unfeature" : "Feature"} */}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => markAsSold(product._id)}>
                        Mark as sold
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
