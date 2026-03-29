import { useEffect, useRef } from "react";

// ─── Config ──────────────────────────────────────────────────────────────────
const FRAGMENTS = [
  { fx: 0.18, fy: 0.24, r: 140, g: 90, b: 12, size: 0.58, seed: 11 },
  { fx: 0.82, fy: 0.22, r: 110, g: 30, b: 10, size: 0.52, seed: 22 },
  { fx: 0.18, fy: 0.76, r: 95, g: 20, b: 8, size: 0.55, seed: 33 },
  { fx: 0.8, fy: 0.76, r: 125, g: 55, b: 5, size: 0.5, seed: 44 },
];
const FRAGMENTS_P4 = [
  { fx: 0.08, fy: 0.16, size: 0.68 },
  { fx: 0.92, fy: 0.14, size: 0.62 },
  { fx: 0.08, fy: 0.84, size: 0.65 },
  { fx: 0.9, fy: 0.84, size: 0.6 },
];

const T_P1 = 1 / 6;
const T_P2 = 2 / 6;
const T_P3 = 3 / 6;
const T_P4 = 4 / 6;
const T_P5 = 5 / 6;

const CORNERS = [
  { x: 0.0, y: 1.0 }, // bottom-left
  { x: 1.0, y: 0.0 }, // top-right
  { x: 1.0, y: 1.0 }, // bottom-right
  { x: 0.0, y: 0.0 }, // top-left
];

const ORIGIN_X = 0.75,
  ORIGIN_Y = 0.5;
const ORANGE_SIZE_FULL = 0.88;

const IS_LOW_END = navigator.hardwareConcurrency <= 4;
const SCALE = IS_LOW_END ? 0.35 : 0.55;
const SKIP_DELTA = IS_LOW_END ? 0.0015 : 0.0003;
const SMOOTH_FACTOR = IS_LOW_END ? 0.1 : 0.08;
const GRAIN_OPACITY = IS_LOW_END ? "0.12" : "0.15";

// ─── Math helpers ─────────────────────────────────────────────────────────────
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

// ─── Pre-baked offscreen blob cache ──────────────────────────────────────────
const glowCache = new Map();

