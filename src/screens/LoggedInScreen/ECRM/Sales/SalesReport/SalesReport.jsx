import React, { useState, useRef, useEffect } from "react";
import "./SalesReport.css"; // Import the CSS file
import MonthSelectDropdown from "../../../../../componant/MonthSelectDropdown/MonthSelectDropdown";
import { Icons } from "../../../../../Icons/Icons";
import SalesInfoCards from "./SalesInfoCards/SalesInfoCards";
import MonthlySalesGraph from "./MonthlySalesGraph/MonthlySalesGraph";
import YearSelectList from "./YearSelectList/YearSelectList";
import TopBilledPartners from "./TopBilledPartners/TopBilledPartners";
import TopBilledProducts from "./TopBilledProducts/TopBilledProducts";

const SalesReport = ({ searchQuery }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');


    const handleMonthSelect = (month) => {
        setSelectedMonth(month);  // Set the selected month in the parent state
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year)
    }

    const partnerData = [
        {
            name: 'Nt N-Tech Solutions Pvt Ltd (sales)',
            location: 'Bengaluru, Karnataka',
            revenue: '10',
        },

        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
        {
            name: 'ABC Solutions Pvt Ltd (sales)',
            location: 'Mumbai, Maharashtra',
            revenue: '₹45,000.00',
        },
    ];

    const productData = [
        {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        },
        {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        }, {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        }, {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        }, {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        }, {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        }, {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        }, {
            name: 'Hunter Faceplate (HDMI x1) L-Type Connector Metal SS-9292',
            quentity: '10',
        },

    ];


    const handleViewAll = () => {
        console.log('View all partners clicked');
    };


    const graphDownloadRef = useRef(null);

    const triggerDownload = () => {
        if (graphDownloadRef.current) {
            graphDownloadRef.current(); // Trigger the graph's download function
        }
    };


    // Handle the deletion of a request
    const handleDeleteRequest = (index) => {
        alert("deleted successfully")
    };

    return (
        <div className="sales-page-main-container">

            <>
                <div className="filter-section-sales">
                    <div className="month-filter mt-10">
                        <MonthSelectDropdown onMonthSelect={handleMonthSelect} Icons={Icons} />
                    </div>
                    <div className="select-region-and-select-sales-id-section">
                        <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                            {/* Dropdown for Region */}
                            <div className="dropdown" style={{ backgroundColor: "#007bff", borderRadius: 26, padding: "0px 10px" }}>
                                <select className="dropdown-select" >
                                    <option value="">Select region</option>
                                    <option value="region1">North Region</option>
                                    <option value="region2">South Region</option>
                                    <option value="region3">East Region</option>
                                    <option value="region4">West Region</option>
                                </select>
                                <img src={Icons.arrow_down_white} alt="Arrow Down" style={{ width: 20, height: 10, marginLeft: 5 }} />
                            </div>

                            {/* Dropdown for Sales ID */}
                            <div className="dropdown" style={{ backgroundColor: "#007bff", borderRadius: 26, padding: "0px 10px" }}>
                                <select className="dropdown-select" >
                                    <option value="">Select sales ID</option>
                                    <option value="sales2">Sales ID 002</option>
                                    <option value="sales3">Sales ID 003</option>
                                    <option value="sales4">Sales ID 004</option>
                                </select>
                                <img src={Icons.arrow_down_white} alt="Arrow Down" style={{ width: 20, height: 10, marginLeft: 5 }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sales-information-card-section">
                    <SalesInfoCards searchQuery={searchQuery} />
                </div>

                <div className="sales-monthly-graph border-radius">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                        <h2 className="commonHeaderDashboard">Monthly Sales</h2>
                        <div style={{ display: 'flex', gap: 10, paddingLeft: 10, height: 51 }} className="mt-5 border-radius">
                            <YearSelectList onYearSelect={handleYearSelect} Icons={Icons} />
                            <button className="download-button border-radius" style={{ backgroundColor: '#F5F7FA', color: '#007BFF' }} onClick={triggerDownload} >
                                <span style={{ position: "relative", top: -5 }}>Download <img src={Icons.download_icon} alt="" /></span> </button>
                        </div>
                    </div>

                    <MonthlySalesGraph downloadGraph={(downloadFn) => (graphDownloadRef.current = downloadFn)} searchQuery={searchQuery} />
                    <span className="monthlyGraphNoteText"><strong>Note:</strong>The amount are in Lakhs</span>
                </div>

                <div className="top-billed-partner-main-section mt-15" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginRight: 15 }}>
                    <div className="top-billed-partner" style={{ flex: 1 }}>
                        <TopBilledPartners data={partnerData} onViewAll={handleViewAll} searchQuery={searchQuery} />
                    </div>
                    <div className="top-build-product" style={{ flex: 1 }}>
                        <TopBilledProducts data={productData} onViewAll={handleViewAll} searchQuery={searchQuery} />
                    </div>
                </div>
            </>

        </div>
    );
};

export default SalesReport;