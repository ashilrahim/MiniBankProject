
import React from "react";
import bgimg from "../images/home.png";
import { useProfile } from "../context/ProfileContext";




const Home = () => {
  const { profileData, loading} = useProfile()


  if (loading) return <div>Loading...</div>;
  if (!profileData) {
    console.log("Profile data is missing:", profileData);
    return <div>No profile data available.</div>;
  }

  console.log("Profile data loaded:", profileData);

  return (
    <div>
      <div
        className="flex flex-col items-center justify-start min-h-screen"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden", // Prevents overflow on smaller screens
        }}
      >
        {/* Horizon Bank title centered and white */}
        <h1 className="text-white text-3xl mt-8 text-center">
          Horizon Bank
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Horizon
          Bank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Horizon Bank
        </h1>

        <div className="flex justify-start items-start mt-12 w-full px-8">
          {/* Card with account details */}
          <div
            className="bg-[#87B4A6] p-8 rounded-3xl shadow-lg max-w-3xl mt-12 px-40 text-center"
            style={{ transform: "translate(10%, -10%)" }}
          >
            <h2 className="text-xl text-black mb-4">Account Number</h2>
            <p className="text-2xl text-gray-900 mb-6 font-sans font-semibold">{profileData.accountNumber}</p>
            <h3 className="text-xl text-black mb-6 mt-12">Available Balance</h3>
            <p className="text-2xl text-black font-sans font-semibold ">₹ {profileData.balance}</p>

            <div className="flex justify-between  mt-10">
              <a href="/user/history" className="text-blue-700 ">
                View History
              </a>
              <a href="/user/bankinfo" className="text-black">
                More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;