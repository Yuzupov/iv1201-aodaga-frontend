import React from "react";

const Header = ({ title }) => {
  return (
    <header className="w-full bg-gray-900 text-white p-4 text-center">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
};
                    
export default Header;
