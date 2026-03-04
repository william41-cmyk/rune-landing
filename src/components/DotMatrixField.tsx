"use client";

import { useRef, useEffect, useCallback } from "react";
import { Box } from "@chakra-ui/react";

type DotMatrixFieldProps = {
  color?: string;
  spacing?: number;
  dotSize?: number;
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

export default function DotMatrixField({
  color = "#686868",
  spacing = 28,
  dotSize = 1.5,
  seed = 91,
  hoverRadius = 100,
}: DotMatrixFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<
    { x: number; y: number; baseAlpha: number; sizeMultiplier: number }[]
  >([]);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const generateDots = useCallback(
    (w: number, h: number) => {
      const rng = mulberry32(seed);
      const dots: {
        x: number;
        y: number;
        baseAlpha: number;
        sizeMultiplier: number;
      }[] = [];

      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const offsetX = (w - (cols - 1) * spacing) / 2;
      const offsetY = (h - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing;
          const y = offsetY + r * spacing;

          // Vary alpha and size per dot for organic feel
          const baseAlpha = 0.15 + rng() * 0.45;
          const sizeMultiplier = 0.6 + rng() * 0.8;

          dots.push({ x, y, baseAlpha, sizeMultiplier });
        }
      }

      return dots;
    },
    [spacing, seed]
  );

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
      sizeRef.current = { w, h };
      dotsRef.current = generateDots(w, h);
    }

    ctx.clearRect(0, 0, w, h);

    const mouse = mouseRef.current;
    const dots = dotsRef.current;

    for (const dot of dots) {
      let alpha = dot.baseAlpha;
      let size = dotSize * dot.sizeMultiplier;

      if (mouse) {
        const dist = Math.sqrt(
          (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );

        if (dist < hoverRadius) {
          const t = 1 - dist / hoverRadius;
          // Ease the falloff
          const ease = t * t;
          alpha = Math.min(alpha + ease * 0.6, 1);
          size = size + ease * 2;
        }
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(draw);
  }, [dotSize, color, hoverRadius, generateDots]);

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
