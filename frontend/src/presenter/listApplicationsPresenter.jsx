import frontEndModel from "../model/frontEndModel";

const ListApplicationsPresenter = {
  fetchApplications: async (onSuccess, onError) => {
    try {
      const applications = await frontEndModel.fetchApplications();
      onSuccess(applications); // Pass data to the view
    } catch (error) {
      console.error("Error in ListApplicationsPresenter:", error.message);
      onError(error.message); // Pass error to the view
    }
  },
};

export default ListApplicationsPresenter;
