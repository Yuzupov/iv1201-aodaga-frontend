import frontEndModel from "../model/frontEndModel.js";
/**
 * @constant
 * @name CreatePresenter
 * Creates a presenter for the registration form in the view
 * @returns nothing 
 */
const CreatePresenter = {
  /**
   * @function
   * @name submitForm
   * @param {object} formData 
   * @returns Either a confirmation or error message to the view.
   */
  submitForm: async (formData, onSuccess, onError) => {
    try {
      if (formData.userPassword !== formData.confirmUserPassword) {
        throw new Error("Passwords do not match");
      }
      if (formData.userPassword <= 1) {
        throw new Error("Password must be at least 2 character")
      }
      const pnrRegex = new RegExp('\\d{8}-\\d{4}');
      if (!pnrRegex.test(formData.personalNumber)) {
        throw new Error("Invalid personalnumber format")
      }
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
