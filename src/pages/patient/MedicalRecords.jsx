import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, FileText, Download, Filter, Search, 
  Stethoscope, Pill, LogOut
} from 'lucide-react';

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data fetching
    const timer = setTimeout(() => {
      setRecords([
        {
          id: 'REC-1029',
          date: 'October 10, 2026',
          type: 'Prescription',
          doctor: 'Dr. Marcus Vance',
          department: 'Cardiology',
          notes: 'Patient reports mild chest discomfort after heavy exercise. BP is normal. Recommended to continue current medication and avoid strenuous activities for 2 weeks.',
          medications: [
            { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
            { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' }
          ],
          status: 'Active'
        },
        {
          id: 'REC-0914',
          date: 'September 14, 2026',
          type: 'Lab Report',
          doctor: 'Dr. Sarah Connor',
          department: 'Pathology',
          notes: 'Complete Blood Count (CBC) and Lipid Profile results. Cholesterol levels are slightly elevated. Dietary changes advised.',
          medications: [],
          status: 'Reviewed'
        },
        {
          id: 'REC-0522',
          date: 'May 22, 2026',
          type: 'General Checkup',
          doctor: 'Dr. Emily Chen',
          department: 'General Medicine',
          notes: 'Annual physical examination. All vitals normal. Patient is in good health.',
          medications: [
            { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily' }
          ],
          status: 'Completed'
        }
      ]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse">Loading medical records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <HeartPulse className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">
                MediPulse <span className="text-indigo-400 text-sm font-medium hidden sm:inline">| Patient Portal</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm font-medium">
            <Link to="/patient" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Appointments</Link>
            <Link to="/patient/records" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Records</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Profile</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-800/80 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Appointments</Link>
          <Link to="/patient/records" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Records</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Profile</Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Medical Records</h1>
            <p className="text-slate-400 mt-1">View your past prescriptions, lab reports, and doctor's notes.</p>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-500"
              />
            </div>
            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {records.map((record) => (
            <div key={record.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl border ${record.type === 'Prescription' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : record.type === 'Lab Report' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                    {record.type === 'Prescription' ? <Pill className="w-6 h-6" /> : record.type === 'Lab Report' ? <FileText className="w-6 h-6" /> : <Stethoscope className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{record.type}</h3>
                    <div className="text-sm text-slate-400 mt-1 flex items-center space-x-2">
                      <span className="text-slate-300 font-medium">{record.doctor}</span>
                      <span>•</span>
                      <span>{record.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Date Added</span>
                    <span className="text-sm font-semibold text-slate-300">{record.date}</span>
                  </div>
                  <button className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700/50 ml-auto sm:ml-0" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Doctor's Clinical Notes</h4>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                    {record.notes}
                  </p>
                </div>

                {record.medications && record.medications.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Prescribed Medications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {record.medications.map((med, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">{med.name}</span>
                            <span className="text-[11px] text-slate-400">{med.dosage} • {med.frequency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
