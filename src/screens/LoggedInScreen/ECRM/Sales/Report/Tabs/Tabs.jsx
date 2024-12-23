import React, { useState } from 'react';
import './Tabs.css'; // Import the CSS file for styling

const Tabs = ({ activeTab: parentActiveTab, onTabChange }) => {
  const tabs = ['Report', 'Orders', 'Leads', 'Sale Reversal', 'Stock Requests'];
  const [activeTab, setActiveTab] = useState(parentActiveTab || 'Report'); // Default active tab

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent component about the active tab
  };

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab ${activeTab === tab ? 'active-tab' : ''}`} // Highlight active tab
          onClick={() => handleTabPress(tab)}
        >
          <span className={`tab-text ${activeTab === tab ? 'active-tab-text' : ''}`}>
            {tab}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
