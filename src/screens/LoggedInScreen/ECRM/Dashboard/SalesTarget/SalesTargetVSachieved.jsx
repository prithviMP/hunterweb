import React from "react";
import Chart from "react-apexcharts";

const SalesTargetVSachieved = () => {
    const chartOptions = {
        chart: {
            type: "bar", // Column chart
            height: 350,
            toolbar: {
                show: false,
            },
            stacked: true,
        },
        plotOptions: {
            bar: {
                columnWidth: "30%", // Adjust the width of the bars
                borderRadius: 5, // Apply rounded corners
                borderRadiusApplication: "end", // Apply radius only at the top of the bar
                borderRadiusWhenStacked: "last", // Ensure only the top of the stacked bar is rounded
                dataLabels: {
                    position: "top", // Position data labels at the top of the bar
                },
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
                "Projector screens",
                "Speaker cables",
                "HDMI cables",
                "HDMI active optic cables",
                "USB cables(active)",
                "Matrix",
                "Others",
            ],
            labels: {
                style: {
                    colors: "#000000", // Custom color for X-axis labels
                    fontFamily: "'Montserrat', sans-serif",
                },
                formatter: (value) => {
                    // Handle overflow by splitting into multiple lines
                    return value.length > 15 ? value.replace(/(.{15})/g, "$1\n") : value;
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => `${val} L`, // Add 'Lakh' suffix to Y-axis values
                style: {
                    colors: "#000000", // Custom color for X-axis labels
                    fontFamily: "'Montserrat', sans-serif",
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
        colors: ["#007BFF", "#007BFF4D"], // Custom bar colors
    };

    const chartSeries = [
        {
            name: "Target",
            data: [1, 2, 3, 6, 3, 1, 2], // Sample target data
        },
        {
            name: "Achieved",
            data: [3, 1, 2, 3, 6, 5, 1], // Sample achieved data
        },
    ];

    return (

        <div className="sales-target-vs-achieved" style={{ height: "470px", width: "100%" }}>
            {/* Adjust height by setting inline style */}
            <Chart options={chartOptions} series={chartSeries} type="bar" />
        </div>

    );
};

export default SalesTargetVSachieved;
