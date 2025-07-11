import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set axios base URL
axios.defaults.baseURL = "http://localhost:8080";

const HandleAssetReturn = () => {
  const [pendingReturns, setPendingReturns] = useState([]);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [condition, setCondition] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get auth token from localStorage
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  // Fetch pending returns from backend
  const fetchPendingReturns = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/assignments/returns/pending", getAuthHeader());
      console.log("API Response:", response.data);
      setPendingReturns(response.data);
    } catch (error) {
      console.error("Error fetching pending returns:", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load pending returns. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingReturns();
  }, []);

  const handleSelectReturn = (returnItem) => {
    setSelectedReturn(returnItem);
    setCondition(returnItem.asset?.assetCondition || '');
    setNotes('');
  };

  const handleProcessReturn = async (e) => {
    e.preventDefault();
    if (!selectedReturn || !condition) return;

    setIsSubmitting(true);

    try {
      // Call backend API to process return
      await axios.put(
        `/api/assignments/${selectedReturn.id}/return`,
        { condition, notes },
        getAuthHeader()
      );

      // Refresh pending returns list
      await fetchPendingReturns();

      // Reset form
      setSelectedReturn(null);
      setCondition('');
      setNotes('');

      // Success notification
      Swal.fire({
        title: 'Return Processed!',
        text: 'Asset return completed successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#6366f1',
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Process return error:", error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to process return',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Handle Asset Return</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Returns</h3>

          {pendingReturns.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-indigo-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600">No pending returns at the moment</p>
              <p className="text-gray-500 text-sm mt-1">All assets have been processed</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReturns.map(returnItem => (
                <motion.div
                  key={returnItem.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleSelectReturn(returnItem)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedReturn?.id === returnItem.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:shadow-md hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{returnItem.asset?.name || 'Unknown Asset'}</h4>
                      <p className="text-sm text-gray-600">{returnItem.asset?.serialNumber || 'No S/N'}</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>Assigned to: {returnItem.employee?.name || 'Unknown Employee'}</span>
                    <span className="mx-2">•</span>
                    <span>Since: {new Date(returnItem.assignmentDate).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

         <motion.div
                  className="bg-white rounded-xl shadow-lg p-6"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedReturn ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Process Return</h3>

                      <div className="mb-6 border-b pb-4">
                        <h4 className="text-md font-medium text-gray-900">{selectedReturn.employee?.name || 'Unknown Asset'}</h4>
                        <p className="text-sm text-gray-600">{selectedReturn.asset?.serialNumber || 'No S/N'}</p>
                        <p className="text-sm text-gray-500 mt-1">Returned by: {selectedReturn.employee?.name || 'Unknown Employee'}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Assigned on: {new Date(selectedReturn.assignmentDate).toLocaleDateString()}
                        </p>
                      </div>

                      <form onSubmit={handleProcessReturn}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Asset Condition</label>
                          <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select condition</option>
                            <option value="Good">Good - No issues</option>
                            <option value="Minor Damage">Minor Damage - Cosmetic issues</option>
                            <option value="Major Damage">Major Damage - Functional issues</option>
                            <option value="Not Working">Not Working - Needs repair</option>
                          </select>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Add any details about the asset condition..."
                          ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setSelectedReturn(null)}
                            className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors duration-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-300 ${
                              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                            }`}
                          >
                            {isSubmitting ? 'Processing...' : 'Complete Return'}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <div className="bg-indigo-100 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Select an Asset to Return</h3>
                      <p className="text-gray-600 max-w-md">
                        Choose an asset from the pending returns list to process its return and update availability.
                      </p>
                    </div>
                  )}
                </motion.div>
      </div>
    </motion.div>
  );
};

export default HandleAssetReturn;