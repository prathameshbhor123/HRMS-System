// // import React, { useState, useEffect } from 'react';
// // import logo from '../../assets/logoWhite.webp';
// // import axios from 'axios';
// // import {
// //     FaBuilding,
// //     FaIndustry,
// //     FaPhoneAlt,
// //     FaEnvelope,
// //     FaMapMarkerAlt,
// //     FaGlobe,
// //     FaClock,
// //     FaUsers,
// //     FaChartLine,
// //     FaInfoCircle,
// //     FaArrowLeft
// // } from 'react-icons/fa';
// // import { GiCommercialAirplane } from 'react-icons/gi';
// // import { RiCustomerService2Fill } from 'react-icons/ri';

// // const AboutUs = () => {
// //     const [contactInfo, setContactInfo] = useState({
// //         registeredOffice: '',
// //         works: '',
// //         localInquiry: '',
// //         globalInquiry: '',
// //         email: ''
// //     });
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const [showContact, setShowContact] = useState(false); // Changed to show contact details when true

// //     // Official color palette
// //     const colors = {
// //         primary: '#4F46E5',    // Indigo-600
// //         secondary: '#10B981',  // Emerald-500
// //         accent: '#F59E0B',     // Amber-500
// //         dark: '#1F2937',       // Gray-800
// //         light: '#F3F4F6'       // Gray-100
// //     };

// //     useEffect(() => {
// //         const fetchContactInfo = async () => {
// //             try {
// //                 const response = await axios.get('https://your-api-url.com/contact-info');
// //                 setContactInfo({
// //                     registeredOffice: response.data.registeredOffice || "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
// //                     works: response.data.works || "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
// //                     localInquiry: response.data.localInquiry || "+91 9912567282",
// //                     globalInquiry: response.data.globalInquiry || "+1 569 3977856",
// //                     email: response.data.email || "support@gmail.com"
// //                 });
// //             } catch (err) {
// //                 setError('Failed to load contact information. Using default data.');
// //                 setContactInfo({
// //                     registeredOffice: "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
// //                     works: "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
// //                     localInquiry: "+91 9912567282",
// //                     globalInquiry: "+1 569 3977856",
// //                     email: "support@gmail.com"
// //                 });
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchContactInfo();
// //     }, []);

// //     if (loading) {
// //         return (
// //             <div className="flex items-center justify-center h-screen" style={{ backgroundColor: colors.light }}>
// //                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
// //             </div>
// //         );
// //     }

// //     const toggleView = () => {
// //         setShowContact(!showContact);
// //     };

// //     const CompanyStats = () => (
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 mt-20">
// //             {[
// //                 { icon: <FaGlobe className="text-xl" />, title: "Global Presence", value: "15+", subtitle: "Countries", color: colors.primary },
// //                 { icon: <FaUsers className="text-xl" />, title: "Happy Clients", value: "2500+", subtitle: "Worldwide", color: colors.secondary },
// //                 { icon: <FaClock className="text-xl" />, title: "Years of", value: "12+", subtitle: "Experience", color: colors.accent },
// //                 { icon: <FaChartLine className="text-xl" />, title: "Projects", value: "500+", subtitle: "Completed", color: colors.primary }
// //             ].map((stat, index) => (
// //                 <div
// //                     key={index}
// //                     className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
// //                 >
// //                     <div
// //                         className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
// //                         style={{
// //                             background: `linear-gradient(135deg, ${stat.color}20 0%, ${colors.primary}10 100%)`
// //                         }}
// //                     ></div>
// //                     <div
// //                         className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-30 transition-all duration-700"
// //                         style={{ backgroundColor: stat.color }}
// //                     ></div>

// //                     <div className="flex items-center relative z-10 ">
// //                         <div
// //                             className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
// //                             style={{
// //                                 backgroundColor: `${stat.color}20`,
// //                                 boxShadow: `0 4px 6px ${stat.color}20`
// //                             }}
// //                         >
// //                             {stat.icon}
// //                         </div>
// //                         <div>
// //                             <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors">{stat.title}</p>
// //                             <p className="text-2xl font-bold group-hover:text-indigo-700 transition-colors" style={{ color: colors.dark }}>{stat.value}</p>
// //                             <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">{stat.subtitle}</p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>
// //     );

// //     const AboutSection = () => (
// //         <div className="bg-white rounded-3xl mt-5 shadow-2xl overflow-hidden p-8 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
// //             <div className="flex flex-col lg:flex-row items-center">
// //                 <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
// //                     <h2 className="text-3xl font-bold mb-6 group-hover:text-indigo-700 transition-colors" style={{ color: colors.dark }}>
// //                         About Our Company
// //                     </h2>
// //                     <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors">
// //                         We are a global leader in innovative solutions, dedicated to delivering exceptional services to our clients worldwide.
// //                         With over a decade of experience, we've established ourselves as a trusted partner in the industry.
// //                     </p>
// //                     <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
// //                         Our team of experts works tirelessly to ensure that every project meets the highest standards of quality and efficiency.
// //                         We pride ourselves on our customer-centric approach and commitment to excellence.
// //                     </p>

// //                     <div className="flex items-center bg-blue-50 p-4 rounded-xl border-l-4 border-indigo-500 transition-all duration-500 hover:bg-blue-100 hover:translate-x-2 hover:shadow-md group">
// //                         <RiCustomerService2Fill className="text-3xl mr-4 transform group-hover:scale-125 transition-transform" style={{ color: colors.primary }} />
// //                         <div>
// //                             <h4 className="font-bold group-hover:text-indigo-800 transition-colors" style={{ color: colors.dark }}>24/7 Customer Support</h4>
// //                             <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Our dedicated team is always ready to assist you with any inquiries.</p>
// //                         </div>
// //                     </div>

// //                     {/* Contact Details Button */}
// //                     <div className="mt-8 text-center lg:text-left">
// //                         <button
// //                             onClick={toggleView}
// //                             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
// //                             style={{
// //                                 backgroundColor: colors.primary,
// //                                 boxShadow: `0 4px 6px ${colors.primary}50`
// //                             }}
// //                         >
// //                             <FaInfoCircle className="mr-2 transform group-hover:rotate-180 transition-transform" />
// //                             View Contact Details
// //                         </button>
// //                     </div>
// //                 </div>

