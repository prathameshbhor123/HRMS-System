
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeaveManagement = () => {
    // State for active section
    const [activeSection, setActiveSection] = useState('dashboard');

    // State for user data
    const [user, setUser] = useState({
        id: 1,
        name: 'Alex Johnson',
        role: 'employee', // 'employee' or 'manager'
        email: 'alex.johnson@example.com',
        department: 'Engineering',
        joinDate: '2021-03-15',
        remainingLeaves: {
            annual: 12,
            sick: 8,
            casual: 5
        }
    });

    // State for leave applications
    const [leaveApplications, setLeaveApplications] = useState([
        { id: 1, employeeId: 1, employee: 'Alex Johnson', type: 'Annual', startDate: '2023-06-01', endDate: '2023-06-05', status: 'Approved', reason: 'Family vacation' },
        { id: 2, employeeId: 2, employee: 'Jane Smith', type: 'Sick', startDate: '2023-06-10', endDate: '2023-06-11', status: 'Pending', reason: 'Flu' },
        { id: 3, employeeId: 3, employee: 'Mike Johnson', type: 'Casual', startDate: '2023-06-15', endDate: '2023-06-16', status: 'Rejected', reason: 'Personal work' },
        { id: 4, employeeId: 1, employee: 'Alex Johnson', type: 'Casual', startDate: '2023-06-20', endDate: '2023-06-21', status: 'Pending', reason: 'Doctor appointment' },
    ]);

    // State for attendance records
    const [attendanceRecords, setAttendanceRecords] = useState([
        { id: 1, employeeId: 1, employee: 'Alex Johnson', date: '2023-06-01', status: 'Present', checkIn: '09:00', checkOut: '17:00' },
        { id: 2, employeeId: 2, employee: 'Jane Smith', date: '2023-06-01', status: 'Late', checkIn: '09:45', checkOut: '17:30' },
        { id: 3, employeeId: 3, employee: 'Mike Johnson', date: '2023-06-01', status: 'Absent', checkIn: '-', checkOut: '-' },
        { id: 4, employeeId: 1, employee: 'Alex Johnson', date: '2023-06-02', status: 'Present', checkIn: '08:55', checkOut: '17:10' },
    ]);

    // State for new leave application
    const [newLeave, setNewLeave] = useState({
        type: 'Annual',
        startDate: '',
        endDate: '',
        reason: ''
    });

    // State for team members (for manager)
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: 'Alex Johnson', role: 'Senior Developer', email: 'alex.johnson@example.com' },
        { id: 2, name: 'Jane Smith', role: 'UI Designer', email: 'jane.smith@example.com' },
        { id: 3, name: 'Mike Johnson', role: 'QA Engineer', email: 'mike.johnson@example.com' },
    ]);

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: { duration: 0.3 }
        }
    };

    // Handle leave application submission
    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        const newApplication = {
            id: leaveApplications.length + 1,
            employeeId: user.id,
            employee: user.name,
            type: newLeave.type,
            startDate: newLeave.startDate,
            endDate: newLeave.endDate,
            status: 'Pending',
            reason: newLeave.reason
        };

        setLeaveApplications([...leaveApplications, newApplication]);
        setNewLeave({
            type: 'Annual',
            startDate: '',
            endDate: '',
            reason: ''
        });

        // Show success message
        alert('Leave application submitted successfully!');
    };

    // Handle leave approval/rejection (manager only)
    const handleLeaveAction = (id, action) => {
        setLeaveApplications(leaveApplications.map(app =>
            app.id === id ? { ...app, status: action } : app
        ));

        // Update leave balance if approved
        if (action === 'Approved') {
            const approvedLeave = leaveApplications.find(app => app.id === id);
            if (approvedLeave.type === 'Annual' || approvedLeave.type === 'Casual') {
                // In a real app, we'd update the specific employee's balance
                // Here we're just showing the concept
                alert(`Leave approved. ${approvedLeave.employee}'s ${approvedLeave.type} leave balance will be updated.`);
            }
        }
    };

    // Mark attendance
    const markAttendance = (status) => {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (status === 'Present' || status === 'Late') {
            const newRecord = {
                id: attendanceRecords.length + 1,
                employeeId: user.id,
                employee: user.name,
                date: today,
                status: status,
                checkIn: time,
                checkOut: '-'
            };
            setAttendanceRecords([...attendanceRecords, newRecord]);
        } else {
            const newRecord = {
                id: attendanceRecords.length + 1,
                employeeId: user.id,
                employee: user.name,
                date: today,
                status: status,
                checkIn: '-',
                checkOut: '-'
            };
            setAttendanceRecords([...attendanceRecords, newRecord]);
        }

        alert(`Attendance marked as ${status}`);
    };

    // Filter functions
    const getMyLeaveApplications = () => {
        return leaveApplications.filter(app => app.employeeId === user.id);
    };

    const getPendingLeaveApplications = () => {
        return leaveApplications.filter(app => app.status === 'Pending');
    };

    const getMyAttendanceRecords = () => {
        return attendanceRecords.filter(record => record.employeeId === user.id);
    };

    // Toggle user role for demo purposes
    const toggleUserRole = () => {
        setUser({
            ...user,
            role: user.role === 'employee' ? 'manager' : 'employee'
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <motion.h1
                        className="text-2xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        HRMS - {user.role === 'manager' ? 'Manager' : 'Employee'} Portal
                    </motion.h1>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleUserRole}
                            className="px-3 py-1 bg-blue-400 rounded-md text-sm hover:bg-blue-500"
                        >
                            Switch to {user.role === 'manager' ? 'Employee' : 'Manager'}
                        </button>
                        <div className="text-right">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-blue-200 capitalize">{user.role} • {user.department}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                            <span className="font-bold">{user.name.charAt(0)}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Navigation */}
                <nav className="mb-8 bg-white rounded-lg shadow p-2">
                    <ul className="flex space-x-2">
                        <li>
                            <button
                                onClick={() => setActiveSection('dashboard')}
                                className={`px-4 py-2 rounded-md ${activeSection === 'dashboard' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('leave')}
                                className={`px-4 py-2 rounded-md ${activeSection === 'leave' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Leave Management
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('attendance')}
                                className={`px-4 py-2 rounded-md ${activeSection === 'attendance' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Attendance
                            </button>
                        </li>
                        {user.role === 'manager' && (
                            <li>
                                <button
                                    onClick={() => setActiveSection('team')}
                                    className={`px-4 py-2 rounded-md ${activeSection === 'team' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    My Team
                                </button>
                            </li>
                        )}
                        {user.role === 'manager' && (
                            <li>
                                <button
                                    onClick={() => setActiveSection('reports')}
                                    className={`px-4 py-2 rounded-md ${activeSection === 'reports' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Reports
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Content Sections */}
                <AnimatePresence mode="wait">
                    {/* Dashboard Section */}
                    {activeSection === 'dashboard' && (
                        <motion.section
                            key="dashboard"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">
                                {user.role === 'manager' ? 'Manager Dashboard' : 'Employee Dashboard'}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Leave Summary Card */}
                                <motion.div
                                    className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-blue-800 mb-2">Leave Balance</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Annual Leave:</span>
                                            <span className="font-semibold">{user.remainingLeaves.annual} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Sick Leave:</span>
                                            <span className="font-semibold">{user.remainingLeaves.sick} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Casual Leave:</span>
                                            <span className="font-semibold">{user.remainingLeaves.casual} days</span>
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Attendance Summary Card */}
                                <motion.div
                                    className="bg-green-50 rounded-lg p-4 border border-green-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-green-800 mb-2">Attendance Summary</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">This Month:</span>
                                            <span className="font-semibold">22/23 days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">On Time:</span>
                                            <span className="font-semibold">18 days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Late Arrivals:</span>
                                            <span className="font-semibold">4 days</span>
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Quick Actions Card */}
                                <motion.div
                                    className="bg-purple-50 rounded-lg p-4 border border-purple-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-purple-800 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setActiveSection('leave')}
                                            className="w-full bg-blue-100 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                        >
                                            {user.role === 'manager' ? 'Manage Leaves' : 'Apply for Leave'}
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('attendance')}
                                            className="w-full bg-green-100 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition"
                                        >
                                            Mark Attendance
                                        </button>
                                        {user.role === 'manager' && (
                                            <button
                                                onClick={() => setActiveSection('team')}
                                                className="w-full bg-orange-100 text-orange-600 py-2 rounded-md text-sm font-medium hover:bg-orange-200 transition"
                                            >
                                                View Team
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Recent Leave Applications */}
                            <div className="mb-8">
                                <h3 className="font-bold text-gray-700 mb-3">
                                    {user.role === 'manager' ? 'Pending Leave Approvals' : 'My Recent Leave Applications'}
                                </h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                {user.role === 'manager' && (
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                )}
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                {user.role === 'manager' && (
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {(user.role === 'manager' ? getPendingLeaveApplications() : getMyLeaveApplications().slice(0, 3)).map((app) => (
                                                <tr key={app.id}>
                                                    {user.role === 'manager' && (
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.employee}</td>
                                                    )}
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.type}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {app.startDate} to {app.endDate}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{app.reason || '-'}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                            app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    {user.role === 'manager' && (
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => handleLeaveAction(app.id, 'Approved')}
                                                                    className="text-green-600 hover:text-green-800"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleLeaveAction(app.id, 'Rejected')}
                                                                    className="text-red-600 hover:text-red-800"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                            {(user.role === 'manager' && getPendingLeaveApplications().length === 0) && (
                                                <tr>
                                                    <td colSpan={user.role === 'manager' ? 6 : 4} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No pending leave applications
                                                    </td>
                                                </tr>
                                            )}
                                            {(user.role === 'employee' && getMyLeaveApplications().length === 0) && (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        You haven't applied for any leaves yet
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Attendance Records */}
                            <div>
                                <h3 className="font-bold text-gray-700 mb-3">Recent Attendance</h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {getMyAttendanceRecords().slice(0, 5).map((record) => {
                                                const date = new Date(record.date);
                                                const day = date.toLocaleDateString([], { weekday: 'short' });

                                                return (
                                                    <tr key={record.id}>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{day}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                                                                record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                                }`}>
                                                                {record.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                            {record.checkIn !== '-' && record.checkOut !== '-' ? '8.5 hours' : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {getMyAttendanceRecords().length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No attendance records found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Leave Management Section */}
                    {activeSection === 'leave' && (
                        <motion.section
                            key="leave"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">
                                {user.role === 'manager' ? 'Leave Management' : 'My Leave Applications'}
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Apply for Leave Form (only for employees) */}
                                {user.role === 'employee' && (
                                    <div className="lg:col-span-1">
                                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                                            <h3 className="font-bold text-blue-800 mb-4">Apply for Leave</h3>
                                            <form onSubmit={handleLeaveSubmit}>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                                    <select
                                                        value={newLeave.type}
                                                        onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    >
                                                        <option value="Annual">Annual Leave</option>
                                                        <option value="Sick">Sick Leave</option>
                                                        <option value="Casual">Casual Leave</option>
                                                        <option value="Maternity">Maternity Leave</option>
                                                        <option value="Paternity">Paternity Leave</option>
                                                    </select>
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                                    <input
                                                        type="date"
                                                        value={newLeave.startDate}
                                                        onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                                    <input
                                                        type="date"
                                                        value={newLeave.endDate}
                                                        onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                                    <textarea
                                                        value={newLeave.reason}
                                                        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                                                        rows="3"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    ></textarea>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
                                                >
                                                    Submit Application
                                                </button>
                                            </form>
                                        </div>

                                        {/* Leave Balance */}
                                        <div className="mt-6 bg-green-50 rounded-lg p-5 border border-green-100">
                                            <h3 className="font-bold text-green-800 mb-3">Your Leave Balance</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Annual Leave:</span>
                                                    <span className="font-bold">{user.remainingLeaves.annual} days</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Sick Leave:</span>
                                                    <span className="font-bold">{user.remainingLeaves.sick} days</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Casual Leave:</span>
                                                    <span className="font-bold">{user.remainingLeaves.casual} days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Leave Applications */}
                                <div className={user.role === 'employee' ? 'lg:col-span-2' : 'lg:col-span-3'}>
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">
                                                {user.role === 'manager' ? 'All Leave Applications' : 'My Applications'}
                                            </h3>
                                            <div className="flex space-x-2">
                                                <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                    <option>All Status</option>
                                                    <option>Pending</option>
                                                    <option>Approved</option>
                                                    <option>Rejected</option>
                                                </select>
                                                {user.role === 'manager' && (
                                                    <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                        <option>All Employees</option>
                                                        <option>My Team</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        {user.role === 'manager' && (
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                        )}
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        {user.role === 'manager' && (
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {(user.role === 'manager' ? leaveApplications : getMyLeaveApplications()).map((app) => (
                                                        <tr key={app.id}>
                                                            {user.role === 'manager' && (
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.employee}</td>
                                                            )}
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.type}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                                {app.startDate} to {app.endDate}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{app.reason || '-'}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs rounded-full ${app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                                    app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {app.status}
                                                                </span>
                                                            </td>
                                                            {user.role === 'manager' && (
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                    {app.status === 'Pending' ? (
                                                                        <div className="flex space-x-2">
                                                                            <button
                                                                                onClick={() => handleLeaveAction(app.id, 'Approved')}
                                                                                className="text-green-600 hover:text-green-800"
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleLeaveAction(app.id, 'Rejected')}
                                                                                className="text-red-600 hover:text-red-800"
                                                                            >
                                                                                Reject
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-gray-400">No actions</span>
                                                                    )}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                    {leaveApplications.length === 0 && (
                                                        <tr>
                                                            <td
                                                                colSpan={user.role === 'manager' ? 6 : 4}
                                                                className="px-4 py-3 text-sm text-gray-500 text-center"
                                                            >
                                                                No leave applications found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Attendance Section */}
                    {activeSection === 'attendance' && (
                        <motion.section
                            key="attendance"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">
                                {user.role === 'manager' ? 'Team Attendance' : 'My Attendance'}
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Attendance Actions (only for employees) */}
                                {user.role === 'employee' && (
                                    <div className="lg:col-span-1">
                                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                                            <h3 className="font-bold text-blue-800 mb-4">Today's Attendance</h3>
                                            <div className="space-y-4">
                                                <div className="text-center">
                                                    <p className="text-sm text-gray-600 mb-1">Current Time</p>
                                                    <p className="text-2xl font-bold text-gray-800">
                                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => markAttendance('Present')}
                                                        className="bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition font-medium"
                                                    >
                                                        Check In
                                                    </button>
                                                    <button
                                                        onClick={() => markAttendance('Late')}
                                                        className="bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition font-medium"
                                                    >
                                                        Late In
                                                    </button>
                                                    <button
                                                        onClick={() => markAttendance('Absent')}
                                                        className="bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition font-medium col-span-2"
                                                    >
                                                        Report Absence
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Monthly Summary */}
                                        <div className="mt-6 bg-purple-50 rounded-lg p-5 border border-purple-100">
                                            <h3 className="font-bold text-purple-800 mb-3">Monthly Summary</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Working Days:</span>
                                                    <span className="font-bold">23</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Present:</span>
                                                    <span className="font-bold">18</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Late Arrivals:</span>
                                                    <span className="font-bold">3</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Absent:</span>
                                                    <span className="font-bold">2</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Attendance Records */}
                                <div className={user.role === 'employee' ? 'lg:col-span-2' : 'lg:col-span-3'}>
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">
                                                {user.role === 'manager' ? 'Team Attendance Records' : 'My Attendance Records'}
                                            </h3>
                                            <div className="flex space-x-2">
                                                <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                    <option>This Month</option>
                                                    <option>Last Month</option>
                                                    <option>Last 3 Months</option>
                                                    <option>Custom Range</option>
                                                </select>
                                                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                    Export
                                                </button>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        {user.role === 'manager' && (
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                        )}
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {(user.role === 'manager' ? attendanceRecords : getMyAttendanceRecords()).map((record) => {
                                                        const date = new Date(record.date);
                                                        const day = date.toLocaleDateString([], { weekday: 'short' });

                                                        return (
                                                            <tr key={record.id}>
                                                                {user.role === 'manager' && (
                                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.employee}</td>
                                                                )}
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{day}</td>
                                                                <td className="px-4 py-3 whitespace-nowrap">
                                                                    <span className={`px-2 py-1 text-xs rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                                                                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-red-100 text-red-800'
                                                                        }`}>
                                                                        {record.status}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                                    {record.checkIn !== '-' && record.checkOut !== '-' ? '8.5 hours' : '-'}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {attendanceRecords.length === 0 && (
                                                        <tr>
                                                            <td
                                                                colSpan={user.role === 'manager' ? 8 : 7}
                                                                className="px-4 py-3 text-sm text-gray-500 text-center"
                                                            >
                                                                No attendance records found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Team Section (Manager only) */}
                    {activeSection === 'team' && user.role === 'manager' && (
                        <motion.section
                            key="team"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">My Team</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Team Summary Cards */}
                                <motion.div
                                    className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-blue-800 mb-2">Team Members</h3>
                                    <p className="text-3xl font-bold text-blue-600">{teamMembers.length}</p>
                                </motion.div>

                                <motion.div
                                    className="bg-green-50 rounded-lg p-4 border border-green-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-green-800 mb-2">On Leave Today</h3>
                                    <p className="text-3xl font-bold text-green-600">2</p>
                                </motion.div>

                                <motion.div
                                    className="bg-purple-50 rounded-lg p-4 border border-purple-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-purple-800 mb-2">Average Attendance</h3>
                                    <p className="text-3xl font-bold text-purple-600">92%</p>
                                </motion.div>
                            </div>

                            {/* Team Members Table */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800">Team Members</h3>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                                            Add Member
                                        </button>
                                        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                            Export
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {teamMembers.map((member) => (
                                                <tr key={member.id}>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <span className="text-blue-600 font-medium">{member.name.charAt(0)}</span>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                                <div className="text-sm text-gray-500">{member.department || 'Engineering'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.role}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.email}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                            View
                                                        </button>
                                                        <button className="text-gray-600 hover:text-gray-800">
                                                            Message
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Reports Section (Manager only) */}
                    {activeSection === 'reports' && user.role === 'manager' && (
                        <motion.section
                            key="reports"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Reports</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Leave Reports Card */}
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                    <h3 className="font-bold text-gray-800 mb-4">Leave Reports</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                                <option>Monthly Leave Summary</option>
                                                <option>Leave Balance Report</option>
                                                <option>Leave Trends</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium">
                                            Generate Report
                                        </button>
                                    </div>
                                </div>

                                {/* Attendance Reports Card */}
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                    <h3 className="font-bold text-gray-800 mb-4">Attendance Reports</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                                <option>Monthly Attendance</option>
                                                <option>Late Arrivals</option>
                                                <option>Absenteeism</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">For Month</label>
                                            <input
                                                type="month"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition font-medium">
                                            Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Reports */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                    <h3 className="font-bold text-gray-800">Recently Generated Reports</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Generated</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">June Leave Summary</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Leave Report</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">2023-07-01</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">June 2023</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                        Download
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-800">
                                                        Share
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Q2 Attendance</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Attendance Report</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">2023-07-05</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Apr-Jun 2023</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                        Download
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-800">
                                                        Share
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-2">© 2023 HRMS Portal. All rights reserved.</p>
                    <p className="text-gray-400 text-sm">Version 1.0.0</p>
                </div>
            </footer>
        </div>
    );
};

export default LeaveManagement;


