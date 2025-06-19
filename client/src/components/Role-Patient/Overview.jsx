import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Overview = ({ user }) => {
  const [category, setCategory] = useState("Weight");
  const [monthlyData, setMonthlyData] = useState({});
  const [newMonth, setNewMonth] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/health-trends/${
          user.id
        }/${encodeURIComponent(category)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const formatted = {};
      res.data.forEach((entry) => {
        formatted[entry.Month] = entry.Value;
      });
      setMonthlyData(formatted);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleAdd = async () => {
    if (!newMonth || !newValue || !user?.id) return;

    try {
      await axios.post(
        "http://localhost:5000/api/health-trends",
        {
          userId: user.id,
          category,
          month: newMonth,
          value: parseFloat(newValue),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewMonth("");
      setNewValue("");
      fetchData();
    } catch (err) {
      console.error("Failed to submit data", err);
    }
  };

  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: `${category} Trend`,
        data: Object.values(monthlyData),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Health Overview</h2>

      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <select
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Weight">Weight</option>
          <option value="Blood Pressure">Blood Pressure</option>
          <option value="Temperature">Body Temperature</option>
        </select>

        <input
          type="text"
          placeholder="Month (e.g. Jan, Feb)"
          value={newMonth}
          onChange={(e) => setNewMonth(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600"
        />

        <input
          type="number"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600"
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Overview;
