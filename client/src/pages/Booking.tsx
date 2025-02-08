import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Booking() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Book an Appointment
        </motion.h1>
        <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-sm rounded-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Service Type</label>
              <select className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white">
                <option value="">Select a service</option>
                <option value="residential">Residential Painting</option>
                <option value="commercial">Commercial Painting</option>
                <option value="exterior">Exterior Painting</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Preferred Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Contact Information</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white mb-4"
                placeholder="Your name"
              />
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white mb-4"
                placeholder="your@email.com"
              />
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Project Details</label>
              <textarea
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white h-32"
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