// //                 <div className="w-full lg:w-1/2 relative">
// //                     <div className="relative h-64 lg:h-96 w-full rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-700">
// //                         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-1000">
// //                             {/* Floating animated circles */}
// //                             <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-white opacity-20 animate-float1 group-hover:opacity-30"></div>
// //                             <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white opacity-20 animate-float2 group-hover:opacity-30"></div>
// //                             <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-white opacity-20 animate-float3 group-hover:opacity-30"></div>

// //                             {/* Logo with enhanced animations */}
// //                             <div className="relative z-10">
// //                                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white bg-opacity-20 flex items-center justify-center animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-700">
// //                                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white bg-opacity-30 flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
// //                                         <img
// //                                             src={logo}
// //                                             alt="Logo"
// //                                             className="w-42 h-auto rounded-xl shadow-md transform group-hover:scale-110 transition-transform duration-700"
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             <CompanyStats />
// //         </div>
// //     );

// //     const ContactSection = () => (
// //         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 ">
// //             <div className="flex flex-col lg:flex-row">
// //                 {/* Map Section */}
// //                 <div className="w-full m-5  lg:w-2/5 lg:mt-40 h-64 lg:h-96 relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none">
// //                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
// //                     <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-100 opacity-20 animate-float4 group-hover:opacity-30"></div>
// //                     <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-100 opacity-20 animate-float5 group-hover:opacity-30"></div>

// //                     <div className="relative w-full h-full">
// //                         <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}10` }}>
// //                             <FaMapMarkerAlt className="text-4xl animate-bounce group-hover:animate-ping" style={{ color: colors.primary }} />
// //                         </div>
// //                         <iframe
// //                             title="Company Location"
// //                             width="100%"
// //                             height="100%"
// //                             id="gmap_canvas"
// //                             src="https://maps.google.com/maps?q=digicorp&t=&z=13&ie=UTF8&iwloc=&output=embed"
// //                             frameBorder="0"
// //                             scrolling="no"
// //                             marginHeight="0"
// //                             marginWidth="0"
// //                             className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000"
// //                         ></iframe>
// //                     </div>
// //                 </div>

// //                 {/* Contact Details Section */}
// //                 <div className="w-full lg:w-3/5 p-6 md:p-8">
// //                     {/* Back to About Button */}
// //                     <div className="mb-6 ">
// //                         <button
// //                             onClick={toggleView}
// //                             className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 group"
// //                         >
// //                             <FaArrowLeft className="mr-2  transform group-hover:-translate-x-1 transition-transform" />
// //                             Back to About Us
// //                         </button>
// //                     </div>

// //                     <h2 className="text-3xl font-bold mb-6 group-hover:text-indigo-700 transition-colors" style={{ color: colors.dark }}>
// //                         Contact Details
// //                     </h2>

// //                     {/* Registered Office */}
// //                     <div className="mb-6 animate-fadeIn group">
// //                         <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
// //                             <div
// //                                 className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
// //                                 style={{
// //                                     backgroundColor: `${colors.primary}20`,
// //                                     boxShadow: `0 4px 6px ${colors.primary}20`
// //                                 }}
// //                             >
// //                                 <FaBuilding className="text-xl" style={{ color: colors.primary }} />
// //                             </div>
// //                             <div>
// //                                 <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Registered Office</p>
// //                                 <p className="text-lg text-gray-800 animate-pulse-once group-hover:text-indigo-800">
// //                                     {contactInfo.registeredOffice}
// //                                 </p>
// //                             </div>
// //                         </div>
// //                         <hr className="border-gray-200 my-4 group-hover:border-indigo-200 transition-colors" />
// //                     </div>

// //                     {/* Works */}
// //                     <div className="mb-6 animate-fadeIn delay-100 group">
// //                         <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
// //                             <div
// //                                 className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
// //                                 style={{
// //                                     backgroundColor: `${colors.secondary}20`,
// //                                     boxShadow: `0 4px 6px ${colors.secondary}20`
// //                                 }}
// //                             >
// //                                 <FaIndustry className="text-xl" style={{ color: colors.secondary }} />
// //                             </div>
// //                             <div>
// //                                 <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Works</p>
// //                                 <p className="text-lg text-gray-800 animate-pulse-once group-hover:text-emerald-800">
// //                                     {contactInfo.works}
// //                                 </p>
// //                             </div>
// //                         </div>
// //                         <hr className="border-gray-200 my-4 group-hover:border-emerald-200 transition-colors" />
// //                     </div>

// //                     {/* Phone Numbers */}
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //                         {/* Local Inquiry */}
// //                         <div className="animate-fadeIn delay-200 group">
// //                             <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
// //                                 <div
// //                                     className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
// //                                     style={{
// //                                         backgroundColor: `${colors.accent}20`,
// //                                         boxShadow: `0 4px 6px ${colors.accent}20`
// //                                     }}
// //                                 >
// //                                     <FaPhoneAlt className="text-xl" style={{ color: colors.accent }} />
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Local Inquiry</p>
// //                                     <a
// //                                         href={`tel:${contactInfo.localInquiry}`}
// //                                         className="text-lg text-gray-800 hover:text-amber-600 transition-all duration-300 transform hover:-translate-y-1 block"
// //                                     >
// //                                         {contactInfo.localInquiry}
// //                                     </a>
// //                                 </div>
// //                             </div>
// //                             <hr className="border-gray-200 my-4 group-hover:border-amber-200 transition-colors" />
// //                         </div>

