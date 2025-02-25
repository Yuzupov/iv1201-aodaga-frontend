import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginView from "./view/loginView"; 
import ListApplicationsView from "./view/listApplicationsView"; 
import CreateView from "./view/createView";
import StartView from "./view/startView";
import DashboardView from "./view/dashboardView";

const ProtectedRoute = ({children}) => {
	const userToken = document.cookie;
	return userToken ? children : <Navigate to="/login" replace/>;

}
const IfTokenLogin = ({children}) => {
	const userToken = document.cookie;
	return !userToken ? children : <Navigate to="/dashboard" replace/>;
}

const Recruiter = ({children}) => { // maybe add this to the view for conditionald rendering. Show buttton if recruiter only 
  const recruiterToken = 0; // add recruiter variable 
  return !recruiterToken ? children : <Navigate to="/"/>;
}

const App = () => {
  
  return (
  <Router>
    <Routes>
      <Route path="/start" element={<StartView />} />
      <Route path="/create-account" element={ <CreateView /> } />
      <Route path="/list-applicants" element={ <ListApplicationsView /> } />
      <Route path="/login" element={<IfTokenLogin><LoginView /></IfTokenLogin>} /> 
      <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute> } />
      <Route path="/applicants" element={<ListApplicationsView />} />
      <Route/>
    </Routes>
  </Router>
  );
};

export default App;
