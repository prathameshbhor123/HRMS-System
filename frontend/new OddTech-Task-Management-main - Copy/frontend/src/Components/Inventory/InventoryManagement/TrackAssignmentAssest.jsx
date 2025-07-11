import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCw } from 'react-icons/fi';

axios.defaults.baseURL = "http://localhost:8080";

const TrackAssignmentAssest = () => {
  const [filter, setFilter] = useState('all');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/assets", getAuthHeader());
      setAssets(response.data);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError("Failed to load assets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const formatAssetData = (apiAssets) => {
    return apiAssets.map(asset => ({
      id: asset.id,
      name: asset.name || `Asset #${asset.id}`,
      category: asset.type || 'Uncategorized',
      status: asset.assetCondition || 'Available',
      assignedTo: asset.assignments?.find(a => a.status === 'ACTIVE')?.employee?.name || null,
      lastUpdate: new Date().toISOString().split('T')[0] // Update with actual date from backend if available
    }));
  };

  const filteredAssets = filter === 'all'
    ? formatAssetData(assets)
    : formatAssetData(assets).filter(asset => asset.status === filter);

  const statusOptions = [
    { value: 'all', label: 'All Assets' },
    { value: 'Assigned', label: 'Assigned' },
    { value: 'Available', label: 'Available' },
    { value: 'Under Maintenance', label: 'Under Maintenance' },
    { value: 'Damaged', label: 'Damaged' },
    { value: 'Lost', label: 'Lost' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
        <button
          onClick={fetchAssets}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Track Assets</h2>
        <button
          onClick={fetchAssets}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FiRefreshCw className="mr-1" /> Refresh
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === option.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {filteredAssets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No assets found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fadeIn"
            >
              <div className={`p-1 ${
                asset.status === 'Assigned' ? 'bg-blue-500' :
                asset.status === 'Available' ? 'bg-green-500' :
                asset.status === 'Under Maintenance' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{asset.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    asset.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                    asset.status === 'Available' ? 'bg-green-100 text-green-800' :
                    asset.status === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {asset.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Category: {asset.category}
                  </div>

                  {asset.assignedTo && (
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Assigned to: {asset.assignedTo}
                    </div>
                  )}

                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Last updated: {asset.lastUpdate}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/inventorymanagement/assets/${asset.id}`)}
                  className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackAssignmentAssest;