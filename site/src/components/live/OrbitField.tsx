import { useEffect, useRef } from 'react';
import { reducedMotion } from './hooks';

/**
 * Canvas particle field: hundreds of gold & silver particles on tilted elliptical
 * orbits — a living version of the orbit in the VS logo. Reacts to the cursor.
 */
const OrbitField = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    type P = { a: number; r: number; tilt: number; t: number; v: number; s: number; gold: boolean };
    let ps: P[] = [];

    const seed = () => {
      const n = w < 768 ? 380 : 900;
      const R = Math.min(w, h) * (w < 768 ? 0.62 : 0.5);
      ps = Array.from({ length: n }, () => {
        const a = R * (0.25 + Math.pow(Math.random(), 0.8) * 0.9);
        return {
          a,
          r: 0.26 + Math.random() * 0.16,
          tilt: -0.34 + (Math.random() - 0.5) * 0.22,
          t: Math.random() * Math.PI * 2,
          v: (0.0016 + Math.random() * 0.0024) * Math.sqrt(R / a),
          s: Math.random() * 1.3 + 0.35,
          gold: Math.random() < 0.42,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const cx = (w < 1024 ? w * 0.5 : w * 0.7) + mouse.x * 30;
      const cy = h * 0.5 + mouse.y * 20;
      const tiltShift = mouse.x * 0.12;

      // motion-blur trail
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(9, 9, 11, 0.22)';
      ctx.fillRect(0, 0, w, h);

      // core glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.32);
      g.addColorStop(0, 'rgba(214,178,106,0.10)');
      g.addColorStop(1, 'rgba(214,178,106,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const p of ps) {
        p.t += p.v;
        const th = p.tilt + tiltShift;
        const ca = Math.cos(p.t), sa = Math.sin(p.t);
        const b = p.a * p.r;
        const x = cx + p.a * ca * Math.cos(th) - b * sa * Math.sin(th);
        const y = cy + p.a * ca * Math.sin(th) + b * sa * Math.cos(th);
        const depth = (sa + 1) / 2; // front of orbit = brighter, bigger
        const alpha = 0.15 + depth * 0.75;
        const size = p.s * (0.6 + depth * 0.8);
        ctx.fillStyle = p.gold ? `rgba(226,190,118,${alpha})` : `rgba(206,210,222,${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // the logo's orbit ring + satellite
      ctx.globalCompositeOperation = 'source-over';
      const RA = Math.min(w, h) * (w < 768 ? 0.46 : 0.38);
      const th = -0.34 + tiltShift;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(th);
      ctx.strokeStyle = 'rgba(214,178,106,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, RA, RA * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
      const st = performance.now() * 0.00035;
      ctx.fillStyle = '#d6b26a';
      ctx.shadowColor = '#d6b26a';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(Math.cos(st) * RA, Math.sin(st) * RA * 0.34, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(235,235,240,0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, RA * 0.78, 0, Math.PI * 2);
      ctx.stroke();

      if (running) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting && !reducedMotion();
      if (vis && !running) { running = true; raf = requestAnimationFrame(draw); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    });

    resize();
    if (reducedMotion()) {
      running = false;
      for (let i = 0; i < 40; i++) draw(); // static frame
    } else {
      raf = requestAnimationFrame(draw);
    }
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
};

export default OrbitField;
