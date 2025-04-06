"use client";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between mt-4">
      <div>
        <p>
          Showing {currentPage} of {totalPages}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(+currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
