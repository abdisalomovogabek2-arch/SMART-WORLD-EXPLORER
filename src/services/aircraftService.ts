import { AircraftRecord, FlightTrackData } from '../types';

export interface BoundingBox {
  lamin: number;
  lomin: number;
  lamax: number;
  lomax: number;
}

// Boshlang'ich hudud (O‘zbekiston va Markaziy Osiyo)
export const DEFAULT_BBOX: BoundingBox = {
  lamin: 34.0,
  lomin: 52.0,
  lamax: 47.0,
  lomax: 76.0
};

export async function fetchLiveAircraft(bbox: BoundingBox = DEFAULT_BBOX): Promise<{
  time: number;
  total: number;
  aircraft: AircraftRecord[];
}> {
  // So'rov parametrlari: lamin, lamax, lomin, lomax
  const url = `/api/radar/live?lamin=${bbox.lamin.toFixed(2)}&lomin=${bbox.lomin.toFixed(2)}&lamax=${bbox.lamax.toFixed(2)}&lomax=${bbox.lomax.toFixed(2)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Radar xatosi: ${res.status}`);
  }

  const data = await res.json();
  return {
    time: data.time || Math.floor(Date.now() / 1000),
    total: data.total || (data.aircraft || []).length,
    aircraft: data.aircraft || []
  };
}

export async function fetchFlightTrack(icao24: string): Promise<FlightTrackData | null> {
  try {
    const res = await fetch(`/api/opensky/track?icao24=${encodeURIComponent(icao24)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Parvoz treki yuklanmadi:', err);
    return null;
  }
}
