import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  RiskZone,
  HotspotMarker,
  IncidentAlert,
  RiskLevel,
} from '../../../types';
import {
  Layers,
  Wind,
  Flame,
  Shield,
  Droplets,
  Radio,
  Eye,
  EyeOff,
  Compass,
  AlertTriangle,
  Send,
  Sparkles,
  Thermometer,
  Trees,
  Globe,
  Map as MapIcon,
  Mountain,
  Satellite,
  Crosshair,
  Maximize2,
  Minimize2,
  Navigation,
  Activity,
  LocateFixed,
} from 'lucide-react';

interface LiveRiskMapTabProps {
  riskZones: RiskZone[];
  hotspots: HotspotMarker[];
  alerts: IncidentAlert[];
  onOpenDispatchModal: (alert: IncidentAlert) => void;
  onSelectAlert: (alertId: string) => void;
}

type BasemapType = 'satellite' | 'hybrid' | 'topo' | 'dark';

interface RealRegion {
  id: string;
  name: string;
  state: string;
  coords: [number, number];
  zoom: number;
  threatLevel: string;
}

const REAL_REGIONS: RealRegion[] = [
  {
    id: 'deschutes',
    name: 'Deschutes Forest & Pine Ridge',
    state: 'Oregon, USA',
    coords: [44.168, -121.745],
    zoom: 12,
    threatLevel: '89% Extreme',
  },
  {
    id: 'tahoe',
    name: 'Tahoe & Sierra Nevada Range',
    state: 'California, USA',
    coords: [39.0968, -120.0324],
    zoom: 12,
    threatLevel: '74% High',
  },
  {
    id: 'yosemite',
    name: 'Stanislaus & Yosemite Basin',
    state: 'California, USA',
    coords: [37.8651, -119.5383],
    zoom: 12,
    threatLevel: '58% Moderate',
  },
  {
    id: 'bitterroot',
    name: 'Bitterroot Forest & Salmon Range',
    state: 'Montana, USA',
    coords: [46.0682, -114.3411],
    zoom: 11,
    threatLevel: '62% Moderate',
  },
  {
    id: 'bluemountains',
    name: 'Blue Mountains National Range',
    state: 'New South Wales, AU',
    coords: [-33.7152, 150.3114],
    zoom: 12,
    threatLevel: '82% High',
  },
];

