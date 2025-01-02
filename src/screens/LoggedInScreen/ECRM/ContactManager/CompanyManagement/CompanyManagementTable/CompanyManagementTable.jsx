import React, { useState } from "react";
import "./CompanyManagementTable.css";
import { Icons } from "../../../../../../Icons/Icons";
import { generatePaginationButtons } from "../../../../../../utils/paginationServices";

const CompanyManagementTable = ({ companies, onCheckChange }) => {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        Array(companies?.length).fill(false)
    );

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(companies?.length / itemsPerPage);

    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleSelectAll = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
        setCheckedItems(Array(companies?.length).fill(newCheckedState));

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
    if (companies?.length > 0 && companies !== undefined) {
        var currentItems = companies?.slice(startIndex, startIndex + itemsPerPage);
    }


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

    // Pagination logic
    const renderPagination = () => {
        return generatePaginationButtons(currentPage, totalPages, handlePageChange);
    };


    return (
        <div className="company-management-container">
            <div className="company-management-table company-management-table-css" style={{ width: '100%' }}>

                <table className="box-shadow border-radius" style={{ width: '100%', overflowX: 'auto' }}>
                    <thead>
                        <tr>
                            <th ></th>
                            <th >
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th >Created by</th>
                            <th >Company Name</th>
                            <th >Contacts</th>
                            <th >Area</th>
                            <th >Sales ID</th>
                            {/* <th >Total Calls</th>
                            <th >GSTIN Category</th>
                            <th >GST Number</th>
                            <th >Web-Access</th>
                            <th >Invoice</th>
                            <th >Last Updated By</th>
                            <th >Loyality Program</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {companies.length === 0 && (
                            <tr style={{ height: 200 }}><td colSpan="6" style={{ textAlign: "center" }}>No companies found</td></tr>
                        )}


                        {companies.length > 0 && currentItems?.map((company, index) => (
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
                                            {company.createdByWhom}
                                        </span>
                                        <br />
                                        <span>{company.createdAt}</span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                        <span className="black-color font-weight_600" style={{ fontSize: 20 }}>
                                            {company.companyDetailsCompanyName}
                                        </span>
                                        <div>
                                            {company?.companyDetailsGSTIN}{" "}
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
                                                {company?.companyDetailsGSTINCategory}
                                            </span>
                                        </div>
                                        <span className="black-color font-weight_600">
                                            {company?.companyDetailsState + "," + company?.companyDetailsCity}
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
                                                    {company?.creditLimitApproved}
                                                </span>{" "}
                                                {company?.creditDaysApproved} days
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
                                    {company?.contactInformationName}
                                </td>
                                <td className="font-weight_600 black-color">
                                    {company?.companyDetailsArea}
                                </td>
                                <td className="font-weight_600 black-color">
                                    {company.SalesID}
                                </td>
                                {/* <td>0</td>
                                <td>Unregistered business</td>
                                <td>33AZZPM2425K1ZW</td>
                                <td >
                                    <p style={{ width: 60, backgroundColor: "#D0FF8F", borderRadius: 10, padding: 5, paddingLeft: 10, paddingRight: 10, color: "var(--green-color)" }}> • Active</p>
                                    <p>CLNPropertiesPvtLtd@gmail.com</p>
                                    <p><span className="flex" style={{ justifyContent: 'start', alignItems: "center", gap: 5 }}><i className="fa-solid fa-check" style={{ color: "var(--white-color)", backgroundColor: "var(--green-color)", borderRadius: '100%', width: 15, height: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}></i> Verified</span></p>

                                    <div className="flex" style={{ gap: 10 }}>
                                        <button className="border-radius" style={{ backgroundColor: "#00BFA5", color: "var(--white-color)", padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                                            Mark as RD
                                        </button>
                                        <button className="border-radius" style={{ backgroundColor: "#FF8800", color: "var(--white-color)", padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                                            Mark as VaP
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <p>₹9,27,208</p>
                                    <p><span style={{ color: "var(--red-color)" }}>Due: ₹9,27,208</span></p>
                                </td>

                                <td>Shreepriya Gupta
                                    <span>12-Jul-2024 15:08:40</span>
                                </td>
                                <td>
                                    <p><span>Program:</span> NOt Joined</p>
                                    <p><span>Tier:</span> No Tier Assigned</p>
                                    <p><span>Coin:</span> 0</p>
                                </td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>

            {/* Pagination Section */}
            <div className="pagination-container-company-management-container">
                <div className="pagination-container-company-management">{renderPagination()}</div>
            </div>
        </div>
    );
};

export default CompanyManagementTable;
