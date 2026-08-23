import { motion } from "framer-motion";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <motion.a
      className={`brand ${compact ? "brand--compact" : ""}`}
      href="#top"
      aria-label="LPS MRI mini demo home"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="brand__mark">LPS</span>
      <span className="brand__copy">
        <strong>LPS MRI</strong>
        <small>Media Risk Intelligence</small>
      </span>
    </motion.a>
  );
}