// //                         {/* Global Inquiry */}
// //                         <div className="animate-fadeIn delay-300 group">
// //                             <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
// //                                 <div
// //                                     className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"
// //                                     style={{
// //                                         backgroundColor: `${colors.primary}20`,
// //                                         boxShadow: `0 4px 6px ${colors.primary}20`
// //                                     }}
// //                                 >
// //                                     <GiCommercialAirplane className="text-xl" style={{ color: colors.primary }} />
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Global Inquiry</p>
// //                                     <a
// //                                         href={`tel:${contactInfo.globalInquiry}`}
// //                                         className="text-lg text-gray-800 hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1 block"
// //                                     >
// //                                         {contactInfo.globalInquiry}
// //                                     </a>
// //                                 </div>
// //                             </div>
// //                             <hr className="border-gray-200 my-4 group-hover:border-indigo-200 transition-colors" />
// //                         </div>
// //                     </div>

// //                     {/* Email */}
// //                     <div className="animate-fadeIn delay-400 group">
// //                         <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
// //                             <div
// //                                 className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
// //                                 style={{
// //                                     backgroundColor: `${colors.secondary}20`,
// //                                     boxShadow: `0 4px 6px ${colors.secondary}20`
// //                                 }}
// //                             >
// //                                 <FaEnvelope className="text-xl" style={{ color: colors.secondary }} />
// //                             </div>
// //                             <div>
// //                                 <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Email Address</p>
// //                                 <a
// //                                     href={`mailto:${contactInfo.email}`}
// //                                     className="text-lg text-gray-800 hover:text-emerald-600 transition-all duration-300 transform hover:-translate-y-1 block"
// //                                 >
// //                                     {contactInfo.email}
// //                                 </a>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );

// //     return (
// //         <section className="bg-gradient-to-tr from-yellow-100 to-pink-100 min-h-screen py-12 px-4 font-sans relative overflow-hidden">
// //             {/* Enhanced animated background elements */}
// //             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
// //                 <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-100 opacity-10 animate-float6 group-hover:opacity-20 transition-opacity duration-1000"></div>
// //                 <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-100 opacity-10 animate-float7 group-hover:opacity-20 transition-opacity duration-1000"></div>
// //                 <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-100 opacity-5 animate-float8 group-hover:opacity-10 transition-opacity duration-1000"></div>
// //             </div>

// //             <div className="max-w-6xl mx-auto relative z-10">
// //                 {showContact ? <ContactSection /> : <AboutSection />}
// //             </div>

// //             {/* Enhanced Animation styles */}
// //             <style jsx>{`
// //                 @keyframes fadeIn {
// //                     from { opacity: 0; transform: translateY(20px) scale(0.95); }
// //                     to { opacity: 1; transform: translateY(0) scale(1); }
// //                 }

// //                 @keyframes pulseOnce {
// //                     0% { transform: scale(1); }
// //                     50% { transform: scale(1.03); }
// //                     100% { transform: scale(1); }
// //                 }

// //                 @keyframes float1 {
// //                     0% { transform: translate(0, 0) rotate(0deg) scale(1); }
// //                     50% { transform: translate(15px, 15px) rotate(10deg) scale(1.05); }
// //                     100% { transform: translate(0, 0) rotate(0deg) scale(1); }
// //                 }

// //                 @keyframes float2 {
// //                     0% { transform: translate(0, 0) rotate(0deg) scale(1); }
// //                     50% { transform: translate(-15px, -15px) rotate(-10deg) scale(0.95); }
// //                     100% { transform: translate(0, 0) rotate(0deg) scale(1); }
// //                 }

// //                 @keyframes float3 {
// //                     0% { transform: translate(0, 0) scale(1) rotate(0deg); }
// //                     50% { transform: translate(10px, -10px) scale(1.1) rotate(10deg); }
// //                     100% { transform: translate(0, 0) scale(1) rotate(0deg); }
// //                 }

// //                 @keyframes float4 {
// //                     0% { transform: translate(0, 0) scale(1); }
// //                     50% { transform: translate(25px, 15px) scale(1.1); }
// //                     100% { transform: translate(0, 0) scale(1); }
// //                 }

// //                 @keyframes float5 {
// //                     0% { transform: translate(0, 0) scale(1); }
// //                     50% { transform: translate(-20px, -20px) scale(0.9); }
// //                     100% { transform: translate(0, 0) scale(1); }
// //                 }

// //                 @keyframes float6 {
// //                     0% { transform: translate(0, 0) scale(1); }
// //                     50% { transform: translate(-60px, -40px) scale(1.1); }
// //                     100% { transform: translate(0, 0) scale(1); }
// //                 }

// //                 @keyframes float7 {
// //                     0% { transform: translate(0, 0) scale(1); }
// //                     50% { transform: translate(50px, 30px) scale(0.9); }
// //                     100% { transform: translate(0, 0) scale(1); }
// //                 }

// //                 @keyframes float8 {
// //                     0% { transform: translate(0, 0) scale(1); }
// //                     50% { transform: translate(40px, -40px) scale(1.05); }
// //                     100% { transform: translate(0, 0) scale(1); }
// //                 }

// //                 @keyframes pulse {
// //                     0% { transform: scale(0.95); opacity: 0.7; }
// //                     50% { transform: scale(1.05); opacity: 1; }
// //                     100% { transform: scale(0.95); opacity: 0.7; }
// //                 }

// //                 @keyframes ping {
// //                     0% { transform: scale(1); opacity: 1; }
// //                     75%, 100% { transform: scale(2); opacity: 0; }
// //                 }

// //                 .animate-fadeIn {
// //                     animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
// //                     opacity: 0;
// //                 }

// //                 .animate-fadeIn.delay-100 { animation-delay: 0.1s; }
// //                 .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
// //                 .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
// //                 .animate-fadeIn.delay-400 { animation-delay: 0.4s; }

// //                 .animate-pulse-once {
// //                     animation: pulseOnce 1.2s ease-in-out;
// //                 }

// //                 .animate-float1 {
// //                     animation: float1 8s ease-in-out infinite;
// //                 }

// //                 .animate-float2 {
// //                     animation: float2 10s ease-in-out infinite;
// //                 }

// //                 .animate-float3 {
// //                     animation: float3 9s ease-in-out infinite;
// //                 }

// //                 .animate-float4 {
// //                     animation: float4 11s ease-in-out infinite;
// //                 }

// //                 .animate-float5 {
// //                     animation: float5 13s ease-in-out infinite;
// //                 }

