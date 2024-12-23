import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../screens/LoggedInScreen/ECRM/Dashboard/Dashboard";
import Sales from "../screens/LoggedInScreen/ECRM/Sales/Sales";
import CallManager from "../screens/LoggedInScreen/ECRM/CallManager/CallManager";
import PerformanceMetrics from "../screens/LoggedInScreen/ECRM/PerformanceMetrics/PerformanceMetrics";
import Targets from "../screens/LoggedInScreen/ECRM/Targets/Targets";
import InvoiceManagement from "../screens/LoggedInScreen/ECRM/InvoiceManagement/InvoiceManagement";
import Pricelist from "../screens/LoggedInScreen/ECRM/Pricelist/Pricelist";
import CompanyManagement from "../screens/LoggedInScreen/ECRM/CompanyManagement/CompanyManagement";

function AppNavigator({ searchQuery, currentModule }) {
    const renderModule = () => {
        switch (currentModule) {
            case 'Data control':
                return null;
            case 'DSR':
                return null;
            case 'Website':
                return null;
            case 'Human Resource':
                return null;
            case 'Inventory':
                return null;
            case 'Marketing':
                return null;
            case 'Logistics':
                return null;
            case 'Purchase':
                return null;
            case 'E-CRM':
                return (
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard searchQuery={searchQuery} />} />
                        <Route path="sales" element={<Sales searchQuery={searchQuery} />} />
                        <Route path="call-manager" element={<CallManager searchQuery={searchQuery} />} />
                        <Route
                            path="performance-metrics"
                            element={<PerformanceMetrics searchQuery={searchQuery} />}
                        />
                        <Route path="targets" element={<Targets searchQuery={searchQuery} />} />
                        <Route
                            path="invoice-management"
                            element={<InvoiceManagement searchQuery={searchQuery} />}
                        />
                        <Route path="pricelist" element={<Pricelist searchQuery={searchQuery} />} />
                        <Route
                            path="company-management"
                            element={<CompanyManagement searchQuery={searchQuery} />}
                        />
                    </Routes>
                );
            case 'Service':
                return null;
            case 'User Control':
                return null;
            case 'PMS':
                return null;
            case 'Projector Lamps':
                return null;
            case 'Tutorial':
                    return null;
            default:
                return null;
        }
    };

    return (
        <Routes>
            <Route path="/*" element={renderModule()} />
        </Routes>
    );
}

export default AppNavigator;