"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Successful = () => {
  const router = useRouter();
  const orderId = "xyz";
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-[70vh] text-center px-4"
    >
      <CheckCircle className="h-16 w-16 text-teal-600" />
      <h2 className="text-2xl font-bold mt-4">Order Placed Successfully!</h2>
      <p className="text-gray-600 mt-2">
        Thank you for your purchase. Your order ID is{" "}
        <span className="font-semibold">{orderId}</span>.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => router.push(`/orders/${orderId}`)}
          className="border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition"
        >
          Track Order
        </button>
      </div>
    </motion.div>
  );
};

export default Successful;
