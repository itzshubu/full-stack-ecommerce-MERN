import React from "react";

const ButtonSpinner = ({ className = "w-4 h-4" }) => (
  <span
    className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
    aria-hidden="true"
  />
);

export default ButtonSpinner;
