import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import meriChat from "../assets/meri/meri_chat.png";

const messages = [
  "Hi, I'm MERI 👋",
  "Ready to explore LPS MRI?",
  "Full intelligence demo launches soon.",
];

export function FloatingAssistant() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessage((current) => (current + 1) % messages.length);
      setOpen(true);
    }, 5_400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside className="floating-meri" aria-label="MERI mini assistant">
      <AnimatePresence mode="wait">
        {open && (
          <motion.button
            className="floating-meri__bubble"
            key={message}
            type="button"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7, y: 14, x: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ type: "spring", stiffness: 230, damping: 18 }}
            onClick={() => setOpen(false)}
            aria-label="Minimize MERI message"
          >
            {messages[message]}
            <small>Tap to minimize</small>
          </motion.button>
        )}
      </AnimatePresence>
      <motion.button
        className="floating-meri__launcher"
        type="button"
        aria-label="Open MERI message"
        onClick={() => setOpen((current) => !current)}
        animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 3.8, repeat: Infinity }}
        whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="floating-meri__pulse" />
        <img src={meriChat} alt="MERI" />
      </motion.button>
    </aside>
  );
}
