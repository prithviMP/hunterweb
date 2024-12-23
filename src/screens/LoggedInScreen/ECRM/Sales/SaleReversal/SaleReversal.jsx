import React, { useEffect, useState } from 'react';
import "./SaleReversal.css";
import { Icons } from '../../../../../Icons/Icons';
import SaleReversalTable from './SaleReversalTable/SaleReversalTable';

const SaleReversal = ({ searchQuery }) => {
    const cardDetails = [
        {
            title: "Total Count",
            value: "300",
        },

        {
            title: "Value",
            value: "₹69,94,569",
        }
    ];

    const companies = [
        {
            "createdBy": "Shreepriya Gupta",
            "status": 'Verified',
            "invoiceNumber": "HUSO-2425-805888",

            "companyName": "Param Computer And Total Solution",
            "details": {
                "id": "HUPAV81458",
                "type": "AV Channel Partner",
                "location": "Raipur, Chattisgarh",
                "membership": "Hunter Club Joined"
            },
            "creditBalance": "₹0 ",
            "days": 0,
            "contacts": [
                "Zameer Ahmed"
            ],

            "actions": {
                "ledger": true,
                "salesGraph": true,
                "kyc": true
            },
            "unpaidInvoice": "₹3000 ",
            "paymentStatus": "Receipt created"
        },
        {
            "createdBy": "Seema Rani",
            "status": 'Created',
            "invoiceNumber": "HUSO-2425-805888",

            "companyName": "Param Computer And Total Solution",
            "details": {
                "id": "HUPAV81458",
                "type": "AV Channel Partner",
                "location": "Raipur, Chattisgarh",
                "membership": "Hunter Club Joined"
            },
            "creditBalance": "₹0 ",
            "days": 0,
            "contacts": [
                "Zameer Ahmed"
            ],

            "actions": {
                "ledger": true,
                "salesGraph": true,
                "kyc": true
            },
            "unpaidInvoice": "₹3000 ",
            "paymentStatus": "Invoice Created"
        },
        {
            "createdBy": "Seema Rani",
            "status": 'Void',
            "invoiceNumber": "HUSO-2425-805888",

            "companyName": "Param Computer And Total Solution",
            "details": {
                "id": "HUPAV81458",
                "type": "AV Channel Partner",
                "location": "Raipur, Chattisgarh",
                "membership": "Hunter Club Joined"
            },
            "creditBalance": "₹0 ",
            "days": 0,
            "contacts": [
                "Zameer Ahmed"
            ],

            "actions": {
                "ledger": true,
                "salesGraph": true,
                "kyc": true
            },
            "unpaidInvoice": "₹3000 ",
            "paymentStatus": "Paid"
        },
        {
            "createdBy": "Atul Gupta",
            "status": 'Approved',
            "invoiceNumber": "HUSO-2425-805888",

            "companyName": "Param Computer And Total Solution",
            "details": {
                "id": "HUPAV81458",
                "type": "AV Channel Partner",
                "location": "Raipur, Chattisgarh",
                "membership": "Hunter Club Joined"
            },
            "creditBalance": "₹0 ",
            "days": 0,
            "contacts": [
                "Zameer Ahmed"
            ],

            "actions": {
                "ledger": true,
                "salesGraph": true,
                "kyc": true
            },
            "unpaidInvoice": "₹3000 ",
            "paymentStatus": "Paid"
        },
    ]
    const handleDownload = () => {
        console.log("download");
    }
    const [visibleHeaders, setVisibleHeaders] = useState({
        createdBy: true,
        status: true,
        invoiceNumber: true,
        company: true,
        unpaidInvoice: true,
        paymentStatus: true
    });
    const [hasCheckedItems, setHasCheckedItems] = useState(false);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedHeaders, setSelectedHeaders] = useState(visibleHeaders);
    const [saleReversalSearchQuery, setSaleReversalSearchQuery] = useState('');

    const handleHeadersData = (headers) => {
        setTableHeaders(headers);
        // Initialize visible headers
        const initialVisible = headers.reduce((acc, header) => {
            if (header.id !== 'checkbox') {
                acc[header.id] = true;
            }
            return acc;
        }, {});
        setVisibleHeaders(initialVisible);
    };

    const handleApply = () => {
        setVisibleHeaders(selectedHeaders);
        setShowPopup(false);
    };

    const handleSearch = (event) => {
        setSaleReversalSearchQuery(event.target.value);
    };


    const filteredCompanies = companies.filter(company => {
        const searchTerm = saleReversalSearchQuery.toLowerCase() || searchQuery?.toLowerCase();
        return (
            company.createdBy.toLowerCase().includes(searchTerm) ||
            company.status.toLowerCase().includes(searchTerm) ||
            company.invoiceNumber.toLowerCase().includes(searchTerm) ||
            company.companyName.toLowerCase().includes(searchTerm) ||
            company.details.id.toLowerCase().includes(searchTerm) ||
            company.details.type.toLowerCase().includes(searchTerm) ||
            company.details.location.toLowerCase().includes(searchTerm) ||
            company.unpaidInvoice.toLowerCase().includes(searchTerm) ||
            company.paymentStatus.toLowerCase().includes(searchTerm)
        );
    });
    return (
        <>
            <div className="details-on-small-card-container mt-15" >
                <div className="create_so_and_download_button_sales_page">
                    <button className="commonButtonCss" style={{ height: 38 }}> <span style={{ fontSize: 20, fontWeight: 500, paddingRight: 5, position: "relative", top: -2 }}>+</span> <span style={{ position: "relative", top: -5 }}>Create SO</span></button>
                    <button onClick={handleDownload} className="commonButtonCss" style={{ backgroundColor: "#FFF", color: "var(--primary-color)", position: "relative", bottom: 4, marginLeft: 5 }}>Download <img src={Icons.download_icon} alt="icon" /></button>
                </div>
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

                            </div>
                        )}
                    </div>
                ))}

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: 15 }}>
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
                <div className="search-in-table-sales-order-page">
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <img
                            style={{
                                position: "absolute",
                                left: "12px",
                                width: "16px",
                                height: "16px",
                                filter: "brightness(0) saturate(100%) invert(71%) sepia(5%) saturate(0%) hue-rotate(155deg) brightness(89%) contrast(86%)"
                            }}
                            src={Icons.search_icon}
                            alt="icon"
                        />
                        <input
                            style={{
                                paddingLeft: "35px",
                                paddingRight: "12px",
                                height: "36px",
                                width: "250px",
                                border: "1px solid #E5E7EB",
                                borderRadius: "20px",
                                fontSize: "14px",
                                fontFamily: "var(--manrope)"
                            }}
                            type="text"
                            placeholder='Search in table'
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    <img onClick={() => setShowPopup(true)} src={Icons.table_toggler} alt="icon" style={{ width: 30, height: 30, cursor: "pointer" }} />
                </div>
            </div>
            <SaleReversalTable companies={filteredCompanies} onCheckChange={setHasCheckedItems} onHeadersData={handleHeadersData} visibleHeaders={visibleHeaders} />
            {showPopup && (
                <div className="sales-order-popup-overlay">
                    <div className="sales-order-popup-content">
                        <div className="sales-order-popup-header">
                            <h3 style={{ fontFamily: 'var(--montserrat)' }}>Customize Columns</h3>
                            <button
                                className="sales-order-close-btn"
                                onClick={() => setShowPopup(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="sales-order-popup-body">
                            {tableHeaders.map(header => (
                                header.id !== 'checkbox' && (
                                    <div key={header.id} className="sales-order-header-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedHeaders[header.id] ?? true}
                                                onChange={() => {
                                                    setSelectedHeaders(prev => ({
                                                        ...prev,
                                                        [header.id]: !prev[header.id]
                                                    }));
                                                }}
                                            />
                                            <span style={{
                                                fontFamily: 'var(--montserrat)',
                                                fontSize: '14px'
                                            }}>
                                                {header.label}
                                            </span>
                                        </label>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="sales-order-popup-footer">

                            <button
                                className="sales-order-apply-btn"
                                onClick={handleApply}
                                style={{ fontFamily: 'var(--montserrat)' }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>


    )
}

export default SaleReversal