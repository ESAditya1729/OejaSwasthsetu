import React, { useState } from "react";

const faqs = [
  {
    question: "What is OeJa SwasthSetu?",
    answer:
      "OeJa SwasthSetu is a unified digital health platform committed to transforming healthcare access across India using technology.",
  },
  {
    question: "How does the Health ATM work?",
    answer:
      "Health ATMs allow users to register biometrically, access diagnostics, and receive AI-driven health guidance at remote locations.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "Yes, all data is encrypted and stored securely. Users maintain control of their data with secure digital health identities.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can book appointments through the SwasthSetu mobile app or website, and even at supported Health ATM kiosks.",
  },
  {
    question: "Can I access this service in rural areas?",
    answer:
      "Absolutely. OeJa SwasthSetu was designed with rural inclusion in mind, using mobile-friendly and offline-enabled systems.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-500 min-h-screen">
      {/* Header */}

      {/* FAQ Title */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium">
          We’re here to clarify anything you might want to know.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all"
          >
            <button
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              className="w-full text-left px-5 py-4 bg-blue-100 dark:bg-gray-800 text-blue-900 dark:text-blue-200 font-semibold hover:bg-blue-200 dark:hover:bg-gray-700 transition"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="px-5 py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-t border-gray-300 dark:border-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>


      {/* Footer */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer className="bg-gray-900 text-white text-center py-4 text-sm">
        © 2025 OeJa SwasthSetu. All rights reserved.
      </footer>
    </div>
  );
};

export default FAQ;
