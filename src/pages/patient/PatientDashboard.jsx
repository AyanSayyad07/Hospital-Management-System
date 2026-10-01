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
        { title: 'Total Appointments', value: '14', change: '+2 this year', icon: <Calendar className="w-6 h-6 text-blue-600" />, bg: 'from-blue-50 to-white', border: 'border-blue-100' },
        { title: 'Upcoming Visits', value: '2', change: 'Next: Oct 14', icon: <Clock className="w-6 h-6 text-emerald-600" />, bg: 'from-emerald-50 to-white', border: 'border-emerald-100' },
        { title: 'Active Prescriptions', value: '3', change: 'Refill needed for 1', icon: <FileText className="w-6 h-6 text-purple-600" />, bg: 'from-purple-50 to-white', border: 'border-purple-100' },
        { title: 'Lab Reports Ready', value: '4', change: 'Complete CBC Report', icon: <Activity className="w-6 h-6 text-rose-600" />, bg: 'from-rose-50 to-white', border: 'border-rose-100' }
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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-600 font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium animate-pulse text-slate-700">Loading patient health dashboard...</p>
        </div>
      </div>
    );
  }

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
            <Link to="/patient" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Dashboard</Link>
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Book Visit</Link>
            <Link to="/patient/records" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Medical Records</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Profile</Link>
          </nav>

          <div className="flex items-center space-x-3 ml-auto">
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-200 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Appointments</Link>
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Book Visit</Link>
          <Link to="/patient/records" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Records</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Profile</Link>
        </div>

        {/* Welcome Banner */}
        <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 border border-blue-100 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden shadow-xs">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Patient ID: {patient?.id} | Blood Group: {patient?.bloodGroup}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {patient?.name}! 👋
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
                Your medical dashboard is up to date. You have 2 upcoming consultations scheduled for this month.
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <Link 
                to="/patient/appointments" 
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold transition-all shadow-xs flex items-center space-x-2"
              >
                <span>View All Visits</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {quickStats.map((stat, i) => (
            <div 
              key={i} 
              className={`bg-gradient-to-br ${stat.bg} border ${stat.border} rounded-2xl p-6 hover:shadow-md transition-all duration-300 shadow-xs`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-sm font-medium">{stat.title}</span>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
                <span className="text-xs font-medium text-slate-500">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Next Appointment & Notifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Next Appointment Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Next Scheduled Consultation</span>
              </h2>
              <Link to="/patient/book" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <span>+ Reschedule / New Visit</span>
              </Link>
            </div>

            {nextAppointment ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={nextAppointment.doctorAvatar} 
                      alt={nextAppointment.doctorName} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100 shadow-sm"
                    />
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                        {nextAppointment.department}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{nextAppointment.doctorName}</h3>
                      <p className="text-slate-500 text-sm">{nextAppointment.specialty}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{nextAppointment.status}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-slate-100 text-sm">
                  <div className="flex items-center space-x-3 text-slate-700">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Calendar className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Appointment Date</span>
                      <span className="font-semibold text-slate-800">{nextAppointment.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-700">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Clock className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Time Slot</span>
                      <span className="font-semibold text-slate-800">{nextAppointment.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-700">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <MapPin className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Location / Room</span>
                      <span className="font-semibold text-slate-800">{nextAppointment.room}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Please arrive or join virtual lobby 10 minutes prior to scheduled time.</span>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button 
                      onClick={() => alert('Launching High-Definition Telemedicine Video Room...')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Video Room</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 shadow-xs">
                <p>You currently have no upcoming scheduled appointments.</p>
                <Link to="/patient/book" className="inline-block mt-4 px-5 py-2 rounded-xl bg-blue-600 text-white font-medium text-sm">Book New Appointment</Link>
              </div>
            )}
          </div>

          {/* Recent Notifications & Alerts Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-rose-500" />
                <span>Recent Notifications</span>
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                {notifications.length} New
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs max-h-[480px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div key={notif.id} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 relative group hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                    <button 
                      onClick={() => dismissNotification(notif.id)}
                      className="absolute top-3 right-3 text-xs text-slate-400 hover:text-rose-600 font-bold transition-colors"
                      title="Dismiss"
                    >
                      &times;
                    </button>
                    <div className="flex items-center space-x-2 mb-1.5 pr-4">
                      <span className="text-xs font-bold text-blue-700">{notif.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{notif.text}</p>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{notif.time}</span>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 text-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
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
