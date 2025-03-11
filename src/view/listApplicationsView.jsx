import React, { useEffect, useState } from "react";
import ListApplicationsPresenter from "../presenter/listApplicationsPresenter";
import MenuLayout from "../layouts/menuLayout";

/**
 * @constant
 * @name ListApplicationsView
 * a view that lists all the applicants to a recruiter
 * @returns the view that displays applicants
 */

const ListApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    ListApplicationsPresenter.fetchApplications(
      (data) => setApplications(data),
      (errorMessage) => setError(errorMessage)
    );
  }, []);

/**
 * @function
 * @name handleStatusChangeRequest
 * opens a new window to enter password for a recruiter
 * @returns nothing
 */
  const handleStatusChangeRequest = () => {
    setIsModalOpen(true);
  };

/**
 * @function
 * @name handleConfirmStatusChange
 * passes entered password down to the presenter
 * @returns nothing
 */
  const handleConfirmStatusChange = () => {
    ListApplicationsPresenter.updateApplicantStatus(
      password,
      () => {
        setIsModalOpen(false);
        setPassword("");
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
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.surname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {app.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={handleStatusChangeRequest}
                      className="px-4 py-2 bg-blue-500 text-white"
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications available.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Enter Recruiter Password
            </h2>
            <p className="text-gray-600 mb-4">
              Please enter your password to authorize the status change.
            </p>

            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleConfirmStatusChange}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </MenuLayout>
  );
};

export default ListApplicationsView;
