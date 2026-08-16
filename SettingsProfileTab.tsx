import React, { useState } from 'react';
import {
  OfficerProfile,
  SystemNotificationSettings,
  SystemDiagnostics,
} from '../../../types';
import {
  User,
  Shield,
  Bell,
  Activity,
  Cpu,
  Save,
  CheckCircle2,
  Radio,
  Sliders,
  Mail,
  Phone,
  BadgeAlert,
  Server,
  RefreshCw,
} from 'lucide-react';

interface SettingsProfileTabProps {
  officerProfile: OfficerProfile;
  notificationSettings: SystemNotificationSettings;
  diagnostics: SystemDiagnostics;
  onUpdateProfile: (profile: OfficerProfile) => void;
  onUpdateSettings: (settings: SystemNotificationSettings) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const SettingsProfileTab: React.FC<SettingsProfileTabProps> = ({
  officerProfile,
  notificationSettings,
  diagnostics,
  onUpdateProfile,
  onUpdateSettings,
  onShowToast,
}) => {
  const [profile, setProfile] = useState<OfficerProfile>(officerProfile);
  const [settings, setSettings] = useState<SystemNotificationSettings>(notificationSettings);
  const [tempTrigger, setTempTrigger] = useState(38.0);
  const [humidityTrigger, setHumidityTrigger] = useState(15);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleSetting = (key: keyof SystemNotificationSettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    onUpdateSettings(updated);
    onShowToast(`Updated preference: ${String(key)}`, 'info');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onUpdateProfile(profile);
      onShowToast('Officer credentials and station base profile saved successfully.', 'success');
    }, 400);
  };

  return (
    <div id="settings-profile-tab" className="h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              OFFICER ADMIN CONSOLE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Officer Profile &amp; System Configuration
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Officer Profile Card & Credentials */}
        <div className="lg:col-span-7 space-y-6">
          {/* Officer Profile Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 p-0.5 shadow-xl">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-1 rounded-md bg-emerald-500 text-slate-950 font-mono text-[9px] font-bold">
                    ON DUTY
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                  <div className="text-xs font-mono text-orange-400 font-semibold">{profile.rank}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{profile.assignedSector}</div>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold">
                  {profile.badgeId}
                </span>
                <div className="text-[10px] font-mono text-slate-500 mt-1">Active Since {profile.joinedYear}</div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Officer Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Badge / Officer ID
                  </label>
                  <input
                    type="text"
                    value={profile.badgeId}
                    onChange={(e) => setProfile({ ...profile, badgeId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono uppercase focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Official Rank &amp; Title
                  </label>
                  <input
                    type="text"
                    value={profile.rank}
                    onChange={(e) => setProfile({ ...profile, rank: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Assigned Forestry Sector
                  </label>
                  <input
                    type="text"
                    value={profile.assignedSector}
                    onChange={(e) => setProfile({ ...profile, assignedSector: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Command Relay Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                    Tactical Phone / Radio Line
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                  Assigned Station Base Hub
                </label>
                <input
                  type="text"
                  value={profile.stationBase}
                  onChange={(e) => setProfile({ ...profile, stationBase: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                id="save-officer-profile-btn"
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-300 hover:to-amber-300 shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Updating Profile...' : 'Save Profile Changes'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Notification Preferences & System Diagnostics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Notification Preferences */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-orange-400" />
              Alert Notification Preferences
            </h3>

            <div className="space-y-3 pt-1">
              {[
                { key: 'smsAlerts' as const, label: 'SMS Emergency Broadcasts', desc: 'Instant text dispatch to field ranger units' },
                { key: 'mobilePush' as const, label: 'Encrypted Mobile Push', desc: 'Real-time incident triggers on mobile app' },
                { key: 'emailBroadcast' as const, label: 'Incident Command Email', desc: 'Automated telemetry logs sent to department' },
                { key: 'audioSiren' as const, label: 'Tactical Audio Siren', desc: 'Audible alarm on Extreme risk status' },
                { key: 'autoDispatchTriggers' as const, label: 'Automated Dispatch Triggers', desc: 'Auto-mobilize Alpha squads if score > 90%' },
                { key: 'droneAutoRecon' as const, label: 'Drone Auto-Reconnaissance', desc: 'Launch aerial cameras on thermal spikes' },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleToggleSetting(item.key)}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
                >
                  <div className="pr-3">
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{item.desc}</div>
                  </div>

                  {/* Toggle Switch */}
                  <div
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${
                      settings[item.key] ? 'bg-orange-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Diagnostics & API Status */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                System Diagnostics &amp; APIs
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ALL SYSTEMS GO
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Weather API Telemetry:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {diagnostics.weatherApiStatus}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Satellite Radiometer:</span>
                <span className="text-cyan-300 font-bold">
                  {diagnostics.satelliteFeedStatus} (VIIRS Pass)
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Sensor Grid Coverage:</span>
                <span className="text-white font-bold">{diagnostics.sensorGridCoverage}% (1,420 Nodes)</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Network Latency:</span>
                <span className="text-amber-400 font-bold">{diagnostics.latencyMs} ms (Edge Relay)</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Annual System Uptime:</span>
                <span className="text-emerald-400 font-bold">{diagnostics.systemUptime}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
