import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion'; // Add framer-motion for animations

const CustomArrow = ({  direction, onClick  }) => {
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


const NoticesSkeleton = () => (
  <div className="max-w-6xl px-4 py-8 mx-auto">
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-gray-50 md:flex-row md:items-start animate-pulse">
      <div className="flex-shrink-0 w-full mb-6 md:w-1/3 md:mb-0">
        <div className="w-full h-48 bg-gray-300 rounded-lg md:h-64"></div>
      </div>
      <div className="w-full md:w-2/3 md:pl-6">
        <div className="w-3/4 h-8 mb-4 bg-gray-300 rounded"></div>
        <div className="w-full h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-full h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-5/6 h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-32 h-10 mt-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="max-w-6xl px-4 py-8 mx-auto">
    <div className="p-6 text-center rounded-lg shadow-lg bg-red-50">
      <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 className="text-xl font-medium text-red-800">Unable to Load Notices</h3>
      <p className="mt-2 text-red-700">{message}</p>
      <button 
        className="px-4 py-2 mt-4 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  </div>
);

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch notices from the backend API
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notices`);
        const data = await res.json();

        if (res.ok) {
          setNotices(data.notices); // Assuming `data.notices` contains the array of notices
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch notices');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching notices');
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: dots => (
      <div style={{ bottom: "-30px" }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
        i === currentSlide ? 'bg-[#F61627]' : 'bg-gray-300'
      }`} />
    ),
  };

  if (loading) {
    return <NoticesSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  // If there are no notices, display a message
  if (notices.length === 0) {
    return (
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <div className="p-6 text-center rounded-lg shadow-lg bg-gray-50">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">No Notices Available</h3>
          <p className="mt-2 text-gray-600">Check back later for updates and announcements.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-[#2B3090]">Latest Announcements</h2>
        <div className="w-24 h-1 bg-[#F61627] mx-auto mt-2"></div>
      </div>

      <div className="overflow-hidden bg-white shadow-xl rounded-xl">
        <Slider {...settings}>
          {notices.map((notice, index) => (
            <div key={index} className="outline-none">
              <motion.div 
                className="flex flex-col items-center p-8 bg-gradient-to-r from-white to-gray-50 md:flex-row md:items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Left Side: Image */}
                <div className="flex-shrink-0 w-full mb-6 md:w-1/3 md:mb-0">
                  {notice.image ? (
                    <motion.div 
                      className="overflow-hidden shadow-lg rounded-xl" 
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={notice.image}
                        alt={notice.title}
                        className="object-cover w-full h-48 transition-transform duration-500 md:h-64 hover:scale-110"
                      />
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-48 md:h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Right Side: Content */}
                <div className="w-full md:w-2/3 md:pl-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#2B3090]/10 to-[#8487BE]/10 text-[#2B3090] rounded-lg text-sm font-medium mb-3">
                      {notice.category || 'Announcement'}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">{notice.title}</h3>
                    
                    {notice.date && (
                      <div className="flex items-center mb-4 text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <p className="leading-relaxed text-gray-600">{notice.description}</p>
                    
                    {notice.link && (
                      <motion.a
                        href={notice.link}
                        className="inline-block mt-6 py-2 px-6 bg-gradient-to-r from-[#F61627] to-[#FF6B6B] text-white rounded-lg shadow-md font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read More
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Notices;