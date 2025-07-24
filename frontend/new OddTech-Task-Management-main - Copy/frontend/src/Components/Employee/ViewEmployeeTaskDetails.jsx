// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { Snackbar } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';

// const API_BASE_URL = 'http://localhost:8080/api/employee'; // Update with your API base URL

// const ViewTaskDetails = () => {

//     const { id } = useParams();
//     const taskId = id;
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;
//     const userId = user?.id;

//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const [taskData, setTaskData] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'success'
//     });

//     const fetchTaskDetails = async () => {
//         try {
//             console.log('Fetching task details for ID:', taskId);
//             const response = await axios.get(`${API_BASE_URL}/task/${taskId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setTaskData(response.data);
//             fetchComments();
//         } catch (error) {
//             console.error('Error fetching task:', error);
//             showSnackbar('Failed to load task details', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchComments = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/task/${taskId}/comments`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setComments(response.data);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             showSnackbar('Failed to load comments', 'error');
//         }
//     };

//     const publishComment = async (data) => {
//         try {
//             const content = data.content; // ✅ Make sure this is just a plain string
//             console.log('Publishing comment:', content);

//             const url = ` ${API_BASE_URL}/task/comment?taskId=${taskId}&postedBy=${userId}`;
//             console.log('Posting comment to:', url);

//             const response = await axios.post(url, content, {
//                 headers: { 'Content-Type': 'text/plain' }
//             });

//             console.log('Comment posted:', response.data);


//             if (response.data.id) {
//                 showSnackbar('Comment published successfully', 'success');
//                 fetchComments();
//                 reset();
//             } else {
//                 showSnackbar('Something went wrong', 'error');
//             }
//         } catch (error) {
//             console.error('Error publishing comment:', error);
//             showSnackbar(error.response?.data?.message || 'Failed to publish comment', 'error');
//         }
//     };



//     const showSnackbar = (message, severity) => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     const formatDateTime = (dateString) => {
//         const options = {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     useEffect(() => {
//         if (id) {
//             fetchTaskDetails();
//         }
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (!taskData) {
//         return <div className="text-center py-10">Task not found</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             {/* Task Details Card */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 mt-20">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold text-blue-600 mb-3">{taskData.title}</h2>
//                     <p className="text-gray-700 mb-4 ">{taskData.description}</p>

//                     <div className="border-t border-gray-200 my-4"></div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Due Date:</span>
//                             <span className="font-semibold">
//                                 {taskData.dueDate && formatDate(taskData.dueDate)}
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Employee:</span>
//                             <span className="font-semibold">{taskData.employeeName}</span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Priority:</span>
//                             <span className="font-semibold">
//                                 <span className={`px-2 py-1 rounded-full text-xs ${taskData.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
//                                     taskData.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
//                                         'bg-green-100 text-green-800'
//                                     }`}>
//                                     {taskData.priority}
//                                 </span>
//                             </span>
//                         </div>
//                         <div className="flex items-center">
//                             <span className="text-gray-600 mr-2">Status:</span>
//                             <span className="font-semibold">
//                                 <span className={`px-2 py-1 rounded-full text-xs ${taskData.taskStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
//                                     taskData.taskStatus === 'INPROGRESS' ? 'bg-blue-100 text-blue-800' :
//                                         'bg-gray-100 text-gray-800'
//                                     }`}>
//                                     {taskData.taskStatus}
//                                 </span>
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Comment Form */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//                 <div className="p-6">
//                     <h4 className="text-lg font-semibold mb-4">Publish your Comment</h4>
//                     <form onSubmit={handleSubmit(publishComment)}>
//                         <div className="mb-4">
//                             <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
//                             <textarea
//                                 id="content"
//                                 {...register('content', { required: 'Content is required' })}
//                                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'
//                                     }`}
//                                 rows={4}
//                             ></textarea>
//                             {errors.content && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//                             )}
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                                 disabled={!!errors.content}
//                             >
//                                 Publish Comment
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Comments Section */}
//             <div>
//                 <h4 className="text-lg font-semibold mb-4">Comments ({comments.length})</h4>
//                 {comments.length === 0 ? (
//                     <p className="text-gray-500">No comments yet. Be the first to comment!</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {comments.map((comment) => (
//                             <div key={comment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                                 <div className="p-4">
//                                     <div className="flex items-start mb-2">
//                                         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
//                                             <img
//                                                 src={`https://i.pravatar.cc/150?u=${comment.postedName}`}
//                                                 alt="avatar"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <div className="flex-1">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h5 className="font-semibold">{comment.postedName}</h5>
//                                                     <p className="text-sm text-gray-500">
//                                                         {comment.createdAt && formatDateTime(comment.createdAt)}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-700 mt-2">{comment.content}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Snackbar Notification */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={5000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             >
//                 <MuiAlert
//                     elevation={6}
//                     variant="filled"
//                     onClose={handleCloseSnackbar}
//                     severity={snackbar.severity}
//                 >
//                     {snackbar.message}
//                 </MuiAlert>
//             </Snackbar>
//         </div>
//     );

