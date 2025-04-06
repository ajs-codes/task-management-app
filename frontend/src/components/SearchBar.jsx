"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue.trim());
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name..."
        className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
