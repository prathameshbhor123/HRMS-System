
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import {
//     Menu,
//     MenuItem,
//     IconButton,
//     Snackbar,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Badge,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction,
//     Tooltip,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Chip
// } from '@mui/material';
// import {
//     Visibility as VisibilityIcon,
//     Edit as EditIcon,
//     Notifications as NotificationsIcon,
//     Close as CloseIcon,
//     GridView as GridViewIcon,
//     ViewList as ViewListIcon,
//     FilterAlt as FilterAltIcon,
//     Clear as ClearIcon
// } from '@mui/icons-material';
// import MuiAlert from '@mui/material/Alert';
// import { motion, AnimatePresence } from 'framer-motion';

// const API_BASE_URL = 'http://localhost:8080/api/employee';

// // Date comparison utility
// const compareDates = (dateString) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const dueDate = new Date(dateString);
//     dueDate.setHours(0, 0, 0, 0);

//     return {
//         isOverdue: dueDate < today,
//         isDueToday: dueDate.getTime() === today.getTime(),
//         dueDateObj: dueDate
//     };
// };

// // Check if date is today
// const isToday = (dateString) => {
//     if (!dateString) return false;
//     const date = new Date(dateString);
//     const today = new Date();

//     return (
//         date.getDate() === today.getDate() &&
//         date.getMonth() === today.getMonth() &&
//         date.getFullYear() === today.getFullYear()
//     );
// };

// const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
// };

// // Helper to normalize date string (yyyy-mm-dd)
// const normalizeDateStr = (dateString) => {
//     const d = new Date(dateString);
//     d.setHours(0, 0, 0, 0);
//     return d.toISOString().split('T')[0];
// };

// const PriorityChip = ({ priority }) => {
//     let color = 'default';
//     if (priority === 'HIGH') color = 'error';
//     if (priority === 'MEDIUM') color = 'warning';
//     if (priority === 'LOW') color = 'success';

//     return <Chip label={priority} color={color} size="small" />;
// };

// const StatusChip = ({ status }) => {
//     let color = 'default';
//     if (status === 'COMPLETED') color = 'success';
//     if (status === 'INPROGRESS') color = 'primary';
//     if (status === 'PENDING') color = 'default';

//     return <Chip label={status} color={color} size="small" />;
// };

// const TaskCard = ({ task, onView, onEdit }) => {
//     const { isOverdue, isDueToday } = compareDates(task.dueDate);
//     const taskIsOverdue = isOverdue && task.taskStatus !== 'COMPLETED';
//     const taskIsDueToday = isDueToday && task.taskStatus !== 'COMPLETED';

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="w-full"
//         >
//             <div
//                 className={`bg-white rounded-lg shadow-md overflow-hidden relative ${taskIsOverdue ? 'border-l-4 border-red-500' :
//                     taskIsDueToday ? 'border-l-4 border-yellow-500' : ''
//                     }`}
//             >
//                 {taskIsOverdue && (
//                     <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
//                         OVERDUE
//                     </div>
//                 )}
//                 {taskIsDueToday && !taskIsOverdue && (
//                     <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
//                         DUE TODAY
//                     </div>
//                 )}

//                 <div className="p-4">
//                     <h2 className={`text-xl font-bold mb-2 ${taskIsOverdue ? 'text-red-600' :
//                         taskIsDueToday ? 'text-yellow-600' : 'text-blue-600'
//                         }`}>
//                         {task.title}
//                     </h2>
//                     <p className="text-gray-700 mb-3">{task.description}</p>

//                     <div className="border-t border-gray-200 my-2"></div>

//                     <div className="grid grid-cols-2 gap-2 mb-3">
//                         <div>
//                             <span className="text-gray-600">Start Date:</span>
//                             <span className="font-semibold ml-1">{formatDate(task.startDate)}</span>
//                         </div>
//                         <div>
//                             <span className="text-gray-600">Due Date:</span>
//                             <span className={`font-semibold ml-1 ${taskIsOverdue ? 'text-red-600' :
//                                 taskIsDueToday ? 'text-yellow-600' : ''
//                                 }`}>
//                                 {formatDate(task.dueDate)}
//                             </span>
//                         </div>
//                         <div>
//                             <span className="text-gray-600">Priority:</span>
//                             <PriorityChip priority={task.priority} />
//                         </div>
//                         <div>
//                             <span className="text-gray-600">Status:</span>
//                             <StatusChip status={task.taskStatus} />
//                         </div>
//                     </div>

//                     <div className="flex justify-end space-x-2 mt-3">
//                         <Tooltip title="View Details">
//                             <IconButton
//                                 color="primary"
//                                 onClick={() => onView(task.id)}
//                             >
//                                 <VisibilityIcon />
//                             </IconButton>
//                         </Tooltip>

//                         <Tooltip title="Change Status">
//                             <IconButton
//                                 color="secondary"
//                                 onClick={(e) => onEdit(e, task.id)}
//                             >
//                                 <EditIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// const TaskTable = ({ tasks, onView, onEdit }) => {
//     return (
//         <TableContainer component={Paper} className="shadow-md">
//             <Table>
//                 <TableHead>
//                     <TableRow className="bg-gray-100">
//                         <TableCell>Title</TableCell>
//                         <TableCell>Description</TableCell>
//                         <TableCell>Start Date</TableCell>
//                         <TableCell>Due Date</TableCell>
//                         <TableCell>Priority</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {tasks.map((task) => {
//                         const { isOverdue, isDueToday } = compareDates(task.dueDate);
//                         const taskIsOverdue = isOverdue && task.taskStatus !== 'COMPLETED';
//                         const taskIsDueToday = isDueToday && task.taskStatus !== 'COMPLETED';

//                         return (
//                             <TableRow
//                                 key={task.id}
//                                 className={`${taskIsOverdue ? 'bg-red-50' : taskIsDueToday ? 'bg-yellow-50' : ''}`}
//                                 hover
//                             >
//                                 <TableCell>
//                                     <span className={`font-medium ${taskIsOverdue ? 'text-red-600' : taskIsDueToday ? 'text-yellow-600' : ''}`}>
//                                         {task.title}
//                                     </span>
//                                 </TableCell>
//                                 <TableCell>
//                                     <p className="text-gray-700 line-clamp-1">{task.description}</p>
//                                 </TableCell>
//                                 <TableCell>{formatDate(task.startDate)}</TableCell>
//                                 <TableCell>
//                                     <span className={`${taskIsOverdue ? 'text-red-600' : taskIsDueToday ? 'text-yellow-600' : ''}`}>
//                                         {formatDate(task.dueDate)}
//                                     </span>
//                                 </TableCell>
//                                 <TableCell><PriorityChip priority={task.priority} /></TableCell>
//                                 <TableCell><StatusChip status={task.taskStatus} /></TableCell>
//                                 <TableCell align="right">
//                                     <div className="flex justify-end space-x-1">
//                                         <Tooltip title="View Details">
//                                             <IconButton
//                                                 size="small"
//                                                 color="primary"
//                                                 onClick={() => onView(task.id)}
//                                             >
//                                                 <VisibilityIcon fontSize="small" />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Change Status">
//                                             <IconButton
//                                                 size="small"
//                                                 color="secondary"
//                                                 onClick={(e) => onEdit(e, task.id)}
//                                             >
//                                                 <EditIcon fontSize="small" />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         );
//                     })}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// const EmployeeDashboard = () => {
//     const navigate = useNavigate();
//     const [tasks, setTasks] = useState([]);
//     const [allTasks, setAllTasks] = useState([]); // Store all tasks for filtering
//     const [todaysTasks, setTodaysTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'success'
//     });
//     const [showWelcomePopup, setShowWelcomePopup] = useState(false);
//     const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
//     const [unseenNotifications, setUnseenNotifications] = useState([]);
//     const [viewMode, setViewMode] = useState(() => {
//         return localStorage.getItem('viewMode') || 'grid';
//     });

//     // Date range filter states
//     const [startDateRange, setStartDateRange] = useState({
//         startDate: null,
//         endDate: null,
//         key: 'selection'
//     });
//     const [dueDateRange, setDueDateRange] = useState({
//         startDate: null,
//         endDate: null,
//         key: 'selection'
//     });
//     const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//     const [showDueDatePicker, setShowDueDatePicker] = useState(false);

//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;
//     const userId = user?.id;

//     const showSnackbar = (message, severity) => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     const fetchTasks = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/tasks/${userId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             const sortedTasks = response.data.sort((a, b) => {
//                 const isACompleted = a.taskStatus === 'COMPLETED';
//                 const isBCompleted = b.taskStatus === 'COMPLETED';

//                 if (isACompleted && !isBCompleted) return 1;
//                 if (!isACompleted && isBCompleted) return -1;

//                 const aComparison = compareDates(a.dueDate);
//                 const bComparison = compareDates(b.dueDate);

//                 if (aComparison.isOverdue === bComparison.isOverdue) {
//                     return aComparison.dueDateObj - bComparison.dueDateObj;
//                 }
//                 if (aComparison.isOverdue) return -1;
//                 return 1;
//             });

//             setAllTasks(sortedTasks); // Store all tasks
//             setTasks(sortedTasks); // Initially display all tasks

//             // Check for new tasks assigned today
//             const todayAssigned = sortedTasks.filter(task => isToday(task.startDate));
//             setTodaysTasks(todayAssigned);

//             const shownTasksKey = `shownTasks_${userId}`;
//             const shownTaskIds = JSON.parse(localStorage.getItem(shownTasksKey)) || [];

//             const newTasks = todayAssigned.filter(task => !shownTaskIds.includes(task.id));

//             // Update unseen notifications
//             const unseenKey = `unseenNotifications_${userId}`;
//             const unseenIds = JSON.parse(localStorage.getItem(unseenKey)) || [];

//             const trulyNewTasks = newTasks.filter(task => !unseenIds.includes(task.id));
//             if (trulyNewTasks.length > 0) {
//                 setUnseenNotifications(prev => [...trulyNewTasks, ...prev]);
//                 localStorage.setItem(unseenKey, JSON.stringify([...trulyNewTasks.map(t => t.id), ...unseenIds]));
//             }

//             if (newTasks.length > 0) {
//                 setTodaysTasks(newTasks);
//                 setShowWelcomePopup(true);

//                 const updatedShownIds = [...shownTaskIds, ...newTasks.map(task => task.id)];
//                 localStorage.setItem(shownTasksKey, JSON.stringify(updatedShownIds));
//             }

//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//             if (error.response?.status === 401) {
//                 navigate('/login');
//             }
//             showSnackbar('Failed to load tasks', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateTaskStatus = async (taskId, status) => {
//         try {
//             const response = await axios.put(`${API_BASE_URL}/task/${taskId}/${status}`, {}, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.id) {
//                 showSnackbar('Task updated successfully', 'success');
//                 fetchTasks();
//             } else {
//                 showSnackbar('Something went wrong', 'error');
//             }
//         } catch (error) {
//             console.error('Error updating task:', error);
//             showSnackbar(error.response?.data?.message || 'Failed to update task', 'error');
//         }
//     };

//     const handleMenuOpen = (event, taskId) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedTaskId(taskId);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedTaskId(null);
//     };

//     const handleStatusUpdate = (status) => {
//         updateTaskStatus(selectedTaskId, status);
//         handleMenuClose();
//     };

//     const handleNotificationClick = (event) => {
//         setNotificationAnchorEl(event.currentTarget);
//     };

//     const handleNotificationClose = () => {
//         setNotificationAnchorEl(null);
//     };

//     const removeNotification = (taskId) => {
//         setUnseenNotifications(prev => prev.filter(task => task.id !== taskId));

//         // Update localStorage
//         const unseenKey = `unseenNotifications_${userId}`;
//         const unseenIds = JSON.parse(localStorage.getItem(unseenKey)) || [];
//         localStorage.setItem(unseenKey, JSON.stringify(unseenIds.filter(id => id !== taskId)));
//     };

//     const clearAllNotifications = () => {
//         setUnseenNotifications([]);

//         // Update localStorage
//         const unseenKey = `unseenNotifications_${userId}`;
//         localStorage.setItem(unseenKey, JSON.stringify([]));
//         handleNotificationClose();
//     };

//     const toggleViewMode = () => {
//         const newMode = viewMode === 'grid' ? 'list' : 'grid';
//         setViewMode(newMode);
//         localStorage.setItem('viewMode', newMode);
//     };

//     const handleViewTask = (taskId) => {
//         navigate(`/viewemployeetaskdetails/${taskId}`);
//     };

//     // Apply date range filters
//     const applyFilters = () => {
//         let filteredTasks = [...allTasks];

//         // Start date range filter
//         if (startDateRange.startDate && startDateRange.endDate) {
//             const startStart = new Date(startDateRange.startDate);
//             const startEnd = new Date(startDateRange.endDate);
//             startEnd.setHours(23, 59, 59, 999);

//             filteredTasks = filteredTasks.filter(task => {
//                 const taskStart = new Date(task.startDate);
//                 return taskStart >= startStart && taskStart <= startEnd;
//             });
//         }

//         // Due date range filter
//         if (dueDateRange.startDate && dueDateRange.endDate) {
//             const dueStart = new Date(dueDateRange.startDate);
//             const dueEnd = new Date(dueDateRange.endDate);
//             dueEnd.setHours(23, 59, 59, 999);

//             filteredTasks = filteredTasks.filter(task => {
//                 const taskDue = new Date(task.dueDate);
//                 return taskDue >= dueStart && taskDue <= dueEnd;
//             });
//         }

//         setTasks(filteredTasks);
//     };

//     // Format date range for display
//     const formatRangeDisplay = (startDate, endDate) => {
//         if (!startDate || !endDate) return 'Select date range';
//         const format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//         if (startDate.toDateString() === endDate.toDateString()) return format(startDate);
//         return `${format(startDate)} - ${format(endDate)}`;
//     };

//     // Clear all filters
//     const handleClearFilters = () => {
//         setStartDateRange({ startDate: null, endDate: null, key: 'selection' });
//         setDueDateRange({ startDate: null, endDate: null, key: 'selection' });
//         setTasks(allTasks);
//     };

//     useEffect(() => {
//         fetchTasks();

//         // Load any existing unseen notifications
//         const unseenKey = `unseenNotifications_${userId}`;
//         const storedUnseen = JSON.parse(localStorage.getItem(unseenKey)) || [];
//         if (storedUnseen.length > 0) {
//             // We'll populate the actual task data when fetchTasks runs
//             setUnseenNotifications(storedUnseen.map(id => ({ id })));
//         }
//     }, [userId]);

//     useEffect(() => {
//         if (allTasks.length > 0) {
//             applyFilters();
//         }
//     }, [startDateRange, dueDateRange, allTasks]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     // Group tasks by normalized startDate string for grid view
//     const groupedTasks = tasks.reduce((groups, task) => {
//         const startDateKey = normalizeDateStr(task.startDate);
//         if (!groups[startDateKey]) {
//             groups[startDateKey] = [];
//         }
//         groups[startDateKey].push(task);
//         return groups;
//     }, {});

//     // Sort groups by date ascending
//     const sortedGroupKeys = Object.keys(groupedTasks).sort((a, b) => new Date(a) - new Date(b));

//     return (
//         <div className="bg-gray-50 min-h-screen p-4 md:p-6">
//             <div className="max-w-7xl mx-auto mt-20">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
//                     {/* Date Range Filters */}
//                     <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
//                         <div className="flex flex-wrap items-center gap-4 justify-between">
//                             {/* Start Date Filter */}
//                             <div className="relative">
//                                 <Button
//                                     className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:text-black"
//                                     onClick={() => setShowStartDatePicker(!showStartDatePicker)}
//                                 >
//                                     Start: {formatRangeDisplay(startDateRange.startDate, startDateRange.endDate)}
//                                 </Button>


//                                 {showStartDatePicker && (
//                                     <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
//                                         <DateRangePicker
//                                             ranges={[startDateRange]}
//                                             onChange={item => {
//                                                 setStartDateRange(item.selection);
//                                                 setShowStartDatePicker(false);
//                                             }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Due Date Filter */}
//                             <div className="relative">
//                                 <Button
//                                     className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     onClick={() => setShowDueDatePicker(!showDueDatePicker)}
//                                 >
//                                     Due: {formatRangeDisplay(dueDateRange.startDate, dueDateRange.endDate)}
//                                 </Button>

//                                 {showDueDatePicker && (
//                                     <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md left-0 max-w-[90vw] overflow-x-auto">
//                                         <DateRangePicker
//                                             ranges={[dueDateRange]}
//                                             onChange={item => {
//                                                 setDueDateRange(item.selection);
//                                                 setShowDueDatePicker(false);
//                                             }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Clear Filters Button */}
//                             {(startDateRange.startDate || dueDateRange.startDate) && (
//                                 <Button
//                                     variant="outlined"
//                                     color="error"
//                                     startIcon={<ClearIcon />}
//                                     onClick={handleClearFilters}
//                                 >
//                                     Clear Filters
//                                 </Button>
//                             )}
//                         </div>
//                     </div>

//                     <div className="flex items-center">
//                         <Tooltip title={viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}>
//                             <IconButton
//                                 color="inherit"
//                                 onClick={toggleViewMode}
//                                 className="mr-2"
//                             >
//                                 {viewMode === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
//                             </IconButton>
//                         </Tooltip>

//                         <Tooltip title="Notifications">
//                             <IconButton
//                                 color="inherit"
//                                 onClick={handleNotificationClick}
//                                 className="relative"
//                             >
//                                 <Badge
//                                     badgeContent={unseenNotifications.length}
//                                     color="error"
//                                     overlap="circular"
//                                 >
//                                     <motion.div
//                                         animate={unseenNotifications.length > 0 ? {
//                                             scale: [1, 1.2, 1],
//                                             transition: { repeat: Infinity, duration: 2 }
//                                         } : {}}
//                                     >
//                                         <NotificationsIcon className="text-gray-600" />
//                                     </motion.div>
//                                 </Badge>
//                             </IconButton>
//                         </Tooltip>
//                     </div>
//                 </div>


//                 {/* Notification Menu */}
//                 <Menu
//                     anchorEl={notificationAnchorEl}
//                     open={Boolean(notificationAnchorEl)}
//                     onClose={handleNotificationClose}
//                     anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'right',
//                     }}
//                     transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right',
//                     }}
//                     PaperProps={{
//                         style: {
//                             width: '400px',
//                             maxHeight: '500px',
//                         },
//                     }}
//                 >
//                     <div className="p-2">
//                         <div className="flex justify-between items-center px-2 py-1 border-b">
//                             <h3 className="font-bold">Recent Task Notifications</h3>
//                             {unseenNotifications.length > 0 && (
//                                 <Button
//                                     size="small"
//                                     onClick={clearAllNotifications}
//                                     color="secondary"
//                                 >
//                                     Clear All
//                                 </Button>
//                             )}
//                         </div>

//                         {unseenNotifications.length === 0 ? (
//                             <div className="p-4 text-center text-gray-500">
//                                 No new notifications
//                             </div>
//                         ) : (
//                             <List dense>
//                                 <AnimatePresence>
//                                     {unseenNotifications.map((task) => (
//                                         <motion.div
//                                             key={task.id}
//                                             initial={{ opacity: 0, y: -10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, x: 100 }}
//                                             transition={{ duration: 0.3 }}
//                                         >
//                                             <ListItem
//                                                 button
//                                                 onClick={() => {
//                                                     navigate(`/viewemployeetaskdetails/${task.id}`);
//                                                     handleNotificationClose();
//                                                 }}
//                                             >
//                                                 <ListItemText
//                                                     primary={task.title || "New Task"}
//                                                     secondary={task.description || "Click to view details"}
//                                                     secondaryTypographyProps={{ noWrap: true }}
//                                                 />
//                                                 <ListItemSecondaryAction>
//                                                     <IconButton
//                                                         edge="end"
//                                                         aria-label="remove"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             removeNotification(task.id);
//                                                         }}
//                                                     >
//                                                         <CloseIcon fontSize="small" />
//                                                     </IconButton>
//                                                 </ListItemSecondaryAction>
//                                             </ListItem>
//                                         </motion.div>
//                                     ))}
//                                 </AnimatePresence>
//                             </List>
//                         )}
//                     </div>
//                 </Menu>

//                 {tasks.length === 0 ? (
//                     <div className="text-center py-10">
//                         <p className="text-gray-500">No tasks found matching your filters</p>
//                         {(startDateRange.startDate || dueDateRange.startDate) && (
//                             <Button
//                                 variant="text"
//                                 color="primary"
//                                 onClick={handleClearFilters}
//                                 className="mt-2"
//                             >
//                                 Clear filters
//                             </Button>
//                         )}
//                     </div>
//                 ) : viewMode === 'grid' ? (
//                     <>
//                         {sortedGroupKeys.map((dateKey) => (
//                             <div key={dateKey} className="mb-8">
//                                 {/* Date Header */}
//                                 <h2 className="text-lg font-semibold text-gray-700 mb-4">
//                                     Tasks Starting: {formatDate(dateKey)}
//                                 </h2>

//                                 {/* Row for this date's tasks */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                     {groupedTasks[dateKey].map((task) => (
//                                         <TaskCard
//                                             key={task.id}
//                                             task={task}
//                                             onView={handleViewTask}
//                                             onEdit={handleMenuOpen}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </>
//                 ) : (
//                     <TaskTable
//                         tasks={tasks}
//                         onView={handleViewTask}
//                         onEdit={handleMenuOpen}
//                     />
//                 )}
//             </div>

//             {/* Task Status Menu */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//             >
//                 <MenuItem onClick={() => handleStatusUpdate('PENDING')}>Mark as Pending</MenuItem>
//                 <MenuItem onClick={() => handleStatusUpdate('INPROGRESS')}>Mark as In Progress</MenuItem>
//                 <MenuItem onClick={() => handleStatusUpdate('COMPLETED')}>Mark as Completed</MenuItem>
//             </Menu>

//             {/* Snackbar */}
//             <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
//                 <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </MuiAlert>
//             </Snackbar>

//             {/* Welcome Popup for Today's Tasks */}
//             <Dialog open={showWelcomePopup} onClose={() => setShowWelcomePopup(false)}>
//                 <DialogTitle>New Tasks Assigned Today</DialogTitle>
//                 <DialogContent dividers>
//                     {todaysTasks.map((task) => (
//                         <div key={task.id} className="mb-4">
//                             <h3 className="font-semibold">{task.title}</h3>
//                             <p>{task.description}</p>
//                         </div>
//                     ))}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setShowWelcomePopup(false)} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default EmployeeDashboard;






import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
    Menu,
    MenuItem,
    IconButton,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Badge,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Notifications as NotificationsIcon,
    Close as CloseIcon,
    GridView as GridViewIcon,
    ViewList as ViewListIcon,
    FilterAlt as FilterAltIcon,
    Clear as ClearIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8080/api/employee';

// Date comparison utility
const compareDates = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);

    return {
        isOverdue: dueDate < today,
        isDueToday: dueDate.getTime() === today.getTime(),
        dueDateObj: dueDate
    };
};

