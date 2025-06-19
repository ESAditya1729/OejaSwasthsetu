import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fieldMap = {
  patient: [
    "first_name",
    "last_name",
    "dob",
    "gender",
    "father_name",
    "phone_number",
    "password",
    "confirm_password",
  ],
  doctor: [
    "first_name",
    "last_name",
    "dob",
    "gender",
    "email",
    "phone_number",
    "password",
    "confirm_password",
  ],
  chemist: [
    "pharmacy_name",
    "city",
    "contact",
    "open_time",
    "close_time",
    "password",
    "confirm_password",
  ],
  hospital: [
    "hospital_name",
    "address",
    "contact",
    "email",
    "phone_number",
    "password",
    "confirm_password",
  ],
};

const validationSchemas = {
  patient: Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    dob: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    father_name: Yup.string().required("Father name is required"),
    phone_number: Yup.string()
      .matches(/\d{10}/, "Must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  }),
  doctor: Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    dob: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/\d{10}/, "Must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  }),
  chemist: Yup.object({
    pharmacy_name: Yup.string().required("Pharmacy name is required"),
    city: Yup.string().required("City is required"),
    contact: Yup.string()
      .matches(/\d{10}/, "Must be 10 digits")
      .required("Contact is required"),
    open_time: Yup.string().required("Open time is required"),
    close_time: Yup.string()
      .required("Close time is required")
      .test(
        "is-greater",
        "Close time must be after open time",
        function (value) {
          return value > this.parent.open_time;
        }
      ),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  }),
  hospital: Yup.object({
    hospital_name: Yup.string().required("Hospital name is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string()
      .matches(/\d{10}/, "Must be 10 digits")
      .required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/\d{10}/, "Must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  }),
};

const RegisterForm = ({ selectedRole }) => {
  const navigate = useNavigate();

  const initialValues =
    fieldMap[selectedRole]?.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {}) || {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { confirm_password, ...payload } = values;
      payload.role = selectedRole;
      const response = await axios.post(
        "http://localhost:5000/api/register",
        payload
      );

      if (response.data.redirectUrl) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate(response.data.redirectUrl);
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const renderField = (field) => {
    const commonProps = {
      name: field,
      className:
        "mt-1 block w-full rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition",
    };

    if (field === "gender") {
      return (
        <Field as="select" {...commonProps}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Field>
      );
    }

    if (field === "dob") return <Field type="date" {...commonProps} />;
    if (field === "open_time" || field === "close_time")
      return <Field type="time" {...commonProps} />;
    if (field === "address")
      return <Field as="textarea" rows="3" {...commonProps} />;
    if (field.includes("password"))
      return <Field type="password" {...commonProps} />;

    return <Field type="text" {...commonProps} />;
  };

  return (
    <motion.div
      key={selectedRole}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[selectedRole]}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fieldMap[selectedRole]?.map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {field
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </label>
                  {renderField(field)}
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <button
              type="button"
              className="w-full py-2 px-4 text-blue-600 dark:text-blue-400 hover:underline"
              onClick={handleLoginRedirect}
            >
              Already Registered? Log In
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default RegisterForm;
