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
      const headerOffset = 75;
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
      const scrollPosition = window.scrollY + 140;

      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', window.location.pathname);
              setActiveSection('');
            }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Loop Hospitals <span className="text-indigo-400 font-medium text-sm sm:text-base hidden sm:inline">| Hospital Management</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-3 text-sm font-medium text-slate-300">
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === 'services'
                  ? 'text-white bg-slate-900 border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Key Services
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === 'about'
                  ? 'text-white bg-slate-900 border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Why Choose Us
            </a>
            <a 
              href="#stats" 
              onClick={(e) => scrollToSection(e, 'stats')}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                activeSection === 'stats'
                  ? 'text-white bg-slate-900 border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Hospital Stats
            </a>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              to="/login" 
              className="hidden sm:inline-flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-1.5 sm:space-x-2"
            >
              <span>Register Patient</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl">
            <div className="flex flex-col space-y-2">
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, 'services')}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === 'services' ? 'text-white bg-slate-900 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                Key Services
              </a>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === 'about' ? 'text-white bg-slate-900 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                Why Choose Us
              </a>
              <a 
                href="#stats" 
                onClick={(e) => scrollToSection(e, 'stats')}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === 'stats' ? 'text-white bg-slate-900 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                Hospital Stats
              </a>
              <div className="pt-2 border-t border-slate-900 flex flex-col space-y-2">
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-center rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 px-4 sm:px-6 lg:px-8">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-indigo-400 text-xs sm:text-sm font-medium mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Next-Gen Healthcare Management System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Advanced Medical Care, <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
              Simplified & Accessible.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Experience seamless hospital workflows, instant online appointment scheduling, real-time OPD tracking, and secure digital health records—all built on a robust, high-speed MERN stack foundation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <span>Book Appointment Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Patient & Staff Login</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 pt-10 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>NABH Certified Hospital</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>100% HIPAA Compliant</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Zero Queue Waiting</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>24/7 Emergency Line</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="services" className="scroll-mt-20 pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-xs sm:text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-2">Our Core Specialties</h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
              Comprehensive Healthcare Services
            </p>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Designed for both patients and healthcare professionals, our portal brings clarity, speed, and precision to medical management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-300 group shadow-lg shadow-black/20 flex flex-col justify-start"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3.5 group-hover:scale-105 group-hover:border-indigo-500/30 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Stats Section */}
      <section id="about" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs sm:text-sm font-medium mb-6">
                <span>Next-Generation Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Built for Speed, Reliability, & Patient Trust.
              </h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                Our Hospital Management System eliminates administrative bottlenecks. Whether booking a routine consultation or admitting an emergency trauma patient, every data point is synchronized instantly across doctors, nurses, laboratories, and pharmacy counters.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mt-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Automated Patient Workflow</h4>
                    <p className="text-sm text-slate-400">From appointment confirmation to discharge summaries, workflow is 100% paperless.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mt-1 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Role-Based Access Control</h4>
                    <p className="text-sm text-slate-400">Dedicated portals with specialized tools for Patients, Doctors, and Administrators.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mt-1 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">World-Class Healthcare Standards</h4>
                    <p className="text-sm text-slate-400">Rigorous medical protocols supported by state-of-the-art diagnostic technology.</p>
                  </div>
                </div>
              </div>

              <Link 
                to="/register" 
                className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white font-medium transition-all"
              >
                <span>Create Your Patient Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Box Grid */}
            <div id="stats" className="scroll-mt-28 grid grid-cols-2 gap-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-rose-600 rounded-3xl blur opacity-20 -z-10" />
              {stats.map((stat, i) => (
                <div key={i} className="bg-slate-950/80 border border-slate-800/80 p-6 sm:p-8 rounded-2xl text-center flex flex-col justify-center items-center">
                  <span className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900 p-8 sm:p-12 lg:p-16 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            Ready to Take Control of Your Healthcare?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 relative z-10">
            Join thousands of satisfied patients and doctors utilizing the fastest and most intuitive healthcare management dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all"
            >
              Get Started as Patient
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-slate-900/90 border border-slate-700 hover:bg-slate-800 transition-all"
            >
              Staff & Doctor Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
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
