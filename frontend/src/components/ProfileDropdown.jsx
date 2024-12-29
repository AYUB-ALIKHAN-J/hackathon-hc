// ProfileDropdown.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileDropdown = ({ isOpen, user }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute right-0 mt-2 w-96 z-50"
      >
        <div className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
            Profile
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Profile Information
              </h3>
              <p className="text-gray-300">Name: {user.name}</p>
              <p className="text-gray-300">Email: {user.email}</p>
            </div>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Account Activity
              </h3>
              <p className="text-gray-300">
                <span className="font-bold">Joined: </span>
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-300">
                <span className="font-bold">Last Login: </span>
                {new Date(user.lastLogin).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ProfileDropdown; // Default export
