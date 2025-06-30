import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaints, setSelectedComplaints] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:8080/complaint/show');
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedComplaints(new Set());
        } else {
            const allIds = new Set(complaints.map(complaint => complaint.id));
            setSelectedComplaints(allIds);
        }
        setSelectAll(!selectAll);
    };

    const toggleSelectComplaint = (id) => {
        const newSelection = new Set(selectedComplaints);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedComplaints(newSelection);
        setSelectAll(newSelection.size === complaints.length);
    };

    return (
        <div className="min-h-screen bg-purple-700 font-sans">
            <div className="container mx-auto px-4 py-20">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 text-center">
                        <h5 className="text-xl font-semibold text-gray-800 mb-0">Grievances List</h5>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-4 px-6 border-b">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-blue-600"
                                                checked={selectAll}
                                                onChange={toggleSelectAll}
                                            />
                                            <span className="ml-2"></span>
                                        </label>
                                    </th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">ID</th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">NAME</th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">EMAIL</th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">ADDRESS</th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">PHONE NO</th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">COMPLAINT TITLE</th>
                                    <th className="py-4 px-6 border-b text-left font-semibold text-gray-700">DESCRIPTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="py-4 px-6 border-b text-center text-gray-500">
                                            No complaints found
                                        </td>
                                    </tr>
                                ) : (
                                    complaints.map((complaint) => (
                                        <tr key={complaint.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6 border-b">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-5 w-5 text-blue-600"
                                                        checked={selectedComplaints.has(complaint.id)}
                                                        onChange={() => toggleSelectComplaint(complaint.id)}
                                                    />
                                                    <span className="ml-2"></span>
                                                </label>
                                            </td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.id}</td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.name}</td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.email}</td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.address}</td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.phone}</td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.complaintTitle}</td>
                                            <td className="py-4 px-6 border-b text-gray-700">{complaint.description}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowComplaints;