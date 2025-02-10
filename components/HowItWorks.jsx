import React from "react";
import { Tag, Truck, Heart } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">List Your Items</h3>
          <p className="text-gray-600">
            Have unique items to sell? List them on our platform and reach
            interested buyers.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">Find Unique Pieces</h3>
          <p className="text-gray-600">
            Discover one-of-a-kind items from sellers in your area.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">Local Pickup</h3>
          <p className="text-gray-600">
            Meet locally for safe item pickup and payment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
