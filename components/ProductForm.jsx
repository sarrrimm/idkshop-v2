import React from "react";
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
import { toast } from "sonner";
const ProductForm = ({
  formData,
  setFormData,
  handleSubmit,
  setStep,
  isSubmitting,
}) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl">Submit Your Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[0.8rem] md:text-base">
              Item Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Vintage Leather Armchair"
              className="h-10 sm:h-12 text-xs sm:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[0.8rem] md:text-base">
                Expected Price (Rs)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="h-10 sm:h-12 text-xs sm:text-base"
                placeholder="00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[0.8rem] md:text-base">
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="h-10 sm:h-12 text-xs sm:text-base">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[0.8rem] md:text-base">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Please describe your item's condition, history, and any special features"
              className="min-h-[120px] text-xs sm:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-[0.8rem] md:text-base">
                Brand
              </Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="h-10 sm:h-12 text-xs sm:text-base"
                placeholder="Brand name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition" className="text-[0.8rem] md:text-base">
                Condition
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger className="h-10 sm:h-12 text-xs sm:text-base">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model" className="text-[0.8rem] md:text-base">
                Model
              </Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                className="h-10 sm:h-12 text-xs sm:text-base"
                placeholder="e.g., Q12XYZ or 2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-[0.8rem] md:text-base">
                Material
              </Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) =>
                  setFormData({ ...formData, material: e.target.value })
                }
                className="h-10 sm:h-12 text-xs sm:text-base"
                placeholder="e.g., Leather, Wood, Metal"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images" className="text-[0.8rem] md:text-base">
              Images
            </Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  if (formData.images.length + files.length <= 5) {
                    setFormData((prev) => ({
                      ...prev,
                      images: [...prev.images, ...files],
                    }));
                  } else {
                    e.target.value = null;
                    toast.error("You can upload a maximum of 5 images", {
                      closeButton: true,
                      className: "text-red-600",
                    });
                  }
                }}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Upload your images here, click to browse
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Upload up to 5 high-quality images
                </p>
              </label>
            </div>
          </div>
          {formData.images.length > 0 && (
            <div className="grid grid-cols-5 gap-1 mt-4 border">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative border w-[100px] h-[100px] mx-auto"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded preview"
                    className="w-[100px] h-[100px] object-cover rounded-lg shadow"
                  />

                  <button
                    type="button"
                    className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white  rounded-full"
                    onClick={() => {
                      const newImages = formData.images.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, images: newImages });
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2 flex-col md:flex-row w-full items-center justify-center">
            <Button
              onClick={() => {
                setStep(1);
              }}
              className="bg-gray-500"
            >
              Go back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 h-12 bg-teal-600 hover:bg-teal-700 text-lg group disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <span className="mr-2">Uploading...</span>
                  {/* Add a loading spinner component here if desired */}
                </div>
              ) : (
                <>
                  Submit Item
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
