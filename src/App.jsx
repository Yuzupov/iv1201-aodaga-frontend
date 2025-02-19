import "./styles/App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import CreatePage from "./view/createPage";
import LoginView from "./view/loginView"; 
import ListApplicationsView from "./view/listApplicationsView"; 
import AuthLayout from "./components/authLayout";
import CreateView from "./view/createView";

const App = () => (
  <Router>
    <Routes>
      <Route path="/create-account" element={<CreateView />} />
      <Route path="/login" element={<LoginView />} /> 
      <Route path="/applications" element={<ListApplicationsView />} /> 
    </Routes>
  </Router>
);

export default App;