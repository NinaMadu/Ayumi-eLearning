import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={`${className} custom-arrow flex items-center justify-center bg-slate-700 text-white rounded-full shadow-md cursor-pointer ${
        direction === 'prev' ? 'left-2' : 'right-2'
      }`}
      style={{ ...style, width: '20px', height: '20px', zIndex: 1 }}
      onClick={onClick}
    >
      {direction === 'prev' ? '<' : '>'}
    </div>
  );
};


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
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  if (loading) {
    return <p>Loading notices...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <Slider {...settings}>
        {notices.map((notice, index) => (
          <div key={index} className="px-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
              {/* Left Side: Image */}
              <div className="md:w-1/3 w-full flex-shrink-0 mb-6 md:mb-0">
                {notice.image ? (
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 md:h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>
              {/* Right Side: Content */}
              <div className="md:w-2/3 w-full md:pl-6">
                <h3 className="text-2xl font-semibold text-gray-800">{notice.title}</h3>
                <p className="text-gray-600 mt-4">{notice.description}</p>
                {/* <button className="mt-6 py-2 px-6 bg-slate-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                  Read More
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Notices;
