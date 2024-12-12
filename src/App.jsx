import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header/Header";
import Sidebar from "./layout/Sidebar/Sidebar";
import AppNavigator from "./AppNavigator/AppNavigator";


function App() {
  const [headerText, setHeaderText] = useState("Dashboard");
  const [isSidebarVisible, setSidebarVisible] = useState(true); // Manage sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle visibility of sidebar
  };
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", width: '100vw' }}>
        <div style={{ display: "flex" }}>
          {isSidebarVisible && (
            <Sidebar setHeaderText={setHeaderText} />
          )}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header with full width */}
          <div style={{ width: '100%' }}>
            <Header headerText={headerText} toggleSidebar={toggleSidebar} />
          </div>

          {/* Main content */}
          <div style={{ flex: 1, padding: "0px 15px", borderLeft: '2px solid var(--card-border)' }}>
            <AppNavigator />
          </div>
        </div>
      </div>
    </Router>
  );

}

export default App;
