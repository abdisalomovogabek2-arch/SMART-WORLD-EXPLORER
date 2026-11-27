import React from 'react';
import { Plane, Navigation, Gauge, ArrowUpRight, Compass, ShieldCheck, X, Route, MapPin, Tag } from 'lucide-react';
import { AircraftRecord } from '../types';

interface AircraftDetailsPanelProps {
  aircraft: AircraftRecord | null;
  onClose: () => void;
  onToggleTrack: (icao24: string) => void;
  isTrackActive: boolean;
  isLoadingTrack: boolean;
}

export const AircraftDetailsPanel: React.FC<AircraftDetailsPanelProps> = ({
  aircraft,
  onClose,
  onToggleTrack,
  isTrackActive,
  isLoadingTrack
}) => {
  if (!aircraft) return null;

  const altitudeFeet = aircraft.altitudeFeet || (aircraft.baroAltitudeMeters
    ? Math.round(aircraft.baroAltitudeMeters * 3.28084)
    : null);

  return (
    <div
      style={{
        position: 'absolute',
        top: '72px',
        left: '336px',
        width: '370px',
        zIndex: 45,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="glass-panel"
    >
      {/* Sarlavha qismi */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.15), rgba(0, 242, 254, 0.1))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff7b00, #ffb703)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 16px rgba(255, 123, 0, 0.5)'
            }}
          >
            <Plane size={22} style={{ transform: `rotate(${aircraft.headingDeg}deg)` }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>
                {aircraft.callsign || 'NOMA’LUM'}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  background: aircraft.onGround ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: aircraft.onGround ? 'var(--accent-red)' : 'var(--accent-emerald)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 700
                }}
              >
                {aircraft.onGround ? 'YERDA' : 'PARVOZDA'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                {aircraft.model ? `Model: ${aircraft.model}` : `ICAO: ${aircraft.icao24.toUpperCase()}`}
              </span>
              {aircraft.registration && (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Reg: <b>{aircraft.registration}</b>
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px 6px'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Marshrut ma'lumoti (Agar bor bo'lsa) */}
      {(aircraft.origin || aircraft.destination) && (
        <div
          style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={13} color="var(--accent-emerald)" />
            <span style={{ fontWeight: 700, color: '#fff' }}>{aircraft.origin || 'Keltirilmagan'}</span>
          </div>
          <ArrowUpRight size={14} color="var(--accent-cyan)" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={13} color="var(--accent-amber)" />
            <span style={{ fontWeight: 700, color: '#fff' }}>{aircraft.destination || 'Keltirilmagan'}</span>
          </div>
        </div>
      )}

      {/* Asosiy Telemetriya */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {/* Balandlik */}
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11px' }}>
              <Gauge size={13} color="var(--accent-cyan)" />
              <span>Balandlik</span>
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {aircraft.baroAltitudeMeters !== null ? `${aircraft.baroAltitudeMeters.toLocaleString()} m` : '0 m'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent-amber)', marginTop: '2px', fontWeight: 600 }}>
              {altitudeFeet !== null ? `${altitudeFeet.toLocaleString()} ft (FL${Math.round(altitudeFeet / 100)})` : ''}
            </div>
          </div>

          {/* Tezlik */}
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11px' }}>
              <Navigation size={13} color="var(--accent-blue)" />
              <span>Tezlik (Yerga nisbatan)</span>
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {aircraft.velocityKph > 0 ? `${aircraft.velocityKph} km/s` : '0 km/s'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent-cyan)', marginTop: '2px', fontWeight: 600 }}>
              {aircraft.speedKnots ? `${aircraft.speedKnots} kts` : `${Math.round(aircraft.velocityKph / 1.852)} kts`}
            </div>
          </div>
        </div>

        {/* Qo‘shimcha Ko‘rsatkichlar */}
        <div
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Yo‘nalish kursi:</span>
            <span style={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass size={14} color="var(--accent-cyan)" />
              {aircraft.headingDeg}°
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Vertikal tezlik:</span>
            <span style={{ fontWeight: 600, color: aircraft.verticalRateMs && aircraft.verticalRateMs > 0 ? 'var(--accent-emerald)' : '#fff' }}>
              {aircraft.verticalRateMs ? `${aircraft.verticalRateMs > 0 ? '+' : ''}${aircraft.verticalRateMs} m/s` : '0 m/s'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Koordinatalar:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)' }}>
              {aircraft.latitude.toFixed(4)}°, {aircraft.longitude.toFixed(4)}°
            </span>
          </div>

          {aircraft.squawk && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Transponder (Squawk):</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-amber)' }}>
                {aircraft.squawk}
              </span>
            </div>
          )}
        </div>

        {/* Parvoz marshruti (Trek) tugmasi */}
        <button
          onClick={() => onToggleTrack(aircraft.icao24)}
          disabled={isLoadingTrack}
          className="glow-btn"
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: isLoadingTrack ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Route size={15} />
          <span>
            {isLoadingTrack
              ? 'Trek yuklanmoqda...'
              : isTrackActive
              ? 'Parvoz trekini yashirish'
              : 'Parvoz trekini ko‘rsatish'}
          </span>
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 16px',
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(0, 0, 0, 0.25)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={13} color="var(--accent-emerald)" />
          Haqiqiy ADS-B / Jonli Radarlar tarmog‘i
        </span>
        <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>Faol reys</span>
      </div>
    </div>
  );
};
