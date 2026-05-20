import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      // Store JWT Token
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      setMessage("Login Successful");

      // Redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {

      setMessage(
        error.response?.data?.error ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-sm">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Login;