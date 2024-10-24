import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Home from './pages/Home';       // Pastikan Home diimpor dari jalur yang benar
import Features from './pages/Features'; // Impor halaman Features
import Customers from './pages/Customer'; // Impor halaman Customers
import LoginAPI from './pages/Login';    // Impor halaman LoginAPI
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <Router>
      <NavbarComponent />  {/* Komponen Navbar selalu ditampilkan */}
      <Routes>
        <Route path="/" element={<Home />} />  {/* Rute untuk halaman Home */}
        <Route path="/features" element={<Features />} />  {/* Rute untuk halaman Features */}
        <Route path="/customers" element={<Customers />} />  {/* Rute untuk halaman Customers */}
        <Route path="/login" element={<LoginAPI />} />  {/* Rute untuk halaman Login */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={< Employee />} />
      </Routes>
      < FooterComponent />
    </Router>
  );
}

export default App;
