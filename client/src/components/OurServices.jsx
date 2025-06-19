import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaVideo,
  FaFileMedical,
  FaHospital,
  FaWallet,
  FaCloud,
  FaHeartbeat,
  FaAmbulance,
} from "react-icons/fa";

const serviceData = [
  {
    title: "AI Powered Services",
    description:
      "Smart AI tools for health predictions, diagnostics, and recommendations.",
    icon: <FaRobot className="text-blue-600 text-3xl mb-2" />,
  },
  {
    title: "Telemedicine",
    description:
      "Consult doctors remotely via video, voice, or chat — anytime, anywhere.",
    icon: <FaVideo className="text-blue-600 text-3xl mb-2" />,
  },
  {
    title: "Insurance Services",
    description:
      "Access and manage your health insurance plans with ease and transparency.",
    icon: <FaFileMedical className="text-blue-600 text-3xl mb-2" />,
  },
  {
    title: "Health ATM",
    description:
      "On-the-spot health checkups and diagnostics through self-service kiosks.",
    image: "/assets/oeJa-healthtech-Insta-image.png", // Your image path here
  },
  {
    title: "Health Credit",
    description:
      "Earn and use health credits for consultations, prescriptions, and more.",
    icon: <FaWallet className="text-blue-600 text-3xl mb-2" />,
  },
  {
    title: "Medical History Archive",
    description:
      "Securely store, access, and share your complete medical records digitally.",
    icon: <FaCloud className="text-blue-600 text-3xl mb-2" />,
  },
  {
    title: "Emergency Response",
    description:
      "Get immediate medical assistance through AI-powered ambulance coordination, online doctor consultations en route, and seamless hospital identification based on your health insurance coverage.",
    icon: <FaAmbulance className="text-red-600 text-3xl mb-2" />,
  },
];

const ServicesSection = () => {
  const middleService = serviceData.find((s) => s.title === "Health ATM");
  const otherServices = serviceData.filter((s) => s.title !== "Health ATM");

  // Force exactly 3 on each side
  const leftServices = otherServices.slice(0, 3);
  const rightServices = otherServices.slice(3, 6);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-950 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-300 text-center mb-12"
      >
        Our Exclusive Services
      </motion.h2>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-10 px-6">
        {/* Left column */}
        <div className="flex flex-col gap-6 w-full lg:w-1/4">
          {leftServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-blue-100 dark:border-blue-800/30 rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {service.icon}
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Middle Highlighted Box */}
        <motion.div
          className="bg-white/90 dark:bg-white/10 backdrop-blur-md border-2 border-blue-300 dark:border-blue-800 rounded-3xl p-8 shadow-xl w-full lg:w-[40%] text-center hover:scale-[1.02] transition-transform duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={middleService.image}
            alt="Health ATM"
            className="w-60 h-60 mx-auto mb-6 rounded-full shadow-lg object-cover"
            animate={{
              y: [0, -15, 0], // floating effect
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-3">
            {middleService.title}
          </h3>
          <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
            {middleService.description}
          </p>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-6 w-full lg:w-1/4">
          {rightServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-blue-100 dark:border-blue-800/30 rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {service.icon}
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
