import frontEndModel from "../model/frontEndModel.js";

const CreatePresenter = {
  submitForm: async (formData, onSuccess, onError) => {
    try {
      frontEndModel.setField(formData);
      frontEndModel.encryptData();
      const response = await frontEndModel.registerUser();
      onSuccess(response);
    } catch (error) {
      console.error("Error in CreatePresenter:", error.message);
      onError(error.message);
    }
  },
};

export default CreatePresenter;
