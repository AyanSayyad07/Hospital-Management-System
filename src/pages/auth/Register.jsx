import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, User, Mail, Lock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: 'unspecified'
  });

  const [validationError, setValidationError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      setValidationError('Please fill out all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match. Please re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    // Mock API Registration
    console.log('====================================');
    console.log('📋 MOCK PATIENT REGISTRATION SUBMITTED:');
    console.log('Payload:', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      role: 'patient',
      timestamp: new Date().toISOString()
    });
    console.log('====================================');

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Registration successful! Redirecting to patient login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/3 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Brand Header */}
      <div className="w-full max-w-lg mb-6 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">Loop Hospitals HMS</span>
        </Link>
        <Link 
          to="/" 
          className="text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <span>Patient Portal Registration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
            Create Your Account
          </h1>
          <p className="text-slate-400 text-sm">
            Register to book appointments, manage prescriptions, and view health records
          </p>
        </div>

        {/* Error Alert */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-sm text-rose-300 font-medium animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-3 text-sm text-emerald-300 font-medium animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-300 block">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-300 block">
              Email Address <span className="text-rose-400">*</span>
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
                placeholder="patient@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Password & Confirm Password Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-slate-300 block">
                Password <span className="text-rose-400">*</span>
              </label>
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
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300 block">
                Confirm Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 mt-6"
          >
            {isSubmitting ? (
              <span>Creating Patient Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security / Terms */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>By registering, you consent to secure digital medical data storage</span>
          </div>

          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
