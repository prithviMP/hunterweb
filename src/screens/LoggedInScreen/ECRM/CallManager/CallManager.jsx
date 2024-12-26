import React, { useState, useEffect } from "react";
import "./CallManager.css"; // Import the CSS file
import { Icons } from "../../../../Icons/Icons";

const CallManager = () => {
  // Sample data - split into two arrays
  const allCallLogs = [
    {
      date: "dd/mm/yyyy",
      type: "Outgoing",
      companyName: "Param Computer And Total Solution",
      contactName: "Mallika",
      salesId: "Uma",
      followUp: "Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Incoming",
      companyName: "CLN Properties Pvt Ltd",
      contactName: "Naseer",
      salesId: "Asha",
      followUp: "Not Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Incoming",
      companyName: "SSL Group",
      contactName: "Deelip",
      salesId: "Uma",
      followUp: "Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Incoming",
      companyName: "CLN Properties Pvt Ltd",
      contactName: "Sundar",
      salesId: "Asha",
      followUp: "Not Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Outgoing",
      companyName: "Param Computer And Total Solution",
      contactName: "Mallika",
      salesId: "Uma",
      followUp: "Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Incoming",
      companyName: "SSL Group",
      contactName: "Naseer",
      salesId: "Asha",
      followUp: "Not Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Outgoing",
      companyName: "SSL Group",
      contactName: "Deelip",
      salesId: "Asha",
      followUp: "Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Outgoing",
      companyName: "CLN Properties Pvt Ltd",
      contactName: "Mallika",
      salesId: "Uma",
      followUp: "Needed"
    },
    {
      date: "dd/mm/yyyy",
      type: "Incoming",
      companyName: "CLN Properties Pvt Ltd",
      contactName: "Naseer",
      salesId: "Uma",
      followUp: "Needed"
    }
  ];
  // Add state for active tab and filtered logs
  const [activeTab, setActiveTab] = React.useState('all'); // 'all' or 'pending'
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalPages = Math.ceil(allCallLogs.length / itemsPerPage);
  const [showAddCallModal, setShowAddCallModal] = useState(false);
  const [threeDotdropdown, setThreeDotdropdown] = useState(null);
  const pendingCallLogs = allCallLogs.filter(log => log.followUp === "Needed");

  // Get current logs based on active tab
  const displayedLogs = activeTab === 'all' ? allCallLogs : pendingCallLogs;

  // Pagination logic
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allCallLogs.slice(startIndex, startIndex + itemsPerPage);

  // Add new function to handle form submission
  const handleSubmitCall = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission
    setShowAddCallModal(false);
  };

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
        <div className="call-manager-tabs">
          <button
            className={`call-manager-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Call Logs
          </button>
          <button
            className={`call-manager-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Logs
          </button>
        </div>
        {activeTab === 'all' && (
          <div className="call-manager-count-section">
            <strong style={{
              fontSize: 15,
              fontFamily: 'var(--montserrat)',
              fontWeight: 'var(--extra-semi-bold)'
            }}>Count: </strong>
            <span style={{
              fontSize: 20, fontFamily: 'var(--montserrat)',
              fontWeight: 'var(--extra-semi-bold)'
            }}>{displayedLogs.length}</span>
            <button className="call-manager-add-call-btn" onClick={() => setShowAddCallModal(true)}>
              <span style={{ fontSize: 30, color: "var(--white-color)" }}>+</span> Add call log
            </button>
          </div>
        )}
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
            <input type="date" placeholder="dd-mm-yyyy" />
            <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
          </div>
          <div className="call-manager-date-input-wrapper">
            <label>To</label>
            <input type="date" placeholder="dd-mm-yyyy" />
            <img src={Icons.calendar_icon} alt="calendar" className="call-manager-calendar-icon" />
          </div>
        </div>
      </div>

      <div className="company-management-container" style={{ marginTop: -30, width: '100%' }}>
        <div className="company-management-table company-management-table-css">
          <table className="box-shadow border-radius">

            <thead>
              <tr>
                <th style={{ width: 70 }}><input style={{ marginLeft: 47 }} type="checkbox" /></th>
                <th>Call Date</th>
                <th style={{ width: 80 }}>Call Type</th>
                <th>Company Name</th>
                <th>Contact Name</th>
                <th>Sales ID</th>
                <th>Follow-up</th>
                {activeTab === 'pending' && (
                  <th>Comment</th>
                )}
              </tr>
            </thead>
            {activeTab === 'all' ? (
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
                    <td>{log.date}</td>
                    <td>{log.type}</td>
                    <td>{log.companyName}</td>
                    <td>{log.contactName}</td>
                    <td>{log.salesId}</td>
                    <td>{log.followUp}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>

                {currentItems.map((log, index) => (
                  <tr key={index}>

                    <td style={{ position: 'relative' }}><span style={{ position: 'relative', top: -5, right: 5, left: 10, cursor: 'pointer', fontSize: 25 }}
                      onClick={(e) => handleEllipsisClick(index, e)}>...</span><input style={{ marginLeft: 30 }} type="checkbox" />
                      {threeDotdropdown === index && (
                        <div className="dropdown-menu">
                          <button onClick={() => console.log('Create Quote')}>Create Quote</button>
                          <button onClick={() => console.log('Log a call')}>Log a call</button>
                          <button onClick={() => console.log('Delete')} className="delete-option">Delete</button>
                        </div>
                      )}
                    </td>
                    <td>{log.date}</td>
                    <td>{log.type}</td>
                    <td>{log.companyName}</td>
                    <td>{log.contactName}</td>
                    <td>{log.salesId}</td>
                    <td>{log.followUp}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            )}
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
                <button type="button" className="call-manager-cancel-btn" onClick={() => setShowAddCallModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="call-manager-save-btn commonButtonCss">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CallManager;
