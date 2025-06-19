import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoleTabs from "./RoleTabs";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const roleImages = {
  patient: "/assets/Patients-Register-background.svg",
  doctor: "/assets/Doctor-Register-background.svg",
  chemist: "/assets/chemist-Register-background.jpg",
  hospital: "/assets/hospital-Register-background.jpg",
};

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState("patient");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      navigate(`/${role}/home`);
    }
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />

      <div className="w-full max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Tabs and Image */}
        <div className="space-y-6 text-center md:text-left">
          <RoleTabs
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
          />

          <AnimatePresence mode="wait">
            <motion.img
              key={selectedRole}
              src={roleImages[selectedRole]}
              alt={selectedRole}
              className="w-full max-w-md h-auto mx-auto bg-transparent border-none shadow-none p-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-xl shadow-lg w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterForm selectedRole={selectedRole} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
