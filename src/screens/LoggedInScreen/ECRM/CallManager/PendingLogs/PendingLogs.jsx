import React, { useState, useEffect } from "react";
import "../AllCallLogs/AllCallLogs.css"; // Import the CSS file
import { Icons } from "../../../../../Icons/Icons";
import { generatePaginationButtons } from "../../../../../utils/paginationServices";

const PendingLogs = () => {
    // Sample data - split into two arrays
    const allPendingLogs = [
        {
            date: "02/12/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            comment: 'Next month will confirm the order'
        },
        {
            date: "02/08/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            comment: 'Next month will confirm the order'
        },
        {
            date: "02/03/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            comment: 'Next month will confirm the order'
        },
        {
            date: "02/02/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            comment: 'Next month will confirm the order'
        },
        {
            date: "02/01/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            comment: 'Next month will confirm the order'
        },
    ];

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const totalPages = Math.ceil(allPendingLogs.length / itemsPerPage);
    const [threeDotdropdown, setThreeDotdropdown] = useState(null);

    // Modal states
    const [showColumnPopup, setShowColumnPopup] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({
        Date: true,
        Duration: false,
        Type: true,
        CompanyName: true,
        ContactName: true,
        SalesID: true,
        comment: true
    });

    // Add state for date filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleColumnChange = (column) => {
        setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
    };

    // Pagination logic
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allPendingLogs
        .filter(log => {
            const logDate = new Date(log.date.split('/').reverse().join('-')); // Convert to YYYY-MM-DD format
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            console.log('Log Date:', logDate, 'Start Date:', start, 'End Date:', end); // Debugging

            return (!startDate || logDate >= start) && (!endDate || logDate <= end);
        })
        .slice(startIndex, startIndex + itemsPerPage);

    // Render pagination buttons
    const renderPagination = () => {
        return generatePaginationButtons(currentPage, totalPages, handlePageChange);
    };

    const handleEllipsisClick = (index, event) => {
        event.stopPropagation(); // Prevent click from bubbling up
        setThreeDotdropdown(threeDotdropdown === index ? null : index);
    };

    // Add click handler to close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setThreeDotdropdown(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="call-manager" style={{ marginTop: 10 }}>
            <div className="call-manager-filters">
                <div className="call-manager-filter-section-main-div">
                    <button className="commonButtonCss" style={{ width: 130 }}>
                        <span style={{ paddingRight: 5 }}>
                            <img src={Icons.filter_icon} alt="filter icon" />
                        </span> Add Filter
                    </button>
                </div>
                <div className="call-manager-date-filters">
                    <div className="call-manager-date-input-wrapper">
                        <label>From</label>
                        <input 
                            type="date" 
                            placeholder="dd-mm-yyyy" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} // Update start date
                        />
                        <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
                    </div>
                    <div className="call-manager-date-input-wrapper">
                        <label>To</label>
                        <input 
                            type="date" 
                            placeholder="dd-mm-yyyy" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} // Update end date
                        />
                        <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
                    </div>
                    <div className="call-manager-table-customize-icon">
                        <img src={Icons.table_toggler} alt="table customize" onClick={() => setShowColumnPopup(true)} />
                    </div>
                </div>
            </div>

            <div className="company-management-container">
                <div className="company-management-table company-management-table-css"  style={{ marginTop: -30, width: '100%', overflowX: 'auto' }}>
                    <table className="box-shadow border-radius" style={{ width: '120%' }}>

                        <thead>
                            <tr>

                                <th style={{ width: 70 }}><input style={{ marginLeft: 47 }} type="checkbox" /></th>
                                {columnVisibility.Date && <th>Call Date</th>}
                                {columnVisibility.Duration && <th>Call Duration</th>}
                                {columnVisibility.Type && <th style={{ width: 80 }}>Call Type</th>}
                                {columnVisibility.CompanyName && <th>Company Name</th>}
                                {columnVisibility.ContactName && <th>Contact Name</th>}
                                {columnVisibility.SalesID && <th>Sales ID</th>}
                                {columnVisibility.comment && <th>Comment</th>}

                            </tr>
                        </thead>

                        <tbody>

                            {currentItems.map((log, index) => (
                                <tr key={index}>

                                    <td style={{ position: 'relative' }}><span style={{ position: 'relative', top: -5, right: 5, left: 10, cursor: 'pointer', fontSize: 25 }}
                                        onClick={(e) => handleEllipsisClick(index, e)}>...</span>
                                        <input style={{ marginLeft: 30 }} type="checkbox" />
                                        {threeDotdropdown === index && (
                                            <div className="dropdown-menu" style={{ position: 'absolute', top: 55, left: 50, zIndex: 1000 }}>
                                                <button onClick={() => console.log('Create Quote')}>Create Quote</button>
                                                <button onClick={() => console.log('Log a call')}>Log a call</button>
                                                <button onClick={() => console.log('Delete')} className="delete-option">Delete</button>
                                            </div>
                                        )}
                                    </td>
                                    {columnVisibility.Date && <td>{log.date}</td>}
                                    {columnVisibility.Duration && <td>{log.duration}</td>}
                                    {columnVisibility.Type && <td>{log.type}</td>}
                                    {columnVisibility.CompanyName && <td>{log.companyName}</td>}
                                    {columnVisibility.ContactName && <td>{log.contactName}</td>}
                                    {columnVisibility.SalesID && <td>{log.salesId}</td>}
                                    {columnVisibility.FollowUp && <td>{log.followUp}</td>}
                                    {columnVisibility.comment && <td>{log.comment}</td>}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* Pagination Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -5, paddingBottom: 10 }}>
                <div className="call-manager-row-per-page">
                    Rows per page:
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
                <div className="pagination-container" style={{ marginTop: -10 }}>{renderPagination()}</div>
            </div>

            {showColumnPopup && (
                <div className="modal-overlay-contact-page">
                    <div className="column-popup-contact-page">
                        <h3 style={{ fontFamily: 'var(--montserrat)', fontSize: 18, fontWeight: 'var(--extra-semi-bold)', color: 'var(--black-color)', marginBottom: 10 }}>Customize Columns</h3>
                        {Object.keys(columnVisibility).map((column) => (
                            <div className="cursor" style={{ marginBottom: 10, fontFamily: 'var(--montserrat)', fontSize: 16, fontWeight: 'var(--extra-semi-bold)', color: 'var(--black-color)' }} key={column}>
                                <input
                                    type="checkbox"
                                    checked={columnVisibility[column]}
                                    onChange={() => handleColumnChange(column)}
                                    style={{ marginRight: 10 }}
                                />
                                {column.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                        ))}
                        <div className="column-popup-contact-page-button-container flex" style={{ justifyContent: 'flex-end' }}>
                            <button className="commonButtonCss" style={{ width: 100 }} onClick={() => setShowColumnPopup(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingLogs;
