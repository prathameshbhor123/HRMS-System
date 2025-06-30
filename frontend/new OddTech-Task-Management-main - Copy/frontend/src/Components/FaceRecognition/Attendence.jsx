// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const AttendanceCapture = ({ employeeId }) => {
//     const webcamRef = useRef(null);
//     const [status, setStatus] = useState("");

//     const captureAndSend = async () => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         const response = await axios.post("http://localhost:8080/api/attendance/mark", {
//             employeeId,
//             image: imageSrc
//         });
//         setStatus(response.data.message);
//     };

//     return (
//         <div>
//             <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//             <button onClick={captureAndSend} className="mt-2 p-2 bg-blue-500 text-white rounded">Mark Attendance</button>
//             <p>{status}</p>
//         </div>
//     );
// };

// export default AttendanceCapture;




import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import { Clock4, X } from "lucide-react";
import { Fragment } from "react";

const Attendance = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceList, setAttendanceList] = useState([]);
    const [allLogs, setAllLogs] = useState({});
    const [logModal, setLogModal] = useState({ open: false, logs: [], name: "" });
    const [photoModal, setPhotoModal] = useState({ open: false, url: "" });

    useEffect(() => {
        fetchAttendance();
    }, [selectedDate]);

    const fetchAttendance = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/attendance");
            if (!res.ok) throw new Error("Failed to fetch attendance");

            const allData = await res.json();

            const filtered = allData.filter((entry) => {
                const entryDate = new Date(entry.time);
                return entryDate.toDateString() === selectedDate.toDateString();
            });

            const logsMap = {};
            filtered.forEach((entry) => {
                if (!logsMap[entry.email]) logsMap[entry.email] = [];
                logsMap[entry.email].push(entry);
            });

            const uniqueAttendance = Object.values(
                Object.fromEntries(
                    Object.entries(logsMap).map(([email, entries]) => [
                        email,
                        entries.reduce((latest, current) =>
                            new Date(current.time) > new Date(latest.time) ? current : latest
                        ),
                    ])
                )
            );

            setAttendanceList(uniqueAttendance);
            setAllLogs(logsMap);
        } catch (err) {
            console.error(err.message);
            alert("Error fetching attendance data");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">📅 Attendance Dashboard</h1>

                {/* Date Picker */}
                <div className="mb-6">
                    <label className="block text-gray-600 mb-2 font-medium">Select a Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="border border-gray-300 rounded-md p-2 w-full md:w-60"
                        dateFormat="dd MMMM yyyy"
                        showPopperArrow={false}
                    />
                </div>

                {/* Attendance Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-100 text-blue-800 font-medium">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Time</th>
                                <th className="py-3 px-4 text-left">Location</th>
                                <th className="py-3 px-4 text-left">Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList.length > 0 ? (
                                attendanceList.map((att, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50 transition">
                                        <td className="py-3 px-4">{att.name}</td>
                                        <td className="py-3 px-4">{att.email}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${att.status === "PRESENT"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {att.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(att.time).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            <button
                                                onClick={() =>
                                                    setLogModal({
                                                        open: true,
                                                        logs: allLogs[att.email] || [],
                                                        name: att.name,
                                                    })
                                                }
                                                className="ml-2 text-blue-600 hover:underline text-xs flex items-center"
                                            >
                                                <Clock4 className="h-4 w-4 mr-1" />
                                                Logs
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <a
                                                href={`https://maps.google.com/?q=${att.lat},${att.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {att.lat.toFixed(2)}, {att.lng.toFixed(2)}
                                            </a>
                                        </td>
                                        <td className="py-3 px-4">
                                            {att.photo ? (
                                                <img
                                                    src={att.photo}
                                                    alt="Face"
                                                    className="w-16 h-16 rounded object-cover border cursor-pointer hover:scale-105 transition"
                                                    onClick={() => setPhotoModal({ open: true, url: att.photo })}
                                                />
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No attendance marked on this date.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Logs Modal */}
            <Dialog
                open={logModal.open}
                onClose={() => setLogModal({ open: false, logs: [], name: "" })}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white max-w-sm w-full rounded-lg shadow-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-lg font-semibold">
                                ⏱️ Logs for {logModal.name}
                            </Dialog.Title>
                            <button
                                onClick={() => setLogModal({ open: false, logs: [], name: "" })}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <ul className="max-h-60 overflow-y-auto space-y-2 text-sm text-gray-700">
                            {logModal.logs.map((log, idx) => (
                                <li key={idx}>
                                    {new Date(log.time).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </li>
                            ))}
                        </ul>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Photo Modal with Animation */}
            <Transition appear show={photoModal.open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setPhotoModal({ open: false, url: "" })}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-sm"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 backdrop-blur-sm"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 backdrop-blur-xs" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="scale-90 opacity-0"
                            enterTo="scale-100 opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="scale-100 opacity-100"
                            leaveTo="scale-90 opacity-0"
                        >
                            <Dialog.Panel className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full relative">

                                <img
                                    src={photoModal.url}
                                    alt="Zoomed Face"
                                    className="rounded-lg w-full max-h-[80vh] object-contain"
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Attendance;
