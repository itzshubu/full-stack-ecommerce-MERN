import React from "react";
import ButtonSpinner from "./ButtonSpinner";

const variants = {
  primary: "btn1",
  secondary: "btn2",
  danger: "btn-danger",
  icon: "",
};

const LoadingButton = ({
  loading = false,
  children,
  className = "",
  variant = "primary",
  spinnerClassName,
  type = "button",
  disabled,
  ...props
}) => {
  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`${variantClass} inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity ${className}`}
      {...props}
    >
      {loading && <ButtonSpinner className={spinnerClassName || "w-4 h-4"} />}
      {children}
    </button>
  );
};

export default LoadingButton;
