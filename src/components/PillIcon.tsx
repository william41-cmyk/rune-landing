import React from "react";

const PillIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="1"
      y="7"
      width="22"
      height="10"
      rx="5"
      transform="rotate(-45 12 12)"
    />
  </svg>
);

export default PillIcon;
