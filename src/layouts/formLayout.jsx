import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="w-full max-w-md px-8 py-12 bg-gray-900 shadow-lg rounded-lg">
      {children} 
    </div>
  );
};

export default FormLayout;
