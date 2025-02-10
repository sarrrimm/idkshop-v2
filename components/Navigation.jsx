"use client";
import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart, User, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/wishlistContext";
import WishlistComponent from "./WishlistComponent";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wlOpen, setWlOpen] = useState(false);
  const { wl, removeFromWishlist, clearWishlist } = useWishlist();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-teal-700/80 text-white shadow-lg w-full sticky top-0 z-[100] backdrop-blur-sm max-w-full">
      <Sheet>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 ">
            {/* Logo and Brand */}
            <div className="flex-shrink-0 flex items-center lg:w-1/4">
              <Link href={"/"} className="text-xl font-semibold">
                CuratedFinds
              </Link>
            </div>

            {/* Desktop & Mobile Menu */}
            <div
              className={`fixed top-[100%] left-0 w-full lg:w-3/4 bg-teal-700/90 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent lg:static flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between p-4 lg:p-0 gap-y-4 transition-all duration-150 ease-in-out ${
                isOpen
                  ? "opacity-100 h-auto"
                  : "opacity-0 h-0 pointer-events-none"
              } lg:opacity-100 lg:h-auto lg:pointer-events-auto`}
            >
              {/* Nav Links */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-8 gap-y-2 lg:pl-2 xl:pl-10">
                <Link
                  href="/products?category=&sort=newest&minPrice=0&maxPrice=0"
                  className="hover:text-teal-200 transition-colors"
                >
                  Browse Collection
                </Link>
                <Link
                  href="/#recent"
                  className="hover:text-teal-200 transition-colors"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/#featured"
                  className="hover:text-teal-200 transition-colors"
                >
                  Featured Items
                </Link>
                <Link
                  href="/sell-with-us"
                  className="hover:text-teal-200 transition-colors"
                >
                  Sell With Us
                </Link>
              </div>

              <SheetTrigger asChild>
                <div className="flex gap-x-1 cursor-pointer">
                  <Heart className="text-xs" /> Wishlist
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Wishlist</SheetTitle>
                  <SheetDescription>
                    Save your favourite items here.
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea
                  type="always"
                  className="h-[70vh] pr-4 pl-3 rounded-sm shadow-md"
                >
                  {wl.length > 0 ? (
                    wl.map((item) => (
                      <div key={item._id} className=" ">
                        <div className="flex w-full items-center gap-x-3 rounded-lg mt-5 ">
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
                              <h2 className="text-xs sm:text-sm font-medium text-gray-900 hover:text-teal-600 line-clamp-1 sm:line-clamp-2">
                                {item.name}
                              </h2>
                            </Link>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Rs {item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <Separator className="mt-3" />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center mt-5  ">
                      Your wishlist is empty.
                    </p>
                  )}
                </ScrollArea>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      type="destructive"
                      className="bg-red-500 hover:bg-red-500/90 mt-10"
                      disabled={!wl.length}
                      onClick={() => {
                        clearWishlist();
                        toast("Wishlist cleared", {
                          closeButton: true,
                          className: "text-teal-600",
                        });
                      }}
                    >
                      Clear Wishlist
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-teal-200 hover:bg-teal-700 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {/* Wishlist Panel */}
          {/* <WishlistComponent isOpen={wlOpen} onClose={() => setWlOpen(false)} /> */}
        </div>
      </Sheet>
    </nav>
  );
};

export default Navbar;
