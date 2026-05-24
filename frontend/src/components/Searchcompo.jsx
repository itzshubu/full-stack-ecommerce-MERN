import React, { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import Producttemp from "./producttemp";
import ProductGrid from "./ProductGrid";
import { decodeSearchQuery, filterProductsBySearch } from "../utils/search";

const Searchcompo = () => {
  const { searchtext } = useParams();
  const query = decodeSearchQuery(searchtext);
  const { products, status } = useSelector((data) => data.MyProducts);

  const results = useMemo(
    () => filterProductsBySearch(products, query),
    [products, query]
  );

  return (
    <div className="min-h-0 sm:min-h-[60vh] bg-gray-50 dark:bg-gray-950 pb-16 sm:pb-20">
      <div className="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400 px-3 sm:px-4 py-2 sm:py-4 items-center text-sm sm:text-base">
        <NavLink to="/" className="hover:text-blue-500 transition-colors">
          <IoHome className="text-xl" />
        </NavLink>
        <span>{">"}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">Search</span>
        {query && (
          <>
            <span>{">"}</span>
            <span className="textmainColor font-medium truncate max-w-[200px] sm:max-w-none">
              &quot;{query}&quot;
            </span>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {status === "loading" && (
          <p className="text-center text-gray-500 py-12">Loading products...</p>
        )}

        {status !== "loading" && !query && (
          <div className="auth-card text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              Use the search bar in the header to find products.
            </p>
          </div>
        )}

        {status !== "loading" && query && results.length === 0 && (
          <div className="auth-card text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              No products found for &quot;{query}&quot;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Try different keywords like shirt, electronics, grocery, or rice.
            </p>
            <NavLink to="/categories/all" className="btn1 inline-block">
              Browse All Products
            </NavLink>
          </div>
        )}

        {status !== "loading" && results.length > 0 && (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            <ProductGrid>
              {results.map((item) => (
                <Producttemp key={item.productId} item={item} />
              ))}
            </ProductGrid>
          </>
        )}
      </div>
    </div>
  );
};

export default Searchcompo;
