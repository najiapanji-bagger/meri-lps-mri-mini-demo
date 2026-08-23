import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import meriWaving from "../assets/meri/meri_waving.png";

const floatTransition = {
  duration: 5.4,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

export function MeriHero() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 80, damping: 18 });
  const y = useSpring(rawY, { stiffness: 80, damping: 18 });

  const reactToPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 16);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className="meri-hero"
      initial={{ opacity: 0, scale: 0.72, y: 54 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 105, delay: 0.22 }}
      onPointerMove={reactToPointer}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      <div className="meri-hero__orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <motion.div className="meri-hero__energy" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
      <motion.img
        className="meri-hero__image"
        src={meriWaving}
        alt="MERI, Media Risk Intelligence Assistant, waving"
        draggable={false}
        style={{ x, y }}
        animate={reduceMotion ? undefined : { translateY: [0, -11, 0], rotate: [0, 1.2, -0.8, 0] }}
        transition={floatTransition}
        whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97, rotate: -2 }}
      />
      <motion.div
        className="meri-hero__badge"
        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 1.15 }}
      >
        <span className="live-dot" />
        MERI ONLINE
      </motion.div>
    </motion.div>
  );
}
