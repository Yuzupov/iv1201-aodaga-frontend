import React, { useState } from "react";
import LoginPresenter from "../presenter/loginPresenter";

const LoginView = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userPassword: "",
  });

  const [message, setMessage] = useState(""); // For success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    LoginPresenter.submitLogin(
      formData,
      (data) => setMessage(`Login successful! Welcome, ${data.userName}`), // Success callback
      (error) => setMessage(`Error: ${error}`) // Error callback
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {message && <p className="text-red-500">{message}</p>} {/* Display success/error message */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Username", name: "userName", type: "text" },
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
    </div>
  );
};

export default LoginView;
