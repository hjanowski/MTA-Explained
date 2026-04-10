import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import NextStepButton from './components/NextStepButton';
import ProgressBar from './components/ProgressBar';
import WrenchIcon from './components/WrenchIcon';

const STEPS = [
  { id: 1, title: 'Capture Engagement Data', subtitle: 'SDK & GA4 Integration', color: '#6366f1', hasWrench: false },
  { id: 2, title: 'Create Data Streams', subtitle: 'Data Cloud Ingestion', color: '#22d3ee', hasWrench: true },
  { id: 3, title: 'Map Engagement Data to DMOs', subtitle: 'Field Mapping & Transformation', color: '#a855f7', hasWrench: true },
  { id: 4, title: 'Define Engagement Signals', subtitle: 'Signal Configuration', color: '#ec4899', hasWrench: true },
  { id: 5, title: 'Configure MTA', subtitle: 'Conversions & Metrics', color: '#10b981', hasWrench: true },
];

const StepComponents = [Step1, Step2, Step3, Step4, Step5];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef([]);

  const advanceStep = useCallback(() => {
    if (currentStep < STEPS.length) {
      setCurrentStep((s) => {
        const next = s + 1;
        setTimeout(() => {
          stepRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return next;
      });
    }
  }, [currentStep]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Hero */}
      <header style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={styles.heroInner}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={styles.heroIcon}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#heroGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
          </motion.div>

          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Multi Touch Attribution
          </motion.h1>
          <motion.p
            style={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            An interactive walkthrough of the data flow and architecture
          </motion.p>

          <ProgressBar current={currentStep} total={STEPS.length} />
        </motion.div>

        {/* Start button */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ marginTop: 32 }}
          >
            <NextStepButton onClick={advanceStep} label="Begin Walkthrough" isStart />
          </motion.div>
        )}
      </header>

      {/* Steps */}
      <div style={styles.stepsContainer}>
        <AnimatePresence>
          {STEPS.slice(0, currentStep).map((step, idx) => {
            const StepComponent = StepComponents[idx];
            return (
              <motion.section
                key={step.id}
                ref={(el) => (stepRefs.current[idx + 1] = el)}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={styles.stepSection}
              >
                {/* Step Header */}
                <div style={styles.stepHeader}>
                  <motion.div
                    style={{ ...styles.stepBadge, background: step.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  >
                    {step.id}
                  </motion.div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.stepTitleRow}>
                      <h2 style={styles.stepTitle}>{step.title}</h2>
                      {step.hasWrench && <WrenchIcon color={step.color} />}
                    </div>
                    <p style={styles.stepSubtitle}>{step.subtitle}</p>
                  </div>
                </div>

                {/* Step Content */}
                <div style={styles.stepContent}>
                  <StepComponent color={step.color} />
                </div>

                {/* Next Step Button (at the bottom of this step) */}
                {idx + 1 < STEPS.length && currentStep === idx + 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                    style={styles.nextBtnContainer}
                  >
                    <NextStepButton
                      onClick={advanceStep}
                      label={`Next Step: ${STEPS[idx + 1].title}`}
                      color={STEPS[idx + 1].color}
                    />
                  </motion.div>
                )}

                {/* Completion message after last step */}
                {idx === STEPS.length - 1 && currentStep === STEPS.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                    style={styles.completionBanner}
                  >
                    <div style={styles.completionIcon}>&#10003;</div>
                    <h3 style={styles.completionTitle}>MTA Configuration Complete!</h3>
                    <p style={styles.completionText}>
                      Your Multi Touch Attribution pipeline is fully configured and ready to deliver insights.
                    </p>
                  </motion.div>
                )}
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '80px 24px 40px',
    textAlign: 'center',
    position: 'relative',
  },
  heroInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: '#94a3b8',
    fontWeight: 400,
    maxWidth: 500,
    marginBottom: 32,
  },
  stepsContainer: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '0 24px',
  },
  stepSection: {
    marginBottom: 64,
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  stepBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
    color: '#fff',
    flexShrink: 0,
  },
  stepTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  stepTitle: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 700,
    color: '#f1f5f9',
    lineHeight: 1.2,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  stepContent: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    padding: 'clamp(20px, 3vw, 32px)',
    position: 'relative',
    overflow: 'hidden',
  },
  nextBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 32,
  },
  completionBanner: {
    marginTop: 32,
    padding: 40,
    borderRadius: 16,
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 211, 238, 0.1))',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    textAlign: 'center',
  },
  completionIcon: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981, #22d3ee)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 700,
    color: '#fff',
    margin: '0 auto 16px',
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    background: 'linear-gradient(135deg, #10b981, #22d3ee)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  completionText: {
    color: '#94a3b8',
    fontSize: 16,
  },
};
