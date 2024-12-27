import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";


import Header from "./layout/Header/Header";
import Sidebar from "./layout/Sidebar/Sidebar";
import AppNavigator from "./AppNavigator/AppNavigator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./screens/Auth/Login/Login";
import Home from "./screens/LoggedInScreen/HomePage/Home";

function App() {
  // States for managing app state
  const [headerText, setHeaderText] = useState("Dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentModule, setCurrentModule] = useState(() => sessionStorage.getItem('currentModule'));

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);

  // Persist the current module to session storage
  useEffect(() => {
    if (currentModule) {
      sessionStorage.setItem('currentModule', currentModule);
    }
  }, [currentModule]);

  // Handles login state
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Updates the current module and header text
  const handleAppClick = (moduleName) => {
    
    setCurrentModule(moduleName);
    setHeaderText(moduleName);
  };

  // Renders the application layout
  const renderModule = () => (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      {isSidebarVisible && (
        <Sidebar setHeaderText={setHeaderText} />
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header
          headerText={headerText}
          toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Module Content */}
        <div
          style={{
            flex: 1,
            padding: "0px 15px",
            borderLeft: "2px solid var(--card-border)",
          }}
        >
          <AppNavigator searchQuery={searchQuery} currentModule={currentModule} />
        </div>
      </div>
    </div>
  );

  // Main Render Logic
  return (
    <Router>
      {/* Show Login Page or Render Application */}
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        currentModule ? (
          renderModule()
        ) : (
          <Home handleAppClick={handleAppClick} />
        )
      )}
      <ToastContainer />
    </Router>
  );
}

export default App;
