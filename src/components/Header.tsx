import React from 'react';
import { Compass, Radio, Search, Layers, Shield, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onToggleLayerPanel: () => void;
  isLayerPanelOpen: boolean;
  onRefreshData: () => void;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleLayerPanel,
  isLayerPanelOpen,
  onRefreshData,
  lastUpdated
}) => {
  return (
    <header
      style={{
        height: '64px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
      className="glass-panel"
    >
      {/* Brand & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
          }}
        >
          <Compass size={24} color="#0a0e17" strokeWidth={2.4} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1
              style={{
                fontSize: '17px',
                fontWeight: 800,
                letterSpacing: '-0.3px',
                color: '#fff'
              }}
            >
              SMART WORLD EXPLORER
            </h1>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(0, 242, 254, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              2D RADAR PRO
            </span>
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>O‘zbekiston va Markaziy Osiyo havo maydoni monitoringi</span>
          </div>
        </div>
      </div>

      {/* Live Status indicator & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            fontSize: '12px'
          }}
        >
          <div className="radar-live-dot" />
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>JONLI RADAR</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>• {lastUpdated}</span>
          <button
            onClick={onRefreshData}
            title="Ma’lumotlarni yangilash"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            <RefreshCw size={13} />
          </button>
        </div>

        {/* Toggle Layers Panel Button */}
        <button
          onClick={onToggleLayerPanel}
          className="glow-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Layers size={17} />
          <span>Qatlamlar paneli</span>
        </button>
      </div>
    </header>
  );
};
