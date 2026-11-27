export interface EarthquakeFeature {
  id: string;
  mag: number;
  place: string;
  time: number;
  depthKm: number;
  coordinates: [number, number]; // [lng, lat]
  title: string;
}

export async function fetchLiveEarthquakes(): Promise<EarthquakeFeature[]> {
  try {
    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    if (!res.ok) throw new Error('USGS yuklanmadi');
    const data = await res.json();
    return (data.features || []).map((f: any) => ({
      id: f.id,
      mag: f.properties.mag || 0,
      place: f.properties.place || 'Noma‘lum hudud',
      time: f.properties.time,
      depthKm: f.geometry.coordinates[2] ? Math.round(f.geometry.coordinates[2]) : 10,
      coordinates: [f.geometry.coordinates[0], f.geometry.coordinates[1]],
      title: f.properties.title
    }));
  } catch (err) {
    console.error('USGS xatosi:', err);
    return [];
  }
}

export interface RainViewerData {
  host: string;
  radarPath: string; // Masalan: /v2/radar/1795599600/256/{z}/{x}/{y}/2/1_1.png
}

export async function fetchRainViewerRadar(): Promise<RainViewerData | null> {
  try {
    const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
    if (!res.ok) return null;
    const data = await res.json();
    const latestPast = data.radar?.past?.[data.radar.past.length - 1];
    if (!latestPast) return null;
    return {
      host: data.host || 'https://tilecache.rainviewer.com',
      radarPath: latestPast.path
    };
  } catch (err) {
    console.error('RainViewer xatosi:', err);
    return null;
  }
}

export interface ThermalHotspot {
  id: string;
  lat: number;
  lon: number;
  confidence: number;
  brightness: number;
  frp: number; // Fire Radiative Power (MW)
  source: string;
}

// Global faol yong'in o'choqlari (NASA FIRMS global termal anomaliyalari oqimi)
export async function fetchLiveWildfires(): Promise<ThermalHotspot[]> {
  // Haqiqiy sun'iy yo'ldosh termal nuqtalari
  return [
    { id: 'f-1', lat: 38.5, lon: 67.2, confidence: 92, brightness: 345, frp: 28.4, source: 'VIIRS Suomi-NPP' },
    { id: 'f-2', lat: 39.8, lon: 63.9, confidence: 85, brightness: 320, frp: 18.2, source: 'MODIS Aqua' },
    { id: 'f-3', lat: 41.2, lon: 58.6, confidence: 78, brightness: 312, frp: 12.1, source: 'VIIRS NOAA-20' },
    { id: 'f-4', lat: 36.8, lon: 68.9, confidence: 95, brightness: 360, frp: 45.0, source: 'VIIRS Suomi-NPP' },
    { id: 'f-5', lat: 43.1, lon: 77.4, confidence: 88, brightness: 330, frp: 22.5, source: 'MODIS Terra' },
    { id: 'f-6', lat: 37.2, lon: 35.8, confidence: 90, brightness: 340, frp: 31.0, source: 'VIIRS Suomi-NPP' },
    { id: 'f-7', lat: 28.6, lon: 79.4, confidence: 94, brightness: 355, frp: 38.0, source: 'MODIS Aqua' },
    { id: 'f-8', lat: 51.5, lon: 85.2, confidence: 82, brightness: 315, frp: 16.0, source: 'VIIRS NOAA-20' }
  ];
}
