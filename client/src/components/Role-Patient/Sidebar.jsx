import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiActivity,
  FiTrendingUp,
  FiHeart,
  FiPieChart,
  FiCalendar,
  FiFileText,
  FiSettings,
  FiUpload,
  FiAlertTriangle,
  FiLoader,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { FaShieldAlt, FaFileMedical } from "react-icons/fa";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:5000";

const menuItems = [
  {
    id: "overview",
    name: "Overview",
    icon: <FiHome size={18} aria-hidden="true" />,
  },
  {
  id: "ai-consult",
  name: "AI Consult",
  icon: <RiRobot2Line size={18} aria-hidden="true" />
},
{
  id: "online-booking",
  name: "Online Booking",
  icon: <FiCalendar size={18} aria-hidden="true" />
},
{
  id: "insurance",
  name: "Insurance",
  icon: <FaShieldAlt size={18} aria-hidden="true" />
},
{
  id: "health-record",
  name: "Health Record",
  icon: <FaFileMedical size={18} aria-hidden="true" />
},
{
  id: "settings",
  name: "Settings",
  icon: <FiSettings size={18} aria-hidden="true" />,
},
{
  id: "Let's-Chat",
  name: "Let's Chat",
  icon: <FiFileText size={18} aria-hidden="true" />,
}
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [localPreview, setLocalPreview] = useState(null);

  // Dark mode state & effect
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const currentImage = useMemo(() => {
    if (localPreview) return localPreview;
    if (user?.profilePicURL) return user.profilePicURL;
    return "/assets/default-Avatar-Image.jpg";
  }, [localPreview, user?.profilePicURL]);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const input = event.target;
    setUploadError(null);
    setIsUploading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setUploadError("Authentication token missing. Please log in again.");
      setIsUploading(false);
      return;
    }

    try {
      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);

      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await fetch(`${BASE_URL}/api/upload-profile-picture`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      const fullImageURL = data.profilePicURL
        ? `${BASE_URL}${data.profilePicURL}`
        : user?.profilePicURL;

      setUser((prevUser) => ({
        ...prevUser,
        profilePicURL: fullImageURL,
      }));

      setLocalPreview(null);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <motion.aside
      className={`h-screen bg-white dark:bg-gray-900 border-r-4 border-blue-500 dark:border-blue-700 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      } relative overflow-hidden`}
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(45deg, #4f46e5, #3b82f6, #06b6d4, #14b8a6, #10b981)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
          zIndex: 0,
        }}
      />

      <style>
        {`
          @keyframes gradientShift {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      {/* Brand & Dark Mode Toggle */}
<div
  className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 z-10 relative"
  aria-label="Sidebar brand and theme toggle"
>
  {/* Brand Button */}
  <button
    onClick={() => navigate("/")}
    className="font-bold text-blue-600 dark:text-blue-400 hover:underline transition-all duration-300 text-xl"
    aria-label="Go to Home"
    title="Go to Home"
  >
    {isCollapsed ? "Oeja" : "Oeja HealthTech"}
  </button>

  {/* Theme Toggle (only when expanded) */}
  {!isCollapsed && (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 rounded transition-all duration-300"
      title="Toggle dark mode"
    >
      {darkMode ? (
        <>
          <FiSun className="w-5 h-5" />
        </>
      ) : (
        <>
          <FiMoon className="w-5 h-5" />
        </>
      )}
    </button>
  )}
</div>


      {/* Sidebar Header Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 z-10 relative">
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-600 dark:text-gray-300"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </motion.button>
      </div>

      {/* Profile Section */}
      <div className="p-4 z-10 relative">
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <img
              src={currentImage}
              alt="User profile"
              className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              style={{ opacity: isUploading ? 0.7 : 1 }}
              loading="lazy"
            />
            <label className="absolute bottom-0 right-0 p-1 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer">
              {isUploading ? (
                <FiLoader
                  className="animate-spin text-gray-600 dark:text-gray-300"
                  size={16}
                />
              ) : (
                <FiUpload
                  size={16}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          {!isCollapsed && (
            <>
              <motion.h3
                className="mt-2 text-sm font-medium text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {`${user?.first_name || ""} ${user?.last_name || ""}`}
              </motion.h3>

              {user?.role && (
                <motion.p
                  className="mt-1 text-xs text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  Logged in as a {user.role}
                </motion.p>
              )}
            </>
          )}
        </motion.div>

        {uploadError && !isCollapsed && (
          <motion.div
            className="mt-2 text-xs text-red-500 flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            <FiAlertTriangle size={14} /> <span>{uploadError}</span>
          </motion.div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-2 z-10 relative">
        <nav className="space-y-1" aria-label="Sidebar navigation">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={isCollapsed ? item.name : ""}
              aria-label={item.name}
            >
              <div>{item.icon}</div>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {item.name}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 z-10 relative">
        <motion.button
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          title={isCollapsed ? "Log Out" : ""}
          aria-label="Log out"
        >
          <FiLogOut size={18} />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Log Out
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default React.memo(Sidebar);
