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
	const start = performance.now();
      console.log("in listapplicationspresenter");
      const applications = await frontEndModel.listApplicants();
      onSuccess(applications);
      const stop = performance.now();
	    const res = stop-start;
      console.log(res);
    } catch (error) {
      console.error("Error in ListApplicationsPresenter:", error.message);
      onError(error.message);
    }
  },

  updateApplicantStatus: async (password, onSuccess, onError) => {
    try {
	const start = performance.now();
      console.log(`Authenticating status change with password...`);
      if (!password) {
        throw new Error("Password is required");
      }
      const cookieValue = frontEndModel.getCookie("loginCookie");
      if (!cookieValue) {
        throw new Error("Recruiter authentication cookie not found.");
      }
      const response = await frontEndModel.updateApplicant({
        password: password,
        token: cookieValue.authToken,
      });
      console.log("Authentication successful!");
      onSuccess();
      const stop = performance.now();
	    const res = stop-start;
      console.log(res);
    } catch (error) {
      console.error("Error authenticating status change:", error.message);
      onError(error.message);
    }
  },
};

export default ListApplicationsPresenter;
