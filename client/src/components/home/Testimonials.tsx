import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from "wouter";

const testimonials = [
  {
    id: 1,
    customerName: "John Smith",
    rating: 5,
    comment: "Outstanding service! The team was professional and the results exceeded my expectations.",
    serviceType: "Interior Painting",
    createdAt: new Date("2024-01-15").toISOString()
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    rating: 5,
    comment: "Very pleased with the quality of work. They were punctual, clean, and detail-oriented.",
    serviceType: "Exterior Painting",
    createdAt: new Date("2024-01-20").toISOString()
  },
  {
    id: 3,
    customerName: "Michael Brown",
    rating: 5,
    comment: "Professional team, excellent communication, and beautiful results!",
    serviceType: "Commercial Painting",
    createdAt: new Date("2024-02-01").toISOString()
  }
];

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    setMounted(true);

    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from our valued customers
          </p>
          <Link href="/reviews" className="text-black hover:underline mt-2 inline-block">
            See all reviews →
          </Link>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full bg-white border border-gray-200 text-black hover:bg-gray-100 -translate-x-16 hover:text-black"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full bg-white border border-gray-200 text-black hover:bg-gray-100 translate-x-16 hover:text-black"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="overflow-hidden select-text" ref={emblaRef}>
            <div className="flex md:transform-none md:!cursor-default" style={{ 
              userSelect: 'text',
              WebkitUserSelect: 'text',
              touchAction: 'pan-y pinch-zoom',
              cursor: 'grab',
              '@media (min-width: 768px)': {
                touchAction: 'none',
                cursor: 'default'
              }
            }}>
              {testimonials.map((review, index) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full flex flex-col justify-between bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200 select-text">
                      <div>
                        <div className="flex mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4">{review.comment}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          Service: {review.serviceType}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="font-semibold text-gray-900">
                          {review.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
