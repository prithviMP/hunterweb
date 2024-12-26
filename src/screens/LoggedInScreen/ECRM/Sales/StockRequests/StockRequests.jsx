import React, { useState, useEffect } from "react";
import "./StockRequests.css";
import { Icons } from "../../../../../Icons/Icons";
import CommonButton from "../../../../../componant/Button/CommonButton";

const StockRequests = ({ onDeleteRequest, searchQuery }) => {

    const stockRequests = [
        {
            requestedOn: "14 Nov 2024 at 14:42:49",
            product: "9273-Hunter ProConnect Wireless Presentation Base Unit",
            requestedBy: "kiran.kk244@gmail.com",
        },
        // Add more rows as needed
        ...Array(10).fill({
            requestedOn: "15 Nov 2024 at 14:42:49",
            product: "9274-Hunter ProConnect Wireless Presentation Base Unit",
            requestedBy: "kiran.kk244@gmail.com",
        }),
    ];

    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(() => {
        return new Array(stockRequests?.length || 0).fill(false);
    });

    const filteredStockRequests = searchQuery
        ? stockRequests.filter((request) =>
            request.requestedOn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : stockRequests;


    const handleSelectAll = (e) => {
        const newCheckedState = e.target.checked;
        setAllChecked(newCheckedState);
        setCheckedItems(new Array(filteredStockRequests.length).fill(newCheckedState));
    };

    const handleIndividualCheck = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        setAllChecked(updatedCheckedItems.every(Boolean));
    };

    const handleDeleteRequest = (index) => {
        alert("deleted successfully")
    };

    return (
        <div className="stock-requests-container">
            <div className="table-header">
                <div className="delete-request-button">
                    <img
                        src={Icons.trash_icon_white}
                        alt=""
                        style={{
                            width: 15,
                            position: "relative",
                            left: 20,
                            top: 2,
                            cursor: "pointer",
                        }}
                    />
                    {checkedItems.some(Boolean) && (
                        <CommonButton
                            text="Delete"
                            style={{
                                backgroundColor: "#EF4444",
                                color: "#FFF",
                                border: "none",
                                paddingLeft: 25,
                                paddingRight: 10,
                                height: 32,
                                borderRadius: 10,
                                cursor: "pointer",
                            }}
                        />
                    )}
                </div>

            </div>
            <div className="stock-requests-table" style={{
                marginTop: -10
            }}>
                <table className="box-shadow border-radius">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    style={{
                                        position: "relative",
                                        left: 34,
                                        fill: "GrayText",
                                    }}
                                    checked={allChecked}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Requested On</th>
                            <th>Product</th>
                            <th>Requested By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStockRequests?.map((request, index) => (
                            <tr key={index}>
                                <td>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 15,
                                        }}
                                    >
                                        <img
                                            src={Icons.trash_icon}
                                            alt=""
                                            style={{
                                                width: 17,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => onDeleteRequest(index)} // Call delete function
                                        />
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[index]}
                                            onChange={() => handleIndividualCheck(index)}
                                        />
                                    </div>
                                </td>
                                <td>{request.requestedOn}</td>
                                <td>{request.product}</td>
                                <td>{request.requestedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockRequests;
