import React from "react";
import { Link } from "react-router-dom";
import MenuLayout from "../layouts/menuLayout";
import Button from "../components/button";
//import amuse from "../assets/amuse.jpg";

const DashboardView = () => {
  return (
    <MenuLayout title="Logged in!" className="text-center">

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
    </MenuLayout>
  );
};

export default DashboardView;
