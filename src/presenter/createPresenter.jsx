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
      for(var field in formData){
        console.log(formData[field]);
	if(formData[field].length > 255)
	      throw new Error("Field too long: " + field);
      }
      if (formData.userPassword !== formData.confirmUserPassword) {
        throw new Error("Passwords do not match");
      }
      if (formData.userPassword <= 1) {
        throw new Error("Password must be at least 2 character")
      }
      const pnrRegex = new RegExp('\\d{8}-\\d{4}');
      if (!pnrRegex.test(formData.personalNumber)) {
        throw new Error("Invalid personalnumber format, follow 12345678-xxxx format")
      }
      const usernameRegex = '^[\\p{L}\\d]*$';
      if(!formData.username.match(/^[\p{L}\d]*$/u)){
	throw new Error("Invalid characters in username");
      }
      if(formData.username.length > 80){
	throw new Error("Username too long");
      }
      const response = await frontEndModel.createAccount(formData);
      //const response = await frontEndModel.registerUser();
      onSuccess();
    } catch (error) {
      console.error("Error in CreatePresenter:", error);
      onError(error.message);
    }
  },
};

export default CreatePresenter;
