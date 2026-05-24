import React from "react";
import ButtonSpinner from "./ButtonSpinner";

/** Small square icon button with loading spinner */
const IconLoadingButton = ({
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => (
  <button
    type="button"
    disabled={loading || disabled}
    className={`inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {loading ? <ButtonSpinner className="w-4 h-4" /> : children}
  </button>
);

export default IconLoadingButton;
