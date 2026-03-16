import { useEffect, useRef } from "react";

// ─── Config ──────────────────────────────────────────────────────────────────
const FRAGMENTS = [
  { fx: 0.18, fy: 0.24, r: 245, g: 195, b: 40, size: 0.58, seed: 11 },
  { fx: 0.82, fy: 0.22, r: 215, g: 80, b: 25, size: 0.52, seed: 22 },
  { fx: 0.18, fy: 0.76, r: 190, g: 50, b: 18, size: 0.55, seed: 33 },
  { fx: 0.8, fy: 0.76, r: 232, g: 138, b: 12, size: 0.5, seed: 44 },
];
const FRAGMENTS_P4 = [
  { fx: 0.08, fy: 0.16, size: 0.68 },
  { fx: 0.92, fy: 0.14, size: 0.62 },
  { fx: 0.08, fy: 0.84, size: 0.65 },
  { fx: 0.9, fy: 0.84, size: 0.6 },
];
// 6 pages, each ~16.6% of scroll
// Page 1: 0.00–0.17  full blob intact
// Page 2: 0.17–0.33  blob disintegrates → orange goes bottom-left
// Page 3: 0.33–0.50  orange travels to top-right
// Page 4: 0.50–0.67  orange travels to bottom-right
// Page 5: 0.67–0.83  orange travels to top-left
// Page 6: 0.83–1.00  orange settles top-left, other blobs fade in around it
const T_P1 = 1 / 6;
const T_P2 = 2 / 6;
const T_P3 = 3 / 6;
const T_P4 = 4 / 6;
const T_P5 = 5 / 6;

// The 4 corners the orange blob visits (as fractions of W/H)
// Anchored to corner so it bleeds off-screen naturally
const CORNERS = [
  { x: 0.0, y: 1.0 }, // bottom-left
  { x: 1.0, y: 0.0 }, // top-right
  { x: 1.0, y: 1.0 }, // bottom-right
  { x: 0.0, y: 0.0 }, // top-left
];

const ORIGIN_X = 0.65,
  ORIGIN_Y = 0.5;
const ORANGE_SIZE_FULL = 0.88; // fraction of diagonal when at a corner

// Render at half resolution on low-end, scale up via CSS
// We detect low-end by hardware concurrency
const IS_LOW_END = navigator.hardwareConcurrency <= 4;
const SCALE = IS_LOW_END ? 0.35 : 0.55; // render resolution multiplier
const SKIP_DELTA = IS_LOW_END ? 0.0015 : 0.0003; // skip repaint threshold
const SMOOTH_FACTOR = IS_LOW_END ? 0.1 : 0.08; // slightly snappier on low-end = fewer frames drawn
const GRAIN_OPACITY = IS_LOW_END ? "0.09" : "0.11";

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
// Each unique (radius, r, g, b) combination is rendered once to an offscreen
// canvas and reused via drawImage — zero gradient creation cost per frame.
const glowCache = new Map();

