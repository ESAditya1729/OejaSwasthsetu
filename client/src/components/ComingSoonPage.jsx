import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-950 min-h-screen flex flex-col justify-center items-center text-center px-6 text-gray-900 dark:text-white transition-colors duration-500">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-purple-800 dark:text-purple-300">
        Thank You for Your Patience!
      </h1>
      <p className="text-xl leading-relaxed font-medium italic font-poppins text-gray-700 dark:text-gray-300 max-w-2xl">
        We're excited to let you know that we’ll be going live very soon!
        Stay tuned — we’ll notify you the moment we launch.
      </p>
      <p className="mt-6 text-xl font-semibold text-blue-800 dark:text-blue-300">
        Get ready for something amazing!
      </p>
      <p className="mt-2 text-md text-gray-700 dark:text-gray-400">
        — The <span className="font-bold">OeJa SwasthSetu</span> Team
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-900 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ComingSoon;
