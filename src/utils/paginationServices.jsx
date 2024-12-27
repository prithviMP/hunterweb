import { Icons } from "../Icons/Icons";

export const generatePaginationButtons = (
  currentPage,
  totalPages,
  handlePageChange
) => {
  const paginationButtons = [];

  // Add "Previous" button
  paginationButtons.push(
    <button
      key="prev"
      className="pagination-button"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      {<img src={Icons.chevron_left} style={{ width: 8, height: 12 }} />}
    </button>
  );

  // Add numbered buttons
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // Always show the first page
      i === totalPages || // Always show the last page
      (i >= currentPage - 1 && i <= currentPage + 1) // Show current, previous, and next pages
    ) {
      paginationButtons.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    } else if (
      (i === currentPage - 2 && currentPage > 3) || // Add ellipsis before current page
      (i === currentPage + 2 && currentPage < totalPages - 2) // Add ellipsis after current page
    ) {
      paginationButtons.push(
        <span key={`ellipsis-${i}`} className="pagination-ellipsis">
          ...
        </span>
      );
    }
  }

  // Add "Next" button
  paginationButtons.push(
    <button
      key="next"
      className="pagination-button"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      {<img src={Icons.chevron_right} style={{ width: 8, height: 12 }} />}
    </button>
  );

  return paginationButtons;
};
