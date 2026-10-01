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
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* Patient Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
              Loop Hospitals <span className="text-blue-600 text-sm font-medium hidden sm:inline">| Patient Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-sm font-medium">
            <Link to="/patient" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Book Visit</Link>
            <Link to="/patient/records" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Medical Records</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Profile</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link 
              to="/patient/book" 
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Visit</span>
            </Link>
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
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Book Visit</Link>
          <Link to="/patient/records" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Records</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Profile</Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Patient Profile & Medical Settings
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Keep your personal details, insurance records, and emergency contact information up to date.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted MERN Profile ID: PT-89421</span>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Digital Medical ID Card Preview */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-6 shadow-xs lg:sticky lg:top-24 self-start">
            <div className="relative inline-block mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-md mx-auto border-4 border-slate-100">
                {profileData.fullName.split(' ').slice(0, 2).map(n => n[0]).join('')}
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Active Account">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">{profileData.fullName}</h2>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">Verified Hospital Patient</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left text-xs">
              <div>
                <span className="text-slate-500 block">Blood Group</span>
                <span className="font-extrabold text-rose-600 text-sm flex items-center space-x-1 mt-0.5">
                  <Droplet className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileData.bloodGroup}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Gender</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">{profileData.gender}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-slate-500 block">Insurance Policy</span>
                <span className="font-semibold text-slate-700 block mt-0.5 truncate">{profileData.policyNumber}</span>
              </div>
            </div>

            <div className="pt-2 text-left space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{profileData.phone}</span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdateProfile} className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
            {/* Section 1: Personal Demographics */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4 text-blue-600" />
                <span>Personal & Demographic Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bloodGroup" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={profileData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dob" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="gender" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Gender Identity
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  >
                    {['Female', 'Male', 'Non-Binary', 'Prefer not to say'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="address" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Emergency Contact & Insurance */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Emergency Contact & Insurance Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="emergencyContactName" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Emergency Contact Name & Relationship
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={profileData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="e.g. David Jenkins (Spouse)"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="emergencyContactPhone" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="text"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    value={profileData.emergencyContactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="insuranceProvider" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Health Insurance Provider
                  </label>
                  <input
                    type="text"
                    id="insuranceProvider"
                    name="insuranceProvider"
                    value={profileData.insuranceProvider}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="policyNumber" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Policy / Member ID Number
                  </label>
                  <input
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    value={profileData.policyNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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
