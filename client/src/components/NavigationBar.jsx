import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Store the section to scroll to after navigation to "/"
  const targetSectionRef = useRef(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
  }, [darkMode]);

  const handleMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    setActiveLink(link);

    if (link === "Home") {
      targetSectionRef.current = null; // no scroll needed, just go home
      navigate("/");
    } else if (link === "About Us") {
      targetSectionRef.current = null;
      navigate("/about-us");
    }
    else if (link === "FAQ"){
      targetSectionRef.current = null;
      navigate("/faq");
    }
    else if (link === "Blogs"){
      targetSectionRef.current = null;
      navigate("/blog");
    }  
     else {
      // For all other links, navigate to home first then scroll to section
      targetSectionRef.current = link.toLowerCase().replace(/\s+/g, "-");
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        // Already on home page, scroll immediately
        scrollToSection(targetSectionRef.current);
        targetSectionRef.current = null;
      }
    }
  };

  // Scroll helper
  const scrollToSection = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // After navigation to "/", if targetSectionRef is set, scroll to that section
  useEffect(() => {
    if (location.pathname === "/" && targetSectionRef.current) {
      // Small timeout to wait for DOM to settle
      setTimeout(() => {
        scrollToSection(targetSectionRef.current);
        targetSectionRef.current = null;
      }, 100);
    }
  }, [location.pathname]);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  // Active link highlight on scroll (same as your original)
  useEffect(() => {
    const sections = ["home", "services", "about-us", "footer", "faq", "blogs"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY > 100) {
            const sectionId = entry.target.id;
            const formatted = sectionId
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
            setActiveLink(formatted);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) setActiveLink("Home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = ["Home", "Services", "About Us", "Contact Us", "FAQ", "Blogs"];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 to-blue-900 text-white shadow-md dark:from-zinc-900 dark:to-gray-800 transition-all duration-300">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-b border-white/20 dark:border-white/10 bg-black/20 dark:bg-black/30">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img
            src="/assets/Web-logo-oeja.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full border-2 border-white object-cover"
          />
          <div className="text-2xl font-bold tracking-wide animate-slide-in-left">
            Oeja SwasthSetu
          </div>
        </div>

        {/* Auth & Dark Mode Buttons */}
        <div className="flex gap-3 mt-4 sm:mt-0 items-center">
          <button
            onClick={handleRegister}
            className="px-4 py-2 rounded-md bg-white text-blue-700 font-semibold hover:bg-blue-100 dark:bg-gray-200 dark:hover:bg-gray-100"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-md bg-white text-purple-800 font-semibold hover:bg-purple-100 dark:bg-gray-200 dark:hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={toggleDarkMode}
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium border border-white/30 hover:bg-white/10 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl shadow hover:scale-105 transition dark:bg-white/5">
          <i className="fas fa-user-md text-white text-lg"></i>
          <span className="font-semibold tracking-wide">Swasthsetu</span>
        </div>

        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center space-y-1"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white rounded-sm"></span>
          <span className="block w-6 h-0.5 bg-white rounded-sm"></span>
          <span className="block w-6 h-0.5 bg-white rounded-sm"></span>
        </button>

        {/* Links */}
        <ul
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } absolute sm:static left-0 top-full w-full sm:w-auto sm:flex flex-col sm:flex-row bg-blue-900 dark:bg-gray-900 sm:bg-transparent text-center sm:items-center sm:gap-6 transition-all duration-300`}
        >
          {links.map((link) => (
            <li
              key={link}
              onClick={() => handleLinkClick(link)}
              className={`cursor-pointer py-2 px-4 hover:text-blue-200 relative group ${
                activeLink === link ? "font-bold text-blue-100" : ""
              }`}
            >
              {link}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ${
                  activeLink === link ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
