import React from "react";
import "./SalesInfoCards.css"; // Import CSS styles

const SalesInfoCards = ({ searchQuery }) => {
  const cardDetails = [
    {
      title: "Sales",
      value: "₹ 27,50,000",
      dateRange: "1 Nov - 30 Nov",
      percentage: "+10%",
      color: "green",
    },
    {
      title: "Pipeline deals",
      value: "68",
      dateRange: "1 Nov - 30 Nov",
      percentage: "-8%",
      color: "red",
    },
    {
      title: "Pipeline won",
      value: "₹ 11,82,598",
      dateRange: "1 Nov - 30 Nov",
      percentage: "+5%",
      color: "green",
    },
    {
      title: "Average revenue",
      value: "₹ 13,76,494",
      dateRange: "1 Nov - 30 Nov",
      percentage: "+10%",
      color: "green",
    },
  ];

  const filteredCards = cardDetails.filter((card) =>
    card.title.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    card.value.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    card.percentage.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="details-on-small-card-container mt-15 ">
      {filteredCards.map((card, index) => (
        <div key={index} className="card box-shadow">
          <div className="card-header">
            <span className="card-title">{card.title}</span>
            <span className="card-date">{card.dateRange}</span>
          </div>
          <p className="card-value">{card.value}</p>
          <p className="card-percentage" style={{ color: card.color }}>
            {card.percentage}{" "}
            <span className="since-last-month">since last month</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SalesInfoCards;
