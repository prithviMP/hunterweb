import React, { useState } from 'react';
import './Leads.css';
import { Icons } from '../../../../Icons/Icons';
import { downloadAsExcel } from '../../../../utils/excelDownload';

const getStatusColors = (status) => {
  // Define base colors for different statuses
  const colorMap = {
    'New': '#DFF6BE',
    'Hot': '#FFDEBE',
    'Won': '#E6B3B5',
    'E-commerce': '#C0DEFD'
  };

  const textColors = {
    'New': '#578B3E',
    'Hot': '#F29339',
    'Won': '#C6131B',
    'E-commerce': '#007BFF'
  };

  return {
    backgroundColor: colorMap[status] || '#DDD', // Default gray if status not found
    color: textColors[status] || '#666' // Default dark gray if status not found
  };
};

const Leads = ({ onCheckChange = () => { } }) => {
  const sales_leads = [
    {
      "status": "New",

      "source": "Indiamart",
      "company": "Parrien Computer And Total Solution",
      "assign_user": "Uma",
      "contactNumber": "9804745010"
    },
    {
      "status": "E-commerce",
      "source": "E-Commerce",
      "company": "CLN Properties Pvt Ltd",
      "assign_user": "Asha",
      "contactNumber": "9804745010"
    },
    {
      "status": "Hot",
      "source": "Indiamart",
      "company": "SSL Group",
      "assign_user": "Uma",
      "contactNumber": "9880448424"
    },
    {
      "status": "Won",
      "source": "E-Commerce",
      "company": "CLN Properties Pvt Ltd",
      "assign_user": "Asha",
      "contactNumber": "6302478507"
    },
    {
      "status": "New",
      "source": "Indiamart",
      "company": "Parrien Computer And Total Solution",
      "assign_user": "Uma",
      "contactNumber": "9880448424"
    },
    {
      "status": "Hot",
      "source": "E-Commerce",
      "company": "SSL Group",
      "assign_user": "Asha",
      "contactNumber": "9804745010"
    },
    {
      "status": "Won",
      "source": "E-Commerce",
      "company": "SSL Group",
      "assign_user": "Asha",
      "contactNumber": "9880448424"
    },
    {
      "status": "E-commerce",
      "source": "Indiamart",
      "company": "CLN Properties Pvt Ltd",
      "assign_user": "Uma",
      "contactNumber": "9804745010"
    }
  ]

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    Array(sales_leads.length).fill(false)
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default value of 10 rows per page

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSelectAll = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckedItems(Array(sales_leads.length).fill(newCheckedState));
    onCheckChange(newCheckedState);
  };

  const handleIndividualCheck = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    const hasChecked = newCheckedItems.some(value => value);
    onCheckChange(hasChecked);
  };

  // Add search state
  const [searchTerm, setSearchTerm] = useState('');

  // Add search handler function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter data based on search term
  const filteredLeads = sales_leads.filter(lead => {
    const searchStr = searchTerm.toLowerCase();
    return (
      lead.status.toLowerCase().includes(searchStr) ||
      lead.source.toLowerCase().includes(searchStr) ||
      lead.company.toLowerCase().includes(searchStr) ||
      lead.assign_user.toLowerCase().includes(searchStr) ||
      lead.contactNumber.toLowerCase().includes(searchStr)
    );
  });

  // Update pagination to use filtered data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentItems = filteredLeads.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


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
        key="prev" style={{ marginRight: 5 }}
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
          <button style={{ marginRight: 5 }}
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


  const [visibleHeaders, setVisibleHeaders] = useState({
    Status: true,
    Source: true,
    CompanyName: true,
    AssignedUser: true,
    ContactNumber: true,
  });

  const [tableHeaders, setTableHeaders] = useState([
    { id: 'Status', label: 'Status' },
    { id: 'Source', label: 'Source' },
    { id: 'CompanyName', label: 'Company Name' },
    { id: 'AssignedUser', label: 'Assigned User' },
    { id: 'ContactNumber', label: 'Contact Number' }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState(visibleHeaders);

  const handleApply = () => {
    setVisibleHeaders(selectedHeaders);
    setShowPopup(false);
  };

  const handleDownload = () => {
    // Define headers for Excel file
    const headers = [
      { key: 'status', label: 'Status' },
      { key: 'source', label: 'Source' },
      { key: 'company', label: 'Company Name' },
      { key: 'assign_user', label: 'Assigned User' },
      { key: 'contactNumber', label: 'Contact Number' }
    ];

    // Use the download utility
    downloadAsExcel({
      data: filteredLeads, // Use filtered data instead of all data
      headers,
      filename: 'leads.xlsx',
      sheetName: 'Leads'
    });
  };

  const CreateLeadPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
      assignUser: '',
      source: '',
      contactName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      state: '',
      city: '',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      onClose();
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="leads-create-popup-overlay">
        <div className="leads-create-popup-content">
          <div className="leads-create-popup-header">
            <h3>Create New Lead</h3>
            <button className="leads-create-close-btn" onClick={onClose}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="leads-create-form-row">
              <div className="leads-create-form-group">
                <label>Assign User *</label>
                <select name="assignUser" onChange={handleChange} required>
                  <option value="">Select User</option>
                  {/* Add your user options here */}
                </select>
              </div>
              <div className="leads-create-form-group">
                <label>Source *</label>
                <select name="source" onChange={handleChange} required>
                  <option value="">Select Source</option>
                  <option value="Indiamart">Indiamart</option>
                  <option value="E-Commerce">E-Commerce</option>
                </select>
              </div>

              <div className="leads-create-form-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="leads-create-form-row">

              <div className="leads-create-form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  onChange={handleChange}
                />
              </div>

              <div className="leads-create-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="leads-create-form-row">

              <div className="leads-create-form-group">
                <label>Phone Number *</label>
                <div className="leads-create-phone-input">
                  <span style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--manrope)', background: '#FFF', padding: '8px', borderRadius: '8px', border: "1px solid #ddd" }} >+91</span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="leads-create-form-group">
                  <label>State *</label>
                  <select name="state" onChange={handleChange} required>
                    <option value="">Select State</option>
                    {/* Add your state options here */}
                  </select>
                </div>

                <div className="leads-create-form-group">
                  <label>City *</label>
                  <select name="city" onChange={handleChange} required>
                    <option value="">Select City</option>
                    {/* Add your city options here */}
                  </select>
                </div>

              </div>
            </div>


            <div className="leads-create-form-group">
              <label>Message *</label>
              <textarea
                name="message"
                onChange={handleChange}
                required
                placeholder="Type your message"
              />
            </div>

            <button type="submit" className="leads-create-submit-btn">Create Lead</button>
          </form>
        </div>
      </div>
    );
  };

  // Add state for controlling popup visibility
  const [showCreateLeadPopup, setShowCreateLeadPopup] = useState(false);

  return (
    <div className="company-management-container">
      <div className="create_so_and_download_button_sales_page">
        <button
          className="commonButtonCss"
          style={{ height: 38 }}
          onClick={() => setShowCreateLeadPopup(true)}
        >
          <span style={{ fontSize: 20, fontWeight: 500, paddingRight: 5, position: "relative", top: -2 }}>+</span>
          <span style={{ position: "relative", top: -4 }}>Create Lead</span>
        </button>
        <button
          className="commonButtonCss"
          style={{ backgroundColor: "#FFF", color: "var(--primary-color)", position: "relative", bottom: 4, marginLeft: 5 }}
          onClick={handleDownload}
        >
          Download <img src={Icons.download_icon} alt="icon" />
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div className="filter-section-main-div" style={{ display: 'flex', gap: 10 }}>
          <button className="company-management-button commonButtonCss" style={{ width: 130 }}>
            <span style={{ paddingRight: 5 }}>
              <img src={Icons.filter_icon} alt="filter icon" />
            </span> Add Filter
          </button>

          {checkedItems.some(item => item) && (
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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <img onClick={() => setShowPopup(true)} src={Icons.table_toggler} alt="icon" style={{ width: 30, height: 30, cursor: "pointer" }} />
        </div>
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
              {visibleHeaders.Status && <th style={{ width: 110 }}>Status</th>}
              {visibleHeaders.Source && <th>Source</th>}
              {visibleHeaders.CompanyName && <th>Company Name</th>}
              {visibleHeaders.AssignedUser && <th>Assigned User</th>}
              {visibleHeaders.ContactNumber && <th>Contact Number</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((leads, index) => (
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
                {visibleHeaders.Status && (
                  <td className='font-weight_600'>
                    <span style={{
                      ...getStatusColors(leads.status),
                      textAlign: 'center',
                      width: 90,
                      display: 'inline-block',
                      padding: '4px',
                      borderRadius: '6px',
                      fontSize: 12
                    }}>
                      {leads.status}
                    </span>
                  </td>
                )}
                {visibleHeaders.Source && (
                  <td className="font-weight_600 black-color">{leads.source}</td>
                )}
                {visibleHeaders.CompanyName && (
                  <td className="font-weight_600">{leads.company}</td>
                )}
                {visibleHeaders.AssignedUser && (
                  <td className="font-weight_600 black-color">{leads.assign_user}</td>
                )}
                {visibleHeaders.ContactNumber && (
                  <td className="font-weight_600 black-color">{leads.contactNumber}</td>
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

      {showCreateLeadPopup && (
        <CreateLeadPopup onClose={() => setShowCreateLeadPopup(false)} />
      )}
    </div>
  )
}

export default Leads