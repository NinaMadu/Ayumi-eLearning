import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Statistics = () => {
  const [userData, setUserData] = useState([]);
  const [months, setMonths] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyUserSignups = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/monthly-signups`
        );
        const result = await response.json();
        if (response.ok) {
          const data = result.data;
          const formattedMonths = data.map((entry) => {
            const date = new Date(entry.year, entry.month - 1);
            return date.toLocaleString("default", {
              month: "short",
              year: "numeric",
            });
          });
          setUserData(data.map((entry) => entry.userCount));
          setMonths(formattedMonths);
        } else {
          setError(result.message || "Failed to fetch monthly signups");
        }
      } catch (err) {
        setError(err.message || "Error fetching monthly signups");
      }
    };

    const fetchEnrollmentStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course`);
        const result = await response.json();
    
        if (response.ok) {
          const courses = result.courses || [];
          const courseIds = courses.map((course) => course._id);
          const names = courses.map((course) => course.title);
    
          const enrollmentStats = await Promise.all(
            courseIds.map(async (id) => {
              try {
                const enrollmentResponse = await fetch(
                  `${import.meta.env.VITE_API_BASE_URL}/api/course/${id}/enrolled-students`
                );
                if (!enrollmentResponse.ok) {
                  throw new Error(`Failed to fetch enrollment data for course ID ${id}`);
                }
                const enrollmentResult = await enrollmentResponse.json();
                return enrollmentResult.enrolledStudents || 0;
              } catch (err) {
                console.error(err);
                return 0; // Return 0 if there's an error fetching the enrollment data
              }
            })
          );
    
          setCourseNames(names);
          setEnrollmentData(enrollmentStats);
        } else {
          setError(result.message || "Failed to fetch courses");
        }
      } catch (err) {
        setError(err.message || "Error fetching enrollment stats");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMonthlyUserSignups();
    fetchEnrollmentStats();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const gradient = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(54, 162, 235, 0.6)");
    gradient.addColorStop(1, "rgba(54, 162, 235, 0)");
    return gradient;
  };
  const gradient2 = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(194, 30, 86, 0.8)"); 
    gradient.addColorStop(1, "rgba(194, 30, 86, 0)"); 
    return gradient;
  };
  

  const signupsChartData = {
    labels: months,
    datasets: [
      {
        label: "User Signups",
        data: userData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const enrollmentsChartData = {
    labels: courseNames,
    datasets: [
      {
        label: "Enrolled Students",
        data: enrollmentData,
        backgroundColor: gradient2,
       //backgroundColor: "rgba(255, 192, 203, 0.8)",
        borderColor: "rgba(255, 192, 203, 1)",
        borderWidth: 1,
        
      },
    ],
  };
  
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Flex or Grid Layout for Two Equal Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* First Container for User Signups */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Signups Per Month</h1>
            <div className="h-96 w-full flex items-center justify-center">
              <Line 
                data={signupsChartData} 
                options={{ responsive: true }} 
              />
            </div>
          </div>

          {/* Second Container for Enrolled Students */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enrolled Students Per Course</h2>
            <div className="h-96 w-full flex items-center justify-center">
              <Bar
                data={enrollmentsChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Number of Students",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Courses",
                      },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Statistics;
