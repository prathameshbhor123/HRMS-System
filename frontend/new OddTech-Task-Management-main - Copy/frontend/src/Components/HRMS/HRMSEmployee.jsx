
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import format from 'date-fns/format';
import SocialMedia from './SocialMediaEmployee.jsx';

const HRMSEmployee = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser || null);

    const [leaveApplications, setLeaveApplications] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [leaveBalance, setLeaveBalance] = useState(null);
    const [newLeave, setNewLeave] = useState({
        type: 'Annual',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const fetchLeaveBalance = () => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/api/employee/leave-balance/${user.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setLeaveBalance(data);
            })
            .catch(err => {
                console.error("Failed to fetch leave balance:", err);
            });
    };



    useEffect(() => {
        if (!user || !user.id) return;

        const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/api/employee/leave/user/${user.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log("Raw leave data from backend:", data);
                const formatted = data.map(item => ({
                    id: item.leaveId,
                    userId: item.userId,
                    employee: user.name,
                    type: item.leaveType,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    reason: item.reason,
                    status: item.leaveStatus
                }));

                setLeaveApplications(formatted);
            })
            .catch(err => {
                console.error("Failed to load leave data:", err);
            });

        fetchLeaveBalance();

    }, [user]);







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

    const token = localStorage.getItem("token");

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: user.id,
            leaveType: newLeave.type.toUpperCase(), // match enum in backend
            startDate: newLeave.startDate,
            endDate: newLeave.endDate,
            reason: newLeave.reason
        };

        try {
            const response = await fetch("http://localhost:8080/api/employee/leave/createleave", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    , "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                setLeaveApplications([...leaveApplications, {
                    id: data.leaveId,
                    userId: user.id,
                    employee: user.name,
                    type: newLeave.type,
                    startDate: newLeave.startDate,
                    endDate: newLeave.endDate,
                    reason: newLeave.reason,
                    status: 'Pending'
                }]);

                setNewLeave({
                    type: 'Annual',
                    startDate: '',
                    endDate: '',
                    reason: ''
                });

                alert("Leave submitted successfully!");
            } else {
                alert("Failed to submit leave: " + response.status);
            }
        } catch (error) {
            console.error("Error submitting leave:", error);
            alert("Error submitting leave. See console for details.");
        }
    };


    const markAttendance = (status) => {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Check if attendance already marked for today
        const todayRecord = attendanceRecords.find(record =>
            record.date === today && record.employeeId === user.id
        );

        if (todayRecord) {
            alert('Attendance already marked for today!');
            return;
        }

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

    const getMyLeaveApplications = () => {
        return leaveApplications.filter(app => app.userId === user?.id);
    };

    const recentLeaves = [...leaveApplications]
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 5); // Get latest 5


    const getMyAttendanceRecords = () => {
        return attendanceRecords.filter(record => record.employeeId === user.id);
    };


    return (
        <div className="min-h-screen bg-gray-100 mt-15">


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
                        <li>
                            <button
                                onClick={() => setActiveSection('profile')}
                                className={`px-4 py-2 rounded-md ${activeSection === 'profile' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                My Profile
                            </button>
                        </li>


                         <li>
                            <button
                                onClick={() => setActiveSection('socialmediaemployee')}
                                className={`px-4 py-2 rounded-md ${activeSection === 'socialmediaemployee' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Social Media
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Content Sections */}
                <AnimatePresence mode="wait">









                    {activeSection === 'socialmediaemployee' && (
    <motion.section
        key="socialmediaemployee"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        className="bg-white rounded-lg shadow p-0 overflow-hidden"
    >
        <SocialMedia />
    </motion.section>
)}
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
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Employee Dashboard</h2>

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
                                            <span className="font-semibold">{leaveBalance?.annualLeave ?? 0} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Sick Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.sickLeave ?? 0} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Casual Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.casualLeave ?? 0} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Earned Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.earnedLeave ?? 0} days</span>
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
                                            Apply for Leave
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('attendance')}
                                            className="w-full bg-green-100 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition"
                                        >
                                            Mark Attendance
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Recent Leave Applications */}

                            <div className="mb-8">
                                <h3 className="font-bold text-gray-700 mb-3">My Recent Leave Applications</h3>
                                <div className=" rounded-lg overflow-hidden border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {([...getMyLeaveApplications()]
                                                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                                                .slice(0, 3)
                                            ).map((app) => (
                                                <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{app.type}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(app.startDate).toLocaleDateString()} to{" "}
                                                        {new Date(app.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hover:text-clip" title={app.reason || "-"}>
                                                        {app.reason || "-"}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span
                                                            className={`px-2 py-1 text-xs rounded-full font-medium ${app.status === "APPROVED"
                                                                ? "bg-green-100 text-green-800"
                                                                : app.status === "PENDING"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-red-100 text-red-800"
                                                                }`}
                                                        >
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}

                                            {getMyLeaveApplications().length === 0 && (
                                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
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
                            <h2 className="text-xl font-bold mb-6 text-gray-800">My Leave Applications</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Apply for Leave Form */}
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
                                                <span className="font-bold">{leaveBalance?.annualLeave ?? 0} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Sick Leave:</span>
                                                <span className="font-bold">{leaveBalance?.sickLeave ?? 0} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Casual Leave:</span>
                                                <span className="font-bold">{leaveBalance?.casualLeave ?? 0} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Earned Leave:</span>
                                                <span className="font-bold">{leaveBalance?.earnedLeave ?? 0} days</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Leave Applications */}
                                {/* <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">My Applications</h3>
                                            <div className="flex space-x-2">
                                                <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                    <option>All Status</option>
                                                    <option>Pending</option>
                                                    <option>Approved</option>
                                                    <option>Rejected</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {getMyLeaveApplications().map((app) => (
                                                        <tr key={app.id}>
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
                                                        </tr>
                                                    ))}
                                                    {getMyLeaveApplications().length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                                No leave applications found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> */}



                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">My Applications</h3>
                                            <div className="flex space-x-2">
                                                <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                    <option>All Status</option>
                                                    <option>Pending</option>
                                                    <option>Approved</option>
                                                    <option>Rejected</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {getMyLeaveApplications().map((app) => (
                                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.type}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                                {format(new Date(app.startDate), 'MMM dd, yyyy')} - {format(new Date(app.endDate), 'MMM dd, yyyy')}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate hover:text-clip" title={app.reason || '-'}>
                                                                {app.reason || '-'}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${app.status.toLowerCase() === 'approved'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : app.status.toLowerCase() === 'pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {app.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {getMyLeaveApplications().length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
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
                            <h2 className="text-xl font-bold mb-6 text-gray-800">My Attendance</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Attendance Actions */}
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

                                {/* Attendance Records */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">My Attendance Records</h3>
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
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {getMyAttendanceRecords().map((record) => {
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
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <motion.section
                            key="profile"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">My Profile</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Department</p>
                                            <p className="font-medium">{user.department}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Join Date</p>
                                            <p className="font-medium">{user.joinDate}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Leave Balance</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Annual Leave</p>
                                            <p className="font-medium">{user.remainingLeaves.annual} days remaining</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Sick Leave</p>
                                            <p className="font-medium">{user.remainingLeaves.sick} days remaining</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Casual Leave</p>
                                            <p className="font-medium">{user.remainingLeaves.casual} days remaining</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>


        </div>
    );
};

export default HRMSEmployee;