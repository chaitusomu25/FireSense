import React from 'react';
import { ShieldAlert, Compass, Flame, Satellite, ArrowRight, Zap, Radio, Thermometer, Wind } from 'lucide-react';

interface LandingHeroProps {
  onExploreLiveMonitoring: () => void;
  onOpenOfficerPortal: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onExploreLiveMonitoring,
  onOpenOfficerPortal,
}) => {
  return (
    <section id="hero-section" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(249,115,22,0.12),rgba(2,6,23,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Mission Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide shadow-lg shadow-orange-950/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="uppercase tracking-widest text-[11px] font-mono font-bold text-slate-200">
                PREDICT • PREVENT • PROTECT
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400">AI Next-Gen Forestry Defense</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              AI-Powered Forest Fire{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400">
                Early Warning &amp; Prevention
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Synthesizing real-time NASA/ESA satellite infrared telemetry, ground IoT sensors, and predictive atmospheric machine learning to identify pre-ignition risks hours before flames appear.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-explore-live-monitoring"
                onClick={onExploreLiveMonitoring}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 hover:from-orange-400 hover:to-amber-300 shadow-lg shadow-orange-500/25 border border-amber-300/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-950" />
                <span>Explore Live Monitoring</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                id="hero-officer-portal-btn"
                onClick={onOpenOfficerPortal}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-orange-500/50 shadow-md transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-orange-400" />
                <span>Officer Command Portal</span>
              </button>
            </div>

            {/* Live Stats Micro Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-bold font-mono text-white">
                  3.2<span className="text-orange-400 text-base font-normal">hrs</span>
                </div>
                <div className="text-xs text-slate-400">Pre-Ignition Lead Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">99.4%</div>
                <div className="text-xs text-slate-400">Hotspot Verification</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-amber-400">&lt; 30s</div>
                <div className="text-xs text-slate-400">Dispatch Broadcast</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Tactical Radar & Map Element */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing Outer Rings */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-orange-600/20 via-slate-900 to-emerald-500/10 blur-xl opacity-75" />

              {/* Main Radar Card */}
              <div className="relative rounded-2xl bg-slate-900/95 border border-slate-800 p-5 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Header info bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                      RADAR MATRIX: PACIFIC NORTHWEST
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    LIVE STREAM
                  </span>
                </div>

                {/* Tactical Radar Display Canvas */}
                <div className="relative aspect-square w-full rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                  {/* Concentric distance circles */}
                  <div className="absolute inset-4 rounded-full border border-slate-800/80" />
                  <div className="absolute inset-12 rounded-full border border-slate-800/70" />
                  <div className="absolute inset-24 rounded-full border border-slate-800/50" />
                  <div className="absolute inset-36 rounded-full border border-orange-500/20" />

                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-slate-800/80" />
                    <div className="h-full w-px bg-slate-800/80 absolute" />
                  </div>

                  {/* Rotating Radar Sweep beam */}
                  <div className="absolute inset-0 animate-radar pointer-events-none">
                    <div
                      className="w-1/2 h-1/2 origin-bottom-right"
                      style={{
                        background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.45) 0%, rgba(249, 115, 22, 0) 70%)',
                      }}
                    />
                  </div>

                  {/* Active Hotspot 1 (Extreme - Sector 7) */}
                  <div className="absolute top-[28%] right-[26%] flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-red-500 opacity-80" />
                      <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-red-200 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,1)]">
                        <Flame className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 font-mono text-[9px] font-bold border border-red-500/50 shadow-md">
                      SECTOR 7 (89% RISK)
                    </span>
                  </div>

                  {/* Active Hotspot 2 (High - Sector 3) */}
                  <div className="absolute bottom-[32%] left-[24%] flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-orange-500 opacity-60" />
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-200 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.8)]">
                        <Flame className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-orange-950/90 text-orange-300 font-mono text-[9px] font-semibold border border-orange-500/40">
                      SECTOR 3 (74%)
                    </span>
                  </div>

                  {/* Moderate Hotspot 3 */}
                  <div className="absolute bottom-[22%] right-[38%] flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-200" />
                    <span className="mt-1 px-1 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-[8px]">
                      SECTOR 12 (48%)
                    </span>
                  </div>

                  {/* Center Radar Node */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.9)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>

                  {/* Bearing labels */}
                  <span className="absolute top-2 font-mono text-[10px] text-slate-500 font-bold">N 000°</span>
                  <span className="absolute bottom-2 font-mono text-[10px] text-slate-500 font-bold">S 180°</span>
                  <span className="absolute left-2 font-mono text-[10px] text-slate-500 font-bold">W 270°</span>
                  <span className="absolute right-2 font-mono text-[10px] text-slate-500 font-bold">E 090°</span>
                </div>

                {/* Telemetry Footer inside Hero Card */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">Crest Peak Temp</div>
                      <div className="text-slate-200 font-bold">41.2°C (Critical)</div>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">Wind Vector</div>
                      <div className="text-slate-200 font-bold">28 km/h SSE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
