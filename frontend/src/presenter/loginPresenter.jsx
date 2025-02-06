import frontEndModel from "../model/frontEndModel";
/**
 * @constant
 * @name LoginPresenter
 * A presenter for the login view
 * @returns nothing
 */
const LoginPresenter = {
  /**
   * @function
   * @name submitLogin
   * @param {object} formData
   * Passes user credentials to model and sets them, then waits for the user to be logged in
   * @returns Returns either a confirmation message or a success message
   */
  submitLogin: async (formData, onSuccess, onError) => {
    try {
      for (const [field, value] of Object.entries(formData)) {
        if (!value) {
          throw new Error(`Field "${field}" is required.`);
        }
        frontEndModel.setField({ field, value });
      }


      const response = await frontEndModel.loginUser();
      onSuccess(response);
    } catch (error) {
      console.error("Error in LoginPresenter:", error.message);
      onError(error.message);
    }
  },
};

export default LoginPresenter;
