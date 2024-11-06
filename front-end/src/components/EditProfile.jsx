import React, { useState } from "react";
import { useProfile } from "../context/ProfileContext"; // import your context here
import homebank from "../images/home.png";
import { FaUpload } from "react-icons/fa";

const EditProfile = () => {
  const { profileData, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    name: profileData?.name || "",
    username: profileData?.username || "",
    email: profileData?.email || "",
    dob: profileData?.dob || "",
    adhar: profileData?.adhar || "",
    address: profileData?.address || "",
    phone: profileData?.phone || "",
    age: profileData?.age || "",
    pancard: profileData?.pancard || "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    try {
      await updateProfile(data); // call update function from context
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <main className="flex-1 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={homebank} alt="bank" className="object-cover w-full h-full" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full font-inknut">
          <div className="container mx-auto px-6 py-8 h-full">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-emerald-100/90 backdrop-blur rounded-3xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Aadhar</label>
                      <input
                        type="text"
                        name="adhar"
                        value={formData.adhar}
                        onChange={handleInputChange}
                        placeholder="Aadhar"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-1">User name</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="User name"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">DOB</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Phone number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">PAN no.</label>
                      <input
                        type="text"
                        name="pancard"
                        value={formData.pancard}
                        onChange={handleInputChange}
                        placeholder="PAN no."
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Image</label>
                      <div className="flex items-center space-x-2 justify-center">
                        <label className="p-2 bg-gray-100 cursor-pointer rounded-md transition-colors duration-200 w-full flex justify-center hover:bg-gray-200">
                          <input
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <FaUpload className="text-xl text-black" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="col-span-2 flex justify-center mt-6">
                    <button
                      type="submit"
                      className="px-8 py-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>

              {/* Right side - Empty to show background */}
              <div className="h-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
