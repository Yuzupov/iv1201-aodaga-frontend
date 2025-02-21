import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginView from "./view/loginView"; 
import ListApplicationsView from "./view/listApplicationsView"; 
import CreateView from "./view/createView";
import StartView from "./view/startView";
import DashboardView from "./view/dashboardView";

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

const CookieRoute = () => {
  if (!document.cookie) {
    return <Navigate to ="/create-account" />;
  }
  else {
    return <Navigate to ="/dashboard" />;
  }
}

const ProtectedRoute = () => {
  if (document.cookie) {
    return <Navigate to="/dashboard" />;
  }
  else {
    return <Navigate to ="/login" />;
  }
}

const App = () => {
  
  return (
  <Router>
    <Routes>
      <Route path="/start" element={<CookieRoute> <StartView /> </CookieRoute>} />
      <Route path="/create-account" element={ <CreateView /> } />
      <Route path="/login" element={<LoginView />} /> 
      <Route path="/dashboard" component={ProtectedRoute} element={ <DashboardView /> } />
      <Route/>
    </Routes>
  </Router>
  );
};
/*
const ProtectedRoute = () => {
  if (document.cookie) {
    return <Navigate to="/dashboard" />;
  }
  else {
    return <Navigate to ="/login" />;
  }
}

const App = () => (
  const[isAuth, setIsAuth] = useState(false);
  
  return
  <Router>
    <Routes>
    if(document.cookie){
      <Route path="/start" element isAuth={} />
}
      <Route path="/create-account" element={ <CreateView /> } />
      <Route path="/login" element={<LoginView />} /> 
      <Route path="/dashboard" element={<ProtectedRoute> <DashboardView /> </ProtectedRoute>} />
      <Route/>
    </Routes>
  </Router>
);*/

export default App;