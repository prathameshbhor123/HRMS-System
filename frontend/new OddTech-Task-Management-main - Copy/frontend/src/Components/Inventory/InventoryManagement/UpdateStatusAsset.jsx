import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set axios base URL
axios.defaults.baseURL = "http://localhost:8080";

const UpdateStatusAsset = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
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

  // Fetch assets from backend
  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/assets", getAuthHeader());
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load assets. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedAsset || !newStatus) return;

    setIsUpdating(true);

    try {
      // Call backend API to update status
      await axios.put(
        `/api/assignments/${selectedAsset}/condition?condition=${newStatus}`,
        { notes: "Status change reason" },
        getAuthHeader()
      );

      // Refresh assets list
      await fetchAssets();

      // Success notification
      Swal.fire({
        title: 'Status Updated!',
        text: `Asset status changed to: ${newStatus}`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#6366f1',
        timer: 3000,
        timerProgressBar: true,
      });

      // Reset form
      setSelectedAsset('');
      setNewStatus('');
      setNotes('');
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        title: 'Update Failed',
        text: error.response?.data?.message || 'Could not update asset status',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusOptions = () => {
    const currentStatus = assets.find(a => a.id === parseInt(selectedAsset))?.assetCondition;

    if (!currentStatus) return [];

    // Status transitions
    if (currentStatus === 'Assigned') {
      return ['Returned', 'Damaged', 'Lost'];
    } else if (currentStatus === 'Available') {
      return ['Assigned', 'Under Maintenance'];
    } else if (currentStatus === 'Under Maintenance') {
      return ['Available', 'Damaged'];
    } else {
      return ['Available', 'Under Maintenance'];
    }
  };

  const statusOptions = getStatusOptions();
  const selectedAssetDetails = assets.find(a => a.id === parseInt(selectedAsset));

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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Asset Status</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Asset Status</h3>

          <form onSubmit={handleUpdateStatus}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Asset</label>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
                disabled={isUpdating}
              >
                <option value="">Select an asset</option>
                {assets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} ({asset.serialNumber || 'No S/N'}) - Current: {asset.assetCondition}
                  </option>
                ))}
              </select>
            </div>

            {selectedAssetDetails && (
              <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{selectedAssetDetails.name}</h4>
                    <p className="text-sm text-gray-600">{selectedAssetDetails.serialNumber || 'No S/N'}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedAssetDetails.assetCondition === 'Available' ? 'bg-green-100 text-green-800' :
                    selectedAssetDetails.assetCondition === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                    selectedAssetDetails.assetCondition === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    selectedAssetDetails.assetCondition === 'Damaged' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedAssetDetails.assetCondition}
                  </span>
                </div>
              </div>
            )}

            {selectedAsset && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    disabled={isUpdating}
                  >
                    <option value="">Select new status</option>
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add any details about the status change..."
                    disabled={isUpdating}
                  ></textarea>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isUpdating || !selectedAsset || !newStatus}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-300 ${
                isUpdating || !selectedAsset || !newStatus ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Update Status'}
            </button>
          </form>
        </motion.div>

        <motion.div
                  className="bg-white rounded-xl shadow-lg p-6"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Legend</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Available</h4>
                        <p className="text-sm text-gray-600">Asset is ready for assignment</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Assigned</h4>
                        <p className="text-sm text-gray-600">Asset is currently assigned to an employee</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Under Maintenance</h4>
                        <p className="text-sm text-gray-600">Asset is being repaired or serviced</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Damaged</h4>
                        <p className="text-sm text-gray-600">Asset is damaged and not usable</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-500 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Lost</h4>
                        <p className="text-sm text-gray-600">Asset cannot be located</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <h4 className="font-medium text-indigo-800 mb-2">Important Notes</h4>
                    <ul className="list-disc pl-5 text-sm text-indigo-700 space-y-1">
                      <li>Update status promptly when assets change condition</li>
                      <li>Damaged and Lost assets require incident reports</li>
                      <li>Assets under maintenance should have estimated return dates</li>
                      <li>Returned assets become Available again</li>
                    </ul>
                  </div>
                </motion.div>
      </div>
    </motion.div>
  );
};

export default UpdateStatusAsset;