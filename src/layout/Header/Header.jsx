import React from "react";
import "./Header.css";
import { Icons } from "../../Icons/Icons";
import CommonButton from "../../componant/Button/CommonButton";

export default function Header({ toggleSidebar, searchQuery, setSearchQuery }) {

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };



    return (
        <div className="header">
            {/* Left: Hamburger Icon */}
            <button
                className="icon-button icon-button_hambarger"
                onClick={toggleSidebar}
            >
                <img
                    src={Icons.hamburger}
                    alt="Menu"
                    className="icon-image-header-screen"
                />
            </button>

            {/* Center: Header Text */}
            <span className="header-text">
                {sessionStorage.getItem("headerName")}
            </span>

            {/* Right: Search and Icons */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {/* <div style={{ marginRight: 8 }}>
                    <img
                        src={Icons.search_icon}
                        alt="Search"
                        style={{ width: 10, height: 10, position: "relative", left: 20 }}
                    />
                    <CommonButton
                        text="Search"
                        onClick={handleKeyPress}
                    />
                </div> */}

            </div>

            <div className="icons-container">
                <button className="icon-button">
                    <img
                        src={Icons.bell}
                        alt="Notifications"
                        className="icon-image-header-screen"
                    />
                </button>
                <button className="icon-button">
                    <img
                        src={Icons.setting}
                        alt="Settings"
                        className="icon-image-header-screen"
                    />
                </button>
                <button className="icon-button">
                    <img src={Icons.user} alt="User" className="profile-image" />
                </button>
            </div>
        </div>
    );
}
