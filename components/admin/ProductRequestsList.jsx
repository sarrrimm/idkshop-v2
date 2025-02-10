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

export function ProductRequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/admin/productrequests`);
      const data = await res.json();
      setRequests(data.requests);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  const updateFeatured = async (prod) => {
    setLoading(true);
    const res = await fetch(`/api/admin/requests/updatefeatured`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: prod._id,
        featured: !prod.featured,
      }),
    });
    const data = await res.json();
    setLoading(false);

    // router.push(`/admin`, { scroll: false });
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : request.status === statusFilter;
    const matchesFeatured =
      featuredFilter === "all"
        ? true
        : request.featured === (featuredFilter === "featured");
    return matchesSearch && matchesStatus && matchesFeatured;
  });

  const markAsSold = (productId) => {
    setRequests(
      requests.map((request) =>
        request._id === productId
          ? { ...request, status: "sold", quantity: 0 }
          : request
      )
    );
  };

  const toggleFeatured = (productId) => {
    setRequests(
      requests.map((request) =>
        request._id === productId
          ? { ...request, featured: !request.featured }
          : request
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
              placeholder="Search requests..."
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
                All requests
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
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell className="font-medium">
                  <Link href={`/requests/${request._id}`}>{request.name}</Link>
                </TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>{request.price}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      request.status === "in-stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {request.status === "pending"
                      ? "Pending"
                      : request.status === "approved"
                      ? "Approved"
                      : "Declined"}
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={request.featured}
                    // onClick={() => toggleFeatured(request._id)}
                    onClick={() => updateFeatured(request)}
                  />
                  {/* {request.featured ? "Unfeature" : "Feature"} */}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => markAsSold(request._id)}>
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
