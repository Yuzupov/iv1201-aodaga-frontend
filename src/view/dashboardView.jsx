import React, { useState, useEffect } from "react";
import MenuLayout from "../layouts/menuLayout";
import DashboardPresenter from "../presenter/dashboardPresenter";
import { Link } from "react-router-dom";

/**
 * @constant
 * @name DashboardView
 * Returns a dashboard with an optinal button depending on role
 * @returns the view responsible for the dashboard
 */
const DashboardView = () => {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    DashboardPresenter.fetchUserRole(
      (role) => setIsRecruiter(role === "recruiter"), // Update state based on role. Check if variable is "recruiter"
      (errorMessage) => setError(errorMessage)
    );
  }, []);

  return (
    <MenuLayout title="Logged in!" className="text-center">
      <div className="container mx-auto p-4">
        {isRecruiter && (
          <Link to="/applicants">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Manage Applicants
          </button>
          </Link>
        )}
      </div>
    </MenuLayout>
  );
};

export default DashboardView;
