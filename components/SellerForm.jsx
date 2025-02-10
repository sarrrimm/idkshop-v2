import { ArrowRight, ReceiptRussianRuble, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const SellerInfoForm = ({ sellerData, setSellerData, handleSellerSubmit }) => (
  <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
    <CardHeader>
      <CardTitle className="text-2xl">Seller Information</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSellerSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sellerName" className="text-[0.8rem] md:text-base">
            Full Name
          </Label>
          <Input
            id="sellerName"
            value={sellerData.sellerName}
            onChange={(e) =>
              setSellerData({ ...sellerData, sellerName: e.target.value })
            }
            placeholder="Enter your full name"
            className="h-10 sm:h-12 text-xs sm:text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[0.8rem] md:text-base">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={sellerData.email}
            onChange={(e) =>
              setSellerData({ ...sellerData, email: e.target.value })
            }
            placeholder="your.email@example.com"
            className="h-10 sm:h-12 text-xs sm:text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-[0.8rem] md:text-base">
            Contact Number
          </Label>
          <Input
            id="contact"
            type="tel"
            value={sellerData.contact}
            onChange={(e) =>
              setSellerData({ ...sellerData, contact: e.target.value })
            }
            placeholder="Your contact number"
            className="h-10 sm:h-12 text-xs sm:text-base"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg group"
        >
          Next Step
          <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </CardContent>
  </Card>
);

export default SellerInfoForm;
