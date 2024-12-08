import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { user, dispatch } = useContext(AuthContext); // Get user and logout function from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    setIsMenuOpen(false); // Close the menu after logout
  };

 
  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Close the menu when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the toggle
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={toggleRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-300 rounded-full transition-all duration-200"
      >
        <FaUser size={20} className="text-black" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 border border-gray-200">
          <div className="p-4 border-b">
            {user ? (
              <>
              <div className=" flex justify-center items-center gap-3"> <FaUser size={20} className="text-black" />
              <p className="text-lg  text-gray-700 truncate">{user.email}</p></div>
                 
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 text-white hover:bg-red-600 py-2 rounded-md text-sm transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center bg-blue-500 text-white hover:bg-blue-600 py-2 rounded-md text-sm transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
          
              </>
            )}
          </div>
          {!user && (
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
