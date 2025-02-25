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
	    console.log("in listapplicationspresenter");
      const applications = await frontEndModel.listApplicants();
      onSuccess(applications); 
    } catch (error) {
      console.error("Error in ListApplicationsPresenter:", error.message);
      onError(error.message); 
    }
  },

  /**
   * Updates the applicant's status in the database.
   * @param {number} applicantId - The ID of the applicant.
   * @param {string} newStatus - The new status ("Handled" or "Unhandled").
   * @param {Function} onSuccess - Callback for successful update.
   * @param {Function} onError - Callback for handling errors.
   */
  updateApplicantStatus: async (applicantId, newStatus, onSuccess, onError) => {
    try {
      console.log(`Updating status for applicant ${applicantId} to ${newStatus}...`);
      
      await frontEndModel.updateApplicantStatus(applicantId, newStatus);

      console.log("Status updated successfully!");
      onSuccess(); 
    } catch (error) {
      console.error("Error updating applicant status:", error.message);
      onError(error.message); 
    }
  },
};

export default ListApplicationsPresenter;