// Check if date is today
const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper to normalize date string (yyyy-mm-dd)
const normalizeDateStr = (dateString) => {
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('T')[0];
};

const PriorityChip = ({ priority }) => {
    let color = 'default';
    if (priority === 'HIGH') color = 'error';
    if (priority === 'MEDIUM') color = 'warning';
    if (priority === 'LOW') color = 'success';

    return <Chip label={priority} color={color} size="small" />;
};

const StatusChip = ({ status }) => {
    let color = 'default';
    if (status === 'COMPLETED') color = 'success';
    if (status === 'INPROGRESS') color = 'primary';
    if (status === 'PENDING') color = 'default';

    return <Chip label={status} color={color} size="small" />;
};

const TaskCard = ({ task, onView, onEdit }) => {
    const { isOverdue, isDueToday } = compareDates(task.dueDate);
    const taskIsOverdue = isOverdue && task.taskStatus !== 'COMPLETED';
    const taskIsDueToday = isDueToday && task.taskStatus !== 'COMPLETED';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <div
                className={`bg-white rounded-lg shadow-md overflow-hidden relative ${taskIsOverdue ? 'border-l-4 border-red-500' :
                    taskIsDueToday ? 'border-l-4 border-yellow-500' : ''
                    }`}
            >
                {taskIsOverdue && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        OVERDUE
                    </div>
                )}
                {taskIsDueToday && !taskIsOverdue && (
                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                        DUE TODAY
                    </div>
                )}

                <div className="p-4">
                    <h2 className={`text-xl font-bold mb-2 ${taskIsOverdue ? 'text-red-600' :
                        taskIsDueToday ? 'text-yellow-600' : 'text-blue-600'
                        }`}>
                        {task.title}
                    </h2>
                    <p className="text-gray-700 mb-3 h-24 overflow-hidden">{task.description}</p>

                    <div className="border-t border-gray-200 my-2"></div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                            <span className="text-gray-600">Start Date:</span>
                            <span className="font-semibold ml-1">{formatDate(task.startDate)}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Due Date:</span>
                            <span className={`font-semibold ml-1 ${taskIsOverdue ? 'text-red-600' :
                                taskIsDueToday ? 'text-yellow-600' : ''
                                }`}>
                                {formatDate(task.dueDate)}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">Priority:</span>
                            <PriorityChip priority={task.priority} />
                        </div>
                        <div>
                            <span className="text-gray-600">Status:</span>
                            <StatusChip status={task.taskStatus} />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3">
                        <Tooltip title="View Details">
                            <IconButton
                                color="primary"
                                onClick={() => onView(task.id)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Change Status">
                            <IconButton
                                color="secondary"
                                onClick={(e) => onEdit(e, task.id)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TaskTable = ({ tasks, onView, onEdit }) => {
    return (
        <TableContainer component={Paper} className="shadow-md">
            <Table>
                <TableHead>
                    <TableRow className="bg-gray-100">
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => {
                        const { isOverdue, isDueToday } = compareDates(task.dueDate);
                        const taskIsOverdue = isOverdue && task.taskStatus !== 'COMPLETED';
                        const taskIsDueToday = isDueToday && task.taskStatus !== 'COMPLETED';

                        return (
                            <TableRow
                                key={task.id}
                                className={`${taskIsOverdue ? 'bg-red-50' : taskIsDueToday ? 'bg-yellow-50' : ''}`}
                                hover
                            >
                                <TableCell>
                                    <span className={`font-medium ${taskIsOverdue ? 'text-red-600' : taskIsDueToday ? 'text-yellow-600' : ''}`}>
                                        {task.title}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <p className="text-gray-700 line-clamp-1 w-80">{task.description}</p>
                                </TableCell>
                                <TableCell>{formatDate(task.startDate)}</TableCell>
                                <TableCell>
                                    <span className={`${taskIsOverdue ? 'text-red-600' : taskIsDueToday ? 'text-yellow-600' : ''}`}>
                                        {formatDate(task.dueDate)}
                                    </span>
                                </TableCell>
                                <TableCell><PriorityChip priority={task.priority} /></TableCell>
                                <TableCell><StatusChip status={task.taskStatus} /></TableCell>
                                <TableCell align="right">
                                    <div className="flex justify-end space-x-1">
                                        <Tooltip title="View Details">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => onView(task.id)}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Change Status">
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                onClick={(e) => onEdit(e, task.id)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [unseenNotifications, setUnseenNotifications] = useState([]);
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem('viewMode') || 'grid';
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Date range filter states
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

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.id;

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/tasks/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const sortedTasks = response.data.sort((a, b) => {
                const isACompleted = a.taskStatus === 'COMPLETED';
                const isBCompleted = b.taskStatus === 'COMPLETED';

                if (isACompleted && !isBCompleted) return 1;
                if (!isACompleted && isBCompleted) return -1;

                const aComparison = compareDates(a.dueDate);
                const bComparison = compareDates(b.dueDate);

                if (aComparison.isOverdue === bComparison.isOverdue) {
                    return aComparison.dueDateObj - bComparison.dueDateObj;
                }
                if (aComparison.isOverdue) return -1;
                return 1;
            });

            setAllTasks(sortedTasks);
            setTasks(sortedTasks);

            const todayAssigned = sortedTasks.filter(task => isToday(task.startDate));
            setTodaysTasks(todayAssigned);

            const shownTasksKey = `shownTasks_${userId}`;
            const shownTaskIds = JSON.parse(localStorage.getItem(shownTasksKey)) || [];

            const newTasks = todayAssigned.filter(task => !shownTaskIds.includes(task.id));

            const unseenKey = `unseenNotifications_${userId}`;
            const unseenIds = JSON.parse(localStorage.getItem(unseenKey)) || [];

            const trulyNewTasks = newTasks.filter(task => !unseenIds.includes(task.id));
            if (trulyNewTasks.length > 0) {
                setUnseenNotifications(prev => [...trulyNewTasks, ...prev]);
                localStorage.setItem(unseenKey, JSON.stringify([...trulyNewTasks.map(t => t.id), ...unseenIds]));
            }

            if (newTasks.length > 0) {
                setTodaysTasks(newTasks);
                setShowWelcomePopup(true);

                const updatedShownIds = [...shownTaskIds, ...newTasks.map(task => task.id)];
                localStorage.setItem(shownTasksKey, JSON.stringify(updatedShownIds));
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
            showSnackbar('Failed to load tasks', 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId, status) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/task/${taskId}/${status}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.id) {
                showSnackbar('Task updated successfully', 'success');
                fetchTasks();
            } else {
                showSnackbar('Something went wrong', 'error');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            showSnackbar(error.response?.data?.message || 'Failed to update task', 'error');
        }
    };

    const handleMenuOpen = (event, taskId) => {
        setAnchorEl(event.currentTarget);
        setSelectedTaskId(taskId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTaskId(null);
    };

    const handleStatusUpdate = (status) => {
        updateTaskStatus(selectedTaskId, status);
        handleMenuClose();
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const removeNotification = (taskId) => {
        setUnseenNotifications(prev => prev.filter(task => task.id !== taskId));

        const unseenKey = `unseenNotifications_${userId}`;
        const unseenIds = JSON.parse(localStorage.getItem(unseenKey)) || [];
        localStorage.setItem(unseenKey, JSON.stringify(unseenIds.filter(id => id !== taskId)));
    };

    const clearAllNotifications = () => {
        setUnseenNotifications([]);

        const unseenKey = `unseenNotifications_${userId}`;
        localStorage.setItem(unseenKey, JSON.stringify([]));
        handleNotificationClose();
    };

    const toggleViewMode = () => {
        const newMode = viewMode === 'grid' ? 'list' : 'grid';
        setViewMode(newMode);
        localStorage.setItem('viewMode', newMode);
    };

    const handleViewTask = (taskId) => {
        navigate(`/viewemployeetaskdetails/${taskId}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const applyFilters = () => {
        let filteredTasks = [...allTasks];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query) ||
                task.taskStatus.toLowerCase().includes(query) ||
                task.priority.toLowerCase().includes(query)
            );
        }

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

        setTasks(filteredTasks);
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

    useEffect(() => {
        fetchTasks();

        const unseenKey = `unseenNotifications_${userId}`;
        const storedUnseen = JSON.parse(localStorage.getItem(unseenKey)) || [];
        if (storedUnseen.length > 0) {
            setUnseenNotifications(storedUnseen.map(id => ({ id })));
        }
    }, [userId]);

    useEffect(() => {
        if (allTasks.length > 0) {
            applyFilters();
        }
    }, [startDateRange, dueDateRange, allTasks, searchQuery]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const groupedTasks = tasks.reduce((groups, task) => {
        const startDateKey = normalizeDateStr(task.startDate);
        if (!groups[startDateKey]) {
            groups[startDateKey] = [];
        }
        groups[startDateKey].push(task);
        return groups;
    }, {});

    const sortedGroupKeys = Object.keys(groupedTasks).sort((a, b) => new Date(a) - new Date(b));

    return (
        <div className="bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen p-4 md:p-6">
            <div className="max-w-7xl mx-auto mt-20 bg-gradient-to-tr from-blue-50 to-blue-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                            />
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


                    <div className="flex items-center">
                        <Tooltip title={viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}>
                            <IconButton
                                color="inherit"
                                onClick={toggleViewMode}
                                className="mr-2"
                            >
                                {viewMode === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Notifications">
                            <IconButton
                                color="inherit"
                                onClick={handleNotificationClick}
                                className="relative"
                            >
                                <Badge
                                    badgeContent={unseenNotifications.length}
                                    color="error"
                                    overlap="circular"
                                >
                                    <motion.div
                                        animate={unseenNotifications.length > 0 ? {
                                            scale: [1, 1.2, 1],
                                            transition: { repeat: Infinity, duration: 2 }
                                        } : {}}
                                    >
                                        <NotificationsIcon className="text-gray-600" />
                                    </motion.div>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {/* Notification Menu */}
                <Menu
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={handleNotificationClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: {
                            width: '400px',
                            maxHeight: '500px',
                        },
                    }}
                >
                    <div className="p-2">
                        <div className="flex justify-between items-center px-2 py-1 border-b">
                            <h3 className="font-bold">Recent Task Notifications</h3>
                            {unseenNotifications.length > 0 && (
                                <Button
                                    size="small"
                                    onClick={clearAllNotifications}
                                    color="secondary"
                                >
                                    Clear All
                                </Button>
                            )}
                        </div>

                        {unseenNotifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No new notifications
                            </div>
                        ) : (
                            <List dense>
                                <AnimatePresence>
                                    {unseenNotifications.map((task) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ListItem
                                                button
                                                onClick={() => {
                                                    navigate(`/viewemployeetaskdetails/${task.id}`);
                                                    handleNotificationClose();
                                                }}
                                            >
                                                <ListItemText
                                                    primary={task.title || "New Task"}
                                                    secondary={task.description || "Click to view details"}
                                                    secondaryTypographyProps={{ noWrap: true }}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="remove"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeNotification(task.id);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </List>
                        )}
                    </div>
                </Menu>

                {tasks.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">
                            {searchQuery
                                ? "No tasks found matching your search criteria"
                                : "No tasks found matching your filters"}
                        </p>
                        {(startDateRange.startDate || dueDateRange.startDate || searchQuery) && (
                            <Button
                                variant="text"
                                color="primary"
                                onClick={handleClearFilters}
                                className="mt-2"
                            >
                                Clear all filters
                            </Button>
                        )}
                    </div>
                ) : viewMode === 'grid' ? (
                    <>
                        {sortedGroupKeys.map((dateKey) => (
                            <div key={dateKey} className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                    Tasks Starting: {formatDate(dateKey)}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedTasks[dateKey].map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onView={handleViewTask}
                                            onEdit={handleMenuOpen}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <TaskTable
                        tasks={tasks}
                        onView={handleViewTask}
                        onEdit={handleMenuOpen}
                    />
                )}
            </div>

            {/* Task Status Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleStatusUpdate('PENDING')}>Mark as Pending</MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('INPROGRESS')}>Mark as In Progress</MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('COMPLETED')}>Mark as Completed</MenuItem>
            </Menu>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>

            {/* Welcome Popup for Today's Tasks */}
            <Dialog open={showWelcomePopup} onClose={() => setShowWelcomePopup(false)}>
                <DialogTitle>New Tasks Assigned Today</DialogTitle>
                <DialogContent dividers>
                    {todaysTasks.map((task) => (
                        <div key={task.id} className="mb-4">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowWelcomePopup(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmployeeDashboard;


