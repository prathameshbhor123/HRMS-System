import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUs = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        addhar: '',
        phone: '',
        subject: '',
        query: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setSendStatus(null);

        try {
            const response = await emailjs.send(
                'service_724wzv7',
                'template_nlwc6ay',
                form,
                's5-WDs-fb8SgwI_nh'
            );

            console.log('SUCCESS!', response.status, response.text);
            setSendStatus({ success: true, message: 'Message sent successfully!' });
            setForm({
                name: '',
                email: '',
                addhar: '',
                phone: '',
                subject: '',
                query: ''
            });
        } catch (error) {
            console.log('FAILED...', error);
            setSendStatus({ success: false, message: 'Failed to send message. Please try again.' });
        } finally {
            setIsSending(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const cardHover = {
        scale: 1.02,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    };

    return (
        <>
            <style>
                {`
                /* Scrollbar hiding styles */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                /* Better mobile tap targets */
                input, textarea, button {
                    font-size: 16px;
                }

                /* Custom focus styles */
                .custom-focus:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.3);
                }
                `}
            </style>

            <section className={`bg-gradient-to-tr from-blue-50 to-blue-100 pt-15 text-gray-800 min-h-screen flex items-center transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container mx-auto px-4 max-w-6xl py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col lg:flex-row gap-6 rounded-2xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm"
                    >
                        {/* Contact Form Section */}
                        <motion.div
                            whileHover={cardHover}
                            className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto max-h-[90vh] scrollbar-hide"
                        >
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl sm:text-3xl font-bold mb-6 font-sans text-gray-800"
                            >
                                Contact Us
                                <div className="w-16 h-1 bg-[#00AEEF] mt-2 rounded-full"></div>
                            </motion.h2>

                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div className="space-y-4" variants={containerVariants}>
                                    <motion.div className="relative" variants={itemVariants}>
                                        <label htmlFor="name" className="block text-gray-600 mb-1 font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md custom-focus"
                                            required
                                            placeholder="Your name"
                                        />
                                    </motion.div>

                                    <motion.div className="relative" variants={itemVariants}>
                                        <label htmlFor="email" className="block text-gray-600 mb-1 font-medium">Email Id</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md custom-focus"
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </motion.div>

                                    <motion.div className="relative" variants={itemVariants}>
                                        <label htmlFor="addhar" className="block text-gray-600 mb-1 font-medium">Aadhar No</label>
                                        <input
                                            type="text"
                                            id="addhar"
                                            name="addhar"
                                            value={form.addhar}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md custom-focus"
                                            placeholder="XXXX-XXXX-XXXX"
                                        />
                                    </motion.div>
                                </motion.div>

                                <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2" variants={itemVariants}>
                                    <div className="relative">
                                        <label htmlFor="phone" className="block text-gray-600 mb-1 font-medium">Mobile Number</label>
                                        <input
                                            type="tel"
                                            inputMode="tel"
                                            pattern="[0-9]*"
                                            id="phone"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md custom-focus"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="subject" className="block text-gray-600 mb-1 font-medium">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md custom-focus"
                                            placeholder="Subject of your query"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div className="relative" variants={itemVariants}>
                                    <label htmlFor="query" className="block text-gray-600 mb-1 font-medium">Add your Query</label>
                                    <textarea
                                        id="query"
                                        name="query"
                                        value={form.query}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 sm:py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md custom-focus"
                                        placeholder="Type your message here..."
                                    />
                                </motion.div>

                                <motion.div
                                    className="flex flex-col gap-3 pt-2 sm:flex-row"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        type="submit"
                                        disabled={isSending}
                                        className="px-6 py-3 sm:py-2 bg-gradient-to-r from-[#00AEEF] to-[#0085FF] hover:from-[#0085FF] hover:to-[#0066CC] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isSending ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => setForm({
                                            name: '',
                                            email: '',
                                            addhar: '',
                                            phone: '',
                                            subject: '',
                                            query: ''
                                        })}
                                        className="px-6 py-3 sm:py-2 border-2 border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-300 hover:shadow-lg font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Clear Form
                                    </motion.button>
                                </motion.div>

                                <AnimatePresence>
                                    {sendStatus && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            transition={{ type: "spring" }}
                                            className={`mt-4 p-3 rounded-lg text-center transform transition-all duration-500 ${sendStatus.success
                                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                                : 'bg-red-100 text-red-700 border border-red-300'
                                                }`}
                                        >
                                            {sendStatus.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.form>
                        </motion.div>

                        {/* Contact Details Section */}
                        <motion.div
                            whileHover={cardHover}
                            className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-200 p-4 sm:p-6 relative overflow-hidden overflow-y-auto max-h-[90vh] scrollbar-hide"
                        >
                            {/* Decorative elements */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-200 opacity-20"></div>
                            <div className="absolute -left-20 w-60 h-60 rounded-full bg-blue-100 opacity-20"></div>

                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl sm:text-3xl font-bold mb-6 font-sans text-gray-800 relative z-10"
                            >
                                Our Information
                                <div className="w-16 h-1 bg-[#00AEEF] mt-2 rounded-full"></div>
                            </motion.h2>

                            <motion.div
                                className="space-y-5 relative z-10"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div
                                    className="flex items-start"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="bg-gradient-to-r from-[#00AEEF] to-[#0085FF] p-2 rounded-lg mr-3 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#00AEEF] font-medium mb-1">Registered Office</p>
                                        <p className="text-gray-700">
                                            Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat
                                            Lane, Girgaon, Mumbai - 400004 Maharashtra, India
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

                                <motion.div
                                    className="flex items-start"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="bg-gradient-to-r from-[#00AEEF] to-[#0085FF] p-2 rounded-lg mr-3 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#00AEEF] font-medium mb-1">Works</p>
                                        <p className="text-gray-700">
                                            18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

                                <motion.div
                                    className="grid grid-cols-1 gap-5 lg:grid-cols-2"
                                    variants={itemVariants}
                                >
                                    <motion.div
                                        className="flex items-start"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="bg-gradient-to-r from-[#00AEEF] to-[#0085FF] p-2 rounded-lg mr-3 shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[#00AEEF] font-medium mb-1">Local Inquiry</p>
                                            <a
                                                href="tel:+919912567282"
                                                className="text-gray-700 hover:text-[#00AEEF] transition-colors duration-300 block"
                                            >
                                                +91 9912567282
                                            </a>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-start"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="bg-gradient-to-r from-[#00AEEF] to-[#0085FF] p-2 rounded-lg mr-3 shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[#00AEEF] font-medium mb-1">Global Inquiry</p>
                                            <a
                                                href="tel:+15693977856"
                                                className="text-gray-700 hover:text-[#00AEEF] transition-colors duration-300 block"
                                            >
                                                +1 569 3977856
                                            </a>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

                                <motion.div
                                    className="flex items-start"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="bg-gradient-to-r from-[#00AEEF] to-[#0085FF] p-2 rounded-lg mr-3 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#00AEEF] font-medium mb-1">Email Address</p>
                                        <a
                                            href="mailto:support@gmail.com"
                                            className="text-gray-700 hover:text-[#00AEEF] transition-colors duration-300"
                                        >
                                            support@gmail.com
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Social Media Links */}
                                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>

                                <motion.div
                                    className="flex items-start"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="bg-gradient-to-r from-[#00AEEF] to-[#0085FF] p-2 rounded-lg mr-3 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#00AEEF] font-medium mb-1">Connect With Us</p>
                                        <div className="flex space-x-4 mt-2">
                                            <a
                                                href="https://www.facebook.com/oddtech"
                                                className="relative group text-gray-700 hover:text-[#1877F2] transition-all duration-500"
                                            >
                                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-50 blur-sm group-hover:animate-pulse transition-all duration-300"></div>
                                                <svg
                                                    className="w-6 h-6 relative transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                                </svg>
                                            </a>

                                            <a
                                                href="#"
                                                className="text-gray-700 hover:text-[#1DA1F2] transition-all duration-300 group"
                                            >
                                                <svg
                                                    className="w-6 h-6 group-hover:animate-bounce"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>

                                            <a
                                                href="https://www.instagram.com/odd_creatives/"
                                                className="text-gray-700 group transition-all duration-500"
                                            >
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    <svg
                                                        className="w-6 h-6 relative group-hover:rotate-[15deg] transition-transform duration-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </a>

                                            <a
                                                href="#"
                                                className="text-gray-700 hover:text-gray-900 transition-all duration-300 group"
                                            >
                                                <div className="relative">
                                                    <div className="absolute -inset-0.5 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                                                    <svg
                                                        className="w-6 h-6 relative transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(36,41,46,0.4)]"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;