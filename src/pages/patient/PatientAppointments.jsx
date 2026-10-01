import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Calendar, 
  Clock, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  Clock3, 
  AlertCircle, 
  FileText, 
  Video, 
  LogOut,
  PlusCircle,
  Search,
  Filter
} from 'lucide-react';

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const mockData = [
        {
          id: 'APT-1092',
          doctorName: 'Dr. Marcus Vance',
          specialty: 'Senior Cardiologist',
          department: 'Cardiology',
          date: '2026-10-14',
          displayDate: 'Oct 14, 2026',
          time: '10:30 AM - 11:00 AM',
          mode: 'Virtual Video Tele-Room',
          status: 'Confirmed',
          fee: '$120',
          prescriptionId: null
        },
        {
          id: 'APT-1095',
          doctorName: 'Dr. Priya Patel',
          specialty: 'Family Medicine & Diagnostic',
          department: 'General Medicine',
          date: '2026-10-19',
          displayDate: 'Oct 19, 2026',
          time: '02:00 PM - 02:30 PM',
          mode: 'In-Person OPD Suite 104',
          status: 'Pending',
          fee: '$90',
          prescriptionId: null
        },
        {
          id: 'APT-0988',
          doctorName: 'Dr. Jonathan Sterling',
          specialty: 'Consultant Neurologist',
          department: 'Neurology',
          date: '2026-09-28',
          displayDate: 'Sep 28, 2026',
          time: '11:30 AM - 12:00 PM',
          mode: 'In-Person OPD Suite 301',
          status: 'Completed',
          fee: '$160',
          prescriptionId: 'RX-99410'
        },
        {
          id: 'APT-0841',
          doctorName: 'Dr. Sarah Jones',
          specialty: 'Pediatric Specialist',
          department: 'Pediatrics',
          date: '2026-08-12',
          displayDate: 'Aug 12, 2026',
          time: '04:00 PM - 04:30 PM',
          mode: 'Virtual Video Tele-Room',
          status: 'Completed',
          fee: '$95',
          prescriptionId: 'RX-88219'
        }
      ];
      setAppointments(mockData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'Pending':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Completed':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'Cancelled':
        return 'bg-rose-50 border-rose-200 text-rose-700';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const getBadgeIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />;
      case 'Pending':
        return <Clock3 className="w-3.5 h-3.5 mr-1 text-amber-600" />;
      case 'Completed':
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-600" />;
      case 'Cancelled':
        return <AlertCircle className="w-3.5 h-3.5 mr-1 text-rose-600" />;
      default:
        return null;
    }
  };

  const cancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment reservation?')) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' } : apt))
      );
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
    const matchesSearch = 
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
            <Link to="/patient/appointments" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Appointments</Link>
            <Link to="/patient/book" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Book Visit</Link>
            <Link to="/patient/records" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Medical Records</Link>
            <Link to="/patient/profile" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-medium">Profile</Link>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-6 border-b border-slate-200 text-sm font-medium">
          <Link to="/patient" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Dashboard</Link>
          <Link to="/patient/appointments" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Appointments</Link>
          <Link to="/patient/book" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Book Visit</Link>
          <Link to="/patient/records" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Records</Link>
          <Link to="/patient/profile" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Profile</Link>
        </div>

        {/* Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Appointments & Consultation History
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              View and manage your upcoming consultations, prescriptions, and past medical records.
            </p>
          </div>

          <Link 
            to="/patient/book" 
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Book New Appointment</span>
          </Link>
        </div>

        {/* Search & Filter Tabs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap gap-2">
            {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-xs border border-blue-600'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {status} {status !== 'All' ? `(${appointments.filter(a => a.status === status).length})` : `(${appointments.length})`}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor, specialty, or ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Loading appointments...</span>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No appointments found</h3>
            <p className="text-sm">We couldn't find any appointments matching your selected status filter.</p>
            <button onClick={() => { setFilterStatus('All'); setSearchQuery(''); }} className="mt-2 px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Responsive Table */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="py-4 px-6">ID & Doctor</th>
                    <th className="py-4 px-6">Specialty / Dept</th>
                    <th className="py-4 px-6">Schedule</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-5 px-6">
                        <div className="font-bold text-slate-900 flex items-center space-x-2">
                          <span>{apt.doctorName}</span>
                        </div>
                        <span className="text-xs text-blue-600 font-mono font-medium">{apt.id}</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-semibold text-slate-800 block">{apt.department}</span>
                        <span className="text-xs text-slate-500">{apt.specialty}</span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center space-x-2 text-slate-800 font-medium">
                          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{apt.displayDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{apt.time}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(apt.status)}`}>
                          {getBadgeIcon(apt.status)}
                          <span>{apt.status}</span>
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right space-x-2">
                        {apt.status === 'Confirmed' && (
                          <button 
                            onClick={() => alert(`Launching virtual waiting room for ${apt.doctorName}...`)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all inline-flex items-center space-x-1"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join</span>
                          </button>
                        )}
                        {apt.prescriptionId && (
                          <button 
                            onClick={() => alert(`Downloading Digital Prescription (${apt.prescriptionId})...`)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all inline-flex items-center space-x-1"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span>Prescription</span>
                          </button>
                        )}
                        {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                          <button 
                            onClick={() => cancelAppointment(apt.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Cards */}
            <div className="md:hidden space-y-4">
              {filteredAppointments.map((apt) => (
                <div key={apt.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] text-blue-600 font-mono font-bold block">{apt.id}</span>
                      <h3 className="text-base font-bold text-slate-900">{apt.doctorName}</h3>
                      <span className="text-xs text-slate-500">{apt.specialty} ({apt.department})</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(apt.status)}`}>
                      {getBadgeIcon(apt.status)}
                      <span>{apt.status}</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs">
                    <div className="flex items-center space-x-2 text-slate-800 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Date: {apt.displayDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Slot: {apt.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Mode: {apt.mode}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                    {apt.status === 'Confirmed' && (
                      <button 
                        onClick={() => alert(`Launching virtual room for ${apt.doctorName}...`)}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Video</span>
                      </button>
                    )}
                    {apt.prescriptionId && (
                      <button 
                        onClick={() => alert(`Downloading Prescription (${apt.prescriptionId})...`)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center space-x-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Prescription</span>
                      </button>
                    )}
                    {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                      <button 
                        onClick={() => cancelAppointment(apt.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
