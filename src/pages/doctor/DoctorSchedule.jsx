import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  LogOut, 
  User, 
  FileText, 
  Video, 
  MapPin
} from 'lucide-react';

export default function DoctorSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const weeklyData = [
        { id: 'APT-1092', patientName: 'Sarah Jenkins', age: 32, gender: 'Female', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '10:30 AM', status: 'Confirmed', mode: 'Virtual Video Room', reason: 'Post-op Cardiac Checkup' },
        { id: 'APT-1093', patientName: 'Robert Langdon', age: 54, gender: 'Male', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '11:15 AM', status: 'Confirmed', mode: 'In-Person Suite 402', reason: 'Chest Discomfort & ECG Review' },
        { id: 'APT-1094', patientName: 'Elena Rostova', age: 29, gender: 'Female', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '02:00 PM', status: 'Pending', mode: 'In-Person Suite 402', reason: 'Annual Cardiology Screening' },
        { id: 'APT-1095', patientName: 'Arthur Pendelton', age: 67, gender: 'Male', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '03:30 PM', status: 'Confirmed', mode: 'Virtual Video Room', reason: 'Hypertension Refill' },
        { id: 'APT-1096', patientName: 'Chloe Bennett', age: 41, gender: 'Female', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '04:30 PM', status: 'Completed', mode: 'In-Person Suite 402', reason: 'Arrhythmia Follow-up' },
        { id: 'APT-1097', patientName: 'Michael Chang', age: 48, gender: 'Male', date: '2026-10-15', displayDate: 'Oct 15, 2026', time: '09:30 AM', status: 'Confirmed', mode: 'In-Person Suite 402', reason: 'Post Heart Attack Rehabilitation Check' },
        { id: 'APT-1098', patientName: 'Jessica Alba', age: 35, gender: 'Female', date: '2026-10-15', displayDate: 'Oct 15, 2026', time: '11:00 AM', status: 'Cancelled', mode: 'Virtual Video Room', reason: 'Palpitations (Patient Rescheduled)' },
        { id: 'APT-1099', patientName: 'David Vance', age: 62, gender: 'Male', date: '2026-10-16', displayDate: 'Oct 16, 2026', time: '10:00 AM', status: 'Confirmed', mode: 'In-Person Suite 402', reason: 'Angioplasty Follow-up & Stent Check' },
        { id: 'APT-1100', patientName: 'Maria Garcia', age: 51, gender: 'Female', date: '2026-10-17', displayDate: 'Oct 17, 2026', time: '02:30 PM', status: 'Pending', mode: 'Virtual Video Room', reason: 'Second Opinion on Mitral Valve' }
      ];
      setAppointments(weeklyData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400 font-bold';
      case 'Completed':
        return 'bg-slate-800 border-slate-700 text-slate-400 font-semibold';
      case 'Pending':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold';
      case 'Cancelled':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400 font-medium';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const filteredAndSortedAppointments = appointments
    .filter((apt) => {
      const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
      const matchesSearch = 
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'date') {
        valA = new Date(`${a.date} ${a.time}`);
        valB = new Date(`${b.date} ${b.time}`);
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

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
            <Link to="/doctor/schedule" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">My Schedule</Link>
            <Link to="/doctor/consultation/APT-1092" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Live Consultation</Link>
            <Link to="/doctor/profile" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Profile & Settings</Link>
          </nav>

          <div className="flex items-center space-x-3">
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
          <Link to="/doctor/schedule" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Schedule</Link>
          <Link to="/doctor/consultation/APT-1092" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Consultation</Link>
          <Link to="/doctor/profile" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Profile</Link>
        </div>

        {/* Title & Weekly Summary Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Weekly Consultation Schedule
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review and sort your upcoming patient roster, check appointment reasons, and initiate live consultations.
            </p>
          </div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold text-indigo-300">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Week of Oct 14 - Oct 20, 2026</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex flex-wrap gap-2">
            {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  filterStatus === status
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500'
                    : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {status} ({status === 'All' ? appointments.length : appointments.filter(a => a.status === status).length})
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient name, ID, or symptoms..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-slate-400">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Loading weekly schedule...</span>
          </div>
        ) : filteredAndSortedAppointments.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No appointments found</h3>
            <p className="text-sm">We couldn't find any appointments matching your search or status filter.</p>
            <button onClick={() => { setFilterStatus('All'); setSearchQuery(''); }} className="mt-2 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700">
              Reset Filters
            </button>
          </div>
        ) : (
          /* Sortable Weekly Schedule Table */
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-semibold select-none">
                    <th 
                      onClick={() => toggleSort('date')} 
                      className="py-4 px-6 cursor-pointer hover:text-white transition-colors flex items-center space-x-1.5"
                    >
                      <span>Date & Time</span>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </th>
                    <th 
                      onClick={() => toggleSort('patientName')} 
                      className="py-4 px-6 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1.5">
                        <span>Patient Demographics</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="py-4 px-6">Chief Complaint / Reason</th>
                    <th className="py-4 px-6">Mode</th>
                    <th 
                      onClick={() => toggleSort('status')} 
                      className="py-4 px-6 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-1.5">
                        <span>Status</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredAndSortedAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <span>{apt.displayDate}</span>
                        </div>
                        <span className="text-xs text-indigo-400 font-mono font-semibold block">{apt.time} ({apt.id})</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-100 block">{apt.patientName}</span>
                        <span className="text-xs text-slate-400">{apt.age} yrs • {apt.gender}</span>
                      </td>
                      <td className="py-4 px-6 max-w-sm text-slate-300 font-medium">
                        {apt.reason}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        <span className="flex items-center space-x-1.5">
                          {apt.mode.includes('Virtual') ? <Video className="w-3.5 h-3.5 text-purple-400 shrink-0" /> : <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          <span>{apt.mode}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusBadgeStyle(apt.status)}`}>
                          {apt.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                          <span>{apt.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/doctor/consultation/${apt.id}`}
                          className={`inline-flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                            apt.status === 'Completed'
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                              : apt.status === 'Cancelled'
                              ? 'bg-slate-900 text-slate-500 border border-slate-800 pointer-events-none'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                          }`}
                        >
                          <span>
                            {apt.status === 'Completed' 
                              ? 'View Summary' 
                              : apt.status === 'Cancelled' 
                              ? 'Cancelled' 
                              : 'Start Consultation'}
                          </span>
                          {apt.status !== 'Cancelled' && <ArrowRight className="w-3.5 h-3.5" />}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
