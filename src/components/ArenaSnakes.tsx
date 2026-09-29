import { useEffect, useRef } from "react";

type Snake = { x: number; y: number; angle: number; turn: number; speed: number; color: string; trail: { x: number; y: number }[] };

const COLORS = ["#34d399", "#fb7185", "#22d3ee", "#a78bfa"];

export function ArenaSnakes() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, frame = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const snakes: Snake[] = COLORS.map((color, i) => ({
      x: Math.random() * w, y: Math.random() * h, angle: Math.random() * Math.PI * 2,
      turn: 0, speed: 0.7 + i * 0.12, color, trail: [],
    }));
    const orbs = Array.from({ length: 18 }, () => ({ x: Math.random() * w, y: Math.random() * h, p: Math.random() * 6 }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbs) {
        const a = 0.35 + 0.25 * Math.sin(t / 700 + o.p);
        ctx.fillStyle = `rgba(250, 204, 21, ${a})`;
        ctx.beginPath(); ctx.arc(o.x, o.y, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      for (const s of snakes) {
        s.turn += (Math.random() - 0.5) * 0.02;
        s.turn *= 0.96;
        s.angle += s.turn;
        s.x += Math.cos(s.angle) * s.speed; s.y += Math.sin(s.angle) * s.speed;
        const m = 40;
        if (s.x < -m) s.x = w + m; if (s.x > w + m) s.x = -m;
        if (s.y < -m) s.y = h + m; if (s.y > h + m) s.y = -m;
        s.trail.unshift({ x: s.x, y: s.y });
        if (s.trail.length > 110) s.trail.pop();
        for (let i = s.trail.length - 1; i >= 0; i -= 3) {
          const p = s.trail[i];
          if (i > 0 && Math.abs(p.x - s.trail[i - 1].x) > 50) continue;
          ctx.globalAlpha = 0.55 * (1 - i / s.trail.length) + 0.15;
          ctx.fillStyle = s.color;
          ctx.beginPath(); ctx.arc(p.x, p.y, 10 - (i / s.trail.length) * 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowColor = s.color; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(s.x, s.y, 11, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="arena-snakes" aria-hidden="true" />;
}
