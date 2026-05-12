import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/register",
        formData
      );

      setMessage("Registration Successful");

      console.log(response.data);

      // Redirect to Login
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      setMessage(
        error.response?.data?.error ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg outline-none"
          />

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

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
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
            Register
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Register;