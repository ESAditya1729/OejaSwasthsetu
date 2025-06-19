import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Ravi Mehta",
    text: "The doctors and the care staff were incredible. I felt heard, supported, and cared for throughout my treatment.",
    rating: 5,
    image: "/assets/patient-1.jpg",
  },
  {
    name: "Sunita Rani",
    text: "Thanks to the timely diagnosis and support, I'm back on my feet and healthier than ever! Highly recommended.",
    rating: 4,
    image: "/assets/patient-2.jpg",
  },
  {
    name: "Aarav Kapoor",
    text: "A place where care meets excellence. Their facilities and expertise are unmatched.",
    rating: 5,
    image: "/assets/patient-3.jpg",
  },
  {
    name: "Priya Sharma",
    text: "Exceptional service and compassionate care. They went above and beyond my expectations.",
    rating: 5,
    image: "/assets/patient-4.jpg",
  },
  {
    name: "Vikram Singh",
    text: "Professional staff and clean facilities. My recovery was faster than anticipated.",
    rating: 4,
    image: "/assets/patient-5.jpg",
  },
];

const PatientTestimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - itemsPerPage : prevIndex - 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 px-4 md:px-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-500 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-300 mb-10"
      >
        What Our Patients Say
      </motion.h2>

      <div className="relative max-w-7xl mx-auto">
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="text-blue-600 dark:text-blue-300" />
        </button>

        <div className="flex justify-center gap-8 transition-transform duration-300">
          {visibleTestimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="flex-shrink-0 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-600 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-blue-300 dark:border-blue-500 shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                {item.name}
              </h3>
              <div className="flex justify-center mt-2 mb-3">
                {Array.from({ length: item.rating }, (_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="text-blue-600 dark:text-blue-300" />
        </button>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({
          length: Math.ceil(testimonials.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            className={`w-3 h-3 rounded-full ${
              currentIndex >= index * itemsPerPage &&
              currentIndex < (index + 1) * itemsPerPage
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PatientTestimonials;