import React, { useState, useEffect } from 'react';
import { Logo } from '../shared/Logo';
import { ShieldAlert, Radio, Menu, X, ArrowRight, Activity } from 'lucide-react';

interface LandingNavbarProps {
  onOpenLoginModal: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLiveMap: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onOpenLoginModal,
  onNavigateToDashboard,
  onNavigateToLiveMap,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why FireSense', href: '#why-firesense' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Risk Matrix', href: '#risk-matrix' },
    { name: 'Features', href: '#features' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="landing-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <Logo
              size="md"
              showTagline={true}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Live Telemetry Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>SATELLITE ORBIT SYNC: VIIRS ACTIVE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-live-monitoring-btn"
              onClick={onNavigateToLiveMap}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Live Map HUD</span>
            </button>

            <button
              id="nav-officer-login-btn"
              onClick={onOpenLoginModal}
              className="px-4 py-2 text-xs font-bold rounded-lg text-slate-900 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hover:from-orange-300 hover:to-amber-300 shadow-md shadow-orange-500/20 border border-orange-300/40 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <ShieldAlert className="w-4 h-4 text-slate-950" />
              <span>Officer Login</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-officer-login-cta"
              onClick={onOpenLoginModal}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg text-slate-900 bg-orange-400 flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Portal</span>
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800/80 bg-slate-950/95 rounded-2xl px-4 shadow-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-orange-400 hover:bg-slate-900/60 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToLiveMap();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg text-slate-200 bg-slate-800 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Explore Live Monitoring</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLoginModal();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-bold rounded-lg text-slate-950 bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Officer Portal Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
