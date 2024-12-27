import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../../Icons/Icons';
import './Sidebar.css';

export default function Sidebar({ setHeaderText }) {
    const [currentModule, setCurrentModule] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const menuItems = [
        { name: "Dashboard", icon: Icons.dashboard, icon_white: Icons.dashboardWhite, navigateTo: "/dashboard" },
        {
            name: "Sales",
            icon: Icons.codicon_graph,
            icon_white: Icons.codicon_graph_white,
            rightIcon: Icons.codicon_chevron_right,
            navigateTo: "/sales/reports",
            subItems: [
                { name: "Sales Reports", navigateTo: "/sales/reports" },
                { name: "Leads", navigateTo: "/sales/leads" },
                { name: "Updated Partners", navigateTo: "/sales/updated-partners" },
                { name: "Category Search", navigateTo: "/sales/category-search" },
                { name: "Sales Order", navigateTo: "/sales/order" },
                { name: "Invoice", navigateTo: "/sales/invoice" },
                { name: "Invoice Line Item", navigateTo: "/sales/invoice-line-item" },
                { name: "Receipt", navigateTo: "/sales/receipt" },
                { name: "Credit Note", navigateTo: "/sales/credit-note" },
                { name: "CPO", navigateTo: "/sales/cpo" },
                { name: "Pricelist", navigateTo: "/sales/pricelist" },
                { name: "Sales Reversal", navigateTo: "/sales/reversal" },
                { name: "Stock Request", navigateTo: "/sales/stock-request" },
                { name: "Campaign Search", navigateTo: "/sales/campaign-search" },
            ]
        },
        {
            name: "Call Manager",
            icon: Icons.ion_call_outline,
            icon_white: Icons.ion_call_outline_white,
            navigateTo: "/call-manager",
        },

        {
            name: "Contact Manager", icon: Icons.mdi_target, icon_white: Icons.mdi_target_white, navigateTo: "/contact-manager/company-management",
            subItems: [
                { name: "Company", navigateTo: "/contact-manager/company-management" },
                { name: "Contact", navigateTo: "/contact-manager/contact" },
                { name: "Temp Contacts", navigateTo: "/contact-manager/temp-contacts" },
                { name: "Transfer Contacts", navigateTo: "/contact-manager/transfer-contacts" },
            ]
        },
        { name: "Commit", icon: Icons.stash_invoice, icon_white: Icons.stash_invoice_white, navigateTo: "/invoice-management" },
        { name: "Plans", icon: Icons.priceList, icon_white: Icons.priceListWhite, navigateTo: "/pricelist" },
        { name: "Performance Metrices", icon: Icons.priceList, icon_white: Icons.priceListWhite, navigateTo: "/performance-metrices" },

    ];

    useEffect(() => {
        setCurrentModule(sessionStorage.getItem('currentModule'));
    }, []);


    return (
        <div className="sidebar">
            {currentModule === "E-CRM" && (
                menuItems.map((item) => (
                    <div key={item.name}>
                        <NavLink
                            to={item.navigateTo}
                            className={({ isActive }) => `menu-item ${isActive ? "selected" : ""}`}
                            onClick={() => {
                                setHeaderText(item.name);
                                sessionStorage.setItem('headerName', item.name);
                                if (item.name === "Sales") {
                                    setOpenSubmenu(openSubmenu === "Sales" ? null : "Sales");
                                } else if (item.name === "Call Manager") {
                                    setOpenSubmenu(openSubmenu === "Call Manager" ? null : "Call Manager");
                                } else if (item.name === "Contact Manager") {
                                    setOpenSubmenu(openSubmenu === "Contact Manager" ? null : "Contact Manager");
                                } else {
                                    setOpenSubmenu(null);
                                }
                            }}
                        >
                            <div className="commoncss" style={{ width: "95%" }}>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={item.icon} alt={item.name} className="icon-image default-icon" />
                                    <img src={item.icon_white} alt={item.name} className={`icon-image active-icon ${item.icon_white && "hide-on-default"}`} />
                                    <span className="menu-item-text">{item.name}</span>
                                </div>

                                {item.name !== "Dashboard" && (
                                    <div>
                                        <i className='fa-solid fa-angle-right'></i>
                                    </div>
                                )}
                            </div>
                        </NavLink>
                        {item.subItems && openSubmenu === item.name && (
                            <div className="submenu">
                                {item.subItems.map((subItem) => (
                                    <NavLink
                                        key={subItem.name}
                                        to={subItem.navigateTo}
                                        className={({ isActive }) => `submenu-item ${isActive ? "selected" : ""}`}
                                        onClick={() => {
                                            setHeaderText(subItem.name);
                                            sessionStorage.setItem('headerName', subItem.name);
                                        }}
                                    >
                                        - {subItem.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
