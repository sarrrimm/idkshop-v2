"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { toast } from "sonner";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wl, setWl] = useState([]);
  useEffect(() => {
    const loadWl = async () => {
      const savedWl = await localStorage.getItem("wl");
      if (savedWl) {
        setWl(JSON.parse(savedWl));
      }
    };
    loadWl();
  }, []);
  useEffect(() => {
    const updateWl = async () => {
      localStorage.setItem("wl", JSON.stringify(wl));
    };
    updateWl();
  }, [wl]);
  const addToWishlist = (item) => {
    setWl((prevWl) => {
      const updatedWishlist = [...prevWl, item];
      return updatedWishlist;
    });
    toast.info("Item added to wishlist.", {
      closeButton: true,
      className: "text-teal-600",
    });
  };
  const removeFromWishlist = (itemId) => {
    setWl((prev) => {
      const updatedWishlist = prev.filter(
        (x) => x._id.toString() !== itemId.toString()
      );
      return updatedWishlist;
    });
    toast.info("Item removed from wishlist.", {
      closeButton: true,
      className: "text-teal-600",
    });
  };
  const clearWishlist = () => {
    setWl([]);
  };
  const isInWishlist = (id) => {
    const item = wl.find((x) => x._id == id);
    if (item) return true;
    return false;
  };
  return (
    <WishlistContext.Provider
      value={{
        wl,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
