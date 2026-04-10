import { motion } from 'framer-motion';

export default function NextStepButton({ onClick, label, color = '#6366f1', isStart = false }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        ...styles.button,
        background: isStart
          ? 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)'
          : `linear-gradient(135deg, ${color}, ${adjustColor(color, 40)})`,
        boxShadow: `0 8px 32px ${color}33, 0 0 0 1px ${color}22`,
        fontSize: isStart ? 18 : 16,
        padding: isStart ? '18px 48px' : '14px 36px',
      }}
    >
      <span>{label}</span>
      <motion.span
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'inline-block', marginLeft: 10 }}
      >
        &rarr;
      </motion.span>
    </motion.button>
  );
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

const styles = {
  button: {
    border: 'none',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 14,
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    letterSpacing: '-0.01em',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    transition: 'box-shadow 0.3s ease',
  },
};
