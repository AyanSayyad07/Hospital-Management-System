import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Droplet, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  LogOut,
  PlusCircle,
  FileText,
  Lock
} from 'lucide-react';

export default function PatientProfile() {
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 382-9104',
    bloodGroup: 'O+',
    dob: '1994-04-18',
    gender: 'Female',
    address: '742 Evergreen Terrace, Suite 4B, Springfield, OR 97477',
    emergencyContactName: 'David Jenkins (Spouse)',
    emergencyContactPhone: '+1 (555) 382-9105',
    insuranceProvider: 'BlueCross HealthCare Shield',
    policyNumber: 'BCS-89421-2026'
  });

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (statusMsg.text) setStatusMsg({ type: '', text: '' });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!profileData.fullName.trim() || !profileData.email.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Full Name and Email Address are mandatory fields.'
      });
      return;
    }

    setIsSaving(true);

    // Mock API submission handler
    console.log('====================================');
    console.log('🔄 MOCK PATIENT PROFILE UPDATED (Frontend -> MERN API later):');
    console.log('Updated Profile Data:', profileData);
    console.log('====================================');

    setTimeout(() => {
      setIsSaving(false);
      setStatusMsg({
        type: 'success',
        text: 'Your medical profile and emergency contacts have been updated successfully! Details logged to console.'
      });
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
              Loop Hospitals <span className="text-indigo-400 text-sm font-medium hidden sm:inline">| Patient Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm font-medium">
            <Link to="/patient" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">My Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Book Appointment</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Profile & Settings</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link 
              to="/patient/book" 
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Visit</span>
            </Link>
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
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Book Visit</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Profile</Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Patient Profile & Medical Settings
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Keep your personal details, insurance records, and emergency contact information up to date.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted MERN Profile ID: PT-89421</span>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Digital Medical ID Card Preview */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 text-center space-y-6 shadow-xl sticky top-28">
            <div className="relative inline-block mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-black text-white shadow-xl mx-auto border-4 border-slate-800">
                {profileData.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="Active Account">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{profileData.fullName}</h2>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">Verified Hospital Patient</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-left text-xs">
              <div>
                <span className="text-slate-500 block">Blood Group</span>
                <span className="font-extrabold text-rose-400 text-sm flex items-center space-x-1 mt-0.5">
                  <Droplet className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileData.bloodGroup}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Gender</span>
                <span className="font-bold text-slate-200 text-sm block mt-0.5">{profileData.gender}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800/60">
                <span className="text-slate-500 block">Insurance Policy</span>
                <span className="font-semibold text-slate-300 block mt-0.5 truncate">{profileData.policyNumber}</span>
              </div>
            </div>

            <div className="pt-2 text-left space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{profileData.phone}</span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdateProfile} className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Section 1: Personal Demographics */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <User className="w-4 h-4 text-indigo-400" />
                <span>Personal & Demographic Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bloodGroup" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={profileData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dob" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="gender" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Gender Identity
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  >
                    {['Female', 'Male', 'Non-Binary', 'Prefer not to say'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="address" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Emergency Contact & Insurance */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Emergency Contact & Insurance Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="emergencyContactName" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Emergency Contact Name & Relationship
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={profileData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="e.g. David Jenkins (Spouse)"
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="emergencyContactPhone" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="text"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    value={profileData.emergencyContactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="insuranceProvider" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Health Insurance Provider
                  </label>
                  <input
                    type="text"
                    id="insuranceProvider"
                    name="insuranceProvider"
                    value={profileData.insuranceProvider}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="policyNumber" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Policy / Member ID Number
                  </label>
                  <input
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    value={profileData.policyNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <span>Saving Updates...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Profile & Medical Records</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
