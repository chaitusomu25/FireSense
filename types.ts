export type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme';

export type AlertStatus = 'active' | 'pending' | 'dispatched';

export interface WeatherConditions {
  temperature: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  windDirection: string; // e.g. "SSE", "NNW", "ENE"
  windDegrees: number; // 0 - 360
  rainfall: number; // mm
  uvIndex?: number;
  droughtFactor?: number;
}

export interface FireSpreadPrediction {
  directionText: string;
  speedKmh: number;
  targetLandmark: string;
  propagationRisk: 'Rapid' | 'Moderate' | 'Slow' | 'Critical';
  hoursToCriticalBoundary: number;
  projectedAreaHectares: number;
  containmentProbability: number;
}

export interface FireStation {
  id: string;
  name: string;
  distanceKm: number;
  status: 'Ready' | 'On Standby' | 'En Route' | 'Deployed';
  personnelCount: number;
  engineTypes: string[];
  contactRadio: string;
}

export interface WaterResource {
  id: string;
  name: string;
  distanceKm: number;
  direction: string;
  type: 'Reservoir' | 'Creek' | 'River' | 'Hydrant Tank' | 'Lake';
  capacityPercent: number;
  flowRate: 'High' | 'Moderate' | 'Low' | 'Static';
  heliBucketAccessible: boolean;
}

export interface IncidentAlert {
  id: string;
  alertNumber: string; // e.g. "#4092"
  title: string;
  sector: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  status: AlertStatus;
  timestamp: string;
  coordinates: [number, number]; // [lat, lng]
  elevationMeters: number;
  weather: WeatherConditions;
  prediction: FireSpreadPrediction;
  nearestStations: FireStation[];
  nearestWaterSources: WaterResource[];
  aiSummary: string;
  reportedBy: string;
  smokeDensity?: 'Dense' | 'Moderate' | 'Light' | 'Thermal Only';
  fuelType?: 'Dry Pine Conifer' | 'Chaparral Shrub' | 'Dense Timber' | 'Grassland' | 'Mixed conifer & deciduous undergrowth' | string;
  dispatchedAt?: string;
  dispatchedUnits?: string[];
}

export interface RiskZone {
  id: string;
  name: string;
  sectorCode: string;
  riskLevel: RiskLevel;
  riskScore: number;
  coordinates: [number, number][]; // Polygon vertices
  center: [number, number];
  areaSqKm: number;
  moistureIndex: number;
  lastSatellitePass: string;
  fuelLoad: string;
}

export interface HotspotMarker {
  id: string;
  name: string;
  sector: string;
  coordinates: [number, number];
  riskLevel: RiskLevel;
  thermalReadingC: number;
  confidence: number;
  satelliteSource: 'VIIRS-NOAA20' | 'MODIS-Terra' | 'Copernicus-Sentinel3';
  activeFlame: boolean;
}

export interface OfficerProfile {
  name: string;
  badgeId: string;
  rank: string;
  assignedSector: string;
  email: string;
  phone: string;
  avatarUrl: string;
  clearanceLevel: string;
  joinedYear: number;
  stationBase: string;
}

export interface SystemNotificationSettings {
  smsAlerts: boolean;
  mobilePush: boolean;
  emailBroadcast: boolean;
  autoDispatchTriggers: boolean;
  audioSiren: boolean;
  droneAutoRecon: boolean;
  evacuationWarningRelay: boolean;
}

export interface SystemDiagnostics {
  weatherApiStatus: 'Online' | 'Degraded' | 'Offline';
  satelliteFeedStatus: 'Connected' | 'Syncing' | 'Offline';
  satelliteName: string;
  sensorGridCoverage: number; // percentage
  systemUptime: number; // percentage
  latencyMs: number;
  activeSensorsCount: number;
  lastSyncTime: string;
}
