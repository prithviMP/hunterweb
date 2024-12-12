import React from "react";
import "./CompanyManagementInfoOnCard.css"; // Import the CSS file for styling

const CompanyManagementInfoOnCard = () => {
  const cardDetails = [
    {
      title: "Total Companies",
      value: "4,633",
    },
    {
      title: "Stock",
      value: "14,833",
    },
    {
      title: "Value",
      value: "₹1,69,94,569",
    }
  ];

  return (
    <div className="details-on-small-card-container" >
      {cardDetails.map((card, index) => (
        <div key={index} className="card  border-radius box-shadow">
          <div className="card-header">
            <span className="card-title">{card.title}</span>
            {card.dateRange && <span className="card-date">{card.dateRange}</span>}
          </div>
          <p className="card-value">{card.value}</p>
          {card.percentage && (
            <div className="card-footer">
              <span
                className="card-percentage"
                style={{ color: card.color === "green" ? "green" : "red" }}
              >
                {card.percentage}
              </span>
             
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompanyManagementInfoOnCard;
