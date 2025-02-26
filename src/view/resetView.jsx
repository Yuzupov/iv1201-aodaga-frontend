import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResetPresenter from "../presenter/resetPresenter";
import AuthLayout from "../layouts/authLayout";
import FormLayout from "../layouts/formLayout";
import { useNavigate } from "react-router-dom"; // NEW NEW NEW
/**
 * @constant
 * @name LoginView
 * A view for the login section
 * @returns the view responsible for the login case
 */
const ResetView = () => {
  const [formData, setFormData, token] = useState({
    userPassword: "",
    confirmPassword: "",
    token: useParams(),
  });
  const [isValid, setIsValid] = useState(false); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // NEW NEW NEW

  useEffect(() => {
	ResetPresenter.validateLink(
		formData,
		() => {
			if(localStorage.getItem("isValid") === "true") {
				setIsValid(true);
			}
		},
		(error) => setMessage(error)
	);
  }, []);


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

  const handleSubmit = (e) => { // NEW NEW NEW 
		e.preventDefault();

		ResetPresenter.resetPasswordForm(
			formData,
			() => {
				setMessage(`Password reset successfully!`);
				setTimeout(() => navigate("/login"), 1000); 
			},
			(error) => setMessage(`Error: ${error}`)
		);
	};

  if(!isValid) return <p>Invalid or expired link</p>;
	return (
		<AuthLayout title="Reset Password">
		<FormLayout>
		{message && <p className="text-red-500">{message}</p>} 
		<form onSubmit={handleSubmit} className="space-y-4">
		{[
			{ label: "Password", name: "userPassword", type: "password" },
			{ label: "Confirm Password", name: "confirmPassword", type: "password" },
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
		Reset Password 
		</button>
		</form>
		</FormLayout>
		</AuthLayout>
	);
};


export default ResetView;