// //                 .animate-float6 {
// //                     animation: float6 17s ease-in-out infinite;
// //                 }

// //                 .animate-float7 {
// //                     animation: float7 20s ease-in-out infinite;
// //                 }

// //                 .animate-float8 {
// //                     animation: float8 22s ease-in-out infinite;
// //                 }

// //                 .animate-pulse {
// //                     animation: pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
// //                 }

// //                 .animate-ping {
// //                     animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
// //                 }
// //             `}</style>
// //         </section>
// //     );
// // };

// // export default AboutUs;



// import React, { useState, useEffect } from 'react';
// import logo from '../../assets/logoWhite.webp';
// import axios from 'axios';
// import {
//     FaBuilding,
//     FaIndustry,
//     FaPhoneAlt,
//     FaEnvelope,
//     FaMapMarkerAlt,
//     FaGlobe,
//     FaClock,
//     FaUsers,
//     FaChartLine,
//     FaInfoCircle,
//     FaArrowLeft
// } from 'react-icons/fa';
// import { GiCommercialAirplane } from 'react-icons/gi';
// import { RiCustomerService2Fill } from 'react-icons/ri';

// const AboutUs = () => {
//     const [contactInfo, setContactInfo] = useState({
//         registeredOffice: '',
//         works: '',
//         localInquiry: '',
//         globalInquiry: '',
//         email: ''
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [showContact, setShowContact] = useState(false); // Changed to show contact details when true

//     // Official color palette
//     const colors = {
//         primary: '#4F46E5',    // Indigo-600
//         secondary: '#10B981',  // Emerald-500
//         accent: '#F59E0B',     // Amber-500
//         dark: '#1F2937',       // Gray-800
//         light: '#F3F4F6'       // Gray-100
//     };

//     useEffect(() => {
//         const fetchContactInfo = async () => {
//             try {
//                 const response = await axios.get('https://your-api-url.com/contact-info');
//                 setContactInfo({
//                     registeredOffice: response.data.registeredOffice || "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
//                     works: response.data.works || "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
//                     localInquiry: response.data.localInquiry || "+91 9912567282",
//                     globalInquiry: response.data.globalInquiry || "+1 569 3977856",
//                     email: response.data.email || "support@gmail.com"
//                 });
//             } catch (err) {
//                 setError('Failed to load contact information. Using default data.');
//                 setContactInfo({
//                     registeredOffice: "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
//                     works: "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
//                     localInquiry: "+91 9912567282",
//                     globalInquiry: "+1 569 3977856",
//                     email: "support@gmail.com"
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchContactInfo();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen" style={{ backgroundColor: colors.light }}>
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
//             </div>
//         );
//     }

//     const toggleView = () => {
//         setShowContact(!showContact);
//     };

//     const CompanyStats = () => (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 ">
//             {[
//                 { icon: <FaGlobe className="text-xl" />, title: "Global Presence", value: "15+", subtitle: "Countries", color: colors.primary },
//                 { icon: <FaUsers className="text-xl" />, title: "Happy Clients", value: "2500+", subtitle: "Worldwide", color: colors.secondary },
//                 { icon: <FaClock className="text-xl" />, title: "Years of", value: "12+", subtitle: "Experience", color: colors.accent },
//                 { icon: <FaChartLine className="text-xl" />, title: "Projects", value: "500+", subtitle: "Completed", color: colors.primary }
//             ].map((stat, index) => (
//                 <div
//                     key={index}
//                     className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
//                 >
//                     <div
//                         className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                         style={{
//                             background: `linear-gradient(135deg, ${stat.color}20 0%, ${colors.primary}10 100%)`
//                         }}
//                     ></div>
//                     <div
//                         className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-30 transition-all duration-700"
//                         style={{ backgroundColor: stat.color }}
//                     ></div>

//                     <div className="flex items-center relative z-10 ">
//                         <div
//                             className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
//                             style={{
//                                 backgroundColor: `${stat.color}20`,
//                                 boxShadow: `0 4px 6px ${stat.color}20`
//                             }}
//                         >
//                             {stat.icon}
//                         </div>
//                         <div>
//                             <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors">{stat.title}</p>
//                             <p className="text-2xl font-bold group-hover:text-indigo-700 transition-colors" style={{ color: colors.dark }}>{stat.value}</p>
//                             <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">{stat.subtitle}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );

//     const AboutSection = () => (
//         <div className="bg-white rounded-3xl mt-5 shadow-2xl overflow-hidden p-8 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 mt-10">
//             <div className="flex flex-col lg:flex-row items-center">
//                 <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
//                     <h2 className="text-3xl font-bold mb-6 group-hover:text-indigo-700 transition-colors" style={{ color: colors.dark }}>
//                         About Our Company
//                     </h2>
//                     <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors">
//                         We are a global leader in innovative solutions, dedicated to delivering exceptional services to our clients worldwide.
//                         With over a decade of experience, we've established ourselves as a trusted partner in the industry.
//                     </p>
//                     <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
//                         Our team of experts works tirelessly to ensure that every project meets the highest standards of quality and efficiency.
//                         We pride ourselves on our customer-centric approach and commitment to excellence.
//                     </p>

//                     <div className="flex items-center bg-blue-50 p-4 rounded-xl border-l-4 border-indigo-500 transition-all duration-500 hover:bg-blue-100 hover:translate-x-2 hover:shadow-md group">
//                         <RiCustomerService2Fill className="text-3xl mr-4 transform group-hover:scale-125 transition-transform" style={{ color: colors.primary }} />
//                         <div>
//                             <h4 className="font-bold group-hover:text-indigo-800 transition-colors" style={{ color: colors.dark }}>24/7 Customer Support</h4>
//                             <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Our dedicated team is always ready to assist you with any inquiries.</p>
//                         </div>
//                     </div>

//                     {/* Contact Details Button */}
//                     <div className="mt-8 text-center lg:text-left">
//                         <button
//                             onClick={toggleView}
//                             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
//                             style={{
//                                 backgroundColor: colors.primary,
//                                 boxShadow: `0 4px 6px ${colors.primary}50`
//                             }}
//                         >
//                             <FaInfoCircle className="mr-2 transform group-hover:rotate-180 transition-transform" />
//                             View Contact Details
//                         </button>
//                     </div>
//                 </div>

