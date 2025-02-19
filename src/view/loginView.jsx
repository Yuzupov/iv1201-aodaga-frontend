import React, { useState } from "react";
import LoginPresenter from "../presenter/loginPresenter";
import AuthLayout from "../components/authLayout";
import FormLayout from "../components/formLayout";
/**
 * @constant
 * @name LoginView
 * A view for the login section
 * @returns the view responsible for the login case
 */
const LoginView = () => {
  const [formData, setFormData] = useState({
    username: "",
    userPassword: "",
  });

  const [message, setMessage] = useState("");
  /**
   * @function
   * @name handleChange
   * a handler for state changes in the login form
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
   * A handler for submitting the form, passes data to the presenter
   * @param {event object} e
   * @returns nothing 
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    LoginPresenter.submitLogin(
      formData,
      (data) => setMessage(`Login successful! Welcome, ${data.userName}`),
      (error) => setMessage(`Error: ${error}`)
    );
  };

  return (
    <AuthLayout title="Login">
    <FormLayout>
      {message && <p className="text-red-500">{message}</p>} 
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Username or Email", name: "username", type: "text" },
          { label: "Password", name: "userPassword", type: "password" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-lg font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login 
        </button>
      </form>
    </FormLayout>
    </AuthLayout>
  );
};

export default LoginView;
