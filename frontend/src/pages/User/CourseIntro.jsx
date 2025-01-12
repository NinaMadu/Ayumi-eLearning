import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../../components/UserLayout';
import { FaStar, FaTags, FaDollarSign, FaClock } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CourseIntro = () => {

  const currentUser = useSelector((state)=>state.user.currentUser);
  const { id } = useParams();  //course Id
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId,setUserId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEnrolled,setIsEnrolled] = useState(false);
  const [message,setMessage]= useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(id);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/${id}`);
        const data = await res.json();
        // console.log(data.course._id);

        console.log(currentUser._id);
        setUserId(currentUser._id);

        // const userRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${currentUser.email}`);
        // const userData = await userRes.json();

        if (res.ok) {
          setCourse(data.course);
          // console.log(course.data);
          // setUser(userData.user);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch course details');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching course details');
        setLoading(false);
      }
    };
    
   
    const checkEnrollmentStatus = async()=>{
      try{
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/user/${currentUser._id}/enrolled-courses`);
        const data = await res.json();

        if(res.ok)
        {
          const enrolledCourses = data.enrolledCourses || [];
          const isEnrolledInCourse = enrolledCourses.some(course=>course._id===id);
          setIsEnrolled(isEnrolledInCourse);
          // console.log("Enrollment:",isEnrolledInCourse);
        }
        else{
          console.error('Error checking enrollment status');
        }
      }
      catch(error){
        console.error('Error checking enrollment status');
      }
    }
    const checkFavStatus  = async () =>{
      try{
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/user/${currentUser._id}/favorites`);
        const data = await res.json();
        console.log(data);
        // console.log(data +" Hello");

        if(res.ok)
        {
          const favCourses = data.favorities || [];
          console.log(favCourses);
          const isFav = favCourses.some(course=> course._id == id);
          console.log(isFav);
          setIsFavorite(isFav);
          console.log(isFavorite);
        }
        else{
          console.error('Error fetching favorite status');
        }
      }
      catch(error)
      {
        console.error('Error checking favorite status');
      }
    }

    if (id) {
      fetchCourse();
      checkFavStatus();
      checkEnrollmentStatus();
    } else {
      setError('Course ID is missing');
      setLoading(false);
    }
  }, [id, currentUser._id]);

  const handleEnroll = async () =>{
    try{
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/user/${currentUser._id}/enroll/${id}`,
      {
        method:'POST',
      }
    );
    if(res.ok)
    {
      setIsEnrolled(true);
      setMessage('Enrolled Successfully');
      navigate(`/user/course-content/${id}`);
    }
    else{
      const data = await res.json();
      setError(data.message||'Error Enrolling');
    }
    }
    catch(error){
      setError('Error Enrolling');
    }
  };

  
  
  const handleAddToFav = async()=>{
    try{

     
      
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/user/${userId}/favorites/${id}`,{
          method:'POST',
        });

        
        if(res.ok){
          // setUser(data);
          setIsFavorite(true);
          setMessage('Successfully Added to Favorites');
        }
        else{
          const data = await res.json();
          setError(data.message||'Error Adding to Favorites');
        }

    }
    catch(error){
      setError('Error Adding to Favorites');
    }
  }

  const handleRemoveFromFav = async()=>{
    try{
      
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/user/${userId}/favorites/${id}`,{
          method:'DELETE',
        });

        
        if(res.ok){
          // setUser(data);
          setIsFavorite(false);
          setMessage('Successfully Removed from Favorites');

        }
        else{
          const data = await res.json();
          setError(data.message||'Error Removing from Favorites');
        }

    }
    catch(error){
      setError('Error Removing from Favorites');
    }
  }
    


  if (loading) {
    return <p className="text-lg text-center text-gray-700">Loading course details...</p>;
  }

  if (error) {
    return <p className="text-lg text-center text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-lg text-center text-gray-700">No course found</p>;
  }

  const instructor = course.instructor;
  // const isFavorite = id?.favorites?.includes(id);

  return (
    <UserLayout>
      <div className="w-full mb-4">
        <h2 className="mb-4 text-4xl font-bold text-center text-gray-900">{course.title}</h2>

        <div className="w-full">
          {course.introImage ? (
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
        <p className="text-lg font-semibold text-center text-gray-700">{course.description}</p>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/2">
            {/* Instructor Details */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Meet Your Instructor</h3>
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
                    <p className="text-lg font-medium text-gray-900">{instructor.name || 'Unknown Instructor'}</p>
                    <p className="text-gray-600">{instructor.bio || 'No bio available'}</p>
                    <p className="text-gray-600">
                      {instructor.experience && instructor.experience.length > 0
                        ? `Experience: ${instructor.experience.join(', ')}`
                        : 'No experience listed'}
                    </p>
                    <p className="text-gray-600">
                      {instructor.qualifications && instructor.qualifications.length > 0
                        ? `Qualifications: ${instructor.qualifications.join(', ')}`
                        : 'No qualifications listed'}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">Loading instructor details...</p>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">What You'll Learn</h3>
              <ul className="pl-4 space-y-2 list-disc list-inside">
                {course.objectives && course.objectives.map((objective, index) => (
                  <li key={index} className="text-gray-700">{objective}</li>
                ))}
              </ul>
            </div>

            {/* What You Need to Know */}
            <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">What You Need to Know</h3>
              <ul className="pl-4 space-y-2 list-disc list-inside">
                {course.prerequisites && course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="text-gray-700">{prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-8 md:w-1/2 md:pl-8 md:mt-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-center">
                <FaTags className="text-blue-600" />
                <p className="text-lg text-gray-700 "><strong>Category of the course:</strong> {course.category}</p>
              </div>

              <div className="flex items-center space-x-2 text-center">
                <FaStar className="text-yellow-500" />
                <p className="text-lg text-gray-700"><strong>Difficulty level:</strong> {course.difficulty}</p>
              </div>

              {/* New addition for course duration */}
              <div className="flex items-center space-x-2 text-center">
                <FaClock className="text-blue-600" />
                <p className="text-lg text-gray-700"><strong>Duration of the course:</strong> {course.customDuration} {course.durationUnit}</p>
              </div>

              {/* Enrollment Option */}
              <div className="flex items-center mt-8 space-x-6 text-center">
                <div
                  className={`flex items-center p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${course.enrollmentOptions === 'free' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black' : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black w-full'}`}
                  onClick={() => console.log(`${course.enrollmentOptions === 'free' ? 'Free' : 'Paid'} enrollment clicked`)}
                >
                  <div className="flex items-center w-full">
                    <p className="text-[16px] font-semibold w-full text-center">
                      {course.enrollmentOptions === 'free' ? (
                        <span className="font-bold">Free Course</span>
                      ) : (<><span className="font-bold">Paid Course</span>- {parseFloat(course.customPrice.$numberDecimal).toFixed(2)} {course.priceUnit}</>
                        

                      )}
                    </p>
                  </div>
                </div>
              </div>


              

            
                      
            
              <button className="w-full px-4 py-2 mt-8 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={handleEnroll}>
                {isEnrolled ? 'Go to Course' : 'Enroll Now'}
              </button>
              
        <button
          className={`w-full px-4 py-2 mt-8 text-white transition rounded-lg ${
            isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={isFavorite ? handleRemoveFromFav : handleAddToFav}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
       </div>


            {/* Statistical Ratings and Reviews */}
            <div className="mt-10">
              {/* Average Rating */}
              <div className="flex items-center space-x-2 text-center">
                <FaStar className="text-yellow-500" />
                <p className="text-lg text-gray-700">
                  <strong>Average Rating:</strong> 4.5 / 5
                </p>
              </div>

              {/* Star Rating UI */}
              <div className="flex items-center mt-4 space-x-1">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-gray-300" /> {/* Empty star for the 5th rating */}
              </div>

              {/* Sample Reviews */}
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-900">What Students Are Saying...</h3>

                <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
                  <p className="italic text-gray-700">"This course exceeded my expectations! The content was well-structured, and the instructor was highly knowledgeable."</p>
                  <p className="mt-2 text-gray-600">- Student 1</p>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CourseIntro;
