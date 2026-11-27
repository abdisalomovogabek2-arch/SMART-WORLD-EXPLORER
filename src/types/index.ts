export type LayerCategory = 'Aviation' | 'Weather' | 'Environment' | 'Transport' | 'Geography';

export interface MapLayer {
  id: string;
  nameUz: string;
  category: LayerCategory;
  categoryUz: string;
  descriptionUz: string;
  iconName: string;
  active: boolean;
  requiresKey: boolean;
  statusBadge: 'Faol' | 'Tayyor' | 'API talab' | 'Tajribaviy';
}

export interface AircraftRecord {
  icao24: string;
  callsign: string;
  model?: string;
  registration?: string;
  origin?: string;
  destination?: string;
  originCountry: string;
  timePosition: number | null;
  lastContact: number;
  longitude: number;
  latitude: number;
  baroAltitudeMeters: number | null;
  altitudeFeet?: number;
  onGround: boolean;
  velocityKph: number; // in km/h
  speedKnots?: number;
  headingDeg: number; // 0-360 deg
  verticalRateMs: number | null; // m/s
  geoAltitudeMeters?: number | null;
  squawk: string | null;
  positionSource: number;
}

export interface FlightTrackData {
  icao24: string;
  startTime: number;
  endTime: number;
  callsign: string | null;
  path: [number, number, number | null, number | null, boolean][];
}

export interface QuickLocation {
  id: string;
  nameUz: string;
  region: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  descriptionUz: string;
}
