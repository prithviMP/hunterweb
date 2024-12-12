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

function AppNavigator() {
    return (
        <Routes>
            {/* Default route redirects to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<div><Dashboard /></div>} />
            <Route path="/sales" element={<div><Sales /></div>} />
            <Route path="/call-manager" element={<div><CallManager /></div>} />
            <Route path="/performance-metrics" element={<div><PerformanceMetrics /></div>} />
            <Route path="/targets" element={<div><Targets /></div>} />
            <Route path="/invoice-management" element={<div><InvoiceManagement /></div>} />
            <Route path="/pricelist" element={<div><Pricelist /></div>} />
            <Route path="/company-management" element={<div><CompanyManagement /></div>} />
        </Routes>
    );
}

export default AppNavigator;
