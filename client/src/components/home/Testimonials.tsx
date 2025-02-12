import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from 'embla-carousel-react';
import { Review } from "@shared/schema";
import { Link } from "wouter";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['/api/reviews/published'],
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Optional: Auto-scroll functionality
  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000); // Scroll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  if (reviews.length === 0) return null;

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
            View all reviews →
          </Link>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons - Hidden on mobile */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review, index) => (
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
                    <Card className="p-6 h-full flex flex-col justify-between bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200">
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
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2 mb-4">
                            {review.images.slice(0, 2).map((image, i) => (
                              <img
                                key={i}
                                src={image}
                                alt={`Review image ${i + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                            {review.images.length > 2 && (
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm text-gray-500">
                                  +{review.images.length - 2} more
                                </span>
                              </div>
                            )}
                          </div>
                        )}
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