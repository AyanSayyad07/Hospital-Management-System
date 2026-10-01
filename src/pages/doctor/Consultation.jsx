import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Stethoscope, 
  FileText, 
  User, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  LogOut, 
  ArrowLeft, 
  Clock, 
  Pill, 
  ShieldCheck,
  Video,
  ClipboardList
} from 'lucide-react';

export default function Consultation() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [patientDetails, setPatientDetails] = useState(null);
  const [prescriptionNotes, setPrescriptionNotes] = useState(
    "1. Atorvastatin 20mg - 1 tablet orally once daily at bedtime for 90 days.\n2. Aspirin (Low Dose) 81mg - 1 tablet orally once daily after breakfast.\n3. Recommend low-sodium Mediterranean diet and 30 mins moderate daily walking.\n4. Follow up lipid profile test in 3 months."
  );
  const [diagnosis, setDiagnosis] = useState("Mild Dyslipidemia with Controlled Post-Operative Cardiac Recovery");
  const [followUpWeeks, setFollowUpWeeks] = useState("12");

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate lookup of patient based on appointmentId from URL (fallback to APT-1092)
    const activeId = appointmentId || 'APT-1092';
    
    // Mock database lookup
    const mockDatabase = {
      'APT-1092': {
        name: 'Sarah Jenkins',
        patientId: 'PT-89421',
        age: 32,
        gender: 'Female',
        bloodGroup: 'O+',
        appointmentId: activeId,
        vitals: {
          bloodPressure: '120/80 mmHg',
          heartRate: '72 bpm',
          temperature: '98.6 °F',
          spO2: '99%'
        },
        chiefComplaint: 'Post-operative Cardiac Evaluation & Lipid Profile Check after 6 months of Atorvastatin therapy.',
        medicalHistory: 'Diagnosed with mild dyslipidemia in 2024. No known drug allergies (NKDA). Family history of essential hypertension on paternal side. Surgical history: Minor stent angioplasty (2025).',
        allergies: 'None reported'
      },
      'APT-1093': {
        name: 'Robert Langdon',
        patientId: 'PT-44210',
        age: 54,
        gender: 'Male',
        bloodGroup: 'A+',
        appointmentId: activeId,
        vitals: {
          bloodPressure: '145/95 mmHg',
          heartRate: '88 bpm',
          temperature: '99.1 °F',
          spO2: '96%'
        },
        chiefComplaint: 'Severe Chest Discomfort & Palpitations over the past 48 hours.',
        medicalHistory: 'Chronic Type 2 Diabetes Mellitus (10 yrs). Current smoker (half pack/day). High stress lifestyle.',
        allergies: 'Penicillin (Anaphylaxis)'
      }
    };

    const loadedPatient = mockDatabase[activeId] || {
      name: 'Sarah Jenkins (Default Demo Patient)',
      patientId: 'PT-89421',
      age: 32,
      gender: 'Female',
      bloodGroup: 'O+',
      appointmentId: activeId,
      vitals: {
        bloodPressure: '120/80 mmHg',
        heartRate: '74 bpm',
        temperature: '98.6 °F',
        spO2: '99%'
      },
      chiefComplaint: 'Consultation for routine health evaluation and medication review.',
      medicalHistory: 'No chronic illness recorded. All immunizations up to date.',
      allergies: 'None reported'
    };

    setPatientDetails(loadedPatient);
  }, [appointmentId]);

  const handleSubmitConsultation = (e) => {
    e.preventDefault();

    if (!prescriptionNotes.trim() || !diagnosis.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Please enter both a Diagnosis and Prescription Notes before completing the appointment.'
      });
      return;
    }

    setIsSubmitting(true);

    // Mock API submission handler
    console.log('====================================');
    console.log('🩺 MOCK CONSULTATION COMPLETED & PRESCRIPTION ISSUED:');
    console.log('Appointment ID:', patientDetails?.appointmentId);
    console.log('Patient Name:', patientDetails?.name);
    console.log('Diagnosis:', diagnosis);
    console.log('Prescription Notes:\n', prescriptionNotes);
    console.log('Follow-up in Weeks:', followUpWeeks);
    console.log('Completed At:', new Date().toISOString());
    console.log('====================================');

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMsg({
        type: 'success',
        text: `Consultation for ${patientDetails?.name} completed successfully! Digital prescription logged to console.`
      });

      setTimeout(() => {
        navigate('/doctor/schedule');
      }, 2000);
    }, 800);
  };

  if (!patientDetails) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
              Loop Hospitals <span className="text-indigo-400 text-sm font-medium hidden sm:inline">| Doctor Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm font-medium">
            <Link to="/doctor" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Dashboard</Link>
            <Link to="/doctor/schedule" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">My Schedule</Link>
            <Link to={`/doctor/consultation/${patientDetails.appointmentId}`} className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Live Consultation</Link>
            <Link to="/doctor/profile" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Profile & Settings</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert('Launching High-Definition Telemedicine Video Stream...')}
              className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-all"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Launch Video Room</span>
            </button>
            <Link to="/login" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-800/80 text-sm font-medium">
          <Link to="/doctor" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Dashboard</Link>
          <Link to="/doctor/schedule" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Schedule</Link>
          <Link to={`/doctor/consultation/${patientDetails.appointmentId}`} className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Consultation</Link>
          <Link to="/doctor/profile" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Profile</Link>
        </div>

        {/* Back Link & Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/doctor/schedule" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Schedule</span>
          </Link>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold font-mono">
            <span>Consultation Session: {patientDetails.appointmentId}</span>
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
          {/* Patient Details & Vitals Summary Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl sticky top-28">
            <div className="flex items-center space-x-4 pb-5 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-black text-white shadow-lg shrink-0">
                {patientDetails.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{patientDetails.name}</h2>
                <p className="text-xs text-slate-400">
                  {patientDetails.age} Years • {patientDetails.gender} • Blood: <span className="text-rose-400 font-extrabold">{patientDetails.bloodGroup}</span>
                </p>
                <span className="text-[11px] text-indigo-400 font-mono mt-0.5 block">ID: {patientDetails.patientId}</span>
              </div>
            </div>

            {/* Vitals Grid */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3 flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-400" />
                <span>Recorded Patient Vitals</span>
              </span>
              <div className="grid grid-cols-2 gap-2.5 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Blood Pressure</span>
                  <span className="font-bold text-slate-200 block mt-0.5">{patientDetails.vitals.bloodPressure}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Heart Rate</span>
                  <span className="font-bold text-slate-200 block mt-0.5">{patientDetails.vitals.heartRate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Temperature</span>
                  <span className="font-bold text-slate-200 block mt-0.5">{patientDetails.vitals.temperature}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Oxygen (SpO2)</span>
                  <span className="font-bold text-emerald-400 block mt-0.5">{patientDetails.vitals.spO2}</span>
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block flex items-center space-x-1.5">
                <ClipboardList className="w-3.5 h-3.5 text-indigo-400" />
                <span>Chief Complaint</span>
              </span>
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-3.5 text-xs text-indigo-200 leading-relaxed font-medium">
                "{patientDetails.chiefComplaint}"
              </div>
            </div>

            {/* Medical History & Allergies */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Medical History Summary
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {patientDetails.medicalHistory}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Known Drug Allergies
                </span>
                <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  patientDetails.allergies.includes('None')
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  {patientDetails.allergies}
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Prescription & Consultation Form */}
          <form onSubmit={handleSubmitConsultation} className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2.5">
                <Stethoscope className="w-6 h-6 text-indigo-400" />
                <span>Doctor Consultation & Digital Prescription Sheet</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Record diagnosis details, prescribed medications, dosages, and clinical advice for the patient.
              </p>
            </div>

            {/* Diagnosis & Follow up Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="diagnosis" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Final Clinical Diagnosis <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Essential Hypertension Grade 1"
                  required
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="followUp" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Follow-up (Weeks)
                </label>
                <select
                  id="followUp"
                  value={followUpWeeks}
                  onChange={(e) => setFollowUpWeeks(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                >
                  {['2', '4', '8', '12', '24', 'No follow-up needed'].map((w) => (
                    <option key={w} value={w}>{w === 'No follow-up needed' ? w : `${w} Weeks`}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Large Prescription & Notes Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="notes" className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Pill className="w-4 h-4 text-indigo-400" />
                  <span>Prescription & Consultation Notes <span className="text-rose-400">*</span></span>
                </label>
                <span className="text-xs text-slate-500 font-mono">Supports multi-line prescription format</span>
              </div>

              <textarea
                id="notes"
                rows="8"
                value={prescriptionNotes}
                onChange={(e) => setPrescriptionNotes(e.target.value)}
                placeholder="1. Medication Name - Dosage - Frequency - Duration&#10;2. Clinical advice & lifestyle recommendations..."
                required
                className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono leading-relaxed"
              ></textarea>
            </div>

            {/* Digital Signature & Submission */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Digitally signed by Dr. Marcus Vance (Cardiology Dept)</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting & Sealing Prescription...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Submit & Complete Appointment</span>
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
