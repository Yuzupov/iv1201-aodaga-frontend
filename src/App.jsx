import "./styles/App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginView from "./view/loginView"; 
import ListApplicationsView from "./view/listApplicationsView"; 
import CreateView from "./view/createView";
import StartView from "./view/startView";
import DashboardView from "./view/dashboardView";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/start" element={<StartView />} />
      <Route path="/create-account" element={<CreateView />} />
      <Route path="/login" element={<LoginView />} /> 
      <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
      <Route/>
    </Routes>
  </Router>
);

export default App;