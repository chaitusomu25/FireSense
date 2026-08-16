import React, { useState } from 'react';
import {
  IncidentAlert,
  AlertStatus,
  RiskLevel,
} from '../../../types';
import {
  ShieldAlert,
  Flame,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  Compass,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Radio,
  Search,
  ChevronRight,
  Truck,
  Sparkles,
  AlertTriangle,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface AlertsCommandTabProps {
  alerts: IncidentAlert[];
  selectedAlertId: string;
  onSelectAlert: (id: string) => void;
  onOpenDispatchModal: (alert: IncidentAlert) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AlertsCommandTab: React.FC<AlertsCommandTabProps> = ({
  alerts,
  selectedAlertId,
  onSelectAlert,
  onOpenDispatchModal,
  onShowToast,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'dispatched'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.alertNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Selected Alert object
  const activeAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  const getRiskBadge = (level: RiskLevel, score: number) => {
    switch (level) {
      case 'extreme':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            EXTREME ({score}%)
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            HIGH ({score}%)
          </span>
        );
      case 'moderate':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            MODERATE ({score}%)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            LOW ({score}%)
          </span>
        );
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            🔴 Active
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            🟡 Pending
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            🟢 Dispatched
          </span>
        );
    }
  };

  return (
    <div id="alerts-incident-command-tab" className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden bg-slate-950">
      {/* LEFT PANEL: Alert List (Categorized + Filter Tabs) */}
      <div className="w-full lg:w-[420px] shrink-0 border-r border-slate-800 flex flex-col bg-slate-950/80">
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-400" />
              <h2 className="text-base font-bold text-white">Incident Queue</h2>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              {filteredAlerts.length} Recorded
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alert ID, sector, ridge..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500 font-mono transition-colors"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => setStatusFilter('all')}
              className={`py-1 rounded-lg text-center transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`py-1 rounded-lg text-center transition-colors cursor-pointer ${
                statusFilter === 'active' ? 'bg-red-950/80 text-red-300 font-bold border border-red-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔴 Active
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`py-1 rounded-lg text-center transition-colors cursor-pointer ${
                statusFilter === 'pending' ? 'bg-amber-950/80 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🟡 Pending
            </button>
            <button
              onClick={() => setStatusFilter('dispatched')}
              className={`py-1 rounded-lg text-center transition-colors cursor-pointer ${
                statusFilter === 'dispatched' ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🟢 Sent
            </button>
          </div>
        </div>

        {/* Alerts Scrollable List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              No incident alerts found for current criteria.
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const isSelected = alert.id === activeAlert?.id;
              return (
                <div
                  key={alert.id}
                  id={`alert-card-${alert.id}`}
                  onClick={() => onSelectAlert(alert.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-slate-900 border-orange-500/60 shadow-lg shadow-orange-950/40'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {/* Top line badges */}
                  <div className="flex items-center justify-between mb-2">
                    {getRiskBadge(alert.riskLevel, alert.riskScore)}
                    {getStatusBadge(alert.status)}
                  </div>

                  {/* Title & Sector */}
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-orange-400 transition-colors flex items-center justify-between">
                    <span>{alert.title}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform ${isSelected ? 'text-orange-400 translate-x-0.5' : ''}`} />
                  </h3>

                  {/* Timestamp & reported info */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {alert.timestamp}
                    </span>
                    <span className="text-slate-300 font-semibold">{alert.weather.temperature}°C | {alert.weather.humidity}% RH</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Comprehensive Alert Detail Inspection View */}
      {activeAlert && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Incident Summary Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                    TACTICAL INCIDENT LOG {activeAlert.alertNumber}
                  </span>
                  {getRiskBadge(activeAlert.riskLevel, activeAlert.riskScore)}
                  {getStatusBadge(activeAlert.status)}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeAlert.title}
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Coords: {activeAlert.coordinates[0]}, {activeAlert.coordinates[1]}</span>
                  <span>• Elevation: {activeAlert.elevationMeters}m MSL</span>
                </p>
              </div>

              {/* Action: SEND EMERGENCY ALERT / DISPATCH Button */}
              <button
                id="deep-inspect-dispatch-btn"
                onClick={() => onOpenDispatchModal(activeAlert)}
                className={`px-5 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0 ${
                  activeAlert.status === 'dispatched'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 shadow-orange-500/20'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {activeAlert.status === 'dispatched'
                    ? 'RE-BROADCAST DISPATCH PAYLOAD'
                    : 'SEND EMERGENCY ALERT / DISPATCH'}
                </span>
              </button>
            </div>

            {/* AI Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-orange-500/30 text-xs text-slate-200 leading-relaxed font-sans">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-orange-400 uppercase mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                AI Ensemble Threat Evaluation
              </div>
              <p className="italic">"{activeAlert.aiSummary}"</p>
            </div>
          </div>

          {/* 1. Live Weather Conditions Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                1. Live Microclimate &amp; Atmospheric Conditions
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">Live Station Node #074</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Temp */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Temperature</span>
                  <Thermometer className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {activeAlert.weather.temperature}°C
                </div>
                <div className="text-[10px] text-red-400 font-mono">High Thermal Load</div>
              </div>

              {/* Humidity */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Relative Humidity</span>
                  <Droplets className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {activeAlert.weather.humidity}%
                </div>
                <div className="text-[10px] text-amber-400 font-mono">Critical Dry Fuel</div>
              </div>

              {/* Wind Speed & Dir */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Wind Velocity</span>
                  <Wind className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {activeAlert.weather.windSpeed} <span className="text-sm font-normal text-slate-400">km/h</span>
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                  Vector: {activeAlert.weather.windDirection} ({activeAlert.weather.windDegrees}°)
                </div>
              </div>

              {/* Rainfall */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Precipitation (24h)</span>
                  <CloudRain className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {activeAlert.weather.rainfall.toFixed(1)} <span className="text-sm font-normal text-slate-400">mm</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Zero Ground Relief</div>
              </div>
            </div>
          </div>

          {/* 2. Predicted Fire Spread Direction Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                2. Predicted Fire Spread Direction &amp; Trajectory
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                PROPAGATION: {activeAlert.prediction.propagationRisk.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Visual Compass Graphic */}
              <div className="md:col-span-4 flex items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="relative w-36 h-36 rounded-full border border-slate-700 flex items-center justify-center">
                  {/* Cardinal Points */}
                  <span className="absolute top-1 text-[10px] font-mono font-bold text-slate-400">N</span>
                  <span className="absolute bottom-1 text-[10px] font-mono font-bold text-slate-400">S</span>
                  <span className="absolute left-1 text-[10px] font-mono font-bold text-slate-400">W</span>
                  <span className="absolute right-1 text-[10px] font-mono font-bold text-slate-400">E</span>

                  {/* Spread Arrow Vector */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ transform: `rotate(${activeAlert.weather.windDegrees - 180}deg)` }}
                  >
                    <div className="w-1.5 h-16 bg-gradient-to-t from-transparent via-orange-500 to-red-500 rounded-full" />
                    <div className="absolute -top-1 w-3 h-3 border-t-2 border-r-2 border-red-400 transform -rotate-45" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,1)]" />
                  </div>
                </div>
              </div>

              {/* Trajectory Details */}
              <div className="md:col-span-8 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[10px] uppercase mb-1">Spread Trajectory Vector</div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <ArrowUpRight className="w-4 h-4 text-orange-400" />
                    <span>{activeAlert.prediction.directionText}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Spread Velocity</div>
                    <div className="text-white font-bold">{activeAlert.prediction.speedKmh} km/h</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">ETA Landmark</div>
                    <div className="text-amber-400 font-bold">{activeAlert.prediction.hoursToCriticalBoundary} hrs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Projected Area</div>
                    <div className="text-red-400 font-bold">{activeAlert.prediction.projectedAreaHectares} ha</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 & 4. Proximity Logistics: Nearest Stations & Water Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3. Nearest Fire Stations & Bases */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                3. Nearest Fire Stations &amp; Bases
              </h3>

              <div className="space-y-3">
                {activeAlert.nearestStations.map((station) => (
                  <div
                    key={station.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{station.name}</span>
                        <span
                          className={`px-1.5 py-0.2 text-[9px] font-mono rounded font-semibold ${
                            station.status === 'Ready'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : station.status === 'Deployed'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {station.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Distance: <span className="text-white font-bold">{station.distanceKm} km away</span> • {station.personnelCount} Crew
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1 truncate max-w-xs">
                        Radio: {station.contactRadio}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Nearest Water Resources */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                4. Nearest Water Resources &amp; Reservoirs
              </h3>

              <div className="space-y-3">
                {activeAlert.nearestWaterSources.map((water) => (
                  <div
                    key={water.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{water.name}</span>
                        <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          {water.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {water.distanceKm} km {water.direction} • Capacity: <span className="text-cyan-400 font-bold">{water.capacityPercent}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        Flow: {water.flowRate} • Heli-Bucket: {water.heliBucketAccessible ? '✅ Yes' : '❌ No'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
