import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  Users, 
  Award,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const services = [
    {
      icon: <Clock className="w-6 h-6 text-rose-500" />,
      title: '24/7 Emergency Care',
      description: 'Immediate trauma support and critical care response with real-time specialist & bed availability tracking around the clock.'
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-indigo-500" />,
      title: 'Expert Specialists',
      description: 'Consult with board-certified physicians, cardiologists, neurologists, and surgeons tailored to your specific health needs.'
    },
    {
      icon: <Calendar className="w-6 h-6 text-emerald-500" />,
      title: 'Instant Online Booking',
      description: 'Schedule outpatient visits, diagnostic appointments, and video consultations in seconds with automated reminders.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-500" />,
      title: 'Digital Health Records',
      description: 'Encrypted, instant, and secure access to your complete medical history, lab diagnostics, and prescription refills.'
    },
    {
      icon: <Activity className="w-6 h-6 text-amber-500" />,
      title: 'Smart Consultation Queue',
      description: 'Live doctor OPD status and intelligent queue monitoring to eliminate waiting room delays and optimize clinic flow.'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-purple-500" />,
      title: 'Integrated Telemedicine',
      description: 'High-definition virtual visits and remote health monitoring powered by our comprehensive MERN stack platform.'
    }
  ];

  const stats = [
    { label: 'Patients Treated Yearly', value: '50,000+' },
    { label: 'Expert Specialist Doctors', value: '140+' },
    { label: 'Patient Satisfaction Rate', value: '99.4%' },
    { label: 'Emergency Support', value: '24/7/365' }
  ];

  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, id) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'about', 'stats'];
      const scrollPosition = window.scrollY + 100;

      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPosition >= top - 20 && scrollPosition < top + height) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', window.location.pathname);
              setActiveSection('');
            }}
            className="flex items-center space-x-3 group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Loop Hospitals <span className="text-blue-600 font-semibold text-sm sm:text-base hidden xl:inline">| Hospital Management</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-2 text-sm font-medium text-slate-600 absolute left-1/2 -translate-x-1/2">
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === 'services'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200/80 shadow-xs font-semibold'
                  : 'hover:text-blue-700 hover:bg-slate-100/80'
              }`}
            >
              Key Services
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === 'about'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200/80 shadow-xs font-semibold'
                  : 'hover:text-blue-700 hover:bg-slate-100/80'
              }`}
            >
              Why Choose Us
            </a>
            <a 
              href="#stats" 
              onClick={(e) => scrollToSection(e, 'stats')}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === 'stats'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200/80 shadow-xs font-semibold'
                  : 'hover:text-blue-700 hover:bg-slate-100/80'
              }`}
            >
              Hospital Stats
            </a>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              to="/login" 
              className="hidden sm:inline-flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200 shadow-xs"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-1.5 sm:space-x-2"
            >
              <span>Register Patient</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white/95 border-b border-slate-200 backdrop-blur-xl shadow-lg">
            <div className="flex flex-col space-y-2">
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, 'services')}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === 'services' ? 'text-blue-700 bg-blue-50 border border-blue-200' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                Key Services
              </a>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === 'about' ? 'text-blue-700 bg-blue-50 border border-blue-200' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                Why Choose Us
              </a>
              <a 
                href="#stats" 
                onClick={(e) => scrollToSection(e, 'stats')}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === 'stats' ? 'text-blue-700 bg-blue-50 border border-blue-200' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                Hospital Stats
              </a>
              <div className="pt-2 border-t border-slate-200 flex flex-col space-y-2">
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-center rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8">
        {/* Soft Decorative Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-300/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-medium mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Next-Gen Healthcare Management System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
            Advanced Medical Care, <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
              Simplified & Accessible.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Experience seamless hospital workflows, instant online appointment scheduling, real-time OPD tracking, and secure digital health records—all built on a robust, high-speed MERN stack foundation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <span>Book Appointment Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Patient & Staff Login</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-600 text-sm font-medium">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>NABH Certified Hospital</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>100% HIPAA Compliant</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Zero Queue Waiting</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>24/7 Emergency Line</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="services" className="scroll-mt-20 py-10 sm:py-14 md:py-16 bg-slate-100/70 border-y border-slate-200 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-xs sm:text-sm font-semibold text-blue-600 tracking-wider uppercase mb-1.5">Our Core Specialties</h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
              Comprehensive Healthcare Services
            </p>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Designed for both patients and healthcare professionals, our portal brings clarity, speed, and precision to medical management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group shadow-xs flex flex-col justify-start"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-blue-100/80 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-6">
                <span>Next-Generation Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Built for Speed, Reliability, & Patient Trust.
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                Our Hospital Management System eliminates administrative bottlenecks. Whether booking a routine consultation or admitting an emergency trauma patient, every data point is synchronized instantly across doctors, nurses, laboratories, and pharmacy counters.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mt-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Automated Patient Workflow</h4>
                    <p className="text-sm text-slate-600">From appointment confirmation to discharge summaries, workflow is 100% paperless.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mt-1 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Role-Based Access Control</h4>
                    <p className="text-sm text-slate-600">Dedicated portals with specialized tools for Patients, Doctors, and Administrators.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mt-1 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">World-Class Healthcare Standards</h4>
                    <p className="text-sm text-slate-600">Rigorous medical protocols supported by state-of-the-art diagnostic technology.</p>
                  </div>
                </div>
              </div>

              <Link 
                to="/register" 
                className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-600/25 transition-all"
              >
                <span>Create Your Patient Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Loop Operations Highlights Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/60 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs relative">
              <div className="flex items-center justify-between pb-5 border-b border-slate-200/80 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                    <HeartPulse className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Loop Care Platform</h4>
                    <span className="text-xs text-slate-500">Live Clinical Operations Node</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
                  Live 24/7
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Avg. Consultation Wait</span>
                      <span className="text-[11px] text-slate-500">Real-time OPD triage & queue</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-blue-600 font-mono">&lt; 4 Mins</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">HIPAA & NABH Tier-4</span>
                      <span className="text-[11px] text-slate-500">End-to-end data encryption</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">100% Secure</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Digital Pharmacy & Labs</span>
                      <span className="text-[11px] text-slate-500">Instant prescription routing</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">Instant Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Stats & Action Section */}
      <section id="stats" className="scroll-mt-20 pt-8 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-xs sm:text-sm font-bold text-blue-600 tracking-wider uppercase mb-1.5">Proven Clinical Impact</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Hospital Performance & Scale
            </p>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Real-time statistics demonstrating our unwavering commitment to compassionate care, clinical excellence, and rapid medical response.
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {stats.map((stat, i) => {
              const isHighlight = stat.label.includes('Satisfaction') || stat.value === '99.4%';
              return (
                <div 
                  key={i} 
                  className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-center flex flex-col justify-center items-center transition-all duration-300 ${
                    isHighlight 
                      ? 'border-2 border-blue-400 shadow-md shadow-blue-500/10' 
                      : 'border border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1.5">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Call to Action Banner */}
          <div className="max-w-4xl mx-auto mt-10 sm:mt-12">
            <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 p-8 sm:p-10 rounded-3xl text-center relative overflow-hidden shadow-xl text-white">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2.5 relative z-10">
                Ready to Take Control of Your Healthcare?
              </h3>
              <p className="text-blue-100 max-w-xl mx-auto text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed relative z-10">
                Join thousands of satisfied patients and doctors utilizing the fastest and most intuitive healthcare management dashboard.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 relative z-10">
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-blue-700 bg-white hover:bg-slate-50 shadow-md transition-all"
                >
                  Get Started as Patient
                </Link>
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-blue-700/80 hover:bg-blue-700 border border-blue-400/40 transition-all"
                >
                  Staff & Doctor Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Loop Hospitals HMS</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="hover:text-white transition-colors">Registration</Link>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-2 text-rose-400 font-semibold">
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Emergency Hotline: 108 / +1 (800) 555-0199</span>
            </div>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Loop Hospitals Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