function getCachedGlow(radius, r, g, b) {
  // Quantise radius to 8px buckets to maximise cache hits
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
  grad.addColorStop(0.35, `rgba(${r},${g},${b},0.75)`);
  grad.addColorStop(0.65, `rgba(${r},${g},${b},0.35)`);
  grad.addColorStop(0.85, `rgba(${r},${g},${b},0.10)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  oc2.fillStyle = grad;
  oc2.fillRect(0, 0, size, size);

  // Evict oldest if cache grows too large
  if (glowCache.size > 200) glowCache.delete(glowCache.keys().next().value);
  glowCache.set(key, oc);
  return oc;
}

// Draw a glow by stamping the cached offscreen canvas with globalAlpha
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
  // Reduce layers on low-end: 3 instead of 5
  const layers = IS_LOW_END
    ? [
        [
          (sr(seed, 0) - 0.5) * size * 0.5,
          (sr(seed, 1) - 0.5) * size * 0.5,
          1.2,
          r2,
          g2,
          b2,
          0.32,
        ],
        [
          (sr(seed, 2) - 0.5) * size * 0.35,
          (sr(seed, 3) - 0.5) * size * 0.35,
          0.9,
          r,
          g,
          b,
          0.7,
        ],
        [
          (sr(seed, 8) - 0.5) * size * 0.15,
          (sr(seed, 9) - 0.5) * size * 0.15,
          0.3,
          r3,
          g3,
          b3,
          0.92,
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
    // willReadFrequently=false — we never read pixels, hint to browser
    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    });

    // Resize: render at SCALE fraction, CSS stretches it back up (cheap upscale)
    function resize() {
      canvas.width = Math.round(window.innerWidth * SCALE);
      canvas.height = Math.round(window.innerHeight * SCALE);
      // Clear cache on resize — sizes change
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

      // Skip frame if scroll hasn't changed meaningfully
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

      ctx.fillStyle = "#18160f";
      ctx.fillRect(0, 0, W, H);

      const diag = Math.sqrt(W * W + H * H);

      // Helper: draw the big orange blob at a corner position
      function drawOrangeAtCorner(cx, cy, sz, alpha = 1) {
        glow(ctx, cx, cy, sz * 1.0, 100, 22, 10, 0.4 * alpha);
        glow(ctx, cx, cy, sz * 0.8, 190, 50, 18, 0.55 * alpha);
        glow(ctx, cx, cy, sz * 0.58, 215, 80, 25, 0.72 * alpha);
        glow(ctx, cx, cy, sz * 0.38, 232, 120, 15, 0.85 * alpha);
        glow(ctx, cx, cy, sz * 0.2, 245, 160, 30, 0.95 * alpha);
      }

      // Resolve a corner index to canvas coordinates
      function cornerPos(ci) {
        return {
          x: CORNERS[ci].x * W,
          y: CORNERS[ci].y * H,
        };
      }

      if (t < T_P1) {
        // ── PAGE 1: Full blob intact ───────────────────────────────────
        drawMainBlob(ctx, bx, by, SIZE);
      } else if (t < T_P2) {
        // ── PAGE 2: Blob disintegrates → orange moves to bottom-left ───
        const lp = (t - T_P1) / (T_P2 - T_P1);
        const ease = easeOut3(lp);

        // Main blob fades out quickly
        const mf = clamp(1 - lp / 0.35, 0, 1);
        if (mf > 0.01) drawMainBlob(ctx, bx, by, SIZE * (1 - lp * 0.5), mf);

        // Orange emerges from blob center and travels to bottom-left (corner 0)
        const c0 = cornerPos(0);
        const ox = lerp(bx, c0.x, ease);
        const oy = lerp(by, c0.y, ease);
        const sz = lerp(SIZE * 0.5, diag * ORANGE_SIZE_FULL, ease);
        drawOrangeAtCorner(ox, oy, sz, clamp(lp / 0.2, 0, 1));
      } else if (t < T_P3) {
        // ── PAGE 3: Orange travels bottom-left → top-right ─────────────
        const lp = (t - T_P2) / (T_P3 - T_P2);
        const ease = easeOut3(lp);
        const c0 = cornerPos(0),
          c1 = cornerPos(1);
        const ox = lerp(c0.x, c1.x, ease);
        const oy = lerp(c0.y, c1.y, ease);
        drawOrangeAtCorner(ox, oy, diag * ORANGE_SIZE_FULL);
      } else if (t < T_P4) {
        // ── PAGE 4: Orange travels top-right → bottom-right ────────────
        const lp = (t - T_P3) / (T_P4 - T_P3);
        const ease = easeOut3(lp);
        const c1 = cornerPos(1),
          c2 = cornerPos(2);
        const ox = lerp(c1.x, c2.x, ease);
        const oy = lerp(c1.y, c2.y, ease);
        drawOrangeAtCorner(ox, oy, diag * ORANGE_SIZE_FULL);
      } else if (t < T_P5) {
        // ── PAGE 5: Orange travels bottom-right → top-left ─────────────
        const lp = (t - T_P4) / (T_P5 - T_P4);
        const ease = easeOut3(lp);
        const c2 = cornerPos(2),
          c3 = cornerPos(3);
        const ox = lerp(c2.x, c3.x, ease);
        const oy = lerp(c2.y, c3.y, ease);
        drawOrangeAtCorner(ox, oy, diag * ORANGE_SIZE_FULL);
      } else {
        // ── PAGE 6: Orange settled top-left, other blobs fade in ────────
        const lp = (t - T_P5) / (1 - T_P5);
        const ease = easeOut3(lp);
        const c3 = cornerPos(3);

        // Orange holds at top-left
        drawOrangeAtCorner(c3.x, c3.y, diag * ORANGE_SIZE_FULL);

        // Other 3 fragments fade in softly around the orange
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
            otherAlpha * 0.7,
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
      {/* Canvas rendered at SCALE resolution, stretched to full viewport via CSS */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          imageRendering: "auto", // browser bilinear upscale — smooth enough for blobs
          willChange: "transform", // promote to GPU compositor layer
        }}
      />
      {/* Grain — pure SVG, zero JS cost, rendered by GPU */}
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
          opacity={GRAIN_OPACITY}
        />
      </svg>
    </>
  );
}
