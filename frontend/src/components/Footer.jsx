import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaQuestionCircle, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 py-8 mt-4">
      <div className="container mx-auto px-4 ">
        
        {/* Centered content */}
        <div className="text-center  grid grid-cols justify-center md:grid-cols-3 gap-8 md:gap-12 px-12 ">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-3 flex-col text-justify ">Quick Links</h4>
            <ul className="space-y-2flex-col text-justify">
              <li><a href="#teachers" className="hover:text-white transition">Teachers</a></li>
              <li><a href="#courses" className="hover:text-white transition">Courses</a></li>
              <li><a href="#blogs" className="hover:text-white transition">Blogs</a></li>
            </ul>
          </div>
          
          {/* Support & Services */}
          <div >
            <h4 className="text-xl font-semibold mb-3 flex-col text-justify">Support & Services</h4>
            <ul className="space-y-2 flex-col text-justify">
              <li >
                <a href="#faq" className="hover:text-white transition">
                  <FaQuestionCircle className="inline-block mr-2" /> FAQ
                </a>
              </li>
              <li>
                <a href="#help-center" className="hover:text-white transition">
                  <FaInfoCircle className="inline-block mr-2" /> Help Centre
                </a>
              </li>
              <li>
                <a href="#privacy-policy" className="hover:text-white transition">
                  <FaShieldAlt className="inline-block mr-2" /> Privacy Policy & Terms
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className='flex-col text-justify'>
            <h4 className="text-xl font-semibold mb-3 ">Contact Us</h4>
            <p className="mb-2">
              <FaPhone className="inline-block mr-2" /> <a href="tel:+94771342563" className="hover:text-white transition">0771342563</a>
            </p>
            <p className="mb-2">
              <FaEnvelope className="inline-block mr-2" /> <a href="mailto:ayumiinstitute@gmail.com" className="hover:text-white transition">ayumiinstitute@gmail.com</a>
            </p>
          </div>
          
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-8 text-2xl">
          <a href="#facebook" className="hover:text-gray-400 transition"><FaFacebookF /></a>
          <a href="#linkedin" className="hover:text-gray-400 transition"><FaLinkedinIn /></a>
          <a href="#twitter" className="hover:text-gray-400 transition"><FaTwitter /></a>
          <a href="#youtube" className="hover:text-gray-400 transition"><FaYoutube /></a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>© 2024 Ayumi Japanese Language Institute. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
