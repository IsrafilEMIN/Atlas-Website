
import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Our Services
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Residential Painting</h3>
            <p className="text-gray-600">Transform your home with timeless elegance. Our expert painters deliver flawless interior and exterior finishes, using high-quality, durable paints that enhance beauty and protect your space. Whether it’s a modern refresh or classic restoration, we bring precision, craftsmanship, and sophistication to every brushstroke.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Commercial Painting</h3>
            <p className="text-gray-600">Elevate your business with a professional, high-end finish. From corporate offices to luxury retail spaces, we provide seamless, durable coatings designed to impress clients and enhance productivity. Our team works efficiently to minimize downtime, ensuring a flawless application with premium-grade, long-lasting materials.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Drywall & Plastering</h3>
            <p className="text-gray-600">Flawless walls, perfect foundations. We specialize in expert drywall installation, repairs, and high-end plaster finishing, ensuring seamless, smooth surfaces for paint application. Whether fixing imperfections or preparing a space for a luxury finish, our craftsmanship delivers structural integrity and aesthetic perfection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
