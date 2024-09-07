import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Assuming the weatherData data is passed as a prop or imported from a file
const ResponsiveBarChart = ({ weatherData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const updateChartData = () => {
      const screenWidth = window.innerWidth;
      let daysToShow = 30; // default for large screens

      if (screenWidth < 768) {
        daysToShow = 10; // smaller screens show fewer days
      } else if (screenWidth < 1024) {
        daysToShow = 20; // medium screens show more days
      }

      const newData = weatherData.weather.slice(0, daysToShow);
      setFilteredData(newData);
      setLabels(newData.map((_, index) => `Day ${index + 1}`));
    };
    // Initial data setup
    updateChartData();

    // Add resize event listener
    window.addEventListener("resize", updateChartData);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateChartData);
    };
  }, [weatherData]);

  const chartData = {
    labels: labels,

    datasets: [
      {
        label: "Humidity",
        data: filteredData.map((item) => item.hourly[4].humidity),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Heat Index",
        data: filteredData.map((item) => item.hourly[4].HeatIndexC),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ResponsiveBarChart;
