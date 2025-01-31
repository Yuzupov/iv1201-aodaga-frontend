import frontEndModel from "../model/frontEndModel"; // Import the model

const CreatePresenter = {
  submitForm: (formData, onSuccess, onError) => {
    try {
      // Update the model using setField
      for (const [field, value] of Object.entries(formData)) {
        frontEndModel.setField({ field, value });
      }

      // Call the model's createUser method to simulate API behavior
      frontEndModel.createUser(onSuccess, onError);
    } catch (error) {
      console.error("Error in CreatePresenter:", error.message);
      onError(error.message);
    }
  },
};

export default CreatePresenter;
