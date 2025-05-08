import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import HeaderOne from '../components/Header';
import HeaderTwo from '../pages/Instructor/InstructorHeader';
import Footer from '../components/Footer';

const teachers = [
  {
    name: 'Mrs.Sewwandi Perera',
    image: 'https://scontent.fcmb8-1.fna.fbcdn.net/v/t1.6435-9/74620848_709081699596897_7846024566747955200_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-HULOaomgi0Q7kNvwHNkeP5&_nc_oc=AdnBltkg5U6zzgAlJfhlh__FN__ublRvExPUOHMVCRCjKMADWRl53km0dvLDxhR6Cew&_nc_zt=23&_nc_ht=scontent.fcmb8-1.fna&_nc_gid=6mKHIqnZnk22QzVNzjg0IQ&oh=00_AfIAoA6KBEHJEJqWKRVhYv2JY2dP7RAWYjDr0lDwcncRVw&oe=68444247',
    bio: 'Well experienced instructor with 5+ years of experience in JLPT training and business Japanese.',
  },
  
  
];

export default function Teachers() {
  const { currentUser } = useSelector((state) => state.user);
  const isInstructor = currentUser?.isInstructor || false;

  return (
      <div style={{
         
          backgroundColor: '#f9fafb', color: '#2d3748', fontFamily: 'sans-serif'
      }}>
      {isInstructor ? <HeaderTwo /> : <HeaderOne />}

      <section
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/positive-happy-teacher-clenches-fist-with-joyful-expression-holds-spiral-notepad-writes-notes-notepad-dressed-red-shirt_273609-25182.jpg?t=st=1746721366~exp=1746724966~hmac=2a2308cd485c43b63dc3c735f5a4a42716f5711166bcb1e8faba98dccb214b76&w=1380)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          position: 'relative',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
                
                  
                  }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            fontSize: '3rem',
            fontWeight: 'bold',
            zIndex: 10,
          }}
        >
          Meet Our Instructors
        </motion.h1>
      </section>

      <section style={{ maxWidth: '1100px', margin: 'auto', padding: '4rem 1rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            // backgroundColor: '#BF3131',
          }}
        >
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                  textAlign: 'center',
                  height: '400px',
                width: '400px'
                
              }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
                  {teacher.name}
                </h3>
                <p style={{ marginTop: '0.75rem', color: 'black' }}>{teacher.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
