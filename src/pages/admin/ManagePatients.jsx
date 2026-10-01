import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Users, 
  Search, 
  FileText, 
  UserX, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Calendar, 
  Droplet, 
  Phone, 
  Mail, 
  ShieldAlert
} from 'lucide-react';

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const mockPatients = [
        { id: 'PT-89421', name: 'Sarah Jenkins', age: 32, gender: 'Female', bloodGroup: 'O+', registrationDate: '2025-03-14', displayDate: 'Mar 14, 2025', contact: '+1 (555) 382-9104', email: 'sarah@example.com', status: 'Active', totalVisits: 14 },
        { id: 'PT-44210', name: 'Robert Langdon', age: 54, gender: 'Male', bloodGroup: 'A+', registrationDate: '2024-11-02', displayDate: 'Nov 02, 2024', contact: '+1 (555) 912-8833', email: 'robert@example.com', status: 'Active', totalVisits: 22 },
        { id: 'PT-33019', name: 'Elena Rostova', age: 29, gender: 'Female', bloodGroup: 'B-', registrationDate: '2026-01-19', displayDate: 'Jan 19, 2026', contact: '+1 (555) 774-1290', email: 'elena@example.com', status: 'Active', totalVisits: 4 },
        { id: 'PT-99014', name: 'Arthur Pendelton', age: 67, gender: 'Male', bloodGroup: 'AB+', registrationDate: '2026-05-10', displayDate: 'May 10, 2026', contact: '+1 (555) 663-8821', email: 'arthur@example.com', status: 'Active', totalVisits: 8 },
        { id: 'PT-77120', name: 'Chloe Bennett', age: 41, gender: 'Female', bloodGroup: 'O-', registrationDate: '2025-08-22', displayDate: 'Aug 22, 2025', contact: '+1 (555) 441-9920', email: 'chloe@example.com', status: 'Suspended', totalVisits: 6 },
        { id: 'PT-66311', name: 'Michael Chang', age: 48, gender: 'Male', bloodGroup: 'A-', registrationDate: '2026-06-01', displayDate: 'Jun 01, 2026', contact: '+1 (555) 882-3310', email: 'michael@example.com', status: 'Active', totalVisits: 3 }
      ];
      setPatients(mockPatients);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSuspend = (id, name) => {
    setPatients((prev) =>
      prev.map((pt) => {
        if (pt.id === id) {
          const newStatus = pt.status === 'Active' ? 'Suspended' : 'Active';
          setStatusMsg({
            type: newStatus === 'Suspended' ? 'error' : 'success',
            text: `Patient account for ${name} has been ${newStatus.toLowerCase()}.`
          });
          return { ...pt, status: newStatus };
        }
        return pt;
      })
    );
  };

  const handleViewHistory = (pt) => {
    alert(`MOCK MEDICAL HISTORY LOG for ${pt.name} (${pt.id}):\n\n• Blood Group: ${pt.bloodGroup}\n• Registered: ${pt.displayDate}\n• Total Hospital Visits: ${pt.totalVisits}\n• Account Status: ${pt.status}\n• Contact Email: ${pt.email}`);
  };

  const filteredPatients = patients.filter((pt) => {
    const matchesStatus = filterStatus === 'All' || pt.status === filterStatus;
    const matchesSearch = 
      pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
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
            <Link to="/admin/patients" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Manage Patients</Link>
            <Link to="/admin/appointments" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">All Appointments</Link>
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
          <Link to="/admin/patients" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Patients</Link>
          <Link to="/admin/appointments" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Appointments</Link>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Registered Patients Directory
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Search and manage hospital patient accounts, inspect medical checkup histories, or suspend flagged profiles.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Total Enrolled Patients: {patients.length}</span>
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

        {/* Search & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap gap-2">
            {['All', 'Active', 'Suspended'].map((status) => (
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
                {status} ({status === 'All' ? patients.length : patients.filter(p => p.status === status).length})
              </button>
            ))}
          </div>

          <div className="relative min-w-[300px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient name, ID, blood group, or email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Patients Table */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Loading patient records directory...</span>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
            <p className="text-sm">We couldn't find any patient accounts matching your search query or status filter.</p>
            <button onClick={() => { setFilterStatus('All'); setSearchQuery(''); }} className="mt-2 px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="py-4 px-6">Patient ID & Name</th>
                    <th className="py-4 px-6">Demographics & Blood</th>
                    <th className="py-4 px-6">Registration Date</th>
                    <th className="py-4 px-6">Contact Details</th>
                    <th className="py-4 px-6">Account Status</th>
                    <th className="py-4 px-6 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredPatients.map((pt) => (
                    <tr key={pt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 block">{pt.name}</span>
                        <span className="text-xs text-blue-600 font-mono font-semibold">{pt.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800">{pt.age} yrs • {pt.gender}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                            <Droplet className="w-3 h-3 mr-1 shrink-0" />
                            {pt.bloodGroup}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 block">Total Hospital Visits: {pt.totalVisits}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-1.5 text-slate-700 font-medium">
                          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{pt.displayDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs space-y-1">
                        <div className="flex items-center space-x-2 text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate max-w-[160px]">{pt.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{pt.contact}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                          pt.status === 'Active'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <span>{pt.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleViewHistory(pt)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all inline-flex items-center space-x-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>History</span>
                        </button>
                        <button
                          onClick={() => handleToggleSuspend(pt.id, pt.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all inline-flex items-center space-x-1 ${
                            pt.status === 'Active'
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {pt.status === 'Active' ? (
                            <>
                              <UserX className="w-3.5 h-3.5" />
                              <span>Suspend</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Activate</span>
                            </>
                          )}
                        </button>
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
