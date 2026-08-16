import React, { useState } from 'react';
import { ShieldAlert, X, Lock, Mail, BadgeAlert, ArrowRight, Sparkles, KeyRound } from 'lucide-react';
import { Logo } from '../shared/Logo';

interface OfficerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (officerName: string, badgeId: string) => void;
}

export const OfficerLoginModal: React.FC<OfficerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('a.vance@forestry.firesense.gov');
  const [badgeId, setBadgeId] = useState('FS-88392-AP');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Commander Alex Vance', badgeId || 'FS-88392-AP');
      onClose();
    }, 600);
  };

  const handleDemoFill = (type: 'vance' | 'ranger') => {
    if (type === 'vance') {
      setEmail('a.vance@forestry.firesense.gov');
      setBadgeId('FS-88392-AP');
      setPassword('secureCommand2026');
    } else {
      setEmail('r.hayes@ranger.firesense.gov');
      setBadgeId('FS-44109-RG');
      setPassword('rangerFieldKey');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Card */}
      <div
        id="officer-login-modal"
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden ring-1 ring-orange-500/20"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="close-login-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              AUTHORIZED PERSONNEL ONLY
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Officer Incident Portal</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access real-time sector risk matrix, incident command dispatch, and live thermal telemetry.
          </p>
        </div>

        {/* Quick Demo Pre-fills */}
        <div className="mb-5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Demo Accounts:
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => handleDemoFill('vance')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-orange-400 border border-slate-700 hover:border-orange-500/40 transition-colors"
            >
              Commander Vance
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('ranger')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-emerald-400 border border-slate-700 hover:border-emerald-500/40 transition-colors"
            >
              Field Ranger
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Official Gov / Forestry Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@forestry.firesense.gov"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 font-mono transition-colors"
              />
            </div>
          </div>

          {/* Badge ID */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Badge / Officer ID
            </label>
            <div className="relative">
              <BadgeAlert className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                placeholder="FS-88392-AP"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 font-mono uppercase tracking-wider transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Command Cryptographic Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 font-mono transition-colors"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-orange-500 focus:ring-0"
              />
              <span>Remember tactical terminal</span>
            </label>
            <span className="text-orange-400/80 hover:text-orange-400 cursor-pointer">
              Forgot PIN?
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="login-to-dashboard-btn"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hover:from-orange-300 hover:to-amber-300 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                Authenticating Credentials...
              </span>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-slate-950" />
                <span>Login to Officer Dashboard</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-5 text-center text-[11px] font-mono text-slate-500">
          Connected to Secure Gov Encrypted Relay v4.9
        </div>
      </div>
    </div>
  );
};
