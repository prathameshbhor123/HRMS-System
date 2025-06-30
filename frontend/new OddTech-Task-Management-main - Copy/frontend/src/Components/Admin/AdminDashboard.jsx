
import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SearchIcon } from '@heroicons/react/solid';

const API_BASE_URL = 'http://localhost:8080/api/admin';

const AdminService = {
  getTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  searchTask: async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/search/${encodeURIComponent(title)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      const contentLength = response.headers.get('content-length');
      if (contentLength && contentLength !== '0') {
        return await response.json();
      } else {
        return { success: true };
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type] || 'bg-blue-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[300px]`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Date filter states
  const [startDateRange, setStartDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection'
  });

  const [dueDateRange, setDueDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection'
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);


  const [showCharts, setShowCharts] = useState(false);


  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (allTasks.length > 0) {
      applyFilters();
    }
  }, [startDateRange, dueDateRange, allTasks, searchQuery]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getTasks();
      setAllTasks(data);
      setTasks(data);
    } catch (error) {
      showNotification('Failed to fetch tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchQuery(term);

    if (term.trim() === '') {
      setTasks(allTasks);
      return;
    }

    try {
      setIsLoading(true);
      const results = await AdminService.searchTask(term);

      if (results.length === 0) {
        const filtered = allTasks.filter(task =>
          task.title.toLowerCase().includes(term.toLowerCase()) ||
          task.description.toLowerCase().includes(term.toLowerCase()) ||
          (task.employeeName && task.employeeName.toLowerCase().includes(term.toLowerCase())) ||
          task.taskStatus.toLowerCase().includes(term.toLowerCase()) ||
          task.priority.toLowerCase().includes(term.toLowerCase())
        );
        setTasks(filtered);
      } else {
        setTasks(results);
      }
    } catch (error) {
      const filtered = allTasks.filter(task =>
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.description.toLowerCase().includes(term.toLowerCase()) ||
        (task.employeeName && task.employeeName.toLowerCase().includes(term.toLowerCase())) ||
        task.taskStatus.toLowerCase().includes(term.toLowerCase()) ||
        task.priority.toLowerCase().includes(term.toLowerCase())
      );
      setTasks(filtered);
      showNotification('Search failed, using local results', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await AdminService.deleteTask(id);
      await fetchTasks();
      showNotification('Task deleted successfully', 'success');
    } catch (error) {
      showNotification('Failed to delete task', 'error');
    }
  };

  const applyFilters = () => {
    let filteredTasks = [...allTasks];

    // Start date range filter
    if (startDateRange.startDate && startDateRange.endDate) {
      const startStart = new Date(startDateRange.startDate);
      const startEnd = new Date(startDateRange.endDate);
      startEnd.setHours(23, 59, 59, 999);

      filteredTasks = filteredTasks.filter(task => {
        const taskStart = new Date(task.startDate);
        return taskStart >= startStart && taskStart <= startEnd;
      });
    }

    // Due date range filter
    if (dueDateRange.startDate && dueDateRange.endDate) {
      const dueStart = new Date(dueDateRange.startDate);
      const dueEnd = new Date(dueDateRange.endDate);
      dueEnd.setHours(23, 59, 59, 999);

      filteredTasks = filteredTasks.filter(task => {
        const taskDue = new Date(task.dueDate);
        return taskDue >= dueStart && taskDue <= dueEnd;
      });
    }

    // Search filter
    if (searchQuery.trim() !== '') {
      const term = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        (task.employeeName && task.employeeName.toLowerCase().includes(term)) ||
        task.taskStatus.toLowerCase().includes(term) ||
        task.priority.toLowerCase().includes(term)
      );
    }

    setTasks(filteredTasks);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatRangeDisplay = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Select date range';
    const format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (startDate.toDateString() === endDate.toDateString()) return format(startDate);
    return `${format(startDate)} - ${format(endDate)}`;
  };

  const handleClearFilters = () => {
    setStartDateRange({ startDate: null, endDate: null, key: 'selection' });
    setDueDateRange({ startDate: null, endDate: null, key: 'selection' });
    setSearchQuery('');
    setTasks(allTasks);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const groupedTasks = tasks.reduce((groups, task) => {
    const dateKey = task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : 'No Date';
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(task);
    return groups;
  }, {});

  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
    if (a === 'No Date') return 1;
    if (b === 'No Date') return -1;
    return new Date(a) - new Date(b);
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 p-4">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 mt-20 px-2">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">All Tasks</h1>
          <button
            onClick={toggleViewMode}
            className="ml-4 p-2 bg-gray-200 hover:bg-gray-300 rounded"
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>




          <div className="relative flex-grow max-w-md ml-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-right pointer-events-none">
              <SearchIcon className="h-7 w-5 text-gray-400 pt-3" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 placeholder-gray-400 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="relative">
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowStartDatePicker(!showStartDatePicker)}
            >
              Start Date: {formatRangeDisplay(startDateRange.startDate, startDateRange.endDate)}
            </button>

            {showStartDatePicker && (
              <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
                <DateRangePicker
                  ranges={[startDateRange]}
                  onChange={item => {
                    setStartDateRange(item.selection);
                    setShowStartDatePicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowDueDatePicker(!showDueDatePicker)}
            >
              Due Date: {formatRangeDisplay(dueDateRange.startDate, dueDateRange.endDate)}
            </button>

            {showDueDatePicker && (
              <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
                <DateRangePicker
                  ranges={[dueDateRange]}
                  onChange={item => {
                    setDueDateRange(item.selection);
                    setShowDueDatePicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mt-8 px-2">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No tasks found</div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-8">
            {sortedDateKeys.map(dateKey => (
              <div key={dateKey} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
                  {dateKey === 'No Date' ? 'No Start Date' : new Date(dateKey).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedTasks[dateKey].map(task => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h3>
                        <p className="text-gray-700 mb-4 h-18 overflow-hidden">{task.description}</p>

                        <div className="border-t border-b border-gray-200 my-4"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center">
                            <span className="text-gray-600">Start Date:</span>
                            <span className="font-semibold ml-1">{formatDate(task.startDate)}</span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Due Date:</span>
                            <span className="font-semibold">{formatDate(task.dueDate)}</span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Employee:</span>
                            <span className="font-semibold">{task.employeeName}</span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Priority:</span>
                            <span className="font-semibold">{task.priority}</span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Status:</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.taskStatus)}`}>
                              {task.taskStatus}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-b border-gray-200 my-4"></div>

                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/viewtaskdetails/${task.id}`)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                            aria-label="View"
                            disabled={isLoading}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => navigate(`/updatetask/${task.id}`)}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                            aria-label="Edit"
                            disabled={isLoading}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                            aria-label="Delete"
                            disabled={isLoading}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-100">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{task.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs truncate">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{formatDate(task.startDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{formatDate(task.dueDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{task.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.taskStatus)}`}>
                        {task.taskStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/viewtaskdetails/${task.id}`)}
                          className="text-blue-500 hover:text-blue-700"
                          aria-label="View"
                          disabled={isLoading}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => navigate(`/updatetask/${task.id}`)}
                          className="text-green-500 hover:text-green-700"
                          aria-label="Edit"
                          disabled={isLoading}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete"
                          disabled={isLoading}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';

// const API_BASE_URL = 'http://localhost:8080/api/admin';

// const AdminService = {
//   getTasks: async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/tasks`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       throw error;
//     }
//   },

//   searchTask: async (title) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/tasks/search/${encodeURIComponent(title)}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Search failed');
//       }
//       return await response.json();
//     } catch (error) {
//       console.error('Error searching tasks:', error);
//       throw error;
//     }
//   },

//   deleteTask: async (id) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/task/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete task');
//       }
//       const contentLength = response.headers.get('content-length');
//       if (contentLength && contentLength !== '0') {
//         return await response.json();
//       } else {
//         return { success: true };
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       throw error;
//     }
//   }
// };

// const Notification = ({ message, type, onClose }) => {
//   const bgColor = {
//     success: 'bg-green-500',
//     error: 'bg-red-500',
//     warning: 'bg-yellow-500',
//     info: 'bg-blue-500'
//   }[type] || 'bg-blue-500';

//   return (
//     <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[300px]`}>
//       <span>{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-white hover:text-gray-200 focus:outline-none"
//         aria-label="Close notification"
//       >
//         ×
//       </button>
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [notification, setNotification] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [allTasks, setAllTasks] = useState([]);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

//   // Date filter states
//   const [startDateRange, setStartDateRange] = useState({
//     startDate: null,
//     endDate: null,
//     key: 'selection'
//   });

//   const [dueDateRange, setDueDateRange] = useState({
//     startDate: null,
//     endDate: null,
//     key: 'selection'
//   });

//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showDueDatePicker, setShowDueDatePicker] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     if (allTasks.length > 0) {
//       applyFilters();
//     }
//   }, [startDateRange, dueDateRange, allTasks]);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'in progress':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'pending':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const fetchTasks = async () => {
//     setIsLoading(true);
//     try {
//       const data = await AdminService.getTasks();
//       setAllTasks(data);
//       setTasks(data);
//     } catch (error) {
//       showNotification('Failed to fetch tasks', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const handleSearch = async (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     try {
//       if (term.trim() === '') {
//         setTasks(allTasks);
//       } else {
//         setIsLoading(true);
//         const results = await AdminService.searchTask(term);
//         setTasks(results);
//       }
//     } catch (error) {
//       showNotification('Search failed', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };





//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     try {
//       await AdminService.deleteTask(id);
//       await fetchTasks();
//       showNotification('Task deleted successfully', 'success');
//     } catch (error) {
//       showNotification('Failed to delete task', 'error');
//     }
//   };

//   const applyFilters = () => {
//     let filteredTasks = [...allTasks];

//     // Start date range filter
//     if (startDateRange.startDate && startDateRange.endDate) {
//       const startStart = new Date(startDateRange.startDate);
//       const startEnd = new Date(startDateRange.endDate);
//       startEnd.setHours(23, 59, 59, 999);

//       filteredTasks = filteredTasks.filter(task => {
//         const taskStart = new Date(task.startDate);
//         return taskStart >= startStart && taskStart <= startEnd;
//       });
//     }

//     // Due date range filter
//     if (dueDateRange.startDate && dueDateRange.endDate) {
//       const dueStart = new Date(dueDateRange.startDate);
//       const dueEnd = new Date(dueDateRange.endDate);
//       dueEnd.setHours(23, 59, 59, 999);

//       filteredTasks = filteredTasks.filter(task => {
//         const taskDue = new Date(task.dueDate);
//         return taskDue >= dueStart && taskDue <= dueEnd;
//       });
//     }

//     setTasks(filteredTasks);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const formatRangeDisplay = (startDate, endDate) => {
//     if (!startDate || !endDate) return 'Select date range';
//     const format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     if (startDate.toDateString() === endDate.toDateString()) return format(startDate);
//     return `${format(startDate)} - ${format(endDate)}`;
//   };

//   const handleClearFilters = () => {
//     setStartDateRange({ startDate: null, endDate: null, key: 'selection' });
//     setDueDateRange({ startDate: null, endDate: null, key: 'selection' });
//     setSearchTerm('');
//     setTasks(allTasks);
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'grid' ? 'list' : 'grid');
//   };

//   // GROUP tasks by startDate (YYYY-MM-DD)
//   const groupedTasks = tasks.reduce((groups, task) => {
//     const dateKey = task.startDate ? new Date(task.startDate).toISOString().slice(0, 10) : 'No Date';
//     if (!groups[dateKey]) groups[dateKey] = [];
//     groups[dateKey].push(task);
//     return groups;
//   }, {});

//   // SORT group keys ascending by date
//   const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
//     if (a === 'No Date') return 1;
//     if (b === 'No Date') return -1;
//     return new Date(a) - new Date(b);
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       {/* Enhanced Search Bar */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 px-2 mt-20">
//         <div className="w-full sm:w-auto">
//           <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
//         </div>

//         <div className="relative w-full sm:w-96">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg
//               className="h-5 w-5 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search tasks by title, employee, or status..."
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//             disabled={isLoading}
//           />
//           {isLoading && (
//             <div className="absolute right-3 top-2.5">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//             </div>
//           )}
//           {searchTerm && !isLoading && (
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setTasks(allTasks);
//               }}
//               className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//               aria-label="Clear search"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 px-2">
//         <div className="flex items-center">
//           <button
//             onClick={toggleViewMode}
//             className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
//             title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
//           >
//             {viewMode === 'grid' ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//               </svg>
//             )}
//           </button>
//         </div>

//         <div className="flex flex-wrap items-center gap-4 justify-between">
//           {/* Start Date Filter */}
//           <div className="relative">
//             <button
//               className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={() => setShowStartDatePicker(!showStartDatePicker)}
//             >
//               Start Date: {formatRangeDisplay(startDateRange.startDate, startDateRange.endDate)}
//             </button>

//             {showStartDatePicker && (
//               <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
//                 <DateRangePicker
//                   ranges={[startDateRange]}
//                   onChange={item => {
//                     setStartDateRange(item.selection);
//                     setShowStartDatePicker(false);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Due Date Filter */}
//           <div className="relative">
//             <button
//               className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={() => setShowDueDatePicker(!showDueDatePicker)}
//             >
//               Due Date: {formatRangeDisplay(dueDateRange.startDate, dueDateRange.endDate)}
//             </button>

//             {showDueDatePicker && (
//               <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
//                 <DateRangePicker
//                   ranges={[dueDateRange]}
//                   onChange={item => {
//                     setDueDateRange(item.selection);
//                     setShowDueDatePicker(false);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Clear Filter Button */}
//           <button
//             onClick={handleClearFilters}
//             className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Task List */}
//       <div className="mt-4 px-2">
//         {isLoading ? (
//           <div className="text-center py-10">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             <p className="mt-2 text-gray-600">Loading tasks...</p>
//           </div>
//         ) : tasks.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">No tasks found</div>
//         ) : viewMode === 'grid' ? (
//           <div className="space-y-8">
//             {sortedDateKeys.map(dateKey => (
//               <div key={dateKey} className="space-y-4">
//                 <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
//                   {dateKey === 'No Date' ? 'No Start Date' : new Date(dateKey).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                 </h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {groupedTasks[dateKey].map(task => (
//                     <div
//                       key={task.id}
//                       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                     >
//                       <div className="p-6">
//                         <h3 className="text-xl font-bold text-blue-600 mb-2">{task.title}</h3>
//                         <p className="text-gray-700 mb-4">{task.description}</p>

//                         <div className="border-t border-b border-gray-200 my-4"></div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                           <div className="flex items-center">
//                             <span className="text-gray-600">Start Date:</span>
//                             <span className="font-semibold ml-1">{formatDate(task.startDate)}</span>
//                           </div>

//                           <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Due Date:</span>
//                             <span className="font-semibold">{formatDate(task.dueDate)}</span>
//                           </div>

//                           <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Employee:</span>
//                             <span className="font-semibold">{task.employeeName}</span>
//                           </div>

//                           <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Priority:</span>
//                             <span className="font-semibold">{task.priority}</span>
//                           </div>

//                           <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Status:</span>
//                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.taskStatus)}`}>
//                               {task.taskStatus}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="border-t border-b border-gray-200 my-4"></div>

//                         <div className="flex justify-end space-x-2">
//                           <button
//                             onClick={() => navigate(`/viewtaskdetails/${task.id}`)}
//                             className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
//                             aria-label="View"
//                             disabled={isLoading}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => navigate(`/updatetask/${task.id}`)}
//                             className="p-2 text-green-500 hover:bg-green-50 rounded-full"
//                             aria-label="Edit"
//                             disabled={isLoading}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(task.id)}
//                             className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//                             aria-label="Delete"
//                             disabled={isLoading}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {tasks.map((task) => (
//                   <tr key={task.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-blue-600">{task.title}</div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-700 max-w-xs truncate">{task.description}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-700">{formatDate(task.startDate)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-700">{formatDate(task.dueDate)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-700">{task.employeeName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.taskStatus)}`}>
//                         {task.taskStatus}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => navigate(`/viewtaskdetails/${task.id}`)}
//                           className="text-blue-500 hover:text-blue-700"
//                           aria-label="View"
//                           disabled={isLoading}
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => navigate(`/updatetask/${task.id}`)}
//                           className="text-green-500 hover:text-green-700"
//                           aria-label="Edit"
//                           disabled={isLoading}
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => handleDelete(task.id)}
//                           className="text-red-500 hover:text-red-700"
//                           aria-label="Delete"
//                           disabled={isLoading}
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




