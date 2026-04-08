import { MonthTheme } from '../types/calendar';

type Props = {
  theme: MonthTheme;
  selectedRange: { start: string; end: string } | null;
  onClear: () => void;
};

export function RangeSummaryBar({ theme, selectedRange, onClear }: Props) {
  if (!selectedRange || selectedRange.start === selectedRange.end) return null;

  const start = new Date(selectedRange.start);
  const end = new Date(selectedRange.end);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', formatOptions);
  const endStr = end.toLocaleDateString('en-US', formatOptions);

  return (
    <div className="flex items-center px-2 sm:px-4 mb-2 sm:mb-4 overflow-hidden">
      <div 
        className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium tracking-wide whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          backgroundColor: `${theme.accent}1F`, // 12% opacity hex approach
          color: theme.accent
        }}
      >
        <span className="text-ellipsis overflow-hidden">{`${startStr} – ${endStr} · ${diffDays} days selected`}</span>
        <button 
          onClick={onClear}
          className="ml-2 sm:ml-3 font-bold hover:opacity-70 focus:outline-[2px] focus:outline-offset-[2px] focus:outline-blue-500 rounded-full print:hidden text-[10px] sm:text-[12px]"
          aria-label="Clear selection"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
