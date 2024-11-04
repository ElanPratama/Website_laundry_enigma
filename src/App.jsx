import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/layout/NavbarComponent';
import Home from './pages/Home';         // Pastikan Home diimpor dari jalur yang benar
import LoginAPI from '../src/components/auth/Login';    // Impor halaman LoginAPI
import SignUp from '../src/components/auth/SignUp';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import FooterComponent from '../src/components/layout/FooterComponent';

function App() {
  return (
    <Router>
      <NavbarComponent />  {/* Komponen Navbar selalu ditampilkan */}
      <Routes>
        <Route path="/" element={<Home />} />  {/* Rute untuk halaman Home */}
        <Route path="/login" element={<LoginAPI />} />  {/* Rute untuk halaman Login */}
        <Route path="/signup" element={<SignUp />} />  {/* Rute untuk halaman SignUp */}
        <Route path="/admin" element={<Admin />} />  {/* Rute untuk halaman Admin */}
        <Route path="/employee" element={<Employee />} />  {/* Rute untuk halaman Employee */}
      </Routes>
      <FooterComponent />  {/* Komponen Footer selalu ditampilkan */}
      
    </Router>
  );
}

export default App;
