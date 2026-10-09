import { useMemo, type CSSProperties } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

/** Drifting bioluminescent plankton — pure CSS, GPU-cheap. */
export default function Particles({ count = 24, className = "" }: ParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 14,
        duration: Math.random() * 16 + 16,
        opacity: Math.random() * 0.45 + 0.25,
      })),
    [count]
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--p-opacity": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
