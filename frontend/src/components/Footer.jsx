// src/components/Footer.js
import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaQuestionCircle, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          
          <div className="w-1/3 text-xl">
            <h4 className="text-2xl font-semibold mb-2">Quick Links</h4>
            <ul>
              <li className="mb-1"><a href="#teachers">Teachers</a></li>
              <li className="mb-1"><a href="#courses">Courses</a></li>
              <li className="mb-1"><a href="#blogs">Blogs</a></li>
            </ul>
          </div>
          
         
          <div className="h-full w-0.5 bg-white opacity-50 mx-4"></div>

      
          <div className="w-1/3 text-xl">
            <h4 className="text-2xl font-semibold mb-2">Support & Services</h4>
            <ul>
              <li className="mb-1"><a href="#faq"><FaQuestionCircle className="inline-block mr-2" />FAQ</a></li>
              <li className="mb-1"><a href="#help-center"><FaInfoCircle className="inline-block mr-2" />Help Centre</a></li>
              <li className="mb-1"><a href="#privacy-policy"><FaShieldAlt className="inline-block mr-2" />Privacy Policy & Terms</a></li>
            </ul>
          </div>

      
          <div className="h-full w-0.5 bg-white opacity-50 mx-4"></div>

         
          <div className="w-1/3 text-xl">
            <h4 className="text-2xl font-semibold mb-2">Contact Us</h4>
            <p className="mb-1">
              <FaPhone className="inline-block mr-2" /> <a href="tel:+94771342563">0771342563</a>
            </p>
            <p className="mb-1">
              <FaEnvelope className="inline-block mr-2" /> <a href="mailto:ayumiinstitute@gmail.com">ayumiinstitute@gmail.com</a>
            </p>
            
          </div>
          <div className="flex space-x-4 mt-2 text-4xl" >
              <a href="#facebook" className="hover:text-gray-400"><FaFacebookF /></a>
              <a href="#linkedin" className="hover:text-gray-400"><FaLinkedinIn /></a>
              <a href="#twitter" className="hover:text-gray-400"><FaTwitter /></a>
              <a href="#youtube" className="hover:text-gray-400"><FaYoutube /></a>
            </div>
        </div>
        <div className="text-center mt-8">
          <p>© 2024 Ayumi Japanese Language Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
