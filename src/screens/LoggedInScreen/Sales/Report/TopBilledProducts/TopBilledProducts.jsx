import React from "react";
import "./TopBilledProducts.css"; // Import the CSS file

const TopBilledProducts = ({ data, onViewAll }) => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header border-radius" style={{height:60}}>
        <h2 className="title">Top 10 Billed Products</h2>
        <button className="view-all" onClick={onViewAll}>View all</button>
      </div>

      {/* Product List */}
      <div className="list">
        <div className="header-container">
          <span className="partner-header">Product</span>
          <span className="revenue-header">Quantity</span>
        </div>

        {data.map((item, index) => (
          <div className="item-container" key={index}>
            <div className="partner-details">
              <span className="partner-name">{item.name}</span>
            </div>
            <span className="revenue">{item.quentity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBilledProducts;
