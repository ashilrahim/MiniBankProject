import React, { useEffect, useState } from "react";
import bgimg from "../images/home.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminViewHistory = () => {
  const { username } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: "", image: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/admin/user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/transaction/history/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction history", error);
      }
    };
    fetchTransactionData();
  }, [username]);
  return (
    <div>
      <div className="flex min-h-screen">
        {/* Left Side - Bank Image */}
        <div
          className="w-1/3 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Right Side - User Info and Transaction History */}
        <div className="w-2/3 bg-[#A6D2C4] p-8">
          {/* Profile Section */}
          <div className="flex items-center mb-6">
            <img
              src={`http://localhost:4000/${userDetails.image}`}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <h1 className="text-2xl font-semibold">{userDetails.name}</h1>
          </div>

          {/* Transaction History Table */}
          <table className="w-full text-left border-t border-gray-400">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="py-3 px-4 text-gray-700">Date</th>
                <th className="py-3 px-4 text-gray-700">Time</th>
                <th className="py-3 px-4 text-gray-700">Details</th>
                <th className="py-3 px-4 text-gray-700">Amount</th>
                <th className="py-3 px-4 text-gray-700">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr className="border-b border-gray-300">
                  <td className="py-2 px-4 font-sans font-medium text-lg">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 font-sans font-medium text-lg">
                    {new Date(transaction.date).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4 font-sans font-medium text-lg">
                    {transaction.details}
                  </td>
                  <td
                    className={`p-2 font-sans font-medium text-lg ${
                      transaction.details === "Credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.details === "Credit"
                      ? `+ ₹ ${transaction.amount}`
                      : `- ₹ ${transaction.amount}`}
                  </td>
                  <td className="py-2 px-4 font-sans font-medium text-lg">
                    ₹ {transaction.balance}
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

export default AdminViewHistory;