import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  symbol: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const symbols = ['✦', '·', '♡', '✧', '•'];
    const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = reducedMotion ? 0 : isSmallScreen ? 8 : 24;
    const initialParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      size: Math.random() * 14 + 14,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.3,
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="particle-glow particle-glow-one absolute -top-[100px] -left-[100px] w-[400px] h-[400px] bg-[#ffd6e0] rounded-full blur-[80px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="particle-glow particle-glow-two absolute -bottom-[150px] -right-[100px] w-[500px] h-[500px] bg-[#ffc2d1] rounded-full blur-[100px] opacity-70 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="particle-glow particle-glow-three absolute top-[20%] right-[8%] w-[260px] h-[260px] bg-[#e6396e] rounded-full blur-[120px] opacity-25" />
      <div className="particle-glow particle-glow-four absolute bottom-[25%] left-[8%] w-[320px] h-[320px] bg-[#ffb3c6] rounded-full blur-[90px] opacity-40" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            bottom: '-40px',
            animation: `driftUpFloating ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </div>
      ))}

      <style>{`
        @keyframes driftUpFloating {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translateY(-115vh) translateX(30px) rotate(45deg); opacity: 0; }
        }

        @media (max-width: 760px) {
          .particle-glow { filter: none !important; opacity: 0.22 !important; }
          .particle-glow-one, .particle-glow-two { width: 220px !important; height: 220px !important; }
          .particle-glow-three, .particle-glow-four { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-glow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
