import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch notices from the backend API
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notices`);
        const data = await res.json();
        
        if (res.ok) {
          setNotices(data.notices);  // Assuming `data.notices` contains the array of notices
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
    nextArrow: <div className="custom-arrow slick-next"></div>,
    prevArrow: <div className="custom-arrow slick-prev"></div>,
  };

  if (loading) {
    return <p>Loading notices...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='px-4 py-8 max-w-4xl mx-auto bg-slate-200 rounded-2xl'>
      <Slider {...settings}>
        {notices.map((notice, index) => (
          <div key={index} className='px-2'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              {/* Check if the notice has an image */}
              {notice.image ? (
                <img 
                  src={notice.image} 
                  alt={notice.title} 
                  className='w-full h-48 object-cover rounded-lg mb-4' 
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
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
