import React, { useState } from "react";
import "./CompanyManagementTable.css";
import { Icons } from "../../../../Icons/Icons";

const CompanyManagementTable = ({ companies, onCheckChange }) => {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        Array(companies.length).fill(false)
    );

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(companies.length / itemsPerPage);

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleSelectAll = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
        setCheckedItems(Array(companies.length).fill(newCheckedState));
        
        // Notify parent component about the change
        onCheckChange(newCheckedState);
    };

    const handleIndividualCheck = (index) => {
        const newCheckedItems = {
            ...checkedItems,
            [index]: !checkedItems[index]
        };
        setCheckedItems(newCheckedItems);
        
        // Notify parent if any items are checked
        const hasChecked = Object.values(newCheckedItems).some(value => value);
        onCheckChange(hasChecked);
    };

    // Pagination logic
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = companies.slice(startIndex, startIndex + itemsPerPage);


    const handleEllipsisClick = (index, event) => {
        event.stopPropagation(); // Prevent click from bubbling up
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    // Add click handler to close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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

    return (
        <div className="company-management-container">
            <div className="company-management-table">
                <table className="box-shadow border-radius">
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Created by</th>
                            <th>Company Name</th>
                            <th>Contacts</th>
                            <th>Area</th>
                            <th>Sales ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((company, index) => (
                            <tr key={index}>
                                <td className="relative"> 
                                    <span 
                                        onClick={(e) => handleEllipsisClick(index, e)}
                                        style={{ 
                                            color: "var(--black-color)", 
                                            fontSize: 25, 
                                            fontWeight: 800, 
                                            position: "relative", 
                                            bottom: 9,
                                            cursor: "pointer" 
                                        }}
                                    >
                                        ...
                                    </span>
                                    {activeDropdown === index && (
                                        <div className="dropdown-menu">
                                            <button onClick={() => console.log('Create Quote')}>Create Quote</button>
                                            <button onClick={() => console.log('Log a call')}>Log a call</button>
                                            <button onClick={() => console.log('Delete')} className="delete-option">Delete</button>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[startIndex + index]}
                                        onChange={() =>
                                            handleIndividualCheck(startIndex + index)
                                        }
                                    />
                                </td>
                                <td>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span className="black-color font-weight_600">
                                            {company.createdBy}
                                        </span>
                                        <br />
                                        <span>{company.dateTime}</span>
                                    </div>
                                </td>
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
                                                backgroundColor: "#5DB947",
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
                                <td
                                    className="font-weight_600"
                                    style={{ color: "#007BFF" }}
                                >
                                    {company.contacts}
                                </td>
                                <td className="font-weight_600 black-color">
                                    {company.area}
                                </td>
                                <td className="font-weight_600 black-color">
                                    {company.salesId}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div className="pagination-container">{renderPagination()}</div>
        </div>
    );
};

export default CompanyManagementTable;
