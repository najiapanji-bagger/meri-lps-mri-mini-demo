import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Brand } from "./components/Brand";
import { Countdown } from "./components/Countdown";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { FloatingAssistant } from "./components/FloatingAssistant";
import { LockedReveal } from "./components/LockedReveal";
import { MeriHero } from "./components/MeriHero";
import { NeuralCanvas } from "./components/NeuralCanvas";
import { QrShare } from "./components/QrShare";

const TYPEWRITER_WORDS = ["signals", "narratives", "risks", "decisions"];

function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[wordIndex];
    const done = visible === word;
    const empty = visible === "";
    const delay = done && !deleting ? 1_250 : deleting ? 44 : 82;
    const timer = window.setTimeout(() => {
      if (done && !deleting) {
        setDeleting(true);
        return;
      }
      if (empty && deleting) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % TYPEWRITER_WORDS.length);
        return;
      }
      setVisible(deleting ? word.slice(0, Math.max(0, visible.length - 1)) : word.slice(0, visible.length + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, visible, wordIndex]);

  return <span className="typewriter-word">{visible}<i aria-hidden="true" /></span>;
}

function ScrollCue() {
  return (
    <a className="scroll-cue" href="#launch">
      <span>Scroll to initialize</span>
      <i><b /></i>
    </a>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="app-shell" id="top">
      <motion.div className="page-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <Brand />
        <div className="site-header__actions">
          <span><i /> MINI DEMO</span>
          <QrShare />
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <NeuralCanvas />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />

          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, x: -38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="mini-demo-pill" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.54 }}>
                <span /> THIS IS A MINI DEMO
              </motion.div>
              <h1 id="hero-title">
                <span>LPS MRI</span>
                <small>Media Risk Intelligence</small>
              </h1>
              <p className="hero-powered">Powered by <strong>MERI</strong></p>
              <p className="hero-lead">From external <TypewriterWord /><br />to strategic decisions.</p>
              <div className="hero-meta">
                <span>Mini Demo Experience</span>
                <i />
                <span>Festival Inovasi LPS 2026</span>
                <i />
                <span>by Tim KJD</span>
              </div>
              <div className="hero-actions">
                <motion.a href="#launch" className="primary-action" whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }} whileTap={{ scale: 0.97 }}>
                  Initialize experience <span>↘</span>
                </motion.a>
                <span className="workshop-date"><small>WORKSHOP</small><strong>09 · 09 · 2026</strong></span>
              </div>
            </motion.div>

            <div className="hero-meri-wrap">
              <MeriHero />
              <motion.div className="hero-float-card hero-float-card--left" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                <span>LIVE SIGNAL</span><strong>Narrative detected</strong><i>↗</i>
              </motion.div>
              <motion.div className="hero-float-card hero-float-card--right" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.34 }}>
                <span>MERI CORE</span><strong>Intelligence ready</strong><i className="ready-dot" />
              </motion.div>
            </div>
          </div>

          <ScrollCue />
          <div className="hero-index" aria-hidden="true"><span>01</span><i /><span>05</span></div>
        </section>

        <Countdown />
        <FeatureShowcase />
        <LockedReveal />

        <section className="finale-section" aria-labelledby="finale-title">
          <NeuralCanvas />
          <motion.div className="finale-content" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.35 }}>
            <span className="eyebrow"><i /> READY FOR TOMORROW?</span>
            <h2 id="finale-title">Something big<br /><em>is coming.</em></h2>
            <p>10 September 2026 · Festival Inovasi LPS 2026</p>
            <div className="finale-actions">
              <a href="#top" className="primary-action">Replay experience <span>↑</span></a>
              <QrShare />
            </div>
          </motion.div>
          <footer className="site-footer">
            <Brand compact />
            <span>Mini Demo Experience · Tim KJD</span>
            <small>© 2026 Festival Inovasi LPS</small>
          </footer>
        </section>
      </main>

      <FloatingAssistant />
    </div>
  );
}

export default App;
