import React from 'react';
import {
  Satellite,
  MapPin,
  BellRing,
  Wind,
  Truck,
  Radio,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export const KeyFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Satellite,
      title: 'Real-Time Satellite & Weather Integration',
      description:
        'Continuous ingestion of VIIRS, MODIS, and Sentinel-3 infrared thermal radiometric bands fused with microclimate meteorological sensors.',
      tag: 'Multi-Spectrum Data',
    },
    {
      icon: Layers,
      title: 'Interactive Color-Coded Risk Mapping',
      description:
        'Sectorized polygon overlays with dynamic risk gradations (🟢 Low, 🟡 Moderate, 🟠 High, 🔴 Extreme) reflecting fuel load moisture.',
      tag: 'Vector Cartography',
    },
    {
      icon: BellRing,
      title: 'Multi-Channel Instant Alerts',
      description:
        'Sub-second automated emergency broadcast dispatch via SMS, encrypted mobile push, automated incident command email, and field radio relays.',
      tag: '< 30s Dispatch',
    },
    {
      icon: Wind,
      title: 'Fire Spread & Direction Forecasting',
      description:
        'Predictive fluid mechanics model calculates flame propagation velocity, wind-driven drift vectors, and critical landmark arrival ETA.',
      tag: 'Trajectory AI',
    },
    {
      icon: Truck,
      title: 'Squad Dispatch & Resource Management',
      description:
        'Real-time proximity locator for nearest ready fire stations, helitack airtankers, water reservoirs, and creek hydrant capacities.',
      tag: 'Logistics HUD',
    },
    {
      icon: Radio,
      title: 'Autonomous Drone & IoT Ground Grid',
      description:
        'Acoustic and hygrometric ground nodes trigger autonomous surveillance drone sweeps to visually verify thermal anomalies without human risk.',
      tag: 'Edge Sensor Net',
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Command Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Platform Architecture &amp; Features
          </h2>
          <p className="text-slate-300 text-base">
            Built for forestry departments, emergency responders, and national park services demanding zero-latency situational awareness.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                id={`feature-card-${idx + 1}`}
                className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/90 p-7 flex flex-col justify-between hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-orange-400 group-hover:text-amber-300 group-hover:border-orange-500/40 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/60 flex items-center text-xs font-mono text-orange-400/80 group-hover:text-orange-400 transition-colors">
                  <span>ENTERPRISE SPEC READY</span>
                  <span className="ml-auto text-slate-600 group-hover:text-orange-400">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
