import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function LoadingSkeleton() {
  return (
    // <div className="p-4">
    //   {/* Header */}

    //   {/* Main content area */}
    //   <div className="max-w-[90%] h-[90vh] space-y-3">
    //     {/* Title */}
    //     <Skeleton className="h-12 w-3/4" />

    //     {/* Content blocks */}
    //     <div className="space-y-3">
    //       <Skeleton className="h-4 w-full" />
    //       <Skeleton className="h-4 w-5/6" />
    //       <Skeleton className="h-4 w-4/6" />
    //     </div>

    //     {/* Image placeholder */}
    //     <Skeleton className="h-64 w-full" />

    //     {/* More content blocks */}
    //     <div className="space-y-3">
    //       <Skeleton className="h-4 w-full" />
    //       <Skeleton className="h-4 w-5/6" />
    //       <Skeleton className="h-4 w-4/6" />
    //     </div>
    //   </div>

    //   {/* Footer */}
    // </div>
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      <p className="mt-2 text-gray-600 text-sm">Loading...</p>
    </div>
  );
}
