
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../assets/logo.png';
import Pic1 from '../assets/Pic1.jpeg';
import Pic2 from '../assets/Pic2.jpeg';
import Pic3 from '../assets/Pic3.jpeg';
import Pic4 from '../assets/Pic4.jpg';
import Pic5 from '../assets/Pic5.jpg';
import Pic6 from '../assets/Pic6.jpg';
import Sidemenu from '../components/Sidemenu';
import Header from '../components/Header';
import Notices from '../components/Notices';  
import { useNavigate } from 'react-router-dom';

const images = [Pic1, Pic6, Pic2, Pic3, Pic5, Pic4];


const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <div className="custom-arrow slick-next"></div>,
    prevArrow: <div className="custom-arrow slick-prev"></div>,
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
  };

  
  const navigate = useNavigate();

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Layout with Sidemenu and main content */}
      <div className="flex pt-20">  {/* pt-20 to adjust for the fixed header height */}
        <Sidemenu />
        <div className="container flex-1 mx-auto">
          {/* Text and Image */}
          <div className='flex flex-wrap items-center justify-between px-24 sm:px-8 sm:justify-center'>
            <div className='flex flex-col items-center'>
              {/* Text */}
              <p className='text-[#F61627] text-6xl font-semibold mb-8 text-center'>
                <span>Ayumi Japanese</span>
                <br />
                <span>Language Institute</span>
                <br />
              </p>

              <p className='text-[#2B3090] text-xl text-center font-medium'>
                At Ayumi Japanese Language Institute, we are <br />
                committed to providing quality, affordable language programs.<br />
                We guide our students through the process of learning <br />
                a new language in an easy-to-understand manner.
              </p>

              {/* Buttons */}
              <div className='flex justify-center gap-16 mt-8'>
                <button className='px-8 py-2 font-medium text-white rounded-xl'
                  style={{
                    background: 'linear-gradient(to right, #DC7676, #C53B3B )',
                  }} onClick={() => navigate(`/user/course-cards`)}
                >
                  Our Courses
                </button>
                <button className='px-8 py-2 font-medium text-white rounded-xl'
                  style={{
                    background: 'linear-gradient(to right, #2B3090, #8487BE )',
                  }}  onClick={()=> navigate(`/roadmap`)}>
                  View Roadmap
                </button>
              </div>
            </div>

            <div className='mr-16'>
              {/* Image */}
              <img src={logo} alt='logo' className='h-auto max-h-80 md:max-h-96 lg:max-h-[450px] object-contain w-full max-w-sm md:max-w-md lg:max-w-lg' />
            </div>
          </div>

         
          
          <div className='max-w-4xl px-4 py-8 mx-auto bg-slate-200 rounded-2xl'>
            <Notices />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
