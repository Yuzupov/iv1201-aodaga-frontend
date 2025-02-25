import frontEndModel from "../model/frontEndModel";

const DashboardPresenter = {
  /**
   * Retrieves the user role from the model and passes it to the view.
   * @param {Function} onSuccess - Callback function to update the state in the view.
   * @param {Function} onError - Callback function for handling errors.
   */
  fetchUserRole: (onSuccess, onError) => {
    try {
      const userRole = frontEndModel.fields.role; 

      console.log("User role retrieved:", userRole);

      // If no role is set, assume "candidate"
      onSuccess(userRole || "candidate"); 
    } catch (error) {
      console.error("Error fetching user role in presenter:", error.message);
      onError(error.message);
    }
  },
};

export default DashboardPresenter;
