import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Menu, User } from "lucide-react";
import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ user, isProfileOpen, setIsProfileOpen, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to handle the search and fetch products/locations
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
      onSearch([]); // Clear map results
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: { query },
      });
      console.log("Search results:", response.data);
      setFilteredProducts(response.data);
      onSearch(response.data); // Pass results to the parent component
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <header className="h-16 w-full px-4 flex justify-between items-center border-b border-gray-200 bg-white">
      <h1 className="text-2xl font-bold text-teal-600">HomeConnect</h1>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for products or locations..."
            className="w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-teal-500"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            Search
          </span>

          {/* Display search results */}
          {filteredProducts.length > 0 && (
            <div className="absolute left-0 w-full mt-2 bg-white shadow-lg border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
              {filteredProducts.map((result) => (
                <div
                  key={result.id}
                  className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer items-center"
                  onClick={() => handleSearch(result.name)} // Example of clickable search result
                >
                  <span>{result.name}</span>
                  <a
                    href={`/details/${result.id}`}
                    className="text-teal-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Show a message when no results are found */}
          {filteredProducts.length === 0 && searchQuery && (
            <div className="absolute left-0 w-full mt-2 bg-white shadow-lg border border-gray-300 rounded-lg">
              <div className="p-2 text-gray-500">No results found</div>
            </div>
          )}
        </div>
        <Globe className="w-6 h-6 text-gray-600 cursor-pointer" />
        <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="relative z-10"
          >
            <User className="w-6 h-6 text-gray-600" />
          </motion.button>
          <ProfileDropdown isOpen={isProfileOpen} user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
