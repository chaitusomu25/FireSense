import React, { useState } from 'react';
import { Database, Cpu, Map, BellRing, Flame, Wind, Droplets, Thermometer, CloudRain, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  // Interactive Simulation State (Defaults to Sector 7 Pine Ridge)
  const [temperature, setTemperature] = useState(41.2);
  const [humidity, setHumidity] = useState(14);
  const [windSpeed, setWindSpeed] = useState(28);
  const [rainfall, setRainfall] = useState(0.0);

  // Dynamic AI Risk Score Calculation
  const calculateDynamicRisk = (t: number, h: number, w: number, r: number) => {
    // Basic thermodynamic fire index heuristic
    let score = (t * 1.3) + ((100 - h) * 0.45) + (w * 0.7) - (r * 12);
    score = Math.max(5, Math.min(98, Math.round(score)));
    return score;
  };

  const currentRiskScore = calculateDynamicRisk(temperature, humidity, windSpeed, rainfall);

  const getRiskDetails = (score: number) => {
    if (score >= 80) {
      return {
        level: '🔴 Extreme Risk',
        badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        glow: 'glow-red',
        color: 'text-red-400',
        explanation:
          'Due to high temperature, low humidity, and high wind speed, there is a high probability for ignition and rapid flame propagation within the next 3 hours.',
      };
    } else if (score >= 60) {
      return {
        level: '🟠 High Risk',
        badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
        glow: 'glow-orange',
        color: 'text-orange-400',
        explanation:
          'Elevated temperature and dropping fuel moisture indicate rapid potential spot fires. Sustained wind increases perimeter spread rate.',
      };
    } else if (score >= 30) {
      return {
        level: '🟡 Moderate Risk',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        glow: '',
        color: 'text-amber-300',
        explanation:
          'Moderate fuel dryness detected. Atmospheric conditions remain manageable with baseline firebreak and routine drone patrol vigilance.',
      };
    } else {
      return {
        level: '🟢 Low Risk',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        glow: 'glow-emerald',
        color: 'text-emerald-400',
        explanation:
          'Adequate ground moisture and cool ambient temperatures present minimal ignition danger across the sector.',
      };
    }
  };

  const riskInfo = getRiskDetails(currentRiskScore);

  const resetToPineRidgeDefault = () => {
    setTemperature(41.2);
    setHumidity(14);
    setWindSpeed(28);
    setRainfall(0.0);
  };

  const steps = [
    {
      num: '01',
      title: 'Data Ingestion',
      icon: Database,
      desc: 'Multi-orbit satellite thermal bands (VIIRS/MODIS/Sentinel) + Automated ground weather stations + IoT moisture probes.',
    },
    {
      num: '02',
      title: 'AI Predictive Engine',
      icon: Cpu,
      desc: 'Ensemble neural networks calculate fuel dryness, atmospheric evaporation, and pre-ignition thresholds across 50m² grids.',
    },
    {
      num: '03',
      title: 'Tactical Map HUD',
      icon: Map,
      desc: 'Dynamic color-coded polygon zones (🟢 🟡 🟠 🔴) with real-time vector wind fields and thermal anomaly pins.',
    },
    {
      num: '04',
      title: 'Instant Multi-Channel Alerts',
      icon: BellRing,
      desc: 'Automated SMS, push notifications, and tactical radio dispatch payloads sent to forestry officers and fire stations.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Cpu className="w-3.5 h-3.5" />
            End-to-End Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works &amp; Predictive AI Engine
          </h2>
          <p className="text-slate-300 text-base">
            From raw orbital sensor telemetry to millisecond emergency dispatch — a continuous autonomous loop.
          </p>
        </div>

        {/* 4 Steps Workflow Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                id={`workflow-step-${idx + 1}`}
                className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between group hover:border-orange-500/50 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                      PHASE {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-slate-500 text-xs flex items-center justify-center font-mono">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Example Box: Sample AI Prediction Analysis */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950 border border-orange-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden ring-1 ring-orange-500/20">
          {/* Subtle Ambient Backdrop Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                  LIVE INTERACTIVE AI LAB
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Sample AI Prediction Analysis - Sector 7 (Pine Ridge)
              </h3>
            </div>

            <button
              id="reset-simulation-btn"
              onClick={resetToPineRidgeDefault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
              Reset Sector 7 Baseline
            </button>
          </div>

          {/* Interactive Parameters Sliders & Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Tweakable Sliders */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs text-slate-400 mb-4">
                Adjust the environmental sliders below to simulate how the FireSense neural model evaluates ignition probability in real-time:
              </p>

              {/* Temperature Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-orange-400" /> Ambient Temperature
                  </span>
                  <span className="font-bold text-white">{temperature.toFixed(1)}°C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="48"
                  step="0.2"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Humidity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Relative Humidity
                  </span>
                  <span className="font-bold text-white">{humidity}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={humidity}
                  onChange={(e) => setHumidity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Wind Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-amber-400" /> Wind Velocity
                  </span>
                  <span className="font-bold text-white">{windSpeed} km/h (SSE)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="1"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Rainfall Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" /> 24h Precipitation
                  </span>
                  <span className="font-bold text-white">{rainfall.toFixed(1)} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={rainfall}
                  onChange={(e) => setRainfall(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>
            </div>

            {/* Right: AI Risk Calculation Result Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      Computed Probability
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${riskInfo.badge}`}>
                      {riskInfo.level}
                    </span>
                  </div>

                  {/* Big Number Gauge */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-5xl font-extrabold font-mono tracking-tight ${riskInfo.color}`}>
                      {currentRiskScore}%
                    </span>
                    <span className="text-xs text-slate-400 font-mono">AI Risk Score</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden mb-4 border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentRiskScore >= 80
                          ? 'bg-red-500'
                          : currentRiskScore >= 60
                          ? 'bg-orange-500'
                          : currentRiskScore >= 30
                          ? 'bg-amber-400'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${currentRiskScore}%` }}
                    />
                  </div>
                </div>

                {/* AI Explanation Text Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-orange-400 uppercase font-semibold mb-1 flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-orange-400" />
                    AI Neural Explanation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                    "{riskInfo.explanation}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
