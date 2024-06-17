import React from "react";

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 text-2xl bg-green-500 text-white font-bold rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
