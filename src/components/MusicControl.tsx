import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const TRACK_PATH = `${import.meta.env.BASE_URL}ku-aman-ada-lps.mp3`;

export function MusicControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [startedOnce, setStartedOnce] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;

    audio.volume = 0.48;
    try {
      await audio.play();
    } catch {
      // A visible control remains available when a browser rejects autoplay.
      setPlaying(false);
    }
  }, [unavailable]);

  useEffect(() => {
    // Best-effort audible autoplay. Browsers may reject this until a gesture.
    const timer = window.setTimeout(() => void startMusic(), 0);
    return () => window.clearTimeout(timer);
  }, [startMusic]);

  useEffect(() => {
    if (startedOnce || unavailable) return;

    const unlockOnFirstInteraction = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".music-control")) return;
      void startMusic();
    };

    window.addEventListener("click", unlockOnFirstInteraction);
    window.addEventListener("keydown", unlockOnFirstInteraction);
    return () => {
      window.removeEventListener("click", unlockOnFirstInteraction);
      window.removeEventListener("keydown", unlockOnFirstInteraction);
    };
  }, [startMusic, startedOnce, unavailable]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    if (audio.paused) {
      void startMusic();
    } else {
      audio.pause();
    }
  };

  const label = unavailable ? "Music unavailable" : playing ? "Pause music" : "Play music";

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK_PATH}
        preload="auto"
        autoPlay
        loop
        playsInline
        onPlay={() => {
          setPlaying(true);
          setStartedOnce(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />
      <motion.button
        className={`music-control${playing ? " is-playing" : ""}`}
        type="button"
        onClick={toggleMusic}
        aria-label={label}
        aria-pressed={playing}
        disabled={unavailable}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="music-control__bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span className="music-control__label">{label}</span>
      </motion.button>
    </>
  );
}
