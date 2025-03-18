import React, { useEffect, useRef, useState } from 'react';

import Pic3 from '../assets/Pic3.jpeg';

export default function About() {

  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


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
        backgroundImage: `url(https://img.freepik.com/free-photo/man-practicing-japanese-handwriting_23-2149124248.jpg?t=st=1742328191~exp=1742331791~hmac=8be9a78035d62100b7a8a0d51458807ab11932747ecd77d30ce9aa38d17bd9fa&w=1380)`,
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
        <h1
            style={{
            
            marginBottom: '1.5rem',
            fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              letterSpacing: '0.05em',
           
            animation: isVisible ? 'fadeIn 1.5s ease-out' : 'none',
          }}
        >
          Unlock the Beauty of Japanese with Ayumi
        </h1>

        {/* Subheading with Slide-Up Animation */}
        <p
          style={{
            marginBottom: '2rem',
            fontSize: '1.25rem',
            animation: isVisible ? 'slideUp 1s ease-out 0.5s' : 'none',
            animationFillMode: 'both',
          }}
        >
          Your gateway to mastering Japanese with expert instructors and interactive learning!
        </p>

        {/* Button with Hover Effect */}
        <button
          style={{
            padding: '0.75rem 2rem',
            color: 'white',
            backgroundColor: '#f97316',
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
      <section className="px-4 py-16 text-center bg-orange-500">
        <h2 className="mb-4 text-3xl font-bold text-white">Start Your Japanese Learning Journey Today!</h2>
        <p className="mb-8 text-white">Join Ayumi and master Japanese with ease.</p>
        <button className="px-8 py-3 text-orange-500 transition duration-300 bg-white rounded-lg hover:bg-gray-100">
          Sign Up Now
        </button>
      </section>






    </div>
  );
}          














     