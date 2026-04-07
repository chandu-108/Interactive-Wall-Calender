import { MonthTheme } from '../types/calendar';
import { useState } from 'react';

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
  const [showHolidayTooltip, setShowHolidayTooltip] = useState(false);
  const number = dateObj.getDate();
  
  let numberColor = isCurrentMonth ? 'text-[#2C2C2C] dark:text-[#E8E8E8]' : 'text-[#C8C8C8] dark:text-[#8888A0]';
  if (isCurrentMonth && isWeekend) {
    numberColor = '';
  }

  const isSelected = selectionState === 'start' || selectionState === 'end' || selectionState === 'single';

  const handleHolidayHover = () => {
    if (holidayName) {
      setShowHolidayTooltip(true);
    }
  };

  const handleHolidayLeave = () => {
    setShowHolidayTooltip(false);
  };

  const handleHolidayClick = (e: React.MouseEvent) => {
    if (holidayName) {
      e.stopPropagation();
      setShowHolidayTooltip(!showHolidayTooltip);
    }
  };

  return (
    <div
      role="gridcell"
      aria-label={`${dateObj.toDateString()}${holidayName ? ` - ${holidayName}` : ''}`}
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
                ? { color: '#DC2626', fontWeight: 700 }
                : isWeekend && isCurrentMonth
                  ? { color: theme.accent, fontWeight: 500 }
                  : { fontWeight: 500 }
        }
      >
        <span className={(!isSelected && !isToday && !(holidayName && isCurrentMonth) && !(isWeekend && isCurrentMonth)) ? numberColor : ''}>
          {number}
        </span>
      </div>

      {/* Holiday Indicator Badge */}
      {holidayName && isCurrentMonth && (
        <div 
          className="absolute bottom-[1px] sm:bottom-[3px] z-10 flex items-center justify-center"
          onMouseEnter={handleHolidayHover}
          onMouseLeave={handleHolidayLeave}
          onClick={handleHolidayClick}
        >
          <div 
            className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-[#DC2626] dark:bg-[#EF4444] shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            title={holidayName}
          />
        </div>
      )}

      {/* Holiday Tooltip */}
      {holidayName && (showHolidayTooltip) && (
        <div 
          className="absolute bottom-full -left-1/2 mb-2 translate-x-1/2 z-50 bg-[#DC2626] text-white text-[11px] sm:text-[12px] px-3 py-2 rounded-md whitespace-nowrap font-semibold shadow-lg"
          style={{
            animation: 'fadeIn 0.2s ease-in-out',
          }}
        >
          <div>{holidayName}</div>
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #DC2626',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
