import React from "react";
import CreateView from "./createView";
import CreatePresenter from "../presenter/createPresenter";
/**
 * @constant
 * @name CreateAccountPage
 * Creates a view based on presenter actions
 * @returns The view to be displayed
 */
const CreateAccountPage = () => {
  const handleFormSubmit = async (formData) => {
    try {
      const result = await CreatePresenter.submitForm(formData);
      alert("Account created successfully!");
      console.log("Created Account:", result);
    } catch (error) {
      alert(error.message);
    }
  };

  return <CreateView onSubmit={handleFormSubmit} />;
};

export default CreateAccountPage;
