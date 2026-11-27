import React from 'react';
import { Layers, Activity, RotateCcw, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { MapLayer, LayerCategory } from '../types';

interface LayerControlPanelProps {
  layers: MapLayer[];
  onToggleLayer: (id: string) => void;
  onResetDefaults: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_NAMES: Record<LayerCategory, string> = {
  Aviation: 'Aviatsiya va Havo Hududi',
  Weather: 'Ob-havo va Atmosfera',
  Environment: 'Ekologiya & Xavflar',
  Transport: 'Transport va Logistika',
  Geography: 'Geografik Qatlamlar'
};

export const LayerControlPanel: React.FC<LayerControlPanelProps> = ({
  layers,
  onToggleLayer,
  onResetDefaults,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const categories: LayerCategory[] = ['Aviation', 'Weather', 'Environment', 'Transport', 'Geography'];
  const activeCount = layers.filter((l) => l.active).length;

  return (
    <div
      style={{
        position: 'absolute',
        top: '72px',
        right: '16px',
        width: '380px',
        maxHeight: 'calc(100vh - 90px)',
        zIndex: 40,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="glass-panel"
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(0, 242, 254, 0.1)',
              color: 'var(--accent-cyan)'
            }}
          >
            <Layers size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.2px' }}>
              Xarita qatlamlari
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {activeCount} ta qatlam faol holatda
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={onResetDefaults}
            title="Dastlabki holatga qaytarish"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <RotateCcw size={12} />
            Asliga
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Layer Groups */}
      <div
        style={{
          padding: '12px 16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {categories.map((category) => {
          const categoryLayers = layers.filter((l) => l.category === category);
          if (categoryLayers.length === 0) return null;

          return (
            <div key={category}>
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  color: 'var(--accent-cyan)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{CATEGORY_NAMES[category]}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {categoryLayers.map((layer) => {
                  return (
                    <div
                      key={layer.id}
                      onClick={() => onToggleLayer(layer.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: layer.active
                          ? 'rgba(0, 242, 254, 0.08)'
                          : 'rgba(255, 255, 255, 0.02)',
                        border: layer.active
                          ? '1px solid rgba(0, 242, 254, 0.35)'
                          : '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ flex: 1, paddingRight: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: layer.active ? '#fff' : 'var(--text-muted)'
                            }}
                          >
                            {layer.nameUz}
                          </span>

                          {layer.statusBadge === 'Faol' && (
                            <span
                              style={{
                                fontSize: '10px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                color: 'var(--accent-emerald)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: 600
                              }}
                            >
                              Faol
                            </span>
                          )}
                          {layer.statusBadge === 'API talab' && (
                            <span
                              style={{
                                fontSize: '10px',
                                background: 'rgba(245, 158, 11, 0.15)',
                                color: 'var(--accent-amber)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: 500
                              }}
                            >
                              API kaliti
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: '11px',
                            color: 'rgba(156, 163, 175, 0.85)',
                            marginTop: '2px',
                            lineHeight: 1.3
                          }}
                        >
                          {layer.descriptionUz}
                        </p>
                      </div>

                      {/* Custom Switch toggle */}
                      <div
                        style={{
                          width: '38px',
                          height: '20px',
                          borderRadius: '10px',
                          backgroundColor: layer.active
                            ? 'var(--accent-cyan)'
                            : 'rgba(255, 255, 255, 0.15)',
                          position: 'relative',
                          transition: 'background-color 0.2s ease',
                          flexShrink: 0
                        }}
                      >
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '3px',
                            left: layer.active ? '21px' : '3px',
                            transition: 'left 0.2s ease',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(0, 0, 0, 0.2)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <ShieldCheck size={14} color="var(--accent-cyan)" />
        <span>Haqiqiy ADS-B va USGS GeoJSON ma’lumotlari ulanadi.</span>
      </div>
    </div>
  );
};
