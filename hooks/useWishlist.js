import { useState, useEffect } from "react";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(async () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    if (!wishlist.some((w) => w._id === item._id)) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter((item) => item._id !== itemId));
  };

  const isInWishlist = (itemId) => wishlist.some((item) => item._id === itemId);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};

export default useWishlist;
