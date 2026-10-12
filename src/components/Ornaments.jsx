// Fine-line botanical ornaments drawn in champagne gold (pure SVG, no images).

const leaf = "M0 0 C 5 -7, 15 -7, 20 0 C 15 7, 5 7, 0 0 Z";

// A delicate sprig of leaves — used in corners and on placeholders.
export function Sprig({ className = "" }) {
  const leaves = [
    { x: 22, y: 96, r: -80 },
    { x: 30, y: 86, r: 10 },
    { x: 40, y: 72, r: -95 },
    { x: 50, y: 62, r: -5 },
    { x: 60, y: 48, r: -105 },
    { x: 72, y: 40, r: -20 },
    { x: 82, y: 27, r: -115 },
    { x: 94, y: 21, r: -35 },
  ];
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M8 116 C 34 92, 58 64, 112 8" />
        {leaves.map((l, i) => (
          <path key={i} d={leaf} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`} />
        ))}
        <circle cx="112" cy="8" r="2" />
        <circle cx="104" cy="6" r="1.2" />
      </g>
    </svg>
  );
}

// Thin line — tiny leaf motif — thin line.
export function Divider({ className = "" }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 200 20" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
        <line x1="0" y1="10" x2="80" y2="10" />
        <line x1="120" y1="10" x2="200" y2="10" />
        <path d="M100 4 L106 10 L100 16 L94 10 Z" />
        <path d={leaf} transform="translate(92 10) rotate(180) scale(0.55)" />
        <path d={leaf} transform="translate(108 10) scale(0.55)" />
      </g>
    </svg>
  );
}
