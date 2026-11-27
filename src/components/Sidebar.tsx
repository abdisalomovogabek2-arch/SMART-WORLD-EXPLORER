import React, { useState } from 'react';
import { Navigation, Plane, Activity, MapPin, Search, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { QuickLocation, AircraftRecord } from '../types';
import { WORLD_REGIONS } from '../data/initialData';

interface SidebarProps {
  onSelectLocation: (loc: QuickLocation) => void;
  selectedLocation: QuickLocation | null;
  aircraftList: AircraftRecord[];
  selectedAircraft: AircraftRecord | null;
  onSelectAircraft: (aircraft: AircraftRecord) => void;
  isLoadingAircraft: boolean;
  radarError: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectLocation,
  selectedLocation,
  aircraftList,
  selectedAircraft,
  onSelectAircraft,
  isLoadingAircraft,
  radarError
}) => {
  const [activeTab, setActiveTab] = useState<'aircraft' | 'continents'>('aircraft');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({
    'central-asia': true,
    'middle-east': true,
    'europe': true,
    'asia': false,
    'north-america': false
  });

  const toggleRegion = (id: string) => {
    setExpandedRegions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAircraft = aircraftList.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      a.callsign.toLowerCase().includes(q) ||
      a.icao24.toLowerCase().includes(q) ||
      (a.model && a.model.toLowerCase().includes(q)) ||
      (a.origin && a.origin.toLowerCase().includes(q)) ||
      (a.destination && a.destination.toLowerCase().includes(q))
    );
  });

  return (
    <aside
      style={{
        width: '330px',
        height: 'calc(100vh - 64px)',
        zIndex: 30,
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      className="glass-panel"
    >
      {/* Tezkor Ko‘rsatkichlar */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(0, 0, 0, 0.25)'
        }}
      >
        <div
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: 'var(--accent-cyan)',
            fontWeight: 800,
            marginBottom: '8px'
          }}
        >
          Global Radar Holati
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div
            style={{
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11px' }}>
              <Plane size={13} color="var(--accent-cyan)" />
              <span>Samolyotlar</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#fff' }}>
              {isLoadingAircraft ? '...' : aircraftList.length} ta
            </div>
          </div>

          <div
            style={{
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11px' }}>
              <Globe size={13} color="var(--accent-emerald)" />
              <span>Hudud</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '6px', color: 'var(--accent-emerald)' }}>
              Butun Dunyo
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher: Samolyotlar vs Qit'alar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(255, 255, 255, 0.02)'
        }}
      >
        <button
          onClick={() => setActiveTab('aircraft')}
          style={{
            flex: 1,
            padding: '11px 0',
            border: 'none',
            background: activeTab === 'aircraft' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
            borderBottom: activeTab === 'aircraft' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
            color: activeTab === 'aircraft' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Plane size={14} />
          <span>Samolyotlar ({aircraftList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('continents')}
          style={{
            flex: 1,
            padding: '11px 0',
            border: 'none',
            background: activeTab === 'continents' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
            borderBottom: activeTab === 'continents' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
            color: activeTab === 'continents' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Globe size={14} />
          <span>Qit‘alar & Xablar</span>
        </button>
      </div>

      {/* Asosiy kontent */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'aircraft' ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Qidiruv */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '6px 10px'
                }}
              >
                <Search size={14} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Reys, aeroport yoki ICAO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    width: '100%',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Samolyotlar ro'yxati */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {isLoadingAircraft && aircraftList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                  Havo kemalari radari yuklanmoqda...
                </div>
              ) : filteredAircraft.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                  {radarError ? radarError : 'Ushbu hududda parvozlar topilmadi'}
                </div>
              ) : (
                filteredAircraft.map((aircraft) => {
                  const isSelected = selectedAircraft?.icao24 === aircraft.icao24;
                  return (
                    <div
                      key={aircraft.icao24}
                      onClick={() => onSelectAircraft(aircraft)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: isSelected
                          ? 'rgba(255, 123, 0, 0.15)'
                          : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected
                          ? '1px solid #ff7b00'
                          : '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              transform: `rotate(${aircraft.headingDeg}deg)`,
                              color: isSelected ? '#ff7b00' : 'var(--accent-cyan)'
                            }}
                          >
                            <Plane size={15} />
                          </div>
                          <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>
                            {aircraft.callsign || 'NOMA’LUM'}
                          </span>
                          {aircraft.model && (
                            <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '3px', color: '#cbd5e1' }}>
                              {aircraft.model}
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: '10px',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background: aircraft.onGround ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: aircraft.onGround ? 'var(--accent-red)' : 'var(--accent-emerald)',
                            fontWeight: 600
                          }}
                        >
                          {aircraft.onGround ? 'Yerda' : `${aircraft.velocityKph} km/s`}
                        </span>
                      </div>

                      {/* Marshrut va Balandlik */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '6px',
                          fontSize: '11px',
                          color: 'var(--text-muted)'
                        }}
                      >
                        <span style={{ color: aircraft.origin ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                          {aircraft.origin && aircraft.destination
                            ? `${aircraft.origin} ➔ ${aircraft.destination}`
                            : aircraft.originCountry}
                        </span>
                        <span style={{ color: '#fff', fontWeight: 600 }}>
                          {aircraft.baroAltitudeMeters !== null
                            ? `${aircraft.baroAltitudeMeters.toLocaleString()} m`
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* Qit'alar va Global Mintaqalar */
          <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {WORLD_REGIONS.map((region) => {
              const isExpanded = expandedRegions[region.id] ?? false;
              return (
                <div
                  key={region.id}
                  style={{
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Region Sarlavhasi (Akkordeon) */}
                  <div
                    onClick={() => toggleRegion(region.id)}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {region.nameUz}
                    </span>
                    {isExpanded ? <ChevronDown size={15} color="var(--text-muted)" /> : <ChevronRight size={15} color="var(--text-muted)" />}
                  </div>

                  {/* Region Shaharlari */}
                  {isExpanded && (
                    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {region.locations.map((loc) => {
                        const isSelected = selectedLocation?.id === loc.id;
                        return (
                          <div
                            key={loc.id}
                            onClick={() => onSelectLocation(loc)}
                            style={{
                              padding: '8px 10px',
                              borderRadius: '6px',
                              background: isSelected
                                ? 'rgba(0, 242, 254, 0.15)'
                                : 'rgba(255, 255, 255, 0.02)',
                              border: isSelected
                                ? '1px solid var(--accent-cyan)'
                                : '1px solid transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MapPin size={13} color={isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                              <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                                {loc.nameUz}
                              </span>
                            </div>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                              {loc.region}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div
        style={{
          padding: '12px 18px',
          borderTop: '1px solid var(--border-color)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.25)'
        }}
      >
        <span>Global Radar Qamrovi</span>
        <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>Avto-kuzatuv</span>
      </div>
    </aside>
  );
};
