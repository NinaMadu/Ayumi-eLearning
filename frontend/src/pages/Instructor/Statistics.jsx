import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Line } from "react-chartjs-2"; // If you're using Line chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement,    // Register PointElement
  LineElement,     // Register LineElement (if you're using a Line chart)
  Title, 
  Tooltip, 
  Legend
);

const Statistics = () => {
  const [userData, setUserData] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyUserSignups = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/monthly-signups`);
        const result = await response.json();

        console.log("API Response:", result);

        if (response.ok) {
          const data = result.data;
          const formattedMonths = data.map((entry) => {
            const date = new Date(entry.year, entry.month - 1); // Month is 0-based
            return date.toLocaleString("default", { month: "short", year: "numeric" });
          });

          setUserData(data.map((entry) => entry.userCount));
          setMonths(formattedMonths);
        } else {
          setError(result.message || "Failed to fetch monthly signups");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Error fetching monthly signups");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyUserSignups();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "User Signups",
        data: userData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,  // Fill area under the line (for Line chart)
        tension: 0.4, // Makes the line smooth
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Signups Per Month",
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
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Statistics;
