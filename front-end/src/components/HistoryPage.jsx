import React, { useEffect, useState } from "react";
import bgimg from "../images/home.png";
import axios from "axios";

const HistoryPage = ({ updateTrigger }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactionData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transaction/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transaction history", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [updateTrigger]);

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
        <div className="flex justify-center items-center mt-12 w-full px-2">
          {/* Transaction Table */}
          <div className="bg-[#87B4A6] p-8 rounded-3xl shadow-lg w-full h-full m-2">
            {/* Table */}
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-t border-b border-gray-500 p-2">Date</th>
                  <th className="border-t border-b border-gray-500 p-2">Time</th>
                  <th className="border-t border-b border-gray-500 p-2">Details</th>
                  <th className="border-t border-b border-gray-500 p-2">Amount</th>
                  <th className="border-t border-b border-gray-500 p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="p-2 font-sans font-medium text-lg">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="p-2 font-sans font-medium text-lg">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </td>
                    <td className="p-2 font-sans font-medium text-lg">
                      {transaction.details}
                    </td>
                    <td
                      className={`p-2 font-sans font-medium text-lg ${
                        transaction.details === "Credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.details === "Credit"
                        ? `+ ₹ ${transaction.amount}`
                        : `- ₹ ${transaction.amount}`}
                    </td>
                    <td className="p-2 font-sans font-medium text-lg">
                      ₹ {transaction.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;