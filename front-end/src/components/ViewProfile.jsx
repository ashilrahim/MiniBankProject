import homebank from "../images/home.png";
import { FaRegEdit } from "react-icons/fa";
import profileImage from "../images/profileimage.png";
import { useProfile } from "../context/ProfileContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ViewProfile = () => {
  const { profileData } = useProfile();

  if (!profileData) return <div>No profile data available.</div>;

  return (
    <div className="h-screen w-full flex flex-col">
      <main className="flex-1 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={homebank}
            alt="bank"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full font-inknut">
          <div className="container mx-auto px-6 py-8 h-full">
            {/* Profile Card */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-emerald-100/90 backdrop-blur rounded-3xl shadow-lg p-8 relative">
                {/* Profile Image and Name */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-pink-200 mb-4">
                    <img
                      src={
                        profileData.photo
                          ? `http://localhost:4000/${profileData.photo}`
                          : profileImage
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {profileData.name}
                  </h2>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-700 mb-1">Email</h3>
                      <p className="text-emerald-600">{profileData.email}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 mb-1">Address</h3>
                      <p className="text-emerald-600">{profileData.address}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 mb-1">Age</h3>
                      <p className="text-emerald-600">{profileData.age}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 mb-1">Aadhar</h3>
                      <p className="text-emerald-600">{profileData.aadhar}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-700 mb-1">Username</h3>
                      <p className="text-emerald-600">{profileData.username}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 mb-1">DOB</h3>
                      <p className="text-emerald-600">{format(new Date(profileData.dob),"MM/dd/yyyy")}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 mb-1">Phone number</h3>
                      <p className="text-emerald-600">{profileData.phone}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 mb-1">PAN No.</h3>
                      <p className="text-emerald-600">{profileData.pan}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}

                <Link to="/user/editprofile">
                  <button className="absolute bottom-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <FaRegEdit className="w-5 h-5 text-gray-600" />
                  </button>
                </Link>
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

export default ViewProfile;
