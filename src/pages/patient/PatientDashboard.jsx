import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  HeartPulse, 
  Bell, 
  Activity, 
  FileText, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Video, 
  MapPin, 
  PlusCircle,
  LogOut
} from 'lucide-react';

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [quickStats, setQuickStats] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setPatient({
        name: 'Sarah Jenkins',
        id: 'PT-89421',
        bloodGroup: 'O+',
        age: 32
      });

      setQuickStats([
        { title: 'Total Appointments', value: '14', change: '+2 this year', icon: <Calendar className="w-6 h-6 text-indigo-400" />, bg: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/30' },
        { title: 'Upcoming Visits', value: '2', change: 'Next: Oct 14', icon: <Clock className="w-6 h-6 text-emerald-400" />, bg: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30' },
        { title: 'Active Prescriptions', value: '3', change: 'Refill needed for 1', icon: <FileText className="w-6 h-6 text-purple-400" />, bg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
        { title: 'Lab Reports Ready', value: '4', change: 'Complete CBC Report', icon: <Activity className="w-6 h-6 text-rose-400" />, bg: 'from-rose-500/20 to-rose-500/5', border: 'border-rose-500/30' }
      ]);

      setNextAppointment({
        id: 'APT-1092',
        doctorName: 'Dr. Marcus Vance',
        specialty: 'Cardiology Specialist',
        department: 'Cardiology Center',
        date: 'October 14, 2026',
        time: '10:30 AM - 11:00 AM',
        room: 'OPD Suite 402 / Virtual Tele-Room',
        status: 'Confirmed',
        doctorAvatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
      });

      setNotifications([
        { id: 1, title: 'Prescription Ready for Pickup', time: '2 hours ago', type: 'prescription', text: 'Dr. Vance renewed your Atorvastatin 20mg daily pack.' },
        { id: 2, title: 'Blood Test Results Uploaded', time: 'Yesterday', type: 'lab', text: 'Lipid Profile and Complete Blood Count reports are now downloadable.' },
        { id: 3, title: 'Annual Checkup Reminder', time: '3 days ago', type: 'reminder', text: 'It has been 11 months since your last general wellness checkup.' }
      ]);

      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300 font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse">Loading patient health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Patient Portal Navigation Header */}
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
            <Link to="/patient" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">My Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Book Appointment</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Profile & Settings</Link>
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-800/80 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Appointments</Link>
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Book Visit</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Profile</Link>
        </div>

        {/* Welcome Banner */}
        <div className="relative bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Patient ID: {patient?.id} | Blood Group: {patient?.bloodGroup}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, {patient?.name}! 👋
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-xl">
                Your medical dashboard is up to date. You have 2 upcoming consultations scheduled for this month.
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <Link 
                to="/patient/appointments" 
                className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all flex items-center space-x-2"
              >
                <span>View All Records</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {quickStats.map((stat, i) => (
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

        {/* Next Appointment & Notifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Next Appointment Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <span>Next Scheduled Consultation</span>
              </h2>
              <Link to="/patient/book" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
                <span>+ Reschedule / New Visit</span>
              </Link>
            </div>

            {nextAppointment ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={nextAppointment.doctorAvatar} 
                      alt={nextAppointment.doctorName} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-md"
                    />
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-1">
                        {nextAppointment.department}
                      </span>
                      <h3 className="text-xl font-bold text-white">{nextAppointment.doctorName}</h3>
                      <p className="text-slate-400 text-sm">{nextAppointment.specialty}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{nextAppointment.status}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-slate-800 text-sm">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">Appointment Date</span>
                      <span className="font-semibold">{nextAppointment.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">Time Slot</span>
                      <span className="font-semibold">{nextAppointment.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">Location / Room</span>
                      <span className="font-semibold">{nextAppointment.room}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Please arrive or join virtual lobby 10 minutes prior to scheduled time.</span>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button 
                      onClick={() => alert('Launching High-Definition Telemedicine Video Room...')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Video Room</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                <p>You currently have no upcoming scheduled appointments.</p>
                <Link to="/patient/book" className="inline-block mt-4 px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm">Book New Appointment</Link>
              </div>
            )}
          </div>

          {/* Recent Notifications & Alerts Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Bell className="w-5 h-5 text-rose-400" />
                <span>Recent Notifications</span>
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                {notifications.length} New
              </span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl max-h-[480px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div key={notif.id} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 relative group hover:border-slate-700 transition-all">
                    <button 
                      onClick={() => dismissNotification(notif.id)}
                      className="absolute top-3 right-3 text-xs text-slate-500 hover:text-rose-400 font-bold transition-colors"
                      title="Dismiss"
                    >
                      &times;
                    </button>
                    <div className="flex items-center space-x-2 mb-1.5 pr-4">
                      <span className="text-xs font-bold text-indigo-400">{notif.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{notif.text}</p>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{notif.time}</span>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-500 text-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-60" />
                  <span>All caught up! No active alerts.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
