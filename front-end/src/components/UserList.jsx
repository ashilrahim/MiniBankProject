import React, { useEffect, useState } from 'react';
import bgimg from "../images/home.png";
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]); // Store users in state
  const [loading, setLoading] = useState(true); // For loading state
  const [searchTerm, setSearchTerm] = useState(''); // For search input

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsers(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>; // Loading state

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex min-h-screen">
        {/* Left Side - Bank Image (1/3 of the screen) */}
        <div
          className="w-1/3 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Right Side - User Table (2/3 of the screen) */}
        <div className="w-2/3">
          {/* Search Bar */}
          <div className="p-4 bg-white">
            <input
              type="text"
              placeholder="Search by Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              className="w-full p-2 rounded-md border border-gray-300  bg-[#A6D2C4] focus:outline-none focus:ring focus:ring-teal-400"
              
            />
          </div>

          {/* User Table */}
          <table className="min-w-full text-left table-auto">
            <thead>
              <tr className="border-b px-6 flex items-center">
                <th className=" py-3 pl-60 pr-96 text-gray-600 ">User Name</th>
                <th className=" py-3 text-gray-600">View More</th>
              </tr>
              
            </thead>
            <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-b">
                {/* User Profile and Buttons */}
                <td className="px-6 py-4 flex items-center ">
                  {/* Profile Section */}
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:4000/${user.image}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-56"
                    />
                    <span className="font-semibold text-lg">{user.username}</span>
                  </div>

                  {/* View and History Buttons */}
                  <div className="flex space-x-2 ml-96">
                  <Link to={`/admin/viewprofile/${user.username}`}>
                    <button className="bg-[#87B4A6] hover:bg-teal-800 text-gray-800 py-1 px-4 rounded-3xl hover:text-white transition duration-300">
                      View
                    </button>
                    </Link>
                    <Link to={`/admin/viewhistory/${user.username}`}>
                    <button className="bg-[#87B4A6] hover:bg-teal-800 text-gray-800 py-1 px-4 rounded-3xl hover:text-white transition duration-300">
                      History
                    </button>
                    </Link>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;