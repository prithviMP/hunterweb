import React, { useState, useEffect } from "react";
import "./AllCallLogs.css"; // Import the CSS file
import { Icons } from "../../../../../Icons/Icons";
import { generatePaginationButtons } from "../../../../../utils/paginationServices";

const AllCallLogs = () => {
    const allCallLogs = [
        {
            date: "02/12/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            followUp: "Needed",
            summary: 'Next month will confirm the order'
        },
        {
            date: "02/08/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            followUp: "Needed",
            summary: 'Next month will confirm the order'
        },
        {
            date: "02/03/2024",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            followUp: "Needed",
            summary: 'Next month will confirm the order'
        },
        {
            date: "02/12/2025",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            followUp: "Needed",
            summary: 'Next month will confirm the order'
        },
        {
            date: "02/12/2025",
            duration: "1min 30sec",
            type: "Outgoing",
            companyName: "Param Computer And Total Solution",
            contactName: "Mallika",
            salesId: "Uma",
            followUp: "Needed",
            summary: 'Next month will confirm the order'
        },
    ];


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const totalPages = Math.ceil(allCallLogs.length / itemsPerPage);
    const [showAddCallModal, setShowAddCallModal] = useState(false);
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
        FollowUp: true,
        Summary: false
    });

    // Add state for date filters
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Pagination logic
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleColumnChange = (column) => {
        setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
    };


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allCallLogs.slice(startIndex, startIndex + itemsPerPage);

    // Filter current items based on date range
    const filteredItems = currentItems.filter(log => {
        const logDate = new Date(log.date.split('/').reverse().join('-')); // Convert to Date object
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (!startDate || logDate >= start) && (!endDate || logDate <= end);
    });

    // Add new function to handle form submission
    const handleSubmitCall = (e) => {
        e.preventDefault();
        // Add logic to handle the form submission
        setShowAddCallModal(false);
    };

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
        <div className="call-manager">
            <div className="call-manager-header">
                <div className="call-manager-count-section">
                    <strong style={{
                        fontSize: 15,
                        fontFamily: 'var(--montserrat)',
                        fontWeight: 'var(--extra-semi-bold)'
                    }}>Count: </strong>
                    <span style={{
                        fontSize: 20, fontFamily: 'var(--montserrat)',
                        fontWeight: 'var(--extra-semi-bold)'
                    }}>{allCallLogs.length}</span>
                </div>
                <div className="call-manager-actions">
                    <button className="call-manager-add-call-btn" onClick={() => setShowAddCallModal(true)}>
                        <span style={{ fontSize: 30, color: "var(--white-color)" }}>+</span> Add call log
                    </button>
                </div>

            </div>

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
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                        <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
                    </div>
                    <div className="call-manager-date-input-wrapper">
                        <label>To</label>
                        <input 
                            type="date" 
                            placeholder="dd-mm-yyyy" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                        />
                        <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
                    </div>
                    <div className="call-manager-table-customize-icon">
                        <img src={Icons.table_toggler} alt="table customize" onClick={() => setShowColumnPopup(true)} />
                    </div>
                </div>
            </div>

            <div className="company-management-container" >
                <div className="company-management-table company-management-table-css" style={{ marginTop: -30, width: '100%', overflowX: 'auto' }}>
                    <table className="box-shadow border-radius" style={{ width: '130%' }}>

                        <thead>
                            <tr>

                                <th style={{ width: 70 }}><input style={{ marginLeft: 47 }} type="checkbox" /></th>
                                {columnVisibility.Date && <th>Call Date</th>}
                                {columnVisibility.Duration && <th>Call Duration</th>}
                                {columnVisibility.Type && <th style={{ width: 80 }}>Call Type</th>}
                                {columnVisibility.CompanyName && <th>Company Name</th>}
                                {columnVisibility.ContactName && <th>Contact Name</th>}
                                {columnVisibility.SalesID && <th>Sales ID</th>}
                                {columnVisibility.FollowUp && <th>Follow-up</th>}
                                {columnVisibility.Summary && <th>Call Summary</th>}

                            </tr>
                        </thead>

                        <tbody>

                            {filteredItems.map((log, index) => (
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
                                    {columnVisibility.Summary && <td>{log.summary}</td>}
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

            {/* Add Modal */}
            {showAddCallModal && (
                <div className="call-manager-modal-overlay">
                    <div className="call-manager-modal-content">
                        <h2>Log a Call</h2>
                        <div className="call-manager-call-info-label">Call Information</div>
                        <form onSubmit={handleSubmitCall} >
                            <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <label className="call-manager-popup-label" style={{ paddingTop: 12 }}>Call To <span className="call-manager-required">*</span></label>
                                    <label className="call-manager-popup-label" style={{ paddingTop: 6 }}>Call Type <span className="call-manager-required">*</span></label>
                                    <label className="call-manager-popup-label" style={{ paddingTop: 6 }}>Call Start Time <span className="call-manager-required">*</span></label>
                                    <label className="call-manager-popup-label" style={{ paddingTop: 6 }}>Call Duration <span className="call-manager-required">*</span></label>
                                    <label className="call-manager-popup-label" style={{ paddingTop: 6 }}>Purpose <span className="call-manager-required">*</span></label>
                                    <label className="call-manager-popup-label">Summary </label>
                                    <label className="call-manager-popup-label" style={{ paddingTop: 36 }}>Follow-up<span className="call-manager-required">*</span></label>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginRight: 20, maxWidth: 400 }}>

                                    <div className="call-manager-input-with-search">
                                        <select defaultValue="Contact" className="call-manager-dropdown-select">
                                            <option value="Contact">Contact</option>
                                        </select>
                                        <button type="button" className="call-manager-search-btn">
                                            <img src={Icons.search_icon} alt="search" />
                                        </button>
                                    </div>

                                    <select defaultValue="Outbound" className="call-manager-dropdown-select">
                                        <option value="Outbound">Outbound</option>
                                    </select>

                                    <div className="call-manager-time-inputs">
                                        <input type="text" className="call-manager-input-text" placeholder="DD/MM/YYYY" style={{ borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                                        <input type="text" className="call-manager-input-text" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} placeholder="HH:MM am/pm" />
                                    </div>

                                    <input type="text" className="call-manager-input-text" style={{ width: 355 }} placeholder="HH:MM am/pm" />

                                    <input type="text" className="call-manager-input-text" style={{ width: 355 }} />

                                    <textarea rows="3" className="call-manager-textarea" style={{ width: 355 }}></textarea>

                                    <select defaultValue="Needed" className="call-manager-dropdown-select">
                                        <option value="Needed">Needed</option>
                                    </select>

                                </div>
                            </div>



                            <div className="call-manager-modal-actions">
                                <div className="call-manager-modal-actions-buttons flex" style={{ gap: 10 }}>
                                    <button type="button" className="call-manager-cancel-btn box-shadow" onClick={() => setShowAddCallModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="call-manager-save-btn commonButtonCss">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}


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

export default AllCallLogs;
