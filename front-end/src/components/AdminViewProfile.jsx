import React, { useEffect, useState } from "react";
import bgimg from "../images/home.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminViewProfile = () => {
  const { username } = useParams(); // Get username from URL params
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/api/admin/user/${username}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserDetails()
  }, [username]);

  if (loading) return <div>Loading...</div>; // Loading state

  if (!userData) return <div>No user data found.</div>; // Handle case where user data is not found

  return (
    <div>
      <div className="flex min-h-screen">
        {/* Left Side - Bank Image */}
        <div
          className="w-1/3 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Right Side - Profile Card */}
        <div className="w-2/3 flex items-center justify-center bg-white">
        <div className="relative bg-[#87B4A6] p-8 rounded-3xl shadow-lg max-w-3xl text-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <img
                src={`http://localhost:4000/${userData.image}`}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover"
              />
            </div>
            <h2 className="text-lg text-black mb-9 font-medium">
              {userData.name}
            </h2>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-left text-lg">
              {/* Left Column */}
              <div>
                <p className="font-bold text-sm">Email</p>
                <p className="text-green-900 text-sm pl-6 mb-10">
                  {userData.email}
                </p>

                <p className="font-bold text-sm">Address</p>
                <p className="text-green-900 text-sm pl-6 mb-10">
                  {userData.address}
                </p>

                <p className="font-bold text-sm">Age</p>
                <p className="text-green-800 text-lg pl-6 mb-10 font-sans font-medium">
                  {userData.age}
                </p>

                <p className="font-bold text-sm">Aadhar</p>
                <p className="text-green-800 text-lg pl-6 mb-10 font-sans font-medium">
                  {userData.adhar}
                </p>
              </div>

              {/* Right Column */}
              <div className="ml-5">
                <p className="font-bold text-sm">User Name</p>
                <p className="text-green-900 text-sm pl-6 mb-10 pr-10">
                  {userData.username}
                </p>

                <p className="font-bold text-sm">DOB</p>
                <p className="text-green-800 text-lg pl-6 mb-10 pr-10 font-sans font-medium">
                  {new Date(userData.dob).toISOString().split("T")[0]}
                </p>

                <p className="font-bold text-sm">Phone number</p>
                <p className="text-green-800 text-lg pl-6 mb-10 pr-10 font-sans font-medium">
                  {userData.phone}
                </p>

                <p className="font-bold text-sm">Pan no.</p>
                <p className="text-green-800 text-lg pl-6 mb-10 pr-10 font-sans font-medium">
                  {userData.pancard}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewProfile;