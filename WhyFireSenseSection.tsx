import React from 'react';
import { Clock, EyeOff, BrainCircuit, ShieldAlert, Cpu, Sparkles, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';

export const WhyFireSenseSection: React.FC = () => {
  return (
    <section id="why-firesense" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            Paradigms Shift
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why FireSense vs. Traditional Detection
          </h2>
          <p className="text-slate-300 text-base">
            Moving wildfire defense from reactive firefighting after smoke plumes appear, to proactive pre-ignition suppression before ignition occurs.
          </p>
        </div>

        {/* 3-Card Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: The Problem */}
          <div
            id="why-card-problem"
            className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-red-900/30 p-8 shadow-xl hover:border-red-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                  THE CRITICAL LIMITATION
                </span>
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/40 text-red-400 group-hover:scale-110 transition-transform">
                  <AlertOctagon className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Delayed Reactive Detection
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Traditional observation relies on lookout towers, public 911 calls, or visual smoke cameras. By the time visual smoke breaks through the canopy, the blaze has already consumed hectares and gained catastrophic momentum.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-red-300/80 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span> Average discovery lag: 45–90 minutes
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">✕</span> Zero microclimate predictive vectors
              </div>
            </div>
          </div>

          {/* Card 2: The Solution */}
          <div
            id="why-card-solution"
            className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-900/40 p-8 shadow-xl hover:border-cyan-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  THE CORE SOLUTION
                </span>
                <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Autonomous Predictive AI
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Continuous ingestion of multi-orbit satellites (VIIRS, MODIS, Sentinel), automated ground IoT hygrometers, and live thermodynamic forecast models. Machine learning synthesizes fuel dryness and thermal anomalies continuously.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-cyan-300/80 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Multi-spectral IR radiometric mapping
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Automated 15-minute sync refresh rate
              </div>
            </div>
          </div>

          {/* Card 3: The Advantage */}
          <div
            id="why-card-advantage"
            className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-orange-500/40 p-8 shadow-xl hover:border-orange-500/80 transition-all group flex flex-col justify-between ring-1 ring-orange-500/20"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  STRATEGIC ADVANTAGE
                </span>
                <div className="p-3 rounded-xl bg-orange-950/60 border border-orange-700/50 text-orange-400 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Pre-Ignition Lead Time
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Commanders receive tactical pre-warning hours before ignition threshold. Incident teams can pre-position air tankers, wet vulnerable perimeters, and dispatch ground crews before flame propagation starts.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-orange-300/90 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Up to 3.5 hours proactive lead time
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Rapid multi-channel broadcast dispatch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
