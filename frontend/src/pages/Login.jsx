"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/login-info.png";

const Login = () => {
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values.email, values.password);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-400 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex">
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-600 text-sm">
              Doesn't have an account yet?{" "}
              <Link to="/register" className="text-purple-600 font-medium">
                Sign Up
              </Link>
            </p>
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
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
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

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter 6 character or more"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 uppercase font-medium"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 bg-purple-100">
          <div className="h-full flex items-center justify-center">
            <img
              src={logo}
              alt="Login illustration"
              className="object-fill h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
