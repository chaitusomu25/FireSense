import React, { useState, useEffect } from 'react';
import { Logo } from '../shared/Logo';
import { OfficerProfile } from '../../types';
import {
  ShieldAlert,
  Clock,
  Volume2,
  VolumeX,
  ExternalLink,
  Flame,
  Radio,
  LogOut,
  ChevronDown,
  Bell,
  Activity,
} from 'lucide-react';

interface DashboardHeaderProps {
  activeTab: 'map' | 'alerts' | 'settings';
  officerProfile: OfficerProfile;
  activeAlertsCount: number;
  criticalAlertTicker: string;
  onNavigateToTab: (tab: 'map' | 'alerts' | 'settings') => void;
  onNavigateToLanding: () => void;
  onLogout: () => void;
  onSelectAlertById?: (alertId: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  officerProfile,
  activeAlertsCount,
  criticalAlertTicker,
  onNavigateToTab,
  onNavigateToLanding,
  onLogout,
  onSelectAlertById,
}) => {
  const [timeUtc, setTimeUtc] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTabLabel = () => {
    switch (activeTab) {
      case 'map':
        return 'LIVE RISK MAP HUD';
      case 'alerts':
        return 'INCIDENT COMMAND & DISPATCH';
      case 'settings':
        return 'OFFICER PROFILE & SYSTEM CONFIG';
      default:
        return 'COMMAND CENTER';
    }
  };

  return (
    <header
      id="dashboard-top-navbar"
      className="h-16 bg-slate-950 border-b border-slate-800/90 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 shadow-lg"
    >
      {/* Left: Brand + Breadcrumb */}
      <div className="flex items-center gap-5">
        <Logo
          size="sm"
          showTagline={false}
          onClick={onNavigateToLanding}
          className="cursor-pointer"
        />

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs font-mono">
          <span className="text-slate-500">SECTOR-COMMAND /</span>
          <span className="text-orange-400 font-bold tracking-wider">{getTabLabel()}</span>
        </div>
      </div>

      {/* Center: Live Alert Ticker & Tactical Threat Level */}
      <div className="hidden lg:flex items-center gap-4 max-w-xl mx-4">
        {/* DEFCON Threat Badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>THREAT: EXTREME (SECTOR 7)</span>
        </div>

        {/* Ticker marquee box */}
        <div
          onClick={() => onNavigateToTab('alerts')}
          className="cursor-pointer flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-colors text-xs font-mono text-slate-300 truncate max-w-md"
        >
          <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0 animate-pulse" />
          <span className="truncate">{criticalAlertTicker}</span>
        </div>
      </div>

      {/* Right Controls: Time, Audio Toggle, Landing Link, Profile */}
      <div className="flex items-center gap-3">
        {/* Tactical Clock */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-slate-200">{timeUtc || 'SYNCING UTC...'}</span>
        </div>

        {/* Audio Alert Toggle */}
        <button
          id="audio-alert-toggle-btn"
          onClick={() => setAudioEnabled(!audioEnabled)}
          title={audioEnabled ? 'Tactical audio siren active' : 'Tactical audio muted'}
          className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
            audioEnabled
              ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Switch to Landing View */}
        <button
          id="header-back-to-landing-btn"
          onClick={onNavigateToLanding}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <span>Public Portal</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        {/* Officer Avatar Dropdown */}
        <div className="relative">
          <button
            id="officer-profile-dropdown-btn"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono font-bold text-xs">
              AV
            </div>
            <div className="hidden sm:block text-left text-xs leading-none">
              <div className="font-bold text-white truncate max-w-[110px]">
                {officerProfile.name.split(' ')[1] || 'Vance'}
              </div>
              <div className="text-[10px] font-mono text-orange-400">{officerProfile.badgeId}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-fadeIn"
            >
              <div className="border-b border-slate-800 pb-3 mb-2 px-2">
                <div className="font-bold text-sm text-white">{officerProfile.name}</div>
                <div className="text-xs font-mono text-orange-400">{officerProfile.rank}</div>
                <div className="text-[11px] text-slate-400 mt-1">{officerProfile.assignedSector}</div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onNavigateToTab('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Officer Preferences &amp; Config
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onNavigateToLanding();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors md:hidden"
                >
                  Switch to Public Landing
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock Terminal / Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
