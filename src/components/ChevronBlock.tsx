import { MonthTheme } from '../types/calendar';

type Props = {
  theme: MonthTheme;
  year: number;
  monthName: string;
};

export function ChevronBlock({ theme, year, monthName }: Props) {
  return (
    <div
      className="absolute bottom-0 right-0 w-auto min-w-[30%] sm:min-w-[35%] pt-[12px] sm:pt-[16px] pb-[10px] sm:pb-[12px] pr-[12px] sm:pr-[16px] pl-[30px] sm:pl-[40px] flex flex-col items-end justify-end"
      style={{
        backgroundColor: theme.chevron,
        clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%)',
      }}
    >
      <div className="text-white text-[11px] sm:text-[13px] font-normal leading-tight opacity-90">
        {year}
      </div>
      <div className="text-white text-[18px] sm:text-[26px] font-serif font-bold uppercase tracking-wide leading-none">
        {monthName}
      </div>
    </div>
  );
}
