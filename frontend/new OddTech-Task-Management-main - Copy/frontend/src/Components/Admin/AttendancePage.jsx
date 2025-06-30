import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const API_URL = 'http://localhost:8080/api/auth/attendance';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [users, setUsers] = useState([]); // All registered users
  const [attendanceMap, setAttendanceMap] = useState({});

  useEffect(() => {
    fetchAllUsers();
    fetchAttendance();
  }, [selectedDate]);

  const fetchAllUsers = async () => {
    const res = await fetch('http://localhost:8080/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  const fetchAttendance = async () => {
    const res = await fetch('http://localhost:8080/api/auth/attendance');
    const allData = await res.json();

    const filtered = allData.filter(entry =>
      new Date(entry.date).toDateString() === selectedDate.toDateString()
    );

    // Convert to map for quick lookup
    const map = {};
    filtered.forEach(entry => {
      map[entry.email] = entry;
    });
    setAttendanceMap(map);
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Calendar */}
      <div className="md:w-1/3 p-4">
        <h2 className="text-xl font-bold mb-2">Select Date</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      {/* Attendance Table */}
      <div className="md:w-2/3 p-4 overflow-x-auto">
        <h2 className="text-xl font-bold mb-2">Attendance on {selectedDate.toDateString()}</h2>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Photo</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => {
                const att = attendanceMap[user.email];
                return (
                  <tr key={user.email}>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{att ? new Date(att.time).toLocaleTimeString() : "-"}</td>
                    <td className="p-2 border">
                      {att ? <span className="text-green-600 font-bold">Present</span> : <span className="text-red-600">Absent</span>}
                    </td>
                    <td className="p-2 border">{att ? `${att.lat}, ${att.lng}` : "-"}</td>
                    <td className="p-2 border">
                      {att?.photoUrl ? <img src={att.photoUrl} alt="face" className="w-12 h-12 object-cover rounded-full" /> : "-"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AttendancePage;
