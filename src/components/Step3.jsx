import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FIELD_MAPPINGS = [
  { source: 'event_name', dest: 'EngagementType', dmo: 'Product Browser' },
  { source: 'product_id', dest: 'ProductId', dmo: 'Product Browser' },
  { source: 'timestamp', dest: 'EngagementDateTime', dmo: 'Product Browser' },
  { source: 'campaign_id', dest: 'CampaignId', dmo: 'Campaign' },
  { source: 'user_action', dest: 'ActionType', dmo: 'Custom DMO' },
  { source: 'revenue_amount', dest: 'ConversionValue', dmo: 'Custom DMO' },
];

export default function Step3() {
  const [visibleMappings, setVisibleMappings] = useState(0);
  const [connectedMappings, setConnectedMappings] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (visibleMappings >= FIELD_MAPPINGS.length) return;
    const t = setTimeout(() => setVisibleMappings((v) => v + 1), 600);
    return () => clearTimeout(t);
  }, [visibleMappings]);

  useEffect(() => {
    if (connectedMappings >= visibleMappings) return;
    const t = setTimeout(() => setConnectedMappings((c) => c + 1), 400);
    return () => clearTimeout(t);
  }, [visibleMappings, connectedMappings]);

  const getDmoColor = (dmo) => {
    if (dmo === 'Product Browser') return '#6366f1';
    if (dmo === 'Campaign') return '#22d3ee';
    return '#a855f7';
  };

  return (
    <div style={styles.wrapper}>
      {/* DMO Legend */}
      <div style={styles.legend}>
        {['Product Browser', 'Campaign', 'Custom DMO'].map((dmo) => (
          <div key={dmo} style={styles.legendItem}>
            <div style={{ ...styles.legendDot, background: getDmoColor(dmo) }} />
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{dmo}</span>
          </div>
        ))}
      </div>

      {/* Mapping Grid */}
      <div ref={containerRef} style={styles.mappingContainer}>
        {/* Column Headers */}
        <div style={styles.headerRow}>
          <motion.div
            style={{ ...styles.colHeader, background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.2)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Source Fields
          </motion.div>
          <div style={{ width: 80 }} />
          <motion.div
            style={{ ...styles.colHeader, background: 'rgba(168,85,247,0.1)', borderColor: 'rgba(168,85,247,0.2)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            DMO Fields
          </motion.div>
        </div>

        {/* Field Mapping Rows */}
        {FIELD_MAPPINGS.map((mapping, i) => {
          const visible = i < visibleMappings;
          const connected = i < connectedMappings;
          const dmoColor = getDmoColor(mapping.dmo);

          return (
            <div key={i} style={styles.mappingRow}>
              {/* Source Field */}
              <AnimatePresence>
                {visible && (
                  <motion.div
                    style={styles.fieldCard}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <code style={styles.fieldName}>{mapping.source}</code>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connection Line */}
              <div style={styles.connectionArea}>
                {connected && (
                  <motion.div
                    style={styles.connectionLine}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div style={{ ...styles.lineInner, background: `linear-gradient(90deg, #6366f1, ${dmoColor})` }} />
                    <motion.div
                      style={{ ...styles.connectionDot, background: dmoColor, boxShadow: `0 0 10px ${dmoColor}66` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Destination DMO Field */}
              <AnimatePresence>
                {visible && (
                  <motion.div
                    style={{
                      ...styles.fieldCard,
                      ...styles.destField,
                      borderColor: `${dmoColor}33`,
                      background: `${dmoColor}08`,
                    }}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <code style={{ ...styles.fieldName, color: dmoColor }}>{mapping.dest}</code>
                    <span style={{ ...styles.dmoTag, background: `${dmoColor}15`, color: dmoColor }}>
                      {mapping.dmo}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <motion.div
        style={styles.progressRow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div style={styles.progressTrack}>
          <motion.div
            style={styles.progressFill}
            animate={{ width: `${(connectedMappings / FIELD_MAPPINGS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span style={styles.progressLabel}>
          {connectedMappings} / {FIELD_MAPPINGS.length} fields mapped
        </span>
      </motion.div>

      <motion.p
        style={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Source engagement data fields are <strong>mapped to Data Model Objects</strong> (DMOs) —
        like Product Browser, Campaign, or custom objects — to standardize and organize the data.
      </motion.p>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 20 },
  legend: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  mappingContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    position: 'relative',
  },
  headerRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 80px 1fr',
    gap: 0,
    marginBottom: 8,
  },
  colHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    fontWeight: 600,
    color: '#e2e8f0',
    padding: '8px 14px',
    borderRadius: 8,
    border: '1px solid',
  },
  mappingRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 80px 1fr',
    gap: 0,
    alignItems: 'center',
    minHeight: 44,
  },
  fieldCard: {
    padding: '8px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  destField: {
    justifyContent: 'space-between',
  },
  fieldName: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    fontWeight: 500,
    color: '#e2e8f0',
  },
  dmoTag: {
    fontSize: 9,
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: 4,
    whiteSpace: 'nowrap',
  },
  connectionArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  connectionLine: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    transformOrigin: 'left center',
    position: 'relative',
  },
  lineInner: {
    height: 2,
    flex: 1,
    borderRadius: 1,
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #6366f1, #a855f7)',
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
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
