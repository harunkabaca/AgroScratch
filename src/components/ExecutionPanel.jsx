/**
 * AgroScratch — Çalıştırma Paneli (Konsol)
 */
import { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const TYPE_COLORS = {
  info: '#94a3b8',
  cmd: '#38bdf8',
  ok: '#22c55e',
  done: '#22c55e',
  warn: '#f59e0b',
  error: '#ef4444',
};

export default function ExecutionPanel({ logs, t }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className="glass animate-slide-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Terminal size={14} color="var(--accent)" />
        <h2 style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t.console}
        </h2>
      </div>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px',
          fontFamily: "'Fira Code', monospace",
          fontSize: '11px',
          lineHeight: '1.8',
        }}
      >
        {logs.length === 0 && (
          <span style={{ color: 'var(--text-secondary)' }}>
            {t.noBlocks}
          </span>
        )}
        {logs.map((log, i) => (
          <div
            key={i}
            style={{ color: TYPE_COLORS[log.type] || 'var(--text-secondary)' }}
          >
            <span style={{ color: 'var(--text-secondary)', marginRight: 8, opacity: 0.5 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {log.text}
          </div>
        ))}
      </div>
    </div>
  );
}
