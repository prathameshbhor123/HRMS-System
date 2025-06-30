
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logoWhite.webp';

// Storage Service implementation
const StorageService = {
  TOKEN: "token",
  USER: "user",

  saveToken(token) {
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.setItem(this.TOKEN, token);
  },

  saveUser(user) {
    window.localStorage.removeItem(this.USER);
    window.localStorage.setItem(this.USER, JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem(this.TOKEN);
  },

  getUser() {
    const user = localStorage.getItem(this.USER);
    return user ? JSON.parse(user) : null;
  },

  getUserRole() {
    const user = this.getUser();
    return user ? user.role : null;
  },

  isAdminLoggedIn() {
    if (this.getToken() === null) return false;
    const role = this.getUserRole();
    return role === "ADMIN";
  },

  isEmployeeLoggedIn() {
    if (this.getToken() === null) return false;
    const role = this.getUserRole();
    return role === "EMPLOYEE";
  },

  getUserId() {
    const user = this.getUser();
    return user ? user.id : null;
  },

  hasToken() {
    return this.getToken() !== null;
  },

  signout() {
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.removeItem(this.USER);
  }
};

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminLoggedIn(StorageService.isAdminLoggedIn());
    setIsEmployeeLoggedIn(StorageService.isEmployeeLoggedIn());
  }, []);

  const logout = () => {
    StorageService.signout();
    setIsAdminLoggedIn(false);
    setIsEmployeeLoggedIn(false);
    localStorage.removeItem('welcomePopupShown');
    navigate('/loginpage');
  };

  const guestLinks = [
    { name: 'Home', path: '/home' },
    { name: 'AboutUs', path: '/aboutus' },
    { name: 'ContactUs', path: '/contactus' },
    { name: 'Login', path: '/loginpage' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admindashboard' },
    { name: 'Assign Task', path: '/posttask' },
    { name: 'HRMS', path: '/hrmsadmin' },
    { name: 'Register', path: '/signup' },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/employeedashboard' },
    { name: 'HRMS', path: '/hrmsemployee' }
  ];

  const renderLinks = () => {
    if (isAdminLoggedIn) return adminLinks;
    if (isEmployeeLoggedIn) return employeeLinks;
    return guestLinks;
  };

  return (

    <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white text-black">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto rounded-lg shadow-md"
              style={{ borderRadius: '12px' }}
            />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
          {renderLinks().map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
            >
              {link.name}
              <span className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 bg-blue-600 transition-all duration-300 ${window.location.pathname === link.path ? 'w-4/5' : 'w-0 group-hover:w-4/5'}`}></span>
            </Link>
          ))}
          {(isAdminLoggedIn || isEmployeeLoggedIn) && (
            <button
              onClick={logout}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm lg:text-base shadow hover:bg-blue-700 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderLinks().map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${window.location.pathname === link.path ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 hover:bg-gray-50 relative`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                {window.location.pathname === link.path && (
                  <span className="absolute left-3 bottom-1 h-0.5 bg-blue-600 w-4/5"></span>
                )}
              </Link>
            ))}
            {(isAdminLoggedIn || isEmployeeLoggedIn) && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>


    // <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white text-black f">
    //   <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
    //     <motion.div
    //       initial={{ opacity: 0, x: -50 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="flex-shrink-0"
    //     >
    //       <Link to="/">
    //         <img
    //           src={logo}
    //           alt="Logo"
    //           className="h-10 w-auto rounded-lg shadow-md"
    //           style={{ borderRadius: '12px' }}
    //         />
    //       </Link>
    //     </motion.div>

    //     {/* Desktop Nav */}
    //     <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
    //       {renderLinks().map((link) => (
    //         <Link
    //           key={link.name}
    //           to={link.path}
    //           className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
    //         >
    //           {link.name}
    //         </Link>
    //       ))}
    //       {(isAdminLoggedIn || isEmployeeLoggedIn) && (
    //         <button
    //           onClick={logout}
    //           className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm lg:text-base shadow hover:bg-blue-700 transition-all duration-300"
    //         >
    //           Logout
    //         </button>
    //       )}
    //     </nav>

    //     {/* Mobile Menu Button */}
    //     <div className="md:hidden flex items-center">
    //       <button
    //         onClick={() => setIsOpen(!isOpen)}
    //         className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
    //       >
    //         {isOpen ? (
    //           <X size={24} className="text-gray-700" />
    //         ) : (
    //           <Menu size={24} className="text-gray-700" />
    //         )}
    //       </button>
    //     </div>
    //   </div>

    //   {/* Mobile Nav */}
    //   {isOpen && (
    //     <motion.div
    //       initial={{ opacity: 0, y: -20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       exit={{ opacity: 0, y: -20 }}
    //       transition={{ duration: 0.2 }}
    //       className="md:hidden bg-white shadow-lg"
    //     >
    //       <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
    //         {renderLinks().map((link) => (
    //           <Link
    //             key={link.name}
    //             to={link.path}
    //             className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    //             onClick={() => setIsOpen(false)}
    //           >
    //             {link.name}
    //           </Link>
    //         ))}
    //         {(isAdminLoggedIn || isEmployeeLoggedIn) && (
    //           <button
    //             onClick={() => {
    //               logout();
    //               setIsOpen(false);
    //             }}
    //             className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
    //           >
    //             Logout
    //           </button>
    //         )}
    //       </div>
    //     </motion.div>
    //   )}
    // </header>
  );
};

export default Navbar;