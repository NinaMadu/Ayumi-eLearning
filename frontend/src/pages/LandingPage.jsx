import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/logo.png";
import Pic1 from "../assets/Pic1.jpeg";
import Pic2 from "../assets/Pic2.jpeg";
import Pic3 from "../assets/Pic3.jpeg";
import Pic4 from "../assets/Pic4.jpg";
import Pic5 from "../assets/Pic5.jpg";
import Pic6 from "../assets/Pic6.jpg";
import Sidemenu from "../components/Sidemenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notices from "../components/Notices";

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

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Layout with Sidemenu and main content */}
      <div className="flex pt-20">
        {" "}
        {/* pt-20 to adjust for the fixed header height */}
        {/* <Sidemenu /> */}
        <div className="container mx-auto flex-1">
          {/* Text and Image */}
          <div className="flex justify-between items-center px-24 sm:px-8 sm:justify-center flex-wrap">
            <div className="flex flex-col items-center">
              {/* Text */}
              <p className="text-[#F61627] text-6xl font-semibold mb-8 text-center">
                <span>Ayumi Japanese</span>
                <br />
                <span>Language Institute</span>
                <br />
              </p>

              <p className="text-[#2B3090] text-xl text-center font-medium">
                At Ayumi Japanese Language Institute, we are <br />
                committed to providing quality, affordable language programs.
                <br />
                We guide our students through the process of learning <br />a
                new language in an easy-to-understand manner.
              </p>

              {/* Buttons */}
              <div className="flex gap-16 mt-8 justify-center">
                <button
                  className="py-2 px-8 rounded-xl text-white font-medium"
                  style={{
                    background: "linear-gradient(to right, #DC7676, #C53B3B )",
                  }}
                >
                  Our Courses
                </button>
                <button
                  className="py-2 px-8 rounded-xl text-white font-medium"
                  style={{
                    background: "linear-gradient(to right, #2B3090, #8487BE )",
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>

            <div className="mr-16">
              {/* Image */}
              <img
                src={logo}
                alt="logo"
                className="h-auto max-h-80 md:max-h-96 lg:max-h-[450px] object-contain w-full max-w-sm md:max-w-md lg:max-w-lg"
              />
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text   px-4 py-2  flex justify-center">
              📢 Latest Notices 📢123
            </h1>
            <Notices />
          </div>

          <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text py-4 drop-shadow-lg">
            🌟 Image Gallery 🌟 123
          </h1>

          {/* Image Slider */}
          <div className="px-4 py-8 max-w-4xl mx-auto p-8 bg-slate-200 rounded-2xl">
            <Slider {...settings}>
              {images.map((src, index) => (
                <div key={index} className="px-2">
                  <img
                    src={src}
                    alt={`Gallery item ${index}`}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;