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

const RequestNewAsset = () => {
  const [formData, setFormData] = useState({
    assetId: '',
    reason: '',
    urgency: 'normal',
    additionalInfo: '',
    assignDate: '',
    returnDate: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [productId, setProductId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableAssets, setAvailableAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);
  useEffect(() => {
    const fetchAvailableAssets = async () => {
      try {
        const response = await api.get('/assets/available');
        setAvailableAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableAssets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/assignments/request', {
        assetId: formData.assetId,
        employeeId: user?.id,
        reason: formData.reason,
        urgency: formData.urgency,
        expectedReturnDate: formData.returnDate || null,
        additionalInfo: formData.additionalInfo
      });

      setProductId(`REQ-${response.data.id}`);
      setSubmitted(true);

      Swal.fire({
        title: 'Request Submitted!',
        text: 'Your asset request has been submitted for approval',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      Swal.fire({
        title: 'Request Failed',
        text: error.response?.data?.message || 'There was an error submitting your request',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      assetId: '',
      reason: '',
      urgency: 'normal',
      additionalInfo: '',
      assignDate: '',
      returnDate: ''
    });
    setProductId('');
    setSearchTerm('');
    setSubmitted(false);
  };

  const filteredAssets = availableAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-full">
              <div className="bg-white rounded-full p-3">
                <svg className="h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h1>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">Request ID</p>
                <p className="font-medium text-blue-600">{productId || 'Pending Assignment'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">Pending Approval</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-4">
              Your request has been submitted successfully. The IT department will review your request.
            </p>

            <div className="inline-flex items-center space-x-2 text-blue-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span className="font-medium">You'll receive a confirmation email shortly</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={resetForm}
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Make Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-1">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request New Asset</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-xl font-bold text-white">Asset Request Form</h2>
          <p className="text-blue-100">Complete all required fields below</p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="assetSearch" className="block text-sm font-medium text-gray-700">
                Asset Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="assetSearch"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for an asset..."
                  className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  id="assetId"
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleChange}
                  required
                  className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white mt-2"
                >
                  <option value="">Select an asset from the list</option>
                  {filteredAssets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.productId})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="assignDate" className="block text-sm font-medium text-gray-700">
                  Needed From Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="assignDate"
                  name="assignDate"
                  value={formData.assignDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                  Expected Return Date (Optional)
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.assignDate || new Date().toISOString().split('T')[0]}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Request <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Explain why you need this asset..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Urgency <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    formData.urgency === 'low'
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({...prev, urgency: 'low'}))}
                >
                  <div className="flex items-start">
                    <input
                      id="low"
                      name="urgency"
                      type="radio"
                      value="low"
                      checked={formData.urgency === 'low'}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="low" className="ml-3 block text-sm font-medium text-gray-700">
                      <div className="flex items-center mb-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                        Low Priority
                      </div>
                      <p className="text-xs text-gray-500 font-normal">Can wait 2+ weeks</p>
                    </label>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    formData.urgency === 'normal'
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({...prev, urgency: 'normal'}))}
                >
                  <div className="flex items-start">
                    <input
                      id="normal"
                      name="urgency"
                      type="radio"
                      value="normal"
                      checked={formData.urgency === 'normal'}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="normal" className="ml-3 block text-sm font-medium text-gray-700">
                      <div className="flex items-center mb-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></span>
                        Normal Priority
                      </div>
                      <p className="text-xs text-gray-500 font-normal">Needed within 1-2 weeks</p>
                    </label>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    formData.urgency === 'high'
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({...prev, urgency: 'high'}))}
                >
                  <div className="flex items-start">
                    <input
                      id="high"
                      name="urgency"
                      type="radio"
                      value="high"
                      checked={formData.urgency === 'high'}
                      onChange={handleChange}
                      className="mt-1 focus:ring-blue-500 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="high" className="ml-3 block text-sm font-medium text-gray-700">
                      <div className="flex items-center mb-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></span>
                        High Priority
                      </div>
                      <p className="text-xs text-gray-500 font-normal">Needed immediately</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <div className="mt-1">
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Any specific requirements or details..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Important Information</h3>
            <div className="mt-2 text-gray-700">
              <p>All asset requests must be approved by your manager and the IT department. Approval time may vary based on:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Request urgency</li>
                <li>Asset availability</li>
                <li>Budget considerations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestNewAsset;