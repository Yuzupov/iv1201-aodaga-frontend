import React, { useEffect, useState } from "react";
import ListApplicationsPresenter from "../presenter/listApplicationsPresenter";
/**
 * @constant
 * @name ListApplicationsView
 * A view to list the applications
 * @returns the view with the applications
 */
const ListApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  /**
   * @function
   * @name useEffect
   * A state handler from react
   * @returns nothing
   */
  useEffect(() => {
    // Fetch applications on component mount
    ListApplicationsPresenter.fetchApplications(
      (data) => setApplications(data), // Success callback
      (errorMessage) => setError(errorMessage) // Error callback
    );
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      {applications.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {app.fullName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {app.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications available.</p>
      )}
    </div>
  );
};

export default ListApplicationsView;
