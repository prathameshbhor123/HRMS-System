
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaChartLine, FaShieldAlt, FaComments, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Features data with neon blue accent colors
    const features = [
        {
            icon: <FaHandshake className="text-3xl text-[#00d4ff]" />,
            title: "Fair Resolution",
            description: "Ensuring impartial and just solutions to all concerns"
        },
        {
            icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
            title: "Real-time Tracking",
            description: "Monitor your complaint status anytime, anywhere"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-[#0062ff]" />,
            title: "Confidentiality",
            description: "Your identity and concerns are kept completely private"
        },
        {
            icon: <FaComments className="text-3xl text-[#00f2fe]" />,
            title: "24/7 Support",
            description: "Our team is always ready to assist you"
        }
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section with Animated Background */}
            <div className="relative min-h-screen flex items-center justify-center bg-[#0a192f] overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-[url('https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png')] bg-cover bg-center opacity-20"
                    style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                />

                {/* Animated Gradient Overlay - Neon Blue */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0062ff]/70 to-[#00d4ff]/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-20 w-40 h-40 bg-[#00d4ff] rounded-full mix-blend-screen opacity-10 blur-xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-20 right-20 w-60 h-60 bg-[#0062ff] rounded-full mix-blend-screen opacity-10 blur-xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Hero Content */}
                <motion.div
                    className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
                        variants={itemVariants}
                    >
                        Welcome to <span className="text-[#00f2fe]">Grievance Redressal</span> System
                    </motion.h1>

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Your trusted platform for efficient complaint management and resolution
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        variants={itemVariants}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
                        >
                            Report a Grievance <FaArrowRight />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20"
                        >
                            Track Complaint Status
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Our System?</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            We provide a comprehensive solution for all your grievance management needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-[#e6f1ff]">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-20 px-6 bg-[#13294B]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Simple steps to get your concerns addressed
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline - Neon Blue Gradient */}
                        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#00d4ff] to-[#0062ff] -ml-0.5"></div>

                        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                            {[
                                {
                                    step: "01",
                                    title: "Submit Your Grievance",
                                    description: "Fill out our simple form with details of your concern"
                                },
                                {
                                    step: "02",
                                    title: "Receive Acknowledgement",
                                    description: "Get immediate confirmation with a tracking number"
                                },
                                {
                                    step: "03",
                                    title: "Review Process",
                                    description: "Our team carefully examines your submission"
                                },
                                {
                                    step: "04",
                                    title: "Resolution",
                                    description: "Receive a fair and timely resolution to your concern"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="mb-4">
                                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0062ff] text-white font-bold text-lg">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-[#e6f1ff]">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section - Neon Blue Gradient */}
            <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to address your concerns?
                        </h2>
                        <p className="text-xl text-[#e6f1ff] mb-8">
                            Join thousands who have found fair resolutions through our system
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
                        >
                            Get Started Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;





// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaHandshake, FaChartLine, FaShieldAlt, FaComments, FaArrowRight } from 'react-icons/fa';

// const Home = () => {
//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.3,
//                 delayChildren: 0.2
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut"
//             }
//         }
//     };

//     // Features data
//     const features = [
//         {
//             icon: <FaHandshake className="text-3xl text-blue-400" />,
//             title: "Fair Resolution",
//             description: "Ensuring impartial and just solutions to all concerns"
//         },
//         {
//             icon: <FaChartLine className="text-3xl text-blue-400" />,
//             title: "Real-time Tracking",
//             description: "Monitor your complaint status anytime, anywhere"
//         },
//         {
//             icon: <FaShieldAlt className="text-3xl text-blue-400" />,
//             title: "Confidentiality",
//             description: "Your identity and concerns are kept completely private"
//         },
//         {
//             icon: <FaComments className="text-3xl text-blue-400" />,
//             title: "24/7 Support",
//             description: "Our team is always ready to assist you"
//         }
//     ];

//     return (
//         <div className="relative overflow-hidden">
//             {/* Hero Section with Animated Background */}
//             <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
//                 {/* Background Image with Overlay */}
//                 <div
//                     className="absolute inset-0 bg-[url('https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png')] bg-cover bg-center opacity-40"
//                     style={{
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat"
//                     }}
//                 />

//                 {/* Animated Gradient Overlay */}
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1.5 }}
//                 />

//                 {/* Floating Elements */}
//                 <motion.div
//                     className="absolute top-20 left-20 w-40 h-40 bg-blue-600 rounded-full mix-blend-screen opacity-10 blur-xl"
//                     animate={{
//                         x: [0, 30, 0],
//                         y: [0, 40, 0],
//                         scale: [1, 1.1, 1]
//                     }}
//                     transition={{
//                         duration: 15,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                 />

//                 <motion.div
//                     className="absolute bottom-20 right-20 w-60 h-60 bg-blue-700 rounded-full mix-blend-screen opacity-10 blur-xl"
//                     animate={{
//                         x: [0, -40, 0],
//                         y: [0, -30, 0],
//                         scale: [1, 1.2, 1]
//                     }}
//                     transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                 />

//                 {/* Hero Content */}
//                 <motion.div
//                     className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto"
//                     initial="hidden"
//                     animate="visible"
//                     variants={containerVariants}
//                 >
//                     <motion.h1
//                         className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
//                         variants={itemVariants}
//                     >
//                         Welcome to <span className="text-blue-300">Grievance Redressal</span> System
//                     </motion.h1>

//                     <motion.p
//                         className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200 drop-shadow-lg max-w-3xl mx-auto"
//                         variants={itemVariants}
//                     >
//                         Your trusted platform for efficient complaint management and resolution
//                     </motion.p>

//                     <motion.div
//                         className="flex flex-col sm:flex-row justify-center gap-4"
//                         variants={itemVariants}
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
//                         >
//                             Report a Grievance <FaArrowRight />
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20"
//                         >
//                             Track Complaint Status
//                         </motion.button>
//                     </motion.div>
//                 </motion.div>
//             </div>

//             {/* Features Section */}
//             <div className="py-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900">
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Our System?</h2>
//                         <p className="text-xl text-blue-100 max-w-3xl mx-auto">
//                             We provide a comprehensive solution for all your grievance management needs
//                         </p>
//                     </motion.div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="bg-blue-800/30 p-8 rounded-xl border border-blue-700/50 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2"
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                             >
//                                 <div className="mb-4">{feature.icon}</div>
//                                 <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
//                                 <p className="text-blue-100">{feature.description}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* How It Works Section */}
//             <div className="py-20 px-6 bg-blue-900">
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
//                         <p className="text-xl text-blue-100 max-w-3xl mx-auto">
//                             Simple steps to get your concerns addressed
//                         </p>
//                     </motion.div>

//                     <div className="relative">
//                         {/* Timeline */}
//                         <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-300 -ml-0.5"></div>

//                         <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
//                             {[
//                                 {
//                                     step: "01",
//                                     title: "Submit Your Grievance",
//                                     description: "Fill out our simple form with details of your concern"
//                                 },
//                                 {
//                                     step: "02",
//                                     title: "Receive Acknowledgement",
//                                     description: "Get immediate confirmation with a tracking number"
//                                 },
//                                 {
//                                     step: "03",
//                                     title: "Review Process",
//                                     description: "Our team carefully examines your submission"
//                                 },
//                                 {
//                                     step: "04",
//                                     title: "Resolution",
//                                     description: "Receive a fair and timely resolution to your concern"
//                                 }
//                             ].map((item, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
//                                     initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                                     viewport={{ once: true }}
//                                 >
//                                     <div className="mb-4">
//                                         <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-lg">
//                                             {item.step}
//                                         </span>
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//                                     <p className="text-blue-100">{item.description}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CTA Section */}
//             <div className="py-20 px-6 bg-gradient-to-r from-blue-700 to-blue-600">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
//                             Ready to address your concerns?
//                         </h2>
//                         <p className="text-xl text-blue-50 mb-8">
//                             Join thousands who have found fair resolutions through our system
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-4 bg-white text-blue-800 hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
//                         >
//                             Get Started Now
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;