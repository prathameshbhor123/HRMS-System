import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const AssignAssets = () => {
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeAssignments, setActiveAssignments] = useState([]);
  const [assignment, setAssignment] = useState({
    employeeId: '',
    assetId: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [returningAssets, setReturningAssets] = useState({});
useEffect(() => {
  console.log('Active assignments updated:', activeAssignments);
}, [activeAssignments]);

useEffect(() => {
  console.log('Assets with assignments:', assets.filter(a =>
    a.assignments?.some(ass => ass.status === 'ACTIVE')));
}, [assets]);

  useEffect(() => {
    // Update the fetchData function
    const fetchData = async () => {
      try {
        const [employeesRes, assetsRes, requestsRes, activeAssignmentsRes] = await Promise.all([
                  api.get('/assignments/employees'),
                  api.get('/assets'),
                  api.get('/assignments/requests/pending'),
                  api.get('/assignments/active-with-details')
                ]);

        setEmployees(employeesRes.data || []);
            setAssets(assetsRes.data || []);
            setRequests(requestsRes.data || []);
            setActiveAssignments(activeAssignmentsRes.data || []);

        // Ensure requests have proper structure
        const processedRequests = requestsRes.data.map(request => ({
          ...request,
          employee: request.employee || {},
          asset: request.asset || {},
          requestDate: request.requestDate || new Date().toISOString()
        }));

        setRequests(processedRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load data. Please try again.',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Current assets data:', assets);
  }, [assets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post('/assignments', assignment);

      const selectedEmployee = employees.find(e => e.id === parseInt(assignment.employeeId));
      const selectedAsset = assets.find(a => a.id === parseInt(assignment.assetId));

      Swal.fire({
        title: 'Asset Assigned!',
        html: `...`,
        icon: 'success'
      });

      // Refresh ALL data including active assignments
      const [assetsRes, requestsRes, activeAssignmentsRes] = await Promise.all([
        api.get('/assets'),
        api.get('/assignments/requests/pending'),
        api.get('/assignments/active-with-details')
      ]);
      setAssets(assetsRes.data);
      setRequests(requestsRes.data);
      console.log('Processed requests:', requestsRes.data);
      setActiveAssignments(activeAssignmentsRes.data);

      // Reset form
      setAssignment({
        employeeId: '',
        assetId: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    } catch (error) {
      console.error('Error assigning asset:', error);
      Swal.fire({
        title: 'Assignment Failed',
        text: error.response?.data?.message || 'Could not assign the asset',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const flattenedAssignments = assets.flatMap(asset =>
    asset.assignments?.map(assignment => ({
      ...assignment,
      asset: { // Include minimal asset info
        id: asset.id,
        name: asset.name,
        productId: asset.productId,
        assetCondition: asset.assetCondition
      },
      employee: employees.find(e => e.id === assignment.employeeId) || {}
    })) || []
  ).filter(a => a.status === 'ACTIVE');

  const handleRequestAction = async (requestId, action) => {
    try {
      if (action === 'view') {
        const request = requests.find(r => r.id === requestId);
        setActiveRequest(request);
        return;
      }

      const result = await Swal.fire({
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Request`,
        text: `Are you sure you want to ${action} this request?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: action === 'reject' ? '#ef4444' : '#6366f1',
        cancelButtonColor: '#6b7280',
        confirmButtonText: `Yes, ${action}`,
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        let response;
        if (action === 'assign') {
          response = await api.put(`/assignments/requests/${requestId}/approve`);
        } else if (action === 'reject') {
          response = await api.put(`/assignments/requests/${requestId}/reject`);
        }

        Swal.fire({
          title: `Request ${action === 'assign' ? 'Approved' : 'Rejected'}`,
          text: `The request has been ${action}ed successfully`,
          icon: 'success',
          confirmButtonColor: '#6366f1',
        });

        // Refresh ALL data including active assignments
        const [assetsRes, requestsRes, activeAssignmentsRes] = await Promise.all([
          api.get('/assets'),
          api.get('/assignments/requests/pending'),
          api.get('/assignments/active-with-details')
        ]);
        setAssets(assetsRes.data);
        setRequests(requestsRes.data);
        setActiveAssignments(activeAssignmentsRes.data);
        setActiveRequest(null);
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      Swal.fire({
        title: 'Error',
        text: `Failed to ${action} request`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleReturnAsset = async (assignmentId) => {
    if (!assignmentId) return;

    try {
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

        // Refresh ALL data
        const [assetsRes, requestsRes, activeAssignmentsRes] = await Promise.all([
          api.get('/assets'),
          api.get('/assignments/requests/pending'),
          api.get('/assignments/active-with-details')
        ]);
        setAssets(assetsRes.data);
        setRequests(requestsRes.data);
        setActiveAssignments(activeAssignmentsRes.data);
      }
    } catch (error) {
      console.error('Error returning asset:', error);
      Swal.fire({
        title: 'Return Failed',
        text: error.response?.data?.message || 'Could not return the asset',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } finally {
    setReturningAssets(prev => ({...prev, [assignmentId]: false}));
  }
  };

  const getStatusBadge = (asset) => {
    // Check if asset has active assignments
    const hasActiveAssignment = asset.assignments?.some(
      assignment => assignment.status === 'ACTIVE'
    );

    if (hasActiveAssignment) {
      return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">Assigned</span>;
    }

    switch (asset.assetCondition) {
      case 'Available':
        return <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">Available</span>;
      case 'Maintenance':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full">Maintenance</span>;
      case 'Damaged':
        return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full">Damaged</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded-full">{asset.assetCondition}</span>;
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.name} (${employee.department})` : 'Unassigned';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Asset Assignment Management</h2>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assets Inventory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
           <tbody className="bg-white divide-y divide-gray-200">
             {flattenedAssignments.length > 0 ? (
               flattenedAssignments.map((assignment) => (
                 <tr key={`${assignment.asset.id}-${assignment.id}`} className="hover:bg-gray-50">
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                     {assignment.asset.productId}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {assignment.asset.name}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                       Assigned
                     </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     <div>
                       <p>{assignment.employee?.name || 'Unassigned'}</p>
                       <p className="text-xs text-gray-400">
                         {assignment.employee?.email || 'No email available'}
                       </p>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button
                       onClick={() => handleReturnAsset(assignment.id)}
                       className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-sm transition-colors"
                     >
                       Return
                     </button>
                   </td>
                 </tr>
               ))
             ) : (
               <tr>
                 <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                   No active assignments found
                 </td>
               </tr>
             )}
           </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Panel */}
      {activeRequest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Request Details</h3>
            <button
              onClick={() => setActiveRequest(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Employee Information</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{activeRequest.employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{activeRequest.employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">{activeRequest.employee.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{activeRequest.employee.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Asset Request</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Requested Asset</p>
                  <p className="font-medium">{activeRequest.asset.name} ({activeRequest.asset.productId})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">{new Date(activeRequest.requestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium">{activeRequest.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Urgency</p>
                  <p className="font-medium capitalize">{activeRequest.urgency}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={() => handleRequestAction(activeRequest.id, 'assign')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Approve & Assign
            </button>
            <button
              onClick={() => handleRequestAction(activeRequest.id, 'reject')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reject Request
            </button>
          </div>
        </motion.div>
      )}

       <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
{/*         <motion.div */}
{/*           className="bg-white rounded-xl shadow-lg p-6" */}
{/*           whileHover={{ y: -5 }} */}
{/*           transition={{ duration: 0.3 }} */}
{/*         > */}
{/*           <h3 className="text-lg font-semibold text-gray-800 mb-4">Direct Asset Assignment</h3> */}

{/*           <form onSubmit={handleSubmit}> */}
{/*             <div className="mb-4"> */}
{/*               <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label> */}
{/*               <select */}
{/*                 name="employeeId" */}
{/*                 value={assignment.employeeId} */}
{/*                 onChange={handleChange} */}
{/*                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" */}
{/*                 required */}
{/*               > */}
{/*                 <option value="">Select an employee</option> */}
{/*                 {employees.map(employee => ( */}
{/*                   <option key={employee.id} value={employee.id}> */}
{/*                     {employee.name} ({employee.department}) */}
{/*                   </option> */}
{/*                 ))} */}
{/*               </select> */}
{/*             </div> */}

{/*             <div className="mb-4"> */}
{/*               <label className="block text-sm font-medium text-gray-700 mb-1">Select Available Asset</label> */}
{/*               <select */}
{/*                 name="assetId" */}
{/*                 value={assignment.assetId} */}
{/*                 onChange={handleChange} */}
{/*                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" */}
{/*                 required */}
{/*               > */}
{/*                 <option value="">Select an asset</option> */}
{/*                 {assets.filter(a => a.assetCondition === 'Available').map(asset => ( */}
{/*                   <option key={asset.id} value={asset.id}> */}
{/*                     {asset.name} ({asset.productId}) */}
{/*                   </option> */}
{/*                 ))} */}
{/*               </select> */}
{/*             </div> */}

{/*             <div className="mb-4"> */}
{/*               <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Date</label> */}
{/*               <input */}
{/*                 type="date" */}
{/*                 name="date" */}
{/*                 value={assignment.date} */}
{/*                 onChange={handleChange} */}
{/*                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" */}
{/*                 required */}
{/*               /> */}
{/*             </div> */}

{/*             <div className="mb-6"> */}
{/*               <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label> */}
{/*               <textarea */}
{/*                 name="notes" */}
{/*                 value={assignment.notes} */}
{/*                 onChange={handleChange} */}
{/*                 rows="3" */}
{/*                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" */}
{/*                 placeholder="Any additional information..." */}
{/*               ></textarea> */}
{/*             </div> */}

{/*             <button */}
{/*               type="submit" */}
{/*               disabled={isSubmitting} */}
{/*               className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-300 ${ */}
{/*                 isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]' */}
{/*               }`} */}
{/*             > */}
{/*               {isSubmitting ? 'Assigning...' : 'Assign Asset'} */}
{/*             </button> */}
{/*           </form> */}
{/*         </motion.div> */}

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pending Requests ({requests.length})
          </h3>

          {requests.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 className="mt-4 text-lg font-medium text-gray-900">No pending requests</h4>
              <p className="mt-2 text-gray-500">All requests have been processed</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {requests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >

                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 truncate">
                          {request.asset?.name || 'Unknown Asset'}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Requested by: {request.employee?.name || 'Unknown Employee'}
                        </p>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full whitespace-nowrap">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 truncate">
                      Reason: {request.reason || 'No reason provided'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 capitalize">
                      Urgency: {request.urgency || 'Normal'}
                    </p>

                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => handleRequestAction(request.id, 'assign')}
                        className="text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-md transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, 'reject')}
                        className="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, 'view')}
                        className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-md transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AssignAssets;