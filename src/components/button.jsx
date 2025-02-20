import React from "react";

const Button = ({ children }) => {
    return (
        <button className="px-8 py-4 w-64 h-30 text-lg bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
            {children} 
        </button>
    );
};

export default Button;
