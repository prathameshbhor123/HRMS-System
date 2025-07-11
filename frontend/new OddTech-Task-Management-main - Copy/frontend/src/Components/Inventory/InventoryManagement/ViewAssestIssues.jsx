import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // Import SweetAlert

const ViewAssetIssues = () => {
  const [issues, setIssues] = useState([
    { 
      id: 1, 
      asset: 'Laptop Dell XPS', 
      serial: 'DLXPS-001', 
      reportedBy: 'John Smith', 
      date: '2025-06-25', 
      issue: 'Keyboard not working properly', 
      status: 'Open', 
      priority: 'High',
      resolution: ''
    },
    { 
      id: 2, 
      asset: 'Projector Epson', 
      serial: 'EPPRJ-202', 
      reportedBy: 'Sarah Johnson', 
      date: '2025-06-28', 
      issue: 'Image flickering during presentations', 
      status: 'In Progress', 
      priority: 'Medium',
      resolution: 'Being inspected by IT team'
    },
    { 
      id: 3, 
      asset: 'Conference Phone', 
      serial: 'POLY-305', 
      reportedBy: 'Michael Brown', 
      date: '2025-06-30', 
      issue: 'Microphone not picking up voices', 
      status: 'Resolved', 
      priority: 'High',
      resolution: 'Replaced microphone unit'
    },
  ]);
  
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [status, setStatus] = useState('');
  const [resolution, setResolution] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setStatus(issue.status);
    setResolution(issue.resolution || '');
  };
  
  const handleUpdateIssue = (e) => {
    e.preventDefault();
    if (!selectedIssue) return;
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        const updatedIssues = issues.map(i => 
          i.id === selectedIssue.id 
            ? { ...i, status, resolution } 
            : i
        );
        
        setIssues(updatedIssues);
        setIsUpdating(false);
        
        // SweetAlert success notification
        Swal.fire({
          title: 'Success!',
          text: 'Issue updated successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#6366f1',
          timer: 3000,
          timerProgressBar: true,
        });
      } catch (error) {
        setIsUpdating(false);
        
        // SweetAlert error notification
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update issue',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#ef4444',
        });
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">View Asset Issues</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issues.map((issue) => (
                    <motion.tr 
                      key={issue.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleSelectIssue(issue)}
                      className={`cursor-pointer transition-colors ${
                        selectedIssue?.id === issue.id 
                          ? 'bg-indigo-50' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{issue.asset}</div>
                        <div className="text-sm text-gray-500">{issue.serial}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{issue.issue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{issue.reportedBy}</div>
                        <div className="text-sm text-gray-500">{issue.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          issue.status === 'Open' ? 'bg-red-100 text-red-800' :
                          issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.priority}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {selectedIssue ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Issue Details</h3>
                <button 
                  onClick={() => setSelectedIssue(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedIssue.asset}</h4>
                    <p className="text-sm text-gray-600">{selectedIssue.serial}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedIssue.priority === 'High' ? 'bg-red-100 text-red-800' :
                    selectedIssue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedIssue.priority} Priority
                  </span>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-700">{selectedIssue.issue}</p>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>Reported by: {selectedIssue.reportedBy}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedIssue.date}</span>
                </div>
              </div>
              
              <form onSubmit={handleUpdateIssue}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Notes</label>
                  <textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add resolution details..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-300 ${
                    isUpdating ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  {isUpdating ? 'Updating...' : 'Update Issue'}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Select an Issue</h3>
              <p className="text-gray-600">
                Click on an asset issue from the list to view details and update its status.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewAssetIssues;