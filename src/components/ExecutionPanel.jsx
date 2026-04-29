/**
 * AgroScratch — Çalıştırma Paneli (Sekmeli: Konsol & Kod)
 */
import { useRef, useEffect, useState } from 'react';
import { Terminal, Code } from 'lucide-react';

const TYPE_COLORS = {
  info: '#94a3b8',
  cmd: '#38bdf8',
  ok: '#22c55e',
  done: '#22c55e',
  warn: '#f59e0b',
  error: '#ef4444',
};

export default function ExecutionPanel({ logs, t, generatedCode, activeTab, onTabChange }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && activeTab === 'console') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

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
      {/* ── TABS ───────────────────────────────────── */}
      <div
        style={{
          padding: '4px 8px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <button
          onClick={() => onTabChange('console')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            border: 'none',
            background: activeTab === 'console' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
            color: activeTab === 'console' ? 'var(--accent)' : 'var(--text-secondary)',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 800,
            transition: 'all 0.2s'
          }}
        >
          <Terminal size={14} />
          {t.tabConsole}
        </button>
        <button
          onClick={() => onTabChange('code')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            border: 'none',
            background: activeTab === 'code' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
            color: activeTab === 'code' ? 'var(--accent)' : 'var(--text-secondary)',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 800,
            transition: 'all 0.2s'
          }}
        >
          <Code size={14} />
          {t.tabCode}
        </button>
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
        {activeTab === 'console' ? (
          <>
            {logs.length === 0 && (
              <span style={{ color: 'var(--text-secondary)' }}>
                {t.noLogs}
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
          </>
        ) : (
          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              color: '#e2e8f0',
              lineHeight: '1.6',
            }}
          >
            {generatedCode || t.noCode}
          </pre>
        )}
      </div>
    </div>
  );
}
