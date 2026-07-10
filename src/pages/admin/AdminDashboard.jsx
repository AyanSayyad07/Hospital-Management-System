import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="page-container dashboard admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-sections">
        <section className="card">
          <h2>System Overview</h2>
          <p>Total Patients: 0</p>
          <p>Total Doctors: 0</p>
          <p>Active Appointments: 0</p>
        </section>
        <section className="card">
          <h2>Quick Actions</h2>
          <a href="/admin/doctors" className="btn btn-secondary">Manage Doctors</a>
        </section>
      </div>
    </div>
  );
}
