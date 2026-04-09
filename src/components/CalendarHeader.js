import React, { useState } from 'react'

function SpiralRings() {
  const rings = Array.from({ length: 20 })
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 0 4px',
      background: '#f0f0f0',
      borderBottom: '1px solid #ddd'
    }}>
      {rings.map((_, i) => (
        <div key={i} style={{
          width: '13px',
          height: '20px',
          borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
          border: '2.5px solid #888',
          borderBottom: 'none',
        }} />
      ))}
    </div>
  )
}

function CalendarHeader({ month, year, image, palette, onPrev, onNext, animClass }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const accent = palette?.accent || '#2563eb'

  return (
    <div>
      <SpiralRings />
      <div
        className={animClass}
        style={{
          position: 'relative',
          height: '280px',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${accent} 0%, #1e293b 100%)`,
        }}
      >
        {!imgLoaded && !imgError && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${accent}bb 0%, #1e293b 100%)`,
            zIndex: 1,
          }}>
            <div style={{
              width: '36px', height: '36px',
              border: '3px solid rgba(255,255,255,0.25)',
              borderTop: '3px solid #fff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
          </div>
        )}

        {!imgError && (
          <img
            src={image.url}
            alt={image.credit}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(false) }}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        )}

        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '70px',
          background: accent,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 0 0)',
          zIndex: 2,
        }} />

        <div style={{
          position: 'absolute',
          bottom: '10px', right: '18px',
          textAlign: 'right',
          color: '#fff',
          zIndex: 3,
        }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            opacity: 0.85,
            fontWeight: 500,
            marginBottom: '1px',
          }}>
            {year}
          </div>
          <div style={{
            fontFamily: "'Georgia', serif",
            fontSize: '30px',
            fontWeight: 700,
            lineHeight: 1,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {month}
          </div>
        </div>

        <button onClick={onPrev} style={{
          position: 'absolute', left: '12px', top: '45%',
          transform: 'translateY(-50%)',
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.35)',
          color: '#fff', cursor: 'pointer', fontSize: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3, transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >‹</button>

        <button onClick={onNext} style={{
          position: 'absolute', right: '12px', top: '45%',
          transform: 'translateY(-50%)',
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.35)',
          color: '#fff', cursor: 'pointer', fontSize: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3, transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >›</button>

        <div style={{
          position: 'absolute', top: '10px', left: '12px',
          fontSize: '10px', color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic', zIndex: 3,
        }}>
          {image.credit}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default CalendarHeader