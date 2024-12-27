import React from 'react';

const RowsPerPageSelector = ({ itemsPerPage, setItemsPerPage, setCurrentPage }) => {
    return (
        <div className="call-manager-row-per-page">
            <span style={{ fontSize: 14, fontFamily: 'var(--manrope)', fontWeight: 'var(--extra-semi-bold)' }}>
                Rows per page:
            </span>
            <select
                value={itemsPerPage}
                onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                }}
            >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
};

export default RowsPerPageSelector;