import React, { useState } from 'react';
import './Order.css';
import OrdersDetailsOnTable from './OrdersDetailsOnTable/OrdersDetailsOnTable';
import { Icons } from '../../../../../Icons/Icons';
const Order = ({ searchQuery }) => {
    const [visibleHeaders, setVisibleHeaders] = useState({
        orderId: true,
        salesId: true,
        status: true,
        company: true,
        contact: true,
        balance: true
    });
    const [hasCheckedItems, setHasCheckedItems] = useState(false);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedHeaders, setSelectedHeaders] = useState(visibleHeaders);
    const [tableSearchQuery, setTableSearchQuery] = useState('');

    const cardDetails = [
        {
            title: "Total Sales",
            value: "₹ 1,156,954.81",
            percentage: "+10%",
            color: "green",
        },
        {
            title: "Current month sales",
            value: "₹ 27,50,000",
            percentage: "-8%",
            color: "#FF0000",
        },
        {
            title: "Active Companies",
            value: "4483",
        },
        {
            title: "Pending orders",
            value: "₹ 13,76,494",
            percentage: "+10%",
            color: "green",
        }
    ];

    const companies = [
        {
            "orderId": "HUSO-2425-805888",
            "salesId": 'Seema Rani',
            status: 'wide',
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
            balance: '₹ 73,750.00'
        },
        {
            "orderId": "HUSO-2425-805888",
            "salesId": 'Asha Rani',
            status: 'rejected',
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
            balance: '₹ 73,750.00'
        },
        {
            "orderId": "HUSO-2425-805888",
            "salesId": 'Asha Rani',
            status: 'approved',
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
            balance: '₹ 73,750.00'
        },
    ]

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
        setTableSearchQuery(event.target.value);
    };

    const filteredCompanies = companies.filter(company => {
        const searchTerm = tableSearchQuery.toLowerCase();
        return (
            company.orderId.toLowerCase().includes(searchTerm) ||
            company.salesId.toLowerCase().includes(searchTerm) ||
            company.companyName.toLowerCase().includes(searchTerm) ||
            company.details.id.toLowerCase().includes(searchTerm) ||
            company.details.type.toLowerCase().includes(searchTerm) ||
            company.details.location.toLowerCase().includes(searchTerm) ||
            company.contacts.some(contact => contact.toLowerCase().includes(searchTerm)) ||
            company.balance.toLowerCase().includes(searchTerm)
        );
    });


    return (
        <>
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
                            value={tableSearchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    <img onClick={() => setShowPopup(true)} src={Icons.table_toggler} alt="icon" style={{ width: 30, height: 30, cursor: "pointer" }} />
                </div>
            </div>
            <OrdersDetailsOnTable searchQuery={searchQuery} companies={filteredCompanies} onCheckChange={setHasCheckedItems} onHeadersData={handleHeadersData} visibleHeaders={visibleHeaders} />
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

    );
}

export default Order
