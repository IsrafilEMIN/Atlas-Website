import { PaintBucket } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <PaintBucket className="w-8 h-8 text-primary" />
      </div>
      <span className="text-2xl font-bold text-gray-900">
        Atlas<span className="text-primary">HomeServices</span>
      </span>
    </div>
  );
}
