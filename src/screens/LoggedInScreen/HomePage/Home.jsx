import React, { useState } from "react";
import "./Home.css";
import { Icons } from "../../../Icons/Icons";
import IndiaMap from "./IndiaMap/IndiaMap";


const appsList = [
    {
        icon: Icons.data_control,
        title: "Data control",
        description: "Manage data access, validation, security, and ensures accurate"
    },
    {
        icon: Icons.dsr,
        title: "DSR",
        description: "Track and manages daily sales activities and performance metrics"
    },
    {
        icon: Icons.website,
        title: "Website",
        description: "The company's online presence for products and services"
    },
    {
        icon: Icons.hunterMail,
        title: "Hunter Mail",
        description: "Provides a secure and organized email platform for company communication"
    },
    {
        icon: Icons.hr,
        title: "Human Resource",
        description: "Manage employee records, payroll, attendance, and HR-related activities"
    },
    {
        icon: Icons.inventory,
        title: "Inventory",
        description: "Track stock levels, product movements, and restocking needs in real-time"
    },
    {
        icon: Icons.marketing,
        title: "Marketing",
        description: "Plan, execute, and track marketing campaigns to boost brand visibility and sales"
    },
    {
        icon: Icons.logistics,
        title: "Logistics",
        description: "Coordinate the transportation, storage, and delivery of goods efficiently."
    },
    {
        icon: Icons.purchases,
        title: "Purchase",
        description: "Handles procurement of materials, vendor management, and purchase orders"
    },
    {
        icon: Icons.E_CRM,
        title: "E-CRM",
        description: "Enhances customer interactions and manages relationships digitally."
    },

    {
        icon: Icons.service,
        title: "Service",
        description: "Manage customer support, maintenance requests, and service delivery processes."
    },
    {
        icon: Icons.user_controll,
        title: "User Control",
        description: "Regulate user roles, access permissions, and security settings"
    },
    {
        icon: Icons.PMS,
        title: "PMS",
        description: "Organize, track, and manage ongoing projects and tasks."
    },

    {
        icon: Icons.projector_lamps,
        title: "Projector Lamps",
        description: "Product details"
    },

    {
        icon: Icons.tutorials,
        title: "Tutorial",
        description: "Get tutorial about the website, products and others"
    },

];

const notificationData = {
    "notifications": [
        {
            "type": "info",
            "title": "New Lead Assigned",
            "message": "Info"
        },
        {
            "type": "reminder",
            "title": "Meeting scheduled for 3 PM",
            "message": "Reminder"
        },
        {
            "type": "success",
            "title": "Sales target achieved!",
            "message": "Success"
        },
        {
            "type": "warning",
            "title": "Update required for DSR",
            "message": "Warning"
        },
        {
            "type": "reminder",
            "title": "Meeting scheduled for 5 PM",
            "message": "Reminder"
        }
    ]
}


const Home = ({ handleAppClick }) => {
    const loggedInUserState = "Kashmir";
    const userName = sessionStorage.getItem("userName");
    const pendingTasks = 5;
    const time = new Date().toLocaleTimeString();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoadingMap, setIsLoadingMap] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userProfileJson = [
        {
            name: "Profile",
            icon: <i className="fa-regular fa-user"></i>,
            path: "/setting"
        },
        {
            name: "Logout",
            icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
            path: "/setting"
        }
    ]
    const handleMapLoad = () => {
        setTimeout(() => {
            setIsLoadingMap(false);
        }, 500);
    };

    const filteredApps = appsList.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleUserProfileItemClick = (itemType) => {
        if (itemType === "Logout") {
            sessionStorage.clear();
            localStorage.clear();
            window.location.replace("/");
        } else if (itemType === "Home") {
            sessionStorage.removeItem("currentModule");
            sessionStorage.removeItem("headerName");
            window.location.reload();
        }
    };


    return (
        <div className="home-container">
            <div className="home-page-header box-shadow">
                <div className="greeting-section">
                    <div className="greeting-section-left">
                        <h2>Good Morning, {userName}!</h2>
                        <p><span>{time}</span> | Pending Tasks: <span style={{ fontSize: "20px", position: "relative", top: "2px" }}>{pendingTasks}</span></p>
                    </div>
                    <div className="home-page-header-img" onClick={toggleDropdown}>
                        <img src={Icons.home_page_header_img} alt="Home Page Header" />
                        {isDropdownOpen && (
                            <div className="dropdown-menu-home-page">
                                {userProfileJson.map((item, index) => (
                                    <div key={index} className="dropdown-item-home-page" onClick={() => handleUserProfileItemClick(item.name)}>
                                        {item.icon} {item.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="home-page-content">
                <div className="home-page-map-container">
                    <h1>India Map</h1>
                    {isLoadingMap && <p style={{ textAlign: "center", fontSize: "17px", fontWeight: "500", color: "#5B2AB5" }}>Loading map...</p>}
                    <IndiaMap onLoad={handleMapLoad} />
                </div>
                <div className="home-page-apps-container-wrapper">
                    <div className="home-page-apps-container box-shadow">
                        <div className="home-page-apps-header">
                            <h2>Apps Directory</h2>
                            <div className="home-page-search-box">
                                <input
                                    type="text"
                                    placeholder="Search Apps"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="button">
                                    <img src={Icons.search_icon} alt="Search Icon" />
                                </button>
                            </div>
                        </div>
                        <div className="home-page-apps-grid">
                            {filteredApps.map((app, index) => (
                                <div key={index} className="home-page-app-card" onClick={() => handleAppClick(app.title)}>
                                    <div className="home-page-app-icon">
                                        <img src={app.icon} alt={app.title} />
                                        <h3>{app.title}</h3>
                                    </div>
                                    <div className="home-page-app-info">
                                        <p>{app.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="home-page-bottom-section">
                        <div className="upcoming-birthday box-shadow">
                            <h2><i style={{ color: "#5B2AB5" }} className="fa-solid fa-gift"></i> Upcoming Birthday</h2>
                            <div className="birthday-list">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <div key={index} className="birthday-item">
                                        <div className="birthday-info">
                                            <i className="fa-regular fa-calendar"></i>
                                            <div>
                                                <h4>Asha Latha</h4>
                                                <p>March 15</p>
                                            </div>
                                        </div>
                                        <i style={{ color: "#5B2AB5" }} className="fa-regular fa-paper-plane"></i>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="notifications box-shadow">
                            <h2><i style={{ color: "#FF8800" }} className="fa-regular fa-bell"></i> Notifications</h2>
                            <div className="notification-list">
                                {notificationData.notifications.map((notification, index) => (
                                    <div key={index} className={`notification-item ${notification.type}`}>
                                        <div className="notification-content">
                                            <h4>{notification.title}</h4>
                                            <p>{notification.message}</p>
                                        </div>
                                        <i className="fa-regular fa-bell"></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
