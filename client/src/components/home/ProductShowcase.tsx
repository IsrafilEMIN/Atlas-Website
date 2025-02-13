import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WavePattern from "../ui/patterns/WavePattern";
import modernInteriorImg from "../../assets/projects/modern-interior.jpg";
import commercialOfficeImg from "../../assets/projects/commercial-office.jpg";
import exteriorProjectImg from "../../assets/projects/exterior-project.jpg";

export default function ProductShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="relative py-24 bg-gray-50 overflow-hidden">
      <WavePattern className="text-white/5" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Recent Projects
          </h2>
          <p className="text-gray-600 text-lg">
            Take a look at some of our finest work that showcases our attention to detail and commitment to quality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Cards */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-gray-100">
                <img
                  src={modernInteriorImg}
                  alt="Modern Home Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Home Interior</h3>
                <p className="text-gray-600">Complete interior renovation with premium finish</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-gray-100">
                <img
                  src={commercialOfficeImg}
                  alt="Commercial Office Space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial Office Space</h3>
                <p className="text-gray-600">Professional painting solution for corporate environment</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-gray-100">
                <img
                  src={exteriorProjectImg}
                  alt="Exterior Transformation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Exterior Transformation</h3>
                <p className="text-gray-600">Complete exterior makeover with weather-resistant coating</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}