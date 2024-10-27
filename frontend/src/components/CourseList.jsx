import React, { useState, useEffect } from "react";
import CourseItem from "./CourseItem"; // Import the CourseItem component

const CourseList = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses"); // Replace with your API endpoint
        const data = await response.json();
        setCourses(data); // Store fetched courses in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Failed to fetch courses", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchCourses();
  }, []); // Empty array ensures this runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {courses.length > 0 ? (
        courses.map((course) => <CourseItem key={course._id} course={course} />)
      ) : (
        <div>No courses available</div> // Display message if no courses are available
      )}
    </div>
  );
};

export default CourseList;
