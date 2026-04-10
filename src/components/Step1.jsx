import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACTIONS = [
  { label: 'Add to Cart', icon: '🛒', x: '12%', y: '30%', color: '#6366f1' },
  { label: 'Download', icon: '⬇', x: '55%', y: '25%', color: '#22d3ee' },
  { label: 'Buy Now', icon: '💳', x: '33%', y: '62%', color: '#10b981' },
  { label: 'Sign Up', icon: '✏️', x: '70%', y: '58%', color: '#a855f7' },
  { label: 'Watch Video', icon: '▶', x: '15%', y: '72%', color: '#f59e0b' },
  { label: 'Subscribe', icon: '🔔', x: '75%', y: '35%', color: '#ec4899' },
];

const DATA_TAGS = ['SDK', 'GA4'];

export default function Step1() {
  const [activeAction, setActiveAction] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: '50%', y: '50%' });
  const [packets, setPackets] = useState([]);
  const [clickRipple, setClickRipple] = useState(null);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= ACTIONS.length) {
        idx = 0;
      }
      const action = ACTIONS[idx];
      // Move cursor
      setCursorPos({ x: action.x, y: action.y });

      // Click after cursor arrives
      setTimeout(() => {
        setActiveAction(idx);
        setClickRipple({ x: action.x, y: action.y, id: Date.now() });

        // Emit data packet
        setTimeout(() => {
          setPackets((prev) => [
            ...prev.slice(-8),
            {
              id: Date.now(),
              fromX: action.x,
              fromY: action.y,
              label: action.label,
              tag: DATA_TAGS[idx % 2],
              color: action.color,
            },
          ]);
        }, 300);
      }, 600);

      idx++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Mock Browser */}
      <div style={styles.browser}>
        <div style={styles.browserBar}>
          <div style={styles.dots}>
            <span style={{ ...styles.dot, background: '#ef4444' }} />
            <span style={{ ...styles.dot, background: '#f59e0b' }} />
            <span style={{ ...styles.dot, background: '#10b981' }} />
          </div>
          <div style={styles.addressBar}>
            <span style={{ color: '#10b981' }}>https://</span>your-website.com
          </div>
        </div>

        {/* Page Content Area */}
        <div style={styles.pageContent}>
          {/* Nav bar mockup */}
          <div style={styles.navMock}>
            <div style={styles.logoMock} />
            <div style={styles.navLinks}>
              <div style={styles.navLink} />
              <div style={styles.navLink} />
              <div style={styles.navLink} />
            </div>
          </div>

          {/* Action buttons */}
          {ACTIONS.map((action, i) => (
            <motion.div
              key={action.label}
              style={{
                ...styles.actionBtn,
                left: action.x,
                top: action.y,
                borderColor: activeAction === i ? action.color : 'rgba(255,255,255,0.12)',
                background:
                  activeAction === i
                    ? `${action.color}22`
                    : 'rgba(255,255,255,0.04)',
              }}
              animate={
                activeAction === i
                  ? { scale: [1, 0.92, 1.05, 1], borderColor: action.color }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <span style={{ fontSize: 16 }}>{action.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>
                {action.label}
              </span>
            </motion.div>
          ))}

          {/* Animated Cursor */}
          <motion.div
            style={styles.cursor}
            animate={{
              left: cursorPos.x,
              top: cursorPos.y,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <path d="M5 3l14 8-6.5 1.5L11 19z" />
            </svg>
          </motion.div>

          {/* Click Ripple */}
          <AnimatePresence>
            {clickRipple && (
              <motion.div
                key={clickRipple.id}
                style={{
                  ...styles.ripple,
                  left: clickRipple.x,
                  top: clickRipple.y,
                }}
                initial={{ scale: 0.5, opacity: 0.7 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Data Collection Pipeline */}
      <div style={styles.pipeline}>
        <svg width="100%" height="60" style={{ position: 'absolute', top: -30, left: 0 }}>
          <defs>
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30" x2="100%" y2="30" stroke="url(#pipeGrad)" strokeWidth="2" strokeDasharray="8 4" style={{ animation: 'dash-flow 1s linear infinite' }} />
        </svg>

        {/* Data Packets */}
        <AnimatePresence>
          {packets.slice(-4).map((pkt) => (
            <motion.div
              key={pkt.id}
              initial={{ y: -30, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5 }}
              style={{
                ...styles.packet,
                borderColor: `${pkt.color}44`,
                background: `${pkt.color}11`,
              }}
            >
              <span style={{ fontSize: 10, color: pkt.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {pkt.tag}
              </span>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>{pkt.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Collector badges */}
      <div style={styles.collectors}>
        {['SDK Integration', 'GA4 Tracking'].map((name, i) => (
          <motion.div
            key={name}
            style={{
              ...styles.collector,
              borderColor: i === 0 ? 'rgba(99,102,241,0.3)' : 'rgba(34,211,238,0.3)',
            }}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.2 }}
          >
            <motion.div
              style={{
                ...styles.collectorDot,
                background: i === 0 ? '#6366f1' : '#22d3ee',
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
            <span style={styles.autoTag}>AUTO</span>
          </motion.div>
        ))}
      </div>

      {/* Description */}
      <motion.p
        style={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Engagement actions are <strong>automatically captured</strong> via the installed SDK and GA4 integration.
        Every click, download, purchase, and signup is tracked as raw engagement data.
      </motion.p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  browser: {
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    overflow: 'hidden',
    background: 'rgba(0,0,0,0.3)',
  },
  browserBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.04)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  dots: {
    display: 'flex',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
  },
  addressBar: {
    flex: 1,
    padding: '5px 12px',
    borderRadius: 6,
    background: 'rgba(255,255,255,0.06)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    color: '#94a3b8',
  },
  pageContent: {
    position: 'relative',
    height: 280,
    padding: 16,
    overflow: 'hidden',
  },
  navMock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoMock: {
    width: 80,
    height: 20,
    borderRadius: 4,
    background: 'rgba(255,255,255,0.08)',
  },
  navLinks: {
    display: 'flex',
    gap: 12,
  },
  navLink: {
    width: 48,
    height: 10,
    borderRadius: 3,
    background: 'rgba(255,255,255,0.06)',
  },
  actionBtn: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 8,
    border: '1px solid',
    cursor: 'default',
    transition: 'background 0.3s, border-color 0.3s',
    whiteSpace: 'nowrap',
  },
  cursor: {
    position: 'absolute',
    zIndex: 20,
    pointerEvents: 'none',
    marginLeft: 30,
    marginTop: 10,
  },
  ripple: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'rgba(99,102,241,0.3)',
    marginLeft: 30,
    marginTop: 10,
    pointerEvents: 'none',
  },
  pipeline: {
    position: 'relative',
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '24px 0 8px',
    minHeight: 48,
  },
  packet: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 6,
    border: '1px solid',
  },
  collectors: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  collector: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    borderRadius: 10,
    border: '1px solid',
    background: 'rgba(255,255,255,0.03)',
  },
  collectorDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  autoTag: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.05em',
    padding: '2px 6px',
    borderRadius: 4,
    background: 'rgba(16,185,129,0.15)',
    color: '#10b981',
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
