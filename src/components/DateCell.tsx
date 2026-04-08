import { MonthTheme, CalendarEvent, EVENT_TYPES } from '../types/calendar';
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
  events?: CalendarEvent[];
  isDark?: boolean;
  theme: MonthTheme;
  onClick: (iso: string) => void;
  onHover: (iso: string) => void;
  onDateClick?: (iso: string) => void;
  onDeleteEvent?: (eventId: string) => void;
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
  events = [],
  isDark = false,
  theme,
  onClick,
  onHover,
  onDateClick,
  onDeleteEvent
}: DateCellProps) {
  const [showHolidayTooltip, setShowHolidayTooltip] = useState(false);
  const number = dateObj.getDate();
  
  const handleDateClick = () => {
    if (onDateClick) {
      onDateClick(isoString);
    }
    onClick(isoString);
  };
  
  let numberColor = isCurrentMonth ? 'text-[#2C2C2C] dark:text-[#E8E8E8]' : 'text-[#C8C8C8] dark:text-[#8888A0]';
  if (isCurrentMonth && isWeekend) {
    numberColor = '';
  }

  const isSelected = selectionState === 'start' || selectionState === 'end' || selectionState === 'single';

  const handleCellMouseEnter = () => {
    onHover(isoString);
    if (holidayName) {
      setShowHolidayTooltip(true);
    }
  };

  const handleCellMouseLeave = () => {
    setShowHolidayTooltip(false);
  };

  const handleHolidayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (holidayName) {
      setShowHolidayTooltip(!showHolidayTooltip);
    }
  };

  return (
    <div
      role="gridcell"
      aria-label={`${dateObj.toDateString()}${holidayName ? ` - ${holidayName}` : ''}`}
      aria-selected={isSelected}
      onClick={handleDateClick}
      onMouseEnter={handleCellMouseEnter}
      onMouseLeave={handleCellMouseLeave}
      className="relative min-h-[60px] sm:min-h-[65px] md:min-h-[70px] flex flex-col items-center pt-1 pb-1 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 px-0.5 overflow-visible"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleDateClick();
        }
      }}
    >
      {/* Background connecting bands */}
      {selectionState === 'start' && (
        <div 
          className="absolute right-0 top-2 sm:top-2.5 h-[22px] sm:h-[24px] w-[50%] z-0" 
          style={{ 
            backgroundColor: theme.rangeLight,
            borderTopRightRadius: isRowEnd ? '999px' : '0',
            borderBottomRightRadius: isRowEnd ? '999px' : '0'
          }} 
        />
      )}
      {selectionState === 'end' && (
        <div 
          className="absolute left-0 top-2 sm:top-2.5 h-[22px] sm:h-[24px] w-[50%] z-0" 
          style={{ 
            backgroundColor: theme.rangeLight,
            borderTopLeftRadius: isRowStart ? '999px' : '0',
            borderBottomLeftRadius: isRowStart ? '999px' : '0'
          }} 
        />
      )}
      {selectionState === 'in-range' && (
        <div 
          className="absolute left-0 w-full top-2 sm:top-2.5 h-[22px] sm:h-[24px] z-0" 
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
          className="absolute left-0 w-full top-2 sm:top-2.5 h-[22px] sm:h-[24px] opacity-40 z-0" 
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
        className={`relative z-10 w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] flex items-center justify-center rounded-full text-[10px] sm:text-[11px] transition-colors`}
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

      {/* Event Display */}
      {isCurrentMonth && events.length > 0 && (
        <div className="w-full px-0.5 mt-0.5 flex-1 flex flex-col gap-0.5 overflow-hidden justify-start">
          {events.slice(0, 2).map((event, idx) => (
            <div
              key={`event-${idx}-${event.id}`}
              className="text-[7px] sm:text-[8px] px-1 py-0.5 rounded-full font-semibold text-white shadow-sm w-full text-center whitespace-nowrap overflow-hidden text-ellipsis group/event flex items-center justify-between"
              style={{
                backgroundColor: isDark 
                  ? EVENT_TYPES[event.type].colorDark 
                  : EVENT_TYPES[event.type].color,
                minHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                paddingRight: '2px'
              }}
              title={`${EVENT_TYPES[event.type].emoji} ${event.name}`}
            >
              <div className="flex items-center gap-0.5 truncate flex-1">
                <span className="flex-shrink-0">{EVENT_TYPES[event.type].emoji}</span>
                <span className="truncate">{event.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDeleteEvent) {
                    onDeleteEvent(event.id);
                  }
                }}
                className="flex-shrink-0 opacity-0 group-hover/event:opacity-100 transition-opacity hover:scale-110 font-bold text-[6px] sm:text-[7px] leading-none ml-auto"
                title="Delete event"
              >
                ✕
              </button>
            </div>
          ))}
          {events.length > 2 && (
            <div key="events-more" className="text-[6px] sm:text-[7px] font-bold text-center" style={{ color: isDark ? '#A0A0B0' : '#888888' }}>
              +{events.length - 2}
            </div>
          )}
        </div>
      )}

      {/* Holiday Indicator Badge */}
      {holidayName && isCurrentMonth && (
        <div 
          className="absolute top-[24px] sm:top-[28px] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center cursor-pointer"
          onClick={handleHolidayClick}
          title={holidayName}
        >
          <div 
            className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-[#DC2626] dark:bg-[#FCA5A5] shadow-md hover:shadow-lg transition-shadow"
          />
          
          {/* Holiday Tooltip */}
          {showHolidayTooltip && (
            <div 
              className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#DC2626] dark:bg-[#DC2626] text-white text-[12px] sm:text-[13px] px-4 py-2.5 rounded-md whitespace-nowrap font-bold shadow-2xl pointer-events-auto z-[9999] letter-spacing tracking-wide"
              style={{
                animation: 'fadeIn 0.2s ease-in-out',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.5px',
              }}
            >
              {holidayName}
              <div 
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid #DC2626',
                }}
              />
            </div>
          )}
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
