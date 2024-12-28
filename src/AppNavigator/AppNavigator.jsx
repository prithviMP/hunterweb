import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../screens/LoggedInScreen/ECRM/Dashboard/Dashboard";
import CallManager from "../screens/LoggedInScreen/ECRM/CallManager/CallManager";
import Pricelist from "../screens/LoggedInScreen/ECRM/Sales/Pricelist/Pricelist";
import Leads from "../screens/LoggedInScreen/ECRM/Sales/Leads/Leads";
import SalesReport from "../screens/LoggedInScreen/ECRM/Sales/SalesReport/SalesReport";
import SaleReversal from "../screens/LoggedInScreen/ECRM/Sales/SaleReversal/SaleReversal";
import StockRequests from "../screens/LoggedInScreen/ECRM/Sales/StockRequests/StockRequests";
import Order from "../screens/LoggedInScreen/ECRM/Sales/Orders/Order";
import Invoice from "../screens/LoggedInScreen/ECRM/Sales/Invoice/Invoice";
import CompanyManagement from "../screens/LoggedInScreen/ECRM/ContactManager/CompanyManagement/CompanyManagement";
import Contact from "../screens/LoggedInScreen/ECRM/ContactManager/Contact/Contact";
import AddContact from "../screens/LoggedInScreen/ECRM/ContactManager/Contact/AddContact/AddContact";
import TransferContacts from "../screens/LoggedInScreen/ECRM/ContactManager/TransferContacts/TransferContacts";
import TempContacts from "../screens/LoggedInScreen/ECRM/ContactManager/TempContacts/TempContacts";
// import PerformanceMetrices from "../screens/LoggedInScreen/ECRM/PerformanceMetrices";
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
                        <Route path="call-manager" element={<CallManager searchQuery={searchQuery} />} />



                        {/* Sales */}
                        <Route path="/sales/leads" element={<Leads searchQuery={searchQuery} />} />
                        <Route path="/sales/pricelist" element={<Pricelist searchQuery={searchQuery} />} />
                        <Route path="/sales/reports" element={<SalesReport searchQuery={searchQuery} />} />
                        <Route path="/sales/reversal" element={<SaleReversal searchQuery={searchQuery} />} />
                        <Route path="/sales/stock-request" element={<StockRequests searchQuery={searchQuery} />} />
                        <Route path="/sales/order" element={<Order searchQuery={searchQuery} />} />
                        <Route path="/sales/invoice" element={<Invoice searchQuery={searchQuery} />} />

                        {/* Contact Manager */}
                        <Route
                            path="/contact-manager/company-management"
                            element={<CompanyManagement searchQuery={searchQuery} />}
                        />
                        <Route path="/contact-manager/contact" element={<Contact searchQuery={searchQuery} />} />
                        <Route path="/contact-manager/add-contact" element={<AddContact />} />
                        <Route path="/contact-manager/temp-contacts" element={<TempContacts searchQuery={searchQuery} />} />
                        <Route path="/contact-manager/transfer-contacts" element={<TransferContacts searchQuery={searchQuery} />} />
                        {/* <Route path="/performance-metrices" element={<PerformanceMetrices searchQuery={searchQuery} />} /> */}
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