import React, { useState } from "react";
import LoginPresenter from "../presenter/loginPresenter";
import AuthLayout from "../layouts/authLayout";
import FormLayout from "../layouts/formLayout";
import { useNavigate } from "react-router-dom"; // NEW NEW NEW
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
  const navigate = useNavigate(); // NEW NEW NEW
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
      () => {
        setMessage(`Login successful! Welcome`);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", "user");
        navigate("/dashboard");
      },
      (error) => setMessage(`Error: ${error}`)
    );
  };

  return (
    <AuthLayout title="Login">
      <FormLayout>
        <p className="text-sm mb-8 text-center">
          Don't have an account?{" "}
          <a href="/create-account" className="text-purple-400 hover:underline">
            Create an account
          </a>
        </p>

        <p className="text-sm mb-8 text-center">
          Forgot your password again?{" "}
          <a href="/reset/create-link" className="text-purple-400 hover:underline">
            Reset password
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </FormLayout>
    </AuthLayout>
  );
};

export default LoginView;
