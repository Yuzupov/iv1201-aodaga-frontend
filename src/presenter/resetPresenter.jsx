import frontEndModel from "../model/frontEndModel";
const ResetPresenter = {
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
			throw error;
		}
	},
	validateLink: async (formData, onSuccess, onError) => {
		try {
			const validateLink = await frontEndModel.validateLink(formData.token);
			if(validateLink.message.valid === true){
				localStorage.setItem("isValid", true);
			}
			onSuccess();
		} catch (error) {
			console.error("Error in ResetPresenter:", error.message);
			throw error;
		}
	},
};

export default ResetPresenter;
