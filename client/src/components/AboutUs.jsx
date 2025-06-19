import React from "react";
import NavigationBar from "./NavigationBar";
import { motion } from "framer-motion";

// Reusable animated section
const Section = ({ title, description, image, reverse = false }) => (
  <motion.div
    className={`flex flex-col md:flex-row ${
      reverse ? "md:flex-row-reverse" : ""
    } items-center gap-10 py-16`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {/* Text */}
    <motion.div
      className="w-full md:w-1/2"
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-4 text-purple-800 dark:text-purple-300">
        {title}
      </h2>
      <p className="text-xl leading-relaxed font-medium italic font-poppins text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </motion.div>

    {/* Image */}
    <motion.img
      src={image}
      alt={title}
      className="w-full md:w-1/2 h-auto rounded-xl"
      initial={{ opacity: 0, x: reverse ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    />
  </motion.div>
);

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-500">
      <NavigationBar />
      <div className="h-24" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text">
            About Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            “SwasthSetuHaiNa” — Your Health, Our Commitment.
          </p>
        </motion.div>

        {/* Section 1 */}
        <Section
          title="Who We Are"
          description="OeJa SwasthSetu delivers care with the empathy of a mother. 'OeJa' is a heartfelt call for 'O Mother' in Kumaoni, and 'SwasthSetu' is the 'Bridge to Health.' We connect underserved communities with compassionate, tech-enabled care."
          image="/assets/MotherlyCare.svg"
        />

        {/* Section 2 */}
        <Section
          title="Our Vision"
          description="To transform healthcare access nationwide with intelligent, secure, and connected solutions. We ensure timely care, informed decisions, and improved outcomes — for all."
          image="/assets/OurVision.svg"
          reverse
        />

        {/* Section 3 */}
        <Section
          title="Our Mission"
          description="From Universal Digital Health IDs and AI diagnostics to Health ATMs and real-time emergency support — we're not just digitizing healthcare, we're restoring trust and dignity in every interaction."
          image="/assets/OurMission.svg"
        />

        {/* Section 4 */}
        <Section
          title="The Challenges We Address"
          description="80% of medical data is still on paper. Most Indians lack access to digital records, emergency care, diagnostics, and insurance. We're changing that with inclusive tech-driven solutions."
          image="/assets/ProblemSolving.svg"
          reverse
        />

        {/* Section 5 */}
        <Section
          title="Our Solutions"
          description="With Health ATMs, AI-powered diagnostics, emergency tracking, and a unique Health Identity — we’re creating an ecosystem where every Indian can say: 'SwasthSetuHaiNa'."
          image="/assets/OurSolution.svg"
        />

        {/* Section 6 */}
        <Section
          title="Built for India, with Heart"
          description="Our platform scales from villages to cities. It’s modular, AI-ready, and cloud-native. We design for every mother, child, and elder — those who need us the most."
          image="/assets/Indian-Medical.jpeg"
          reverse
        />
      </div>

      {/* Join Us Section */}
      <motion.div
        className="text-center py-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-300">
          Join Us
        </h2>
        <p className="text-xl leading-relaxed font-medium italic font-poppins text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Believe in accessible, human-centered healthcare? Become a part of our
          mission to make SwasthSetu a reality for every Indian.
        </p>
        <motion.a
          href="https://docs.google.com/forms/d/1aVBo1S3Aoi4woonwOELPzou7hccIOgt7iY4pY9dF7fM/viewform?edit_requested=true" // 🔁 Replace with your actual Google Form link
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-900 transition"
        >
          Join the Mission
        </motion.a>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 text-sm rounded-t-lg">
        &copy; 2025 OeJa SwasthSetu. All rights reserved. | SwasthSetuHaiNa.
      </footer>
    </div>
  );
}
