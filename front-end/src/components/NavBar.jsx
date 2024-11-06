import { Link, useNavigate } from "react-router-dom";
import profileImage from "../images/profileimage.png"; 
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useProfile } from "../context/ProfileContext";
import { toast } from "react-toastify";

function Navbar() {
  const { profileData } = useProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1500); // Delay to allow toast to display before redirect
  };

  return (
    <nav className="bg-[#87B4A6] p-4 shadow-md font-inknut">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Profile Picture */}
        <div className="flex items-center">
          <Link to="/user/profile">
            <img
              src={
                profileData?.photo
                  ? `http://localhost:4000/${profileData.photo}`
                  : profileImage
              }
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Center: Home */}
        <div className="text-black font-bold text-xl">
          <Link to="home">Home</Link>
        </div>

        {/* Right: Links */}
        <div className="flex space-x-6 text-black ">
          <Link
            to="notifications"
            className="hover:text-gray-300 flex items-center"
          >
            <IoMdNotificationsOutline />
          </Link>
          <Link to="deposit" className="hover:text-gray-300">
            Deposit
          </Link>
          <Link to="withdrawal" className="hover:text-gray-300">
            Withdrawal
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 flex items-center"
          >
            <MdOutlineLogout />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
