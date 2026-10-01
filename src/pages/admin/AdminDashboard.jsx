import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Users, 
  Stethoscope, 
  Calendar, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck,
  Database,
  UserPlus
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setStats([
        { title: 'Total Registered Patients', value: '1,428', change: '+12% vs last month', icon: <Users className="w-6 h-6 text-indigo-400" />, bg: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/30' },
        { title: 'Active Doctors & Specialists', value: '48', change: 'Across 12 Departments', icon: <Stethoscope className="w-6 h-6 text-emerald-400" />, bg: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30' },
        { title: 'Appointments Today', value: '142', change: '+18% vs yesterday', icon: <Calendar className="w-6 h-6 text-purple-400" />, bg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
        { title: 'Total Monthly Revenue', value: '$184,520', change: '+9.4% OPD & Telemedicine', icon: <DollarSign className="w-6 h-6 text-rose-400" />, bg: 'from-rose-500/20 to-rose-500/5', border: 'border-rose-500/30' }
      ]);

      setMonthlyTrends([
        { month: 'May', appointments: 1120, revenue: 142000, height: '60%' },
        { month: 'Jun', appointments: 1250, revenue: 155000, height: '68%' },
        { month: 'Jul', appointments: 1380, revenue: 168000, height: '76%' },
        { month: 'Aug', appointments: 1290, revenue: 159000, height: '71%' },
        { month: 'Sep', appointments: 1450, revenue: 175000, height: '82%' },
        { month: 'Oct', appointments: 1580, revenue: 184520, height: '94%' }
      ]);

      setRecentLogs([
        { id: 1, text: 'New doctor registered: Dr. Elena Rostova (Interventional Cardiology)', time: '12 minutes ago', type: 'doctor', icon: <UserPlus className="w-4 h-4 text-emerald-400" /> },
        { id: 2, text: 'Appointment cancelled: #APT-1098 by Jessica Alba (Rescheduled)', time: '35 minutes ago', type: 'appointment', icon: <AlertCircle className="w-4 h-4 text-amber-400" /> },
        { id: 3, text: 'New patient account created: Arthur Pendelton (ID: PT-99014)', time: '1 hour ago', type: 'patient', icon: <Users className="w-4 h-4 text-indigo-400" /> },
        { id: 4, text: 'MongoDB Database Cluster Replica backup completed successfully', time: '3 hours ago', type: 'system', icon: <Database className="w-4 h-4 text-purple-400" /> },
        { id: 5, text: 'System Security Audit: Zero failed login attempts detected', time: '5 hours ago', type: 'security', icon: <ShieldCheck className="w-4 h-4 text-sky-400" /> }
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
          <p className="text-sm font-medium animate-pulse">Loading Admin System Overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Admin Portal Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">
              Loop Hospitals <span className="text-indigo-400 text-sm font-medium hidden sm:inline">| Admin Control Panel</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-sm font-medium">
            <Link to="/admin" className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md">Dashboard</Link>
            <Link to="/admin/doctors" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Manage Doctors</Link>
            <Link to="/admin/patients" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">Manage Patients</Link>
            <Link to="/admin/appointments" className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all">All Appointments</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-emerald-300">System Online (MERN Core)</span>
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
          <Link to="/admin" className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white shrink-0">Dashboard</Link>
          <Link to="/admin/doctors" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Doctors</Link>
          <Link to="/admin/patients" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Patients</Link>
          <Link to="/admin/appointments" className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">Appointments</Link>
        </div>

        {/* System Overview Header Banner */}
        <div className="relative bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
                <Activity className="w-3.5 h-3.5" />
                <span>Hospital Core Administration Suite v4.2</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                System Overview & Real-Time Metrics
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-xl">
                Monitor overall hospital performance, review active medical departments, and track real-time OPD metrics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              <Link 
                to="/admin/doctors" 
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Doctor</span>
              </Link>
              <Link 
                to="/admin/appointments" 
                className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all"
              >
                View Appointments
              </Link>
            </div>
          </div>
        </div>

        {/* Row of Summary Stat Cards */}
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

        {/* Data Visualization & Recent Logs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Appointment Trends Chart */}
          <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <span>Monthly Appointment & Revenue Trends</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Growth volume comparison across inpatient, OPD, and telemedicine consultations
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  +14.2% Growth Rate
                </span>
              </div>

              {/* Dynamic CSS Bar Visualization */}
              <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-3 px-2 border-b border-slate-800">
                {monthlyTrends.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white whitespace-nowrap shadow-xl z-20 pointer-events-none">
                      <span className="font-bold text-indigo-400">{data.appointments} Visits</span> • ${data.revenue.toLocaleString()}
                    </div>

                    <div className="w-full max-w-[48px] bg-slate-950/80 rounded-xl h-48 flex items-end p-1 border border-slate-800/80 overflow-hidden">
                      <div 
                        style={{ height: data.height }} 
                        className="w-full rounded-lg bg-gradient-to-t from-indigo-600 via-purple-500 to-rose-400 group-hover:brightness-110 transition-all duration-500"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-md bg-indigo-500 inline-block" />
                  <span>Appointments Volume</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-400 inline-block" />
                  <span>Gross Billing Volume</span>
                </span>
              </div>
              <span>Updated automatically via MERN pipeline</span>
            </div>
          </div>

          {/* Recent System Activity List */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-rose-400" />
                  <span>Recent System Activity</span>
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                  Live Feed
                </span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {recentLogs.map((log) => (
                  <div key={log.id} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-200">
                        {log.icon}
                        <span className="capitalize">{log.type} Event</span>
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{log.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{log.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4">
              <button 
                onClick={() => alert('Downloading Comprehensive MongoDB System Audit Logs CSV...')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <span>Download System Audit Logs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
