import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import Header from "../components/Header";

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("phone");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user?.role) navigate(`/${user.role.toLowerCase()}/home`);
  }, [user, navigate]);

  const toggleLoginMethod = (method) => setLoginMethod(method);

  const phoneSchema = Yup.object({
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const oejaSchema = Yup.object({
    oeja_id: Yup.string().required("OejaHealth ID is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const endpoint =
        loginMethod === "phone"
          ? "http://localhost:5000/api/login"
          : "http://localhost:5000/api/login/oeja";

      const response = await axios.post(endpoint, values);
      const data = response.data;

      if (!data?.userId || !data?.role) {
        throw new Error("Invalid user data received.");
      }

      // Prepare profilePicURL - prepend origin only if it is a relative path
      let profilePicFullURL = null;
      if (data.profilePicURL) {
        profilePicFullURL =
          data.profilePicURL.startsWith("http") ||
          data.profilePicURL.startsWith("//")
            ? data.profilePicURL
            : `${window.location.origin}${data.profilePicURL.startsWith("/") ? "" : "/"}${data.profilePicURL}`;
      }

      // Call your auth context's login function with proper user data
      login(data.token, {
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        profilePicURL: profilePicFullURL,
        phoneNumber: data.phoneNumber,
      });
      // Redirect handled by useEffect on user change

    } catch (error) {
      alert(error.response?.data?.message || error.message || "Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues =
    loginMethod === "phone"
      ? { phone_number: "", password: "" }
      : { oeja_id: "" };

  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-950 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 space-y-6">
          {/* Toggle Login Method */}
          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <button
              onClick={() => toggleLoginMethod("phone")}
              type="button"
              className={`w-1/2 py-2 rounded-full transition-all text-sm font-semibold ${
                loginMethod === "phone"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Phone Login
            </button>
            <button
              onClick={() => toggleLoginMethod("oeja")}
              type="button"
              className={`w-1/2 py-2 rounded-full transition-all text-sm font-semibold ${
                loginMethod === "oeja"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              OejaHealth ID
            </button>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={loginMethod === "phone" ? phoneSchema : oejaSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {loginMethod === "phone" ? (
                  <>
                    <div>
                      <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <Field
                        name="phone_number"
                        type="text"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </>
                ) : (
                  <div>
                    <label htmlFor="oeja_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      OejaHealth ID
                    </label>
                    <Field
                      name="oeja_id"
                      type="text"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <ErrorMessage name="oeja_id" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            New to Oeja HealthTech?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              type="button"
            >
              Please register
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LoginPage;
