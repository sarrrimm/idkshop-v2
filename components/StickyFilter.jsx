import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  categoryOptions,
  priceRange,
  setPriceRange,
  handlePriceInputChange,
  selectedSort,
  setSelectedSort,
  sortOptions,
  applyFilters,
  setCurrentFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 bg-teal-600 text-white px-4 py-2 rounded-lg md:hidden"
      >
        <Filter className="h-5 w-5" /> Filters
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white shadow-lg transition-transform transform z-40 p-6 space-y-6 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0 md:w-64 md:top-20 md:left-8"
        )}
      >
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" /> Filters
        </h2>

        {/* Category Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat._id} value={cat.name.toLowerCase()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium">Price Range (Rs)</label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            step={100}
            className="mt-2"
          />
          <div className="flex justify-between gap-2 mt-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceInputChange(0, e.target.value)}
              className="w-full"
              placeholder="Min"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceInputChange(1, e.target.value)}
              className="w-full"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium">Sort By</label>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Apply and Reset Buttons */}
        <div className="flex w-full flex-row gap-2 mt-2">
          <Button
            onClick={applyFilters}
            className="w-full bg-teal-600 hover:bg-teal-600/90"
          >
            Apply Filters
          </Button>
          <Button
            onClick={() => {
              setSelectedCategory("all");
              setPriceRange([0, 100000]);
              setSelectedSort("newest");
              setCurrentFilters({
                category: "",
                sort: "newest",
                priceRange: [0, 100000],
              });
            }}
            className="w-full border border-teal-600 text-teal-600 bg-white hover:bg-teal-100/60"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </>
  );
}
