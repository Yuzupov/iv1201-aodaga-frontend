import React, { useState } from "react";
import CreatePresenter from "../presenter/createPresenter"; // Import the presenter

const CreateView = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    personNumber: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // For displaying success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass formData to the presenter for processing
    CreatePresenter.submitForm(
      formData,
      (data) => setMessage(`Account created successfully: ${data.username}`), // Success callback
      (error) => setMessage(`Error: ${error}`) // Error callback
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      {message && <p className="text-red-500">{message}</p>} {/* Display success/error message */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Person Number", name: "personNumber", type: "text" },
          { label: "Username", name: "username", type: "text" },
          { label: "Password", name: "password", type: "password" },
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateView;
