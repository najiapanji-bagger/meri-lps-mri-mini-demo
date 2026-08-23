import { motion, useReducedMotion } from "framer-motion";
import meriJump from "../assets/meri/meri_jump.png";

const lockedItems = ["Advanced Risk Intelligence", "Executive Dashboard", "Full Demo Experience"];

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" />
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <circle cx="12" cy="15.5" r="1.2" />
    </svg>
  );
}

export function LockedReveal() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="locked-section" id="surprise" aria-labelledby="locked-title">
      <div className="locked-section__glow" aria-hidden="true" />
      <div className="section-heading section-heading--center">
        <span className="eyebrow"><i /> CLASSIFIED UNTIL LAUNCH</span>
        <h2 id="locked-title">The full intelligence layer<br /><em>stays under wraps.</em></h2>
        <p>Today is the signal. Tomorrow is the reveal.</p>
      </div>

      <div className="locked-grid">
        {lockedItems.map((item, index) => (
          <motion.div
            className="locked-card"
            key={item}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.86, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.14, duration: 0.62 }}
            whileHover={reduceMotion ? undefined : { y: -7, rotateX: 2 }}
          >
            <div className="locked-card__scan" />
            <LockIcon />
            <strong>{item}</strong>
            <span>COMING SOON</span>
            <small>10 · 09 · 2026</small>
          </motion.div>
        ))}
      </div>

      <motion.div className="locked-meri" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <motion.img src={meriJump} alt="MERI jumping with excitement for the launch" animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 2.8, repeat: Infinity }} />
        <div><strong>See you at the full reveal!</strong><span>Festival Inovasi LPS 2026 · Tim KJD</span></div>
      </motion.div>
    </section>
  );
}
