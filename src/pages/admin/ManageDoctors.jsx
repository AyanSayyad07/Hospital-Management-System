import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Stethoscope, 
  Search, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Phone, 
  Mail, 
  X, 
  Save, 
  UserCheck, 
  UserX
} from 'lucide-react';

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New doctor form state for modal
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: 'Senior Specialist',
    department: 'Cardiology',
    contact: '+1 (555) 000-0000',
    email: '',
    status: 'Active',
    fee: '$120'
  });

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const mockDoctors = [
        { id: 'DOC-4091', name: 'Dr. Marcus Vance', specialization: 'Interventional Cardiology Lead', department: 'Cardiology', contact: '+1 (555) 492-8810', email: 'vance@loophospitals.org', status: 'Active', fee: '$120' },
        { id: 'DOC-4092', name: 'Dr. Elena Rostova', specialization: 'Non-Invasive Cardiologist & Echo Specialist', department: 'Cardiology', contact: '+1 (555) 492-8811', email: 'rostova@loophospitals.org', status: 'Active', fee: '$135' },
        { id: 'DOC-3081', name: 'Dr. Arthur Smith', specialization: 'Internal Medicine & Diagnostic OPD', department: 'General Medicine', contact: '+1 (555) 332-9102', email: 'smith@loophospitals.org', status: 'Active', fee: '$80' },
        { id: 'DOC-3085', name: 'Dr. Priya Patel', specialization: 'Preventative Health & Family Medicine', department: 'General Medicine', contact: '+1 (555) 332-9104', email: 'patel@loophospitals.org', status: 'Active', fee: '$90' },
        { id: 'DOC-5012', name: 'Dr. Jonathan Sterling', specialization: 'Consultant Neurologist & Stroke Care', department: 'Neurology', contact: '+1 (555) 662-7719', email: 'sterling@loophospitals.org', status: 'Active', fee: '$160' },
        { id: 'DOC-2044', name: 'Dr. Sarah Jones', specialization: 'Pediatric Specialist & Neonatology', department: 'Pediatrics', contact: '+1 (555) 221-8840', email: 'jones@loophospitals.org', status: 'Inactive', fee: '$95' }
      ];
      setDoctors(mockDoctors);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveDoctor = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the active staff directory?`)) {
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
      setStatusMsg({
        type: 'success',
        text: `${name} has been removed from the directory.`
      });
    }
  };

  const handleToggleStatus = (id) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const newStatus = doc.status === 'Active' ? 'Inactive' : 'Active';
          return { ...doc, status: newStatus };
        }
        return doc;
      })
    );
  };

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();

    if (!newDoctor.name.trim() || !newDoctor.email.trim()) {
      alert('Please enter doctor Name and Email Address.');
      return;
    }

    const createdDoc = {
      ...newDoctor,
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setDoctors((prev) => [createdDoc, ...prev]);
    setIsModalOpen(false);
    setNewDoctor({
      name: '',
      specialization: 'Senior Specialist',
      department: 'Cardiology',
      contact: '+1 (555) 000-0000',
      email: '',
      status: 'Active',
      fee: '$120'
    });

    console.log('📌 MOCK DOCTOR ADDED (Admin Control Panel -> MERN API later):', createdDoc);
    setStatusMsg({
      type: 'success',
      text: `${createdDoc.name} (${createdDoc.id}) registered successfully to ${createdDoc.department} department!`
    });
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = filterDept === 'All' || doc.department === filterDept;
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
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
            <Link to="/admin/doctors" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-xs font-semibold">Manage Doctors</Link>
            <Link to="/admin/patients" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">Manage Patients</Link>
            <Link to="/admin/appointments" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all font-semibold">All Appointments</Link>
          </nav>

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Doctor</span>
            </button>
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
          <Link to="/admin/doctors" className="px-3.5 py-2 rounded-lg bg-blue-600 text-white shrink-0 font-medium">Doctors</Link>
          <Link to="/admin/patients" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Patients</Link>
          <Link to="/admin/appointments" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 shrink-0 font-medium">Appointments</Link>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Manage Doctors & Specialists Directory
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Add, edit, suspend, or remove medical staff and adjust consultation fee parameters across all departments.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Doctor</span>
          </button>
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
            {['All', 'Cardiology', 'General Medicine', 'Neurology', 'Pediatrics'].map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setFilterDept(dept)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  filterDept === dept
                    ? 'bg-blue-600 text-white shadow-xs border border-blue-600'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {dept} ({dept === 'All' ? doctors.length : doctors.filter(d => d.department === dept).length})
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor name, ID, or specialization..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Doctors Table */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Loading active medical staff directory...</span>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No doctors found</h3>
            <p className="text-sm">We couldn't find any medical specialists matching your search or department filter.</p>
            <button onClick={() => { setFilterDept('All'); setSearchQuery(''); }} className="mt-2 px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="py-4 px-6">ID & Name</th>
                    <th className="py-4 px-6">Specialization / Department</th>
                    <th className="py-4 px-6">Contact & Email</th>
                    <th className="py-4 px-6">Consultation Fee</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredDoctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 block">{doc.name}</span>
                        <span className="text-xs text-blue-600 font-mono font-semibold">{doc.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-800 block">{doc.department}</span>
                        <span className="text-xs text-slate-500">{doc.specialization}</span>
                      </td>
                      <td className="py-4 px-6 text-xs space-y-1">
                        <div className="flex items-center space-x-2 text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{doc.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{doc.contact}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-emerald-700">
                        {doc.fee}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(doc.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                            doc.status === 'Active'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                          }`}
                          title="Click to toggle Active / Inactive"
                        >
                          {doc.status === 'Active' ? <UserCheck className="w-3.5 h-3.5 mr-1" /> : <UserX className="w-3.5 h-3.5 mr-1" />}
                          <span>{doc.status}</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => alert(`Editing credentials for ${doc.name}...`)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all inline-flex items-center space-x-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleRemoveDoctor(doc.id, doc.name)}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all inline-flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Doctor Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-50 border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Admin Registration Sheet</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Add New Medical Specialist</h3>
                <p className="text-xs text-slate-500 mt-0.5">Register a new doctor to the active system database.</p>
              </div>

              <form onSubmit={handleAddDoctorSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. John Doe"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Department</label>
                    <select
                      value={newDoctor.department}
                      onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                    >
                      {['Cardiology', 'General Medicine', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Consultation Fee</label>
                    <input
                      type="text"
                      placeholder="$120"
                      value={newDoctor.fee}
                      onChange={(e) => setNewDoctor({ ...newDoctor, fee: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Detailed Specialization *</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior Interventional Cardiologist"
                    value={newDoctor.specialization}
                    onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Staff Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="doctor@loophospitals.org"
                      value={newDoctor.email}
                      onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Contact Number</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={newDoctor.contact}
                      onChange={(e) => setNewDoctor({ ...newDoctor, contact: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                  >
                    Register Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
