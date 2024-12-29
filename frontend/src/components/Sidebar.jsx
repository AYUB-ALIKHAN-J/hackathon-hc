import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ handleLogout }) => (
  <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
    <nav className="flex-1 py-2">
      <Link to="/" className="mx-2 p-3 bg-gray-200 rounded-lg block">
        <span className="text-teal-600">Home</span>
      </Link>
      {[
        { name: "Accommodation Finder", path: "/accommodation" },
        { name: "Local Services Insight", path: "/local-services" },
        { name: "Item Search Engine", path: "/item-search" },
        { name: "Community Chat Forum", path: "/community-chat" },
      ].map((item, idx) => (
        <Link
          key={idx}
          to={item.path}
          className="mx-2 p-3 hover:bg-gray-100 rounded-lg block mt-1"
        >
          <span className="text-gray-600">{item.name}</span>
        </Link>
      ))}
    </nav>
    <div className="p-2 border-t border-gray-200">
      <button
        onClick={handleLogout}
        className="w-full p-3 text-left text-teal-600 hover:bg-gray-100 rounded-lg"
      >
        Logout
      </button>
    </div>
  </aside>
);

export default Sidebar;
