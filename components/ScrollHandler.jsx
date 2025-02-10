"use client"; // Needed for hooks in App Router

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollHandler = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [pathname]);

  return null;
};

export default ScrollHandler;
