import React, { useState } from "react";
import "./Dashboard.css"; // Import the CSS file
import MonthSelectDropdown from "../../../../componant/MonthSelectDropdown/MonthSelectDropdown";
import { Icons } from "../../../../Icons/Icons";
import DashboardSalesInfoCard from "./DashboardSalesInfoCard/DashboardSalesInfoCard";
import SalesOverviewChart from './SalesOverviewChart/SalesOverviewChart';
import CallSummaryChart from "./CallSummaryChart/CallSummaryChart";
import TopSellingStatesGraph from "./TopSellingStates/TopSellingStatesGraph";
import SalesTargetVSachieved from "./SalesTarget/SalesTargetVSachieved";


const Dashboard = ({ searchQuery }) => {
  console.log(searchQuery);
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);  // Set the selected month in the parent state
  };
  return (
    <div className="dashboardMainContainer">
      <MonthSelectDropdown onMonthSelect={handleMonthSelect} Icons={Icons} />
      <div className="mt-5" style={{ marginTop: 15 }}>
        <DashboardSalesInfoCard searchQuery={searchQuery} />
      </div>
      <div className="mt-5" style={{ marginTop: 15, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        {/* SalesOverviewChart with 70% width */}
        <div style={{ flex: '65%', background: "#FFF", paddingLeft: 12 }} className="border-radius box-shadow">
          <h2 className="commonHeaderDashboard">Sales overview</h2>
          <SalesOverviewChart />
        </div>

        {/* CallSummaryChart with 30% width */}
        <div style={{ flex: '35%', background: "#FFF", paddingLeft: 12 }} className="border-radius box-shadow">
          <h2 className="commonHeaderDashboard">Call Summary</h2>
          <CallSummaryChart />
        </div>
      </div>

      <div className="mt-5" style={{ marginTop: 15, display: 'flex', justifyContent: 'space-between', gap: 10 }}>

        {/* CallSummaryChart with 30% width */}
        <div style={{ flex: '35%', background: "#FFF", paddingLeft: 12 }} className="border-radius box-shadow">
          <h2 className="commonHeaderDashboard">Top Selling States</h2>
          <TopSellingStatesGraph />
        </div>
        {/* SalesOverviewChart with 70% width */}
        <div style={{ flex: '65%', background: "#FFF", paddingLeft: 12 }} className="border-radius box-shadow">
          <h2 className="commonHeaderDashboard">Sales target vs Achieved</h2>
          <SalesTargetVSachieved />
        </div>


      </div>


    </div>
  );
};

export default Dashboard;
