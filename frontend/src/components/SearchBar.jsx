import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getSearchPath, decodeSearchQuery } from "../utils/search";

const SearchBar = ({ variant = "default", className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/search/")) {
      const segment = location.pathname.slice("/search/".length);
      setQuery(decodeSearchQuery(segment));
    }
  }, [location.pathname]);

  const handleSearch = () => {
    const path = getSearchPath(query);
    if (path) navigate(path);
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={`flex items-center gap-2 rounded-full border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 ${
        isCompact ? "px-2 py-1" : "px-3 py-2"
      } ${className}`}
    >
      <button
        type="button"
        onClick={handleSearch}
        className="shrink-0 text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity"
        aria-label="Search"
      >
        <FaSearch className={isCompact ? "text-base" : "text-lg"} />
      </button>
      <input
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className={`outline-none bg-transparent border-none w-full dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
          isCompact ? "text-sm" : "text-base"
        }`}
      />
    </div>
  );
};

export default SearchBar;
