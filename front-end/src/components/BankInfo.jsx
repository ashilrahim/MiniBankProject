import React from "react";
import bgimg from "../images/home.png";
import { useProfile } from "../context/ProfileContext";


const BankInfo = () => {
  const { profileData } = useProfile();
  return (
    <div>
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
        <div className="flex justify-center items-center mt-12 w-full px-4">
          {/* Bank Balance Card */}
          <div
            className="bg-[#87B4A6] p-6 rounded-3xl shadow-lg max-w-md w-full text-center"
            style={{ transform: "translateX(-400px)" }}
          >
            {/* Available Balance */}
            <h2 className="text-lg font-bold text-black mb-3 mt-9">
              Available Balance
            </h2>
            <p className="text-2xl text-black mb-20 font-sans font-bold">
            {profileData?.balance ? `₹ ${profileData.balance}` : "₹0"}
              </p>

            {/* Bank Details */}
            <div className="text-left text-lg">
              <p className="font-bold text-lg mb-1 ml-11">Bank Name</p>
              <p className="text-green-950 text-lg pl-4 mb-10 ml-11">
                Horizon Bank
              </p>

              <p className="font-bold text-lg mb-1 ml-11">Branch</p>
              <p className="text-green-950 text-lg pl-4 mb-10 ml-11">
                Bangalore
              </p>

              <p className="font-bold text-lg mb-1 ml-11">IFSC Code</p>
              <p className="text-green-900 text-xl pl-4 mb-16 ml-11 font-sans font-medium">
                HRZN002401
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;