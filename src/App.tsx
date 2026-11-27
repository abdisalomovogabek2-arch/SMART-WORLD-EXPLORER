import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MapView } from './components/MapView';
import { LayerControlPanel } from './components/LayerControlPanel';
import { AircraftDetailsPanel } from './components/AircraftDetailsPanel';
import { INITIAL_LAYERS, WORLD_REGIONS } from './data/initialData';
import { MapLayer, QuickLocation, AircraftRecord, FlightTrackData } from './types';
import { fetchLiveAircraft, fetchFlightTrack, BoundingBox, DEFAULT_BBOX } from './services/aircraftService';
import {
  fetchLiveEarthquakes,
  fetchRainViewerRadar,
  fetchLiveWildfires,
  EarthquakeFeature,
  ThermalHotspot
} from './services/layersService';

export const App: React.FC = () => {
  const [layers, setLayers] = useState<MapLayer[]>(INITIAL_LAYERS);
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<QuickLocation | null>(WORLD_REGIONS[0].locations[0]);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString('uz-UZ'));

  // Live Aircraft state
  const currentBoundsRef = useRef<BoundingBox>(DEFAULT_BBOX);
  const [aircraftList, setAircraftList] = useState<AircraftRecord[]>([]);
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftRecord | null>(null);
  const [isLoadingAircraft, setIsLoadingAircraft] = useState<boolean>(false);
  const [radarError, setRadarError] = useState<string | null>(null);

  // Flight Track
  const [flightTrack, setFlightTrack] = useState<FlightTrackData | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState<boolean>(false);

  // Qatlamlar holatlari: Zilzilalar, Ob-havo radari, Yong'inlar
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [wildfires, setWildfires] = useState<ThermalHotspot[]>([]);
  const [weatherRadarUrl, setWeatherRadarUrl] = useState<string | null>(null);

  // Samolyotlarni yuklash
  const loadAircraftData = useCallback(async () => {
    const isRadarActive = layers.find((l) => l.id === 'air-traffic')?.active ?? true;
    if (!isRadarActive) return;

    setIsLoadingAircraft(true);
    try {
      const data = await fetchLiveAircraft(currentBoundsRef.current);
      setAircraftList(data.aircraft);
      setLastUpdated(new Date().toLocaleTimeString('uz-UZ'));
      setRadarError(null);

      if (selectedAircraft) {
        const updated = data.aircraft.find((a) => a.icao24 === selectedAircraft.icao24);
        if (updated) setSelectedAircraft(updated);
      }
    } catch (err: any) {
      console.warn('Radar xatosi:', err.message);
      setRadarError('ADS-B ma’lumoti yangilanmoqda...');
    } finally {
      setIsLoadingAircraft(false);
    }
  }, [layers, selectedAircraft]);

  // Qo'shimcha qatlamlarni yuklash (Zilzilalar, Ob-havo radari, Yong'inlar)
  const loadLayerData = useCallback(async () => {
    try {
      // 1. USGS Zilzilalar
      const quakes = await fetchLiveEarthquakes();
      setEarthquakes(quakes);

      // 2. RainViewer Ob-havo
      const rv = await fetchRainViewerRadar();
      if (rv) {
        setWeatherRadarUrl(`${rv.host}${rv.radarPath}`);
      }

      // 3. NASA FIRMS Yong'inlar
      const fires = await fetchLiveWildfires();
      setWildfires(fires);
    } catch (err) {
      console.error('Qatlamlarni yuklashda xatolik:', err);
    }
  }, []);

  // Har 10 soniyada samolyotlar va har 2 daqiqada qatlamlarni yangilash
  useEffect(() => {
    loadAircraftData();
    loadLayerData();

    const aircraftInterval = setInterval(loadAircraftData, 10000);
    const layerInterval = setInterval(loadLayerData, 120000);

    return () => {
      clearInterval(aircraftInterval);
      clearInterval(layerInterval);
    };
  }, [loadAircraftData, loadLayerData]);

  // Viewport o'zgarganda
  const handleBoundsChange = (bbox: BoundingBox) => {
    currentBoundsRef.current = bbox;
    loadAircraftData();
  };

  const handleToggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, active: !layer.active } : layer))
    );
  };

  const handleResetDefaults = () => {
    setLayers(INITIAL_LAYERS);
  };

  const handleSelectAircraft = (aircraft: AircraftRecord) => {
    setSelectedAircraft(aircraft);
    setFlightTrack(null);
  };

  const handleToggleTrack = async (icao24: string) => {
    if (flightTrack && flightTrack.icao24 === icao24) {
      setFlightTrack(null);
      return;
    }

    setIsLoadingTrack(true);
    try {
      const trackData = await fetchFlightTrack(icao24);
      if (trackData && trackData.path && trackData.path.length > 0) {
        setFlightTrack(trackData);
      } else {
        alert('Ushbu havo kemasi uchun parvoz treki mavjud emas.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTrack(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Header
        onToggleLayerPanel={() => setIsLayerPanelOpen((prev) => !prev)}
        isLayerPanelOpen={isLayerPanelOpen}
        onRefreshData={() => {
          loadAircraftData();
          loadLayerData();
        }}
        lastUpdated={lastUpdated}
      />

      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Sidebar
          selectedLocation={selectedLocation}
          onSelectLocation={(loc) => {
            setSelectedLocation(loc);
          }}
          aircraftList={aircraftList}
          selectedAircraft={selectedAircraft}
          onSelectAircraft={handleSelectAircraft}
          isLoadingAircraft={isLoadingAircraft}
          radarError={radarError}
        />

        <main style={{ flex: 1, position: 'relative', height: '100%' }}>
          <MapView
            layers={layers}
            selectedLocation={selectedLocation}
            aircraftList={aircraftList}
            selectedAircraft={selectedAircraft}
            onSelectAircraft={handleSelectAircraft}
            flightTrack={flightTrack}
            onBoundsChange={handleBoundsChange}
            earthquakes={earthquakes}
            wildfires={wildfires}
            weatherRadarUrl={weatherRadarUrl}
          />

          <AircraftDetailsPanel
            aircraft={selectedAircraft}
            onClose={() => {
              setSelectedAircraft(null);
              setFlightTrack(null);
            }}
            onToggleTrack={handleToggleTrack}
            isTrackActive={Boolean(flightTrack && flightTrack.icao24 === selectedAircraft?.icao24)}
            isLoadingTrack={isLoadingTrack}
          />

          <LayerControlPanel
            layers={layers}
            onToggleLayer={handleToggleLayer}
            onResetDefaults={handleResetDefaults}
            isOpen={isLayerPanelOpen}
            onClose={() => setIsLayerPanelOpen(false)}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
