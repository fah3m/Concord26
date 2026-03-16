import { useEffect, useRef } from "react";

// Big fragments — each covers ~50–58% of viewport dimension
const FRAGMENTS = [
  { fx: 0.18, fy: 0.24, r: 245, g: 195, b: 40, size: 0.58, seed: 11 }, // gold   top-left
  { fx: 0.82, fy: 0.22, r: 215, g: 80, b: 25, size: 0.52, seed: 22 }, // orange top-right
  { fx: 0.18, fy: 0.76, r: 190, g: 50, b: 18, size: 0.55, seed: 33 }, // burnt  bottom-left
  { fx: 0.8, fy: 0.76, r: 232, g: 138, b: 12, size: 0.5, seed: 44 }, // amber  bottom-right
];

// 4 scroll phases — one per page
// Page 1: 0.00–0.25  full blob
// Page 2: 0.25–0.50  disintegration
// Page 3: 0.50–0.75  fragments settled at corners
// Page 4: 0.75–1.00  fragments drift to edges and grow
const T_P1_END = 0;
const T_P2_END = 0.8;
const T_P3_END = 0.8;

const ORIGIN_X = 0.65;
const ORIGIN_Y = 0.5;

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function easeOut3(t) {
  return 1 - (1 - t) ** 3;
}
function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function sr(seed, i) {
  const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function glow(ctx, cx, cy, radius, r, g, b, alpha) {
  if (radius < 1 || alpha <= 0) return;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, `rgba(${r},${g},${b},${alpha.toFixed(3)})`);
  grad.addColorStop(0.35, `rgba(${r},${g},${b},${(alpha * 0.75).toFixed(3)})`);
  grad.addColorStop(0.65, `rgba(${r},${g},${b},${(alpha * 0.35).toFixed(3)})`);
  grad.addColorStop(0.85, `rgba(${r},${g},${b},${(alpha * 0.1).toFixed(3)})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
}

function drawMainBlob(ctx, cx, cy, size, alpha = 1) {
  const s = size;
  glow(ctx, cx + s * 0.15, cy - s * 0.05, s * 1.3, 90, 50, 110, 0.55 * alpha);
  glow(ctx, cx + s * 0.05, cy + s * 0.05, s * 0.9, 200, 55, 50, 0.7 * alpha);
  glow(ctx, cx - s * 0.1, cy + s * 0.08, s * 0.75, 230, 100, 20, 0.65 * alpha);
  glow(ctx, cx - s * 0.05, cy + s * 0.02, s * 0.55, 220, 80, 45, 0.5 * alpha);
  glow(ctx, cx - s * 0.22, cy - s * 0.18, s * 0.5, 245, 195, 40, 0.85 * alpha);
}

function drawFragment(ctx, cx, cy, size, r, g, b, alpha = 1, seed = 0) {
  const r2 = clamp(r - 40, 0, 255),
    g2 = clamp(g - 30, 0, 255),
    b2 = clamp(b + 20, 0, 255);
  const r3 = clamp(r + 20, 0, 255),
    g3 = clamp(g + 40, 0, 255),
    b3 = clamp(b - 10, 0, 255);
  const layers = [
    [
      (sr(seed, 0) - 0.5) * size * 0.55,
      (sr(seed, 1) - 0.5) * size * 0.55,
      1.3,
      r2,
      g2,
      b2,
      0.3,
    ],
    [
      (sr(seed, 2) - 0.5) * size * 0.4,
      (sr(seed, 3) - 0.5) * size * 0.4,
      1.05,
      r,
      g,
      b,
      0.68,
    ],
    [
      (sr(seed, 4) - 0.5) * size * 0.3,
      (sr(seed, 5) - 0.5) * size * 0.3,
      0.75,
      r,
      g,
      b,
      0.58,
    ],
    [
      (sr(seed, 6) - 0.5) * size * 0.22,
      (sr(seed, 7) - 0.5) * size * 0.22,
      0.45,
      r3,
      g3,
      b3,
      0.85,
    ],
    [
      (sr(seed, 8) - 0.5) * size * 0.15,
      (sr(seed, 9) - 0.5) * size * 0.15,
      0.24,
      r3,
      g3,
      b3,
      0.95,
    ],
  ];
  layers.forEach(([ox, oy, rs, lr, lg, lb, la]) => {
    glow(ctx, cx + ox, cy + oy, size * rs, lr, lg, lb, la * alpha);
  });
}

// Page 4 fragment positions — pushed further to edges, slightly larger
const FRAGMENTS_P4 = [
  { fx: 0.08, fy: 0.16, size: 0.68 },
  { fx: 0.92, fy: 0.14, size: 0.62 },
  { fx: 0.08, fy: 0.84, size: 0.65 },
  { fx: 0.9, fy: 0.84, size: 0.6 },
];

function getScrollPct() {
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  return max > 0 ? clamp(el.scrollTop / max, 0, 1) : 0;
}

export default function BlobBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener(
      "scroll",
      () => {
        scrollRef.current = getScrollPct();
      },
      { passive: true },
    );

    let lastT = -1;

    function render() {
      smoothRef.current += (scrollRef.current - smoothRef.current) * 0.08;
      const t = smoothRef.current;

      if (Math.abs(t - lastT) < 0.0003) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastT = t;

      const W = canvas.width;
      const H = canvas.height;
      const bx = ORIGIN_X * W;
      const by = ORIGIN_Y * H;
      const SIZE = Math.min(W, H) * 0.62;

      ctx.fillStyle = "#18160f";
      ctx.fillRect(0, 0, W, H);

      if (t < T_P1_END) {
        // ── PAGE 1 (0–25%): Full blob intact ──────────────────────────
        drawMainBlob(ctx, bx, by, SIZE);
      } else if (t < T_P2_END) {
        // ── PAGE 2 (25–50%): Disintegration ───────────────────────────
        const lp = (t - T_P1_END) / (T_P2_END - T_P1_END); // 0..1

        // Main blob fades out in first 40% of this phase
        const mf = clamp(1 - lp / 0.4, 0, 1);
        const sh = 1 - lp * 0.6;
        if (mf > 0.005) drawMainBlob(ctx, bx, by, SIZE * sh, mf);

        // Fragments peel off staggered, travel to P3 corner positions
        FRAGMENTS.forEach((f, i) => {
          const delay = i * 0.14;
          const ft = clamp((lp - delay) / (1 - delay), 0, 1);
          const ease = easeOut3(ft);
          const ex = f.fx * W;
          const ey = f.fy * H;
          const mx = lerp(bx, ex, 0.45) + (i % 2 === 0 ? 1 : -1) * W * 0.06;
          const my = lerp(by, ey, 0.45) + (i < 2 ? -1 : 1) * H * 0.08;
          const px = lerp(lerp(bx, mx, ease), lerp(mx, ex, ease), ease);
          const py = lerp(lerp(by, my, ease), lerp(my, ey, ease), ease);
          const fi = ft < 0.12 ? ft / 0.12 : 1;
          const sz = Math.min(W, H) * f.size * Math.min(1, ft * 2.0);
          drawFragment(ctx, px, py, sz, f.r, f.g, f.b, fi, f.seed);
        });
      } else if (t < T_P3_END) {
        // ── PAGE 3 (50–75%): Fragments settled at corners ─────────────
        FRAGMENTS.forEach((f) => {
          const sz = Math.min(W, H) * f.size;
          drawFragment(ctx, f.fx * W, f.fy * H, sz, f.r, f.g, f.b, 1, f.seed);
        });
      } else {
        // ── PAGE 4 (75–100%): Fragments drift to edges and grow ────────
        const lp = (t - T_P3_END) / (1 - T_P3_END); // 0..1
        const ease = easeOut3(lp);

        FRAGMENTS.forEach((f, i) => {
          const p4 = FRAGMENTS_P4[i];
          // Interpolate position from P3 → P4
          const cx = lerp(f.fx * W, p4.fx * W, ease);
          const cy = lerp(f.fy * H, p4.fy * H, ease);
          const sz = Math.min(W, H) * lerp(f.size, p4.size, ease);
          drawFragment(ctx, cx, cy, sz, f.r, f.g, f.b, 1, f.seed);
        });
      }

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            seed="12"
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix type="saturate" values="0" in="n" result="g" />
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b" />
          <feComposite in="b" in2="SourceGraphic" operator="atop" />
        </filter>
        <rect
          width="100%"
          height="100%"
          fill="#18160f"
          filter="url(#grain)"
          opacity="0.11"
        />
      </svg>
    </>
  );
}
