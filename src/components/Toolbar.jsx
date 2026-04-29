/**
 * AgroScratch — Araç Çubuğu
 * Çalıştır / Durdur / Sıfırla / Kodu Gör kontrolleri — Türkçe
 */
import { Play, Square, RotateCcw, Code, Globe, Sun, Moon } from 'lucide-react';

export default function Toolbar({ 
  onPlay, onStop, onReset, onShowCode, isExecuting,
  lang, setLang, theme, setTheme, t
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
