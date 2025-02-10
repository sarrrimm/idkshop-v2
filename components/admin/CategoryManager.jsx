"use client";
import React, { useEffect, useState } from "react";
import { LoadingSkeleton } from "../LoadingSkeleton";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data.cats);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  if (loading) return <LoadingSkeleton />;

  return (
    <div>
      <>{categories?.length}</>
    </div>
  );
};

export default CategoryManager;
