import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.7 10.7 6.6-4.1M8.7 13.3l6.6 4.1" />
    </svg>
  );
}

export function QrShare() {
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState("");
  const targetUrl = useMemo(() => {
    if (typeof window === "undefined") return "https://lpsmri.online/minidemo";
    return `${window.location.origin}/minidemo`;
  }, []);

  useEffect(() => {
    QRCode.toDataURL(targetUrl, {
      width: 420,
      margin: 2,
      color: { dark: "#071c36", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setQr).catch(() => setQr(""));
  }, [targetUrl]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <motion.button className="share-button" type="button" onClick={() => setOpen(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
        <ShareIcon />
        <span>Open on mobile</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="qr-modal__card" initial={{ opacity: 0, scale: 0.84, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 20 }} onClick={(event) => event.stopPropagation()}>
              <button className="qr-modal__close" type="button" onClick={() => setOpen(false)} aria-label="Close QR code">×</button>
              <span className="eyebrow"><i /> TAKE MERI WITH YOU</span>
              <h2 id="qr-title">Scan the signal.</h2>
              <p>Open the mini demo on your phone. No login required.</p>
              <div className="qr-modal__code">{qr ? <img src={qr} alt={`QR code for ${targetUrl}`} /> : <span>Preparing QR...</span>}</div>
              <small>{targetUrl}</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
