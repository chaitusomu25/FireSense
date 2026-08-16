import React from 'react';
import {
  Map,
  ShieldAlert,
  Settings,
  Flame,
  Radio,
  ChevronLeft,
  ChevronRight,
  Activity,
  Layers,
  Satellite,
  Compass,
} from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: 'map' | 'alerts' | 'settings';
  onSelectTab: (tab: 'map' | 'alerts' | 'settings') => void;
  activeAlertsCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
  activeAlertsCount,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    {
      id: 'map' as const,
      label: 'Live Risk Map',
      shortLabel: 'Map HUD',
      icon: Map,
      badge: null,
      description: 'Sector GIS & Polygons',
    },
    {
      id: 'alerts' as const,
      label: 'Alerts & Incident Command',
      shortLabel: 'Alerts',
      icon: ShieldAlert,
      badge: activeAlertsCount > 0 ? activeAlertsCount : null,
      description: 'Deep Telemetry & Dispatch',
    },
    {
      id: 'settings' as const,
      label: 'Profile & Settings',
      shortLabel: 'Config',
      icon: Settings,
      badge: null,
      description: 'Credentials & Sensors',
    },
  ];

  return (
    <aside
      id="dashboard-sidebar"
      className={`bg-slate-950/95 border-r border-slate-800/90 flex flex-col justify-between transition-all duration-300 z-20 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Nav Items */}
      <div className="p-3 space-y-2">
        {/* Collapse toggle button */}
        <div className="flex items-center justify-between px-2 py-2 mb-2 border-b border-slate-800/80">
          {!isCollapsed && (
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              COMMAND TACTICAL OPS
            </span>
          )}
          <button
            id="toggle-sidebar-collapse-btn"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors mx-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/5 text-orange-400 border border-orange-500/40 shadow-lg shadow-orange-950/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                {/* Active left bar indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-500 rounded-r-full" />
                )}

                <div
                  className={`p-2 rounded-lg ${
                    isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-900 text-slate-400 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">{item.label}</span>
                      {item.badge !== null && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500 text-white animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{item.description}</div>
                  </div>
                )}

                {/* Collapsed badge counter */}
                {isCollapsed && item.badge !== null && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-mono font-bold text-white flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Live System Telemetry Card */}
      <div className="p-3 border-t border-slate-800/80">
        {!isCollapsed ? (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-cyan-400" /> VIIRS Feed
              </span>
              <span className="text-emerald-400 font-bold">LOCKED</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" /> Sensor Grid
              </span>
              <span className="text-slate-200">98.4%</span>
            </div>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[98.4%]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Normal" />
          </div>
        )}
      </div>
    </aside>
  );
};
