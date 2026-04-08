import { ChevronBlock } from './ChevronBlock';
import { MonthTheme } from '../types/calendar';

const MONTH_IMAGES = [
  "https://picsum.photos/id/29/800/400", // Jan (Mountain/Cold)
  "https://picsum.photos/id/28/800/400", // Feb (Forest)
  "https://picsum.photos/id/17/800/400", // Mar (Field path)
  "https://picsum.photos/id/15/800/400", // Apr (Waterfall/Spring)
  "https://picsum.photos/id/11/800/400", // May (Nature Landscape)
  "https://picsum.photos/id/14/800/400", // Jun (Sea horizon)
  "https://picsum.photos/id/12/800/400", // Jul (Shore/Sand)
  "https://picsum.photos/id/13/800/400", // Aug (Beach/Summer)
  "https://picsum.photos/id/10/800/400", // Sep (Deep Forest)
  "https://picsum.photos/id/18/800/400", // Oct (Meadow/Autumn)
  "https://picsum.photos/id/16/800/400", // Nov (Nature road)
  "https://picsum.photos/id/46/800/400", // Dec (Mountain Range)
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type Props = {
  monthIndex: number;
  year: number;
  theme: MonthTheme;
};

export function HeroPanel({ monthIndex, year, theme }: Props) {
  return (
    <div data-hero-panel="" className="relative w-full h-[35vw] sm:h-[150px] lg:h-[170px] print:h-[85px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MONTH_IMAGES[monthIndex % 12]}
        alt={MONTH_NAMES[monthIndex % 12]}
        loading="eager"
        className="w-full h-full object-cover rounded-t-[8px]"
        style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' } as React.CSSProperties}
      />
      <ChevronBlock theme={theme} year={year} monthName={MONTH_NAMES[monthIndex % 12]} />
    </div>
  );
}
