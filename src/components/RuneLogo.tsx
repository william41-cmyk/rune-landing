"use client";

interface RuneLogoProps {
  height?: number;
  color?: string;
}

export default function RuneLogo({ height = 22, color = "#e6e6e6" }: RuneLogoProps) {
  // Custom geometric wordmark for "RUNE"
  // Designed with clean lines, consistent stroke weight, and modern proportions
  const strokeWidth = 4.5;
  const sw = strokeWidth;

  return (
    <svg
      height={height}
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rune"
    >
      {/* R */}
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {/* Vertical stem */}
        <line x1="4" y1="4" x2="4" y2="28" />
        {/* Top horizontal */}
        <line x1="4" y1="4" x2="16" y2="4" />
        {/* Bowl curve - right side */}
        <path d="M16 4 C21 4, 22 8, 22 10 C22 12, 21 16, 16 16" fill="none" />
        {/* Middle horizontal */}
        <line x1="4" y1="16" x2="16" y2="16" />
        {/* Leg */}
        <line x1="14" y1="16" x2="23" y2="28" />
      </g>

      {/* U */}
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 4 L32 21 C32 25.5, 35 28, 40 28 C45 28, 48 25.5, 48 21 L48 4" fill="none" />
      </g>

      {/* N */}
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <line x1="57" y1="28" x2="57" y2="4" />
        <line x1="57" y1="4" x2="73" y2="28" />
        <line x1="73" y1="28" x2="73" y2="4" />
      </g>

      {/* E */}
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <line x1="82" y1="4" x2="82" y2="28" />
        <line x1="82" y1="4" x2="97" y2="4" />
        <line x1="82" y1="16" x2="94" y2="16" />
        <line x1="82" y1="28" x2="97" y2="28" />
      </g>
    </svg>
  );
}
