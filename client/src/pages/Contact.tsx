import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Contact Us
        </motion.h1>
        <div className="max-w-2xl mx-auto bg-black/50 backdrop-blur-sm rounded-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white h-32"
                placeholder="Your message"
              ></textarea>
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
