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
                { name: "Lead", navigateTo: "/sales/leads" },
                { name: "Quote", navigateTo: "/sales/quote" },
                { name: "Unbilled Partners", navigateTo: "/sales/unbilled-partners" },
                { name: "Category Search", navigateTo: "/sales/category-search" },
                { name: "Sales Order", navigateTo: "/sales/order" },

                { name: "Invoice", navigateTo: "/sales/invoice" },
                { name: "Unpaid Invoice", navigateTo: "/sales/unpaid-invoice" },
                { name: "Invoice Line Item", navigateTo: "/sales/invoice-line-item" },
                { name: "Receipt", navigateTo: "/sales/receipt" },
                { name: "Credit Note", navigateTo: "/sales/credit-note" },
                { name: "ORC", navigateTo: "/sales/orc" },
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
            navigateTo: "/call-manager/all-call-logs",
            subItems: [
                { name: "All Call Logs", navigateTo: "/call-manager/all-call-logs" },
                { name: "Pending Logs", navigateTo: "/call-manager/pending-logs" },

            ]
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
        { name: "Commit", icon: Icons.stash_invoice, icon_white: Icons.stash_invoice_white, navigateTo: "/commit" },
        {
            name: "Plans", icon: Icons.priceList, icon_white: Icons.priceListWhite, navigateTo: "/pricelist",
            subItems: [
                { name: "My Plans", navigateTo: "/plans/my-plans" },
                { name: "Contact Plans", navigateTo: "/plans/contact-plans" },
            ]
        },


        {
            name: "Performance Metrices", icon: Icons.mdi_target, icon_white: Icons.mdi_target_white, navigateTo: "/performance-metrices/sales-performance",
            subItems: [
                { name: "Sales Performance", navigateTo: "/performance-metrices/sales-performance" },
                { name: "Performance Pay", navigateTo: "/performance-metrices/performance-pay" },
                { name: "Statewise Performance", navigateTo: "/performance-metrices/statewise-performance" },
            ]
        },
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
                                if (item.name === "Commit") {
                                    sessionStorage.setItem('headerName', "My Commit");
                                } else if (item.name === "Contact Manager") {
                                    sessionStorage.setItem('headerName', "Company Management");
                                } else {
                                    sessionStorage.setItem('headerName', item.name);
                                }
                                if (item.name === "Sales") {
                                    setOpenSubmenu(openSubmenu === "Sales" ? null : "Sales");
                                } else if (item.name === "Call Manager") {
                                    setOpenSubmenu(openSubmenu === "Call Manager" ? null : "Call Manager");
                                } else if (item.name === "Contact Manager") {
                                    setOpenSubmenu(openSubmenu === "Contact Manager" ? null : "Contact Manager");
                                } else if (item.name === "Performance Metrices") {
                                    setOpenSubmenu(openSubmenu === "Performance Metrices" ? null : "Performance Metrices");
                                } else if (item.name === "Plans") {
                                    setOpenSubmenu(openSubmenu === "Plans" ? null : "Plans");
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
                                            if (subItem.name === "Company") {
                                                sessionStorage.setItem('headerName', "Company Management");
                                            } else {
                                                sessionStorage.setItem('headerName', subItem.name);
                                            }
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
