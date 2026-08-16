import React from 'react';
import { RISK_MATRIX_INFO } from '../../data/mockData';
import { ShieldCheck, AlertTriangle, Flame, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export const RiskMatrixSection: React.FC = () => {
  const getIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'moderate':
        return <Activity className="w-6 h-6 text-amber-400" />;
      case 'high':
        return <AlertTriangle className="w-6 h-6 text-orange-400" />;
      case 'extreme':
        return <Flame className="w-6 h-6 text-red-400 animate-pulse" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-slate-400" />;
    }
  };

  const getBorderColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'hover:border-emerald-500/60 group-hover:shadow-emerald-500/10';
      case 'moderate':
        return 'hover:border-amber-500/60 group-hover:shadow-amber-500/10';
      case 'high':
        return 'hover:border-orange-500/60 group-hover:shadow-orange-500/10';
      case 'extreme':
        return 'border-red-500/40 hover:border-red-500/80 shadow-red-500/15';
      default:
        return 'hover:border-slate-700';
    }
  };

  return (
    <section id="risk-matrix" className="py-20 relative bg-slate-950/60 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Standardized Fire Index
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive AI Risk Matrix Legend
          </h2>
          <p className="text-slate-300 text-base">
            Continuous algorithmic classification calibrated against the Canadian Forest Fire Weather Index (FWI) and live satellite infrared radiometric scans.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RISK_MATRIX_INFO.map((item) => (
            <div
              key={item.level}
              id={`risk-card-${item.level}`}
              className={`group relative rounded-2xl bg-slate-900/90 border border-slate-800/90 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${getBorderColor(
                item.level
              )}`}
            >
              {/* Top Level indicator and icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{item.iconText}</span>
                    <span className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase">
                      {item.scoreRange}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {getIcon(item.level)}
                  </div>
                </div>

                {/* Level Title */}
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{item.name}</span>
                </h3>

                {/* Weather Condition */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">Atmospheric Trigger:</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.weatherCondition}
                  </p>
                </div>
              </div>

              {/* Action protocol footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-orange-400/90 uppercase mb-1">Operational Protocol:</div>
                <p className="text-xs text-slate-400 font-medium">
                  {item.actionRequired}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
