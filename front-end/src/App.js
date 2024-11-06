import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";
import Register from "./components/REgisterPage";
import Login from "./components/LoginPage";
import Layout from "./components/Layout";
import { ProfileProvider } from "./context/ProfileContext";
import HistoryPage from "./components/HistoryPage";
import DepositPage from "./components/Deposit";
import WithdrawPage from "./components/Withdrawal";
import { useState } from "react";
import BankInfo from "./components/BankInfo";
import AdminLayout from "./components/AdminLayout";
import AdminHome from "./components/AdminHome";
import UserList from "./components/UserList";
import AdminViewHistory from "./components/AdminViewHistory";
import AdminViewProfile from "./components/AdminViewProfile";
function App() {

  const [updateTransactions, setUpdateTransactions] = useState(false);

  const handleTransactionUpdate = () => {
    setUpdateTransactions((prev) => !prev); // Toggle the state to trigger re-fetch
  };
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/user" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<ViewProfile />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="bankinfo" element={<BankInfo />} />
            <Route path="history" element={<HistoryPage updateTrigger={updateTransactions} />} />
            <Route path="deposit" element={<DepositPage onTransactionUpdate={handleTransactionUpdate} />} />
            <Route path="withdrawal" element={<WithdrawPage onTransactionUpdate={handleTransactionUpdate} />} />
          </Route>

          <Route path="/admin" element={<AdminLayout/>}>
             <Route path="home" element={<AdminHome />} />
             <Route path="userlist" element={<UserList />} />
             <Route path="viewhistory/:username" element={<AdminViewHistory />} />
             <Route path="viewprofile/:username" element={<AdminViewProfile />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;

