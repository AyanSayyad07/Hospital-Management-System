import React from 'react';

export default function BookAppointment() {
  return (
    <div className="page-container book-appointment">
      <h1>Book an Appointment</h1>
      <form className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctor">Select Doctor</label>
          <select id="doctor">
            <option value="">Choose a specialist...</option>
            <option value="dr_smith">Dr. Smith (Cardiology)</option>
            <option value="dr_jones">Dr. Jones (Pediatrics)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date & Time</label>
          <input type="datetime-local" id="date" />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Reason for Visit</label>
          <textarea id="notes" placeholder="Describe your symptoms or reason for consultation"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Confirm Appointment</button>
      </form>
    </div>
  );
}
