
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../NavBar/Navbar';
import Footer from '../../Footer/Footer';

const VisitorForm = () => {
  const [visitorRecords, setVisitorRecords] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    assets: '',
    reason: '',
    entryTime: '',
    exitTime: '',
    photo: null,
    photoPreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formElementsVisible, setFormElementsVisible] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);


  useEffect(() => {
    const records = JSON.parse(localStorage.getItem('visitorRequests') || '[]');
    setVisitorRecords(records);
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Pending</span>;
    }
  };


  // Animation on component mount
  useEffect(() => {
    setTimeout(() => {
      setFormElementsVisible(true);
    }, 100);

    // Cleanup camera stream on unmount
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      Swal.fire({
        title: 'Camera Error',
        text: 'Could not access camera. Please ensure you have granted permissions.',
        icon: 'error',
        confirmButtonColor: '#4f46e5',
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const dataURL = canvas.toDataURL('image/jpeg');

      // Convert data URL to blob
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          setFormData(prev => ({
            ...prev,
            photo: blob,
            photoPreview: dataURL
          }));
          stopCamera();
        });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'Please select an image smaller than 5MB',
          icon: 'error',
          confirmButtonColor: '#4f46e5',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate entry and exit times
    if (formData.entryTime && formData.exitTime && formData.entryTime > formData.exitTime) {
      Swal.fire({
        title: 'Invalid Time',
        text: 'Exit time must be after entry time',
        icon: 'error',
        confirmButtonColor: '#4f46e5',
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const requests = JSON.parse(localStorage.getItem('visitorRequests') || '[]');
      const newRequest = {
        ...formData,
        id: Date.now(),
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('visitorRequests', JSON.stringify([...requests, newRequest]));

      // Show success message with SweetAlert
      Swal.fire({
        title: 'Request Submitted!',
        text: 'Your entry request has been sent for approval.',
        icon: 'success',
        confirmButtonColor: '#4f46e5',
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          // Reset form
          setFormData({
            name: '',
            vehicle: '',
            assets: '',
            reason: '',
            entryTime: '',
            exitTime: '',
            photo: null,
            photoPreview: null
          });
          setIsSubmitting(false);
        }
      });
    }, 1500);
  };

  // Animation classes
  const inputAnimation = "transition-all duration-500 ease-out";
  const fadeInClass = formElementsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-15 bg-gradient-to-br  from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to App Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to App
            </button>
          </div>

          {/* Main Form Card */}
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl ${fadeInClass}`}>
            <div className="px-6 py-8 sm:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  Visitor Entry Request
                </h1>
                <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
                  Please fill all details to request entry permission
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Vehicle */}
                <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${inputAnimation} ${fadeInClass}`}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Details
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="vehicle"
                        id="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        className="pl-10 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                        placeholder="Vehicle model, color, plate number"
                      />
                    </div>
                  </div>
                </div>

                {/* Assets */}
                <div className={`${inputAnimation} ${fadeInClass}`}>
                  <label htmlFor="assets" className="block text-sm font-medium text-gray-700 mb-1">
                    Assets Carrying
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="assets"
                      id="assets"
                      value={formData.assets}
                      onChange={handleChange}
                      className="pl-10 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                      placeholder="Laptop, documents, etc."
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">List all items you're bringing in</p>
                </div>

                {/* Reason */}
                <div className={`${inputAnimation} ${fadeInClass}`}>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={4}
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      className="pl-10 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                      placeholder="Meeting with team, delivery, etc."
                    />
                  </div>
                </div>

                {/* Entry & Exit Time */}
                <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${inputAnimation} ${fadeInClass}`}>
                  <div>
                    <label htmlFor="entryTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Entry Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="datetime-local"
                        name="entryTime"
                        id="entryTime"
                        value={formData.entryTime}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().slice(0, 16)}
                        className="pl-10 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="exitTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Exit Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="datetime-local"
                        name="exitTime"
                        id="exitTime"
                        value={formData.exitTime}
                        onChange={handleChange}
                        min={formData.entryTime || new Date().toISOString().slice(0, 16)}
                        className="pl-10 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className={`${inputAnimation} ${fadeInClass}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visitor Photo <span className="text-red-500">*</span>
                  </label>

                  {isCameraActive ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-md">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-auto rounded-lg shadow-lg border-4 border-indigo-100"
                          style={{ maxHeight: '400px' }}
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="p-3 bg-white rounded-full shadow-lg hover:bg-indigo-100 transition-colors duration-300"
                            title="Capture Photo"
                          >
                            <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white"></div>
                          </button>
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="p-3 bg-white rounded-full shadow-lg hover:bg-red-100 transition-colors duration-300"
                            title="Cancel"
                          >
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 text-center">
                        Position your face in the frame and click the red button to capture
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="relative mb-4 sm:mb-0">
                        <div
                          className="relative group cursor-pointer"
                          onClick={triggerFileInput}
                        >
                          {formData.photoPreview ? (
                            <div className="relative">
                              <img
                                src={formData.photoPreview}
                                alt="Preview"
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-md group-hover:opacity-80 transition-opacity duration-300"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-dashed border-indigo-300 rounded-full w-32 h-32 flex items-center justify-center group-hover:bg-indigo-50 transition-colors duration-300 shadow-inner">
                              <svg className="h-12 w-12 text-indigo-400 group-hover:text-indigo-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handlePhotoChange}
                            accept="image/*"
                            required={!formData.photoPreview}
                          />
                        </div>
                      </div>
                      <div className="sm:ml-6 text-center sm:text-left space-y-3">
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          Upload Photo
                        </button>

                        <button
                          type="button"
                          onClick={startCamera}
                          className="ml-0 mt-2 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Take Live Photo
                        </button>

                        <p className="mt-2 text-sm text-gray-500">JPG, PNG or GIF (Max 5MB)</p>
                        {formData.photoPreview && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, photo: null, photoPreview: null }))}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none transition-colors duration-300"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hidden canvas for photo capture */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Submit Button */}
                <div className={`flex justify-end pt-4 ${inputAnimation} ${fadeInClass}`}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition hover:scale-105 duration-300`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>


        </div>

        <div className="mt-12 px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Recent Visitor Records
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Visitor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider hidden md:table-cell">
                      Entry Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider hidden sm:table-cell">
                      Exit Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider hidden lg:table-cell">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...visitorRecords]
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 5)
                    .map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-indigo-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => navigate(`/admin/request/${record.id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {record.photoPreview ? (
                              <div className="flex-shrink-0 h-12 w-12">
                                <img
                                  className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                                  src={record.photoPreview}
                                  alt={record.name}
                                />
                              </div>
                            ) : (
                              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                <svg className="h-6 w-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{record.name}</div>
                              <div className="text-sm text-gray-500">
                                {record.vehicle ? (
                                  <span className="inline-flex items-center">
                                    <svg className="mr-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {record.vehicle.substring(0, 20)}{record.vehicle.length > 20 ? '...' : ''}
                                  </span>
                                ) : 'No vehicle'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          <div className="flex items-center">
                            <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDate(record.entryTime)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {record.exitTime ? (
                            <div className="flex items-center">
                              <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDate(record.exitTime)}
                            </div>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">Not Exited</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(record.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate hidden lg:table-cell">
                          <div className="flex items-center">
                            <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            {record.reason.substring(0, 40)}{record.reason.length > 40 ? '...' : ''}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {visitorRecords.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No visitor requests yet</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Submit your first visitor request using the form above to get started.
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create First Request
                </button>
              </div>
            )}
          </div>

          {visitorRecords.length > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
              >
                View all records
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VisitorForm;