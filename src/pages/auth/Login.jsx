import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient' // Helpful selector for MERN stack roles
  });
  
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status on input
    if (statusMsg.text) setStatusMsg({ type: '', text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setStatusMsg({
        type: 'error',
        text: 'Please enter both your email address and password.'
      });
      return;
    }

    setIsLoading(true);

    // Mock backend API submission
    console.log('====================================');
    console.log('🔐 MOCK LOGIN SUBMISSION (Frontend -> API later):');
    console.log('Credentials logged:', formData);
    console.log('====================================');

    setTimeout(() => {
      setIsLoading(false);
      setStatusMsg({
        type: 'success',
        text: `Logged in as ${formData.role.toUpperCase()}! Credentials logged to console.`
      });

      // Simulate routing based on role after brief delay
      setTimeout(() => {
        if (formData.role === 'admin') navigate('/admin');
        else if (formData.role === 'doctor') navigate('/doctor');
        else navigate('/patient');
      }, 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Navbar Brand link */}
      <div className="w-full max-w-md mb-8 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">MediPulse HMS</span>
        </Link>
        <Link 
          to="/" 
          className="text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">
            Please enter your portal credentials to sign in
          </p>
        </div>

        {/* Status Message Display */}
        {statusMsg.text && (
          <div 
            className={`mb-6 p-4 rounded-xl flex items-start space-x-3 text-sm font-medium border ${
              statusMsg.type === 'error' 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {statusMsg.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role selection tab (convenient for MERN fullstack testing) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Portal Role
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {['patient', 'doctor', 'admin'].map((roleOption) => (
                <button
                  key={roleOption}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: roleOption }))}
                  className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    formData.role === roleOption
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {roleOption}
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-300 block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@hospital.org"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password recovery link sent to email in mock mode.'); }} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge & Register prompt */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted MERN Session Protection</span>
          </div>

          <p className="text-sm text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Register as Patient
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
