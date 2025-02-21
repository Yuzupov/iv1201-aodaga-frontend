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

const App = () => {
  
  return (
  <Router>
    <Routes>
      <Route path="/start" element={<StartView />} />
      <Route path="/create-account" element={ <CreateView /> } />
      <Route path="/login" element={<IfTokenLogin><LoginView /></IfTokenLogin>} /> 
      <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute> } />
      <Route/>
    </Routes>
  </Router>
  );
};
/*
const App = () => {
  return(
  <Router>
    <Routes>
      <Route path="/start" element={<StartView />} /> 
      <Route path="/create-account" element={ <CreateView /> } />
      <Route path="/login" element={<LoginView />} /> 
      <Route path="/dashboard" element={<DashboardView /> }/>
      <Route/>
    </Routes>
  </Router>

)};

*/
export default App;
