import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

// Debounce function to optimize search
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const ItemSearchPage = () => {
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Mechanic");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);  // Store user location

  const handleLogout = () => {
    logout();
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  const fetchSearchResults = async (query, category, lat, lon) => {
    if (!query || !lat || !lon) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      console.log(`Searching for: ${query} in category: ${category} near ${lat}, ${lon}`);
      const response = await fetch(
        `http://localhost:5000/api/items?query=${query}&category=${category}&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((query) => {
    if (userLocation) {
      fetchSearchResults(query, selectedCategory, userLocation.lat, userLocation.lon);
    }
  }, 500);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header user={user} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar handleLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-4">
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder={`Search for ${selectedCategory}...`}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="Mechanic">Mechanic</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Laundry">Laundry</option>
              <option value="Cylinder">Cylinder</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                {selectedCategory} Results
              </h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
                    >
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-sm text-gray-500">
                        {item.distance} km away
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {searchResults.length === 0 && !loading && (
                <p className="text-gray-500">No results found</p>
              )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Map View</h2>
              <MapView searchResults={searchResults} userLocation={userLocation} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ItemSearchPage;
