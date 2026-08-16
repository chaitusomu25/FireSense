import React from 'react';
import { Clock, Trees, HeartHandshake, Zap, Award, Sparkles } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const impacts = [
    {
      stat: '85%',
      suffix: 'FASTER',
      title: 'Alert Response Time',
      desc: 'Accelerates ignition detection from 75 minutes down to under 12 minutes through predictive neural radiometric models.',
      icon: Clock,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/10',
    },
    {
      stat: '140k+',
      suffix: 'HECTARES',
      title: 'Forest Preserved',
      desc: 'Significant reduction in mega-fire propagation through early containment barriers and rapid squad deployment.',
      icon: Trees,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10',
    },
    {
      stat: '94%',
      suffix: 'ECO-SAFETY',
      title: 'Wildlife Habitat Protection',
      desc: 'Critical old-growth canopies and endangered animal corridors safeguarded through precision containment vectors.',
      icon: HeartHandshake,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10',
    },
    {
      stat: '< 30s',
      suffix: 'ZERO-DELAY',
      title: 'Emergency Dispatch Relay',
      desc: 'Multi-channel broadcast instantaneously mobilizes local squads, municipal crews, and air helitankers simultaneously.',
      icon: Zap,
      color: 'text-orange-400',
      bgGlow: 'from-orange-500/10',
    },
  ];

  return (
    <section id="impact" className="py-24 relative bg-slate-950 border-t border-b border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-emerald-400 text-xs font-mono font-semibold uppercase">
            <Award className="w-3.5 h-3.5" />
            Field Validated Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Measurable Conservation &amp; Response Impact
          </h2>
          <p className="text-slate-300 text-base">
            Quantifiable results deployed across federal forestry jurisdictions and emergency management agencies.
          </p>
        </div>

        {/* 4 Big Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                id={`impact-card-${idx + 1}`}
                className={`relative rounded-2xl bg-gradient-to-b ${item.bgGlow} to-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 uppercase">
                      {item.suffix}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight mb-2 ${item.color}`}>
                    {item.stat}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Verified Operational Metric</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
