import frontEndModel from "../model/frontEndModel";
/**
 * @constant
 * @name fetchApplications
 * A presenter that lists applications
 * @returns nothing
 */
const ListApplicationsPresenter = {
  /**
   * @function
   * @name fetchApplications
   * fetches applications from the backend through the model
   * @returns Either a confirmation or error message to the view
   */
  fetchApplications: async (onSuccess, onError) => {
    try {
      const applications = await frontEndModel.fetchApplications();
      onSuccess(applications); // Pass data to the view
    } catch (error) {
      console.error("Error in ListApplicationsPresenter:", error.message);
      onError(error.message); // Pass error to the view
    }
  },
};

export default ListApplicationsPresenter;
