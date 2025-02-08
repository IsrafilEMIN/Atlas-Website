import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import WavePattern from "@/components/ui/patterns/WavePattern";
import Header from "@/components/layout/Header";

export default function Pricing() {
  const [squareFeet, setSquareFeet] = useState("");
  const [rooms, setRooms] = useState("");
  const [serviceType, setServiceType] = useState("interior");
  const [paintQuality, setPaintQuality] = useState("standard");

  const calculateEstimate = () => {
    const sqft = parseFloat(squareFeet) || 0;
    const numRooms = parseInt(rooms) || 0;

    // Base rates per square foot
    const rates = {
      interior: { standard: 3.5, premium: 5, luxury: 7 },
      exterior: { standard: 4, premium: 6, luxury: 8 },
      commercial: { standard: 4.5, premium: 6.5, luxury: 9 }
    };

    const baseRate = rates[serviceType][paintQuality];
    const basePrice = sqft * baseRate;
    const roomComplexityFactor = numRooms * 100; // Additional cost per room for prep work

    return basePrice + roomComplexityFactor;
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="relative pt-20">
        <WavePattern />

        <div className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-white mb-6">Project Cost Calculator</h1>
            <p className="text-gray-400 text-lg">
              Get an instant estimate for your painting project
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-6 backdrop-blur-lg bg-black/50 border-gray-800">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sqft" className="text-white">Square Footage</Label>
                    <Input
                      id="sqft"
                      type="number"
                      placeholder="Enter total square feet"
                      value={squareFeet}
                      onChange={(e) => setSquareFeet(e.target.value)}
                      className="bg-white/10 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rooms" className="text-white">Number of Rooms</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="Number of rooms"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      className="bg-white/10 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-white">Service Type</Label>
                    <select
                      id="service"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
                    >
                      <option value="interior">Interior Painting</option>
                      <option value="exterior">Exterior Painting</option>
                      <option value="commercial">Commercial Painting</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quality" className="text-white">Paint Quality</Label>
                    <select
                      id="quality"
                      value={paintQuality}
                      onChange={(e) => setPaintQuality(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-700 rounded-md text-white"
                    >
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Estimated Cost</h3>
                  <p className="text-3xl font-bold text-white">${estimate.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    This is a rough estimate. Final price may vary based on project specifics.
                  </p>
                </div>

                <Button 
                  className="w-full bg-white text-black hover:bg-gray-100"
                  onClick={() => window.location.href = '/booking'}
                >
                  Schedule a Consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}