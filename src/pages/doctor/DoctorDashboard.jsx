import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Calendar, 
  Users, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  LogOut, 
  Activity, 
  FileText, 
  Video, 
  UserPlus
} from 'lucide-react';

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [stats, setStats] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setDoctor({
        name: 'Dr. Marcus Vance',
        specialty: 'Senior Cardiologist & OPD Lead',
        department: 'Cardiology',
        id: 'DOC-4091',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
      });

      setStats([
        { title: 'Appointments Today', value: '8', change: '3 Completed, 5 Remaining', icon: <Calendar className="w-6 h-6 text-indigo-400" />, bg: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/30' },
        { title: 'Pending Consultations', value: '5', change: 'Next visit in 15 mins', icon: <Clock className="w-6 h-6 text-amber-400" />, bg: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/30' },
        { title: 'Total Unique Patients', value: '1,428', change: '+12 new this week', icon: <Users className="w-6 h-6 text-emerald-400" />, bg: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30' },
        { title: 'Urgent OPD Cases', value: '1', change: 'Requires ECG review', icon: <Activity className="w-6 h-6 text-rose-400" />, bg: 'from-rose-500/20 to-rose-500/5', border: 'border-rose-500/30' }
      ]);

      setTodaysAppointments([
        {
          id: 'APT-1092',
          patientName: 'Sarah Jenkins',
          age: 32,
          gender: 'Female',
          time: '10:30 AM',
          reason: 'Post-operative Cardiac Evaluation & Lipid Check',
          status: 'Confirmed',
          type: 'Virtual Video Room',
          urgent: false
        },
        {
          id: 'APT-1093',
          patientName: 'Robert Langdon',
          age: 54,
          gender: 'Male',
          time: '11:15 AM',
          reason: 'Severe Chest Discomfort & Palpitations',
          status: 'Confirmed',
          type: 'In-Person OPD Suite 402',
          urgent: true
        },
        {
          id: 'APT-1094',
          patientName: 'Elena Rostova',
          age: 29,
          gender: 'Female',
          time: '02:00 PM',
          reason: 'Routine Annual Cardiology Screening',
          status: 'Pending',
          type: 'In-Person OPD Suite 402',
          urgent: false
        },
        {
          id: 'APT-1095',
          patientName: 'Arthur Pendelton',
          age: 67,
          gender: 'Male',
          time: '03:30 PM',
          reason: 'Hypertension Dosage Refill & Holter Monitor Review',
          status: 'Confirmed',
          type: 'Virtual Video Room',
          urgent: false
        },
        {
          id: 'APT-1096',
          patientName: 'Chloe Bennett',
          age: 41,
          gender: 'Female',
          time: '04:30 PM',
          reason: 'Mild Arrhythmia Follow-up',
          status: 'Completed',
          type: 'In-Person OPD Suite 402',
          urgent: false
        }
      ]);

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse">Loading Doctor Dashboard & Schedule...</p>
        </div>
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
            <Link to="/doctor" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Dashboard</Link>
            <Link to="/doctor/schedule" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">My Schedule</Link>
            <Link to="/doctor/consultation/APT-1092" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Live Consultation</Link>
            <Link to="/doctor/profile" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Profile & Settings</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-3 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-slate-300">OPD Active (09:00 - 17:00)</span>
            </div>
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
          <Link to="/doctor" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Dashboard</Link>
          <Link to="/doctor/schedule" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Schedule</Link>
          <Link to="/doctor/consultation/APT-1092" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Consultation</Link>
          <Link to="/doctor/profile" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Profile</Link>
        </div>

        {/* Doctor Welcome Banner */}
        <div className="relative bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <img 
                src={doctor?.avatar} 
                alt={doctor?.name} 
                className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-lg"
              />
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-2">
                  <span>Department: {doctor?.department} | Staff ID: {doctor?.id}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Welcome, {doctor?.name}! 👨‍⚕️
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-xl">
                  You have 8 scheduled patient visits today. First OPD consultation starts at 10:30 AM.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <Link 
                to="/doctor/schedule" 
                className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>Full Weekly Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Row of Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`bg-gradient-to-br ${stat.bg} bg-slate-900/80 border ${stat.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{stat.title}</span>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs font-medium text-slate-400">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Schedule Quick View Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2.5">
                <Stethoscope className="w-6 h-6 text-indigo-400" />
                <span>Today's Schedule Quick View</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Manage upcoming consultations, review patient complaints, and launch diagnosis sheets.
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
              {todaysAppointments.length} Appointments Scheduled Today
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="py-3.5 px-4">Time & ID</th>
                  <th className="py-3.5 px-4">Patient Demographics</th>
                  <th className="py-3.5 px-4">Chief Complaint / Reason</th>
                  <th className="py-3.5 px-4">Visit Mode</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {todaysAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono">
                      <span className="font-bold text-white block">{apt.time}</span>
                      <span className="text-xs text-indigo-400 font-semibold">{apt.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-100 flex items-center space-x-2">
                        <span>{apt.patientName}</span>
                        {apt.urgent && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-extrabold uppercase border border-rose-500/30">
                            Urgent
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{apt.age} yrs • {apt.gender}</span>
                    </td>
                    <td className="py-4 px-4 max-w-xs text-slate-300 font-medium">
                      {apt.reason}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400">
                      <span className="flex items-center space-x-1.5">
                        {apt.type.includes('Virtual') ? <Video className="w-3.5 h-3.5 text-purple-400 shrink-0" /> : <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        <span>{apt.type}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                        apt.status === 'Confirmed' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                        apt.status === 'Completed' ? 'bg-slate-800 border-slate-700 text-slate-400' :
                        'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      }`}>
                        {apt.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        <span>{apt.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/doctor/consultation/${apt.id}`}
                        className={`inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                          apt.status === 'Completed'
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                        }`}
                      >
                        <span>{apt.status === 'Completed' ? 'View Summary' : 'Start Consultation'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
