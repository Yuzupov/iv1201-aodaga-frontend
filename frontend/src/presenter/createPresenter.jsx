import frontEndModel from "../model/frontEndModel"; 

const CreatePresenter = {
  submitForm: async (formData, onSuccess, onError) => {
    try {
      	frontEndModel.setField(formData);
      const response = await frontEndModel.registerUser();
      onSuccess(response); 
    } catch (error) {
      console.error("Error in CreatePresenter:", error.message);
      onError(error.message); 
    }
  },
};

export default CreatePresenter;
