import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  LogOut, 
  User, 
  Stethoscope, 
  MapPin, 
  Video, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDept, setFilterDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const mockAppointments = [
        { id: 'APT-1092', patientName: 'Sarah Jenkins', patientId: 'PT-89421', doctorName: 'Dr. Marcus Vance', doctorId: 'DOC-4091', department: 'Cardiology', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '10:30 AM', status: 'Confirmed', mode: 'Virtual Video Room', reason: 'Post-op Cardiac Checkup' },
        { id: 'APT-1093', patientName: 'Robert Langdon', patientId: 'PT-44210', doctorName: 'Dr. Marcus Vance', doctorId: 'DOC-4091', department: 'Cardiology', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '11:15 AM', status: 'Confirmed', mode: 'In-Person Suite 402', reason: 'Severe Chest Discomfort & Palpitations' },
        { id: 'APT-1094', patientName: 'Elena Rostova', patientId: 'PT-33019', doctorName: 'Dr. Marcus Vance', doctorId: 'DOC-4091', department: 'Cardiology', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '02:00 PM', status: 'Pending', mode: 'In-Person Suite 402', reason: 'Annual Cardiology Screening' },
        { id: 'APT-1095', patientName: 'Arthur Pendelton', patientId: 'PT-99014', doctorName: 'Dr. Arthur Smith', doctorId: 'DOC-3081', department: 'General Medicine', date: '2026-10-14', displayDate: 'Oct 14, 2026', time: '03:30 PM', status: 'Confirmed', mode: 'Virtual Video Room', reason: 'Hypertension Refill & Holter Monitor Review' },
        { id: 'APT-1096', patientName: 'Chloe Bennett', patientId: 'PT-77120', doctorName: 'Dr. Jonathan Sterling', doctorId: 'DOC-5012', department: 'Neurology', date: '2026-10-15', displayDate: 'Oct 15, 2026', time: '09:00 AM', status: 'Completed', mode: 'In-Person Suite 105', reason: 'Migraine Assessment & MRI Review' },
        { id: 'APT-1097', patientName: 'Michael Chang', patientId: 'PT-66311', doctorName: 'Dr. Priya Patel', doctorId: 'DOC-3085', department: 'General Medicine', date: '2026-10-15', displayDate: 'Oct 15, 2026', time: '11:30 AM', status: 'Pending', mode: 'Virtual Video Room', reason: 'Seasonal Fever & Blood Panel Check' },
        { id: 'APT-1098', patientName: 'Jessica Alba', patientId: 'PT-55102', doctorName: 'Dr. Elena Rostova', doctorId: 'DOC-4092', department: 'Cardiology', date: '2026-10-16', displayDate: 'Oct 16, 2026', time: '02:30 PM', status: 'Cancelled', mode: 'Virtual Video Room', reason: 'Palpitations (Patient Rescheduled)' },
        { id: 'APT-1099', patientName: 'David Vance', patientId: 'PT-11204', doctorName: 'Dr. Arthur Smith', doctorId: 'DOC-3081', department: 'General Medicine', date: '2026-10-17', displayDate: 'Oct 17, 2026', time: '10:00 AM', status: 'Confirmed', mode: 'In-Person Suite 201', reason: 'Routine Diabetic Blood Sugar Evaluation' }
      ];
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAdminCancelAppointment = (id, patientName, doctorName) => {
    if (window.confirm(`Admin override: Are you sure you want to manually CANCEL appointment ${id} between ${patientName} and ${doctorName}?`)) {
      setAppointments((prev) =>
        prev.map((apt) => {
          if (apt.id === id) {
            return { ...apt, status: 'Cancelled' };
          }
          return apt;
        })
      );
      console.log(`❌ MOCK APPOINTMENT CANCELLED BY ADMIN (${id}):`, { patientName, doctorName });
      setStatusMsg({
        type: 'success',
        text: `Appointment ${id} has been manually cancelled. Notifications sent to ${patientName} and ${doctorName}.`
      });
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold';
      case 'Completed':
        return 'bg-slate-100 border-slate-200 text-slate-600 font-semibold';
      case 'Pending':
        return 'bg-amber-50 border-amber-200 text-amber-700 font-bold';
      case 'Cancelled':
        return 'bg-rose-50 border-rose-200 text-rose-700 font-medium';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
    const matchesDept = filterDept === 'All' || apt.department === filterDept;
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* Admin Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between relative">
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
              Loop Hospitals <span className="text-blue-600 text-sm font-medium hidden xl:inline">| Admin Control Panel</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            <Link to="/admin" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Dashboard</Link>
            <Link to="/admin/doctors" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Manage Doctors</Link>
            <Link to="/admin/patients" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Manage Patients</Link>
            <Link to="/admin/appointments" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">All Appointments</Link>
          </nav>

          <div className="flex items-center space-x-3 ml-auto">
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
          <Link to="/admin" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Dashboard</Link>
          <Link to="/admin/doctors" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Doctors</Link>
          <Link to="/admin/patients" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Patients</Link>
          <Link to="/admin/appointments" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Appointments</Link>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master System Appointments Log
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Oversee hospital-wide schedule coordination, filter consultations across departments, and override cancellations.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-blue-700 shadow-xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Total System Appointments: {appointments.length}</span>
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
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Dropdown / Tabs */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-600 font-semibold flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Status:</span>
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs"
              >
                <option value="All">All Statuses ({appointments.length})</option>
                <option value="Confirmed">Confirmed ({appointments.filter(a => a.status === 'Confirmed').length})</option>
                <option value="Pending">Pending ({appointments.filter(a => a.status === 'Pending').length})</option>
                <option value="Completed">Completed ({appointments.filter(a => a.status === 'Completed').length})</option>
                <option value="Cancelled">Cancelled ({appointments.filter(a => a.status === 'Cancelled').length})</option>
              </select>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* Department Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-600 font-semibold">Dept:</span>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs"
              >
                <option value="All">All Departments</option>
                <option value="Cardiology">Cardiology</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Neurology">Neurology</option>
              </select>
            </div>
          </div>

          <div className="relative min-w-[300px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, doctor, ID, or reason..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Appointments Table */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Loading master hospital appointments table...</span>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No appointments found</h3>
            <p className="text-sm">No appointments match the selected status dropdown and search filters.</p>
            <button onClick={() => { setFilterStatus('All'); setFilterDept('All'); setSearchQuery(''); }} className="mt-2 px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="py-4 px-6">ID & Schedule</th>
                    <th className="py-4 px-6">Patient Demographics</th>
                    <th className="py-4 px-6">Assigned Doctor & Dept</th>
                    <th className="py-4 px-6">Chief Complaint / Mode</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 block">{apt.displayDate}</span>
                        <span className="text-xs text-blue-600 font-mono font-semibold">{apt.time} ({apt.id})</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{apt.patientName}</span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{apt.patientId}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{apt.doctorName}</span>
                        </div>
                        <span className="text-xs text-blue-600 font-semibold block">{apt.department}</span>
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-xs text-slate-700 font-medium truncate" title={apt.reason}>{apt.reason}</p>
                        <span className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                          {apt.mode.includes('Virtual') ? <Video className="w-3 h-3 text-indigo-600 shrink-0" /> : <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />}
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
                        {apt.status === 'Confirmed' || apt.status === 'Pending' ? (
                          <button
                            type="button"
                            onClick={() => handleAdminCancelAppointment(apt.id, apt.patientName, apt.doctorName)}
                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all inline-flex items-center space-x-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold italic">
                            {apt.status === 'Completed' ? 'Archived' : 'Cancelled'}
                          </span>
                        )}
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
