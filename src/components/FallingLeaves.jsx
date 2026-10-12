import { useMemo } from "react";
import { wedding } from "../data/wedding.js";

// Gently falling leaves & petals drifting over the whole page.
// Purely decorative: it can't be clicked and screen readers ignore it.
// All motion is CSS (see effects.css); this file only picks random
// sizes, positions, speeds and shapes for each leaf.

const shapes = {
  // slender olive leaf with a centre vein
  leaf: (
    <>
      <path d="M12 1 C 20 7, 20 17, 12 23 C 4 17, 4 7, 12 1 Z" />
      <path d="M12 3 L12 21" className="leaf__vein" />
    </>
  ),
  // soft rounded petal
  petal: <path d="M12 2 C 19 6, 20 15, 12 22 C 4 15, 5 6, 12 2 Z" />,
  // small round leaf
  round: (
    <>
      <path d="M12 3 C 18 3, 21 9, 19 15 C 17 20, 12 22, 12 22 C 12 22, 7 20, 5 15 C 3 9, 6 3, 12 3 Z" />
      <path d="M12 6 L12 20" className="leaf__vein" />
    </>
  ),
};
const shapeNames = Object.keys(shapes);
const colors = ["#C5A46D", "#D8C29B", "#BFA27A", "#CDB79C", "#E3D3B5"];

// Tiny seeded random generator, so the layout stays the same on every render.
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function FallingLeaves() {
  const { fallingLeaves = true, leafCount = 14 } = wedding.effects || {};

  const leaves = useMemo(() => {
    const rand = seededRandom(20270620);
    const between = (min, max) => min + rand() * (max - min);

    return Array.from({ length: leafCount }, (_, i) => {
      const duration = between(14, 26); // seconds to fall the full screen
      return {
        id: i,
        shape: shapeNames[i % shapeNames.length],
        color: colors[Math.floor(rand() * colors.length)],
        style: {
          "--x": `${between(2, 98).toFixed(1)}vw`,
          "--size": `${between(11, 22).toFixed(0)}px`,
          "--opacity": between(0.35, 0.7).toFixed(2),
          "--fall": `${duration.toFixed(1)}s`,
          // negative delay = already part-way down when the page opens
          "--delay": `${(-rand() * duration).toFixed(1)}s`,
          "--sway": `${between(3, 6).toFixed(1)}s`,
          "--sway-x": `${between(20, 60).toFixed(0)}px`,
          "--spin": `${between(5, 11).toFixed(1)}s`,
          "--tilt": `${between(-40, 40).toFixed(0)}deg`,
        },
      };
    });
  }, [leafCount]);

  if (!fallingLeaves || leafCount <= 0) return null;

  return (
    <div className="falling-leaves" aria-hidden="true">
      {leaves.map((leaf) => (
        <span key={leaf.id} className={`leaf ${leaf.id >= 8 ? "leaf--extra" : ""}`} style={leaf.style}>
          <span className="leaf__sway">
            <svg className="leaf__shape" viewBox="0 0 24 24" fill={leaf.color} stroke={leaf.color}>
              {shapes[leaf.shape]}
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
