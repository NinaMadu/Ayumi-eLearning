


import React from 'react';
import CourseList from '../components/CourseCards';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Courses() {
    return (
      <div>
      <div style={{
        padding: '80px',
      }}>
          <Header/>
          <div style={{
              marginTop: '50px',
          }}>
              <CourseList/>
          </div>
          
          
          


      </div>
      <Footer />
      </div>
  )
}
