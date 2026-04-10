import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SIGNAL_FIELDS = [
  { label: 'Signal Name', value: 'Purchase_Conversion_Signal', color: '#ec4899' },
  { label: 'DMO Source', value: 'Product Browser', color: '#6366f1' },
  { label: 'Conversion Metric', value: 'Revenue Amount (SUM)', color: '#10b981' },
  { label: 'Campaign Field', value: 'CampaignId → Campaign.Name', color: '#22d3ee' },
  { label: 'Lookback Window', value: '30 days', color: '#f59e0b' },
  { label: 'Attribution Model', value: 'Multi-Touch (Data-Driven)', color: '#a855f7' },
];

function TypeWriter({ text, delay = 0, speed = 40, color = '#e2e8f0' }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color }}>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          style={{ display: 'inline-block', width: 2, height: 14, background: color, marginLeft: 1, verticalAlign: 'middle' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export default function Step4() {
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    if (visibleRows >= SIGNAL_FIELDS.length) return;
    const t = setTimeout(() => setVisibleRows((v) => v + 1), 900);
    return () => clearTimeout(t);
  }, [visibleRows]);

  return (
    <div style={styles.wrapper}>
      {/* Signal Definition Panel */}
      <motion.div
        style={styles.panel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Panel Header */}
        <div style={styles.panelHeader}>
          <div style={styles.panelHeaderLeft}>
            <motion.div
              style={styles.signalIcon}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h6" />
                <path d="M22 12h-6" />
                <path d="M12 2v6" />
                <path d="M12 22v-6" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </motion.div>
            <div>
              <div style={styles.panelTitle}>Define Engagement Signal</div>
              <div style={styles.panelSubtitle}>Configure conversion tracking parameters</div>
            </div>
          </div>
          <motion.div
            style={styles.statusBadge}
            animate={visibleRows >= SIGNAL_FIELDS.length ? { background: ['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.25)', 'rgba(16,185,129,0.15)'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {visibleRows >= SIGNAL_FIELDS.length ? (
              <span style={{ color: '#10b981' }}>&#10003; Complete</span>
            ) : (
              <span style={{ color: '#f59e0b' }}>Configuring...</span>
            )}
          </motion.div>
        </div>

        {/* Form Fields */}
        <div style={styles.form}>
          {SIGNAL_FIELDS.map((field, i) => {
            const visible = i < visibleRows;
            return (
              <motion.div
                key={field.label}
                style={{
                  ...styles.fieldRow,
                  opacity: visible ? 1 : 0.2,
                  borderColor: visible ? `${field.color}22` : 'transparent',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: visible ? 1 : 0.2, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={styles.fieldLabelRow}>
                  <div style={{ ...styles.fieldDot, background: field.color }} />
                  <span style={styles.fieldLabel}>{field.label}</span>
                </div>
                <div style={styles.fieldInput}>
                  {visible ? (
                    <TypeWriter
                      text={field.value}
                      delay={200}
                      speed={35}
                      color={field.color}
                    />
                  ) : (
                    <span style={{ color: '#334155', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                      Awaiting input...
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated scan line */}
        {visibleRows < SIGNAL_FIELDS.length && (
          <motion.div
            style={styles.scanLine}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.div>

      {/* Visual Summary */}
      {visibleRows >= SIGNAL_FIELDS.length && (
        <motion.div
          style={styles.summaryCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div style={styles.summaryTitle}>Signal Summary</div>
          <div style={styles.summaryFlow}>
            {['DMO Data', 'Engagement Signal', 'Attribution'].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.3 }}
                style={styles.summaryNode}
              >
                <div style={{
                  ...styles.summaryNodeInner,
                  background: [
                    'rgba(99,102,241,0.1)',
                    'rgba(236,72,153,0.1)',
                    'rgba(16,185,129,0.1)',
                  ][i],
                  borderColor: [
                    'rgba(99,102,241,0.3)',
                    'rgba(236,72,153,0.3)',
                    'rgba(16,185,129,0.3)',
                  ][i],
                }}>
                  {label}
                </div>
                {i < 2 && (
                  <motion.span
                    style={{ color: '#64748b', fontSize: 18 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.p
        style={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        An Engagement Signal defines <strong>what counts as a meaningful interaction</strong> —
        tying a conversion metric and campaign identifier to the mapped DMOs from the previous step.
      </motion.p>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 24 },
  panel: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(236,72,153,0.15)',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap',
    gap: 12,
  },
  panelHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  signalIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: 'rgba(236,72,153,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelTitle: { fontSize: 15, fontWeight: 700, color: '#e2e8f0' },
  panelSubtitle: { fontSize: 12, color: '#64748b' },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    background: 'rgba(245,158,11,0.1)',
  },
  form: {
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid',
    background: 'rgba(255,255,255,0.02)',
    transition: 'all 0.3s ease',
  },
  fieldLabelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  fieldDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  fieldInput: {
    minHeight: 22,
    paddingLeft: 12,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), transparent)',
    pointerEvents: 'none',
  },
  summaryCard: {
    padding: 20,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryFlow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  summaryNode: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  summaryNodeInner: {
    padding: '8px 16px',
    borderRadius: 8,
    border: '1px solid',
    fontSize: 13,
    fontWeight: 600,
    color: '#e2e8f0',
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
