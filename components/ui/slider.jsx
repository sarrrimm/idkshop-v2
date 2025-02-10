"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-teal-300/20">
      <SliderPrimitive.Range className="absolute h-full bg-teal-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-teal-600 bg-teal-50/90 cursor-pointer shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-teal-600 bg-teal-50/90 cursor-pointer shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
