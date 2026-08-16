import React, { useState } from 'react';
import { Logo } from '../shared/Logo';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Radio, ArrowUp } from 'lucide-react';

interface ContactFooterSectionProps {
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onOpenOfficerPortal: () => void;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({
  onShowToast,
  onOpenOfficerPortal,
}) => {
  const [formData, setFormData] = useState({
    agencyName: '',
    officerName: '',
    email: '',
    sectorJurisdiction: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.agencyName) {
      onShowToast('Please fill out the required agency and email fields.', 'warning');
      return;
    }

    setSubmitted(true);
    onShowToast('Inquiry dispatched to FireSense Emergency Integration Team.', 'success');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-slate-950 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-slate-800/80">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-orange-400 text-xs font-mono font-semibold uppercase">
              <Radio className="w-3.5 h-3.5" />
              Emergency Integration Desk
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connect with FireSense Incident Network
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Equip your regional forestry branch, park rangers, or county fire protection district with our AI predictive telemetry and emergency dispatch pipeline.
            </p>

            <div className="space-y-4 pt-2 text-sm text-slate-300 font-mono">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>dispatch@firesense.forestry.gov</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 555-FIRE-SENSE (24/7 Ops)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Pacific Northwest Regional Command Hub, Sector 4</span>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Emergency Request Received</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    A FireSense Tactical Integration Officer has logged your request and will contact{' '}
                    <span className="text-orange-400 font-mono font-bold">{formData.email}</span> within 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ agencyName: '', officerName: '', email: '', sectorJurisdiction: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                        Agency / Forestry Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        placeholder="e.g. Cascade Range Forestry Service"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                        Officer / Requester Name
                      </label>
                      <input
                        type="text"
                        value={formData.officerName}
                        onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                        placeholder="e.g. Captain Morgan Reed"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                        Official Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="officer@agency.gov"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                        Sector / Jurisdiction
                      </label>
                      <input
                        type="text"
                        value={formData.sectorJurisdiction}
                        onChange={(e) => setFormData({ ...formData, sectorJurisdiction: e.target.value })}
                        placeholder="e.g. Sierra North Foothills (Sector 8)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1">
                      Integration Scope / Priority Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify sensor telemetry needs, satellite pass alerts, or tactical dispatch integration..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hover:from-orange-300 hover:to-amber-300 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send Department Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Links & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Logo size="sm" showTagline={true} />
            <span className="text-xs text-slate-400 font-mono">
              © 2026 FireSense AI Defense Network. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <button
              onClick={() => onShowToast('System Status: 100% All Satellites & Sensors Operational', 'success')}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Status: Online</span>
            </button>
            <button
              onClick={() => onShowToast('Privacy Policy: All satellite data encrypted with AES-256.', 'info')}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onShowToast('Terms of Service: Authorized forestry and emergency personnel use only.', 'info')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={onOpenOfficerPortal}
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Officer Portal
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
