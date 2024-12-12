import React, { useState } from "react";
import "./StockRequests.css";
import { Icons } from "../../../../Icons/Icons";
import CommonButton from "../../../../componant/Button/CommonButton";

const StockRequests = ({ stockRequests, onDeleteRequest }) => {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        Array(stockRequests.length).fill(false)
    );

    const handleSelectAll = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
        setCheckedItems(Array(stockRequests.length).fill(newCheckedState));
    };

    const handleIndividualCheck = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);

        // Update the state of the "select all" checkbox
        const allSelected = updatedCheckedItems.every(Boolean);
        setAllChecked(allSelected);
    };

    return (
        <div className="stock-requests-container">
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
            <div className="stock-requests-table">
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
                        {stockRequests.map((request, index) => (
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
