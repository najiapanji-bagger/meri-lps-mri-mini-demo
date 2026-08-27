import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { formatCountdownValue, getCountdownParts } from "../lib/countdown";

const systemMessages = [
  "Initializing MERI...",
  "Loading Media Intelligence...",
  "Mapping Risk Framework...",
  "Connecting Strategic Signals...",
  "Preparing Demo Experience...",
  "Intelligence system ready.",
];

function FlipUnit({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const formatted = formatCountdownValue(value);

  return (
    <div className="flip-unit">
      <div className="flip-card" aria-label={`${value} ${label}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={reduceMotion ? { opacity: 1 } : { rotateX: -82, opacity: 0, y: -10 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { rotateX: 82, opacity: 0, y: 10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
        <div className="flip-card__line" />
        <div className="flip-card__sparks" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => <i key={`${formatted}-${index}`} />)}
        </div>
      </div>
      <small>{label}</small>
    </div>
  );
}

export function Countdown() {
  const [now, setNow] = useState(() => new Date());
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const countdown = useMemo(() => getCountdownParts(now), [now]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const started = Date.now();
    const duration = 9_200;
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      setMessageIndex(Math.min(systemMessages.length - 1, Math.floor((next / 101) * systemMessages.length)));
      if (next >= 100) window.clearInterval(timer);
    }, 90);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section reveal-section" id="launch" aria-labelledby="countdown-title">
      <div className="section-orb section-orb--orange" aria-hidden="true" />
      <div className="countdown-card glass-panel">
        <motion.div
          className="countdown-card__intro"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="eyebrow"><i /> THE SIGNAL IS ALMOST READY</span>
          <h2 id="countdown-title">Demo Launch</h2>
          <p className="launch-date">09.09.2026 <span>·</span> 10:00 WIB</p>
        </motion.div>

        <div className="countdown-grid" aria-live="polite">
          <FlipUnit value={countdown.days} label="Days" />
          <FlipUnit value={countdown.hours} label="Hours" />
          <FlipUnit value={countdown.minutes} label="Minutes" />
          <FlipUnit value={countdown.seconds} label="Seconds" />
        </div>

        <div className="system-loader">
          <div className="system-loader__head">
            <AnimatePresence mode="wait">
              <motion.span key={messageIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                {countdown.complete ? "LPS MRI is ready." : systemMessages[messageIndex]}
              </motion.span>
            </AnimatePresence>
            <strong>{countdown.complete ? 100 : progress}%</strong>
          </div>
          <div className="system-loader__track">
            <motion.div className="system-loader__fill" animate={{ width: `${countdown.complete ? 100 : progress}%` }} transition={{ ease: "easeOut" }}>
              <i />
            </motion.div>
          </div>
          <div className="system-loader__meta">
            <span>Preparing LPS MRI Intelligence System</span>
            <span className="encrypted-label">ENCRYPTED SIGNAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
