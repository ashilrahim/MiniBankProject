import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1500); // Delay to allow toast to display before redirect
  };
  return (
    <nav className="bg-[#87B4A6] p-4 shadow-md font-inknut">
      <ToastContainer/>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-bold text-xl">
          <Link to="/admin/home">Home</Link>
        </div>

        <div className="flex space-x-6 text-black ">
          <Link to="/admin/userlist" className="hover:text-gray-300">
            View Users
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 flex items-center"
          >
            <MdOutlineLogout />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;