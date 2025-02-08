import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Our Services
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for service cards */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Residential Painting</h3>
            <p className="text-gray-300">Premium interior and exterior painting services for your home.</p>
          </div>
          {/* Add more service cards */}
        </div>
      </div>
    </div>
  );
}
