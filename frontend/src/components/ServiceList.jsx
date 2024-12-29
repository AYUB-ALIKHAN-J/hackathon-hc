import React from "react";
import { ChevronRight } from "lucide-react";

const ServiceList = () => (
  <div className="flex space-x-8 mb-8 overflow-x-auto pb-2">
    {[
      "PG's",
      "Hospital",
      "Gym",
      "Restaurant",
      "Grocery",
      "Mechanic",
      "Laundry",
    ].map((service) => (
      <div
        key={service}
        className="flex flex-col items-center flex-shrink-0"
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
          <img
            src="/api/placeholder/48/48"
            alt={service}
            className="w-6 h-6"
          />
        </div>
        <span className="text-sm text-gray-500">{service}</span>
      </div>
    ))}
    <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
      <ChevronRight className="w-6 h-6 text-gray-400" />
    </button>
  </div>
);

export default ServiceList;
