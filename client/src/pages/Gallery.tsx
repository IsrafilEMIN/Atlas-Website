import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Our Work
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for gallery items */}
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            {/* Add gallery images */}
          </div>
        </div>
      </div>
    </div>
  );
}