//                 <div className="w-full lg:w-1/2 relative">
//                     <div className="relative h-64 lg:h-96 w-full rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-700">
//                         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-1000">
//                             {/* Floating animated circles */}
//                             <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-white opacity-20 animate-float1 group-hover:opacity-30"></div>
//                             <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white opacity-20 animate-float2 group-hover:opacity-30"></div>
//                             <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-white opacity-20 animate-float3 group-hover:opacity-30"></div>

//                             {/* Logo with enhanced animations */}
//                             <div className="relative z-10">
//                                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white bg-opacity-20 flex items-center justify-center animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-700">
//                                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white bg-opacity-30 flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
//                                         <img
//                                             src={logo}
//                                             alt="Logo"
//                                             className="w-42 h-auto rounded-xl shadow-md transform group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <CompanyStats />
//         </div>
//     );

//     const ContactSection = () => (
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 mt-10">
//             <div className="flex flex-col lg:flex-row">
//                 {/* Map Section */}
//                 <div className="w-full m-5  lg:w-2/5 lg:mt-40 h-64 lg:h-96 relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none">
//                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
//                     <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-100 opacity-20 animate-float4 group-hover:opacity-30"></div>
//                     <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-100 opacity-20 animate-float5 group-hover:opacity-30"></div>

//                     <div className="relative w-full h-full">
//                         <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}10` }}>
//                             <FaMapMarkerAlt className="text-4xl animate-bounce group-hover:animate-ping" style={{ color: colors.primary }} />
//                         </div>
//                         <iframe
//                             title="Company Location"
//                             width="100%"
//                             height="100%"
//                             id="gmap_canvas"
//                             src="https://maps.google.com/maps?q=digicorp&t=&z=13&ie=UTF8&iwloc=&output=embed"
//                             frameBorder="0"
//                             scrolling="no"
//                             marginHeight="0"
//                             marginWidth="0"
//                             className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000"
//                         ></iframe>
//                     </div>
//                 </div>

//                 {/* Contact Details Section */}
//                 <div className="w-full lg:w-3/5 p-6 md:p-8">
//                     {/* Back to About Button */}
//                     <div className="mb-6 ">
//                         <button
//                             onClick={toggleView}
//                             className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 group"
//                         >
//                             <FaArrowLeft className="mr-2  transform group-hover:-translate-x-1 transition-transform" />
//                             Back to About Us
//                         </button>
//                     </div>

//                     <h2 className="text-3xl font-bold mb-6 group-hover:text-indigo-700 transition-colors" style={{ color: colors.dark }}>
//                         Contact Details
//                     </h2>

//                     {/* Registered Office */}
//                     <div className="mb-6 animate-fadeIn group">
//                         <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
//                             <div
//                                 className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
//                                 style={{
//                                     backgroundColor: `${colors.primary}20`,
//                                     boxShadow: `0 4px 6px ${colors.primary}20`
//                                 }}
//                             >
//                                 <FaBuilding className="text-xl" style={{ color: colors.primary }} />
//                             </div>
//                             <div>
//                                 <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Registered Office</p>
//                                 <p className="text-lg text-gray-800 animate-pulse-once group-hover:text-indigo-800">
//                                     {contactInfo.registeredOffice}
//                                 </p>
//                             </div>
//                         </div>
//                         <hr className="border-gray-200 my-4 group-hover:border-indigo-200 transition-colors" />
//                     </div>

//                     {/* Works */}
//                     <div className="mb-6 animate-fadeIn delay-100 group">
//                         <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
//                             <div
//                                 className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
//                                 style={{
//                                     backgroundColor: `${colors.secondary}20`,
//                                     boxShadow: `0 4px 6px ${colors.secondary}20`
//                                 }}
//                             >
//                                 <FaIndustry className="text-xl" style={{ color: colors.secondary }} />
//                             </div>
//                             <div>
//                                 <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Works</p>
//                                 <p className="text-lg text-gray-800 animate-pulse-once group-hover:text-emerald-800">
//                                     {contactInfo.works}
//                                 </p>
//                             </div>
//                         </div>
//                         <hr className="border-gray-200 my-4 group-hover:border-emerald-200 transition-colors" />
//                     </div>

//                     {/* Phone Numbers */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                         {/* Local Inquiry */}
//                         <div className="animate-fadeIn delay-200 group">
//                             <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
//                                 <div
//                                     className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
//                                     style={{
//                                         backgroundColor: `${colors.accent}20`,
//                                         boxShadow: `0 4px 6px ${colors.accent}20`
//                                     }}
//                                 >
//                                     <FaPhoneAlt className="text-xl" style={{ color: colors.accent }} />
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Local Inquiry</p>
//                                     <a
//                                         href={`tel:${contactInfo.localInquiry}`}
//                                         className="text-lg text-gray-800 hover:text-amber-600 transition-all duration-300 transform hover:-translate-y-1 block"
//                                     >
//                                         {contactInfo.localInquiry}
//                                     </a>
//                                 </div>
//                             </div>
//                             <hr className="border-gray-200 my-4 group-hover:border-amber-200 transition-colors" />
//                         </div>

//                         {/* Global Inquiry */}
//                         <div className="animate-fadeIn delay-300 group">
//                             <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
//                                 <div
//                                     className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"
//                                     style={{
//                                         backgroundColor: `${colors.primary}20`,
//                                         boxShadow: `0 4px 6px ${colors.primary}20`
//                                     }}
//                                 >
//                                     <GiCommercialAirplane className="text-xl" style={{ color: colors.primary }} />
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Global Inquiry</p>
//                                     <a
//                                         href={`tel:${contactInfo.globalInquiry}`}
//                                         className="text-lg text-gray-800 hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1 block"
//                                     >
//                                         {contactInfo.globalInquiry}
//                                     </a>
//                                 </div>
//                             </div>
//                             <hr className="border-gray-200 my-4 group-hover:border-indigo-200 transition-colors" />
//                         </div>
//                     </div>

//                     {/* Email */}
//                     <div className="animate-fadeIn delay-400 group">
//                         <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
//                             <div
//                                 className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
//                                 style={{
//                                     backgroundColor: `${colors.secondary}20`,
//                                     boxShadow: `0 4px 6px ${colors.secondary}20`
//                                 }}
//                             >
//                                 <FaEnvelope className="text-xl" style={{ color: colors.secondary }} />
//                             </div>
//                             <div>
//                                 <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Email Address</p>
//                                 <a
//                                     href={`mailto:${contactInfo.email}`}
//                                     className="text-lg text-gray-800 hover:text-emerald-600 transition-all duration-300 transform hover:-translate-y-1 block"
//                                 >
//                                     {contactInfo.email}
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <section className="bg-gradient-to-tr from-yellow-100 to-pink-100 min-h-screen py-12 px-4 font-sans relative overflow-hidden">
//             {/* Enhanced animated background elements */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//                 <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-100 opacity-10 animate-float6 group-hover:opacity-20 transition-opacity duration-1000"></div>
//                 <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-100 opacity-10 animate-float7 group-hover:opacity-20 transition-opacity duration-1000"></div>
//                 <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-100 opacity-5 animate-float8 group-hover:opacity-10 transition-opacity duration-1000"></div>
//             </div>

//             <div className="max-w-6xl mx-auto relative z-10">
//                 {showContact ? <ContactSection /> : <AboutSection />}
//             </div>

//             {/* Enhanced Animation styles */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(20px) scale(0.95); }
//                     to { opacity: 1; transform: translateY(0) scale(1); }
//                 }

//                 @keyframes pulseOnce {
//                     0% { transform: scale(1); }
//                     50% { transform: scale(1.03); }
//                     100% { transform: scale(1); }
//                 }

//                 @keyframes float1 {
//                     0% { transform: translate(0, 0) rotate(0deg) scale(1); }
//                     50% { transform: translate(15px, 15px) rotate(10deg) scale(1.05); }
//                     100% { transform: translate(0, 0) rotate(0deg) scale(1); }
//                 }

//                 @keyframes float2 {
//                     0% { transform: translate(0, 0) rotate(0deg) scale(1); }
//                     50% { transform: translate(-15px, -15px) rotate(-10deg) scale(0.95); }
//                     100% { transform: translate(0, 0) rotate(0deg) scale(1); }
//                 }

//                 @keyframes float3 {
//                     0% { transform: translate(0, 0) scale(1) rotate(0deg); }
//                     50% { transform: translate(10px, -10px) scale(1.1) rotate(10deg); }
//                     100% { transform: translate(0, 0) scale(1) rotate(0deg); }
//                 }

//                 @keyframes float4 {
//                     0% { transform: translate(0, 0) scale(1); }
//                     50% { transform: translate(25px, 15px) scale(1.1); }
//                     100% { transform: translate(0, 0) scale(1); }
//                 }

//                 @keyframes float5 {
//                     0% { transform: translate(0, 0) scale(1); }
//                     50% { transform: translate(-20px, -20px) scale(0.9); }
//                     100% { transform: translate(0, 0) scale(1); }
//                 }

//                 @keyframes float6 {
//                     0% { transform: translate(0, 0) scale(1); }
//                     50% { transform: translate(-60px, -40px) scale(1.1); }
//                     100% { transform: translate(0, 0) scale(1); }
//                 }

//                 @keyframes float7 {
//                     0% { transform: translate(0, 0) scale(1); }
//                     50% { transform: translate(50px, 30px) scale(0.9); }
//                     100% { transform: translate(0, 0) scale(1); }
//                 }

//                 @keyframes float8 {
//                     0% { transform: translate(0, 0) scale(1); }
//                     50% { transform: translate(40px, -40px) scale(1.05); }
//                     100% { transform: translate(0, 0) scale(1); }
//                 }

//                 @keyframes pulse {
//                     0% { transform: scale(0.95); opacity: 0.7; }
//                     50% { transform: scale(1.05); opacity: 1; }
//                     100% { transform: scale(0.95); opacity: 0.7; }
//                 }

//                 @keyframes ping {
//                     0% { transform: scale(1); opacity: 1; }
//                     75%, 100% { transform: scale(2); opacity: 0; }
//                 }

//                 .animate-fadeIn {
//                     animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
//                     opacity: 0;
//                 }

//                 .animate-fadeIn.delay-100 { animation-delay: 0.1s; }
//                 .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
//                 .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
//                 .animate-fadeIn.delay-400 { animation-delay: 0.4s; }

//                 .animate-pulse-once {
//                     animation: pulseOnce 1.2s ease-in-out;
//                 }

//                 .animate-float1 {
//                     animation: float1 8s ease-in-out infinite;
//                 }

//                 .animate-float2 {
//                     animation: float2 10s ease-in-out infinite;
//                 }

//                 .animate-float3 {
//                     animation: float3 9s ease-in-out infinite;
//                 }

//                 .animate-float4 {
//                     animation: float4 11s ease-in-out infinite;
//                 }

//                 .animate-float5 {
//                     animation: float5 13s ease-in-out infinite;
//                 }

//                 .animate-float6 {
//                     animation: float6 17s ease-in-out infinite;
//                 }

//                 .animate-float7 {
//                     animation: float7 20s ease-in-out infinite;
//                 }

//                 .animate-float8 {
//                     animation: float8 22s ease-in-out infinite;
//                 }

//                 .animate-pulse {
//                     animation: pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//                 }

//                 .animate-ping {
//                     animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
//                 }
//             `}</style>
//         </section>
//     );
// };

// export default AboutUs;



import React, { useState, useEffect } from 'react';
import logo from '../../assets/logoWhite.webp';
import axios from 'axios';
import {
    FaBuilding,
    FaIndustry,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGlobe,
    FaClock,
    FaUsers,
    FaChartLine,
    FaInfoCircle,
    FaArrowLeft
} from 'react-icons/fa';
import { GiCommercialAirplane } from 'react-icons/gi';
import { RiCustomerService2Fill } from 'react-icons/ri';

