export function SportfyLogo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="ballShading" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#1ed760" />
          <stop offset="100%" stopColor="#1db954" />
        </radialGradient>
      </defs>
      
      {/* Base circle - hijau Sportfy */}
      <circle cx="50" cy="50" r="46" fill="url(#ballShading)" />
      
      {/* Classic soccer ball pattern */}
      
      {/* Center pentagon (hitam) */}
      <path
        d="M 50 20 L 64 30 L 58 48 L 42 48 L 36 30 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Top-left hexagon (hijau dengan border hitam) */}
      <path
        d="M 36 30 L 50 20 L 38 12 L 22 18 L 18 32 L 28 42 L 42 48 Z"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Top-right hexagon */}
      <path
        d="M 64 30 L 50 20 L 62 12 L 78 18 L 82 32 L 72 42 L 58 48 Z"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Left pentagon (hitam) */}
      <path
        d="M 28 42 L 18 32 L 12 48 L 22 62 L 36 58 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Right pentagon (hitam) */}
      <path
        d="M 72 42 L 82 32 L 88 48 L 78 62 L 64 58 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Bottom-left hexagon */}
      <path
        d="M 36 58 L 22 62 L 18 75 L 30 86 L 45 82 L 50 68 L 42 48 Z"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Bottom-right hexagon */}
      <path
        d="M 64 58 L 78 62 L 82 75 L 70 86 L 55 82 L 50 68 L 58 48 Z"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Bottom pentagon (hitam) */}
      <path
        d="M 50 68 L 45 82 L 50 92 L 55 82 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Connect center to edges */}
      <line x1="42" y1="48" x2="36" y2="58" stroke="#000000" strokeWidth="2" />
      <line x1="58" y1="48" x2="64" y2="58" stroke="#000000" strokeWidth="2" />
      <line x1="42" y1="48" x2="28" y2="42" stroke="#000000" strokeWidth="2" />
      <line x1="58" y1="48" x2="72" y2="42" stroke="#000000" strokeWidth="2" />
      <line x1="50" y1="68" x2="45" y2="82" stroke="#000000" strokeWidth="2" />
      <line x1="50" y1="68" x2="55" y2="82" stroke="#000000" strokeWidth="2" />
      
      {/* Outer border */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#000000" strokeWidth="2" />
      
      {/* Shine effect untuk 3D look */}
      <ellipse
        cx="35"
        cy="30"
        rx="15"
        ry="10"
        fill="#ffffff"
        opacity="0.25"
      />
    </svg>
  );
}