// };

// export default ViewTaskDetails;





















import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLanguage,
    faVolumeHigh,
    faSpinner,
    faTimes,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8080/api/employee';
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const ViewTaskDetails = () => {
    const { id } = useParams();
    const taskId = id;
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.id;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [taskData, setTaskData] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [translatedDescription, setTranslatedDescription] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);
    const dropdownRef = useRef(null);

    // Handle clicks outside the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLanguageDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            setSpeechSupported(false);
            showSnackbar('Text-to-speech not supported in your browser', 'warning');
        }
    }, []);

    const fetchTaskDetails = async () => {
        try {
            console.log('Fetching task details for ID:', taskId);
            const response = await axios.get(`${API_BASE_URL}/task/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTaskData(response.data);
            fetchComments();
        } catch (error) {
            console.error('Error fetching task:', error);
            showSnackbar('Failed to load task details', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/task/${taskId}/comments`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            showSnackbar('Failed to load comments', 'error');
        }
    };

    const translateDescription = async (langCode) => {
        if (!taskData?.description) {
            showSnackbar('No description available to translate', 'error');
            return;
        }

        setIsTranslating(true);
        try {
            const response = await api.post(`employee/translate`, {
                text: taskData.description,
                targetLang: langCode
            });

            setTranslatedDescription(response.data.translatedText || response.data);
            setSelectedLanguage(langCode);
            setShowLanguageDropdown(false);
        } catch (error) {
            console.error('Translation error:', error);
            showSnackbar('Failed to translate description', 'error');
        } finally {
            setIsTranslating(false);
        }
    };

    const resetTranslation = () => {
        setTranslatedDescription('');
        setSelectedLanguage(null);
    };

    const handleTextToSpeech = () => {
        const textToSpeak = translatedDescription || taskData?.description || '';
        if (!textToSpeak) {
            showSnackbar('No text available to speak', 'error');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = selectedLanguage || 'en-US';

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
            setIsSpeaking(false);
            showSnackbar('Speech synthesis failed', 'error');
        };

        window.speechSynthesis.speak(utterance);
    };

    const publishComment = async (data) => {
        try {
            const content = data.content;
            console.log('Publishing comment:', content);

            const url = ` ${API_BASE_URL}/task/comment?taskId=${taskId}&postedBy=${userId}`;
            console.log('Posting comment to:', url);

            const response = await axios.post(url, content, {
                headers: { 'Content-Type': 'text/plain' }
            });

            console.log('Comment posted:', response.data);

            if (response.data.id) {
                showSnackbar('Comment published successfully', 'success');
                fetchComments();
                reset();
            } else {
                showSnackbar('Something went wrong', 'error');
            }
        } catch (error) {
            console.error('Error publishing comment:', error);
            showSnackbar(error.response?.data?.message || 'Failed to publish comment', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatDateTime = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        if (id) {
            fetchTaskDetails();
        }

        return () => {
            // Clean up speech synthesis
            window.speechSynthesis.cancel();
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!taskData) {
        return <div className="text-center py-10">Task not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Task Details Card */}
            <div className="bg-white rounded-lg shadow-md mb-6 mt-20">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-3">{taskData.title}</h2>
                    <div className="flex items-center mb-2">
                        <div className="flex-1">
                            <p className="text-gray-700 mr-2">
                                {translatedDescription || taskData.description}
                            </p>
                        </div>
                        {taskData.description && (
                            <div className="relative flex items-center" ref={dropdownRef}>
                                <div className="flex gap-1">
                                    {/* Translation Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                        className={`p-2 rounded-full flex items-center ${selectedLanguage
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                            } transition-all`}
                                        disabled={isTranslating}
                                        title={selectedLanguage ? "Change translation" : "Translate"}
                                    >
                                        <FontAwesomeIcon
                                            icon={isTranslating ? faSpinner : faLanguage}
                                            className={`text-xl ${isTranslating ? 'animate-spin' : ''}`}
                                        />
                                        <FontAwesomeIcon
                                            icon={showLanguageDropdown ? faChevronUp : faChevronDown}
                                            className="text-xs ml-1"
                                        />
                                    </motion.button>

                                    {/* Listen Button */}
                                    {speechSupported && (translatedDescription || taskData.description) && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleTextToSpeech}
                                            className={`p-2 rounded-full flex items-center ${isSpeaking
                                                ? 'bg-green-600 text-white animate-pulse shadow-md'
                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                } transition-all`}
                                            title={isSpeaking ? "Stop speech" : "Listen"}
                                            disabled={isTranslating}
                                        >
                                            <FontAwesomeIcon
                                                icon={faVolumeHigh}
                                                className="text-xl"
                                            />
                                        </motion.button>
                                    )}

                                    {/* Reset Button */}
                                    {translatedDescription && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={resetTranslation}
                                            className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-all flex items-center"
                                            title="Show original"
                                        >
                                            <FontAwesomeIcon icon={faTimes} className="text-lg" />
                                        </motion.button>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {showLanguageDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200 overflow-hidden"
                                        >
                                            <div className="py-1 max-h-60 overflow-y-auto">
                                                <h4 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                                                    Select Language
                                                </h4>
                                                {[
                                                    { code: 'en', name: 'English', flag: '🇬🇧' },
                                                    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                                                    { code: 'fr', name: 'French', flag: '🇫🇷' },
                                                    { code: 'de', name: 'German', flag: '🇩🇪' },
                                                    { code: 'it', name: 'Italian', flag: '🇮🇹' },
                                                    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
                                                    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
                                                    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                                                    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                                                    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
                                                    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
                                                    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
                                                    { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
                                                    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
                                                    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
                                                    { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
                                                ].map((lang) => (
                                                    <motion.button
                                                        key={lang.code}
                                                        whileHover={{ scale: 1.02, backgroundColor: '#f0f9ff' }}
                                                        onClick={() => translateDescription(lang.code)}
                                                        className={`flex items-center w-full text-left px-4 py-2 text-sm ${selectedLanguage === lang.code
                                                            ? 'bg-blue-100 text-blue-800 font-medium'
                                                            : 'text-gray-700'
                                                            } transition-colors`}
                                                    >
                                                        <span className="text-xl mr-3">{lang.flag}</span>
                                                        <span>{lang.name}</span>
                                                        {selectedLanguage === lang.code && (
                                                            <span className="ml-auto h-2 w-2 rounded-full bg-blue-600"></span>
                                                        )}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Due Date:</span>
                            <span className="font-semibold">
                                {taskData.dueDate && formatDate(taskData.dueDate)}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Employee:</span>
                            <span className="font-semibold">{taskData.employeeName}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Priority:</span>
                            <span className="font-semibold">
                                <span className={`px-2 py-1 rounded-full text-xs ${taskData.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                    taskData.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                    {taskData.priority}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Status:</span>
                            <span className="font-semibold">
                                <span className={`px-2 py-1 rounded-full text-xs ${taskData.taskStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                    taskData.taskStatus === 'INPROGRESS' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {taskData.taskStatus}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment Form */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4">Publish your Comment</h4>
                    <form onSubmit={handleSubmit(publishComment)}>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 mb-2">Content</label>
                            <textarea
                                id="content"
                                {...register('content', { required: 'Content is required' })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                rows={4}
                            ></textarea>
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 shadow-md"
                                disabled={!!errors.content}
                            >
                                Publish Comment
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Comments Section */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Comments ({comments.length})</h4>
                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-4">
                                    <div className="flex items-start mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden border-2 border-blue-200">
                                            <img
                                                src={`https://i.pravatar.cc/150?u=${comment.postedName}`}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-semibold">{comment.postedName}</h5>
                                                    <p className="text-sm text-gray-500">
                                                        {comment.createdAt && formatDateTime(comment.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mt-2">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default ViewTaskDetails;