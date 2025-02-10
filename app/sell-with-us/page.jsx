"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Lock,
  Upload,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import ProductForm from "@/components/ProductForm";
import MultiStepForm from "@/components/MultiStepForm";

const SellWithUsPage = () => {
  const [selectedOption, setSelectedOption] = useState("direct");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    method: "direct",
    category: "",
    description: "",
    brand: "",
    condition: "",
    model: "",
    material: "",
    images: [],
  });

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-teal-600 font-medium text-sm tracking-wide uppercase">
              Turn Your Items into Profit
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Sell With Confidence
              <span className="block text-teal-600">Choose Your Way</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you want instant payment or flexible terms, we make
              selling your items simple, secure, and profitable.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <RadioGroup
          value={selectedOption}
          onValueChange={(e) => {
            setSelectedOption(e);
          }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Direct Purchase Option */}
          <label htmlFor="direct" className="relative group cursor-pointer">
            <RadioGroupItem id="direct" value="direct" className="hidden" />
            <Card
              className={`relative h-full bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-2 ${
                selectedOption === "direct"
                  ? "border-teal-600 shadow-md"
                  : "border-teal-100"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <DollarSign className="text-teal-600 h-8 w-8" /> Direct
                  Purchase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">
                      Get paid immediately for your items
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">
                      No waiting for items to sell
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">Quick and simple process</span>
                  </li>
                </ul>
              </CardContent>
              {selectedOption === "direct" && (
                <CheckCircle2 className="absolute top-3 right-3 text-teal-600 h-6 w-6" />
              )}
            </Card>
          </label>

          {/* Asset Lock Contract Option */}
          <label htmlFor="alc" className="relative group cursor-pointer">
            <RadioGroupItem id="alc" value="alc" className="hidden" />
            <Card
              className={`relative h-full bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-2 ${
                selectedOption === "alc"
                  ? "border-teal-600 shadow-md"
                  : "border-teal-100"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Lock className="text-teal-600 h-8 w-8" /> Asset Lock Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">
                      Keep your item while we find the right buyer
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">
                      Potential for higher returns
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">
                      Flexible selling arrangement
                    </span>
                  </li>
                </ul>
              </CardContent>
              {selectedOption === "alc" && (
                <CheckCircle2 className="absolute top-3 right-3 text-teal-600 h-6 w-6" />
              )}
            </Card>
          </label>
        </RadioGroup>
      </div>
      {/* Application Form Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <MultiStepForm method={selectedOption} />
          <div className="relative grid grid-cols-2 gap-4 lg:mt-12">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden ">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506355/sofa_tti1ps.jpg"
                  alt="Vintage furniture"
                  fill={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden ">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506380/unique_rrv92c.jpg"
                  alt="Collectible item"
                  fill={true}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden ">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506382/decor_h2elzw.jpg"
                  alt="Unique decor"
                  fill={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden ">
                <Image
                  src="https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506372/thrift_suizbq.jpg"
                  alt="Thrift find"
                  fill={true}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWithUsPage;
