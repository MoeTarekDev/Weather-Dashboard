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
import useFeatures from "../../Context/features.context";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ChartTest = ({ labels, dataSet }) => {
  let { isItDark } = useFeatures();

  const data = {
    labels, // X-axis labels
    datasets: [
      {
        label: "Chance of Rain (%)",
        data: dataSet, // Data for each hour
        backgroundColor: !isItDark
          ? "rgba(0, 0, 0, 0.7)"
          : "rgba(228, 228, 231,0.2)", //"rgba(75, 192, 192, 0.2)"  Bar background color
        borderColor: "rgb(158, 204, 243)", // Bar border color
        borderWidth: 1, // Border width
        barThickness: 10, // Directly specify bar thickness here
        borderRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          color: isItDark ? "rgba(228, 228, 231, 0.2)" : "#ccc", // X-axis grid lines color
        },
        beginAtZero: true, // Start y-axis from 0
        ticks: {
          color: isItDark ? "#e4e4e7" : "#000",
          callback: function (value) {
            const weatherLabels = {
              0: "Sunny",
              40: "Cloudy",
              60: "Rainy",
            };
            return weatherLabels[value] || ""; // Return corresponding weather label or empty string
          },
          stepSize: 10, // Optional: step size to match your labels
        },
      },
      x: {
        ticks: {
          color: isItDark ? "#e4e4e7" : "#000",
        },
        categoryPercentage: 0.8, // Control category width
        barPercentage: 0.7,
        grid: {
          color: isItDark ? "rgba(228, 228, 231, 0.2)" : "#ccc", // X-axis grid lines color
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartTest;
