// src/components/Notices.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const notices = [
  {
    date: "September 30, 2024",
    title: "Upcoming Japanese Culture Workshop",
    description: "Join us for a workshop on Japanese culture, including traditional tea ceremonies, calligraphy, and more. This event is open to all students and will provide a deeper understanding of Japanese traditions.",
    imageUrl: "../src/assets/notice3.jpg"
  },
  {
    date: "October 15, 2024",
    title: "New Japanese Language Course",
    description: "We are excited to announce a new beginner Japanese language course starting next month. Enroll now to secure your spot.",
    imageUrl: "../src/assets/notice.jpg"
  },
  // Add more notices as needed
];

const Notices = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <div className="custom-arrow slick-next"></div>,
    prevArrow: <div className="custom-arrow slick-prev"></div>,
  };

  return (
    <div className='px-4 py-8 max-w-4xl mx-auto bg-slate-200 rounded-2xl'>
      <Slider {...settings}>
        {notices.map((notice, index) => (
          <div key={index} className='px-2'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <img src={notice.imageUrl} alt={notice.title} className='w-full h-48 object-cover rounded-lg mb-4' />
              <h3 className='text-2xl font-semibold'>{notice.title}</h3>
              <p className='text-gray-600 mt-2'>{notice.description}</p>
              <button className='mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg'>Read More</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Notices;
