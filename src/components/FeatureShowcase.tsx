import { motion, useReducedMotion } from "framer-motion";
import meriChat from "../assets/meri/meri_chat.png";
import meriDetective from "../assets/meri/meri_detective.png";
import meriThinking from "../assets/meri/meri_thinking.png";

type Feature = {
  index: string;
  title: string;
  copy: string;
  accent: string;
  visual: "media" | "risk" | "communication" | "ews";
};

const features: Feature[] = [
  {
    index: "01",
    title: "Media Monitoring",
    copy: "Detect emerging narratives",
    accent: "#63d6ff",
    visual: "media",
  },
  {
    index: "02",
    title: "Risk Intelligence",
    copy: "Transform signals into structured risk insight",
    accent: "#f58220",
    visual: "risk",
  },
  {
    index: "03",
    title: "Communication Strategy",
    copy: "Generate strategic response recommendations",
    accent: "#a899ff",
    visual: "communication",
  },
  {
    index: "04",
    title: "Early Warning System",
    copy: "Anticipate emerging risks",
    accent: "#52e1a8",
    visual: "ews",
  },
];

function MediaVisual() {
  return (
    <div className="feature-visual media-visual" aria-hidden="true">
      <div className="media-visual__signals">
        <motion.span animate={{ y: [0, -7, 0], rotate: [-2, 1, -2] }} transition={{ duration: 3.4, repeat: Infinity }}>Positive <i className="positive" /></motion.span>
        <motion.span animate={{ y: [0, 6, 0], rotate: [2, -1, 2] }} transition={{ duration: 4.1, repeat: Infinity }}>Neutral <i className="neutral" /></motion.span>
        <motion.span animate={{ y: [0, -5, 0], rotate: [1, -2, 1] }} transition={{ duration: 3.8, repeat: Infinity }}>Negative <i className="negative" /></motion.span>
      </div>
      <div className="news-stack">
        {["Signal detected", "Narrative rising", "Source verified"].map((text, index) => (
          <motion.div
            className="mini-news-card"
            key={text}
            animate={{ x: [0, index % 2 ? 5 : -4, 0], y: [0, -4, 0] }}
            transition={{ delay: index * 0.25, duration: 3 + index * 0.45, repeat: Infinity }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><i /><i /><i /></div>
            <strong>{text}</strong>
          </motion.div>
        ))}
      </div>
      <div className="media-pulse" />
    </div>
  );
}

function RiskVisual() {
  return (
    <div className="feature-visual risk-visual" aria-hidden="true">
      <div className="risk-radar">
        <span /><span /><span />
        <motion.i animate={{ rotate: 360 }} transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }} />
        <b>RISK<br />MAPPED</b>
      </div>
      <div className="risk-bars">
        {[62, 82, 48, 71].map((value, index) => (
          <div key={value}><span /><motion.i initial={{ width: 0 }} whileInView={{ width: `${value}%` }} transition={{ delay: index * 0.12, duration: 0.8 }} /></div>
        ))}
      </div>
    </div>
  );
}

function CommunicationVisual() {
  return (
    <div className="feature-visual communication-visual" aria-hidden="true">
      <motion.img src={meriChat} alt="" animate={{ y: [0, -7, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 4, repeat: Infinity }} />
      <div className="chat-flow">
        <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>Signal understood.</motion.div>
        <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>Response prepared <span>•••</span></motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}><i /> Strategic recommendation ready</motion.div>
      </div>
    </div>
  );
}

function EwsVisual() {
  const nodes = [
    { x: 48, y: 42 }, { x: 118, y: 26 }, { x: 176, y: 66 }, { x: 93, y: 103 },
    { x: 205, y: 122 }, { x: 36, y: 142 }, { x: 139, y: 156 },
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 2], [2, 4], [3, 5], [3, 6], [6, 4]];

  return (
    <div className="feature-visual ews-visual" aria-hidden="true">
      <svg viewBox="0 0 250 190">
        {edges.map(([a, b], index) => (
          <motion.line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.58 }}
            transition={{ delay: index * 0.08, duration: 0.7 }}
          />
        ))}
        {nodes.map((node, index) => (
          <g key={`${node.x}-${node.y}`}>
            <motion.circle cx={node.x} cy={node.y} r="10" animate={{ r: [8, 12, 8], opacity: [0.35, 0.8, 0.35] }} transition={{ delay: index * 0.18, duration: 2.6, repeat: Infinity }} className="node-halo" />
            <circle cx={node.x} cy={node.y} r="4" className={index === 4 ? "node-hot" : "node-core"} />
          </g>
        ))}
        <motion.circle r="3" className="moving-signal" animate={{ cx: [48, 118, 176, 205], cy: [42, 26, 66, 122] }} transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }} />
      </svg>
      <div className="ews-status"><i /> EARLY SIGNAL DETECTED</div>
    </div>
  );
}

function FeatureVisual({ type }: { type: Feature["visual"] }) {
  if (type === "media") return <MediaVisual />;
  if (type === "risk") return <RiskVisual />;
  if (type === "communication") return <CommunicationVisual />;
  return <EwsVisual />;
}

export function FeatureShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="features-section" id="signals" aria-labelledby="features-title">
      <div className="section-heading">
        <motion.span className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><i /> FOUR SIGNALS. ONE INTELLIGENCE FLOW.</motion.span>
        <motion.h2 id="features-title" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>A glimpse of what<br /><em>MERI can see.</em></motion.h2>
        <p>No full dashboard. No spoilers. Just enough signal to know something big is coming.</p>
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <motion.article
            className={`feature-card feature-card--${feature.visual}`}
            key={feature.title}
            style={{ "--feature-accent": feature.accent } as React.CSSProperties}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 44, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -7, scale: 1.008 }}
          >
            <div className="feature-card__top">
              <span>{feature.index}</span>
              <i>TEASER MODE</i>
            </div>
            <FeatureVisual type={feature.visual} />
            <div className="feature-card__copy">
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <span className="feature-card__line"><i /></span>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div className="feature-meri-cameo" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <img src={meriThinking} alt="MERI thinking about incoming intelligence signals" />
        <div>
          <span>MERI IS THINKING</span>
          <strong>Four capabilities.<br />One connected perspective.</strong>
        </div>
      </motion.div>

      <motion.div className="feature-detective-cameo" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <img src={meriDetective} alt="MERI detecting media intelligence signals" />
        <span>Every signal leaves a trail.</span>
      </motion.div>
    </section>
  );
}
