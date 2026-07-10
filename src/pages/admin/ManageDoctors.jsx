import React from 'react';

export default function ManageDoctors() {
  return (
    <div className="page-container manage-doctors">
      <h1>Manage Doctors</h1>
      <div className="action-bar">
        <button className="btn btn-primary">+ Add New Doctor</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="text-center">No doctors registered yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
