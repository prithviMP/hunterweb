import React, { useState, useEffect } from "react";
import "./OrdersDetailsOnTable.css";
import { Icons } from "../../../../../../Icons/Icons";
import { downloadAsExcel } from "../../../../../../utils/excelDownload";
import { preloadImages } from "../../../../../../utils/imagePreloader";

const OrdersDetailsOnTable = ({ companies, onCheckChange, onHeadersData, visibleHeaders, searchQuery }) => {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        Array(companies.length).fill(false)
    );

    const [imagesLoaded, setImagesLoaded] = useState(false);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default value of 10 rows per page
    const totalPages = Math.ceil(companies.length / rowsPerPage);

    const [activeDropdown, setActiveDropdown] = useState(null);

    // Define table headers
    const tableHeaders = [
        { id: 'checkbox', label: '' },
        { id: 'orderId', label: 'Order ID', width: 150 },
        { id: 'salesId', label: 'Sales ID' },
        { id: 'status', label: 'Status' },
        { id: 'company', label: 'Company' },
        { id: 'contact', label: 'Contact' },
        { id: 'balance', label: 'Balance' }
    ];

    // Pass headers to parent via prop if needed
    React.useEffect(() => {
        if (typeof onHeadersData === 'function') {
            onHeadersData(tableHeaders);
        }
    }, []);

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

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentItems = companies.slice(startIndex, startIndex + rowsPerPage);


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
                className="pagination-button" style={{ marginRight: 10 }}
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
                    <button style={{ marginRight: 10 }}
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

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to first page when changing rows per page
    };

    const handleWhatsAppClick = (company) => {
        const phoneNumber = "+916264452164"; // Assuming contacts contains the phone number
        const message = `Payment link for Order ${company.orderId}`; // Customize your message
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleEmailClick = (company) => {
        const subject = `Payment Link for Order ${company.orderId}`;
        const body = `Dear ${company.companyName},\n\nHere is your payment link for Order ${company.orderId}`; // Customize your message
        const mailtoUrl = `mailto:${company.contacts}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl);
    };

    const handleDownload = () => {
        // Define headers for Excel file based on visible columns
        const headers = [
            { key: 'orderId', label: 'Order ID' },
            { key: 'salesId', label: 'Sales ID' },
            { key: 'status', label: 'Status' },
            { key: 'company', label: 'Company' },
            { key: 'contact', label: 'Contact' },
            { key: 'balance', label: 'Balance' }
        ].filter(header => visibleHeaders[header.key]);

        // Format the data for Excel
        const formattedData = companies.map(company => ({
            orderId: company.orderId,
            salesId: company.salesId,
            status: company.status,
            company: company.companyName,
            contact: company.contacts[0],
            balance: company.balance
        }));

        // Use the download utility
        downloadAsExcel({
            data: formattedData,
            headers,
            filename: 'orders.xlsx',
            sheetName: 'Orders'
        });
    };

    const filteredData = companies.filter((item) => {
        const searchTerm = searchQuery?.toLowerCase() || '';
        console.log(searchTerm)
        return (
            item.orderId.toLowerCase().includes(searchTerm) ||
            item.salesId.toLowerCase().includes(searchTerm) ||
            item.companyName.toLowerCase().includes(searchTerm) ||
            item.details.id.toLowerCase().includes(searchTerm) ||
            item.details.type.toLowerCase().includes(searchTerm) ||
            item.details.location.toLowerCase().includes(searchTerm) ||
            item.contacts.some(contact => contact.toLowerCase().includes(searchTerm)) ||
            item.balance.toString().toLowerCase().includes(searchTerm)
        );
    });

    useEffect(() => {
        preloadImages(Icons)
            .then(() => setImagesLoaded(true))
            .catch(error => console.error('Error loading images:', error));
    }, []);

    if (!imagesLoaded) {
        return <div>Loading...</div>; // Or a spinner/loading indicator
    }


    return (
        <div className="company-management-container">
            <div className="create_so_and_download_button_sales_page">
                <button className="commonButtonCss" style={{ height: 40 }}> <span style={{ fontSize: 20, fontWeight: 500, paddingRight: 5, position: "relative", top: -2 }}>+</span> <span style={{ position: "relative", top: -4 }}>Create SO</span></button>
                <button onClick={handleDownload} className="commonButtonCss" style={{ backgroundColor: "#FFF", color: "var(--primary-color)", position: "relative", bottom: 4, marginLeft: 5 }}>Download <img src={Icons.download_icon} alt="icon" /></button>
            </div>
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
                            {tableHeaders?.slice(1).map(header => (
                                visibleHeaders[header.id] && (
                                    <th key={header.id} style={header.width ? { width: header.width } : undefined}>
                                        {header.label}
                                    </th>
                                )
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((company, index) => (
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
                                        <div className="orderDetailsSalesPage-dropdown-menu" style={{ width: 180 }}>
                                            <button onClick={() => console.log('Create Quote')}>Create Quote</button>
                                            <div className="orderDetailsSalesPage-dropdown-submenu">
                                                <button>Send Payment Link</button>
                                                <div className="orderDetailsSalesPage-submenu-content">
                                                    <button onClick={() => handleWhatsAppClick(company)}>
                                                        <img src={Icons.whatsapp_icon} alt="WhatsApp icon" /> WhatsApp
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
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[startIndex + index]}
                                        onChange={() => handleIndividualCheck(startIndex + index)}
                                    />
                                </td>
                                {visibleHeaders.orderId && (
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span className="black-color font-weight_600">
                                                {company.orderId}
                                            </span>
                                        </div>
                                    </td>
                                )}
                                {visibleHeaders.salesId && (
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span className="black-color font-weight_600">
                                                {company.salesId}
                                            </span>
                                        </div>
                                    </td>
                                )}
                                {visibleHeaders.status && (
                                    <td>
                                        {company.status === 'wide' && <img src={Icons.wide} alt="icon" />}
                                        {company.status === 'approved' && <img src={Icons.approved} alt="icon" />}
                                        {company.status === 'rejected' && <img src={Icons.rejected} alt="icon" style={{ width: 35, height: 35 }} />}
                                    </td>
                                )}
                                {visibleHeaders.company && (
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
                                )}
                                {visibleHeaders.contact && (
                                    <td className="font-weight_600">
                                        {company.contacts}
                                    </td>
                                )}
                                {visibleHeaders.balance && (
                                    <td className="font-weight_600 black-color">
                                        {company.balance}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div className="pagination-container-sales">
                <div className="rows-per-page-sales">
                    <span style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--manrope)' }}>Rows per page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="rows-select-sales"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div>
                    {renderPagination()}
                </div>


            </div>
        </div>
    );
};

export default OrdersDetailsOnTable;
