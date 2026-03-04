"use client";

import { useRef, useEffect, useCallback } from "react";
import { Box } from "@chakra-ui/react";

type TopographicFieldProps = {
  color?: string;
  lineCount?: number;
  seed?: number;
  hoverRadius?: number;
};

/* Simple seeded PRNG */
function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Generate smooth contour line points using layered sine waves */
function generateContourLines(
  width: number,
  height: number,
  lineCount: number,
  seed: number
) {
  const rng = mulberry32(seed);
  const lines: { points: { x: number; y: number }[]; baseAlpha: number }[] =
    [];

  for (let i = 0; i < lineCount; i++) {
    const t = i / (lineCount - 1); // 0 → 1
    const baseY = height * 0.05 + t * height * 0.9;

    // Each line gets unique wave parameters
    const freqA = 0.001 + rng() * 0.003;
    const freqB = 0.003 + rng() * 0.005;
    const freqC = 0.006 + rng() * 0.008;
    const ampA = 20 + rng() * 50;
    const ampB = 10 + rng() * 25;
    const ampC = 5 + rng() * 12;
    const phaseA = rng() * Math.PI * 2;
    const phaseB = rng() * Math.PI * 2;
    const phaseC = rng() * Math.PI * 2;

    // Alpha varies per line — some are more prominent
    const baseAlpha = 0.12 + rng() * 0.28;

    const points: { x: number; y: number }[] = [];
    const step = 3; // pixel step between points

    for (let x = -20; x <= width + 20; x += step) {
      const y =
        baseY +
        Math.sin(x * freqA + phaseA) * ampA +
        Math.sin(x * freqB + phaseB) * ampB +
        Math.sin(x * freqC + phaseC) * ampC;
      points.push({ x, y });
    }

    lines.push({ points, baseAlpha });
  }

  return lines;
}

export default function TopographicField({
  color = "#686868",
  lineCount = 24,
  seed = 77,
  hoverRadius = 120,
}: TopographicFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const linesRef = useRef<
    ReturnType<typeof generateContourLines>
  >([]);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Resize + regenerate lines if size changed
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w, h };
      linesRef.current = generateContourLines(w, h, lineCount, seed);
    }

    ctx.clearRect(0, 0, w, h);

    const mouse = mouseRef.current;
    const lines = linesRef.current;

    for (const line of lines) {
      ctx.beginPath();

      const pts = line.points;
      if (pts.length < 2) continue;

      ctx.moveTo(pts[0].x, pts[0].y);

      // Draw smooth curves through points
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }

      // Last segment
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);

      ctx.strokeStyle = color;
      ctx.globalAlpha = line.baseAlpha;
      ctx.lineWidth = 1;
      ctx.stroke();

      // If mouse is nearby, draw a brighter glow segment
      if (mouse) {
        ctx.beginPath();
        let started = false;

        for (const pt of pts) {
          const dist = Math.sqrt(
            (mouse.x - pt.x) ** 2 + (mouse.y - pt.y) ** 2
          );

          if (dist < hoverRadius) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else if (started) {
            break; // past the hover zone
          }
        }

        if (started) {
          ctx.strokeStyle = color;
          ctx.globalAlpha = Math.min(line.baseAlpha + 0.4, 0.85);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(draw);
  }, [lineCount, seed, color, hoverRadius]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
  }, []);

  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      overflow="hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "default",
        }}
      />
    </Box>
  );
}
