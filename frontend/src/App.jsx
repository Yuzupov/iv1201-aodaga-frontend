import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePage from "./view/createPage";
import LoginView from "./view/loginView"; 
import ListApplicationsView from "./view/listApplicationsView"; 

const App = () => (
  <Router>
    <Routes>
      <Route path="/create-account" element={<CreatePage />} />
      <Route path="/login" element={<LoginView />} /> {/* Login page */}
      <Route path="/applications" element={<ListApplicationsView />} /> {/* Applications List page */}
    </Routes>
  </Router>
);

export default App;