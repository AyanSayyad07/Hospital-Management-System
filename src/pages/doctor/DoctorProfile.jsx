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
    email: 'marcus.vance@loophospitals.org',
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
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* Doctor Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
              Loop Hospitals <span className="text-blue-600 text-sm font-medium hidden sm:inline">| Doctor Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-sm font-medium">
            <Link to="/doctor" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Dashboard</Link>
            <Link to="/doctor/schedule" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">My Schedule</Link>
            <Link to="/doctor/consultation/APT-1092" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Live Consultation</Link>
            <Link to="/doctor/profile" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Profile</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-200 text-sm font-medium">
          <Link to="/doctor" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Dashboard</Link>
          <Link to="/doctor/schedule" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Schedule</Link>
          <Link to="/doctor/consultation/APT-1092" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Consultation</Link>
          <Link to="/doctor/profile" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Profile</Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Doctor Professional Profile & Settings
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage your clinical credentials, specialization details, consultation fees, and weekly availability hours.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Staff ID: DOC-4091 | Active Board Certification</span>
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
          {/* Doctor Professional ID Card Preview */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-6 shadow-xs lg:sticky lg:top-24 self-start">
            <div className="relative inline-block mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250" 
                alt={profileData.fullName} 
                className="w-28 h-28 rounded-3xl object-cover border-4 border-slate-100 shadow-md mx-auto"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="On Duty">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 mb-1.5">
                {profileData.department} Lead
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">{profileData.fullName}</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">{profileData.specialization}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left text-xs">
              <div>
                <span className="text-slate-500 block">Experience</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">{profileData.experience}</span>
              </div>
              <div>
                <span className="text-slate-500 block">OPD Fee</span>
                <span className="font-extrabold text-emerald-700 text-sm block mt-0.5">{profileData.consultationFee}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-slate-500 block">Availability</span>
                <span className="font-semibold text-slate-700 block mt-0.5">{profileData.availability}</span>
              </div>
            </div>

            <div className="pt-2 text-left space-y-2 text-xs text-slate-600 border-t border-slate-100">
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

          {/* Profile & Credentials Form */}
          <form onSubmit={handleUpdateProfile} className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
            {/* Section 1: Professional Demographics */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span>Clinical Specialization & Contact</span>
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
                    Staff Email Address <span className="text-rose-500">*</span>
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
                    Direct Phone / Hotline
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
                  <label htmlFor="department" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Primary Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={profileData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  >
                    {['Cardiology', 'General Medicine', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'].map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="specialization" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Detailed Specialization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={profileData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Education, Experience & Availability */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Education, Experience & Schedule Availability</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="experience" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 16 Years"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="consultationFee" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Consultation Fee
                  </label>
                  <input
                    type="text"
                    id="consultationFee"
                    name="consultationFee"
                    value={profileData.consultationFee}
                    onChange={handleChange}
                    placeholder="e.g. $120"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="education" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Education & Certifications
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleChange}
                    placeholder="e.g. MD Harvard Medical School, Fellowship FACC"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="availability" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Typical Availability Hours</span>
                  </label>
                  <input
                    type="text"
                    id="availability"
                    name="availability"
                    value={profileData.availability}
                    onChange={handleChange}
                    placeholder="e.g. Monday - Friday, 9:00 AM - 5:00 PM"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="bio" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Professional Clinical Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={profileData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all leading-relaxed shadow-xs"
                  ></textarea>
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
