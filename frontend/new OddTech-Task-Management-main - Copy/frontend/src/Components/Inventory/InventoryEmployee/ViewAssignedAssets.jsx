import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const ViewAssignedAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAsset, setExpandedAsset] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [returningAssets, setReturningAssets] = useState({});

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));
  const employeeId = userData?.id;

  useEffect(() => {
    const fetchAssignedAssets = async () => {
      try {
        setLoading(true);

        if (!employeeId) {
          throw new Error('Employee ID not found in user data');
        }

        const response = await api.get(`/assignments/employee/${employeeId}`);
        setAssets(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch assets');
        Swal.fire({
          title: 'Error',
          text: 'Failed to load your assigned assets',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchAssignedAssets();
    } else {
      setError('Employee information not available');
      setLoading(false);
    }
  }, [employeeId]);

  const toggleExpand = (id) => {
    setExpandedAsset(expandedAsset === id ? null : id);
  };

  const handleReturnAsset = async (assignmentId) => {
    try {
      if (!employeeId) {
        throw new Error('Employee ID not available');
      }

      setReturningAssets(prev => ({...prev, [assignmentId]: true}));

      const { value: condition } = await Swal.fire({
        title: 'Return Asset',
        input: 'select',
        inputOptions: {
          'Available': 'Available',
          'Maintenance': 'Maintenance',
          'Damaged': 'Damaged'
        },
        inputPlaceholder: 'Select condition',
        showCancelButton: true,
        inputValidator: (value) => !value ? 'You need to select a condition' : null
      });

      if (condition) {
        await api.put(`/assignments/${assignmentId}/return?condition=${encodeURIComponent(condition)}`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        Swal.fire({
          title: 'Asset Returned!',
          text: 'The asset has been successfully returned',
          icon: 'success'
        });

        // Refresh data
        const response = await api.get(`/assignments/employee/${employeeId}`);
        setAssets(response.data);
      }
    } catch (error) {
      console.error('Error returning asset:', error);
      Swal.fire({
        title: 'Return Failed',
        text: error.response?.data?.message || error.message || 'Could not return the asset',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setReturningAssets(prev => ({...prev, [assignmentId]: false}));
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'RETURNED':
        return 'bg-gray-100 text-gray-800';
      case 'MAINTENANCE':
        return 'bg-yellow-100 text-yellow-800';
      case 'DAMAGED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getWarrantyStatus = (warrantyDate) => {
    if (!warrantyDate) return 'Unknown';
    const today = new Date();
    const warranty = new Date(warrantyDate);
    return warranty >= today ? 'Active' : 'Expired';
  };

  const getWarrantyColor = (warrantyDate) => {
    if (!warrantyDate) return 'text-gray-600';
    const today = new Date();
    const warranty = new Date(warrantyDate);
    return warranty >= today ? 'text-green-600' : 'text-red-600';
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'laptop':
        return (
          <div className="bg-indigo-100 rounded-xl p-3">
            <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        );
      case 'phone':
        return (
          <div className="bg-blue-100 rounded-xl p-3">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
        );
      case 'monitor':
        return (
          <div className="bg-purple-100 rounded-xl p-3">
            <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        );
      case 'mouse':
        return (
          <div className="bg-amber-100 rounded-xl p-3">
            <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18m0 0l-4-4m4 4l4-4"></path>
            </svg>
          </div>
        );
      case 'tablet':
        return (
          <div className="bg-cyan-100 rounded-xl p-3">
            <svg className="h-8 w-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 rounded-xl p-3">
            <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        );
    }
  };

  const filteredAssets = assets.filter(assignment => {
    const asset = assignment.asset || {};
    const matchesFilter = filter === 'all' ||
                         assignment.status?.toLowerCase() === filter.toLowerCase() ||
                         asset?.type?.toLowerCase() === filter.toLowerCase();

    const matchesSearch = asset?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset?.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset?.productId?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading assets: {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Your Assigned Assets</h1>

        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search assets..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Assets
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'active' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('maintenance')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'maintenance' ? 'bg-yellow-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setFilter('laptop')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'laptop' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Laptops
            </button>
          </div>
        </div>
      </div>

      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">No assets found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          <div className="mt-6">
            <button
              onClick={() => { setFilter('all'); setSearchTerm(''); }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAssets.map((assignment) => {
            const asset = assignment.asset || {};
            const warrantyStatus = getWarrantyStatus(asset.warrantyDate);
            const warrantyColor = getWarrantyColor(asset.warrantyDate);

            return (
              <div
                key={assignment.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg ${expandedAsset === assignment.id ? 'ring-2 ring-indigo-500' : ''}`}
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => toggleExpand(assignment.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getTypeIcon(asset.type)}
                    </div>

                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{asset.name}</h2>
                          <p className="mt-1 text-sm text-gray-500 flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {asset.type}
                            </span>
                            <span className="ml-2">Serial: {asset.serialNumber}</span>
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Assigned</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(assignment.assignmentDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Condition</p>
                            <p className="text-sm font-medium text-gray-900">
                              {asset.assetCondition}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Expected Return</p>
                            <p className="text-sm font-medium text-gray-900">
                              {assignment.expectedReturnDate ? new Date(assignment.expectedReturnDate).toLocaleDateString() : 'Not specified'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedAsset === assignment.id && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-md font-medium text-gray-900 mb-2">Asset Details</h3>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-gray-700">{asset.description || 'No description available'}</p>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Product ID</p>
                              <p className="text-sm font-medium text-gray-900">{asset.productId || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p className="text-sm font-medium text-gray-900">{asset.type || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Assigned Since</p>
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(assignment.assignmentDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Serial Number</p>
                              <p className="text-sm font-medium text-gray-900">{asset.serialNumber || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Current Condition</p>
                              <p className="text-sm font-medium text-gray-900">
                                {asset.assetCondition || 'N/A'}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Expected Return</p>
                              <p className="text-sm font-medium text-gray-900">
                                {assignment.expectedReturnDate ? new Date(assignment.expectedReturnDate).toLocaleDateString() : 'Not specified'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-2">Asset Actions</h3>
                        <div className="space-y-3">
                          {assignment.status === 'ACTIVE' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleReturnAsset(assignment.id)}
                                disabled={returningAssets[assignment.id]}
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                              >
                                {returningAssets[assignment.id] ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Return Asset
                                  </>
                                )}
                              </button>
                            </>
                          )}

                          {asset.documentationUrl && (
                            <a
                              href={asset.documentationUrl}
                              download
                              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                              </svg>
                              Download Documentation
                            </a>
                          )}

                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                  <strong>Return Policy:</strong> Assets must be returned by the scheduled date.
                                  Late returns may incur penalties. All accessories must be included.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredAssets.length}</span> of <span className="font-medium">{assets.length}</span> assets
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewAssignedAssets;