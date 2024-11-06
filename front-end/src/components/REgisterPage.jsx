import React, { useState } from "react";
import img1 from "../images/Bank.jpg";
import { FaUpload,FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    adhar: "",
    password: "",
    username: "",
    email: "",
    age: "",
    dob: "",
    pancard: "",
    confirm_password: "",
    initialAmount: "",
  });
  const [image, setImage] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update value for the selected field
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    
    // If DOB is selected, calculate age
    if (name === "dob") {
      const calculatedAge = calculateAge(value);
      setValues((prevValues) => ({ ...prevValues, age: calculatedAge }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordMismatch(false);

    if (values.password !== values.confirm_password) {
      setPasswordMismatch(true);
      return;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    formData.append("image", image);

    try {
      await axios.post("http://localhost:4000/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User registered successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error("Registration failed");
      console.log(err);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full h-auto md:h-auto">
        <div className="md:w-1/2 w-full flex justify-center items-center bg-gray-900 rounded-l-lg">
          <img
            src={img1}
            alt="Bank"
            className="object-fill h-full w-full rounded-l-lg"
          />
        </div>
        <div className="md:w-1/2 w-full p-4 flex items-center justify-center m-4 rounded-lg bg-[#87B4A6]">
          <div className="w-full">
            <h2 className="text-xl font-bold text-center mb-4 text-black mt-4">
              Register
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 px-4 md:grid-cols-2 gap-x-7">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    className="mt-4 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    className="mt-4 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChange}
                    className="mt-4 block w-full px-2 py-1 border border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  ></textarea>
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={values.phone}
                    onChange={handleChange}
                    className="mt-9 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="adhar"
                    placeholder="Aadhar number"
                    value={values.adhar}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    className="mt-4 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="pancard"
                    placeholder="Pancard number"
                    value={values.pancard}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={values.age}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                    readOnly
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="initialAmount"
                    placeholder="Initial amount"
                    value={values.initialAmount}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                    
                  />
                  
                   
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    className="mt-5 block w-full px-2 py-1 border-b border-black bg-transparent focus:outline-none sm:text-sm placeholder-black placeholder:text-xs"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-2 top-8 cursor-pointer text-black"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="md:col-span-2 mt-5 mb-3 flex items-center">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="bg-white text-black text-xs py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 hover:text-white transition duration-300 cursor-pointer"
                  >
                    <FaUpload className="inline mr-2" />
                    Upload Image
                  </label>
                </div>
              </div>
              {passwordMismatch && (
                <p className="text-red-500 text-center mt-4 font-sans">
                  Passwords do not match!
                </p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/4 py-2 px-4 bg-[#D9D9D9] text-black rounded-xl shadow-md hover:bg-teal-800 hover:text-white transition duration-300 text-xs"
                >
                  Register
                </button>
              </div>
              <p className="mt-5 text-center text-xs text-black">
                Already Have an account?{" "}
                <a href="/" className="text-black font-medium hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;