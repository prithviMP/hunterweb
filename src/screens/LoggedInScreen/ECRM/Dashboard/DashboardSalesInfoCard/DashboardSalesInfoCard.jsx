import React from "react";
import "./DashboardSalesInfoCard.css"; // Import the CSS file for styling

const DashboardSalesInfoCard = ({ searchQuery }) => {
  const cardDetails = [
    {
      title: "Total Sales",
      value: "₹ 27,50,000",
    },
    {
      title: "Current month sales",
      value: "₹ 27,50,000",
      percentage: "+10%",
      color: "green",
    },
    {
      title: "Active Companies",
      value: "4483",
    },
    {
      title: "New Contacts",
      value: "23",
      dateRange: "1 Nov - 30 Nov",
      percentage: "+10%",
      color: "green",
    },
    {
      title: "Total Call Logs",
      value: "500",
      percentage: "+10%",
      color: "green",
    },
    {
      title: "Pending Calls",
      value: "80",
    },
    {
      title: "New Leads",
      value: "76",
      dateRange: "1 Nov - 30 Nov",
      percentage: "+10%",
      color: "green",
    },
  ];

  // Filter cards based on search query
  const filteredCards = cardDetails.filter((card) =>
    card.title.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="details-on-small-card-container" >
      {filteredCards.map((card, index) => (
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
              <span className="since-last-month">since last month</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardSalesInfoCard;
