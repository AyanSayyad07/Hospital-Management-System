import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Stethoscope, 
  Award, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  LogOut, 
  ShieldCheck, 
  Briefcase, 
  BookOpen, 
  DollarSign
} from 'lucide-react';

export default function DoctorProfile() {
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Marcus Vance',
    email: 'marcus.vance@medipulse.org',
    phone: '+1 (555) 492-8810',
    specialization: 'Senior Cardiologist & Interventional Electrophysiologist',
    department: 'Cardiology',
    experience: '16 Years',
    education: 'MD Harvard Medical School, Fellowship in Cardiology at Johns Hopkins, FACC Certified',
    availability: 'Monday - Friday, 9:00 AM - 5:00 PM',
    consultationFee: '$120',
    bio: 'Leading specialist in complex cardiovascular disorders, preventative cardiology, and non-invasive electrophysiology with over 15 years of hospital practice.'
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

    if (!profileData.fullName.trim() || !profileData.email.trim() || !profileData.specialization.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Full Name, Email, and Specialization fields cannot be empty.'
      });
      return;
    }

    setIsSaving(true);

    // Mock API submission handler
    console.log('====================================');
    console.log('🔄 MOCK DOCTOR PROFILE UPDATED (Frontend -> MERN API later):');
    console.log('Updated Profile Payload:', profileData);
    console.log('====================================');

    setTimeout(() => {
      setIsSaving(false);
      setStatusMsg({
        type: 'success',
        text: 'Doctor professional profile and clinical schedule availability updated successfully! Details logged to console.'
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Doctor Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">
              MediPulse <span className="text-indigo-400 text-sm font-medium hidden sm:inline">| Doctor Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm font-medium">
            <Link to="/doctor" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Dashboard</Link>
            <Link to="/doctor/schedule" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">My Schedule</Link>
            <Link to="/doctor/consultation/APT-1092" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Live Consultation</Link>
            <Link to="/doctor/profile" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Profile & Settings</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-800/80 text-sm font-medium">
          <Link to="/doctor" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Dashboard</Link>
          <Link to="/doctor/schedule" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Schedule</Link>
          <Link to="/doctor/consultation/APT-1092" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Consultation</Link>
          <Link to="/doctor/profile" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Profile</Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Doctor Professional Profile & Settings
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your clinical credentials, specialization details, consultation fees, and weekly availability hours.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Staff ID: DOC-4091 | Active Board Certification</span>
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
          {/* Doctor Professional ID Card Preview */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 text-center space-y-6 shadow-xl sticky top-28">
            <div className="relative inline-block mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250" 
                alt={profileData.fullName} 
                className="w-28 h-28 rounded-3xl object-cover border-4 border-indigo-500/40 shadow-2xl mx-auto"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="On Duty">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-1.5">
                {profileData.department} Lead
              </span>
              <h2 className="text-xl font-extrabold text-white">{profileData.fullName}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">{profileData.specialization}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-left text-xs">
              <div>
                <span className="text-slate-500 block">Experience</span>
                <span className="font-bold text-slate-200 text-sm block mt-0.5">{profileData.experience}</span>
              </div>
              <div>
                <span className="text-slate-500 block">OPD Fee</span>
                <span className="font-extrabold text-emerald-400 text-sm block mt-0.5">{profileData.consultationFee}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800/60">
                <span className="text-slate-500 block">Availability</span>
                <span className="font-semibold text-slate-300 block mt-0.5">{profileData.availability}</span>
              </div>
            </div>

            <div className="pt-2 text-left space-y-2 text-xs text-slate-400 border-t border-slate-800">
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

          {/* Profile & Credentials Form */}
          <form onSubmit={handleUpdateProfile} className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Section 1: Professional Demographics */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Stethoscope className="w-4 h-4 text-indigo-400" />
                <span>Clinical Specialization & Contact</span>
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
                    Staff Email Address <span className="text-rose-400">*</span>
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
                    Direct Phone / Hotline
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
                  <label htmlFor="department" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Primary Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={profileData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  >
                    {['Cardiology', 'General Medicine', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'].map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="specialization" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Detailed Specialization <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={profileData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Education, Experience & Availability */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Education, Experience & Schedule Availability</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="experience" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 16 Years"
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="consultationFee" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Consultation Fee
                  </label>
                  <input
                    type="text"
                    id="consultationFee"
                    name="consultationFee"
                    value={profileData.consultationFee}
                    onChange={handleChange}
                    placeholder="e.g. $120"
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="education" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Education & Certifications
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleChange}
                    placeholder="e.g. MD Harvard Medical School, Fellowship FACC"
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="availability" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Typical Availability Hours</span>
                  </label>
                  <input
                    type="text"
                    id="availability"
                    name="availability"
                    value={profileData.availability}
                    onChange={handleChange}
                    placeholder="e.g. Monday - Friday, 9:00 AM - 5:00 PM"
                    className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="bio" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Professional Clinical Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={profileData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                  ></textarea>
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
                    <span>Update Professional Profile</span>
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
