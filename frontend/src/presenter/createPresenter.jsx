import frontEndModel from "../model/frontEndModel"; 

const CreatePresenter = {
  submitForm: async (formData, onSuccess, onError) => {
    try {
      if (formData.userPassword !== formData.confirmUserPassword) {
        throw new Error("Passwords do not match");
      }
      if (formData.userPassword <= 1) {
        throw new Error("Password must be at least 2 character")
      }
      const pnrRegex = new RegExp('\d{8}-\d{4}');
      if (!pnrRegex.test(formData.personalNumber)) {
        throw new Error("Invalid personalnumber format")
      } 
      frontEndModel.setField(formData);
      // for (const [field, value] of Object.entries(formData)) {
      //   frontEndModel.setField({ field, value });
      // }
      const response = await frontEndModel.registerUser();
      onSuccess(response); 
    } catch (error) {
      console.error("Error in CreatePresenter:", error.message);
      onError(error.message); 
    }
  },
};

export default CreatePresenter;
