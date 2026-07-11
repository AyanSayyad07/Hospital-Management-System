import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public & Auth Pages
import LandingPage from './pages/public/LandingPage.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import NotFound from './pages/public/NotFound.jsx';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard.jsx';
import BookAppointment from './pages/patient/BookAppointment.jsx';
import PatientAppointments from './pages/patient/PatientAppointments.jsx';
import PatientProfile from './pages/patient/PatientProfile.jsx';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import Consultation from './pages/doctor/Consultation.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageDoctors from './pages/admin/ManageDoctors.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public & Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/book" element={<BookAppointment />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/profile" element={<PatientProfile />} />

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/consultation" element={<Consultation />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<ManageDoctors />} />

        {/* 404 Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
