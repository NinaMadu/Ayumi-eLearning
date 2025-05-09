import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPhone, FaEnvelope, FaFacebookF, FaTiktok, FaInstagram, FaYoutube, FaQuestionCircle, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {

  const { currentUser } = useSelector((state) => state.user);
  // console.log("footer " + currentUser.isInstructor);

  
  return (
    <footer className="py-8 mt-4 text-gray-300 bg-blue-950">
      <div className="container px-4 mx-auto ">
        
        {/* Centered content */}
        <div className="grid justify-center gap-8 px-12 text-center grid-cols md:grid-cols-3 md:gap-12 ">
          
          {/* Quick Links */}
          <div>
            <h4 className="flex-col mb-3 text-xl font-semibold text-justify ">Quick Links</h4>
            <ul className="text-justify space-y-2flex-col">
              {
                currentUser?.isInstructor == "true" ? (
                 null
                ) : (
                    // <li><a href="/teachers" className="transition hover:text-white">Teachers</a></li> 
                    <li>
                    <Link to="/teachers" className="transition hover:text-white">
                      Teachers
                    </Link>
                  </li>
                    
                )

              }
               {
                currentUser?.isInstructor == "true" ? (
                  
                  // <li><a href="/instructor/create-course" className="transition hover:text-white">Courses</a></li> 
                  <li>
                      <Link to="/instructor/create-course" className="transition hover:text-white">
                        Courses
                      </Link>
                    </li>

                ) : (
                    // <li><a href="/courses" className="transition hover:text-white">Courses</a></li>
                  <li>
                    <Link to="/courses" className="transition hover:text-white">
                      Courses
                    </Link>
                  </li>

                )

              }
              
              <li><a href="#blogs" className="transition hover:text-white">Blogs</a></li>
            </ul>
          </div>
          
          {/* Support & Services */}
          <div >
            <h4 className="flex-col mb-3 text-xl font-semibold text-justify">Support & Services</h4>
            <ul className="flex-col space-y-2 text-justify">
              <li >
                <a href="#faq" className="transition hover:text-white">
                  <FaQuestionCircle className="inline-block mr-2" /> FAQ
                </a>
              </li>
              <li>
                <a href="#help-center" className="transition hover:text-white">
                  <FaInfoCircle className="inline-block mr-2" /> Help Centre
                </a>
              </li>
              <li>
                <a href="#privacy-policy" className="transition hover:text-white">
                  <FaShieldAlt className="inline-block mr-2" /> Privacy Policy & Terms
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className='flex-col text-justify'>
            <h4 className="mb-3 text-xl font-semibold ">Contact Us</h4>
            <p className="mb-2">
              <FaPhone className="inline-block mr-2" /> <a href="https://api.whatsapp.com/send?phone=819092862645&text&app=facebook" className="transition hover:text-white">81 90-9286-2645</a>
            </p>
            <p className="mb-2">
              <FaEnvelope className="inline-block mr-2" /> <a href="mailto:ayumisljp@gmail.com" className="transition hover:text-white">ayumisljp@gmail.com</a>
            </p>
          </div>
          
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-8 space-x-6 text-2xl">
          <a href="https://www.facebook.com/Ayumi.JLI" className="transition hover:text-gray-400"><FaFacebookF /></a>
          <a href="https://www.tiktok.com/@ayumisensei1?fbclid=IwY2xjawJH0SZleHRuA2FlbQIxMAABHWdJ1OV_wIr38voEIRr_TZQWze34AlY8ZkX6eYBSzdgRPWhvaaU7uhSplw_aem_KcYWq5-RO1Lyzl3Ch_V-Rw" className="transition hover:text-gray-400"><FaTiktok /></a>
          <a href="https://www.instagram.com/ayumisljp/?fbclid=IwY2xjawJH0atleHRuA2FlbQIxMAABHd115NvbD_fqEO0yP4ocJ9f_HdY3TvWrwJoKg1JFjph0duTj99ec87KX8g_aem_YLoGt6P8wUIMnUypeC0njw#" className="transition hover:text-gray-400"><FaInstagram /></a>
          <a href="https://www.youtube.com/@ayumisenseisljp" className="transition hover:text-gray-400"><FaYoutube /></a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-sm text-center text-gray-400">
          <p>© 2024 Ayumi Japanese Language Institute. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
