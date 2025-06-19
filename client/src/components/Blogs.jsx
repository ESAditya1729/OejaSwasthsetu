import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      title: "How OeJa is Empowering Rural Healthcare with Health ATMs",
      date: "May 15, 2025",
      desc: "Discover how OeJa's innovative Health ATM kiosks are bringing basic diagnostics, biometric registration, and emergency access to millions in underserved communities.",
    },
    {
      title: "AI in Diagnostics: Transforming Early Detection in India",
      date: "May 9, 2025",
      desc: "AI-powered diagnostics are enabling early intervention like never before. Here's how OeJa uses federated learning to predict health risks and recommend timely care.",
    },
    {
      title: "Emergency Care in Transit: The Role of Smart Ambulances",
      date: "April 28, 2025",
      desc: "Smart ambulances with real-time monitoring and cloud-based access to patient history are making treatment during emergencies faster and more accurate.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-500 min-h-screen">
      {/* Header */}

      {/* Page Title */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text">
          Health Insights & Innovation Blog
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium">
          Explore how we're transforming healthcare across India.
        </p>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg mb-8 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">
              {post.title}
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {post.date}
            </div>
            <p className="text-lg font-poppins mb-3">{post.desc}</p>
            <a
              href="#"
              className="text-blue-700 dark:text-blue-400 font-semibold hover:underline transition"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 text-sm">
        © 2025 OeJa SwasthSetu. All rights reserved.
      </footer>
    </div>
  );
};

export default Blog;
