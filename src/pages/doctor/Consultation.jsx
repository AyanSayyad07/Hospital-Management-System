import React from 'react';

export default function Consultation() {
  return (
    <div className="page-container consultation">
      <h1>Patient Consultation</h1>
      <div className="consultation-layout">
        <section className="patient-info card">
          <h2>Patient Details</h2>
          <p>Select a patient from your queue to start consultation.</p>
        </section>
        <section className="prescription-section card">
          <h2>Prescription & Notes</h2>
          <textarea placeholder="Write diagnosis and treatment plan..."></textarea>
          <button className="btn btn-primary">Save Consultation</button>
        </section>
      </div>
    </div>
  );
}
