import React, { useState } from 'react';
import './PerformancePay.css'; // Import CSS for styling
import { generatePaginationButtons } from '../../../../../utils/paginationServices';
import RowsPerPageSelector from '../../../../../utils/rowPerPageSelector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear + index); // Create an array of years

    const [startYear, setStartYear] = useState(currentYear); // Default start year
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentDate = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
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


    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [salesId, setSalesId] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentMonth, setPaymentMonth] = useState('');
    const [reference, setReference] = useState('');
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        if (!salesId) newErrors.salesId = "Sales ID is required.";
        if (!amount) newErrors.amount = "Amount is required.";
        if (!paymentDate) newErrors.paymentDate = "Payment Date is required.";
        if (!paymentMonth) newErrors.paymentMonth = "Payment Month is required.";
        if (!reference) newErrors.reference = "Reference is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Update the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission
            console.log("Form submitted successfully");
        }
    };

    return (
        <div className='performance-pay-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <div>
                    <select style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option>Select sales ID</option>
                        <option>Vipul</option>
                        <option>Rajesh</option>
                        <option>Rajesh</option>
                    </select>

                    <DatePicker className='performance-pay-date-picker'
                        selected={startDate}
                        onChange={(update) => setDateRange(update)}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        showYearPicker
                        dateFormat="yyyy"
                        minDate={new Date("2024")}
                        maxDate={new Date("2025")}
                        placeholderText="2024-2025"
                    />
                </div>


                <div>
                    <button onClick={togglePopup} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px' }}>
                        + Add Payment
                    </button>
                </div>

            </div>

            <div style={{ overflowY: 'auto', overflowX: 'auto', maxHeight: '400px' }}>
                <table className="performance-pay-table company-management-table company-management-table-css" style={{ width: "200%", tableLayout: "fixed", borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "10%" }}>Total Sales</th>
                            <th style={{ width: "15%" }}>Due Amount</th>
                            <th style={{ width: "10%" }}>Payable</th>
                            <th style={{ width: "10%" }}>Paid</th>


                            <th className='performance-pay-table-header' style={{ width: "40%", textAlign: "center" }}  >
                                {currentDate}
                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--table-border-color)", marginTop: "5px" }}>
                                    <span style={{ flex: "1", textAlign: "center" }}>Sales</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Due Amount</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Performance Pay</span>
                                </div>
                            </th>
                            <th className='performance-pay-table-header' style={{ width: "40%", textAlign: "center" }}  >
                                Feburary 2025
                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--table-border-color)", marginTop: "5px" }}>
                                    <span style={{ flex: "1", textAlign: "center" }}>Sales</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Due Amount</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Performance Pay</span>
                                </div>
                            </th>
                            <th className='performance-pay-table-header' style={{ width: "40%", textAlign: "center" }}  >
                                March 2025
                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--table-border-color)", marginTop: "5px" }}>
                                    <span style={{ flex: "1", textAlign: "center" }}>Sales</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Due Amount</span>
                                    <span style={{ flex: "1", textAlign: "center" }}>Performance Pay</span>
                                </div>
                            </th>
                            <th className='performance-pay-table-header' style={{ width: "40%", textAlign: "center" }}  >
                                April 2025
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
                                {item.lastFourMonths.map((month, index) => (
                                    <td>
                                        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: 'row' }}>
                                            <span className="performance-pay-green" style={{ flex: "1", textAlign: "center" }}>{month.sales}</span>
                                            <span className="performance-pay-red" style={{ flex: "1", textAlign: "center" }}>{month.dueAmount}</span>
                                            <span style={{ flex: "1", textAlign: "center" }}>{month.performancePay}</span>
                                        </div>
                                    </td>
                                ))}
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

            {isPopupVisible && (
                <div className="performance-pay-popup-overlay sales-order-popup-overlay">
                    <div className="performance-pay-popup sales-order-popup-content">
                        <div className="performance-pay-popup-header">
                            <div>
                                <h2>Add Payment</h2>
                            </div>
                            <div>
                                <button
                                    className="performance-pay-close-button"
                                    onClick={togglePopup}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <form className="performance-pay-form" onSubmit={handleSubmit}>
                            <label className='commonTextCss'>Sales ID *</label>
                            <select className="performance-pay-input performance-pay-select commonInputCss" value={salesId} onChange={(e) => setSalesId(e.target.value)}>
                                <option>Select Sales ID</option>
                            </select>
                            {errors.salesId && <span className="error-message" style={{ marginTop: -12 }}>{errors.salesId}</span>}

                            <label className='commonTextCss'>Amount *</label>
                            <input type="number" className="performance-pay-input commonInputCss" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            {errors.amount && <span className="error-message" style={{ marginTop: -12 }}>{errors.amount}</span>}

                            <label className='commonTextCss'>Payment Date *</label>
                            <input type="date" className="performance-pay-input commonInputCss" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                            {errors.paymentDate && <span className="error-message" style={{ marginTop: -12 }}>{errors.paymentDate}</span>}

                            <label className='commonTextCss'>Payment Month *</label>
                            <input type="month" className="performance-pay-input commonInputCss" value={paymentMonth} onChange={(e) => setPaymentMonth(e.target.value)} />
                            {errors.paymentMonth && <span className="error-message" style={{ marginTop: -12 }}>{errors.paymentMonth}</span>}

                            <label className='commonTextCss'>Reference *</label>
                            <input type="text" className="performance-pay-input commonInputCss" value={reference} onChange={(e) => setReference(e.target.value)} />
                            {errors.reference && <span className="error-message" style={{ marginTop: -12 }}>{errors.reference}</span>}

                            <div style={{ textAlign: "center" }}>
                                <button type="submit" className="performance-pay-submit-button commonButtonCss" style={{ borderRadius: 20 }}>
                                    Add Payment
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default PerformancePay;