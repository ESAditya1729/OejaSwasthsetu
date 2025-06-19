import React from "react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-blue-50 to-white 
                 dark:from-blue-900 dark:to-gray-950 
                 text-gray-900 dark:text-white 
                 pt-12 pb-24 px-6 md:px-16 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left content */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Empower Your Health with{" "}
            <span className="text-blue-900 dark:text-blue-300">
              <br />
              OEJA HealthTech
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-800 dark:text-gray-200 max-w-xl">
            Your one-stop digital companion for personalized wellness tracking, expert insights, and proactive care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-900 transition"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          className="flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/assets/undraw_medical-research_pze7.svg"
            alt="Health Illustration"
            className="w-full max-w-md drop-shadow-lg"
          />
          <div className="flex gap-6">
            <img
              src="/assets/undraw_fitness-stats_uk0g.svg"
              alt="Fitness Stats"
              className="w-24 h-24"
            />
            <img
              src="/assets/undraw_doctors_djoj.svg"
              alt="Doctors"
              className="w-24 h-24"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