const AboutUs = () => {
    const [contactInfo, setContactInfo] = useState({
        registeredOffice: '',
        works: '',
        localInquiry: '',
        globalInquiry: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showContact, setShowContact] = useState(false); // Changed to show contact details when true

    // Official color palette updated with #00AEEF
    const colors = {
        primary: '#00AEEF',    // Updated to the requested blue
        secondary: '#10B981',  // Emerald-500
        accent: '#F59E0B',     // Amber-500
        dark: '#1F2937',       // Gray-800
        light: '#F3F4F6'       // Gray-100
    };

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await axios.get('https://your-api-url.com/contact-info');
                setContactInfo({
                    registeredOffice: response.data.registeredOffice || "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
                    works: response.data.works || "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
                    localInquiry: response.data.localInquiry || "+91 9912567282",
                    globalInquiry: response.data.globalInquiry || "+1 569 3977856",
                    email: response.data.email || "support@gmail.com"
                });
            } catch (err) {
                setError('Failed to load contact information. Using default data.');
                setContactInfo({
                    registeredOffice: "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
                    works: "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
                    localInquiry: "+91 9912567282",
                    globalInquiry: "+1 569 3977856",
                    email: "support@gmail.com"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen" style={{ backgroundColor: colors.light }}>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
            </div>
        );
    }

    const toggleView = () => {
        setShowContact(!showContact);
    };

    const CompanyStats = () => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {[
                { icon: <FaGlobe className="text-xl" />, title: "Global Presence", value: "15+", subtitle: "Countries", color: colors.primary },
                { icon: <FaUsers className="text-xl" />, title: "Happy Clients", value: "2500+", subtitle: "Worldwide", color: colors.secondary },
                { icon: <FaClock className="text-xl" />, title: "Years of", value: "12+", subtitle: "Experience", color: colors.accent },
                { icon: <FaChartLine className="text-xl" />, title: "Projects", value: "500+", subtitle: "Completed", color: colors.primary }
            ].map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `linear-gradient(135deg, ${stat.color}20 0%, ${colors.primary}10 100%)`
                        }}
                    ></div>
                    <div
                        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-30 transition-all duration-700"
                        style={{ backgroundColor: stat.color }}
                    ></div>

                    <div className="flex items-center relative z-10">
                        <div
                            className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                            style={{
                                backgroundColor: `${stat.color}20`,
                                boxShadow: `0 4px 6px ${stat.color}20`
                            }}
                        >
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors">{stat.title}</p>
                            <p className="text-2xl font-bold group-hover:text-blue-700 transition-colors" style={{ color: colors.dark }}>{stat.value}</p>
                            <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">{stat.subtitle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const AboutSection = () => (
        <div className="bg-white rounded-3xl mt-5 shadow-2xl overflow-hidden p-8 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 mt-10">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                    <h2 className="text-3xl font-bold mb-6 group-hover:text-blue-700 transition-colors" style={{ color: colors.dark }}>
                        About Our Company
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors">
                        We are a global leader in innovative solutions, dedicated to delivering exceptional services to our clients worldwide.
                        With over a decade of experience, we've established ourselves as a trusted partner in the industry.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
                        Our team of experts works tirelessly to ensure that every project meets the highest standards of quality and efficiency.
                        We pride ourselves on our customer-centric approach and commitment to excellence.
                    </p>

                    <div className="flex items-center bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 transition-all duration-500 hover:bg-blue-100 hover:translate-x-2 hover:shadow-md group">
                        <RiCustomerService2Fill className="text-3xl mr-4 transform group-hover:scale-125 transition-transform" style={{ color: colors.primary }} />
                        <div>
                            <h4 className="font-bold group-hover:text-blue-800 transition-colors" style={{ color: colors.dark }}>24/7 Customer Support</h4>
                            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Our dedicated team is always ready to assist you with any inquiries.</p>
                        </div>
                    </div>

                    {/* Contact Details Button */}
                    <div className="mt-8 text-center lg:text-left">
                        <button
                            onClick={toggleView}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                            style={{
                                backgroundColor: colors.primary,
                                boxShadow: `0 4px 6px ${colors.primary}50`
                            }}
                        >
                            <FaInfoCircle className="mr-2 transform group-hover:rotate-180 transition-transform" />
                            View Contact Details
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 relative">
                    <div className="relative h-64 lg:h-96 w-full rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-1000">
                            {/* Floating animated circles */}
                            <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-white opacity-20 animate-float1 group-hover:opacity-30"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white opacity-20 animate-float2 group-hover:opacity-30"></div>
                            <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-white opacity-20 animate-float3 group-hover:opacity-30"></div>

                            {/* Logo with enhanced animations */}
                            <div className="relative z-10">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white bg-opacity-20 flex items-center justify-center animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-700">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white bg-opacity-30 flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500">
                                        <img
                                            src={logo}
                                            alt="Logo"
                                            className="w-42 h-auto rounded-xl shadow-md transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CompanyStats />
        </div>
    );

    const ContactSection = () => (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 mt-10">
            <div className="flex flex-col lg:flex-row">
                {/* Map Section */}
                <div className="w-full m-5 lg:w-2/5 lg:mt-40 h-64 lg:h-96 relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100 opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-20 animate-float4 group-hover:opacity-30"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-100 opacity-20 animate-float5 group-hover:opacity-30"></div>

                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}10` }}>
                            <FaMapMarkerAlt className="text-4xl animate-bounce group-hover:animate-ping" style={{ color: colors.primary }} />
                        </div>
                        <iframe
                            title="Company Location"
                            width="100%"
                            height="100%"
                            id="gmap_canvas"
                            src="https://maps.google.com/maps?q=digicorp&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Details Section */}
                <div className="w-full lg:w-3/5 p-6 md:p-8">
                    {/* Back to About Button */}
                    <div className="mb-6">
                        <button
                            onClick={toggleView}
                            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 group"
                        >
                            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            Back to About Us
                        </button>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 group-hover:text-blue-700 transition-colors" style={{ color: colors.dark }}>
                        Contact Details
                    </h2>

                    {/* Registered Office */}
                    <div className="mb-6 animate-fadeIn group">
                        <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
                            <div
                                className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                                style={{
                                    backgroundColor: `${colors.primary}20`,
                                    boxShadow: `0 4px 6px ${colors.primary}20`
                                }}
                            >
                                <FaBuilding className="text-xl" style={{ color: colors.primary }} />
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Registered Office</p>
                                <p className="text-lg text-gray-800 animate-pulse-once group-hover:text-blue-800">
                                    {contactInfo.registeredOffice}
                                </p>
                            </div>
                        </div>
                        <hr className="border-gray-200 my-4 group-hover:border-blue-200 transition-colors" />
                    </div>

                    {/* Works */}
                    <div className="mb-6 animate-fadeIn delay-100 group">
                        <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
                            <div
                                className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                                style={{
                                    backgroundColor: `${colors.secondary}20`,
                                    boxShadow: `0 4px 6px ${colors.secondary}20`
                                }}
                            >
                                <FaIndustry className="text-xl" style={{ color: colors.secondary }} />
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Works</p>
                                <p className="text-lg text-gray-800 animate-pulse-once group-hover:text-emerald-800">
                                    {contactInfo.works}
                                </p>
                            </div>
                        </div>
                        <hr className="border-gray-200 my-4 group-hover:border-emerald-200 transition-colors" />
                    </div>

                    {/* Phone Numbers */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Local Inquiry */}
                        <div className="animate-fadeIn delay-200 group">
                            <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
                                <div
                                    className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                                    style={{
                                        backgroundColor: `${colors.accent}20`,
                                        boxShadow: `0 4px 6px ${colors.accent}20`
                                    }}
                                >
                                    <FaPhoneAlt className="text-xl" style={{ color: colors.accent }} />
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Local Inquiry</p>
                                    <a
                                        href={`tel:${contactInfo.localInquiry}`}
                                        className="text-lg text-gray-800 hover:text-amber-600 transition-all duration-300 transform hover:-translate-y-1 block"
                                    >
                                        {contactInfo.localInquiry}
                                    </a>
                                </div>
                            </div>
                            <hr className="border-gray-200 my-4 group-hover:border-amber-200 transition-colors" />
                        </div>

                        {/* Global Inquiry */}
                        <div className="animate-fadeIn delay-300 group">
                            <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
                                <div
                                    className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12"
                                    style={{
                                        backgroundColor: `${colors.primary}20`,
                                        boxShadow: `0 4px 6px ${colors.primary}20`
                                    }}
                                >
                                    <GiCommercialAirplane className="text-xl" style={{ color: colors.primary }} />
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Global Inquiry</p>
                                    <a
                                        href={`tel:${contactInfo.globalInquiry}`}
                                        className="text-lg text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 block"
                                    >
                                        {contactInfo.globalInquiry}
                                    </a>
                                </div>
                            </div>
                            <hr className="border-gray-200 my-4 group-hover:border-blue-200 transition-colors" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="animate-fadeIn delay-400 group">
                        <div className="flex items-start hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm">
                            <div
                                className="p-3 rounded-full mr-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                                style={{
                                    backgroundColor: `${colors.secondary}20`,
                                    boxShadow: `0 4px 6px ${colors.secondary}20`
                                }}
                            >
                                <FaEnvelope className="text-xl" style={{ color: colors.secondary }} />
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1 font-medium group-hover:text-gray-700">Email Address</p>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-lg text-gray-800 hover:text-emerald-600 transition-all duration-300 transform hover:-translate-y-1 block"
                                >
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-gradient-to-tr from-blue-100 to-blue-50 min-h-screen py-12 px-4 font-sans relative overflow-hidden">
            {/* Enhanced animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-10 animate-float6 group-hover:opacity-20 transition-opacity duration-1000"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-100 opacity-10 animate-float7 group-hover:opacity-20 transition-opacity duration-1000"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-100 opacity-5 animate-float8 group-hover:opacity-10 transition-opacity duration-1000"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {showContact ? <ContactSection /> : <AboutSection />}
            </div>

            {/* Enhanced Animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                @keyframes pulseOnce {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                    100% { transform: scale(1); }
                }
                
                @keyframes float1 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    50% { transform: translate(15px, 15px) rotate(10deg) scale(1.05); }
                    100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                }
                
                @keyframes float2 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    50% { transform: translate(-15px, -15px) rotate(-10deg) scale(0.95); }
                    100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                }
                
                @keyframes float3 {
                    0% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    50% { transform: translate(10px, -10px) scale(1.1) rotate(10deg); }
                    100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                
                @keyframes float4 {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(25px, 15px) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                
                @keyframes float5 {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, -20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                
                @keyframes float6 {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-60px, -40px) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                
                @keyframes float7 {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(50px, 30px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                
                @keyframes float8 {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(40px, -40px) scale(1.05); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                
                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 0.7; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(0.95); opacity: 0.7; }
                }
                
                @keyframes ping {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                    opacity: 0;
                }
                
                .animate-fadeIn.delay-100 { animation-delay: 0.1s; }
                .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
                .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
                .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
                
                .animate-pulse-once {
                    animation: pulseOnce 1.2s ease-in-out;
                }
                
                .animate-float1 {
                    animation: float1 8s ease-in-out infinite;
                }
                
                .animate-float2 {
                    animation: float2 10s ease-in-out infinite;
                }
                
                .animate-float3 {
                    animation: float3 9s ease-in-out infinite;
                }
                
                .animate-float4 {
                    animation: float4 11s ease-in-out infinite;
                }
                
                .animate-float5 {
                    animation: float5 13s ease-in-out infinite;
                }
                
                .animate-float6 {
                    animation: float6 17s ease-in-out infinite;
                }
                
                .animate-float7 {
                    animation: float7 20s ease-in-out infinite;
                }
                
                .animate-float8 {
                    animation: float8 22s ease-in-out infinite;
                }
                
                .animate-pulse {
                    animation: pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-ping {
                    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </section>
    );
};

export default AboutUs;