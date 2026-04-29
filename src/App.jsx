/**
 * AgroScratch — App.jsx
 * Root layout: Toolbar + split (Blockly Editor | Digital Twin) + Console
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import BlocklyEditor from './components/BlocklyEditor';
import DigitalTwin from './components/DigitalTwin';
import ExecutionPanel from './components/ExecutionPanel';
import Toolbar from './components/Toolbar';
import { generateCode } from './blockly/generator';
import { SequentialExecutor } from './engine/executor';
import { useDigitalTwin } from './hooks/useDigitalTwin';
import { translations } from './i18n/translations';

export default function App() {
  const workspaceRef = useRef(null);
  const executorRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('dark');
  const t = translations[lang];

  const { position, isWatering, isExecuting, setIsExecuting, api, resetPosition } = useDigitalTwin();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  /* ── Workspace hazır ─────────────────────────────── */
  const handleWorkspaceReady = useCallback((ws) => {
    workspaceRef.current = ws;
  }, []);

  /* ── Log ekle ────────────────────────────────────── */
  const addLog = useCallback((entry) => {
    setLogs((prev) => [...prev, entry]);
  }, []);

  /* ── PLAY ────────────────────────────────────────── */
  const handlePlay = useCallback(async () => {
    if (!workspaceRef.current) return;
    const code = generateCode(workspaceRef.current);
    setGeneratedCode(code);
    setLogs([]);
    setIsExecuting(true);

    const executor = new SequentialExecutor(api, addLog, () => {});
    executorRef.current = executor;

    await executor.execute(code);
    setIsExecuting(false);
    executorRef.current = null;
  }, [api, addLog, setIsExecuting]);

  /* ── STOP ────────────────────────────────────────── */
  const handleStop = useCallback(() => {
    if (executorRef.current) {
      executorRef.current.abort();
    }
    setIsExecuting(false);
  }, [setIsExecuting]);

  /* ── RESET ───────────────────────────────────────── */
  const handleReset = useCallback(() => {
    handleStop();
    setLogs([]);
    resetPosition();
    setGeneratedCode('');
    setShowCode(false);
  }, [handleStop, resetPosition]);

  /* ── Show Code ───────────────────────────────────── */
  const handleShowCode = useCallback(() => {
    if (!workspaceRef.current) return;
    const code = generateCode(workspaceRef.current);
    setGeneratedCode(code);
    setShowCode((v) => !v);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ── TOOLBAR ──────────────────────────────────── */}
      <Toolbar
        onPlay={handlePlay}
        onStop={handleStop}
        onReset={handleReset}
        onShowCode={handleShowCode}
        isExecuting={isExecuting}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />

      {/* ── MAIN AREA ────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sol: Blockly Editor */}
        <div
          style={{
            flex: '1 1 55%',
            minWidth: 0,
            borderRight: '1px solid var(--border)',
            position: 'relative',
          }}
        >
          <BlocklyEditor 
            onWorkspaceReady={handleWorkspaceReady} 
            lang={lang} 
            theme={theme} 
          />

          {/* Code overlay */}
          {showCode && (
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(10,15,26,0.95)',
                backdropFilter: 'blur(8px)',
                padding: 24,
                overflowY: 'auto',
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ color: 'var(--accent)', fontWeight: 800, fontSize: 14 }}>
                  {t.generatedCode}
                </h3>
                <button
                  onClick={() => setShowCode(false)}
                  style={{
                    background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-secondary)',
                    padding: '4px 12px', borderRadius: 8, cursor: 'pointer',
                    fontWeight: 700, fontSize: 11,
                  }}
                >
                  {t.close}
                </button>
              </div>
              <pre
                style={{
                  color: '#e2e8f0',
                  fontSize: 12,
                  lineHeight: 1.7,
                  fontFamily: "'Fira Code', monospace",
                  whiteSpace: 'pre-wrap',
                  background: '#0f172a',
                  padding: 16,
                  borderRadius: 12,
                  border: '1px solid #1e293b',
                }}
              >
                {generatedCode || t.noBlocks}
              </pre>
            </div>
          )}
        </div>

        {/* Sağ: Digital Twin + Console */}
        <div
          style={{
            flex: '1 1 45%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-primary)',
          }}
        >
          {/* 3D Sahne */}
          <div style={{ flex: '1 1 70%', minHeight: 0, padding: 8 }}>
            <DigitalTwin position={position} isWatering={isWatering} theme={theme} />
          </div>

          {/* Konsol */}
          <div
            style={{
              flex: '0 0 30%',
              padding: '0 8px 8px 8px',
              minHeight: 0,
            }}
          >
            <ExecutionPanel logs={logs} t={t} />
          </div>
        </div>
      </div>

      {/* ── STATUS BAR ───────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 20px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--text-secondary)',
        }}
      >
        <span>
          📍 {t.position} — X:{Math.round(position.x)}  Y:{Math.round(position.y)}  Z:{Math.round(position.z)}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isExecuting ? '#22c55e' : isWatering ? '#38bdf8' : '#475569',
              boxShadow: isExecuting ? '0 0 8px #22c55e' : 'none',
            }}
          />
          {isExecuting ? t.executing : isWatering ? t.watering : t.status}
        </span>
      </div>
    </div>
  );
}

