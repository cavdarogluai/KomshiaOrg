// Kendine özgü motif: mahalle sokağı; pencerelerde yanan ışıklar (kehribar).
export default function Street() {
  const houses = [
    { x: 10, w: 150, h: 150, c: "var(--house)" },
    { x: 175, w: 120, h: 190, c: "var(--house2)" },
    { x: 310, w: 170, h: 130, c: "var(--house)" },
    { x: 495, w: 130, h: 175, c: "var(--house2)" },
    { x: 640, w: 150, h: 145, c: "var(--house)" },
    { x: 805, w: 185, h: 185, c: "var(--house2)" },
  ];
  const base = 220;
  return (
    <svg className="street" viewBox="0 0 1000 240" role="img" aria-label="" aria-hidden="true">
      <line x1="0" y1={base} x2="1000" y2={base} stroke="var(--line)" strokeWidth="2" />
      {houses.map((h, i) => {
        const cols = Math.max(2, Math.floor(h.w / 45));
        const rows = Math.max(2, Math.floor((h.h - 40) / 50));
        return (
          <g key={i}>
            <rect x={h.x} y={base - h.h} width={h.w} height={h.h} rx="6" fill={h.c} />
            <polygon points={`${h.x - 6},${base - h.h} ${h.x + h.w / 2},${base - h.h - 28} ${h.x + h.w + 6},${base - h.h}`} fill="var(--accent)" />
            {Array.from({ length: rows * cols }).map((_, k) => {
              const r = Math.floor(k / cols), c = k % cols;
              const lit = (i * 7 + k * 3) % 5 !== 0;
              return <rect key={k} x={h.x + 14 + c * ((h.w - 28) / cols)} y={base - h.h + 16 + r * 46} width="20" height="26" rx="3" fill={lit ? "var(--window)" : "var(--bg)"} opacity={lit ? 1 : 0.5} />;
            })}
          </g>
        );
      })}
      <circle cx="590" cy="40" r="0" />
    </svg>
  );
}
