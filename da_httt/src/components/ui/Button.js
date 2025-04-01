import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
