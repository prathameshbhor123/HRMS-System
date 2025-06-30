// import React, { useEffect, useState } from "react";
// import { Mail, Phone, ArrowRight } from "lucide-react";
// import {
//   FaLinkedinIn,
//   FaTwitter,
//   FaFacebookF,
// } from "react-icons/fa";

// const Footer = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     setVisible(true);
//   }, []);

//   return (
//     <footer
//       className={`bg-gray-800 text-gray-300 py-8 px-6 sm:px-20 transition-all duration-700 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//         }`}
//     >
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-0">
//         {/* Logo & About */}
//         <div className="flex flex-col gap-4 sm:w-1/3">
//           <h1 className="text-3xl font-extrabold tracking-widest text-white">
//             oddTech
//           </h1>
//           <p className="text-sm text-gray-400">
//             Innovating tech solutions with creativity and precision.
//           </p>
//           <div className="flex items-center gap-3 text-gray-400 text-sm mt-2">
//             <Phone className="w-5 h-5 text-gray-400" />
//             <span>+1 (234) 567-890</span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-400 text-sm">
//             <Mail className="w-5 h-5 text-gray-400" />
//             <span>contact@oddtech.com</span>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <nav className="sm:w-1/3 flex flex-col gap-3">
//           <h3 className="text-white font-semibold mb-2">Quick Links</h3>
//           {["About Us", "Services", "Blog", "Contact", "Privacy Policy"].map(
//             (link) => (
//               <a
//                 key={link}
//                 href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                 className="text-gray-400 hover:text-white transition-colors duration-300"
//               >
//                 {link}
//               </a>
//             )
//           )}
//         </nav>

//         {/* Social Links */}
//         <div className="sm:w-1/3 flex flex-col gap-6">
//           <div>
//             <h3 className="text-white font-semibold mb-2">Follow Us</h3>
//             <div className="flex gap-5 text-gray-400 text-lg">
//               <a
//                 href="https://linkedin.com/company/oddtech"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition-colors duration-300"
//                 aria-label="LinkedIn"
//               >
//                 <FaLinkedinIn />
//               </a>
//               <a
//                 href="https://twitter.com/oddtech"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition-colors duration-300"
//                 aria-label="Twitter"
//               >
//                 <FaTwitter />
//               </a>
//               <a
//                 href="https://facebook.com/oddtech"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition-colors duration-300"
//                 aria-label="Facebook"
//               >
//                 <FaFacebookF />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
//         © {new Date().getFullYear()} oddTech. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useEffect, useState } from "react";
import { Mail, Phone, ArrowRight, MapPin, Clock } from "lucide-react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGithub
} from "react-icons/fa";
import { SiTailwindcss, SiReact } from "react-icons/si";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <footer
      className={`bg-[#0a192f] text-gray-300 py-8 md:py-12 px-4 sm:px-6 lg:px-20 transition-all duration-700 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg">
              <SiReact className="text-white text-xl md:text-2xl" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest text-white">
              oddTech
            </h1>
          </div>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            We craft cutting-edge digital experiences that blend innovative technology
            with elegant design.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 text-gray-400 text-xs md:text-sm">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <span>123 Innovation Blvd, Tech City</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              <span>+1 (234) 567-890</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              <span>hello@oddtech.com</span>
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
            {[
              { name: "About Us", icon: "👥" },
              { name: "Services", icon: "🛠️" },
              { name: "Case Studies", icon: "📂" },
              { name: "Blog", icon: "✍️" },
              { name: "Contact", icon: "📞" }
            ].map((link) => (
              <a
                key={link.name}
                href={`#${link.name.toLowerCase().replace(/\s+/g, "")}`}
                className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="opacity-70 group-hover:opacity-100">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
            Our Services
          </h3>
          <nav className="flex flex-col gap-2">
            {[
              "Web Development",
              "Mobile Apps",
              "UI/UX Design",
              "Cloud Solutions",
              "AI & ML"
            ].map((service) => (
              <a
                key={service}
                href={`#${service.toLowerCase().replace(/\s+/g, "")}`}
                className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>{service}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Social Links & Newsletter */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-4">Connect</h3>
            <div className="flex gap-2 md:gap-3 text-gray-400 text-base md:text-lg flex-wrap">
              {[
                { icon: <FaLinkedinIn />, label: "LinkedIn", color: "hover:text-blue-400" },
                { icon: <FaTwitter />, label: "Twitter", color: "hover:text-sky-400" },
                { icon: <FaFacebookF />, label: "Facebook", color: "hover:text-blue-600" },
                { icon: <FaInstagram />, label: "Instagram", color: "hover:text-pink-500" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={`https://${social.label.toLowerCase()}.com/oddtech`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
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

          <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
            <span>Built with</span>
            <SiReact className="text-blue-400 text-sm md:text-base" />
            <SiTailwindcss className="text-cyan-400 text-sm md:text-base" />
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 border-t border-gray-800 pt-4 md:pt-6 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} oddTech. All rights reserved.
        </div>
        <div className="flex gap-2 md:gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;