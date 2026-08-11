import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
import MedicalRecords from './pages/patient/MedicalRecords.jsx';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import DoctorSchedule from './pages/doctor/DoctorSchedule.jsx';
import Consultation from './pages/doctor/Consultation.jsx';
import DoctorProfile from './pages/doctor/DoctorProfile.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageDoctors from './pages/admin/ManageDoctors.jsx';
import ManagePatients from './pages/admin/ManagePatients.jsx';
import AllAppointments from './pages/admin/AllAppointments.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public & Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />

        {/* Patient Protected Routes */}
        <Route element={<ProtectedRoute role="Patient" />}>
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/book" element={<BookAppointment />} />
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/records" element={<MedicalRecords />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
        </Route>

        {/* Doctor Protected Routes */}
        <Route element={<ProtectedRoute role="Doctor" />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/schedule" element={<DoctorSchedule />} />
          <Route path="/doctor/consultation/:appointmentId" element={<Consultation />} />
          <Route path="/doctor/consultation" element={<Consultation />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute role="Admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<ManageDoctors />} />
          <Route path="/admin/patients" element={<ManagePatients />} />
          <Route path="/admin/appointments" element={<AllAppointments />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
