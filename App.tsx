/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  IncidentAlert,
  RiskZone,
  HotspotMarker,
  OfficerProfile,
  SystemNotificationSettings,
  SystemDiagnostics,
} from './types';
import {
  INITIAL_ALERTS,
  MOCK_RISK_ZONES,
  MOCK_HOTSPOTS,
  INITIAL_OFFICER_PROFILE,
  INITIAL_NOTIFICATION_SETTINGS,
  SYSTEM_DIAGNOSTICS_DATA,
} from './data/mockData';

// Landing Page Components
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { RiskMatrixSection } from './components/landing/RiskMatrixSection';
import { WhyFireSenseSection } from './components/landing/WhyFireSenseSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { KeyFeaturesSection } from './components/landing/KeyFeaturesSection';
import { ImpactSection } from './components/landing/ImpactSection';
import { ContactFooterSection } from './components/landing/ContactFooterSection';
import { OfficerLoginModal } from './components/landing/OfficerLoginModal';

// Dashboard Components
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';
import { LiveRiskMapTab } from './components/dashboard/tabs/LiveRiskMapTab';
import { AlertsCommandTab } from './components/dashboard/tabs/AlertsCommandTab';
import { SettingsProfileTab } from './components/dashboard/tabs/SettingsProfileTab';
import { DispatchModal } from './components/dashboard/DispatchModal';

// Shared Components
import { ToastNotification, ToastMessage } from './components/shared/ToastNotification';
import { AtmosphericBackground } from './components/shared/AtmosphericBackground';

