"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import { Box } from "@chakra-ui/react";

type BinaryFieldProps = {
  color?: string;
  rows?: number;
  cols?: number;
  fontSize?: number;
  seed?: number;
  hoverRadius?: number;
};

/* Simple seeded PRNG so the pattern is stable across renders */
function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BinaryField({
  color = "#686868",
  rows = 30,
  cols = 120,
  fontSize = 14,
  seed = 42,
  hoverRadius = 80,
}: BinaryFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const gridRef = useRef<number[][]>([]);
  const flipTimers = useRef<number[][]>([]);

  // Generate the static grid
  const grid = useMemo(() => {
    const rng = mulberry32(seed);
    const g = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (rng() > 0.5 ? 1 : 0))
    );
    gridRef.current = g;
    // Init flip timers
    flipTimers.current = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    return g;
  }, [rows, cols, seed]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    const charW = fontSize * 1.22;
    const lineH = fontSize * 1.65;
    const mouse = mouseRef.current;
    const now = performance.now();

    for (let r = 0; r < rows; r++) {
      const y = r * lineH;
      if (y > h) break;

      for (let c = 0; c < cols; c++) {
        const x = c * charW + 3; // 3px left offset to match original

        if (x > w) break;

        let value = gridRef.current[r]?.[c] ?? 0;

        // Check if currently flipping
        const flipEnd = flipTimers.current[r]?.[c] ?? 0;
        if (now < flipEnd) {
          // Show flipped value during animation
          value = value === 1 ? 0 : 1;
        }

        // Check hover proximity
        let alpha = 1;
        if (mouse) {
          const cx = x + charW / 2;
          const cy = y + lineH / 2;
          const dist = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);

          if (dist < hoverRadius) {
            const t = 1 - dist / hoverRadius;
            alpha = 1 + t * 0.8; // brighter near cursor
            // Trigger a flip if not already flipping
            if (flipTimers.current[r] && flipTimers.current[r][c] < now) {
              if (Math.random() < 0.06) {
                flipTimers.current[r][c] = now + 200 + Math.random() * 400;
              }
            }
          }
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = Math.min(alpha, 1.5) * 0.65;
        ctx.fillText(String(value), x, y);
      }
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(draw);
  }, [rows, cols, fontSize, color, hoverRadius]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
  }, []);

  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left="3px"
      right="-3px"
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
