import frontEndModel from "../model/frontEndModel";
const ResetPresenter = {

	resetPasswordForm: async (formData, onSuccess, onError) => {
		try{
			const validateLink = await frontEndModel.validateLink(formData.token);
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
};

export default ResetPresenter;
