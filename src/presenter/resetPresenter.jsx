import frontEndModel from "../model/frontEndModel";
/**
 * @constant
 * @name ResetPresenter
 * a presenter for resetting password functionality
 * @returns nothing 
 */
const ResetPresenter = {
	/**
	 * @function
	 * @name resetPasswordForm
	 * @param {object} formData
	 * passes data from presenter to model
	 * @returns either success or error message
	 */
	resetPasswordForm: async (formData, onSuccess, onError) => {
		try{
			if (formData.userPassword !== formData.confirmUserPassword) {
				throw new Error("Passwords do not match");
			}
			if (formData.userPassword <= 1) {
				throw new Error("Password must be at least 2 character")
			}
			const resetConfirmation = await frontEndModel.setNewPassword(formData);
			
			onSuccess(); 
		} catch (error) {
			console.error("Error caught in ResetPresenter:", error.message);
			onError(error.message);
		}
	},
	/**
	 * @function
	 * @name validateLink
	 * @param {object} formData
	 * validates that the temporary password reset link is valid
	 * @returns either success or error message
	 */
	validateLink: async (formData, onSuccess, onError) => {
		try {
			const validateLink = await frontEndModel.validateLink(formData.token);
			if(validateLink.message.valid === true){
				localStorage.setItem("isValid", true);
			}
			onSuccess();
		} catch (error) {
			console.error("Error in ResetPresenter:", error.message);
		}
	},
};

export default ResetPresenter;
