// DashboardPage.jsx
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header"; // Default import
import Sidebar from "../components/Sidebar";
import ServiceList from "../components/ServiceList";
import SuggestionsGrid from "../components/SuggestionsGrid";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const suggestions = [
    { title: "Oxzy PG/HOSTELS", image: "/api/placeholder/400/300" },
    { title: "Stella Hospital", image: "/api/placeholder/400/300" },
    { title: "Beast Fitness Center", image: "/api/placeholder/400/300" },
    { title: "Fresh Mart", image: "/api/placeholder/400/300" },
    { title: "Auto Care", image: "/api/placeholder/400/300" },
    { title: "Garden Cafe", image: "/api/placeholder/400/300" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header
        user={user}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar handleLogout={handleLogout} />
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            <ServiceList />
            <SuggestionsGrid suggestions={suggestions} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
