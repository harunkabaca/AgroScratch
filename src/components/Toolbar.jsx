/**
 * AgroScratch — Araç Çubuğu
 * Çalıştır / Durdur / Sıfırla / Kodu Gör kontrolleri — Türkçe
 */
import { Play, Square, RotateCcw, Code, Globe, Sun, Moon, Maximize2, Monitor, Pause } from 'lucide-react';

export default function Toolbar({ 
  onPlay, onStop, onReset, onShowCode, isExecuting,
  lang, setLang, theme, setTheme, t,
  bigScreenOnRun, setBigScreenOnRun,
  isInspectMode, setIsInspectMode,
  isPaused, setIsPaused
}) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'var(--toolbar-bg)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24 }}>🌱</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 900,
              fontStyle: 'italic',
              letterSpacing: '-0.04em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            {t.brand}
          </h1>
          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 2 }}>
            {t.subtitle}
          </span>
        </div>
      </div>

      {/* Eylemler */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        
        {/* Dil Seçici */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: 10, border: '1px solid var(--border)' }}>
          <Globe size={14} color="var(--text-secondary)" />
          {['tr', 'en', 'de'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: lang === l ? 'var(--accent)' : 'transparent',
                color: lang === l ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '2px 6px',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Tema Değiştirici */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 10, border: '1px solid var(--border)',
            background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 8px' }} />

        {/* Big Screen on Run Toggle */}
        <button
          onClick={() => setBigScreenOnRun(!bigScreenOnRun)}
          title={t.bigScreenOnRun}
          className="toolbar-toggle-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 12, 
            border: `1.5px solid ${bigScreenOnRun ? 'var(--accent)' : 'var(--border)'}`,
            background: bigScreenOnRun ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)', 
            color: bigScreenOnRun ? 'var(--accent)' : 'var(--text-primary)', 
            cursor: 'pointer',
            fontSize: 10, fontWeight: 800, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: bigScreenOnRun ? '0 0 15px rgba(34, 197, 94, 0.2)' : 'none',
          }}
        >
          <Monitor size={14} /> {t.bigScreenOnRun}
        </button>

        {/* Inspect Mode Toggle */}
        <button
          onClick={() => setIsInspectMode(!isInspectMode)}
          title={t.inspectMode}
          className="toolbar-toggle-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 12, 
            border: `1.5px solid ${isInspectMode ? '#9333ea' : 'var(--border)'}`,
            background: isInspectMode ? 'rgba(147, 51, 234, 0.15)' : 'rgba(255, 255, 255, 0.03)', 
            color: isInspectMode ? '#a855f7' : 'var(--text-primary)', 
            cursor: 'pointer',
            fontSize: 10, fontWeight: 800, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isInspectMode ? '0 0 15px rgba(147, 51, 234, 0.2)' : 'none',
          }}
        >
          <Maximize2 size={14} /> {t.inspectMode}
        </button>

        <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 8px' }} />

        <button
          onClick={onShowCode}
          title={t.showCode}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 12, border: '1px solid var(--border)',
            background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer',
            fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
          }}
        >
          <Code size={16} /> {t.showCode}
        </button>

        <button
          onClick={onReset}
          title={t.reset}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 12, border: '1px solid var(--border)',
            background: 'var(--bg-secondary)', color: '#f59e0b', cursor: 'pointer',
            fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
          }}
        >
          <RotateCcw size={16} /> {t.reset}
        </button>

        {isExecuting ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? t.resume : t.pause}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 12, border: '1px solid var(--border)',
                background: isPaused ? '#22c55e' : 'var(--bg-secondary)', 
                color: isPaused ? '#fff' : 'var(--text-secondary)', cursor: 'pointer',
                fontSize: 12, fontWeight: 800, transition: 'all 0.2s',
              }}
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />} {isPaused ? t.resume : t.pause}
            </button>
            <button
              onClick={onStop}
              title={t.stop}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 20px', borderRadius: 12, border: 'none',
                background: '#ef4444', color: '#fff', cursor: 'pointer',
                fontSize: 12, fontWeight: 800, transition: 'all 0.2s',
                boxShadow: '0 0 20px rgba(239,68,68,0.4)',
              }}
            >
              <Square size={16} /> {t.stop}
            </button>
          </div>
        ) : (
          <button
            onClick={onPlay}
            title={t.play}
            className="animate-pulse-glow"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 20px', borderRadius: 12, border: 'none',
              background: 'var(--accent)', color: '#fff', cursor: 'pointer',
              fontSize: 12, fontWeight: 800, transition: 'all 0.2s',
            }}
          >
            <Play size={16} /> {t.play}
          </button>
        )}
      </div>
    </header>
  );
}
