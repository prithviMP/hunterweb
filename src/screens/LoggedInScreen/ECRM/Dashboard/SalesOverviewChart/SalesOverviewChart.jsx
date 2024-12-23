import React from "react";
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


// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SalesOverviewChart = () => {
  // Data for the chart
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // X-axis labels
    datasets: [
      {
        label: "Order", // Dataset label
        data: [500, 1000, 1500, 5000, 2500, 3000, 3500, 2000, 4500, 5000, 5500, 6000], // Y-axis data points
        borderColor: "#F8D854", // Line color
        backgroundColor: "#FFF", // Fill color below the line
        tension: 0.3, // Smooth curve
        pointBorderColor: "#DD5835", // Point border color
        pointBackgroundColor: "#DD5835", // Point background color
        pointBorderWidth: 4,
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Montserrat', sans-serif", // Set custom font for x-axis
          },
          color: "#000000",
          padding: 10, // Add padding between the labels
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Montserrat', sans-serif", // Set custom font for y-axis
          },
          color: "#000000",
          padding: 10, // Add padding between Y-axis labels and the grid lines
        },
      },
    },
    layout: {
      padding: {
        top: 20, // Padding above the graph
        bottom: 10, // Padding below the graph
      },
    },
  };

  return (
    <div className="sales-overview-chart" style={{ height: "470px", width: "100%" }}>
      {/* Adjust height by setting inline style */}
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesOverviewChart;