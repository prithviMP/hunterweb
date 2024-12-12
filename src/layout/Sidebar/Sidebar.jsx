import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../../Icons/Icons';
import './Sidebar.css';

export default function Sidebar({ setHeaderText }) {
    const menuItems = [
        { name: "Dashboard", icon: Icons.dashboard, icon_white: Icons.dashboardWhite, navigateTo: "/dashboard" },
        { name: "Sales", icon: Icons.codicon_graph, icon_white: Icons.codicon_graph_white, navigateTo: "/sales" },
        { name: "Call Manager", icon: Icons.ion_call_outline, icon_white: Icons.ion_call_outline_white, navigateTo: "/call-manager" },
        { name: "Performance Metrics", icon: Icons.eos_icons_performance, icon_white: Icons.eos_icons_performance_white, navigateTo: "/performance-metrics" },
        { name: "Targets", icon: Icons.mdi_target, icon_white: Icons.mdi_target_white, navigateTo: "/targets" },
        { name: "Invoice Management", icon: Icons.stash_invoice, icon_white: Icons.stash_invoice_white, navigateTo: "/invoice-management" },
        { name: "Pricelist", icon: Icons.priceList, icon_white: Icons.priceListWhite, navigateTo: "/pricelist" },
        { name: "Company Management", icon: Icons.mdi_company, icon_white: Icons.mdi_company_white, navigateTo: "/company-management" },
    ];

    return (
        <div className="sidebar">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.navigateTo}
                    className={({ isActive }) => `menu-item ${isActive ? "selected" : ""}`}
                    onClick={() => {
                        setHeaderText(item.name);
                        sessionStorage.setItem('headerName', item.name);
                    }}
                >
                    <div className="commoncss">
                        {/* Default icon */}
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="icon-image default-icon"
                        />
                        {/* White icon for active state */}
                        <img
                            src={item.icon_white}
                            alt={item.name}
                            className={`icon-image active-icon ${item.icon_white && "hide-on-default"}`}
                        />
                        <span className="menu-item-text">{item.name}</span>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}