function getCachedGlow(radius, r, g, b) {
  const qr = Math.max(8, Math.round(radius / 8) * 8);
  const key = `${qr}|${r}|${g}|${b}`;
  if (glowCache.has(key)) return glowCache.get(key);

  const size = qr * 2 + 2;
  const oc = document.createElement("canvas");
  oc.width = size;
  oc.height = size;
  const oc2 = oc.getContext("2d");
  const cx = size / 2,
    cy = size / 2;

  const grad = oc2.createRadialGradient(cx, cy, 0, cx, cy, qr);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.35, `rgba(${r},${g},${b},0.72)`);
  grad.addColorStop(0.65, `rgba(${r},${g},${b},0.30)`);
  grad.addColorStop(0.85, `rgba(${r},${g},${b},0.08)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  oc2.fillStyle = grad;
  oc2.fillRect(0, 0, size, size);

  if (glowCache.size > 200) glowCache.delete(glowCache.keys().next().value);
  glowCache.set(key, oc);
  return oc;
}

function glow(ctx, cx, cy, radius, r, g, b, alpha) {
  if (radius < 4 || alpha <= 0) return;
  const oc = getCachedGlow(radius, r, g, b);
  ctx.globalAlpha = alpha;
  ctx.drawImage(oc, cx - oc.width / 2, cy - oc.height / 2);
  ctx.globalAlpha = 1;
}

// ─── Draw functions ───────────────────────────────────────────────────────────
function drawMainBlob(ctx, cx, cy, size, alpha = 1) {
  const s = size;
  glow(ctx, cx + s * 0.15, cy - s * 0.05, s * 1.3, 35, 15, 50, 0.45 * alpha);
  glow(ctx, cx + s * 0.05, cy + s * 0.05, s * 0.9, 105, 25, 20, 0.6 * alpha);
  glow(ctx, cx - s * 0.1, cy + s * 0.08, s * 0.75, 120, 48, 8, 0.55 * alpha);
  glow(ctx, cx - s * 0.05, cy + s * 0.02, s * 0.55, 110, 35, 15, 0.4 * alpha);
  glow(ctx, cx - s * 0.22, cy - s * 0.18, s * 0.5, 140, 95, 18, 0.75 * alpha);
}

function drawFragment(ctx, cx, cy, size, r, g, b, alpha = 1, seed = 0) {
  const r2 = clamp(r - 40, 0, 255),
    g2 = clamp(g - 30, 0, 255),
    b2 = clamp(b + 15, 0, 255);
  const r3 = clamp(r + 15, 0, 255),
    g3 = clamp(g + 30, 0, 255),
    b3 = clamp(b - 5, 0, 255);
  const layers = IS_LOW_END
    ? [
        [
          (sr(seed, 0) - 0.5) * size * 0.5,
          (sr(seed, 1) - 0.5) * size * 0.5,
          1.2,
          r2,
          g2,
          b2,
          0.28,
        ],
        [
          (sr(seed, 2) - 0.5) * size * 0.35,
          (sr(seed, 3) - 0.5) * size * 0.35,
          0.9,
          r,
          g,
          b,
          0.65,
        ],
        [
          (sr(seed, 8) - 0.5) * size * 0.15,
          (sr(seed, 9) - 0.5) * size * 0.15,
          0.3,
          r3,
          g3,
          b3,
          0.88,
        ],
      ]
    : [
        [
          (sr(seed, 0) - 0.5) * size * 0.55,
          (sr(seed, 1) - 0.5) * size * 0.55,
          1.3,
          r2,
          g2,
          b2,
          0.26,
        ],
        [
          (sr(seed, 2) - 0.5) * size * 0.4,
          (sr(seed, 3) - 0.5) * size * 0.4,
          1.05,
          r,
          g,
          b,
          0.62,
        ],
        [
          (sr(seed, 4) - 0.5) * size * 0.3,
          (sr(seed, 5) - 0.5) * size * 0.3,
          0.75,
          r,
          g,
          b,
          0.52,
        ],
        [
          (sr(seed, 6) - 0.5) * size * 0.22,
          (sr(seed, 7) - 0.5) * size * 0.22,
          0.45,
          r3,
          g3,
          b3,
          0.78,
        ],
        [
          (sr(seed, 8) - 0.5) * size * 0.15,
          (sr(seed, 9) - 0.5) * size * 0.15,
          0.24,
          r3,
          g3,
          b3,
          0.9,
        ],
      ];
  layers.forEach(([ox, oy, rs, lr, lg, lb, la]) => {
    glow(ctx, cx + ox, cy + oy, size * rs, lr, lg, lb, la * alpha);
  });
}

// ─── Scroll ───────────────────────────────────────────────────────────────────
function getScrollPct() {
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  return max > 0 ? clamp(el.scrollTop / max, 0, 1) : 0;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BlobBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    });

    function resize() {
      canvas.width = Math.round(window.innerWidth * SCALE);
      canvas.height = Math.round(window.innerHeight * SCALE);
      glowCache.clear();
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
      smoothRef.current +=
        (scrollRef.current - smoothRef.current) * SMOOTH_FACTOR;
      const t = smoothRef.current;

      if (Math.abs(t - lastT) < SKIP_DELTA) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastT = t;

      const W = canvas.width;
      const H = canvas.height;
      const bx = ORIGIN_X * W;
      const by = ORIGIN_Y * H;
      const SIZE = Math.min(W, H) * 0.62;
      const diag = Math.sqrt(W * W + H * H);

      // Darker background
      ctx.fillStyle = "#0c0a05";
      ctx.fillRect(0, 0, W, H);

      // Deeper, darker burnt-amber blob
      function drawOrangeAtCorner(cx, cy, sz, alpha = 1) {
        glow(ctx, cx, cy, sz * 1.0, 40, 8, 4, 0.35 * alpha);
        glow(ctx, cx, cy, sz * 0.8, 95, 25, 8, 0.48 * alpha);
        glow(ctx, cx, cy, sz * 0.58, 120, 42, 12, 0.62 * alpha);
        glow(ctx, cx, cy, sz * 0.38, 138, 70, 7, 0.76 * alpha);
        glow(ctx, cx, cy, sz * 0.2, 152, 100, 16, 0.88 * alpha);
      }

      function cornerPos(ci) {
        return { x: CORNERS[ci].x * W, y: CORNERS[ci].y * H };
      }

      if (t < T_P1) {
        drawMainBlob(ctx, bx, by, SIZE);
      } else if (t < T_P2) {
        const lp = (t - T_P1) / (T_P2 - T_P1);
        const ease = easeOut3(lp);
        const mf = clamp(1 - lp / 0.35, 0, 1);
        if (mf > 0.01) drawMainBlob(ctx, bx, by, SIZE * (1 - lp * 0.5), mf);
        const c0 = cornerPos(0);
        const ox = lerp(bx, c0.x, ease);
        const oy = lerp(by, c0.y, ease);
        const sz = lerp(SIZE * 0.5, diag * ORANGE_SIZE_FULL, ease);
        drawOrangeAtCorner(ox, oy, sz, clamp(lp / 0.2, 0, 1));
      } else if (t < T_P3) {
        const lp = (t - T_P2) / (T_P3 - T_P2);
        const ease = easeOut3(lp);
        const c0 = cornerPos(0),
          c1 = cornerPos(1);
        drawOrangeAtCorner(
          lerp(c0.x, c1.x, ease),
          lerp(c0.y, c1.y, ease),
          diag * ORANGE_SIZE_FULL,
        );
      } else if (t < T_P4) {
        const lp = (t - T_P3) / (T_P4 - T_P3);
        const ease = easeOut3(lp);
        const c1 = cornerPos(1),
          c2 = cornerPos(2);
        drawOrangeAtCorner(
          lerp(c1.x, c2.x, ease),
          lerp(c1.y, c2.y, ease),
          diag * ORANGE_SIZE_FULL,
        );
      } else if (t < T_P5) {
        const lp = (t - T_P4) / (T_P5 - T_P4);
        const ease = easeOut3(lp);
        const c2 = cornerPos(2),
          c3 = cornerPos(3);
        drawOrangeAtCorner(
          lerp(c2.x, c3.x, ease),
          lerp(c2.y, c3.y, ease),
          diag * ORANGE_SIZE_FULL,
        );
      } else {
        const lp = (t - T_P5) / (1 - T_P5);
        const ease = easeOut3(lp);
        const c3 = cornerPos(3);
        drawOrangeAtCorner(c3.x, c3.y, diag * ORANGE_SIZE_FULL);
        const otherAlpha = ease;
        [0, 2, 3].forEach((i) => {
          const f = FRAGMENTS[i];
          const p4 = FRAGMENTS_P4[i];
          drawFragment(
            ctx,
            p4.fx * W,
            p4.fy * H,
            Math.min(W, H) * p4.size,
            f.r,
            f.g,
            f.b,
            otherAlpha * 0.65,
            f.seed,
          );
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
          imageRendering: "auto",
          willChange: "transform",
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
          fill="#0c0a05"
          filter="url(#grain)"
          opacity={GRAIN_OPACITY}
        />
      </svg>
    </>
  );
}
