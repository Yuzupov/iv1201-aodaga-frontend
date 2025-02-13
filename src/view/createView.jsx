import React, { useState } from "react";
import CreatePresenter from "../presenter/createPresenter";
/**
 * @constant
 * @name CreateView
 * Creates a view for registering an account
 * @returns A view for the registration section
 */
const CreateView = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    personalNumber: "",
    username: "",
    userPassword: "",
    confirmUserPassword: "",
  });

  const [message, setMessage] = useState("");
  /**
   * @function
   * @name handleChange
   * A handler for state changes in the registration form
   * @param {event object} e
   * @returns nothing 
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /**
   * @function
   * @name handleSubmit
   * A handler for submitting the form, passes data to presenter
   * @param {event object} e
   * @returns nothing 
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    CreatePresenter.submitForm(
      formData,
      (data) => setMessage(`Account created successfully: ${data.username}`),
      (error) => setMessage(`Error: ${error}`)
    );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-linear-65 from-purple-800 to-red-400">
      <div className="w-full max-w-md px-8 py-12 bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Create an Account</h1>
        <p className="text-sm mb-8 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Log in
          </a>
        </p>
        {message && (
          <p
            className={`text-center mb-4 p-2 rounded ${message.startsWith("Error")
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
              }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-400"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-700 border-none rounded focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-400"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-700 border-none rounded focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>
          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Personal Number", name: "personalNumber", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Password", name: "userPassword", type: "password" },
            { label: "Confirm Password", name: "confirmUserPassword", type: "password" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-400"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-700 border-none rounded focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-all"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateView;


