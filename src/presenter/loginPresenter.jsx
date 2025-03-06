import frontEndModel from "../model/frontEndModel";
/**
 * @constant
 * @name LoginPresenter
 * A presenter for the login view
 * @returns nothing
 */
const LoginPresenter = {
  /**
   * @function
   * @name submitLogin
   * @param {object} formData
   * Passes user credentials to model and sets them, then waits for the user to be logged in
   * @returns Returns either a confirmation message or a success message
   */
  submitLogin: async (formData, onSuccess, onError) => {
    try {
      if(formData.username.indexOf("@") != -1){
        formData.email = formData.username;
        formData.username = "";
      }
      
      const response = await frontEndModel.login(formData);
      onSuccess(response);
    } catch (error) {
      onError(error.message);
      console.log(error.message);
    }
  },
};

export default LoginPresenter;
