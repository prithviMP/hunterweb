import React, { useState } from "react";
import "./Contact.css";
import { Icons } from "../../../../../Icons/Icons";
import { generatePaginationButtons } from "../../../../../utils/paginationServices";
import RowsPerPageSelector from "../../../../../utils/rowPerPageSelector";
import CommonButton from "../../../../../componant/Button/CommonButton";
import AddFilterButton from "../../../../../componant/AddFilterButton/AddFilterButton";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const allProducts = [
        {
            companyName: "Param Computer And Total Solution",
            contactCode: "HJC271212",
            companyCode: "HJC271212",
            name: "Mallika",
            calls: 1,
            designation: "Managing Director",
            salesId: "Uma",
            city: "Coimbatore",
            state: "Tamil Nadu",
            kyc: "Not Done",
            status: "Active"
        },
        {
            companyName: "CLN Properties Pvt Ltd",
            contactCode: "HJC360899",
            companyCode: "HJC360899",
            name: "Nasser",
            calls: 2,
            designation: "Managing Director",
            salesId: "Asha",
            city: "Erode",
            state: "Kerala",
            kyc: "Done",
            status: "Active"
        },
        {
            companyName: "SSL Group",
            contactCode: "HJC371919",
            companyCode: "HJC371919",
            name: "Deelip",
            calls: 0,
            designation: "Medical Administrator",
            salesId: "Asha",
            city: "Bangalore",
            state: "Karnataka",
            kyc: "Not Done",
            status: "Active"
        },
        {
            companyName: "CLN Properties Pvt Ltd",
            contactCode: "HJC271212",
            companyCode: "HJC271212",
            name: "Sundar",
            calls: 1,
            designation: "Managing Director",
            salesId: "Asha",
            city: "Erode",
            state: "Kerala",
            kyc: "Done",
            status: "Active"
        },
        {
            companyName: "Param Computer And Total Solution",
            contactCode: "HJC371919",
            companyCode: "HJC371919",
            name: "Mallika",
            calls: 3,
            designation: "Managing Director",
            salesId: "Uma",
            city: "Coimbatore",
            state: "Tamil Nadu",
            kyc: "Not Done",
            status: "Active"
        },
        {
            companyName: "SSL Group",
            contactCode: "HJC360899",
            companyCode: "HJC360899",
            name: "Nasser",
            calls: 3,
            designation: "Managing Director",
            salesId: "Asha",
            city: "Bangalore",
            state: "Karnataka",
            kyc: "Done",
            status: "Active"
        },
        {
            companyName: "CLN Properties Pvt Ltd",
            contactCode: "HJC271212",
            companyCode: "HJC271212",
            name: "Mallika",
            calls: 0,
            designation: "Managing Director",
            salesId: "Uma",
            city: "Coimbatore",
            state: "Tamil Nadu",
            kyc: "Not Done",
            status: "Active"
        },
        {
            companyName: "CLN Properties Pvt Ltd",
            contactCode: "HJC360899",
            companyCode: "HJC360899",
            name: "Nasser",
            calls: 2,
            designation: "Managing Director",
            salesId: "Asha",
            city: "Bangalore",
            state: "Karnataka",
            kyc: "Done",
            status: "Active"
        },
        {
            companyName: "SSL Group",
            contactCode: "HJC371919",
            companyCode: "HJC371919",
            name: "Deelip",
            calls: 0,
            designation: "Medical Administrator",
            salesId: "Asha",
            city: "Bangalore",
            state: "Karnataka",
            kyc: "Not Done",
            status: "Active"
        },
        {
            companyName: "CLN Properties Pvt Ltd",
            contactCode: "HJC360899",
            companyCode: "HJC360899",
            name: "Piryari",
            calls: 2,
            designation: "Managing Director",
            salesId: "Asha",
            city: "Bangalore",
            state: "Karnataka",
            kyc: "Not Done",
            status: "Active"
        }
    ];
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [threeDotdropdown, setThreeDotdropdown] = useState(null);
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const [showColumnPopup, setShowColumnPopup] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({
        companyName: true,
        contactCode: true,
        companyCode: true,
        name: true,
        calls: false,
        designation: false,
        salesId: true,
        city: true,
        state: false,
        kyc: false,
        status: false,
    });

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleEllipsisClick = (index, event) => {
        event.stopPropagation(); // Prevent click from bubbling up
        setThreeDotdropdown(threeDotdropdown === index ? null : index);
    };

    const renderPagination = () => {
        return generatePaginationButtons(currentPage, totalPages, handlePageChange);
    };

    const handleColumnChange = (column) => {
        setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
    };


    return (
        <div>
            <div className="company-management-container" style={{ width: 'calc(100% - 15px)' }}>
                <div className="all-contact-table-container-header">
                    <div className="count-all-contact">
                        <p>Count: <span style={{ fontWeight: 'var(--extra-semi-bold)', color: '#C3C3C3', fontSize: 20, position: 'relative', top: 2 }}>10</span></p>
                    </div>
                    <div className="all-contact-table-container-header-right flex" style={{ position: 'relative' }}>
                        <CommonButton text="Add Contact" style={{
                            padding: '10px 20px', backgroundColor: 'var(--primary-color)',
                            color: 'var(--white-color)', borderRadius: 5, border: 'none', fontFamily: 'var(--montserrat)', cursor: 'pointer'
                        }} onClick={() => navigate('/contact-manager/add-contact')} />
                    </div>
                </div>
                <div className="all-contact-table-container-header">
                    <div className="count-all-contact">
                        <AddFilterButton onClick={() => console.log('Add Filter')} />
                    </div>
                    <div className="all-contact-table-container-header-right">
                        <img
                            src={Icons.table_toggler}
                            alt="download"
                            style={{ width: 35, height: 35, position: 'relative', top: 5, cursor: 'pointer' }}
                            onClick={() => setShowColumnPopup(true)}
                        />
                    </div>
                </div>

                <div className="company-management-table" style={{ marginTop: -15, overflowX: 'auto' }}>
                    <table className="box-shadow border-radius company-management-table-css" style={{  width: '170%' }}>
                        <thead>
                            <tr>
                                <th style={{ width: 70 }}><input style={{ marginLeft: 47 }} type="checkbox" /></th>
                                {columnVisibility.companyName && <th style={{ width: 300 }}>Company Name</th>}
                                {columnVisibility.contactCode && <th style={{ width: 150 }}>Contact Code</th>}
                                {columnVisibility.companyCode && <th style={{ width: 150 }}>Company Code</th>}
                                {columnVisibility.name && <th style={{ width: 150 }}>Name</th>}
                                {columnVisibility.calls && <th style={{ width: 150 }}>Calls</th>}
                                {columnVisibility.designation && <th style={{ width: 200 }}>Designation</th>}
                                {columnVisibility.salesId && <th style={{ width: 150 }}>Sales ID</th>}
                                {columnVisibility.city && <th style={{ width: 150 }}>City</th>}
                                {columnVisibility.state && <th style={{ width: 150 }}>State</th>}
                                {columnVisibility.kyc && <th style={{ width: 150 }}>KYC</th>}
                                {columnVisibility.status && <th style={{ width: 150 }}>Status</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((log, index) => (
                                <tr key={index}>
                                    <td style={{ position: 'relative' }}>
                                        <span style={{ position: 'relative', top: -5, right: 5, left: 10, cursor: 'pointer', fontSize: 25 }}
                                            onClick={(e) => handleEllipsisClick(index, e)}>...</span>
                                        <input style={{ marginLeft: 30 }} type="checkbox" />
                                        {threeDotdropdown === index && (
                                            <div className="dropdown-menu">
                                                <button onClick={() => console.log('Create Quote')}>Create Quote</button>
                                                <button onClick={() => console.log('Log a call')}>Log a call</button>
                                                <button onClick={() => console.log('Delete')} className="delete-option">Delete</button>
                                            </div>
                                        )}
                                    </td>
                                    {columnVisibility.companyName && <td>{log.companyName}</td>}
                                    {columnVisibility.contactCode && <td>{log.contactCode}</td>}
                                    {columnVisibility.companyCode && <td>{log.companyCode}</td>}
                                    {columnVisibility.name && <td>{log.name}</td>}
                                    {columnVisibility.calls && <td>{log.calls}</td>}
                                    {columnVisibility.designation && <td>{log.designation}</td>}
                                    {columnVisibility.salesId && <td>{log.salesId}</td>}
                                    {columnVisibility.city && <td>{log.city}</td>}
                                    {columnVisibility.state && <td>{log.state}</td>}
                                    {columnVisibility.kyc && <td>{log.kyc}</td>}
                                    {columnVisibility.status && <td>{log.status}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {showColumnPopup && (
                <div className="modal-overlay-contact-page">
                    <div className="column-popup-contact-page">
                        <h3 style={{ fontFamily: 'var(--montserrat)', fontSize: 18, fontWeight: 'var(--extra-semi-bold)', color: 'var(--black-color)', marginBottom: 10 }}>Customize Columns</h3>
                        {Object.keys(columnVisibility).map((column) => (
                            <div className="cursor" style={{marginBottom: 10,fontFamily: 'var(--montserrat)', fontSize: 16, fontWeight: 'var(--extra-semi-bold)', color: 'var(--black-color)'}} key={column}>
                                <input
                                    type="checkbox"
                                    checked={columnVisibility[column]}
                                    onChange={() => handleColumnChange(column)}
                                    style={{ marginRight: 10 }}
                                />
                                {column.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                        ))}
                        <div className="column-popup-contact-page-button-container flex" style={{justifyContent: 'flex-end'}}>
                            <button className="commonButtonCss" style={{width: 100}} onClick={() => setShowColumnPopup(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -5, paddingBottom: 10 }}>
                <RowsPerPageSelector
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                <div className="pagination-container" style={{ marginTop: -10, marginRight: 12 }}>{renderPagination()}</div>
            </div>

        </div>
    );
};

export default Contact;
