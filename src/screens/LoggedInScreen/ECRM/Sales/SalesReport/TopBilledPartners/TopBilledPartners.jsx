import React from "react";
import "./TopBilledPartners.css"; // Import the CSS file

const TopBilledPartners = ({ data, onViewAll, searchQuery }) => {
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    item.location.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );
  return (
    <div className="top-billed-container">
      {/* Header */}
      <div className="header-top-billed-partner border-radius" style={{ height: 50 }}>
        <div className="header-top-billed-partner-left">
          <h2 className="title">Top 10 Billed Partners</h2>
        </div>
        <div className="header-top-billed-partner-right">
          <button className="view-all" onClick={onViewAll}>
            View all
          </button>
        </div>
      </div>

      {/* Partner List */}
      <div className="partner-list">
        <div className="header-container">
          <span className="partner-header">Partner</span>
          <span className="revenue-header">Revenue</span>
        </div>

        {filteredData.map((item, index) => (
          <div key={index} className="item-container">
            <div className="partner-details">
              <span className="partner-name">{item.name}</span>
              <span className="partner-location">{item.location}</span>
            </div>
            <span className="revenue">{item.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBilledPartners;
