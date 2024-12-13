import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../screens/LoggedInScreen/Dashboard/Dashboard";
import Sales from "../screens/LoggedInScreen/Sales/Sales";
import CallManager from "../screens/LoggedInScreen/CallManager/CallManager";
import PerformanceMetrics from "../screens/LoggedInScreen/PerformanceMetrics/PerformanceMetrics";
import Targets from "../screens/LoggedInScreen/Targets/Targets";
import InvoiceManagement from "../screens/LoggedInScreen/InvoiceManagement/InvoiceManagement";
import Pricelist from "../screens/LoggedInScreen/Pricelist/Pricelist";
import CompanyManagement from "../screens/LoggedInScreen/CompanyManagement/CompanyManagement";

function AppNavigator({ searchQuery }) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery} />} />
            <Route path="/sales" element={<Sales searchQuery={searchQuery} />} />
            <Route path="/call-manager" element={<CallManager searchQuery={searchQuery} />} />
            <Route
                path="/performance-metrics"
                element={<PerformanceMetrics searchQuery={searchQuery} />}
            />
            <Route path="/targets" element={<Targets searchQuery={searchQuery} />} />
            <Route
                path="/invoice-management"
                element={<InvoiceManagement searchQuery={searchQuery} />}
            />
            <Route path="/pricelist" element={<Pricelist searchQuery={searchQuery} />} />
            <Route
                path="/company-management"
                element={<CompanyManagement searchQuery={searchQuery} />}
            />
        </Routes>
    );
}

export default AppNavigator;
