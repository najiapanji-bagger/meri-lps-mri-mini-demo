import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  tone: "blue" | "orange";
};

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 720px)").matches;
    const particleCount = compact ? 28 : 58;
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];

    const seed = (index: number, salt: number) => {
      const value = Math.sin(index * 177.31 + salt * 91.17) * 10_000;
      return value - Math.floor(value);
    };

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, (_, index) => ({
        x: seed(index, 1) * width,
        y: seed(index, 2) * height,
        vx: (seed(index, 3) - 0.5) * (compact ? 0.22 : 0.34),
        vy: (seed(index, 4) - 0.5) * (compact ? 0.22 : 0.34),
        radius: 1 + seed(index, 5) * 1.7,
        tone: index % 9 === 0 ? "orange" : "blue",
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.7;

      for (let first = 0; first < particles.length; first += 1) {
        const a = particles[first];
        for (let second = first + 1; second < particles.length; second += 1) {
          const b = particles[second];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const limit = compact ? 92 : 138;
          if (distance < limit) {
            const opacity = (1 - distance / limit) * 0.23;
            context.strokeStyle = `rgba(107, 211, 255, ${opacity})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }

        const pointerDx = pointer.x - a.x;
        const pointerDy = pointer.y - a.y;
        const pointerDistance = Math.sqrt(pointerDx * pointerDx + pointerDy * pointerDy);
        if (pointerDistance < 180 && pointerDistance > 1 && !reducedMotion) {
          a.vx -= (pointerDx / pointerDistance) * 0.0025;
          a.vy -= (pointerDy / pointerDistance) * 0.0025;
        }

        if (!reducedMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -10) a.x = width + 10;
          if (a.x > width + 10) a.x = -10;
          if (a.y < -10) a.y = height + 10;
          if (a.y > height + 10) a.y = -10;
          a.vx *= 0.999;
          a.vy *= 0.999;
        }

        context.fillStyle = a.tone === "orange" ? "rgba(255, 139, 45, .88)" : "rgba(126, 220, 255, .72)";
        context.shadowBlur = a.tone === "orange" ? 14 : 9;
        context.shadowColor = a.tone === "orange" ? "#f58220" : "#50cbff";
        context.beginPath();
        context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      frame += 1;
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      void frame;
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}
