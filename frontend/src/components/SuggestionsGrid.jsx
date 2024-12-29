import React from "react";

const SuggestionsGrid = ({ suggestions }) => (
  <div>
    <h2 className="text-xl font-normal mb-4">
      Suggestions <span className="text-teal-600">near your area</span>
    </h2>
    <div className="grid grid-cols-3 gap-4">
      {suggestions.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {item.title}
            </h3>
            <button className="text-teal-600 hover:text-teal-700">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SuggestionsGrid;
