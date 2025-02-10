"use client";
import React, { useEffect, useState } from "react";
import RecentProducts from "./RecentProducts";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import HowItWorks from "./HowItWorks";
import JoinCommunity from "./JoinCommunity";
import Hero from "./Hero";
import { LoadingSkeleton } from "./LoadingSkeleton";

const HomePageSections = () => {
  // const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products/?featured=1&recent=1");
      const data = await res.json();
      if (res.ok) {
        setFeatured(data.featuredProducts);
        setRecent(data.recentProducts);
        setLoading(false);
      } else if (!res.ok) {
        return <h1>Something went wrong!</h1>;
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }
  return recent.length === 0 ? (
    "Something went wrong"
  ) : (
    <div className="bg-white">
      {recent.length > 0 && <Hero latestProduct={recent[0]} />}
      <RecentProducts recentItems={recent} />

      <Categories />

      {featured.length > 0 && <FeaturedProducts featuredProducts={featured} />}
      <HowItWorks />

      <JoinCommunity />
    </div>
  );
};

export default HomePageSections;
