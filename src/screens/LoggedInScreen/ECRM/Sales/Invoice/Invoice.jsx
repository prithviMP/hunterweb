import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Icons } from "../../../../../Icons/Icons";
import "./Invoice.css";
const Invoice = () => {
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
            title: "Effective Sales Revenue",
            value: "4483",
        },
        {
            title: "Unique Dealer",
            value: "0",
        },
    ];
    const InvoiceData = [
        {
            title: "FOC Quantity",
            value: "0",

        },
        {
            title: "FOC Value",
            value: "₹0",

        },
        {
            title: "RMA Quantity",
            value: "0",

        },
        {
            title: "RMA Value",
            value: "₹0",

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
            enabled: false,
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
                "Asha Rani",
                "Uma Devi",
                "Sangeetha Velu",
                "Atul Gupta",
                "PrithviRaj Pillai",
                "Bibhu Prasad (PB)",
                "Somesh Srivastava",
                "Test Account",
                "Sanjib Bose",
                "Soumya Nayak",
                "Sumit Jaiswal",
                "Saritha Balraj"
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
                formatter: (val) => `${val.toFixed(1)} L`, // Changed to 1 decimal place
                style: {
                    colors: "#4A4A4A",
                    fontFamily: "var(--manrope)",
                },
            },
            tickAmount: 6, // Add this to control number of y-axis ticks
            min: 0, // Start from 0
            max: 2.4, // End at 5
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
            data: [0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.1, 2.2, 2.1, 2.0, 0.4, 1.8], // Sample target data
        },

    ];

    const invoiceSalesProducts = [
        {
            "salesId": 'Seema Rani',
            "status": 'wide',
            "invoiceNumber": 'INV-2024-0001',
            "invoiceDate": '2024-01-01',
            "dueDate": '2024-01-01',
            "contacts": [
                "Zameer Ahmed"
            ],
            "companyName": "Param Computer And Total Solution",
            "details": {
                "id": "HUPAV81458",
                "type": "AV Channel Partner",
                "location": "Raipur, Chattisgarh",
                "membership": "Hunter Club Joined"
            },
            "product": "HP Pavilion 14-dv0000TU",
            "unitRate": "₹ 1,156,954.81",
            "taxableAmount": "₹ 1,156,954.81",
            "quantity": "0",
            "effectiveSalesRevenue": "0",
            "totalCredits": "0",
            "receiptAmount": "0",
            "creditBalance": "₹0 ",
            "days": 0,


            "actions": {
                "ledger": true,
                "salesGraph": true,
                "kyc": true
            },
            balance: '₹ 73,750.00'
        },
        {
            "salesId": 'Seema Rani',
            "status": 'wide',
            "invoiceNumber": 'INV-2024-0001',
            "invoiceDate": '2024-01-01',
            "dueDate": '2024-01-01',
            "contacts": [
                "Zameer Ahmed"
            ],
            "companyName": "Param Computer And Total Solution",
            "details": {
                "id": "HUPAV81458",
                "type": "AV Channel Partner",
                "location": "Raipur, Chattisgarh",
                "membership": "Hunter Club Joined"
            },
            "product": "HP Pavilion 14-dv0000TU",
            "unitRate": "₹ 1,156,954.81",
            "taxableAmount": "₹ 1,156,954.81",
            "quantity": "10",
            "effectiveSalesRevenue": "10",
            "totalCredits": "10",
            "receiptAmount": "10",
            "creditBalance": "₹0 ",
            "days": 0,


            "actions": {
                "ledger": true,
                "salesGraph": true,
                "kyc": true
            },
            balance: '₹ 73,750.00'
        },

    ];

    const [hasCheckedItems, setHasCheckedItems] = useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        Array(invoiceSalesProducts.length).fill(false)
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const totalPages = Math.ceil(invoiceSalesProducts.length / itemsPerPage);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const triggerDownload = () => {
        console.log("Downloading...");
    };


    const handleSelectAll = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
        setCheckedItems(Array(invoiceSalesProducts.length).fill(newCheckedState));

        // Notify parent component about the change
        setHasCheckedItems(newCheckedState);
    };

    const handleIndividualCheck = (index) => {
        const newCheckedItems = {
            ...checkedItems,
            [index]: !checkedItems[index]
        };
        setCheckedItems(newCheckedItems);

        // Notify parent if any items are checked
        const hasChecked = Object.values(newCheckedItems).some(value => value);
        setHasCheckedItems(hasChecked);
    };

    // Pagination logic
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = invoiceSalesProducts.slice(startIndex, startIndex + itemsPerPage);


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
        setActiveDropdown(activeDropdown === index ? null : index);
    };




    return (
        <>
            <div className="invoice-main-container">
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

                <div className="details-on-small-card-container mt-15" >
                    {InvoiceData.map((card, index) => (
                        <div key={index} className="card  border-radius box-shadow">
                            <div className="card-header">
                                <span className="card-title">{card.title}</span>
                            </div>
                            <p className="card-value">{card.value}</p>
                        </div>
                    ))}
                </div>
                <div className="sales-target-vs-achieved">
                    <div className="pricelist-chart">
                        <div className="pricelist-chart-header">
                            <div className="pricelist-chart-header-left">
                                <h1>Unique Partners & Revenue</h1>
                            </div>
                            <div className="pricelist-chart-header-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div className="pricelist-chart-header-right-left">
                                    <button className="download-button border-radius" style={{ backgroundColor: '#F5F7FA', color: '#007BFF' }} onClick={triggerDownload} >
                                        <span style={{ position: "relative", top: -5 }}>Download <img src={Icons.download_icon} alt="" /></span> </button>
                                </div>
                                <div className="pricelist-chart-header-right-right">
                                    <img src={Icons.table_toggler} alt="arrow-down" />
                                </div>
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
                        <div className="pricelist-chart-footer">
                            <div className="pricelist-chart-footer-left">
                                <div className="pricelist-legend-items">
                                    <div className="pricelist-legend-item">
                                        <span className="pricelist-legend-dot" style={{ backgroundColor: '#00BFA5' }}></span>
                                        <span className="pricelist-legend-text">No. of Invoices</span>
                                    </div>
                                    <div className="pricelist-legend-item">
                                        <span className="pricelist-legend-dot" style={{ backgroundColor: '#28A745' }}></span>
                                        <span className="pricelist-legend-text">Unique Partners</span>
                                    </div>
                                    <div className="pricelist-legend-item">
                                        <span className="pricelist-legend-dot" style={{ backgroundColor: '#FF8800' }}></span>
                                        <span className="pricelist-legend-text">Revenue</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-section-main-div" style={{ display: 'flex', gap: 10 }}>
                <button className="company-management-button commonButtonCss" style={{ width: 130 }}>
                    <span style={{ paddingRight: 5 }}>
                        <img src={Icons.filter_icon} alt="filter icon" />
                    </span> Add Filter
                </button>
                {hasCheckedItems && (
                    <button className="company-management-button commonButtonCss" style={{ width: 100, backgroundColor: "var(--red-color" }}>
                        <span style={{ paddingRight: 5 }}>
                            <img src={Icons.delete_icon} alt="filter icon" />
                        </span> Delete
                    </button>
                )}
            </div>
            <div className="company-management-container" style={{ marginTop: -10 }}>
                <div className="company-management-table invoice-table-css"
                    style={{ overflowX: 'auto' }}>
                    <table
                        className="box-shadow border-radius" style={{ minWidth: '230%' }}
                    >
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                            <tr>
                                <th style={{ width: 80 }}>
                                    <input style={{ marginLeft: 47 }} type="checkbox" onChange={handleSelectAll} />
                                </th>
                                <th style={{ width: 150 }}>Sales ID</th>
                                <th style={{ width: 80 }}>Status</th>
                                <th style={{ width: 180 }}>Invoice Number</th>
                                <th style={{ width: 180 }}>Invoice Date</th>
                                <th style={{ width: 150 }}>Due Date</th>
                                <th style={{ width: 200 }}>Contacts</th>
                                <th style={{ width: 400 }}>Company</th>
                                <th style={{ width: 300 }}>Product</th>
                                <th style={{ width: 150 }}>Unit Rate</th>
                                <th style={{ width: 180 }}>Taxable Amount</th>
                                <th style={{ width: 150 }}>Quantity</th>
                                <th style={{ width: 250 }}>Effective Sales Revenue</th>
                                <th style={{ width: 150 }}>Total Credits</th>
                                <th style={{ width: 150 }}>Receipt Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((company, index) => (
                                <tr key={index}>
                                    <td className="relative">
                                        <span
                                            onClick={(e) => handleEllipsisClick(index, e)}
                                            style={{
                                                color: 'var(--black-color)',
                                                fontSize: 25,
                                                fontWeight: 800,
                                                position: 'relative',
                                                bottom: 9,
                                                cursor: 'pointer',
                                                marginLeft: 5
                                            }}
                                        >
                                            ...
                                        </span>
                                        {activeDropdown === index && (
                                            <div className="orderDetailsSalesPage-dropdown-menu" style={{ width: 180 }}>
                                                <button style={{ color: 'var(--black-color)' }} onClick={() => console.log('Create Quote')}>Create Quote</button>
                                                <div className="orderDetailsSalesPage-dropdown-submenu">
                                                    <button style={{ color: 'var(--black-color)' }}>Send Payment Link</button>
                                                    <div className="orderDetailsSalesPage-submenu-content">
                                                        <button onClick={() => handleWhatsAppClick(company)}>
                                                            <img src={Icons.whatsapp_icon} alt="WhatsApp icon" /> <span style={{ color: 'var(--black-color)' }}>WhatsApp</span>
                                                        </button>
                                                        <button onClick={() => handleEmailClick(company)}>
                                                            <img src={Icons.email_icon} alt="Email icon" /> E-mail
                                                        </button>
                                                    </div>
                                                </div>
                                                <button onClick={() => console.log('Delete')} className="orderDetailsSalesPage-delete-option">
                                                    <img src={Icons.trash_icon} alt="icon" className="orderDetailsSalesPage-delete-icon" /> Delete
                                                </button>
                                            </div>
                                        )}
                                        <input style={{ marginLeft: 20 }}
                                            type="checkbox"
                                            checked={checkedItems[startIndex + index]}
                                            onChange={() => handleIndividualCheck(startIndex + index)}
                                        />
                                    </td>
                                    <td>{company.salesId}</td>
                                    <td>
                                        {company.status === 'wide' && <img src={Icons.wide} alt="icon" />}
                                        {company.status === 'approved' && <img src={Icons.approved} alt="icon" />}
                                        {company.status === 'rejected' && <img src={Icons.rejected} alt="icon" style={{ width: 35, height: 35 }} />}
                                    </td>
                                    <td>{company.invoiceNumber}</td>
                                    <td>{company.invoiceDate}</td>
                                    <td>{company.dueDate}</td>
                                    <td>{company.contacts}</td>
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                            <span className="black-color font-weight_600" style={{ fontSize: 20 }}>
                                                {company.companyName}
                                            </span>
                                            <div>
                                                {company.details.id}{" "}
                                                <span
                                                    className="black-color"
                                                    style={{
                                                        backgroundColor: "#EEEEEE",
                                                        borderRadius: 10,
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    {company.details.type}
                                                </span>
                                            </div>
                                            <span className="black-color font-weight_600">
                                                {company.details.location}
                                            </span>
                                            <span
                                                style={{
                                                    backgroundColor: company.status === 'wide' ? "#5DB947" : "#EF4444",
                                                    color: "#FFF",
                                                    width: 140,
                                                    textAlign: "center",
                                                    fontWeight: "400",
                                                }}
                                                className="border-radius"
                                            >
                                                Hunter Club Joined
                                            </span>
                                            <span className="border border-radius credit-balance flex">
                                                <span className="black-color">Credit Balance</span>
                                                <span>
                                                    <span className="black-color font-weight_600">
                                                        {company.creditBalance}
                                                    </span>{" "}
                                                    {company.days} days
                                                </span>{" "}
                                            </span>
                                            <div className="flex" style={{ width: 276 }}>
                                                <img src={Icons.ledger_icon} alt="ledger_icon" />
                                                <img
                                                    src={Icons.sales_graph_icon}
                                                    alt="sales_graph_icon"
                                                />
                                                <img src={Icons.KYC_icon} alt="KYC_icon" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{company.product}</td>
                                    <td>{company.unitRate}</td>
                                    <td>{company.taxableAmount}</td>
                                    <td>{company.quantity}</td>
                                    <td>{company.effectiveSalesRevenue}</td>
                                    <td>{company.totalCredits}</td>
                                    <td>{company.receiptAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>


        </>
    );
};

export default Invoice;