export const LiveRiskMapTab: React.FC<LiveRiskMapTabProps> = ({
  riskZones,
  hotspots,
  alerts,
  onOpenDispatchModal,
  onSelectAlert,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Basemap style state
  const [currentBasemap, setCurrentBasemap] = useState<BasemapType>('satellite');
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);

  // Region State
  const [selectedRegion, setSelectedRegion] = useState<string>('deschutes');

  // Tactical Layers Toggle State
  const [showRiskPolygons, setShowRiskPolygons] = useState(true);
  const [showThermalHotspots, setShowThermalHotspots] = useState(true);
  const [showWindVectors, setShowWindVectors] = useState(true);
  const [showFireBases, setShowFireBases] = useState(true);
  const [showWaterSources, setShowWaterSources] = useState(true);
  const [showSatelliteOrbit, setShowSatelliteOrbit] = useState(true);

  // Inspector & Scan state
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(riskZones[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotMarker | null>(null);
  const [customScanPoint, setCustomScanPoint] = useState<{
    lat: number;
    lng: number;
    elevation: number;
    fuelDryness: number;
    slope: number;
  } | null>(null);

  // Live Cursor GPS Readout
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({
    lat: 44.168,
    lng: -121.745,
  });

  // Layer groups references
  const polygonLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const hotspotLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const basesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const waterLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const windLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const orbitLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const scanMarkerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Real World Initial Center: Deschutes National Forest / Three Sisters Range
    const map = L.map(mapContainerRef.current, {
      center: [44.168, -121.745],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
      maxZoom: 18,
      minZoom: 3,
    });

    // Add Standard Scale Bar (Metric & Imperial)
    L.control
      .scale({
        imperial: true,
        metric: true,
        position: 'bottomleft',
        maxWidth: 160,
      })
      .addTo(map);

    // Zoom Control in Bottom Right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Create Layer Groups
    polygonLayerGroupRef.current = L.layerGroup().addTo(map);
    hotspotLayerGroupRef.current = L.layerGroup().addTo(map);
    basesLayerGroupRef.current = L.layerGroup().addTo(map);
    waterLayerGroupRef.current = L.layerGroup().addTo(map);
    windLayerGroupRef.current = L.layerGroup().addTo(map);
    orbitLayerGroupRef.current = L.layerGroup().addTo(map);
    scanMarkerGroupRef.current = L.layerGroup().addTo(map);

    // Mouse Move Event for Real Cursor Coordinates
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorCoords({
        lat: parseFloat(e.latlng.lat.toFixed(5)),
        lng: parseFloat(e.latlng.lng.toFixed(5)),
      });
    });

    // Map Click Handler for Real Coordinate Micro-Climate Scanner
    map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(5));
      const lng = parseFloat(e.latlng.lng.toFixed(5));

      // Calculate realistic synthetic elevation & fuel metrics based on position
      const elevation = Math.round(900 + Math.abs(Math.sin(lat * 10) * 1200));
      const fuelDryness = Math.round(75 + Math.abs(Math.cos(lng * 10) * 20));
      const slope = Math.round(12 + Math.abs(Math.sin((lat + lng) * 8) * 22));

      setCustomScanPoint({
        lat,
        lng,
        elevation,
        fuelDryness,
        slope,
      });

      // Clear previous scan marker and draw tactical target ring
      if (scanMarkerGroupRef.current) {
        scanMarkerGroupRef.current.clearLayers();

        const scanIcon = L.divIcon({
          className: 'custom-scan-ping',
          html: `
            <div class="relative flex items-center justify-center pointer-events-none">
              <span class="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-orange-400/60"></span>
              <div class="w-8 h-8 rounded-full border-2 border-dashed border-orange-400 animate-spin"></div>
              <div class="absolute w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker([lat, lng], { icon: scanIcon }).addTo(scanMarkerGroupRef.current);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap Layer whenever currentBasemap changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }
    if (labelsLayerRef.current) {
      map.removeLayer(labelsLayerRef.current);
      labelsLayerRef.current = null;
    }

    let url = '';
    let attribution = '';
    let maxZoom = 18;

    switch (currentBasemap) {
      case 'satellite':
        // ESRI High-Resolution World Imagery
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        break;

      case 'hybrid':
        // ESRI Satellite with Place Names & Borders
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        // Add separate labels overlay
        labelsLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 19, opacity: 0.9 }
        ).addTo(map);
        break;

      case 'topo':
        // ESRI World Topographic Map (shows real elevation relief and forest boundaries)
        url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
        attribution = 'Tiles © Esri — National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC';
        break;

      case 'dark':
        // CartoDB Dark Matter
        url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        attribution = '&copy; <a href="https://carto.com/">CARTO</a>';
        break;
    }

    const newTileLayer = L.tileLayer(url, {
      maxZoom: maxZoom,
      subdomains: 'abcd',
      attribution: attribution,
    }).addTo(map);

    // Send tile layer to back so vectors stay on top
    newTileLayer.bringToBack();
    tileLayerRef.current = newTileLayer;
  }, [currentBasemap]);

  // Handle Region Flying
  const handleFlyToRegion = (region: RealRegion) => {
    setSelectedRegion(region.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(region.coords, region.zoom, {
        duration: 1.8,
        easeLinearity: 0.25,
      });
    }
  };

  // Update Polygon Risk Zones on Map
  useEffect(() => {
    if (!mapInstanceRef.current || !polygonLayerGroupRef.current) return;
    polygonLayerGroupRef.current.clearLayers();

    if (!showRiskPolygons) return;

    riskZones.forEach((zone) => {
      let fillColor = '#10b981'; // green
      let borderColor = '#059669';
      let className = 'risk-zone-low';

      if (zone.riskLevel === 'extreme') {
        fillColor = '#ef4444';
        borderColor = '#dc2626';
        className = 'risk-zone-extreme animate-pulse-slow';
      } else if (zone.riskLevel === 'high') {
        fillColor = '#f97316';
        borderColor = '#ea580c';
        className = 'risk-zone-high';
      } else if (zone.riskLevel === 'moderate') {
        fillColor = '#eab308';
        borderColor = '#ca8a04';
        className = 'risk-zone-moderate';
      }

      const polygon = L.polygon(zone.coordinates as [number, number][], {
        color: borderColor,
        fillColor: fillColor,
        fillOpacity: zone.riskLevel === 'extreme' ? 0.4 : 0.25,
        weight: zone.riskLevel === 'extreme' ? 2.5 : 1.8,
        dashArray: zone.riskLevel === 'extreme' ? '4, 4' : undefined,
        className: className,
      });

      polygon.on('click', () => {
        setSelectedZone(zone);
        setSelectedHotspot(null);
      });

      // Interactive Tooltip
      polygon.bindTooltip(
        `<div class="p-1 font-mono text-xs font-bold text-white">
          <span class="text-orange-400 font-bold">${zone.sectorCode}</span>: ${zone.name}
          <div class="text-[10px] text-slate-300 font-normal">Risk Index: <b class="text-white">${zone.riskScore}% (${zone.riskLevel.toUpperCase()})</b></div>
        </div>`,
        { permanent: false, direction: 'center', className: 'custom-leaflet-tooltip' }
      );

      polygon.addTo(polygonLayerGroupRef.current!);
    });
  }, [riskZones, showRiskPolygons]);

  // Update Hotspot Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !hotspotLayerGroupRef.current) return;
    hotspotLayerGroupRef.current.clearLayers();

    if (!showThermalHotspots) return;

    hotspots.forEach((hs) => {
      const isExtreme = hs.riskLevel === 'extreme';
      const isHigh = hs.riskLevel === 'high';

      const customIcon = L.divIcon({
        className: 'custom-hotspot-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full ${
              isExtreme ? 'bg-red-500/80' : isHigh ? 'bg-orange-500/70' : 'bg-amber-400/60'
            }"></span>
            <div class="relative z-10 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-xl ${
              isExtreme ? 'bg-red-600' : isHigh ? 'bg-orange-500' : 'bg-amber-500'
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
            </div>
            <span class="absolute -bottom-5 px-1.5 py-0.5 rounded bg-slate-950/90 text-white font-mono text-[9px] font-bold border border-slate-700 whitespace-nowrap shadow-lg">
              ${hs.thermalReadingC}°C
            </span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(hs.coordinates, { icon: customIcon });

      marker.on('click', () => {
        setSelectedHotspot(hs);
        const matchingZone = riskZones.find((z) => hs.sector.includes(z.sectorCode));
        if (matchingZone) setSelectedZone(matchingZone);
      });

      marker.addTo(hotspotLayerGroupRef.current!);
    });
  }, [hotspots, showThermalHotspots, riskZones]);

  // Update Fire Stations Base Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !basesLayerGroupRef.current) return;
    basesLayerGroupRef.current.clearLayers();

    if (!showFireBases) return;

    const bases = [
      { name: 'Squad Alpha Station', coords: [44.175, -121.750] as [number, number], status: 'Ready', crew: '18 Rangers' },
      { name: 'Central Forestry Depot', coords: [44.150, -121.820] as [number, number], status: 'Standby', crew: '24 Firefighters' },
      { name: 'Cascade Helitack Wing', coords: [44.210, -121.800] as [number, number], status: 'Ready', crew: '2 Sikorsky S-70' },
    ];

    bases.forEach((base) => {
      const baseIcon = L.divIcon({
        className: 'custom-base-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer">
            <div class="w-6 h-6 rounded-lg bg-blue-600 border border-blue-200 shadow-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <span class="absolute -bottom-4 px-1 py-0.2 rounded bg-slate-900/90 text-blue-300 font-mono text-[8px] whitespace-nowrap border border-blue-500/30">
              ${base.name.split(' ')[0]}
            </span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker(base.coords, { icon: baseIcon })
        .bindTooltip(`<div class="font-mono text-xs text-white"><b>${base.name}</b><br>Status: <span class="text-emerald-400 font-bold">${base.status}</span><br>Strength: ${base.crew}</div>`)
        .addTo(basesLayerGroupRef.current!);
    });
  }, [showFireBases]);

  // Update Water Sources Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !waterLayerGroupRef.current) return;
    waterLayerGroupRef.current.clearLayers();

    if (!showWaterSources) return;

    const waters = [
      { name: 'Lake Serene Reservoir', coords: [44.195, -121.730] as [number, number], cap: '85%', type: 'Deep Basin' },
      { name: 'Pine Creek Standpipe', coords: [44.160, -121.720] as [number, number], cap: 'High Flow', type: 'Hydrant Relay' },
      { name: 'Valley Gulch Tank', coords: [44.140, -121.800] as [number, number], cap: '90%', type: '10,000 Gallon Cistern' },
    ];

    waters.forEach((w) => {
      const waterIcon = L.divIcon({
        className: 'custom-water-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer">
            <div class="w-5 h-5 rounded-full bg-cyan-500 border border-cyan-100 shadow-md flex items-center justify-center text-slate-950">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            </div>
            <span class="absolute -bottom-4 px-1 py-0.2 rounded bg-slate-900/90 text-cyan-300 font-mono text-[8px] whitespace-nowrap border border-cyan-500/30">
              ${w.name.split(' ')[0]}
            </span>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker(w.coords, { icon: waterIcon })
        .bindTooltip(`<div class="font-mono text-xs text-white"><b>${w.name}</b><br>Capacity: <span class="text-cyan-300 font-bold">${w.cap}</span><br>Type: ${w.type}</div>`)
        .addTo(waterLayerGroupRef.current!);
    });
  }, [showWaterSources]);

  // Update Wind Vector Flow Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !windLayerGroupRef.current) return;
    windLayerGroupRef.current.clearLayers();

    if (!showWindVectors) return;

    const windNodes = [
      [44.190, -121.710],
      [44.170, -121.730],
      [44.150, -121.770],
      [44.130, -121.750],
      [44.210, -121.770],
      [44.165, -121.810],
    ];

    windNodes.forEach((coords) => {
      const windIcon = L.divIcon({
        className: 'custom-wind-pin',
        html: `
          <div class="flex items-center gap-1 opacity-80 pointer-events-none filter drop-shadow" style="transform: rotate(335deg);">
            <div class="w-9 h-0.5 bg-cyan-300"></div>
            <div class="w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-200 transform rotate-45"></div>
          </div>
        `,
        iconSize: [40, 10],
        iconAnchor: [20, 5],
      });

      L.marker(coords as [number, number], { icon: windIcon }).addTo(windLayerGroupRef.current!);
    });
  }, [showWindVectors]);

  // Update Satellite Orbital Path
  useEffect(() => {
    if (!mapInstanceRef.current || !orbitLayerGroupRef.current) return;
    orbitLayerGroupRef.current.clearLayers();

    if (!showSatelliteOrbit) return;

    // Draw real simulated satellite track path across current view
    const orbitPoints: [number, number][] = [
      [44.30, -121.60],
      [44.22, -121.70],
      [44.14, -121.80],
      [44.06, -121.90],
    ];

    const polyline = L.polyline(orbitPoints, {
      color: '#38bdf8',
      weight: 1.5,
      dashArray: '6, 6',
      opacity: 0.7,
    });

    // Satellite Marker
    const satIcon = L.divIcon({
      className: 'sat-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="px-2 py-0.5 rounded-full bg-sky-500/90 text-slate-950 font-mono text-[9px] font-bold border border-white shadow-lg flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            <span>VIIRS NOAA-20 (Orbital Pass)</span>
          </div>
        </div>
      `,
      iconSize: [160, 24],
      iconAnchor: [80, 12],
    });

    L.marker([44.22, -121.70], { icon: satIcon }).addTo(orbitLayerGroupRef.current!);
    polyline.addTo(orbitLayerGroupRef.current!);
  }, [showSatelliteOrbit]);

  // Find corresponding alert if selectedZone or hotspot is active
  const relatedAlert = alerts.find(
    (a) =>
      (selectedZone && a.sector.includes(selectedZone.sectorCode)) ||
      (selectedHotspot && a.sector.includes(selectedHotspot.sector))
  ) || alerts[0];

  return (
    <div id="live-risk-map-tab" className="relative h-[calc(100vh-4rem)] w-full flex flex-col overflow-hidden select-none">
      {/* TOP LEFT HUD: Real-world Region Switcher & Summary Counters */}
      <div className="absolute top-3 left-3 z-20 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 pointer-events-auto">
        {/* Real-World Region Quick Jump Dropdown */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 shadow-2xl backdrop-blur-md flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Wildfire Threat Sector</span>
            <select
              value={selectedRegion}
              onChange={(e) => {
                const reg = REAL_REGIONS.find((r) => r.id === e.target.value);
                if (reg) handleFlyToRegion(reg);
              }}
              className="bg-transparent text-xs font-bold font-mono text-white focus:outline-none cursor-pointer pr-1"
            >
              {REAL_REGIONS.map((r) => (
                <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                  {r.name} ({r.state}) — {r.threatLevel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Global Summary Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="p-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="text-[11px] font-mono text-white">
            <span className="text-red-400 font-bold">{hotspots.length} Thermal Hotspots</span>
            <span className="text-slate-400 ml-1.5">| 41.2°C Max Surface Temp</span>
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Real Earth Basemap Switcher & Tactical Layers */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        {/* 1. Basemap Mode Selector (Photorealistic Satellite / Hybrid / Topo / Dark) */}
        <div className="p-1 rounded-2xl bg-slate-950/90 border border-slate-700 shadow-2xl backdrop-blur-md flex items-center gap-1">
          <button
            onClick={() => setCurrentBasemap('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              currentBasemap === 'satellite'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Photorealistic High-Res Real Earth Satellite"
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>Real Satellite</span>
          </button>

          <button
            onClick={() => setCurrentBasemap('hybrid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              currentBasemap === 'hybrid'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Satellite with Real Road & Place Overlays"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Hybrid</span>
          </button>

          <button
            onClick={() => setCurrentBasemap('topo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              currentBasemap === 'topo'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Elevation Topographic Mountain Relief"
          >
            <Mountain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Topographic</span>
          </button>

          <button
            onClick={() => setCurrentBasemap('dark')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              currentBasemap === 'dark'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Tactical Dark Vector Map"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
        </div>

        {/* 2. Tactical Overlay Layers Toolbar */}
        <div className="p-2 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-md flex flex-wrap sm:flex-col gap-1 max-w-[200px]">
          <div className="px-2 py-0.5 text-[9px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-1 mb-0.5 w-full">
            <Layers className="w-3 h-3 text-orange-400" />
            <span>Tactical Overlays</span>
          </div>

          <button
            onClick={() => setShowRiskPolygons(!showRiskPolygons)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors w-full ${
              showRiskPolygons ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Trees className="w-3 h-3 text-emerald-400" /> Risk Polygons
            </span>
            {showRiskPolygons ? <Eye className="w-3 h-3 text-orange-400" /> : <EyeOff className="w-3 h-3 text-slate-600" />}
          </button>

          <button
            onClick={() => setShowThermalHotspots(!showThermalHotspots)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors w-full ${
              showThermalHotspots ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Flame className="w-3 h-3 text-red-400" /> Hotspot Pins
            </span>
            {showThermalHotspots ? <Eye className="w-3 h-3 text-red-400" /> : <EyeOff className="w-3 h-3 text-slate-600" />}
          </button>

          <button
            onClick={() => setShowWindVectors(!showWindVectors)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors w-full ${
              showWindVectors ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Wind className="w-3 h-3 text-cyan-400" /> Wind Vectors
            </span>
            {showWindVectors ? <Eye className="w-3 h-3 text-cyan-400" /> : <EyeOff className="w-3 h-3 text-slate-600" />}
          </button>

          <button
            onClick={() => setShowFireBases(!showFireBases)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors w-full ${
              showFireBases ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-blue-400" /> Fire Bases
            </span>
            {showFireBases ? <Eye className="w-3 h-3 text-blue-400" /> : <EyeOff className="w-3 h-3 text-slate-600" />}
          </button>

          <button
            onClick={() => setShowWaterSources(!showWaterSources)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors w-full ${
              showWaterSources ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3 h-3 text-cyan-400" /> Reservoirs
            </span>
            {showWaterSources ? <Eye className="w-3 h-3 text-cyan-400" /> : <EyeOff className="w-3 h-3 text-slate-600" />}
          </button>

          <button
            onClick={() => setShowSatelliteOrbit(!showSatelliteOrbit)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors w-full ${
              showSatelliteOrbit ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-sky-400" /> Orbit Track
            </span>
            {showSatelliteOrbit ? <Eye className="w-3 h-3 text-sky-400" /> : <EyeOff className="w-3 h-3 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Main Real-World Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="h-full w-full bg-slate-950 z-10" />

      {/* BOTTOM RIGHT: Live GPS & Elevation Coordinate Telemetry Bar */}
      <div className="absolute bottom-2 right-14 z-20 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-300 shadow-2xl backdrop-blur-md pointer-events-auto">
        <span className="flex items-center gap-1 text-orange-400 font-bold">
          <LocateFixed className="w-3 h-3" />
          <span>GPS: {cursorCoords.lat}° N, {cursorCoords.lng}° W</span>
        </span>
        <span className="text-slate-500">|</span>
        <span>Map: {currentBasemap.toUpperCase()}</span>
        <span className="text-slate-500">|</span>
        <span className="text-emerald-400">Scan: Ready (Click Map)</span>
      </div>

      {/* Click-to-Scan Instant Tactical Analysis Popup */}
      {customScanPoint && (
        <div className="absolute top-20 left-4 z-30 p-4 rounded-2xl bg-slate-950/95 border border-orange-500/40 shadow-2xl backdrop-blur-xl text-xs font-mono text-white max-w-xs animate-fadeIn pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-orange-400 font-bold flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 animate-spin" />
              POINT SCAN AT [{customScanPoint.lat}, {customScanPoint.lng}]
            </span>
            <button
              onClick={() => {
                setCustomScanPoint(null);
                if (scanMarkerGroupRef.current) scanMarkerGroupRef.current.clearLayers();
              }}
              className="text-slate-500 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Terrain Elevation:</span>
              <span className="text-white font-bold">{customScanPoint.elevation}m MSL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fuel Bed Dryness:</span>
              <span className="text-red-400 font-bold">{customScanPoint.fuelDryness}% (Critical)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Slope Gradient:</span>
              <span className="text-amber-400 font-bold">{customScanPoint.slope}° Incline</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vegetation Canopy:</span>
              <span className="text-emerald-400 font-bold">Dense Ponderosa Pine</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Sector Inspector Drawer */}
      {selectedZone && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xl z-20 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl p-4 sm:p-5 backdrop-blur-xl pointer-events-auto ring-1 ring-orange-500/20">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase border ${
                    selectedZone.riskLevel === 'extreme'
                      ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                      : selectedZone.riskLevel === 'high'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                      : selectedZone.riskLevel === 'moderate'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {selectedZone.riskLevel.toUpperCase()} RISK ({selectedZone.riskScore}%)
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedZone.sectorCode}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {selectedZone.name}
              </h3>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onSelectAlert(relatedAlert.id)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Deep Telemetry
              </button>
              <button
                onClick={() => onOpenDispatchModal(relatedAlert)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Fuel Moisture</div>
              <div className="text-white font-bold">{selectedZone.moistureIndex}% (Dry)</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Monitored Area</div>
              <div className="text-white font-bold">{selectedZone.areaSqKm} km²</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Satellite Sensor</div>
              <div className="text-orange-400 font-bold truncate">VIIRS Band 4</div>
            </div>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 truncate">
            <span className="text-slate-400 font-mono">Real Earth Fuel Bed: </span>
            {selectedZone.fuelLoad}
          </div>
        </div>
      )}
    </div>
  );
};
