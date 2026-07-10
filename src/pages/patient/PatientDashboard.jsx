import React from 'react';

export default function PatientDashboard() {
  return (
    <div className="page-container dashboard patient-dashboard">
      <h1>Patient Dashboard</h1>
      <div className="dashboard-sections">
        <section className="card">
          <h2>Upcoming Appointments</h2>
          <p>No upcoming appointments found.</p>
        </section>
        <section className="card">
          <h2>Medical History</h2>
          <p>Your records and prescriptions will appear here.</p>
        </section>
      </div>
    </div>
  );
}
