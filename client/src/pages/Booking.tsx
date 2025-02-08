import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Booking() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Book an Appointment
        </motion.h1>
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 border border-gray-200">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Service Type</label>
              <select className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900">
                <option value="">Select a service</option>
                <option value="residential">Residential Painting</option>
                <option value="commercial">Commercial Painting</option>
                <option value="exterior">Exterior Painting</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Contact Information</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900 mb-4"
                placeholder="Your name"
              />
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900 mb-4"
                placeholder="your@email.com"
              />
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Project Details</label>
              <textarea
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900 h-32"
                placeholder="Please describe your project"
              ></textarea>
            </div>
            <Button className="w-full">Schedule Consultation</Button>
          </form>
        </div>
      </div>
    </div>
  );
}