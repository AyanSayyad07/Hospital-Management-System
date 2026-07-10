import React from 'react';

export default function DoctorDashboard() {
  return (
    <div className="page-container dashboard doctor-dashboard">
      <h1>Doctor Dashboard</h1>
      <div className="dashboard-sections">
        <section className="card">
          <h2>Today's Appointments</h2>
          <p>No appointments scheduled for today.</p>
        </section>
        <section className="card">
          <h2>Patient Queue</h2>
          <p>Patient queue is currently empty.</p>
        </section>
      </div>
    </div>
  );
}
