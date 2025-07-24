
// import React, { useEffect, useState } from "react";
// import { Mail, Phone, ArrowRight, MapPin, Clock } from "lucide-react";
// import logo from '../../assets/logoWhite.webp';
// import {
//   FaLinkedinIn,
//   FaFacebookF,
//   FaInstagram
// } from "react-icons/fa";

// const Footer = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     setVisible(true);
//   }, []);

//   return (
//     <footer
//       className={`bg-[#0a192f] text-gray-300 py-8 md:py-12 px-4 sm:px-6 lg:px-20 transition-all duration-700 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//         }`}
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* Logo & About - No changes needed */}
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-2">
//             <a href="/">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-10 w-auto rounded-lg shadow-md"
//                 style={{ borderRadius: '12px' }}
//               />
//             </a>
//           </div>
//           <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
//             We craft cutting-edge digital experiences that blend innovative technology
//             with elegant design.
//           </p>
//           <div className="flex flex-col gap-2">
//             <div className="flex items-start gap-2 text-gray-400 text-xs md:text-sm">
//               <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
//               <span>Karvenagar , Pune , 411052</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
//               <Phone className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
//               <span>+91 8485834885</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
//               <Mail className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
//               <span>oddcreatives15@gmail.com</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
//               <Clock className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
//               <span>Mon-Fri: 9AM - 6PM</span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links - Fixed URLs */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4 flex items-center gap-2">
//             <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
//             Quick Links
//           </h3>
//           <nav className="flex flex-col gap-2">
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <span className="opacity-70 group-hover:opacity-100">👥</span>
//               <span>About Us</span>
//             </a>
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <span className="opacity-70 group-hover:opacity-100">🛠️</span>
//               <span>Services</span>
//             </a>
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <span className="opacity-70 group-hover:opacity-100">✍️</span>
//               <span>Blog</span>
//             </a>
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <span className="opacity-70 group-hover:opacity-100">📞</span>
//               <span>Contact</span>
//             </a>
//           </nav>
//         </div>

//         {/* Services - Fixed URLs and added Mobile Apps */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4 flex items-center gap-2">
//             <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
//             Our Services
//           </h3>
//           <nav className="flex flex-col gap-2">
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//               <span>Web Development</span>
//             </a>

//             {/* Added Mobile Apps service */}


//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//               <span>UI/UX Design</span>
//             </a>
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//               <span>Cloud Solutions</span>
//             </a>
//             <a
//               href="https://oddcreatives.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
//             >
//               <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//               <span>AI & ML</span>
//             </a>
//           </nav>
//         </div>

//         {/* Social Links & Newsletter - No changes needed */}
//         <div className="flex flex-col gap-4">
//           <div>
//             <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4">Connect</h3>
//             <div className="flex gap-2 md:gap-3 text-gray-400 text-base md:text-lg flex-wrap">
//               <a
//                 href="https://www.linkedin.com/company/odd-creatives-management/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-blue-400 transition-all duration-300"
//                 aria-label="LinkedIn"
//               >
//                 <FaLinkedinIn />
//               </a>
//               <a
//                 href="https://www.facebook.com/profile.php?id=100091967402768&mibextid=LQQJ4d"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-blue-600 transition-all duration-300"
//                 aria-label="Facebook"
//               >
//                 <FaFacebookF />
//               </a>
//               <a
//                 href="https://www.instagram.com/odd_creatives/?igsh=bDdldWJvc3Vsamhr&utm_source=qr#"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-pink-500 transition-all duration-300"
//                 aria-label="Instagram"
//               >
//                 <FaInstagram />
//               </a>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-3">Newsletter</h3>
//             <p className="text-xs md:text-sm text-gray-400 mb-2">
//               Get the latest updates
//             </p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-indigo-500 w-full"
//               />
//               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-r-lg transition-colors duration-300">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-2 md:mt-4 border-t border-gray-800 pt-4 md:pt-6 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-500">
//         <div>
//           © {new Date().getFullYear()} Odd Creatives. All Rights Reserved
//         </div>
//         <div className="flex gap-2 md:gap-4 mt-2 sm:mt-0">
//           <a
//             href="https://oddcreatives.in/privacy"
//             className="hover:text-gray-300 transition-colors"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Privacy
//           </a>
//           <a
//             href="https://oddcreatives.in/terms"
//             className="hover:text-gray-300 transition-colors"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Terms
//           </a>
//           <a
//             href="https://oddcreatives.in/cookies"
//             className="hover:text-gray-300 transition-colors"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Cookies
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;









import React, { useEffect, useState } from "react";
import { Mail, Phone, ArrowRight, MapPin, Clock } from "lucide-react";
import logo from '../../assets/logoWhite.webp';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const navigate = useNavigate();

  return (
    <footer
      className={`bg-[#0a192f] text-gray-300 py-8 md:py-12 px-4 sm:px-6 lg:px-20 transition-all duration-700 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link to="/"> {/* Changed to Link */}
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto rounded-lg shadow-md"
                style={{ borderRadius: '12px' }}
              />
            </Link>
          </div>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            We craft cutting-edge digital experiences that blend innovative technology
            with elegant design.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 text-gray-400 text-xs md:text-sm">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <span>Karvenagar , Pune , 411052</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              <span>+91 8485834885</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              <span>oddcreatives15@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              <span>Mon-Fri: 9AM - 6PM</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
            Quick Links
          </h3>
          <nav className="flex flex-col gap-2">
            <Link
              to="/aboutus" // Changed to internal route
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <span className="opacity-70 group-hover:opacity-100">👥</span>
              <span>About Us</span>
            </Link>
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <span className="opacity-70 group-hover:opacity-100">🛠️</span>
              <span>Services</span>
            </a>
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <span className="opacity-70 group-hover:opacity-100">✍️</span>
              <span>Blog</span>
            </a>
            <Link
              to="/contactus" // Changed to internal route
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <span className="opacity-70 group-hover:opacity-100">📞</span>
              <span>Contact</span>
            </Link>
          </nav>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
            Our Services
          </h3>
          <nav className="flex flex-col gap-2">
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Web Development</span>
            </a>
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>UI/UX Design</span>
            </a>
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Cloud Solutions</span>
            </a>
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>AI & ML</span>
            </a>
          </nav>
        </div>

        {/* Social Links & Newsletter */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4">Connect</h3>
            <div className="flex gap-2 md:gap-3 text-gray-400 text-base md:text-lg flex-wrap">
              <a
                href="https://www.linkedin.com/company/odd-creatives-management/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-blue-400 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100091967402768&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-blue-600 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/odd_creatives/?igsh=bDdldWJvc3Vsamhr&utm_source=qr#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-pink-500 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-3">Newsletter</h3>
            <p className="text-xs md:text-sm text-gray-400 mb-2">
              Get the latest updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 md:mt-4 border-t border-gray-800 pt-4 md:pt-6 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} Odd Creatives. All Rights Reserved
        </div>
        <div className="flex gap-2 md:gap-4 mt-2 sm:mt-0">
          <a
            href="https://oddcreatives.in/privacy"
            className="hover:text-gray-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>
          <a
            href="https://oddcreatives.in/terms"
            className="hover:text-gray-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
          <a
            href="https://oddcreatives.in/cookies"
            className="hover:text-gray-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;