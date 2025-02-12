import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Header from "@/components/layout/Header";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <Header />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're working on bringing our customer reviews online. Check back soon to see what our clients have to say about our services!
          </p>
        </motion.div>

        <div className="flex justify-center">
          <Card className="p-8 max-w-2xl w-full text-center bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              Our review system is currently being updated. In the meantime, you can learn more about our services or contact us directly.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/services">
                <Button variant="outline">View Services</Button>
              </Link>
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}