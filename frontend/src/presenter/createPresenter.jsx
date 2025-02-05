import frontEndModel from "../model/frontEndModel.js";

const CreatePresenter = {
  submitForm: async (formData, onSuccess, onError) => {
    try {
      frontEndModel.setAndEncryptUserData(formData);
      const response = await frontEndModel.registerUser();
      onSuccess(response);
    } catch (error) {
      console.error("Error in CreatePresenter:", error);
      onError(error.message);
    }
  },
};

export default CreatePresenter;
