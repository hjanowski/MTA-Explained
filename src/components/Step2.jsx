import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA_SOURCES = [
  { name: 'Website SDK', icon: '🌐', color: '#6366f1' },
  { name: 'Mobile App', icon: '📱', color: '#a855f7' },
  { name: 'GA4 Events', icon: '📊', color: '#22d3ee' },
];

const STREAM_CONFIGS = [
  { label: 'Stream Name', value: 'Web_Engagement_Stream' },
  { label: 'Source Type', value: 'Salesforce SDK' },
  { label: 'Target', value: 'Data Cloud' },
  { label: 'Frequency', value: 'Real-time' },
];

export default function Step2() {
  const [activeSource, setActiveSource] = useState(-1);
  const [particles, setParticles] = useState([]);
  const [configVisible, setConfigVisible] = useState(false);
  const [configIdx, setConfigIdx] = useState(0);

  // Animate sources connecting one by one
  useEffect(() => {
    const timers = DATA_SOURCES.map((_, i) =>
      setTimeout(() => setActiveSource(i), 600 + i * 800)
    );
    setTimeout(() => setConfigVisible(true), 600 + DATA_SOURCES.length * 800);
    return () => timers.forEach(clearTimeout);
  }, []);

  // Animate config fields appearing
  useEffect(() => {
    if (!configVisible) return;
    if (configIdx >= STREAM_CONFIGS.length) return;
    const t = setTimeout(() => setConfigIdx((i) => i + 1), 500);
    return () => clearTimeout(t);
  }, [configVisible, configIdx]);

  // Generate flowing particles
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSource < 0) return;
      const sourceIdx = Math.floor(Math.random() * Math.min(activeSource + 1, DATA_SOURCES.length));
      setParticles((prev) => [
        ...prev.slice(-12),
        {
          id: Date.now() + Math.random(),
          sourceIdx,
          color: DATA_SOURCES[sourceIdx].color,
        },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, [activeSource]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.flowContainer}>
        {/* Data Sources */}
        <div style={styles.sourcesCol}>
          <div style={styles.colLabel}>Data Sources</div>
          {DATA_SOURCES.map((src, i) => (
            <motion.div
              key={src.name}
              style={{
                ...styles.sourceCard,
                borderColor: i <= activeSource ? `${src.color}44` : 'rgba(255,255,255,0.06)',
                background: i <= activeSource ? `${src.color}0a` : 'rgba(255,255,255,0.02)',
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              <span style={{ fontSize: 22 }}>{src.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{src.name}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>
                  {i <= activeSource ? 'Connected' : 'Pending'}
                </div>
              </div>
              {i <= activeSource && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={styles.checkBadge}
                >
                  &#10003;
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stream Visualization */}
        <div style={styles.streamCol}>
          <svg width="100%" height="100%" style={styles.streamSvg} viewBox="0 0 120 200" preserveAspectRatio="none">
            {DATA_SOURCES.map((src, i) => {
              const sy = 40 + i * 65;
              return (
                <g key={i}>
                  <motion.path
                    d={`M 0 ${sy} C 40 ${sy}, 80 100, 120 100`}
                    fill="none"
                    stroke={i <= activeSource ? src.color : 'rgba(255,255,255,0.06)'}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: i <= activeSource ? 1 : 0,
                      opacity: i <= activeSource ? 0.6 : 0,
                    }}
                    transition={{ delay: 0.6 + i * 0.8, duration: 0.8 }}
                    style={i <= activeSource ? { animation: 'dash-flow 1.5s linear infinite' } : {}}
                  />
                </g>
              );
            })}
          </svg>

          {/* Flowing Particles */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                style={{
                  ...styles.particle,
                  background: p.color,
                  boxShadow: `0 0 8px ${p.color}66`,
                }}
                initial={{ left: '0%', top: `${20 + p.sourceIdx * 30}%`, opacity: 0, scale: 0.5 }}
                animate={{ left: '100%', top: '48%', opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Data Cloud Target */}
        <div style={styles.targetCol}>
          <div style={styles.colLabel}>Destination</div>
          <motion.div
            style={styles.targetCard}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              style={styles.cloudIcon}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </motion.div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Data Cloud</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Salesforce CDP</div>
            <motion.div
              style={styles.statusPill}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div style={styles.statusDot} />
              Receiving
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stream Configuration Panel */}
      <AnimatePresence>
        {configVisible && (
          <motion.div
            style={styles.configPanel}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <div style={styles.configHeader}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Data Stream Configuration</span>
            </div>
            <div style={styles.configFields}>
              {STREAM_CONFIGS.slice(0, configIdx).map((cfg, i) => (
                <motion.div
                  key={cfg.label}
                  style={styles.configRow}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span style={styles.configLabel}>{cfg.label}</span>
                  <span style={styles.configValue}>{cfg.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        style={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Before engagement data can flow into Data Cloud, you must <strong>create Data Streams</strong> —
        the ingestion pipelines that connect each data source to Salesforce Data Cloud.
      </motion.p>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 24 },
  flowContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 100px 1fr',
    gap: 0,
    alignItems: 'center',
    minHeight: 240,
  },
  sourcesCol: { display: 'flex', flexDirection: 'column', gap: 10 },
  colLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 4,
  },
  sourceCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid',
    transition: 'all 0.4s ease',
  },
  checkBadge: {
    marginLeft: 'auto',
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: 'rgba(16,185,129,0.2)',
    color: '#10b981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
  },
  streamCol: {
    position: 'relative',
    minHeight: 200,
  },
  streamSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  targetCol: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' },
  targetCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: '20px 24px',
    borderRadius: 14,
    background: 'rgba(34,211,238,0.05)',
    border: '1px solid rgba(34,211,238,0.2)',
    textAlign: 'center',
  },
  cloudIcon: {},
  statusPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    color: '#10b981',
    padding: '3px 10px',
    borderRadius: 20,
    background: 'rgba(16,185,129,0.1)',
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#10b981',
  },
  configPanel: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(34,211,238,0.15)',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  configHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    color: '#e2e8f0',
  },
  configFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  configRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 10px',
    borderRadius: 6,
    background: 'rgba(255,255,255,0.03)',
  },
  configLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 500,
  },
  configValue: {
    fontSize: 12,
    color: '#22d3ee',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 1.7,
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
  },
};
