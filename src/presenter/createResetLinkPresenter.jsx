import frontEndModel from "../model/frontEndModel";
/**
 * @constant
 * @name LoginPresenter
 * A presenter for the login view
 * @returns nothing
 */
const ResetPresenter= {
  /**
   * @function
   * @name submitLogin
   * @param {object} formData
   * Passes user credentials to model and sets them, then waits for the user to be logged in
   * @returns Returns either a confirmation message or a success message
   */
	resetPasswordForm: async (formData, onSuccess, onError) => {
		try{
			const linkConfirmation = await frontEndModel.resetPasswordLink(formData);
			onSuccess(); 
		} catch (error) {
			console.error("Error in ResetPresenter:", error.message);
			//onError(error.message);
			throw error;
		}
	},
};

export default ResetPresenter;
