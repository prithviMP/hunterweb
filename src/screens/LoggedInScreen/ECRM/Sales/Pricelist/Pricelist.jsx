import React, { useState } from "react";
import "./Pricelist.css"; // Import the CSS file
import Chart from "react-apexcharts";
import { Icons } from "../../../../../Icons/Icons";

const Pricelist = () => {
  const allProducts = [
    {
      product: {
        name: "Hunter 4K HDMI over HdBaseT Extender 150",
        modal: "9430-HUS-150HdE4K",
        Meters: "₹1,10,000",
        HSN: "85437099",
        warranty: "1 Year"
      },
      mrp: "₹1,10,000",
      customer: "₹54,500",
      dealer: "₹33,150",
      stock: "100"
    },
    {
      product: {
        name: "Hunter 4K HDMI over HdBaseT Extender 150",
        modal: "9430-HUS-150HdE4K",
        Meters: "₹1,10,000",
        HSN: "85437099",
        warranty: "1 Year"
      },
      mrp: "₹1,10,000",
      customer: "₹54,500",
      dealer: "₹33,150",
      stock: "100"
    },
    {
      product: {
        name: "Hunter 4K HDMI over HdBaseT Extender 150",
        modal: "9430-HUS-150HdE4K",
        Meters: "₹1,10,000",
        HSN: "85437099",
        warranty: "1 Year"
      },
      mrp: "₹1,10,000",
      customer: "₹54,500",
      dealer: "₹33,150",
      stock: "100"
    },
    {
      product: {
        name: "Hunter 4K HDMI over HdBaseT Extender 150",
        modal: "9430-HUS-150HdE4K",
        Meters: "₹1,10,000",
        HSN: "85437099",
        warranty: "1 Year"
      },
      mrp: "₹1,10,000",
      customer: "₹54,500",
      dealer: "₹33,150",
      stock: "100"
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [threeDotdropdown, setThreeDotdropdown] = useState(null);
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const cardDetails = [
    {
      title: "Stock",
      value: "₹ 1,156,954.81",
      percentage: "+10%",
      color: "green",
    },
    {
      title: "Value",
      value: "₹ 27,50,000",
      percentage: "-8%",
      color: "#FF0000",
    },
    {
      title: "Low Stock Items",
      value: "4483",
    },

  ];

  const chartOptions = {
    chart: {
      type: "bar", // Column chart
      height: 300,
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
      enabled: true,
      formatter: (val) => `${val} L`, // Format the value displayed
      style: {
        fontSize: "12px",
        colors: ["#4A4A4A"], // Set text color
        fontFamily: "var(--manrope)",
        fontWeight: "var(--extra-semi-bold)",
      },
      offsetY: -20, // Position the labels above the bars
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    xaxis: {
      categories: [
        "Audio Connectors",
        "Audio Extractor",
        "Cables",
        "HDMI & KVM Extender",
        "HDMI Active Optic Cables",
        "HDMI Cables",
        "HDMI Splitter",
        "HDMI Switcher",
        "KVM Switch",
        "Matrix",
        "Microphone Cable",
        "Project Lift"
      ],
      labels: {
        style: {
          colors: "#000000", // Custom color for X-axis labels
          fontFamily: "var(--montserrat)",
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
          colors: "#4A4A4A", // Custom color for X-axis labels
          fontFamily: "var(--manrope)",
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
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 200, // Adjust height for smaller screens
          },
        },
      },
    ],
    colors: ["#007BFF"], // Custom bar colors
  };

  const chartSeries = [
    {
      name: "Target",
      data: [8.5, 14, 16, 3.7, 11.3, 6.6, 9, 11, 2.5, 7.5, 25.9, 5], // Sample target data
    },

  ];




  // Pagination logic
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allProducts.slice(startIndex, startIndex + itemsPerPage);


  const renderPagination = () => {
    const paginationButtons = [];

    // Add "Previous" button
    paginationButtons.push(
      <button
        key="prev"
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {<img src={Icons.chevron_left} style={{ width: 8, height: 12 }} />}
      </button>
    );

    // Add numbered buttons
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Show current, previous, and next pages
      ) {
        paginationButtons.push(
          <button
            key={i}
            className={`pagination-button ${i === currentPage ? "active" : ""
              }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || // Add ellipsis before current page
        (i === currentPage + 2 && currentPage < totalPages - 2) // Add ellipsis after current page
      ) {
        paginationButtons.push(
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    // Add "Next" button
    paginationButtons.push(
      <button
        key="next"
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {<img src={Icons.chevron_right} style={{ width: 8, height: 12 }} />}
      </button>
    );

    return paginationButtons;
  };

  const handleEllipsisClick = (index, event) => {
    event.stopPropagation(); // Prevent click from bubbling up
    setThreeDotdropdown(threeDotdropdown === index ? null : index);
  };

  return (
    <div className="price-list-main-container">
      <div className="details-on-small-card-container mt-15" >
        {cardDetails.map((card, index) => (
          <div key={index} className="card  border-radius box-shadow">
            <div className="card-header">
              <span className="card-title">{card.title}</span>
              {card.dateRange && <span className="card-date">{card.dateRange}</span>}
            </div>
            <p className="card-value">{card.value}</p>
            {card.percentage && (
              <div className="card-footer">
                <span
                  className="card-percentage"
                  style={{ color: card.color === "green" ? "green" : "red" }}
                >
                  {card.percentage}
                </span>
                <span className="since-last-month">since last month</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sales-target-vs-achieved">
        <div className="pricelist-chart">
          <div className="pricelist-chart-header">
            <div className="pricelist-chart-header-left">
              <h1>Stock Distribution</h1>
            </div>
            <div className="pricelist-chart-header-right">
              <img src={Icons.table_toggler} alt="arrow-down" />
            </div>
          </div>
          <div style={{ height: "440px", width: "100%" }}>
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
      </div>

      <div className="company-management-container" style={{ width: '100%' }}>

        <h2 className="commonHeaderDashboard">Products List</h2>

        <div className="company-management-table" style={{ marginTop: -15, width: 'calc(100% - 15px)' }}>
          <table className="box-shadow border-radius company-management-table-css">

            <thead>
              <tr>
                <th style={{ width: 70 }}><input style={{ marginLeft: 47 }} type="checkbox" /></th>
                <th>Image</th>
                <th style={{ width: 80 }}>Product</th>
                <th>MRP</th>
                <th>Customer(+GST)</th>
                <th>Dealer(+GST)</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>

              {currentItems.map((log, index) => (
                <tr key={index}>

                  <td style={{ position: 'relative' }}><span style={{ position: 'relative', top: -5, right: 5, left: 10, cursor: 'pointer', fontSize: 25 }}
                    onClick={(e) => handleEllipsisClick(index, e)}>...</span><input style={{ marginLeft: 30 }} type="checkbox" />
                    {threeDotdropdown === index && (
                      <div className="dropdown-menu">
                        <button onClick={() => console.log('Create Quote')}>Create Quote</button>
                        <button onClick={() => console.log('Log a call')}>Log a call</button>
                        <button onClick={() => console.log('Delete')} className="delete-option">Delete</button>
                      </div>
                    )}
                  </td>
                  <td><img src={Icons.product_image} alt="product-image" style={{ width: 50, height: 45 }} /></td>
                  <td style={{ width: 300 }}>
                    <p className="product-modal" >Modal {log.product.modal}</p>
                    <p className="product-name"> {log.product.name}</p>
                    <p className="product-meters">Meters- {log.product.Meters}</p>
                    <div className="product-hsn-warranty">
                      <p className="product-hsn">HSN: {log.product.HSN}</p>
                      <p className="product-warranty">Warranty: {log.product.warranty}</p>
                    </div>
                  </td>
                  <td>{log.mrp}</td>
                  <td>{log.customer}</td>
                  <td>{log.dealer}</td>
                  <td>{log.stock}</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      {/* Pagination Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -5, paddingBottom: 10 }}>
        <div className="call-manager-row-per-page">
          <span style={{ fontSize: 14, fontFamily: 'var(--manrope)', fontWeight: 'var(--extra-semi-bold)' }}>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="pagination-container" style={{ marginTop: -10, marginRight: 12 }}>{renderPagination()}</div>
      </div>
    </div>
  );
};

export default Pricelist;
