import React, { useState } from "react";
import img1 from "../images/Bank.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to your backend login endpoint
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        formData
      );

      // Save the token from the response to localStorage (or cookies)
      localStorage.setItem("token", response.data.token);
      

      // Show success notification
      toast.success("Login successful!");
      setTimeout(() => {
        if (response.data.user.role === "admin") {
          window.location.href = "/admin/home";
        } else {
          window.location.href = "/user/home";
        }
      }, 1000);
      // Redirect user to a dashboard or home page
    } catch (err) {
      // Show error notification
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full h-[36rem]">
        <div className="md:w-1/2 w-full flex justify-center items-center bg-gray-900 rounded-l-lg">
          <img
            src={img1}
            alt="Bank"
            className="object-fill h-full w-full rounded-l-lg"
          />
        </div>
        <div className="md:w-1/2 w-full p-4 flex items-center justify-center bg-[#87B4A6] m-10 mt-12 mb-12 rounded-lg">
          <div className="w-full">
            <h2 className="text-xl font-bold text-center mb-4 text-black">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-8 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm placeholder-black placeholder:text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-7 mb-7 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm placeholder-black placeholder:text-sm"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/4 py-2 px-4 bg-[#D9D9D9] text-black rounded-xl shadow-md hover:bg-teal-800 hover:text-white transition duration-300"
                >
                  Login
                </button>
              </div>
              <p className="mt-4 text-center text-sm text-black">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-black font-medium hover:underline"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer for Toastify */}
    </div>
  );
};

export default Login;