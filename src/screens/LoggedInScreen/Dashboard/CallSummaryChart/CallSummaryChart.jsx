import React from "react";
import Chart from "react-apexcharts";
import "./CallSummaryChart.css"; // Optional CSS for styling

const CallSummaryChart = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Completed Calls", "Pending Calls", "Missed Calls"],
    colors: ["#28A745", "#FF8800", "#DC5835"], // Colors for each segment
    legend: {
      position: "bottom",
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '14px',
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
          size: '55%',
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

  const chartSeries = [50, 30, 20]; // Data: Completed, Pending, Missed

  const recentCalls = [
    { id: 1, name: "Petra Infotech", type: "Incoming Call", status: "Completed", statusColor: "#28A745" },
    { id: 2, name: "Acoustic Home Cinema", type: "Outgoing Call", status: "Pending", statusColor: "#FF8800" },
    { id: 3, name: "Av Plus Solutions", type: "Missed Call", status: "Missed", statusColor: "#DC5835" },
  ];

  return (
    <div className="call-summary-chart-main-container">
      <div className="call-summary-chart">
        <Chart options={chartOptions} series={chartSeries} type="donut"  width={320}/>
      </div>

      <div className="recent-calls">
        <h2>Recent Calls</h2>
        <table>
          <tbody>
            {recentCalls.map((call) => (
              <tr key={call.id}>
                <td>{call.id}.</td>
                <td>{call.name}</td>
                <td>{call.type}</td>
                <td>
                  <span style={{ color: call.statusColor }}>{call.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallSummaryChart;
