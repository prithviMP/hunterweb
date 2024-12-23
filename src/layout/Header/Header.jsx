import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Icons } from "../../Icons/Icons";

export default function Header({ toggleSidebar, searchQuery, setSearchQuery }) {
    const [showSetting, setShowSetting] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);

    // References for detecting clicks outside
    const settingRef = useRef(null);
    const userProfileRef = useRef(null);

    const settingJson = [
        {
            name: "Data control",
            icon: Icons.data_control,
            path: "/setting"
        },
        {
            name: "DSR",
            icon: Icons.dsr,
            path: "/setting"
        },
        {
            name: "Website",
            icon: Icons.website,
            path: "/setting"
        },
        {
            name: "Hunter Mail",
            icon: Icons.hunterMail,
            path: "/setting"
        },
        {
            name: "Human Resource",
            icon: Icons.hr,
            path: "/setting"
        },
        {
            name: "Inventory",
            icon: Icons.inventory,
            path: "/setting"
        },
        {
            name: "Marketing",
            icon: Icons.marketing,
            path: "/setting"
        },
        {
            name: "Logistics",
            icon: Icons.logistics,
            path: "/setting"
        },
        {
            name: "Purchase",
            icon: Icons.purchases,
            path: "/setting"
        },
        {
            name: "E-CRM",
            icon: Icons.E_CRM,
            path: "/setting"
        },
        {
            name: "Service",
            icon: Icons.service,
            path: "/setting"
        },
        {
            name: "User Control",
            icon: Icons.user_controll,
            path: "/setting"
        },
        {
            name: "PMS",
            icon: Icons.PMS,
            path: "/setting"
        },
        {
            name: "Projector Lamps",
            icon: Icons.projector_lamps,
            path: "/setting"
        },
        {
            name: "Tutorial",
            icon: Icons.tutorials,
            path: "/setting"
        }
    ]
    const userProfileJson = [
        {
            name: "Home",
            icon: <i className="fa-solid fa-house"></i>,
            path: "/setting"
        },

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSettingClick = () => {
        setShowSetting(!showSetting);
        setShowUserProfile(false);
    };

    const handleSettingItemClick = (currentModule) => {
        setShowSetting(!showSetting);
        sessionStorage.setItem("currentModule", currentModule);

        if (currentModule === "E-CRM") {
            window.location.replace("/dashboard");
            sessionStorage.setItem("headerName", "Dashboard");
        } else {
            window.location.replace("/dashboard");
            sessionStorage.setItem("headerName", "Dashboard");
        }
        
    };

    const handleUserProfileClick = () => {
        setShowUserProfile(!showUserProfile);
        setShowSetting(false);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                settingRef.current &&
                !settingRef.current.contains(event.target) &&
                showSetting
            ) {
                setShowSetting(false);
            }
            if (
                userProfileRef.current &&
                !userProfileRef.current.contains(event.target) &&
                showUserProfile
            ) {
                setShowUserProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSetting, showUserProfile]);

    return (
        <div className="header-navbar">
            <div className="header-navbar-left">
                <div className="header-navbar-left-left">
                    <button
                        className="icon-button icon-button_hambarger-navbar"
                        onClick={toggleSidebar}
                    >
                        <img src={Icons.hamburger} alt="Menu" className="icon-image-header-screen" />
                    </button>
                </div>
                <div className="header-text-navbar">
                    {sessionStorage.getItem("headerName")}
                </div>
            </div>

            <div className="search-container-navbar">
                <div className="search-input-container-navbar">
                    <input
                        type="text"
                        className="search-input-navbar"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="icons-container-navbar">
                    <button className="icon-button-navbar">
                        <img
                            src={Icons.bell}
                            alt="Notifications"
                            className="icon-image-header-screen"
                        />
                    </button>
                    <button className="icon-button-navbar" onClick={handleSettingClick}>
                        <img
                            src={Icons.setting}
                            alt="Settings"
                            className="icon-image-header-screen"
                        />
                    </button>
                    <button className="icon-button-navbar" onClick={handleUserProfileClick}>
                        <img src={Icons.user} alt="User" className="profile-image" />
                    </button>
                </div>
            </div>

            {showSetting && (
                <div ref={settingRef} className="setting-container-navbar">
                    <div className="setting-item-navbar">
                        {settingJson.map((item, index) => (
                            <div
                                key={index}
                                className="setting-item"
                                onClick={() => handleSettingItemClick(item.name)}
                            >
                                <img src={item.icon} alt={item.name} className="setting-image-navbar" />
                                <p className="setting-text-navbar">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showUserProfile && (
                <div ref={userProfileRef} className="user-profile-container-navbar setting-container-navbar">
                    <div className="user-profile-item-navbar">
                        {userProfileJson.map((item, index) => (
                            <div
                                key={index}
                                className="user-profile-item setting-text-navbar"
                                onClick={() => handleUserProfileItemClick(item.name)}
                            >
                                {item.icon}
                                <p className="user-profile-text-navbar">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
