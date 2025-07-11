import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ManageAsset from "./ManageAsset";
import AssignAsset from "./AssignAsset";
import TrackAssignmentAssest from "./TrackAssignmentAssest";
import UpdateStatusAsset from "./UpdateStatusAsset";
import HandleAssestReturn from "./HandleAssestReturn";
import ViewAssestIssues from "./ViewAssestIssues";
// import TrackAssignment from "./TrackAssignment"; // You'll need to create this

const InventoryDashboard = () => {
  const [activePage, setActivePage] = useState(null);

  const cards = [
    { name: "Manage Asset", page: "manage-asset", icon: "📦" },
    { name: "Assign Asset", page: "assign-asset", icon: "🏷️" },
    { name: "Track Assignment", page: "track-assignment", icon: "🔍" },
    { name: "Update Status", page: "update-status", icon: "🔄" },
    { name: "Asset Return", page: "asset-return", icon: "↩️" },
    { name: "Asset Issues", page: "asset-issues", icon: "⚠️" },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
  };

  const handleBack = () => {
    setActivePage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16 p-6">
      {activePage === null ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Inventory Management Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.button
                key={index}
                onClick={() => setActivePage(card.page)}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800">{card.name}</h2>
                <p className="text-gray-500 mt-2 text-sm">Click to manage</p>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>

          <AnimatePresence mode="wait">
            {activePage === "manage-asset" && (
              <motion.div
                key="manage-asset"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sectionVariants}
              >
                <ManageAsset />
              </motion.div>
            )}
        {activePage === "assign-asset" && (
              <motion.div
                key="assign-asset"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sectionVariants}
              >
                <AssignAsset />
              </motion.div>
            )}
        {activePage === "track-assignment" && (
                      <motion.div
                        key="track-assignment"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={sectionVariants}
                      >
                        <TrackAssignmentAssest />
                      </motion.div>
                    )}
                    {activePage === "update-status" && (
                      <motion.div
                        key="update-status"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={sectionVariants}
                      >
                        <UpdateStatusAsset />
                      </motion.div>
                    )}
                    {activePage === "asset-return" && (
                      <motion.div
                        key="asset-return"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={sectionVariants}
                      >
                        <HandleAssestReturn />
                      </motion.div>
                    )}
                    {activePage === "asset-issues" && (
                      <motion.div
                        key="asset-issues"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={sectionVariants}
                      >
                        <ViewAssestIssues />
                      </motion.div>
                    )}
            {/* Add other sections similarly */}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default InventoryDashboard;