import React from "react";
import { Link } from "react-router-dom";
import MenuLayout from "../layouts/menuLayout";
import Button from "../components/button";
//import amuse from "../assets/amuse.jpg";

const StartView = () => {
  return (
    <MenuLayout title="Welcome to THE Amusement Park!" className="text-center">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto space-y-6 md:space-y-0 md:space-x-8">
        {/* <img
          src={amuse}
          alt="Amusement Park"
          className="w-64 h-auto rounded-lg shadow-lg"
        /> */}

        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/create-account">
              <Button>Create an Account</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </MenuLayout>
  );
};

export default StartView;
