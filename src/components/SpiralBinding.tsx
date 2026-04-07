import { MonthTheme } from '../types/calendar';

type Props = {
  monthIndex?: number;
  theme?: MonthTheme;
};

/**
 * Renders 12 spiral coil rings at the top of the calendar.
 * Each ring looks like a metal wire coil (hollow ring / binding loop).
 * Rings up to current month are coloured with the month accent.
 */
function CoilRing({ filled, accent }: { filled: boolean; accent: string }) {
  const color = filled ? accent : 'rgba(130,130,160,0.55)';
  const innerColor = filled ? `${accent}33` : 'rgba(50,50,70,0.12)';

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, filter: filled ? `drop-shadow(0 2px 4px ${accent}88)` : undefined }}
    >
      {/* Outer ring border */}
      <circle cx="15" cy="15" r="12" stroke={color} strokeWidth="4" fill={innerColor} />
      {/* Inner shine highlight for 3-D depth */}
      <ellipse cx="11" cy="10" rx="3" ry="2" fill="rgba(255,255,255,0.25)" />
      {/* Bottom gap line — simulates the opening where wire goes through paper */}
      <line x1="9" y1="26" x2="21" y2="26" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function SpiralBinding({ monthIndex = 0, theme }: Props) {
  const rings = Array.from({ length: 12 });
  const accent = theme?.accent ?? '#E07060';

  return (
    <div
      className="w-full flex justify-around pointer-events-none print:hidden"
      style={{
        paddingLeft: '24px',
        paddingRight: '24px',
        position: 'relative',
        zIndex: 30,
        marginBottom: '-15px', // overlap ring bottoms into the card top edge
        transition: 'all 0.3s ease',
      }}
    >
      {rings.map((_, i) => (
        <CoilRing key={i} filled={i <= (monthIndex % 12)} accent={accent} />
      ))}
    </div>
  );
}
