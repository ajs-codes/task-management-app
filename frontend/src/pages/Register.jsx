"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/register-info.png";

const Register = () => {
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      country: "",
      city: "",
      state: "",
      gender: "",
      position: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const userData = {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
          country: values.country,
          city: values.city,
          state: values.state,
          gender: values.gender,
          position: values.position,
        };

        await register(userData);
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-400 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full flex">
        <div className="hidden md:block md:w-2/5 bg-purple-100">
          <div className="h-full flex items-center justify-center">
            <img
              src={logo}
              alt="Login illustration"
              className="object-fill h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Registration</h2>
            <div className="w-12 h-1 bg-blue-500 mt-2"></div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent page reload
              formik.handleSubmit(e);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Please enter your"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Please enter your"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.state && formik.errors.state
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                />
                {formik.touched.city && formik.errors.state && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Phone number
                </label>
                <div className="flex">
                  <div className="w-16 flex items-center justify-center bg-gray-100 border border-gray-300 border-r-0 rounded-l-md">
                    <span className="text-red-500 font-medium">+91</span>
                  </div>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    placeholder="Phone number..."
                    className={`w-full px-3 py-2 border rounded-r-md ${
                      formik.touched.mobile && formik.errors.mobile
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                </div>
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.mobile}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Please enter your"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.country && formik.errors.country
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.country}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Please enter your"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.city && formik.errors.city
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.city}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Please enter your"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Please enter your"
                  className={`w-full px-3 py-2 border rounded-md ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Gender
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="mr-2"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "Male"}
                  />
                  <span className="text-gray-700">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="mr-2"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "Female"}
                  />
                  <span className="text-gray-700">Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    className="mr-2"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "Other"}
                  />
                  <span className="text-gray-700">Other</span>
                </label>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.gender}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              >
                <span>Next Step</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
