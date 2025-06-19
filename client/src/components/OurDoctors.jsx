import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaUserMd, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { Link } from "react-router-dom";

const OurDoctors = () => {
  const headerRef = useRef(null);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowHeader(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
  }, []);

  const doctors = [
    {
      name: "Dr. Bidisha Banerjee",
      specialty: "Gynecologist",
      image: "/assets/Expert-Doctor-Image-Fe-00.jpg",
      rating: 4.8,
      icon: <FaHeartbeat className="text-3xl text-red-500" />,
    },
    {
      name: "Dr. Sanjay Roy",
      specialty: "Cardiologist",
      image: "/assets/Expert-Doctor-Image-Male-01.jpg",
      rating: 4.6,
      icon: <FaStethoscope className="text-3xl text-green-500" />,
    },
    {
      name: "Dr. Deepak Chopra",
      specialty: "Neurologist",
      image: "/assets/Expert-Doctor-Image-Male-02.jpg",
      rating: 4.9,
      icon: <FaUserMd className="text-3xl text-blue-600" />,
    },
    /*{
      name: "Dr. Clara Lee",
      specialty: "Pediatrician",
      image: "/assets/Expert-Doctor-Image-Male-02.jpg",
      rating: 4.7,
      icon: <FaHeartbeat className="text-3xl text-pink-500" />,
    },
    {
      name: "Dr. Emma Wilson",
      specialty: "Orthopedic",
      image: "/assets/Expert-Doctor-Image-Male-02.jpg",
      rating: 4.5,
      icon: <FaStethoscope className="text-3xl text-purple-500" />,
    },
    {
      name: "Dr. Mark Brown",
      specialty: "Dermatologist",
      image: "/assets/Expert-Doctor-Image-Male-02.jpg",
      rating: 4.4,
      icon: <FaUserMd className="text-3xl text-orange-500" />,
    },*/
  ];

  return (
    <section className="py-20 px-4 bg-blue-50 dark:bg-gray-900" id="doctors">
      <h2
        ref={headerRef}
        className={`text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-white mb-12 transition-all duration-1000 ${
          showHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        Meet Our Expert Doctors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="relative bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.03]"
          >
            {/* Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              {doc.icon}
            </div>

            {/* Doctor Image */}
            <img
              src={doc.image}
              alt={doc.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mt-6 shadow-md border-4 border-white dark:border-gray-700"
            />

            {/* Name and Specialty */}
            <h3 className="mt-4 text-xl font-semibold text-blue-800 dark:text-white text-center">
              {doc.name}
            </h3>
            <p className="text-center text-blue-600 dark:text-blue-300">
              {doc.specialty}
            </p>

            {/* Ratings */}
            <div className="flex justify-center items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(doc.rating)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {doc.rating.toFixed(1)}
              </span>
            </div>

            {/* View Profile Button */}
           {/* <Link
              to={`/doctors/${doc.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="mt-4 inline-block px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-400 text-sm font-medium text-center mx-auto"
            >
              View Profile
            </Link>*/}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurDoctors;
