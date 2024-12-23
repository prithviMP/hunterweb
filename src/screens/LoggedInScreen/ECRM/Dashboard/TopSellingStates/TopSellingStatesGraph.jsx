import React from "react";
import Chart from "react-apexcharts";
import "./TopSellingStatesGraph.css"; // Optional CSS for styling

const TopSellingStatesGraph = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Other"],
    colors: ["#28A745", "#F8D854", "#E48B3C", "#98A8D4", "#54CAF8", "#DC5835"], // Colors for each segment
    legend: {
      position: "bottom",
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '15px',
      fontWeight: 400,
      markers: {
        width: 10,
        height: 10,
      },
      labels: {
        colors: "#000000",
        useSeriesColors: false
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value} Calls`, // Tooltip formatting
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          parentHeightOffset: 0,
        },
      },
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: "100%",
        },
        legend: {
          position: "bottom",
        },
      },
    }],
  };

  const chartSeries = [60, 30, 20, 10, 40, 10]; // Data: Completed, Pending, Missed

  const recentCalls = [
    { id: 1, name: "Petra Infotech", type: "Incoming Call", status: "Completed", statusColor: "#28A745" },
    { id: 2, name: "Acoustic Home Cinema", type: "Outgoing Call", status: "Pending", statusColor: "#FF8800" },
    { id: 3, name: "Av Plus Solutions", type: "Missed Call", status: "Missed", statusColor: "#DC5835" },
  ];

  return (
    <div className="call-summary-chart-main-container">
      <div className="call-summary-chart" style={{ paddingBottom: 10 }}>
        <Chart options={chartOptions} series={chartSeries} type="donut" width={340} />
      </div>
    </div>
  );
};

export default TopSellingStatesGraph;
