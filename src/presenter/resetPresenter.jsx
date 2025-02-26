import frontEndModel from "../model/frontEndModel";
const ResetPresenter = {

	resetPasswordForm: async (formData, onSuccess, onError) => {
		try{
			if(validateLink === true){
				const resetConfirmation = await frontEndModel.setNewPassword(formData);
			}

			onSuccess(linkConfirmation); 
		} catch (error) {
			console.error("Error in ResetPresenter:", error.message);
			//onError(error.message);
			throw error;
		}
	},
	validateLink: async (formData, onSuccess, onError) => {
		try {
			console.log("Trying to validate link");
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
