"use client";

import CategoryManager from "@/components/admin/CategoryManager";
import ProductAddForm from "@/components/admin/ProductAddForm";
import { ProductRequestList } from "@/components/admin/ProductRequestsList";
import { ProductList } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const SECRET_PASSWORD = "my-admin-pass";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [currentForm, setCurrentForm] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      sessionStorage.setItem("isAdmin", "true");
      setAuthorized(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin"); // Remove session on logout
    setAuthorized(false);
  };
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName, icon: categoryIcon }),
    });
    if (res.ok) {
      setCategoryName("");
      setCategoryIcon("");
      setShowCategoryModal(false);
      toast.success(`Category added`, {
        closeButton: true,
        className: "text-teal-600",
      });
    }
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold mb-4">Enter Admin Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded px-4 w-64"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white p-2 rounded px-4"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="mb-4">Welcome to the admin panel!</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] container mx-auto gap-2">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded px-4 h-12 w-full text-xs sm:text-sm max-w-[300px]"
          >
            Logout
          </button>
          <button
            onClick={() => {
              setCurrentForm("products");
            }}
            className="bg-blue-500 text-white p-2 rounded px-4 h-12 w-full text-xs sm:text-sm max-w-[300px]"
          >
            Add Products
          </button>
          <button
            onClick={() => {
              setCurrentForm("requests");
            }}
            className="bg-blue-500 text-white p-2 rounded px-4 h-12 w-full text-xs sm:text-sm max-w-[300px]"
          >
            Manage Product Requests
          </button>
          <button
            onClick={() => {
              setCurrentForm("orders");
            }}
            className="bg-blue-500 text-white p-2 rounded px-4 h-12 w-full text-xs sm:text-sm max-w-[300px]"
          >
            Manage Orders
          </button>
          <button
            onClick={() => {
              setShowCategoryModal(true);
            }}
            className="bg-blue-500 text-white p-2 rounded px-4 h-12 w-full text-xs sm:text-sm max-w-[300px]"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Category Modal */}
      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Name</Label>
              <Input
                id="category"
                type="text"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Enter category icon"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="min-h-screen">
        {currentForm == "products" ? (
          <ProductAddForm />
        ) : currentForm == "requests" ? (
          <ProductRequestList />
        ) : currentForm == "orders" ? (
          "orders"
        ) : (
          "Choose form"
        )}
      </div>
    </div>
  );
};

export default AdminPage;
