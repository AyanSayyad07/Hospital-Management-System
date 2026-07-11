import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Calendar, 
  Clock, 
  UserCheck, 
  Stethoscope, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  LogOut,
  PlusCircle,
  MapPin,
  Video
} from 'lucide-react';

export default function BookAppointment() {
  const navigate = useNavigate();

  // Mock Doctors database grouped by Department
  const doctorsByDept = {
    'Cardiology': [
      { id: 'dr-vance', name: 'Dr. Marcus Vance', fee: '$120', rating: '4.9★' },
      { id: 'dr-elena', name: 'Dr. Elena Rostova', fee: '$135', rating: '4.8★' }
    ],
    'General Medicine': [
      { id: 'dr-smith', name: 'Dr. Arthur Smith', fee: '$80', rating: '4.9★' },
      { id: 'dr-patel', name: 'Dr. Priya Patel', fee: '$90', rating: '5.0★' }
    ],
    'Neurology': [
      { id: 'dr-sterling', name: 'Dr. Jonathan Sterling', fee: '$160', rating: '4.9★' }
    ],
    'Pediatrics': [
      { id: 'dr-jones', name: 'Dr. Sarah Jones', fee: '$95', rating: '4.7★' },
      { id: 'dr-chen', name: 'Dr. Michael Chen', fee: '$100', rating: '4.9★' }
    ],
    'Orthopedics': [
      { id: 'dr-gregory', name: 'Dr. House Gregory', fee: '$150', rating: '4.8★' }
    ]
  };

  const timeSlots = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:30 AM - 12:00 PM',
    '02:00 PM - 02:30 PM',
    '03:30 PM - 04:00 PM',
    '05:00 PM - 05:30 PM'
  ];

  // Single useState object managing form data
  const [formData, setFormData] = useState({
    department: 'Cardiology',
    doctor: 'Dr. Marcus Vance',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM - 10:30 AM',
    visitType: 'In-Person OPD',
    symptoms: ''
  });

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If department changes, automatically pick the first doctor in that department
    if (name === 'department') {
      const firstDoctor = doctorsByDept[value]?.[0]?.name || '';
      setFormData((prev) => ({
        ...prev,
        department: value,
        doctor: firstDoctor
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (statusMsg.text) setStatusMsg({ type: '', text: '' });
  };

  const selectTimeSlot = (slot) => {
    setFormData((prev) => ({ ...prev, timeSlot: slot }));
    if (statusMsg.text) setStatusMsg({ type: '', text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.department || !formData.doctor || !formData.date || !formData.timeSlot) {
      setStatusMsg({
        type: 'error',
        text: 'Please complete all required fields (Department, Doctor, Date, and Time Slot).'
      });
      return;
    }

    setIsSubmitting(true);

    // Mock submission handler logging selected appointment details
    console.log('====================================');
    console.log('📌 MOCK APPOINTMENT BOOKED (Frontend -> MERN API later):');
    console.log('Appointment Payload:', {
      ...formData,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    });
    console.log('====================================');

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMsg({
        type: 'success',
        text: `Appointment confirmed with ${formData.doctor} for ${formData.date} at ${formData.timeSlot}! Details logged to console.`
      });

      // Simulate redirect to My Appointments after brief pause
      setTimeout(() => {
        navigate('/patient/appointments');
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Patient Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">
              MediPulse <span className="text-indigo-400 text-sm font-medium hidden sm:inline">| Patient Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm font-medium">
            <Link to="/patient" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">My Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Book Appointment</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Profile & Settings</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-800/80 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Appointments</Link>
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Book Visit</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Profile</Link>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Instant OPD & Telemedicine Scheduling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Book a Medical Consultation
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your preferred specialist, date, and available time slot to reserve your appointment instantly.
          </p>
        </div>

        {/* Status Alert Banner */}
        {statusMsg.text && (
          <div 
            className={`mb-6 p-4 rounded-2xl flex items-start space-x-3 text-sm font-medium border animate-fadeIn ${
              statusMsg.type === 'error' 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {statusMsg.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Booking Form Card */}
        <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Step 1: Department & Doctor */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Stethoscope className="w-5 h-5 text-indigo-400" />
              <span>1. Choose Specialty & Doctor</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Department Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="department" className="text-sm font-medium text-slate-300 block">
                  Department / Specialty <span className="text-rose-400">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                >
                  {Object.keys(doctorsByDept).map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Select Doctor Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="doctor" className="text-sm font-medium text-slate-300 block">
                  Select Doctor <span className="text-rose-400">*</span>
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                >
                  {(doctorsByDept[formData.department] || []).map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} ({doc.rating} — Consultation {doc.fee})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Date & Time Slot Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>2. Select Consultation Date & Time Slot</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Date Input */}
              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="date" className="text-sm font-medium text-slate-300 block">
                  Preferred Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-slate-300 block">
                  Available Time Slots <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => selectTimeSlot(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                        formData.timeSlot === slot
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500'
                          : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{slot.split(' - ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Visit Mode & Symptoms */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>3. Consultation Details & Notes</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Visit Type selector */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-sm font-medium text-slate-300 block">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {['In-Person OPD', 'Virtual Telemedicine'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, visitType: mode }))}
                      className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                        formData.visitType === mode
                          ? 'bg-indigo-600/20 border-2 border-indigo-500 text-indigo-300'
                          : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode === 'In-Person OPD' ? <MapPin className="w-4 h-4 text-emerald-400" /> : <Video className="w-4 h-4 text-purple-400" />}
                      <span>{mode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms / Reason Input */}
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="symptoms" className="text-sm font-medium text-slate-300 block">
                  Symptoms or Reason for Visit (Optional)
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows="3"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Describe any symptoms, medication queries, or specific reasons for your consultation..."
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant confirmation sent via SMS/Email upon booking.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Appointment...</span>
              ) : (
                <>
                  <span>Confirm Appointment Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
