import React, { useEffect } from "react";
import Slider from "react-slick";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Add this import
import { Link } from "react-router-dom";
import UserLayout from "./UserLayout";
import Footer from "../components/Footer";
import Notices from "../components/Notices";

// Import images
import logo from "../assets/logo.png";
import Pic1 from "../assets/Pic7.jpeg";
import Pic2 from "../assets/Pic8.jpeg";
import Pic3 from "../assets/Pic9.jpeg";
import Pic4 from "../assets/Pic10.jpeg";
import Pic5 from "../assets/Pic11.jpeg";
import Pic6 from "../assets/Pic12.jpeg";

// Section component with scroll-triggered animation
const AnimatedSection = ({ children, className, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: delay, ease: "easeOut" }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
        transition: { duration: 0.5 }
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const UserHome = () => {
  // Slider settings with improved styling
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SliderArrow direction="next" />,
    prevArrow: <SliderArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    dotsClass: "slick-dots custom-dots",
    appendDots: dots => (
      <div>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-[#F61627] transition-colors duration-300"></div>
    ),
  };

  // Define the images array
  const images = [Pic1, Pic2, Pic3, Pic4, Pic5, Pic6];

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 pt-6 mx-auto">
          {/* Hero Section */}
          <AnimatedSection className="flex flex-col items-center justify-between gap-10 px-4 mb-16 lg:flex-row md:px-10 lg:px-16">
            {/* Text Content */}
            <div className="flex-1 max-w-2xl">
              <motion.h1 
                className="text-[#F61627] text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Ayumi Japanese <br />
                Language Institute
              </motion.h1>
              
              <motion.p 
                className="text-[#2B3090] text-lg md:text-xl font-medium mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                At Ayumi Japanese Language Institute, we are committed to providing quality, 
                affordable language programs. We guide our students through the process of 
                learning a new language in an easy-to-understand manner.
              </motion.p>
              
              {/* Buttons with hover effects */}
              <motion.div 
                className="flex flex-col gap-4 sm:flex-row sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/user/course-cards">
                  <motion.button
                    className="w-full px-8 py-3 font-semibold text-white transition-transform duration-300 shadow-lg sm:w-auto rounded-xl hover:shadow-xl"
                    style={{
                      background: "linear-gradient(to right, #DC7676, #C53B3B)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Our Courses
                  </motion.button>
                </Link>
                
                <Link to="/user/roadmap">
                  <motion.button
                    className="w-full px-8 py-3 font-semibold text-white transition-transform duration-300 shadow-lg sm:w-auto rounded-xl hover:shadow-xl"
                    style={{
                      background: "linear-gradient(to right, #2B3090, #8487BE)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Roadmap
                  </motion.button>
                </Link>
              </motion.div>
            </div>
            
            {/* Logo */}
            <motion.div 
              className="flex items-center justify-center flex-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#F61627]/20 to-[#2B3090]/20 rounded-full blur-xl opacity-70 animate-pulse"></div>
                <img
                  src={logo}
                  alt="Ayumi Japanese Language Institute Logo"
                  className="relative h-auto max-h-80 md:max-h-96 lg:max-h-[400px] object-contain w-full"
                />
              </div>
            </motion.div>
          </AnimatedSection>

          
          
          {/* Notices with scroll animation */}
          <AnimatedSection className="mb-12" delay={0.2}>
             

            
            <div className="overflow-hidden bg-white shadow-md rounded-xl">
              <Notices />
            </div>
            
          </AnimatedSection>
          
          {/* Image Gallery Section */}
          <AnimatedSection className="mb-16" delay={0.2}>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-[#2B3090]">Our Gallery</h2>
              <div className="w-20 h-1 bg-[#F61627] mx-auto mt-2"></div>
            </div>
            
            <div className="max-w-5xl px-4 py-6 mx-auto shadow-lg bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl">
              <Slider {...settings}>
                {images.map((src, index) => (
                  <div key={index} className="px-2 py-2">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden shadow-md rounded-xl h-80"
                    >
                      <img
                        src={src}
                        alt={`Gallery item ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                      />
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>
          </AnimatedSection>
          
          {/* CTA Section with scroll animation */}
          <AnimatedSection className="mb-16 bg-gradient-to-r from-[#2B3090]/10 to-[#F61627]/10 rounded-2xl p-10 text-center" delay={0.2}>
            <h2 className="text-3xl font-bold text-[#2B3090] mb-4">Ready to Start Your Japanese Learning Journey?</h2>
            <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-700">
              Join our community of language enthusiasts and embark on an exciting journey to master Japanese language and culture.
            </p>
            <Link to="/user/contact">
              <motion.button
                className="px-8 py-3 font-semibold text-white shadow-lg rounded-xl"
                style={{
                  background: "linear-gradient(to right, #F61627, #FF6B6B)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us Today
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
        {/* <Footer /> */}
      </div>
    </UserLayout>
  );
};

// Custom arrow component for slider
const SliderArrow = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute z-10 top-1/2 -translate-y-1/2 ${
        direction === "next" ? "right-2" : "left-2"
      } w-10 h-10 flex items-center justify-center bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-300 focus:outline-none`}
      aria-label={direction === "next" ? "Next slide" : "Previous slide"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2B3090"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        {direction === "next" ? (
          <polyline points="9 18 15 12 9 6"></polyline>
        ) : (
          <polyline points="15 18 9 12 15 6"></polyline>
        )}
      </svg>
    </button>
  );
};

export default UserHome;