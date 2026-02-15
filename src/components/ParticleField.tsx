import { useEffect, useRef } from "react";

const ParticleField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 5;
      const isGold = Math.random() > 0.5;

      particle.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${isGold ? "hsl(45, 80%, 55%)" : "hsl(280, 80%, 60%)"};
        box-shadow: 0 0 ${size * 2}px ${isGold ? "hsl(45, 80%, 55%)" : "hsl(280, 80%, 60%)"};
        animation: float ${duration}s ${delay}s ease-in infinite;
        pointer-events: none;
      `;

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    };

    const interval = setInterval(createParticle, 300);
    // Create initial batch
    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
};

export default ParticleField;
