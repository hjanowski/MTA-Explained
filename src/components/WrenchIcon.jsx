import { motion } from 'framer-motion';

export default function WrenchIcon({ color = '#6366f1' }) {
  return (
    <motion.div
      initial={{ rotate: -20, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
      title="Manual user action required"
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: `${color}18`,
        border: `1px solid ${color}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    </motion.div>
  );
}
