import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const MonthlySalesGraph = ({ downloadGraph }) => {

  const downloadGraphData = () => {
    // Prepare CSV content
    const csvHeader = ["Month", "Achieved Sales (L)", "Planned Sales (L)"];
    const csvRows = chartOptions.xaxis.categories.map((month, index) => {
      const achieved = chartSeries[0].data[index];
      const planned = chartSeries[1].data[index];
      return `${month},${achieved},${planned}`;
    });

    const csvContent = [csvHeader.join(","), ...csvRows].join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly_sales_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    xaxis: {
      categories: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
        "July 2024",
        "Aug 2024",
        "Sep 2024",
        "Oct 2024",
        "Nov 2024",
        "Dec 2024",
      ],
      labels: {
        style: {
          colors: "#000000",
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6,
      labels: {
        formatter: (val) => `${val.toLocaleString()} L`,
        style: {
          colors: "#000000",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val} Lakh`,
      },
    },
    colors: ["#007BFF", "#B3D7FF"],
  };

  const chartSeries = [
    {
      name: "Achieved sales",
      data: [30, 10, 20, 30, 10, 10, 10, 30, 20, 20, 10, 20],
    },
    {
      name: "Planned sales",
      data: [10, 20, 10, 10, 30, 10, 20, 10, 10, 20, 10, 20],
    },
  ];

  // Pass the download function back to the parent
  React.useEffect(() => {
    if (downloadGraph) {
      downloadGraph(downloadGraphData);
    }
  }, [downloadGraph]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
      </div>
      <div style={{ height: "400px", width: "100%" }}>
        <Chart
          options={{
            ...chartOptions,
            chart: { ...chartOptions.chart, height: "100%" },
          }}
          series={chartSeries}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
};

export default MonthlySalesGraph;