export default function App() {
  // Main Navigation View
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardTab, setDashboardTab] = useState<'map' | 'alerts' | 'settings'>('map');

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchTargetAlert, setDispatchTargetAlert] = useState<IncidentAlert | null>(null);

  // App Data & Telemetry State
  const [alerts, setAlerts] = useState<IncidentAlert[]>(INITIAL_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string>(INITIAL_ALERTS[0].id);
  const [officerProfile, setOfficerProfile] = useState<OfficerProfile>(INITIAL_OFFICER_PROFILE);
  const [notificationSettings, setNotificationSettings] = useState<SystemNotificationSettings>(INITIAL_NOTIFICATION_SETTINGS);
  const [diagnostics] = useState<SystemDiagnostics>(SYSTEM_DIAGNOSTICS_DATA);

  // UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      text,
      type,
      timestamp: Date.now(),
    };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch to Dashboard handler
  const handleNavigateToDashboard = (tab: 'map' | 'alerts' | 'settings' = 'map') => {
    setDashboardTab(tab);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login Success handler
  const handleLoginSuccess = (name: string, badgeId: string) => {
    setOfficerProfile((prev) => ({ ...prev, name: name || prev.name, badgeId: badgeId || prev.badgeId }));
    setView('dashboard');
    setDashboardTab('map');
    addToast(`Terminal authenticated: Welcome Commander Vance (${badgeId || 'FS-88392-AP'}).`, 'success');
  };

  // Open Dispatch Modal
  const handleOpenDispatchModal = (alert: IncidentAlert) => {
    setDispatchTargetAlert(alert);
    setIsDispatchModalOpen(true);
  };

  // Confirm Dispatch payload transmission
  const handleConfirmDispatch = (alertId: string, units: string[], broadcastChannels: string[]) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === alertId) {
          return {
            ...a,
            status: 'dispatched',
            dispatchedAt: 'Just now',
            dispatchedUnits: units,
          };
        }
        return a;
      })
    );

    addToast(
      `🚨 EMERGENCY DISPATCH TRANSMITTED: ${units.length} unit(s) mobilized across ${broadcastChannels.join(', ')}.`,
      'success'
    );
  };

  // Select alert from map or header ticker
  const handleSelectAlertFromAnywhere = (alertId: string) => {
    setSelectedAlertId(alertId);
    setDashboardTab('alerts');
    setView('dashboard');
  };

  const activeAlertsCount = alerts.filter((a) => a.status === 'active' || a.status === 'pending').length;
  const criticalAlertTicker = `CRITICAL ALERT #4092: Pine Ridge Sector 7 (89% Extreme Risk) • High Temp 41.2°C • SSE Winds 28 km/h`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500/30 selection:text-orange-200 relative">
      {/* Creative Dynamic Atmospheric Background with Embers & Auroras */}
      <AtmosphericBackground intensity="medium" showParticles={true} />

      {/* LANDING PAGE VIEW */}
      {view === 'landing' ? (
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <LandingNavbar
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onNavigateToDashboard={() => handleNavigateToDashboard('map')}
            onNavigateToLiveMap={() => handleNavigateToDashboard('map')}
          />

          {/* Main Landing Content */}
          <main className="flex-1">
            {/* 1. Hero Section */}
            <LandingHero
              onExploreLiveMonitoring={() => handleNavigateToDashboard('map')}
              onOpenOfficerPortal={() => setIsLoginModalOpen(true)}
            />

            {/* 2. Risk Matrix Legend Section */}
            <RiskMatrixSection />

            {/* 3. Why FireSense Section */}
            <WhyFireSenseSection />

            {/* 4. How It Works & AI Prediction Section (with interactive Pine Ridge box) */}
            <HowItWorksSection />

            {/* 5. Key Features Section */}
            <KeyFeaturesSection />

            {/* 6. Impact & Outcomes Section */}
            <ImpactSection />

            {/* 7. Contact & Footer Section */}
            <ContactFooterSection
              onShowToast={addToast}
              onOpenOfficerPortal={() => setIsLoginModalOpen(true)}
            />
          </main>
        </div>
      ) : (
        /* OFFICER ADMIN DASHBOARD VIEW */
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Dashboard Header Bar */}
          <DashboardHeader
            activeTab={dashboardTab}
            officerProfile={officerProfile}
            activeAlertsCount={activeAlertsCount}
            criticalAlertTicker={criticalAlertTicker}
            onNavigateToTab={(tab) => setDashboardTab(tab)}
            onNavigateToLanding={() => setView('landing')}
            onLogout={() => {
              setView('landing');
              addToast('Officer session logged out.', 'info');
            }}
            onSelectAlertById={handleSelectAlertFromAnywhere}
          />

          {/* Dashboard Workspace */}
          <div className="flex flex-1 overflow-hidden">
            {/* Collapsible Sidebar */}
            <DashboardSidebar
              activeTab={dashboardTab}
              onSelectTab={(tab) => setDashboardTab(tab)}
              activeAlertsCount={activeAlertsCount}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Dynamic Workspace Tab Content */}
            <main className="flex-1 overflow-hidden relative">
              {dashboardTab === 'map' && (
                <LiveRiskMapTab
                  riskZones={MOCK_RISK_ZONES}
                  hotspots={MOCK_HOTSPOTS}
                  alerts={alerts}
                  onOpenDispatchModal={handleOpenDispatchModal}
                  onSelectAlert={handleSelectAlertFromAnywhere}
                />
              )}

              {dashboardTab === 'alerts' && (
                <AlertsCommandTab
                  alerts={alerts}
                  selectedAlertId={selectedAlertId}
                  onSelectAlert={(id) => setSelectedAlertId(id)}
                  onOpenDispatchModal={handleOpenDispatchModal}
                  onShowToast={addToast}
                />
              )}

              {dashboardTab === 'settings' && (
                <SettingsProfileTab
                  officerProfile={officerProfile}
                  notificationSettings={notificationSettings}
                  diagnostics={diagnostics}
                  onUpdateProfile={(p) => setOfficerProfile(p)}
                  onUpdateSettings={(s) => setNotificationSettings(s)}
                  onShowToast={addToast}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Officer Login Modal */}
      <OfficerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Emergency Incident Dispatch Modal */}
      <DispatchModal
        alert={dispatchTargetAlert}
        isOpen={isDispatchModalOpen}
        onClose={() => {
          setIsDispatchModalOpen(false);
          setDispatchTargetAlert(null);
        }}
        onConfirmDispatch={handleConfirmDispatch}
      />

      {/* Global Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
