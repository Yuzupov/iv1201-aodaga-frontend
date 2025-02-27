import React, { useEffect } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const MenuLayout = ({ title, children }) => {
 // useEffect(() => {
 //   window.scrollTo(10000, 35);
 //   document.body.style.overflow = "hidden";
 //   document.body.style.width = "100vw";
 // }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-purple-400">
      <div className=" text-white text-2xl font-bold w-full flex justify-center">
        <Header title={title} />
      </div>
      <main className="flex-grow flex items-center justify-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MenuLayout;
