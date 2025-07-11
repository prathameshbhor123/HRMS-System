import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const ManageAssets = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    productId: '',
    name: '',
    serialNumber: '',
    type: '',
    assetCondition: 'Available'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const getStatusBadge = (asset) => {
    // Check if asset has active assignments
    const hasActiveAssignment = asset.assignments?.some(
      assignment => assignment.status === 'ACTIVE'
    );

    if (hasActiveAssignment) {
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Assigned</span>;
    }

    switch (asset.assetCondition) {
      case 'Available':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>;
      case 'Maintenance':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Maintenance</span>;
      case 'Damaged':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Damaged</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{asset.assetCondition}</span>;
    }
  };

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/assets');
       console.log('API Response:', response.data);
      setAssets(response.data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      setError('Failed to load assets. Please try again.');
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate product ID when adding new asset
  useEffect(() => {
    if (isAdding && !editingId) {
      // Find the highest product ID number
      const maxId = assets.reduce((max, asset) => {
        const num = parseInt(asset.productId?.replace('ASSET-', '') || 0);
        return num > max ? num : max;
      }, 0);

      const generatedId = `ASSET-${(maxId + 1).toString().padStart(3, '0')}`;
      setNewAsset(prev => ({ ...prev, productId: generatedId }));
    }
  }, [isAdding, editingId, assets]);

  const handleAddAsset = async () => {
    if (!newAsset.name || !newAsset.serialNumber) {
      setError('Name, Serial Number, and Product ID are required');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/assets/${editingId}`, newAsset);
      } else {
        await api.post('/assets', newAsset);
      }

      setNewAsset({
        productId: '',
        name: '',
        serialNumber: '',
        type: '',
        assetCondition: 'Available'
      });
      setEditingId(null);
      setIsAdding(false);
      await fetchAssets();
    } catch (error) {
      console.error('Error saving asset:', error);
      setError(error.response?.data?.message || 'Failed to save asset. Please try again.');
    }
  };

const handleDelete = async (id) => {
  try {
    const response = await api.delete(`/assets/${id}`);

    // If successful (204 No Content), remove from local state
    setAssets(assets.filter(asset => asset.id !== id));

  } catch (error) {
    console.error('Error deleting asset:', error);

    // Handle 400 Bad Request specifically
    if (error.response?.status === 400) {
      setError(error.response.data?.message || 'Cannot delete asset: it has active assignments or requests');
    }
    // Handle 404 Not Found
    else if (error.response?.status === 404) {
      setError('Asset not found');
    }
    // Handle other errors
    else {
      setError('Failed to delete asset. Please try again.');
    }
  }
}
  const handleEdit = (asset) => {
    setNewAsset({
      productId: asset.productId,
      name: asset.name,
      serialNumber: asset.serialNumber,
      type: asset.type,
      assetCondition: asset.assetCondition
    });
    setEditingId(asset.id);
    setIsAdding(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Assets</h2>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            if (editingId) {
              setEditingId(null);
              setNewAsset({
                productId: '',
                name: '',
                serialNumber: '',
                type: '',
                assetCondition: 'Available'
              });
            }
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
        >
          {isAdding ? 'Cancel' : 'Add New Asset'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {(isAdding || editingId) && (
        <motion.div
          className="bg-indigo-50 p-6 rounded-xl mb-8 border border-indigo-100"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-indigo-800">
            {editingId ? 'Edit Asset' : 'Add New Asset'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
              <input
                type="text"
                value={newAsset.productId}
                onChange={(e) => setNewAsset({...newAsset, productId: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., ASSET-001"
                disabled={!editingId}
              />
              {!editingId && (
                <p className="text-xs text-gray-500 mt-1">Auto-generated product ID</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
              <input
                type="text"
                value={newAsset.name}
                onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Laptop Dell XPS"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
              <input
                type="text"
                value={newAsset.serialNumber}
                onChange={(e) => setNewAsset({...newAsset, serialNumber: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., DLXPS-001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newAsset.type}
                onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Office Equipment">Office Equipment</option>
                <option value="Furniture">Furniture</option>
                <option value="Communication">Communication</option>
                <option value="Vehicles">Vehicles</option>
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                Available
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddAsset}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
              disabled={!newAsset.name || !newAsset.serialNumber}
            >
              {editingId ? 'Update Asset' : 'Add Asset'}
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Filter to show only available assets */}
              {assets.map((asset) => (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.productId || "NA"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{asset.serialNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{asset.type || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {getStatusBadge(asset)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.assignments?.length > 0 && asset.assignments[0].employee
                      ? `${asset.assignments[0].employee.name} - ${asset.assignments[0].employee.email}`
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(asset)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

}
export default ManageAssets;