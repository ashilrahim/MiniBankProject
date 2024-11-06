import React, { useEffect, useState } from "react";
import bgimg from "../images/home.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawPage = ({ onTransactionUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data");
        toast.error("Failed to fetch profile data");
      }
    };
    fetchProfileData();
  }, []);

  const handleWithdraw = async () => {
    if (withdrawAmount <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }
    if (withdrawAmount > profileData.balance) {
      toast.error("Insufficient funds.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/api/transaction/withdraw",
        {
          amount: withdrawAmount,
          details: "Debit",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the profile data with the new balance
      setProfileData((prev) => ({
        ...prev,
        balance: prev.balance - withdrawAmount,
      }));

      toast.success(response.data.message);
      setWithdrawAmount("");
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.href = "/user/home";
      }, 2000);
      onTransactionUpdate();
    } catch (error) {
      console.error("Error on withdrawing: ", error);
      toast.error(error.response?.data?.message || "Withdrawal failed");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWithdrawAmount("");
  };

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
        <ToastContainer />
        <div className="flex justify-start items-center mt-12 w-full px-4 ml-32">
          {/* Withdraw Card */}
          <div className="bg-[#87B4A6] p-6 rounded-3xl shadow-lg max-w-md w-full text-center">
            <h2 className="text-lg font-bold text-black mb-4">Withdrawal</h2>

            {/* Account Information */}
            {profileData ? (
              <div className="text-left text-lg">
                <p className="font-bold text-sm mb-1 mt-14 ml-7">Account no:</p>
                <p className="text-green-800 text-lg pl-4 mb-6 ml-7 font-sans font-medium">
                  {profileData.accountNumber}
                </p>

                <p className="font-bold text-sm mb-1 mt-14 ml-7">Branch</p>
                <p className="text-green-900 text-sm pl-4 mb-6 ml-7 font-medium">
                  Bangalore
                </p>

                <p className="font-bold text-sm mb-1 mt-14 ml-7">
                  Available Balance
                </p>
                <p className="text-green-800 text-lg pl-4 mb-6 ml-7 font-sans font-medium">
                  ₹ {profileData.balance}
                </p>
              </div>
            ) : (
              <p>Loading account information...</p>
            )}

            {/* Withdraw Button */}
            <button
              onClick={openModal}
              className="bg-gray-200 px-6 py-2 rounded-lg font-bold text-black mt-9 hover:bg-teal-800 hover:text-white transition duration-300"
            >
              Withdraw
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold mb-4">Enter Withdraw Amount</h3>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    placeholder="Amount"
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-500 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleWithdraw}
                      className="bg-[#608f82] text-white rounded px-4 py-2 hover:bg-[#335d51] transition duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
