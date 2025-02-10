import React, { useState } from "react";
import { ArrowRight, ReceiptRussianRuble, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ProductForm from "./ProductForm";
import SellerInfoForm from "./SellerForm";
import { toast } from "sonner";

const MultiStepForm = ({ method }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [sellerData, setSellerData] = useState({
    sellerName: "",
    email: "",
    contact: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    brand: "",
    condition: "",
    model: "",
    material: "",
    images: [],
  });

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("sellerData", JSON.stringify(sellerData));

      const productData = { ...formData };
      delete productData.images;
      formDataToSend.append("productData", JSON.stringify(productData));

      formData.images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });
      formDataToSend.append(`pass`, process.env.PASS);
      formDataToSend.append("method", method);

      const response = await fetch("/api/productrequest/batman", {
        method: "POST",
        body: formDataToSend, // Don't set Content-Type header - browser will set it with boundary
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Handle success
      toast.success("Item submitted successfully!", {
        closeButton: true,
        className: "text-teal-600",
      });
      // Reset form or redirect
    } catch (error) {
      toast.error(error.message || "Failed to submit item", {
        closeButton: true,
        className: "text-red-600",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <SellerInfoForm
        sellerData={sellerData}
        setSellerData={setSellerData}
        handleSellerSubmit={handleSellerSubmit}
      />
    );
  } else {
    return (
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleProductSubmit}
        setStep={setStep}
        isSubmitting={isSubmitting}
      />
    );
  }
};

export default MultiStepForm;
