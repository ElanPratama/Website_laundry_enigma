import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import NavbarComponent from './components/layout/NavbarComponent';
import FooterComponent from './components/layout/FooterComponent';

// Pages
import Home from './pages/Home';  // Ensure the path is correct
import LoginAPI from './components/auth/Login';  // Login Page
import SignUp from './components/auth/SignUp';  // Sign Up Page
import Admin from './pages/Admin';  // Admin Page
import Employee from './pages/Employee';  // Employee Page

function App() {
  return (
    <Router>
      <NavbarComponent />  {/* Navbar is always displayed */}
      <Routes>
        <Route path="/" element={<Home />} />  {/* Route for Home page */}
        <Route path="/login" element={<LoginAPI />} />  {/* Route for Login page */}
        <Route path="/signup" element={<SignUp />} />  {/* Route for Sign Up page */}
        <Route path="/admin" element={<Admin />} />  {/* Route for Admin page */}
        <Route path="/employee" element={<Employee />} />  {/* Route for Employee page */}
      </Routes>
      <FooterComponent />  {/* Footer is always displayed */}
    </Router>
  );
}

export default App;
