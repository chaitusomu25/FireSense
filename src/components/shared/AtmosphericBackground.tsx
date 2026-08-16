import React, { useEffect, useRef } from 'react';

interface AtmosphericBackgroundProps {
  intensity?: 'high' | 'medium' | 'subtle';
  showParticles?: boolean;
}

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({
  intensity = 'medium',
  showParticles = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!showParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition: drifting glowing warm embers & bio-spores
    const particleCount = intensity === 'high' ? 32 : intensity === 'medium' ? 20 : 12;
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      fadeSpeed: number;
      maxAlpha: number;
    }[] = [];

    const colors = [
      'rgba(249, 115, 22, ', // Fiery Orange
      'rgba(251, 146, 60, ', // Amber
      'rgba(239, 68, 68, ',  // Crimson
      'rgba(16, 185, 129, ', // Forest Emerald
      'rgba(56, 189, 248, ', // Satellite Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.5 - 0.15, // Drift upward like embers
        alpha: Math.random() * 0.7 + 0.1,
        fadeSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.6 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.fadeSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Reset particle if it leaves the screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1, p.alpha * 1.5)})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, showParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Space Midnight Canvas Background */}
      <div className="absolute inset-0 bg-[#050811]" />

      {/* 2. Fiery Thermal Nebula Aurora (Top-Right) */}
      <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,rgba(239,68,68,0.06)_45%,transparent_70%)] blur-[120px] animate-pulse-slow" />

      {/* 3. Deep Boreal Forest Aurora (Bottom-Left) */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.10)_0%,rgba(6,95,70,0.04)_50%,transparent_70%)] blur-[140px]" />

      {/* 4. Satellite Telemetry Cyan Beam (Center High) */}
      <div className="absolute top-[35%] left-[20%] w-[45vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.05)_0%,transparent_65%)] blur-[100px]" />

      {/* 5. Canvas with Floating Embers / Bio-Spores */}
      {showParticles && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />}

      {/* 6. Vignette Edge Softening */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(5,8,17,0.85)_100%)]" />
    </div>
  );
};
