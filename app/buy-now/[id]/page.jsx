"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Truck,
  Package,
  CreditCard,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  User,
  Home,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Successful from "@/components/Successful";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

const BuyNowPage = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  // Sample product data
  const sampleProduct = {
    name: "Vintage Leather Armchair",
    price: 299,
    image:
      "https://res.cloudinary.com/dcw5bzlyt/image/upload/v1738506355/sofa_tti1ps.jpg",
    description:
      "A beautiful vintage leather armchair in good condition. aopwcmwcmpowomcopowamc pwaoc awocmpoaw cpoawp cowacpmawpoc",
  };
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(await data.product);
        setLoading(false);
        // setsimilarProducts(await data.similarProducts);
      }
    };
    getProduct();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/buy-now/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryMethod,
        totalAmount: product.price,
        ...formData,
      }),
    });
    if (res.ok) {
      setOrderSuccess(true);
    }
  };
  if (orderSuccess) {
    return <Successful />;
  }
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="min-h-screen">
      {/* Background with gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-teal-50 opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Purchase
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              You're just a few steps away from owning this
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Summary Card */}
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-teal-600">
                          Rs {product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          includes taxes
                        </span>
                      </div>
                      <span className="text-xs flex items-center gap-x-1 text-muted-foreground mt-2">
                        Product is in:
                        <span className="flex capitalize">
                          <MapPin className="w-4 h-4" />
                          {product.location || "Pakistan"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-medium">Purchase Method</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          deliveryMethod === "pickup"
                            ? "border-teal-600 bg-teal-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => {
                          setDeliveryMethod("pickup");
                        }}
                      >
                        <MapPin
                          className={`h-6 w-6 ${
                            deliveryMethod === "pickup"
                              ? "text-teal-600"
                              : "text-gray-400"
                          }`}
                        />
                        <Label
                          htmlFor="pickup"
                          className="mt-2 cursor-pointer text-center"
                        >
                          Self Pickup
                          <span className="block text-sm text-gray-500">
                            Free
                          </span>
                        </Label>
                      </div>

                      <div
                        className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          deliveryMethod === "delivery"
                            ? "border-teal-600 bg-teal-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => {
                          setDeliveryMethod("delivery");
                        }}
                      >
                        <Truck
                          className={`h-6 w-6 ${
                            deliveryMethod === "delivery"
                              ? "text-teal-600"
                              : "text-gray-400"
                          }`}
                        />
                        <Label
                          htmlFor="delivery"
                          className="mt-2 cursor-pointer text-center"
                        >
                          Home Delivery
                          <span className="block text-sm text-gray-500">
                            DC applies
                          </span>
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Card */}
              <Card className="bg-white/90 backdrop-blur-sm border-0">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-teal-600" />
                      <div>
                        <h4 className="font-medium">Secure Transaction</h4>
                        <p className="text-sm text-gray-500">
                          Your data is protected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-6 w-6 text-teal-600" />
                      <div>
                        <h4 className="font-medium">Quality Check</h4>
                        <p className="text-sm text-gray-500">
                          Item verified by our team
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Information Form */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-base flex items-center gap-2"
                    >
                      <User className="h-4 w-4" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" /> Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-base flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" /> Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  {deliveryMethod === "delivery" && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="address"
                          className="text-base flex items-center gap-2"
                        >
                          <Home className="h-4 w-4" /> Delivery Address
                        </Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-base">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="h-12"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-base">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Any special instructions or notes"
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Total Section */}
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">Rs {product.price}</span>
                    </div>
                    {deliveryMethod === "delivery" && (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">
                          Delivery charges will apply!
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-teal-600">
                        Rs{" "}
                        {deliveryMethod === "delivery"
                          ? product.price + " +DC" //product.price + 500
                          : product.price}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg group"
                  >
                    Proceed
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
