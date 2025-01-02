import React, { useState } from 'react';
import './PerformancePay.css'; // Import CSS for styling
import { generatePaginationButtons } from '../../../../../utils/paginationServices';
import RowsPerPageSelector from '../../../../../utils/rowPerPageSelector';
const PerformancePay = () => {
    const data = [
        {
            name: "Amardeep Subadar", totalSales: "₹45,18,589", dueAmount: "₹6,16,884", payable: "₹16,000", paid: "₹0",
            currentMonth: {
                sales: "₹45,18,589",
                dueAmount: "₹6,16,884",
                performancePay: "Not Yet Achieved"
            },
            lastFourMonths: [
                { month: "December", sales: "₹10,00,000", dueAmount: "₹1,00,000", performancePay: "Achieved" },
                { month: "November", sales: "₹12,00,000", dueAmount: "₹1,20,000", performancePay: "Achieved" },
                { month: "October", sales: "₹11,00,000", dueAmount: "₹1,10,000", performancePay: "Not Yet Achieved" },
                { month: "September", sales: "₹9,00,000", dueAmount: "₹90,000", performancePay: "Not Yet Achieved" },
            ]
        },
        {
            name: "Amardeep Subadar", totalSales: "₹45,18,589", dueAmount: "₹6,16,884", payable: "₹16,000", paid: "₹0",
            currentMonth: {
                sales: "₹45,18,589",
                dueAmount: "₹6,16,884",
                performancePay: "Not Yet Achieved"
            },
            lastFourMonths: [
                { month: "December", sales: "₹10,00,000", dueAmount: "₹1,00,000", performancePay: "Achieved" },
                { month: "November", sales: "₹12,00,000", dueAmount: "₹1,20,000", performancePay: "Achieved" },
                { month: "October", sales: "₹11,00,000", dueAmount: "₹1,10,000", performancePay: "Not Yet Achieved" },
                { month: "September", sales: "₹9,00,000", dueAmount: "₹90,000", performancePay: "Not Yet Achieved" },
            ]
        },
        {
            name: "Amardeep Subadar", totalSales: "₹45,18,589", dueAmount: "₹6,16,884", payable: "₹16,000", paid: "₹0",
            currentMonth: {
                sales: "₹45,18,589",
                dueAmount: "₹6,16,884",
                performancePay: "Not Yet Achieved"
            },
            lastFourMonths: [
                { month: "December", sales: "₹10,00,000", dueAmount: "₹1,00,000", performancePay: "Achieved" },
                { month: "November", sales: "₹12,00,000", dueAmount: "₹1,20,000", performancePay: "Achieved" },
                { month: "October", sales: "₹11,00,000", dueAmount: "₹1,10,000", performancePay: "Not Yet Achieved" },
                { month: "September", sales: "₹9,00,000", dueAmount: "₹90,000", performancePay: "Not Yet Achieved" },
            ]
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentDate = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });


    // Pagination logic
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    if (data?.length > 0 && data !== undefined) {
        var currentItems = data?.slice(startIndex, startIndex + itemsPerPage);
    }
    const renderPagination = () => {
        return generatePaginationButtons(currentPage, totalPages, handlePageChange);
    };

    return (
        <div className='performance-pay-container'>

            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <table className="performance-pay-table company-management-table company-management-table-css" style={{ width: "100%", tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "10%" }}>Total Sales</th>
                            <th style={{ width: "15%" }}>Due Amount</th>
                            <th style={{ width: "10%" }}>Payable</th>
                            <th style={{ width: "10%" }}>Paid</th>
                            
                            <th className='performance-pay-table-header' style={{ width: "40%", textAlign: "center" }} >
                                {currentDate}
                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--table-border-color)", marginTop: "5px" }}>
                                    <span style={{ flex: "1", textAlign: "center" }}>Sales</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Due Amount</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Performance Pay</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td><span className='performance-pay-green'>{item.totalSales}</span></td>
                                <td><span className='performance-pay-red'>{item.dueAmount}</span></td>
                                <td><span>{item.payable}</span></td>
                                <td><span className='performance-pay-red'>{item.paid}</span></td>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: 'row' }}>
                                        <span className="performance-pay-green" style={{ flex: "1", textAlign: "center" }}>{item.currentMonth.sales}</span>
                                        <span className="performance-pay-red" style={{ flex: "1", textAlign: "center" }}>{item.currentMonth.dueAmount}</span>
                                        <span style={{ flex: "1", textAlign: "center" }}>{item.currentMonth.performancePay}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginTop: 15 }}>
                <RowsPerPageSelector
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                <div className="pagination-container" style={{ marginTop: -10, marginRight: 12 }}>{renderPagination()}</div>
            </div>
        </div>

    );
};

export default PerformancePay;