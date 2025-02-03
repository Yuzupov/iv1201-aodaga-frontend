import frontEndModel from "../model/frontEndModel"; 

const LoginPresenter = {
  submitLogin: async (formData, onSuccess, onError) => {
    try {
      for (const [field, value] of Object.entries(formData)) {
        if (!value) {
          throw new Error(`Field "${field}" is required.`);
        }
        frontEndModel.setField({ field, value }); 
      }

      
      const response = await frontEndModel.loginUser();
      onSuccess(response); 
    } catch (error) {
      console.error("Error in LoginPresenter:", error.message);
      onError(error.message); 
    }
  },
};

export default LoginPresenter;
