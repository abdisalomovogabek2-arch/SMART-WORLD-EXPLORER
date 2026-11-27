import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { MapLayer, QuickLocation, AircraftRecord, FlightTrackData } from '../types';
import { COMPREHENSIVE_AIRPORTS } from '../data/airportsData';
import { BoundingBox } from '../services/aircraftService';
import { EarthquakeFeature, ThermalHotspot } from '../services/layersService';

interface MapViewProps {
  layers: MapLayer[];
  selectedLocation: QuickLocation | null;
  aircraftList: AircraftRecord[];
  selectedAircraft: AircraftRecord | null;
  onSelectAircraft: (aircraft: AircraftRecord) => void;
  flightTrack: FlightTrackData | null;
  onBoundsChange?: (bbox: BoundingBox) => void;
  earthquakes: EarthquakeFeature[];
  wildfires: ThermalHotspot[];
  weatherRadarUrl: string | null;
}

function getAircraftColor(altitudeMeters: number | null, onGround: boolean): { fill: string; glow: string } {
  if (onGround) {
    return { fill: '#94a3b8', glow: 'rgba(148, 163, 184, 0.4)' };
  }
  if (altitudeMeters === null || altitudeMeters < 3000) {
    return { fill: '#10b981', glow: 'rgba(16, 185, 129, 0.6)' };
  }
  if (altitudeMeters < 7000) {
    return { fill: '#facc15', glow: 'rgba(250, 204, 21, 0.7)' };
  }
  if (altitudeMeters < 10000) {
    return { fill: '#ff7b00', glow: 'rgba(255, 123, 0, 0.8)' };
  }
  return { fill: '#00f2fe', glow: 'rgba(0, 242, 254, 0.85)' };
}

function getEarthquakeColor(mag: number): string {
  if (mag >= 6.5) return '#ef4444';
  if (mag >= 5.0) return '#f97316';
  if (mag >= 4.0) return '#eab308';
  return '#10b981';
}

