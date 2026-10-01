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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    // Client-side validations
    if (!formData.department || !formData.doctor || !formData.date || !formData.timeSlot) {
      setStatusMsg({
        type: 'error',
        text: 'Please select a department, doctor, preferred date, and time slot.'
      });
      setIsSubmitting(false);
      return;
    }

    // Mock API call submission
    console.log('====================================');
    console.log('🩺 APPOINTMENT BOOKING SUBMISSION:');
    console.log('Payload:', {
      patientId: 'PT-89421',
      patientName: 'Sarah Jenkins',
      ...formData,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    });
    console.log('====================================');

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMsg({
        type: 'success',
        text: `Consultation confirmed with ${formData.doctor} for ${formData.date} at ${formData.timeSlot}. Redirecting to your appointments...`
      });

      setTimeout(() => {
        navigate('/patient/appointments');
      }, 1500);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* Patient Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between relative">
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
              Loop Hospitals <span className="text-blue-600 text-sm font-medium hidden xl:inline">| Patient Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            <Link to="/patient" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Book Visit</Link>
            <Link to="/patient/records" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Medical Records</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Profile</Link>
          </nav>

          <div className="flex items-center space-x-3 ml-auto">
            <Link to="/login" className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-200 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Appointments</Link>
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Book Visit</Link>
          <Link to="/patient/records" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Records</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Profile</Link>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Instant OPD & Telemedicine Scheduling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Book a Medical Consultation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your preferred specialist, date, and available time slot to reserve your appointment instantly.
          </p>
        </div>

        {/* Status Alert Banner */}
        {statusMsg.text && (
          <div 
            className={`mb-6 p-4 rounded-2xl flex items-start space-x-3 text-sm font-medium border animate-fadeIn ${
              statusMsg.type === 'error' 
                ? 'bg-rose-50 border-rose-200 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            {statusMsg.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Booking Form Card */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* Step 1: Department & Doctor */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <span>1. Choose Specialty & Doctor</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Department Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="department" className="text-sm font-semibold text-slate-700 block">
                  Department / Specialty <span className="text-rose-500">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                >
                  {Object.keys(doctorsByDept).map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Select Doctor Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="doctor" className="text-sm font-semibold text-slate-700 block">
                  Select Doctor <span className="text-rose-500">*</span>
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
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
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>2. Select Consultation Date & Time Slot</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Date Input */}
              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="date" className="text-sm font-semibold text-slate-700 block">
                  Preferred Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                />
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">
                  Available Time Slots <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => selectTimeSlot(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                        formData.timeSlot === slot
                          ? 'bg-blue-600 text-white shadow-xs border border-blue-600'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>3. Consultation Details & Notes</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Visit Type selector */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-sm font-semibold text-slate-700 block">
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
                          ? 'bg-blue-50 border-2 border-blue-500 text-blue-700 font-bold'
                          : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {mode === 'In-Person OPD' ? <MapPin className="w-4 h-4 text-emerald-600" /> : <Video className="w-4 h-4 text-indigo-600" />}
                      <span>{mode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms / Reason Input */}
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="symptoms" className="text-sm font-semibold text-slate-700 block">
                  Symptoms or Reason for Visit (Optional)
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows="3"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Describe any symptoms, medication queries, or specific reasons for your consultation..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant confirmation sent via SMS/Email upon booking.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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
