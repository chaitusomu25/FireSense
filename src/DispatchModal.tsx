import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { IncidentAlert } from '../../types';
import {
  Send,
  X,
  ShieldAlert,
  Radio,
  MessageSquare,
  BellRing,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface DispatchModalProps {
  alert: IncidentAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDispatch: (alertId: string, units: string[], broadcastChannels: string[]) => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  alert,
  isOpen,
  onClose,
  onConfirmDispatch,
}) => {
  if (!isOpen || !alert) return null;

  const [selectedUnits, setSelectedUnits] = useState<string[]>([
    'Squad Alpha Base (Ready - 3.4km)',
    'Cascade Helitack Water Dropper (Ready - 12km)',
  ]);

  const [channels, setChannels] = useState<{ [key: string]: boolean }>({
    sms: true,
    push: true,
    radio: true,
    siren: false,
  });

  const [customNotes, setCustomNotes] = useState(
    `PRIORITY-1 WILDLAND DISPATCH: ${alert.title}. Severe ignition threat (${alert.riskScore}% Risk). Wind ${alert.weather.windSpeed}km/h ${alert.weather.windDirection}. Deploy water drops at ${alert.prediction.targetLandmark}.`
  );

  const [isSending, setIsSending] = useState(false);

  const toggleUnit = (unitName: string) => {
    if (selectedUnits.includes(unitName)) {
      setSelectedUnits(selectedUnits.filter((u) => u !== unitName));
    } else {
      setSelectedUnits([...selectedUnits, unitName]);
    }
  };

  const handleSend = () => {
    setIsSending(true);

    // Trigger celebratory tactical confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f97316', '#ef4444', '#10b981'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSending(false);
      const activeChannels = Object.keys(channels).filter((k) => channels[k]);
      onConfirmDispatch(alert.id, selectedUnits, activeChannels);
      onClose();
    }, 600);
  };

  const availableSquads = [
    'Squad Alpha Base (Ready - 3.4km)',
    'Cascade Helitack Water Dropper (Ready - 12km)',
    'Central Forestry Station Crew (Standby - 7.8km)',
    'Mobile Tanker Unit 4 (Standby - 4.1km)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        id="incident-dispatch-modal"
        className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden ring-1 ring-orange-500/20 max-h-[90vh] flex flex-col justify-between"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950 border border-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              TACTICAL MOBILIZATION RELAY
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Dispatch Units: {alert.title}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Sector: {alert.sector} • Computed Risk Score: <span className="text-orange-400 font-bold">{alert.riskScore}%</span>
          </p>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Target Squad Units */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
              Select Response Units &amp; Helitack Squads
            </label>
            <div className="space-y-1.5">
              {availableSquads.map((squad) => {
                const isSelected = selectedUnits.includes(squad);
                return (
                  <div
                    key={squad}
                    onClick={() => toggleUnit(squad)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer text-xs font-mono transition-colors ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500/40 text-orange-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-orange-400" />
                      <span>{squad}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-orange-500 border-orange-400 text-slate-950' : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Broadcast Channels Selection */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
              Broadcast Channels
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setChannels({ ...channels, sms: !channels.sms })}
                className={`p-2 rounded-xl border flex items-center gap-1.5 justify-center transition-colors ${
                  channels.sms ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SMS Relay</span>
              </button>

              <button
                type="button"
                onClick={() => setChannels({ ...channels, push: !channels.push })}
                className={`p-2 rounded-xl border flex items-center gap-1.5 justify-center transition-colors ${
                  channels.push ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>App Push</span>
              </button>

              <button
                type="button"
                onClick={() => setChannels({ ...channels, radio: !channels.radio })}
                className={`p-2 rounded-xl border flex items-center gap-1.5 justify-center transition-colors ${
                  channels.radio ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>VHF Radio</span>
              </button>

              <button
                type="button"
                onClick={() => setChannels({ ...channels, siren: !channels.siren })}
                className={`p-2 rounded-xl border flex items-center gap-1.5 justify-center transition-colors ${
                  channels.siren ? 'bg-red-500/15 border-red-500/40 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Civil Siren</span>
              </button>
            </div>
          </div>

          {/* Broadcast Payload Message Preview */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Automated Incident Broadcast Payload
            </label>
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            id="confirm-dispatch-payload-btn"
            disabled={isSending || selectedUnits.length === 0}
            onClick={handleSend}
            className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 hover:from-red-400 hover:to-amber-300 shadow-xl shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSending ? 'Transmitting Multi-Channel Broadcast...' : 'BROADCAST DISPATCH PAYLOAD NOW'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
