import frontEndModel from "../model/frontEndModel"; 

/**
 *
 * THIS WAS A TEST PRESENTER WHEN STARTING THE PROJECT, NOT CURRENTLY IN USE
 *
 */
const CreatePresenter = {
  submitForm: async (formData, onSuccess, onError) => {
    try {
      for (const [field, value] of Object.entries(formData)) {
        frontEndModel.setField({ field, value });
      }
      const response = await frontEndModel.registerUser();
      onSuccess(response); 
    } catch (error) {
      console.error("Error in CreatePresenter:", error.message);
      onError(error.message); 
    }
  },
};

export default CreatePresenter;
