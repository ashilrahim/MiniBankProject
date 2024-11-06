import React, { useEffect, useState } from "react";
import bgimg from "../images/home.png";
import cardimg from "../images/cardImg.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminHome = () => {
  const [userCount,  setUserCount] = useState(0);

  // Function to fetch the user count
  const fetchUserCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/admin/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setUserCount(response.data.count);
      console.log(response.data.count);
      
    } catch (error) {
      console.error("Error fetching user count:", error);
      toast.error("Failed to load user count");
    }
  }
  useEffect(()=> {
    fetchUserCount();
  },[])

  return (
    <div>
      <ToastContainer/>
      <div
        className="flex flex-col items-center justify-start min-h-screen"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div className="relative w-full h-full ml-36">
          {/* Backward Cards */}
          <div className="absolute top-20 left-10 bg-white rounded-3xl shadow-lg w-48 h-48">
            <div className="relative w-full h-full">
             <img src={cardimg} alt="card Image" className="w-full h-full object-cover rounded-xl"/>
              {/* Black Mask Layer */}
              <div className="absolute inset-0 bg-black opacity-70 rounded-xl"></div>
            </div>
          </div>

          {/* Front Card */}
          <div className="absolute top-48 left-36 bg-[#203D53] text-white p-12 rounded-3xl shadow-lg w-60 h-56 text-center z-10">
            <h2 className="text-xl font-bold mb-4">No. of users</h2>
            <p className="text-3xl font-bold font-sans">{userCount}</p>
          </div>

          <div className="absolute top-80 left-72 bg-white rounded-3xl shadow-lg w-48 h-48">
            <img
              src={cardimg}
              alt="Card Image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;