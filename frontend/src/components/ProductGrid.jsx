import React from "react";

/**
 * Product layout: 2 cols on small phones (<400px), 3 on larger phones (400px+),
 * more columns on tablet/desktop.
 */
const ProductGrid = ({ children, className = "" }) => (
  <div
    className={`grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 px-2 sm:px-4 place-items-stretch ${className}`}
  >
    {children}
  </div>
);

export default ProductGrid;
