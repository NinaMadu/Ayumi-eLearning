import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
// import Pic3 from '../assets/Pic3.jpeg';
import {MessageCircle } from "lucide-react";

import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';


export default function About() {

  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
        else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }

    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
     }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };

  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev); // Toggle visibility state
    }, 5000); // Repeat every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

   const buttonStyle = {
    padding: "12px 32px",
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#b91c1c", // Red-700
    backgroundColor: "#ffffff", // White
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    cursor: "pointer", // Manually set cursor to pointer
    transition: "all 0.3s ease",
    transform: isHovered ? "scale(1.1)" : isTapped ? "scale(0.95)" : "scale(1)",
  };


  return (
    <div style={{
      fontFamily: 'sans-serif',
      color: '#2d3748',
      backgroundColor: '#f9fafb'
    }}>

      
     <section
      ref={heroRef}
      style={{
        position: 'relative',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(https://img.freepik.com/free-photo/red-brush-ink-splatter-background_1409-1460.jpg?t=st=1742352274~exp=1742355874~hmac=007e9caea19fbfee19a69787e01be7c4f91f2ae7a9c88ee556c304400fb27681&w=996)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg, rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          padding: '1rem',
          textAlign: 'center',
          color: 'white',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Heading with Fade-In Animation */}
        <motion.h1
            style={{
            
            marginBottom: '1.5rem',
            
            fontSize: '4rem',
            fontWeight: 'bold',
              
              
           
            animation: isVisible ? 'fadeIn 1.5s ease-out' : 'none',
          }}
        >
          Unlock the Beauty of Japanese with Ayumi
        </motion.h1>

        {/* Subheading with Slide-Up Animation */}
        <motion.p
          style={{
            marginBottom: '2rem',
            marginTop: '2rem',
            fontSize: '1.25rem',
            animation: isVisible ? 'slideUp 1s ease-out 0.5s' : 'none',
            animationFillMode: 'both',
          }}
        >
          Your gateway to mastering Japanese with expert instructors and interactive learning!
        </motion.p>

        {/* Button with Hover Effect */}
        <button
          style={{
            padding: '0.75rem 2rem',
            color: 'white',
            backgroundColor: '#BF3131',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            animation: isVisible ? 'fadeIn 2s ease-out 1s' : 'none',
            animationFillMode: 'both',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          Start Learning Today
        </button>
      </div>

      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </section>

    {/* Mission & Vision */}
      <section style={{ maxWidth: '960px', margin: 'auto', padding: '4rem 1rem' }}>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>Our Mission & Vision</h2>
            <p style={{ color: '#718096' }}>
              At Ayumi Language Institute, we believe language is the bridge to culture. Our mission is to provide an
              immersive and effective learning experience for students worldwide.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/portrait-group-students-celebrating-their-graduation_23-2148201836.jpg?t=st=1742324614~exp=1742328214~hmac=3ed4b56ec3b5a314a4aced9603698ba3e13fc4c6d71b0b5d504706578ec69cb3&w=1380"
            alt="Mission"
            style={{ borderRadius: '0.5rem', boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)' }}
          />
        </div>
      </section>

      {/* Unique Features */}
      <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
        <h2 style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
          What Makes Us Unique
        </h2>
        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            maxWidth: '960px',
            margin: 'auto',
          }}
        >
          {[
            { icon: '🎓', title: 'Expert Instructors', description: 'Learn from native Japanese speakers with years of experience.' },
            { icon: '📹', title: 'Interactive Learning', description: 'Engage with video lessons, quizzes, and live classes.' },
            { icon: '⏱️', title: 'Flexible Learning', description: 'Learn at your own pace with on-demand content.' },
            { icon: '📜', title: 'Certification', description: 'Get certified upon course completion.' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                backgroundColor: '#f7fafc',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ display: 'block', fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</span>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>{item.title}</h3>
              <p style={{ color: '#718096' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

       {/* Who We Serve */}
      <section className="max-w-6xl px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Who We Serve</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { image: 'https://img.freepik.com/free-photo/young-thoughtful-man-black-shirt-with-optical-glasses-holds-notebook-puts-pen-head-isolated-white-wall_141793-35551.jpg?t=st=1742324670~exp=1742328270~hmac=1a9697c8810ed68612362a61e2bf386260d4e7507a6d7f17fa919d653612b714&w=1380', title: 'Beginners', description: 'Start your journey with our beginner-friendly courses.' },
            { image: 'https://img.freepik.com/free-photo/front-view-male-student-green-checkered-shirt-wearing-black-backpack-holding-files-blue-wall_140725-42404.jpg?t=st=1742324927~exp=1742328527~hmac=42ad538032cb451c5c265519d06d07fedbe9577e931591daec8e48e7520052b0&w=1380', title: 'Students', description: 'Excel in your studies with our JLPT preparation courses.' },
            
          ].map((item, index) => (
            <div key={index} className="text-center">
              <img src={item.image} alt={item.title} className="object-cover w-full h-48 mb-4 rounded-lg" />
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
               
      {/* Call to Action Section */}
        <section className="relative py-20 bg-gradient-to-r from-[#BF3131] to-[#7D0A0A] overflow-hidden">
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 opacity-20"
            whileInView={{ scale: 1.2 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "url('/path-to-your-pattern-or-effect.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Content */}
          <div className="container px-6 mx-auto text-center">
            {/* Heading */}
            <motion.h2
              className="mb-6 text-4xl font-extrabold text-white md:text-5xl"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              Start Your Japanese Learning Journey Today!
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="mb-8 text-lg text-white md:text-xl"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Join Ayumi and master Japanese with ease. Sign up now and get access to exclusive content!
            </motion.p>

            {/* Sign-Up Button */}
             {/* Button with Hover & Tap Animation */}
            <button
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsTapped(true)}
            onMouseUp={() => setIsTapped(false)}
          >
            Sign Up Now
              </button>
          </div>
        </section>
      

      {/* Social Media Section */}
        <section className="py-20 bg-[#2d3748]">
          <div className="container px-6 mx-auto text-center">
            {/* Heading */}
            <motion.h2
              className="mb-6 text-4xl font-extrabold text-white md:text-5xl"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              Connect with Us on Social Media!
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="mb-12 text-lg text-gray-300 md:text-xl"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Follow Ayumi for updates, learning tips, and more.
            </motion.p>

            {/* Social Media Icons Grid */}
            <div className="grid w-2/3 grid-cols-2 gap-6 mx-auto md:grid-cols-4 place-items-center">
              {[
                { icon: <FaFacebook size={32} />, color: "bg-blue-600 hover:bg-blue-700", link: "https://www.facebook.com/yourpage" },
                { icon: <FaInstagram size={32} />, color: "bg-pink-500 hover:bg-pink-600", link: "https://www.instagram.com/yourpage" },
                { icon: <MessageCircle size={32} />, color: "bg-green-500 hover:bg-green-600", link: "https://wa.me/yourwhatsappnumber" },
                { icon: <FaYoutube size={32} />, color: "bg-red-600 hover:bg-red-700", link: "https://www.youtube.com/yourchannel" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-6 text-white rounded-lg shadow-lg transition-all duration-300 ${item.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </section>





    </div>
  );
}          














     