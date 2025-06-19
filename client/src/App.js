import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/OurServices";
import OurDoctors from "./components/OurDoctors";
import PatientTestimonials from "./components/PatientTestimonials";
import OurFacilities from "./components/OurFacilities";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import PatientDashboard from "./components/Role-Patient/PatientDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ"
import ComingSoon from "./components/ComingSoonPage";
import Blog from "./components/Blogs";

function App() {
  const location = useLocation();

  // Routes where navbar should NOT appear
  const noNavRoutes = ["/login", "/register", "/patient/home", "/doctor/home", "/admin/home","/about-us"];
  const showNavBar = !noNavRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <>
        {showNavBar && <NavigationBar />}
        {showNavBar && <div className="h-4" />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <br />
                <ServicesSection />
                <br />
                <OurDoctors />
                 {/*<br />
               +<PatientTestimonials />*/}
                <br />
                <OurFacilities />
                <br />
                <Footer />
              </>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/register" element={<ComingSoon />} />
          <Route path="/login" element={<ComingSoon />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />


          {/* Protected Patient Route */}
          <Route
            path="/patient/home"
            element={
              <PrivateRoute allowedRole="patient">
                <PatientDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
