import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaTags, FaClock } from "react-icons/fa";
import Header from "../components/Header";


const CourseIntro = () => {
  
  
  const { id } = useParams(); // Course ID
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [introVideo, setIntroVideo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
 
    
    
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/${id}`
        );
        const data = await res.json();

        if (res.ok) {
          setCourse(data.course);
          
          setIntroVideo(data.course.introVideo);
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch course details");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching course details");
        setLoading(false);
      }
    };

   

    

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/reviews/${id}`
        );
        const data = await res.json();

        if (res.ok) {
          setReviews(data.reviews || []);
          if (data.reviews.length > 0) {
            const totalRating = data.reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            const avgRating = totalRating / data.reviews.length;
            setAverageRating(avgRating.toFixed(1));
          } else {
            setAverageRating("N/A");
          }
        } else {
          console.error("Error fetching course reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    if (id) {
      fetchCourse();
      fetchReviews();
    } else {
      setError("Course ID is missing");
      setLoading(false);
    }
  }, [id]);

 

  

  if (loading) {
    return (
      <p className="text-lg text-center text-gray-700">
        Loading course details...
      </p>
    );
  }

  if (error) {
    return <p className="text-lg text-center text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-lg text-center text-gray-700">No course found</p>;
  }

  const instructor = course.instructor;


  //intro video

  const YoutubeEmbed = ({ introVideo }) => {
    if (!introVideo) return null;
    
    const getVideoId = (url) => {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[7].length === 11 ? match[7] : null;
    };
    
    const videoId = getVideoId(introVideo);
    
    if (!videoId) return null;
    
    return (
      <div className="w-full overflow-hidden rounded-lg shadow-md aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Introduction Video"
        />
      </div>
    );
  };




    return (
     
        <div>
             <Header/>
      <div className="w-full p-10 mt-16 mb-4">
        <h2 className="mb-4 text-4xl font-bold text-center text-gray-900">
          {course.title}
        </h2>

        <div className="w-full">
         
           { course.introImage ? (
            <img
              src={course.introImage}
              alt={course.title}
              className="object-cover w-full rounded-lg shadow-md h-96"
            />
          ) : (
            <div className="flex items-center justify-center w-full bg-gray-300 rounded-lg h-96">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>


        
      </div>

      <div>
        <p className="text-lg font-semibold text-center text-gray-700">
          {course.description}
        </p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/2">
            {/* Instructor Details */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Meet Your Instructor
              </h3>
              {instructor ? (
                <div className="flex items-center space-x-4">
                  {instructor.avatar ? (
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="object-cover w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {instructor.name || "Unknown Instructor"}
                    </p>
                    <p className="text-gray-600">
                      {instructor.bio || "No bio available"}
                    </p>
                    <p className="text-gray-600">
                      {instructor.experience && instructor.experience.length > 0
                        ? `Experience: ${instructor.experience.join(", ")}`
                        : "No experience listed"}
                    </p>
                    <p className="text-gray-600">
                      {instructor.qualifications &&
                      instructor.qualifications.length > 0
                        ? `Qualifications: ${instructor.qualifications.join(
                            ", "
                          )}`
                        : "No qualifications listed"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">Loading instructor details...</p>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="p-6 mt-10 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                What You'll Learn
              </h3>
              <ul className="pl-4 space-y-2 list-disc list-inside">
                {course.objectives &&
                  course.objectives.map((objective, index) => (
                    <li key={index} className="text-gray-700">
                      {objective}
                    </li>
                  ))}
              </ul>
            </div>

            {/* What You Need to Know */}
            <div className="p-6 mt-10 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                What You Need to Know
              </h3>
              <ul className="pl-4 space-y-2 list-disc list-inside">
                {course.prerequisites &&
                  course.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="text-gray-700">
                      {prerequisite}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-8 md:w-1/2 md:pl-8 md:mt-0">
            <div className="space-y-4">

              <div className="flex items-center space-x-2 text-center">
                <FaTags className="text-blue-600" />
                <p className="text-lg text-gray-700 ">
                  <strong>Introduction Video: </strong>
                </p>
              </div>    




              <div className="flex items-center space-x-2 text-center">
                      {introVideo ? (
                        <YoutubeEmbed introVideo={introVideo} />
                        
                      ) : (
                          null
                      )
                      }
                
              </div>




              <div className="flex items-center space-x-2 text-center">
                <FaTags className="text-blue-600" />
                <p className="text-lg text-gray-700 ">
                  <strong>Category of the course:</strong> {course.category}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-center">
                <FaStar className="text-yellow-500" />
                <p className="text-lg text-gray-700">
                  <strong>Difficulty level:</strong> {course.difficulty}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-center">
                <FaClock className="text-blue-600" />
                <p className="text-lg text-gray-700">
                  <strong>Duration of the course:</strong>{" "}
                  {course.customDuration} {course.durationUnit}
                </p>
              </div>

              {/* Enrollment Option */}
              <div className="flex items-center mt-8 space-x-6 text-center">
                <div
                  className={`flex items-center p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${
                    course.enrollmentOptions === "free"
                      ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black"
                      : "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black w-full"
                  }`}
                  onClick={() =>
                    console.log(
                      `${
                        course.enrollmentOptions === "free" ? "Free" : "Paid"
                      } enrollment clicked`
                    )
                  }
                >
                  <div className="flex items-center w-full">
                  <p className="text-[16px] font-semibold w-full text-center">
  {course.enrollmentOptions === "free" ? (
    <span className="font-bold">Free Course</span>
  ) : (
    <span 
      className="font-bold text-blue-600 cursor-pointer " 
      onClick={() => navigate(`/sign-in`)}
    >
      Paid Course
    </span>
  )}{" "}
  {course.enrollmentOptions !== "free" &&
    `${parseFloat(course.customPrice.$numberDecimal).toFixed(2)} ${course.priceUnit}`}
</p>

                  </div>
                </div>
              </div>

              <button
  className="w-full px-4 py-2 mt-8 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
  onClick={() => {
     if (course.enrollmentOptions === "paid") {
      // If the course is paid, navigate to the payment page
      navigate(`/sign-in`);
    } else {
      navigate(`/sign-in`);
    }
  }}
>
  Enroll Now
</button>

  

             
            </div>

           
            
        {/* Auto-Sliding Reviews Section */}
        <div className="mt-6">
        <div className="mt-10">
              {/* Average Rating */}
              <div className="flex items-center space-x-2 text-center">
                <p className="text-lg text-gray-700">
                  <strong>Average Rating:</strong> {averageRating} / 5
                </p>
              </div>

              {/* Star Rating UI */}
              <div className="flex items-center mt-4 space-x-1">
                {Array.from({ length: 5 }, (_, index) => {
                  const roundedRating = Math.round(averageRating || 0); // Round the rating to nearest integer

                  return (
                    <FaStar
                      key={index}
                      className={
                        index < roundedRating
                          ? "text-yellow-500" // Filled star
                          : "text-gray-300" // Empty star
                      }
                    />
                  );
                })}
              </div>
            </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            What Students Are Saying...
          </h3>

          {/* Reviews Container */}
          <div className="relative h-64 mt-4 overflow-hidden ">
            {reviews.length > 0 ? (
              <div className="flex gap-6 animate-slide">
                {[...reviews, ...reviews].map((review, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full p-4 bg-white rounded-lg shadow-md sm:w-1/2"
                  >
                    {/* Star Rating */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <FaStar
                          key={starIndex}
                          className={
                            starIndex < Math.round(review.rating)
                              ? "text-yellow-500" // Filled star
                              : "text-gray-300" // Empty star
                          }
                        />
                      ))}
                    </div>

                    {/* Review Content */}
                    <p className="mt-2 italic text-gray-700">
                      "{review.comment}"
                    </p>
                    <p className="mt-2 text-gray-600">
                      - {review.firstName || "anonymous"} {review.lastName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-600">No reviews yet.</p>
            )}
          </div>

          {/* Add CSS for Animation */}
          <style>
            {`
                    @keyframes slide {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(-${reviews.length * 30}%);
                      }
                    }

                    .animate-slide {
                      animation: slide ${reviews.length * 5}s linear infinite;
                    }

                    @media (max-width: 640px) {
                      @keyframes slide {
                        0% {
                          transform: translateX(0);
                        }
                        100% {
                          transform: translateX(-${reviews.length * 100}%);
                        }
                      }

                      .animate-slide {
                        animation: slide ${reviews.length * 5}s linear infinite;
                      }
                    }
                  `}
          </style>
        </div>
          </div>
        </div>
          </div>
          </div>
    
  );
};

export default CourseIntro;
