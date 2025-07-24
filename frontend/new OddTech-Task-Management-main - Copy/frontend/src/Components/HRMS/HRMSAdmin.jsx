
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialMedia from './SocialMedia';

const HRMSAdmin = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const [leaveApplications, setLeaveApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser] = useState({ name: 'Admin', role: 'admin' });
    // Load data from localStorage on component mount


    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchLeaveApplications = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/admin/leave/all`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch leaves");

                const data = await response.json();
                setLeaveApplications(data);
            } catch (error) {
                console.error("Error loading leaves:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaveApplications();
    }, []);


    // Save data to localStorage whenever it changes
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));
        }
    }, [leaveApplications, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
        }
    }, [attendanceRecords, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
        }
    }, [teamMembers, isLoading]);

    // Initialize with sample data if none exists
    useEffect(() => {
        if (!isLoading && leaveApplications.length === 0) {
            setLeaveApplications([
                { id: 1, employeeId: 1, employee: 'Alex Johnson', type: 'Annual', startDate: '2023-06-01', endDate: '2023-06-05', status: 'Approved', reason: 'Family vacation' },
                { id: 2, employeeId: 2, employee: 'Jane Smith', type: 'Sick', startDate: '2023-06-10', endDate: '2023-06-11', status: 'Pending', reason: 'Flu' },
            ]);
        }

        if (!isLoading && teamMembers.length === 0) {
            setTeamMembers([
                { id: 1, name: 'Alex Johnson', role: 'Senior Developer', email: 'alex.johnson@example.com', department: 'Engineering' },
                { id: 2, name: 'Jane Smith', role: 'UI Designer', email: 'jane.smith@example.com', department: 'Design' },
            ]);
        }

        if (!isLoading && attendanceRecords.length === 0) {
            setAttendanceRecords([
                { id: 1, employeeId: 1, employee: 'Alex Johnson', date: '2023-06-01', status: 'Present', checkIn: '09:00', checkOut: '17:00' },
                { id: 2, employeeId: 2, employee: 'Jane Smith', date: '2023-06-01', status: 'Present', checkIn: '09:05', checkOut: '17:30' },
            ]);
        }
    }, [isLoading]);

    const sectionVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    const handleLeaveAction = (leaveId, newStatus, action) => {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/api/admin/leave/${leaveId}/leaveStatus?leaveStatus=${newStatus}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // 🔁 use your token from login
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to update leave status');
                }
                return res.json();
            })
            .then((updatedLeave) => {
                console.log('Leave updated:', updatedLeave);
                // Optionally update local state or re-fetch data
                setLeaveApplications((prev) =>
                    prev.map((leave) =>
                        leave.leaveId === updatedLeave.leaveId ? updatedLeave : leave
                    )
                );
            })
            .catch((err) => {
                console.error('Error updating leave:', err);
            });



        // Update employee's leave balance if approved
        if (action === 'Approved') {
            const approvedLeave = leaveApplications.find(app => app.id === id);
            // In a real app, you would update the employee's leave balance here
            alert(`Leave approved for ${approvedLeave.employee}. Their ${approvedLeave.type} leave balance will be updated.`);
        }
    };

    const getPendingLeaveApplications = () => {
        return leaveApplications.filter(app => app.leaveStatus === 'PENDING');
    };

    const addTeamMember = (newMember) => {
        setTeamMembers([...teamMembers, newMember]);
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 mt-16">

            <main className="container mx-auto px-4 py-6">
                <nav className="mb-8 bg-white rounded-lg shadow p-2 overflow-x-auto">
                    <ul className="flex space-x-2 min-w-max">
                        <li>
                            <button onClick={() => setActiveSection('dashboard')} className={`px-4 py-2 rounded-md ${activeSection === 'dashboard' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('leave')} className={`px-4 py-2 rounded-md ${activeSection === 'leave' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                                Leave Management
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('attendance')} className={`px-4 py-2 rounded-md ${activeSection === 'attendance' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                                Attendance
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('team')} className={`px-4 py-2 rounded-md ${activeSection === 'team' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                                My Team
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('socialmedia')} className={`px-4 py-2 rounded-md ${activeSection === 'socialmedia' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                                Social Media
                            </button>
                        </li>
                    </ul>
                </nav>

                <AnimatePresence mode="wait">


                    {/* Social Media Section */}

                    {activeSection === 'socialmedia' && (
                        <motion.section
                            key="socialmedia"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Social Media</h2>
                            <SocialMedia currentUser={currentUser} />
                        </motion.section>
                    )}



                    {/* Dashboard Section */}
                    {activeSection === 'dashboard' && (
                        <motion.section key="dashboard" initial="hidden" animate="visible" exit="exit" variants={sectionVariants} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Manager Dashboard</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <motion.div className="bg-blue-50 rounded-lg p-4 border border-blue-100" whileHover={{ y: -5 }}>
                                    <h3 className="font-medium text-blue-800 mb-2">Team Summary</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Team Members:</span>
                                            <span className="font-semibold">{teamMembers.length}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">On Leave Today:</span>
                                            <span className="font-semibold">{leaveApplications.filter(app => app.status === 'Approved' && new Date(app.startDate) <= new Date() && new Date(app.endDate) >= new Date()).length}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Pending Approvals:</span>
                                            <span className="font-semibold">{getPendingLeaveApplications().length}</span>
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div className="bg-green-50 rounded-lg p-4 border border-green-100" whileHover={{ y: -5 }}>
                                    <h3 className="font-medium text-green-800 mb-2">Attendance Summary</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Today Present:</span>
                                            <span className="font-semibold">{attendanceRecords.filter(record => new Date(record.date).toDateString() === new Date().toDateString() && record.status === 'Present').length}/{teamMembers.length}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Late Arrivals:</span>
                                            <span className="font-semibold">{attendanceRecords.filter(record => record.status === 'Late').length}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Absent:</span>
                                            <span className="font-semibold">{attendanceRecords.filter(record => record.status === 'Absent').length}</span>
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div className="bg-purple-50 rounded-lg p-4 border border-purple-100" whileHover={{ y: -5 }}>
                                    <h3 className="font-medium text-purple-800 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button onClick={() => setActiveSection('leave')} className="w-full bg-blue-100 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition">
                                            Manage Leaves
                                        </button>
                                        <button onClick={() => setActiveSection('team')} className="w-full bg-green-100 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition">
                                            View Team
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Pending Leave Approvals */}
                            <div className="mb-8">
                                <h3 className="font-bold text-gray-700 mb-3">Pending Leave Approvals</h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {getPendingLeaveApplications().map((app) => (
                                                <tr key={app.leaveId} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.userName}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.leaveType}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {new Date(app.startDate).toLocaleDateString()}&nbsp;to&nbsp;{new Date(app.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate hover:text-clip" title={app.reason || '-'}>
                                                        {app.reason || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                                            {app.leaveStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleLeaveAction(app.leaveId, 'APPROVED')}
                                                                className="text-green-600 hover:text-green-800 transition-colors duration-150"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleLeaveAction(app.leaveId, 'REJECTED')}
                                                                className="text-red-600 hover:text-red-800 transition-colors duration-150"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {getPendingLeaveApplications().length === 0 && (
                                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No pending leave applications
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Team Attendance Overview */}
                            <div>
                                <h3 className="font-bold text-gray-700 mb-3">Team Attendance Overview</h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {teamMembers.map((member) => {
                                                const memberRecords = attendanceRecords.filter(record => record.employeeId === member.id);
                                                const presentCount = memberRecords.filter(record => record.status === 'Present').length;
                                                const lateCount = memberRecords.filter(record => record.status === 'Late').length;
                                                const absentCount = memberRecords.filter(record => record.status === 'Absent').length;
                                                const totalRecords = memberRecords.length;
                                                const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

                                                return (
                                                    <tr key={member.id}>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.name}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{presentCount}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{lateCount}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{absentCount}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${attendanceRate >= 90 ? 'bg-green-100 text-green-800' : attendanceRate >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                                {attendanceRate}%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Leave Management Section */}
                    {activeSection === 'leave' && (
                        <motion.section key="leave" initial="hidden" animate="visible" exit="exit" variants={sectionVariants} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Leave Management</h2>

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800">All Leave Applications</h3>
                                    <div className="flex space-x-2">
                                        <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                            <option>All Status</option>
                                            <option>Pending</option>
                                            <option>Approved</option>
                                            <option>Rejected</option>
                                        </select>
                                        <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                            <option>All Employees</option>
                                            {teamMembers.map(member => (
                                                <option key={member.id}>{member.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {leaveApplications.map((app, index) => (
                                                <tr key={app.leaveId} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.userName}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.leaveType}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                        {new Date(app.startDate).toLocaleDateString()} to {new Date(app.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate hover:text-clip" title={app.reason || '-'}>
                                                        {app.reason || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${app.leaveStatus === 'APPROVED'
                                                            ? 'bg-green-100 text-green-800'
                                                            : app.leaveStatus === 'PENDING'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {app.leaveStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {app.leaveStatus === 'PENDING' ? (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => handleLeaveAction(app.leaveId, 'APPROVED')}
                                                                    className="text-green-600 hover:text-green-800 transition-colors duration-150"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleLeaveAction(app.leaveId, 'REJECTED')}
                                                                    className="text-red-600 hover:text-red-800 transition-colors duration-150"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400">No actions</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}
                    {/* Attendance Section */}
                    {activeSection === 'attendance' && (
                        <motion.section key="attendance" initial="hidden" animate="visible" exit="exit" variants={sectionVariants} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Team Attendance</h2>

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800">Team Attendance Records</h3>
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
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {attendanceRecords.map((record) => {
                                                const date = new Date(record.date);
                                                const day = date.toLocaleDateString([], { weekday: 'short' });
                                                return (
                                                    <tr key={record.id}>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.employee}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{day}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' : record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Team Section */}
                    {activeSection === 'team' && (
                        <motion.section key="team" initial="hidden" animate="visible" exit="exit" variants={sectionVariants} className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">My Team</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <motion.div className="bg-blue-50 rounded-lg p-4 border border-blue-100" whileHover={{ y: -5 }}>
                                    <h3 className="font-medium text-blue-800 mb-2">Team Members</h3>
                                    <p className="text-3xl font-bold text-blue-600">{teamMembers.length}</p>
                                </motion.div>

                                <motion.div className="bg-green-50 rounded-lg p-4 border border-green-100" whileHover={{ y: -5 }}>
                                    <h3 className="font-medium text-green-800 mb-2">On Leave Today</h3>
                                    <p className="text-3xl font-bold text-green-600">{leaveApplications.filter(app => app.status === 'Approved' && new Date(app.startDate) <= new Date() && new Date(app.endDate) >= new Date()).length}</p>
                                </motion.div>

                                <motion.div className="bg-purple-50 rounded-lg p-4 border border-purple-100" whileHover={{ y: -5 }}>
                                    <h3 className="font-medium text-purple-800 mb-2">Average Attendance</h3>
                                    <p className="text-3xl font-bold text-purple-600">
                                        {attendanceRecords.length > 0
                                            ? Math.round((attendanceRecords.filter(record => record.status === 'Present').length / attendanceRecords.length) * 100)
                                            : 0}%
                                    </p>
                                </motion.div>
                            </div>

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
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
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
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.role}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.email}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{member.department}</td>
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
                </AnimatePresence>
            </main>


        </div>
    );
};

export default HRMSAdmin;