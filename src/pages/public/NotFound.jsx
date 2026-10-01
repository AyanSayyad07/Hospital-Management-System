import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, AlertTriangle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans text-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Logo */}
      <div className="mb-8 relative z-10">
        <Link to="/" className="inline-flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Loop Hospitals HMS</span>
        </Link>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6 text-rose-400 animate-pulse">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-6xl sm:text-8xl font-black tracking-tight bg-gradient-to-tr from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The requested medical page, patient portal, or resource link does not exist or has been moved to another location within the hospital network.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-sm transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
