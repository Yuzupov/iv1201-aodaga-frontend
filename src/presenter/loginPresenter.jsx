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
    
      if (!response || !response.userPassword || !response.username )
	    {
        throw new Error("User not found");
      }
       if (formData.userPassword !== response.userPassword && formData.username !== response.username || formData.email !== response.email) {
         throw new Error("Invalid credentials");
       }
      // if (formData.userPassword !== response.userPassword || formData.username !== response.username) {
      //   throw new Error("Invalid credentials");
      // }
      // if (isEmail){
      //   if (formData.username !== response.email) {
      //     throw new Error("Incorrect email");
      //   }
      //   else {
      //     if (formData.username !== response.username) {
      //       throw new Error("Incorrect username");
      //     }
      //     if (formData.userPassword !== response.userPassword) {
      //       throw new Error("Incorrect password");
      //     }
      //   }
      // }
      onSuccess(response); 
    } catch (error) {
      console.error("Error in LoginPresenter:", error.message);
      onError(error.message);
    }
  },
};

export default LoginPresenter;
