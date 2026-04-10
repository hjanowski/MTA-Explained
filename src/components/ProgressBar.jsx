import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;

  return (
    <div style={styles.wrapper}>
      <div style={styles.track}>
        <motion.div
          style={styles.fill}
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span style={styles.label}>
        {current} / {total} steps
      </span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 320,
  },
  track: {
    flex: 1,
    height: 6,
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
    borderRadius: 3,
  },
  label: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: 500,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
  },
};
