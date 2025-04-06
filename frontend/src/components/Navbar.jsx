"use client";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-white">
          Task Management App
        </Link>

        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="text-gray-300 flex items-center">
              <FaUser className="mr-2" />
              <span>{currentUser.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center"
            >
              <FaSignOutAlt className="mr-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
