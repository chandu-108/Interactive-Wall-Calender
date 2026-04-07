import { MonthTheme } from '../types/calendar';

export type DateCellProps = {
  dateObj: Date;
  isoString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  selectionState: 'none' | 'start' | 'end' | 'single' | 'in-range' | 'hover-range';
  isRowStart: boolean;
  isRowEnd: boolean;
  holidayName?: string;
  theme: MonthTheme;
  onClick: (iso: string) => void;
  onHover: (iso: string) => void;
};

export function DateCell({
  dateObj,
  isoString,
  isCurrentMonth,
  isToday,
  isWeekend,
  selectionState,
  isRowStart,
  isRowEnd,
  holidayName,
  theme,
  onClick,
  onHover
}: DateCellProps) {
  const number = dateObj.getDate();
  
  let numberColor = isCurrentMonth ? 'text-[#2C2C2C] dark:text-[#E8E8E8]' : 'text-[#C8C8C8] dark:text-[#8888A0]';
  if (isCurrentMonth && isWeekend) {
    numberColor = '';
  }

  const isSelected = selectionState === 'start' || selectionState === 'end' || selectionState === 'single';

  return (
    <div
      role="gridcell"
      aria-label={`${dateObj.toDateString()}`}
      aria-selected={isSelected}
      onClick={() => onClick(isoString)}
      onMouseEnter={() => onHover(isoString)}
      className="relative min-h-[36px] sm:min-h-[40px] flex flex-col items-center pt-[2px] cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(isoString);
        }
      }}
    >
      {/* Background connecting bands */}
      {selectionState === 'start' && (
        <div 
          className="absolute right-0 top-3 h-[26px] w-[50%] z-0" 
          style={{ 
            backgroundColor: theme.rangeLight,
            borderTopRightRadius: isRowEnd ? '999px' : '0',
            borderBottomRightRadius: isRowEnd ? '999px' : '0'
          }} 
        />
      )}
      {selectionState === 'end' && (
        <div 
          className="absolute left-0 top-3 h-[26px] w-[50%] z-0" 
          style={{ 
            backgroundColor: theme.rangeLight,
            borderTopLeftRadius: isRowStart ? '999px' : '0',
            borderBottomLeftRadius: isRowStart ? '999px' : '0'
          }} 
        />
      )}
      {selectionState === 'in-range' && (
        <div 
          className="absolute left-0 w-full top-3 h-[26px] z-0" 
          style={{ 
            backgroundColor: theme.rangeLight,
            borderTopLeftRadius: isRowStart ? '999px' : '0',
            borderBottomLeftRadius: isRowStart ? '999px' : '0',
            borderTopRightRadius: isRowEnd ? '999px' : '0',
            borderBottomRightRadius: isRowEnd ? '999px' : '0'
          }} 
        />
      )}
      {selectionState === 'hover-range' && (
        <div 
          className="absolute left-0 w-full top-3 h-[26px] opacity-40 z-0" 
          style={{ 
            backgroundColor: theme.rangeLight,
            borderTopLeftRadius: isRowStart ? '999px' : '0',
            borderBottomLeftRadius: isRowStart ? '999px' : '0',
            borderTopRightRadius: isRowEnd ? '999px' : '0',
            borderBottomRightRadius: isRowEnd ? '999px' : '0'
          }} 
        />
      )}

      {/* Date Number */}
      <div 
        className={`relative z-10 w-[26px] h-[26px] flex items-center justify-center rounded-full text-[13px] transition-colors`}
        style={
          isSelected 
            ? { backgroundColor: theme.accent, color: '#fff', fontWeight: 600 }
            : isToday 
              ? { backgroundColor: theme.accent, color: '#fff', fontWeight: 600 }
              : holidayName && isCurrentMonth
                ? { color: theme.accent, fontWeight: 700 }
                : isWeekend && isCurrentMonth
                  ? { color: theme.accent, fontWeight: 500 }
                  : { fontWeight: 500 }
        }
      >
        <span className={(!isSelected && !isToday && !(holidayName && isCurrentMonth) && !(isWeekend && isCurrentMonth)) ? numberColor : ''}>
          {number}
        </span>
      </div>

      {/* Holiday Text */}
      {holidayName && (
        <div 
          className="absolute bottom-[2px] sm:bottom-[4px] w-[110%] text-center text-[7.5px] sm:text-[8px] leading-[9px] px-[1px] font-bold z-10 line-clamp-2 text-[#D32F2F] dark:text-[#EF5350]" 
          style={{ wordBreak: 'break-word', opacity: 0.9 }}
          title={holidayName}
        >
          {holidayName}
        </div>
      )}
    </div>
  );
}
