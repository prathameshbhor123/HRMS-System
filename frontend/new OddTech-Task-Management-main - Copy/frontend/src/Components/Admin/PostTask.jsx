import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Make sure to install axios
import emailjs from 'emailjs-com';
import 'emailjs-com/dist/email.min.js';
// Import emailjs
const API_BASE_URL = 'http://localhost:8080/api/admin'; // Replace with your actual API base URL

const PostTask = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState(null);
    const priorities = ['LOW', 'MEDIUM', 'HIGH'];

    const [formData, setFormData] = useState({
        employeeId: '',
        title: '',
        startDate: null,
        dueDate: null,
        description: '',
        priority: ''
    });

    const [errors, setErrors] = useState({
        employeeId: '',
        title: '',
        startDate: '',
        dueDate: '',
        description: '',
        priority: ''
    });

    const isStartDateToday = (startDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        return today.getTime() === start.getTime();
    };



    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use token-based auth
                }
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            showNotification('Failed to load employees', 'error');
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleDateChange = (date, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: date
        }));

        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }));
        }
    };


    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            employeeId: '',
            title: '',
            startDate: '',
            dueDate: '',
            description: '',
            priority: ''
        };

        if (!formData.employeeId) {
            newErrors.employeeId = 'Employee is required';
            isValid = false;
        }
        if (!formData.title) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
            isValid = false;
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
        if (!formData.priority) {
            newErrors.priority = 'Priority is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const sendEmail = () => {
        const serviceId = import.meta.env.VITE_SERVICE_ID;
        const templateId = import.meta.env.VITE_TEMPLATE_ID;
        const userId = import.meta.env.VITE_PUBLIC_KEY;
        const selectedEmployee = employees.find(emp => emp.id === Number(formData.employeeId));

        console.log({
            to_name: selectedEmployee.name,
            to_email: selectedEmployee.email,
            task_title: formData.title,
            task_description: formData.description,
            due_date: formData.dueDate?.toLocaleDateString(),
        });
        emailjs.send(

            serviceId,
            templateId,
            {
                to_name: selectedEmployee.name,
                to_email: selectedEmployee.email,
                task_title: formData.title,
                task_description: formData.description,
                priority: formData.priority,
                start_date: formData.startDate?.toLocaleDateString(),
                due_date: formData.dueDate?.toLocaleDateString(),
            },
            userId,
        )
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Email send failed:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        //

        try {
            const response = await axios.post(`${API_BASE_URL}/task`, {
                ...formData,
                startDate: formData.startDate?.toISOString(),
                dueDate: formData.dueDate?.toISOString(),
                assignedTo: formData.employeeId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.id) {
                showNotification('Task assigned successfully');

                // Only send email if start date is today
                if (isStartDateToday(formData.startDate)) {
                    sendEmail();
                    ((result) => {
                        console.log('Email successfully sent!', result.text);
                    })

                }

                navigate('/admindashboard');
            }
            else {
                showNotification('Something went wrong', 'error');
            }
        } catch (error) {
            console.error(error);
            showNotification(error.response?.data?.message || 'Failed to assign task', 'error');
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-blue-50 to-blue-100">
            {/* Notification */}
            {notification && (
                <div className={`fixed bottom-4 right-4 ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    } text-white px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[300px]`}>
                    <span>{notification.message}</span>
                    <button
                        onClick={() => setNotification(null)}
                        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-20">
                <h2 className="text-2xl font-bold text-center text-[#00AEEF] mb-6">Assign Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.title ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.description ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 display flex-wrap">
                        {/* Start Date Field */}
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <DatePicker
                                id="startDate"
                                selected={formData.startDate}
                                onChange={(date) => handleDateChange(date, 'startDate')}
                                minDate={new Date()} // or remove if you want to allow past dates
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.startDate ? 'border-red-500' : ''
                                    }`}
                                placeholderText="Choose a Start Date"
                            />
                            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                        </div>

                        {/* Due Date Field */}
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                            <DatePicker
                                id="dueDate"
                                selected={formData.dueDate}
                                onChange={(date) => handleDateChange(date, 'dueDate')}  // <-- fix here
                                minDate={formData.startDate || new Date()} // Ensure due date is after start date
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.dueDate ? 'border-red-500' : ''
                                    }`}
                                placeholderText="Choose a Due Date"
                            />

                            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 display flex-wrap">
                        {/* Priority Field */}
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.priority ? 'border-red-500' : ''
                                    }`}
                            >
                                <option value="">Select priority</option>
                                {priorities.map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                            {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority}</p>}
                        </div>

                        {/* Employee Field */}
                        <div>
                            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Select Employee</label>
                            <select
                                id="employeeId"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${errors.employeeId ? 'border-red-500' : ''
                                    }`}
                            >
                                <option value="">Select employee</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                                ))}
                            </select>
                            {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-[#00AEEF] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0085FF] hover:[box-shadow:0_4px_12px_rgba(0,174,239,0.3)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"

                        >
                            Assign Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostTask;