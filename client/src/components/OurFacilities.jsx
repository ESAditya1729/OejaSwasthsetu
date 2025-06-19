import React from "react";
import { motion } from "framer-motion";
import { Building, Microscope, Stethoscope, BedDouble, ShieldCheck } from "lucide-react";

const facilities = [
  {
    title: "Advanced Operation Theater",
    description: "State-of-the-art surgical suites with precision tools and safety protocols.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
    image: "/assets/facility-operation.jpeg",
  },
  {
    title: "Diagnostic Laboratory",
    description: "Modern labs with quick, accurate diagnostics powered by automation.",
    icon: <Microscope className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
    image: "/assets/facility-lab.jpeg",
  },
  {
    title: "24/7 Emergency Care",
    description: "Round-the-clock emergency services with rapid response teams.",
    icon: <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
    image: "/assets/facility-emergency.jpg",
  },
  {
    title: "Patient Rooms",
    description: "Comfortable, hygienic rooms designed for recovery and privacy.",
    icon: <BedDouble className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
    image: "/assets/facility-room.jpg",
  },
];

const OurFacilities = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" id="facilities">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-blue-800 dark:text-blue-200 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Facilities & Infrastructure
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg max-w-3xl mx-auto">
          Explore our world-class infrastructure designed to deliver exceptional healthcare with comfort and safety.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              className="rounded-xl shadow-xl border border-blue-300 dark:border-blue-800 overflow-hidden bg-white dark:bg-gray-900 hover:scale-[1.03] transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                  {facility.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  {facility.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFacilities;
