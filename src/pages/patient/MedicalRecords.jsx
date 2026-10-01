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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-600 font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse text-slate-700">Loading medical records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <HeartPulse className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Loop Hospitals <span className="text-blue-600 text-sm font-medium hidden sm:inline">| Patient Portal</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-sm font-medium">
            <Link to="/patient" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Book Visit</Link>
            <Link to="/patient/records" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Medical Records</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Profile</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-200 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Appointments</Link>
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Book Visit</Link>
          <Link to="/patient/records" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Records</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Profile</Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Medical Records & History</h1>
            <p className="text-slate-600 mt-1 text-sm">View your past prescriptions, lab reports, and doctor's clinical summaries.</p>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 shadow-xs"
              />
            </div>
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {records.map((record) => (
            <div key={record.id} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-all duration-300 shadow-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl border ${record.type === 'Prescription' ? 'bg-blue-50 border-blue-200 text-blue-600' : record.type === 'Lab Report' ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                    {record.type === 'Prescription' ? <Pill className="w-6 h-6" /> : record.type === 'Lab Report' ? <FileText className="w-6 h-6" /> : <Stethoscope className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{record.type}</h3>
                    <div className="text-sm text-slate-500 mt-1 flex items-center space-x-2">
                      <span className="text-slate-800 font-medium">{record.doctor}</span>
                      <span>•</span>
                      <span>{record.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">Date Added</span>
                    <span className="text-sm font-semibold text-slate-700">{record.date}</span>
                  </div>
                  <button className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 ml-auto sm:ml-0 shadow-xs" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Doctor's Clinical Notes</h4>
                  <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    {record.notes}
                  </p>
                </div>

                {record.medications && record.medications.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Prescribed Medications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {record.medications.map((med, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                          <div className="p-1.5 rounded-lg bg-blue-100/70 text-blue-600 shrink-0">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900 block">{med.name}</span>
                            <span className="text-[11px] text-slate-500">{med.dosage} • {med.frequency}</span>
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
