import React from "react";
import "./TopBilledProducts.css"; // Import the CSS file

const TopBilledProducts = ({ data, onViewAll, searchQuery }) => {
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );
  return (
    <div className="container">
      {/* Header */}
      <div className="header-top-billed-product border-radius" style={{ height: 50 }}>
        <div className="header-top-billed-product-left">
          <h2 className="title">Top 10 Billed Products</h2>
        </div>
        <div className="header-top-billed-product-right">
          <button className="view-all" onClick={onViewAll}>View all</button>
        </div>
      </div>

      {/* Product List */}
      <div className="list">
        <div className="header-container">
          <span className="partner-header">Product</span>
          <span className="revenue-header">Quantity</span>
        </div>

        {filteredData.map((item, index) => (
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
