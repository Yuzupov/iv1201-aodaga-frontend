import React, { useEffect, useState } from "react";
import ListApplicationsPresenter from "../presenter/listApplicationsPresenter";
import MenuLayout from "../layouts/menuLayout";
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
    console.log("in view");
    ListApplicationsPresenter.fetchApplications(
      (data) => setApplications(data),
      (errorMessage) => setError(errorMessage)
    );
  }, []);

  const handleStatusChange = (applicantId, newStatus) => {
    ListApplicationsPresenter.updateApplicantStatus(
      applicantId,
      newStatus,
      () => {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicantId ? { ...app, status: newStatus } : app
          )
        );
      },
      (errorMessage) => setError(errorMessage) 
    );
  };

  return (
    <MenuLayout title="Applicants">
      <div className="container mx-auto p-4">
        {error && <p className="text-red-500">{error}</p>}

        {applications.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Surname</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.surname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      className="border border-gray-300 px-2 py-1"
                    >
                      <option value="Unhandled">Unhandled</option>
                      <option value="Handled">Handled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications available.</p>
        )}
      </div>
    </MenuLayout>
  );
};

export default ListApplicationsView;