export const MapView: React.FC<MapViewProps> = ({
  layers,
  selectedLocation,
  aircraftList,
  selectedAircraft,
  onSelectAircraft,
  flightTrack,
  onBoundsChange,
  earthquakes,
  wildfires,
  weatherRadarUrl
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const aircraftMarkersRef = useRef<Map<string, { marker: maplibregl.Marker; el: HTMLElement }>>(new Map());
  const airportMarkersRef = useRef<maplibregl.Marker[]>([]);
  const earthquakeMarkersRef = useRef<maplibregl.Marker[]>([]);
  const wildfireMarkersRef = useRef<maplibregl.Marker[]>([]);

  // MapLibre initsializatsiya
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          },
          'satellite-tiles': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '© Esri World Imagery, Maxar'
          },
          // 3D binolar uchun ochiq OpenMapTiles vektor manbasi
          'openmaptiles': {
            type: 'vector',
            url: 'https://api.maptiler.com/tiles/v3/tiles.json?key=get_free_tier_or_fallback'
          }
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19
          },
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite-tiles',
            minzoom: 0,
            maxzoom: 19,
            layout: {
              visibility: 'none'
            }
          }
        ]
      },
      center: [64.5853, 41.3775],
      zoom: 5.5,
      pitch: 0,
      bearing: 0,
      maxPitch: 85
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left');

    map.on('load', () => {
      setMapLoaded(true);
      mapRef.current = map;

      // Parvoz treki
      map.addSource('flight-track-source', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });

      map.addLayer({
        id: 'flight-track-line',
        type: 'line',
        source: 'flight-track-source',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#ff7b00',
          'line-width': 4,
          'line-opacity': 0.95
        }
      });

      // Barcha aeroportlar
      COMPREHENSIVE_AIRPORTS.forEach((apt) => {
        const el = document.createElement('div');
        el.className = 'airport-marker-container';

        el.innerHTML = `
          <div class="airport-pin">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
          </div>
          <div class="airport-code-tag">${apt.iata}</div>
        `;

        const popup = new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`
          <div style="font-family: var(--font-family); min-width: 200px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span style="font-size: 15px; font-weight: 800; color: #a855f7;">${apt.iata} / ${apt.icao}</span>
              <span style="font-size: 10px; background: rgba(168, 85, 247, 0.2); color: #c084fc; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${apt.type}</span>
            </div>
            <div style="font-weight: 700; font-size: 13px; margin-top: 5px; color: #fff;">${apt.name}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">${apt.city}, ${apt.country}</div>
          </div>
        `);

        el.addEventListener('mouseenter', () => popup.addTo(map));
        el.addEventListener('mouseleave', () => popup.remove());

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(apt.coords as [number, number])
          .setPopup(popup)
          .addTo(map);

        airportMarkersRef.current.push(marker);
      });
    });

    map.on('moveend', () => {
      if (!onBoundsChange) return;
      const b = map.getBounds();
      onBoundsChange({
        lamin: Math.max(-85, b.getSouth()),
        lamax: Math.min(85, b.getNorth()),
        lomin: Math.max(-180, b.getWest()),
        lomax: Math.min(180, b.getEast())
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  // 3D rejimini yoqish/o'chirish funksiyasi (Kamera burchagini 3D ga burish)
  const toggle3DCamera = () => {
    if (!mapRef.current) return;
    const newMode = !is3DMode;
    setIs3DMode(newMode);

    mapRef.current.easeTo({
      pitch: newMode ? 62 : 0, // 3D ko'rinish uchun 62 darajali burchak
      bearing: newMode ? -20 : 0,
      duration: 1500
    });
  };

  // 1. Aeroportlar qatlami
  useEffect(() => {
    const isAirportActive = layers.find((l) => l.id === 'airports')?.active ?? true;
    airportMarkersRef.current.forEach((marker) => {
      const el = marker.getElement();
      el.style.display = isAirportActive ? 'flex' : 'none';
    });
  }, [layers]);

  // 2. Sun'iy yo'ldosh xaritasi va 3D binolar
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const satLayer = layers.find((l) => l.id === 'satellite-basemap');
    const buildings3D = layers.find((l) => l.id === '3d-buildings');

    const isSatActive = satLayer?.active ?? false;
    const is3DActive = buildings3D?.active ?? false;

    if (map.getLayer('satellite-layer')) {
      map.setLayoutProperty('satellite-layer', 'visibility', isSatActive ? 'visible' : 'none');
    }

    // Agar sun'iy yo'ldosh yoki 3D binolar yoqilsa, xarita avtomatik 3D istiqbolga o'tadi
    if (isSatActive || is3DActive) {
      map.easeTo({
        pitch: 58,
        bearing: -15,
        duration: 1200
      });
      setIs3DMode(true);
    } else {
      map.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 1000
      });
      setIs3DMode(false);
    }
  }, [layers, mapLoaded]);

  // 3. Ob-havo va yog'ingarchilik radari qatlami (RainViewer)
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const isWeatherActive = layers.find((l) => l.id === 'weather-radar')?.active ?? false;

    if (weatherRadarUrl && !map.getSource('rainviewer-source')) {
      map.addSource('rainviewer-source', {
        type: 'raster',
        tiles: [`${weatherRadarUrl}/256/{z}/{x}/{y}/2/1_1.png`],
        tileSize: 256
      });

      map.addLayer({
        id: 'rainviewer-layer',
        type: 'raster',
        source: 'rainviewer-source',
        minzoom: 0,
        maxzoom: 18,
        paint: { 'raster-opacity': 0.7 },
        layout: { visibility: isWeatherActive ? 'visible' : 'none' }
      });
    } else if (map.getLayer('rainviewer-layer')) {
      map.setLayoutProperty('rainviewer-layer', 'visibility', isWeatherActive ? 'visible' : 'none');
    }
  }, [weatherRadarUrl, layers, mapLoaded]);

  // 4. Zilzilalar monitoringi (USGS)
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const isQuakeActive = layers.find((l) => l.id === 'earthquakes')?.active ?? true;

    earthquakeMarkersRef.current.forEach((m) => m.remove());
    earthquakeMarkersRef.current = [];

    if (!isQuakeActive) return;

    earthquakes.forEach((eq) => {
      const color = getEarthquakeColor(eq.mag);
      const size = Math.max(16, Math.min(38, Math.round(eq.mag * 5.5)));

      const el = document.createElement('div');
      el.className = 'earthquake-marker';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      el.style.opacity = '0.75';
      el.style.border = '2px solid #ffffff';
      el.style.boxShadow = `0 0 14px ${color}`;
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = '#fff';
      el.style.fontWeight = '800';
      el.style.fontSize = eq.mag >= 5 ? '10px' : '0px';
      if (eq.mag >= 5) el.innerText = eq.mag.toFixed(1);

      const timeStr = new Date(eq.time).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
      const popup = new maplibregl.Popup({ offset: 15 }).setHTML(`
        <div style="font-family: var(--font-family); color: #fff; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <span style="font-size: 14px; font-weight: 800; color: ${color};">M ${eq.mag.toFixed(1)} ZILZILA</span>
            <span style="font-size: 10px; color: #94a3b8;">${timeStr}</span>
          </div>
          <div style="font-size: 12px; font-weight: 600; margin-top: 4px; color: #f8fafc;">${eq.place}</div>
          <div style="font-size: 11px; color: #38bdf8; margin-top: 2px;">Chuqurligi: <b>${eq.depthKm} km</b></div>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(eq.coordinates)
        .setPopup(popup)
        .addTo(map);

      earthquakeMarkersRef.current.push(marker);
    });
  }, [earthquakes, layers, mapLoaded]);

  // 5. NASA FIRMS yong'in detektori
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const isFireActive = layers.find((l) => l.id === 'wildfires')?.active ?? false;

    wildfireMarkersRef.current.forEach((m) => m.remove());
    wildfireMarkersRef.current = [];

    if (!isFireActive) return;

    wildfires.forEach((fire) => {
      const el = document.createElement('div');
      el.className = 'wildfire-marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.cursor = 'pointer';
      el.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ef4444" stroke="#ffedd5" stroke-width="1.5">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
        </svg>
      `;

      const popup = new maplibregl.Popup({ offset: 15 }).setHTML(`
        <div style="font-family: var(--font-family); color: #fff;">
          <div style="color: #ef4444; font-weight: 800; font-size: 13px;">FAOL TERMAL YONG‘IN O‘CHOG‘I</div>
          <div style="font-size: 11px; margin-top: 3px; color: #f8fafc;">Quvvati (FRP): <b>${fire.frp} MW</b></div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Ishonchlilik: ${fire.confidence}% (${fire.source})</div>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([fire.lon, fire.lat])
        .setPopup(popup)
        .addTo(map);

      wildfireMarkersRef.current.push(marker);
    });
  }, [wildfires, layers, mapLoaded]);

  // Fly to location
  useEffect(() => {
    if (!mapRef.current || !selectedLocation) return;
    mapRef.current.flyTo({
      center: selectedLocation.center,
      zoom: selectedLocation.zoom,
      essential: true,
      duration: 1800
    });
  }, [selectedLocation]);

  // Parvoz treki
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const source = mapRef.current.getSource('flight-track-source') as maplibregl.GeoJSONSource | undefined;
    if (!source) return;

    if (!flightTrack || !flightTrack.path || flightTrack.path.length === 0) {
      source.setData({ type: 'FeatureCollection', features: [] });
      return;
    }

    const coordinates: [number, number][] = [];
    for (const p of flightTrack.path) {
      if (typeof p[1] === 'number' && typeof p[2] === 'number') {
        coordinates.push([p[2], p[1]]);
      }
    }

    source.setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: coordinates },
          properties: {}
        }
      ]
    });
  }, [flightTrack, mapLoaded]);

  // Jonli Samolyotlar (ADS-B)
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const isRadarActive = layers.find((l) => l.id === 'air-traffic')?.active ?? true;

    if (!isRadarActive) {
      aircraftMarkersRef.current.forEach(({ marker }) => marker.remove());
      aircraftMarkersRef.current.clear();
      return;
    }

    const currentIcaos = new Set(aircraftList.map((a) => a.icao24));

    aircraftMarkersRef.current.forEach(({ marker }, icao) => {
      if (!currentIcaos.has(icao)) {
        marker.remove();
        aircraftMarkersRef.current.delete(icao);
      }
    });

    aircraftList.forEach((aircraft) => {
      const isSelected = selectedAircraft?.icao24 === aircraft.icao24;
      const { fill, glow } = getAircraftColor(aircraft.baroAltitudeMeters, aircraft.onGround);
      const existing = aircraftMarkersRef.current.get(aircraft.icao24);

      if (existing) {
        existing.marker.setLngLat([aircraft.longitude, aircraft.latitude]);

        const halo = existing.el.querySelector('.aircraft-halo') as HTMLElement | null;
        if (halo) {
          halo.style.transform = `rotate(${aircraft.headingDeg}deg)`;
          halo.style.background = isSelected ? 'rgba(255, 123, 0, 0.4)' : glow;
          if (isSelected) halo.classList.add('aircraft-selected');
          else halo.classList.remove('aircraft-selected');
        }

        const svgPath = existing.el.querySelector('path') as SVGPathElement | null;
        if (svgPath) svgPath.setAttribute('fill', isSelected ? '#ff7b00' : fill);

        existing.el.style.zIndex = isSelected ? '500' : '20';
      } else {
        const el = document.createElement('div');
        el.className = 'aircraft-marker-container';
        el.style.zIndex = isSelected ? '500' : '20';

        el.innerHTML = `
          <div class="aircraft-halo ${isSelected ? 'aircraft-selected' : ''}" style="background: ${isSelected ? 'rgba(255, 123, 0, 0.4)' : glow}; transform: rotate(${aircraft.headingDeg}deg);">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" 
                    fill="${isSelected ? '#ff7b00' : fill}" 
                    stroke="#ffffff" 
                    stroke-width="1.2" 
                    stroke-linejoin="round"/>
            </svg>
          </div>
          ${aircraft.callsign ? `<div class="aircraft-callsign-bubble">${aircraft.callsign}</div>` : ''}
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectAircraft(aircraft);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([aircraft.longitude, aircraft.latitude])
          .addTo(map);

        aircraftMarkersRef.current.set(aircraft.icao24, { marker, el });
      }
    });
  }, [aircraftList, mapLoaded, layers, selectedAircraft, onSelectAircraft]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* 3D / 2D Ko'rinishni Almashtirish Tugmasi */}
      <button
        onClick={toggle3DCamera}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 35,
          padding: '8px 14px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          background: is3DMode
            ? 'linear-gradient(135deg, #00f2fe, #3b82f6)'
            : 'rgba(15, 23, 42, 0.85)',
          color: is3DMode ? '#0f172a' : '#fff',
          border: is3DMode ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '14px' }}>📐</span>
        <span>{is3DMode ? '3D REJIM FAOL' : '3D ISTIQBOL'}</span>
      </button>

      {/* Belgilar Shkalasi */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '16px',
          zIndex: 25,
          padding: '8px 14px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '11px',
          fontWeight: 600
        }}
        className="glass-panel"
      >
        <span style={{ color: 'var(--text-muted)' }}>Belgilar:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#7c3aed', border: '1.5px solid #fff' }} />
          <span>Aeroport</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00f2fe' }} />
          <span>Samolyot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316' }} />
          <span>Zilzila (USGS)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <span>Yong‘in (NASA)</span>
        </div>
      </div>
    </div>
  );
};
