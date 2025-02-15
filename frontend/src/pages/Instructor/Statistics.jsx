import React, { useEffect, useState } from "react";
import AdminLayout from '../../components/AdminLayout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/count`);
        const data = await response.json();

        if (response.ok) {
          setUserCount(data.userCount);
        } else {
          setError(data.message || 'Failed to fetch user count');
        }
      } catch (err) {
        setError('Error fetching user count');
      } finally {
        setLoading(false);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/count`);
        const data = await response.json();

        if (response.ok) {
          setCourseCount(data.courseCount);
        } else {
          setError(data.message || 'Failed to fetch course count');
        }
      } catch (err) {
        setError('Error fetching course count');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseCount();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Data for the chart
  const chartData = {
    labels: ['Users', 'Courses'],
    datasets: [
      {
        label: 'Count',
        data: [userCount, courseCount],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistics Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-semibold mb-4">Statistics</h1>
        <div className="mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Statistics;
