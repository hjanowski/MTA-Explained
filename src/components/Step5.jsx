import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENGAGEMENT_SIGNALS = [
  { name: 'Purchase Signal', icon: '💰', color: '#10b981' },
  { name: 'Add-to-Cart Signal', icon: '🛒', color: '#6366f1' },
  { name: 'Download Signal', icon: '⬇️', color: '#22d3ee' },
  { name: 'Sign-up Signal', icon: '✏️', color: '#a855f7' },
];

const CONVERSION_METRICS = [
  { name: 'Revenue (SUM)', icon: '📈', color: '#10b981' },
  { name: 'Conversion Count', icon: '#️⃣', color: '#f59e0b' },
  { name: 'Average Order Value', icon: '💎', color: '#ec4899' },
];

export default function Step5() {
  const [phase, setPhase] = useState(0); // 0=idle, 1=selecting signals, 2=signals done, 3=selecting metric, 4=complete
  const [selectedSignals, setSelectedSignals] = useState([]);
  const [cursorTarget, setCursorTarget] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(-1);

  useEffect(() => {
    const timers = [];

    // Phase 1: Start selecting signals
    timers.push(setTimeout(() => setPhase(1), 600));

    // Select signals one by one
    ENGAGEMENT_SIGNALS.forEach((_, i) => {
      const base = 1200 + i * 1200;
      timers.push(setTimeout(() => setCursorTarget({ type: 'signal', index: i }), base));
      timers.push(
        setTimeout(() => {
          setSelectedSignals((prev) => [...prev, i]);
          setCursorTarget(null);
        }, base + 600)
      );
    });

    // Phase 2: signals done
    const afterSignals = 1200 + ENGAGEMENT_SIGNALS.length * 1200 + 400;
    timers.push(setTimeout(() => setPhase(2), afterSignals));

    // Phase 3: start selecting metric
    timers.push(setTimeout(() => setPhase(3), afterSignals + 600));
    timers.push(setTimeout(() => setCursorTarget({ type: 'metric', index: 0 }), afterSignals + 1000));
    timers.push(
      setTimeout(() => {
        setSelectedMetric(0);
        setCursorTarget(null);
      }, afterSignals + 1600)
    );

    // Phase 4: complete
    timers.push(setTimeout(() => setPhase(4), afterSignals + 2400));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Two-column layout */}
      <div style={styles.columns}>
        {/* Left: Signal Selection */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>📡</span>
            <div>
              <div style={styles.sectionTitle}>Select Engagement Signals</div>
              <div style={styles.sectionSub}>Choose which signals to include in MTA</div>
            </div>
          </div>

          {/* Available signals */}
          <div style={styles.cardList}>
            {ENGAGEMENT_SIGNALS.map((signal, i) => {
              const isSelected = selectedSignals.includes(i);
              const isCursorOn = cursorTarget?.type === 'signal' && cursorTarget?.index === i;

              return (
                <motion.div
                  key={signal.name}
                  style={{
                    ...styles.selectableCard,
                    borderColor: isSelected ? `${signal.color}55` : isCursorOn ? `${signal.color}33` : 'rgba(255,255,255,0.06)',
                    background: isSelected ? `${signal.color}10` : isCursorOn ? `${signal.color}08` : 'rgba(255,255,255,0.02)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isCursorOn ? 1.03 : 1,
                  }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
                >
                  <span style={{ fontSize: 20 }}>{signal.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', flex: 1 }}>
                    {signal.name}
                  </span>
                  <motion.div
                    style={{
                      ...styles.checkbox,
                      borderColor: isSelected ? signal.color : 'rgba(255,255,255,0.15)',
                      background: isSelected ? signal.color : 'transparent',
                    }}
                    animate={isSelected ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isSelected && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>&#10003;</span>}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected count */}
          <div style={styles.countBadge}>
            {selectedSignals.length} of {ENGAGEMENT_SIGNALS.length} selected
          </div>
        </div>

        {/* Right: Metric Selection */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🎯</span>
            <div>
              <div style={styles.sectionTitle}>Choose Conversion Metric</div>
              <div style={styles.sectionSub}>Define how conversions are measured</div>
            </div>
          </div>

          <div style={styles.cardList}>
            {CONVERSION_METRICS.map((metric, i) => {
              const isSelected = selectedMetric === i;
              const isCursorOn = cursorTarget?.type === 'metric' && cursorTarget?.index === i;

              return (
                <motion.div
                  key={metric.name}
                  style={{
                    ...styles.selectableCard,
                    borderColor: isSelected ? `${metric.color}55` : isCursorOn ? `${metric.color}33` : 'rgba(255,255,255,0.06)',
                    background: isSelected ? `${metric.color}10` : isCursorOn ? `${metric.color}08` : 'rgba(255,255,255,0.02)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isCursorOn ? 1.03 : 1,
                  }}
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 0.3,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{metric.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', flex: 1 }}>
                    {metric.name}
                  </span>
                  <motion.div
                    style={{
                      ...styles.radio,
                      borderColor: isSelected ? metric.color : 'rgba(255,255,255,0.15)',
                    }}
                    animate={isSelected ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isSelected && (
                      <motion.div
                        style={{ ...styles.radioInner, background: metric.color }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated Cursor Overlay */}
      <AnimatePresence>
        {cursorTarget && (
          <motion.div
            style={styles.cursorOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}>
              <path d="M5 3l14 8-6.5 1.5L11 19z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected items fly into configuration area */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            style={styles.configResult}
            initial={{ opacity: 0, y: 30, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            transition={{ duration: 0.6 }}
          >
            <div style={styles.configResultHeader}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#e2e8f0' }}>MTA Configuration</span>
            </div>

            <div style={styles.configGrid}>
              {/* Selected Signals */}
              <div style={styles.configSection}>
                <div style={styles.configSectionLabel}>Engagement Signals</div>
                <div style={styles.configChips}>
                  {selectedSignals.map((idx) => {
                    const signal = ENGAGEMENT_SIGNALS[idx];
                    return (
                      <motion.div
                        key={idx}
                        style={{
                          ...styles.chip,
                          borderColor: `${signal.color}44`,
                          background: `${signal.color}10`,
                        }}
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, delay: idx * 0.1 }}
                      >
                        <span>{signal.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: signal.color }}>
                          {signal.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Metric */}
              {selectedMetric >= 0 && (
                <motion.div
                  style={styles.configSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div style={styles.configSectionLabel}>Conversion Metric</div>
                  <div style={styles.configChips}>
                    <motion.div
                      style={{
                        ...styles.chip,
                        borderColor: `${CONVERSION_METRICS[selectedMetric].color}44`,
                        background: `${CONVERSION_METRICS[selectedMetric].color}10`,
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span>{CONVERSION_METRICS[selectedMetric].icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: CONVERSION_METRICS[selectedMetric].color }}>
                        {CONVERSION_METRICS[selectedMetric].name}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Ready indicator */}
            {phase >= 4 && (
              <motion.div
                style={styles.readyBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  style={styles.readyPulse}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#10b981' }}>
                  MTA Pipeline Ready for Activation
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        style={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Select which engagement signals feed into MTA and choose the <strong>conversion metric</strong> that
        determines how attribution credit is distributed across touchpoints.
      </motion.p>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  sectionIcon: { fontSize: 24 },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: '#e2e8f0' },
  sectionSub: { fontSize: 11, color: '#64748b' },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  selectableCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid',
    cursor: 'default',
    transition: 'all 0.2s ease',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
  countBadge: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 500,
    textAlign: 'center',
    padding: '6px 0',
    fontVariantNumeric: 'tabular-nums',
  },
  cursorOverlay: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    zIndex: 50,
    pointerEvents: 'none',
  },
  configResult: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: 14,
    padding: 20,
    overflow: 'hidden',
  },
  configResultHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  configGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  configSection: {},
  configSectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 8,
  },
  configChips: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid',
  },
  readyBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
    padding: '12px 0',
    borderTop: '1px solid rgba(16,185,129,0.15)',
  },
  readyPulse: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#10b981',
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

// Responsive: stack columns on small screens
const mediaStyles = `
@media (max-width: 640px) {
  .step5-columns { grid-template-columns: 1fr !important; }
}
`;
