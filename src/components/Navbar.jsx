import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/outline"; // Import User Icon from Heroicons
import ProfileMenu from "./ui/Profile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative top-0 w-full bg-orange-600 text-white px-4">
      <div className="flex items-center justify-between py-4 max-w-6xl mx-auto">
        {/* Logo on the left */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Invoicify
        </Link>

        {/* Centered menu for larger screens */}
        <div className="hidden md:flex flex-grow justify-center space-x-8 font-semibold">
          <Link to="/" className="hover:text-gray-100 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-gray-100 px-3 py-2 rounded">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-100 px-3 py-2 rounded">
            Contact
          </Link>
        </div>

        {/* Profile icon on the right (for both desktop and mobile) */}
        <div className="flex items-center space-x-4">
          {/* Desktop and larger screens */}
          <div className="hidden md:block">
            <ProfileMenu />
          </div>

          {/* Mobile view: Profile icon */}
          <div className="md:hidden flex gap-5 ">
            <Button
              variant="outline"
              onClick={toggleMenu}
              className="text-2xl text-black"
            >
              {isMenuOpen ? "✖️" : "☰"}
            </Button>
            {/* If the menu is open, show the profile icon as well */}
            {isMenuOpen && (
              <ProfileMenu />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="md:hidden text-black shadow-md flex justify-start rounded-md mt-2">
          <Link
            to="/"
            className="block py-2 px-4 text-center hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="block py-2 px-4 text-center hover:bg-gray-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 px-4 text-center hover:bg-gray-200"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
