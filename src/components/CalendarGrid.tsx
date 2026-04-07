import { DateCell } from './DateCell';
import { MonthTheme } from '../types/calendar';

const FIXED_HOLIDAYS: Record<string, string> = {
  '01-01': 'New Year\'s Day',
  '01-14': 'Makar Sankranti',
  '01-26': 'Republic Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas',
};

const LUNAR_HOLIDAYS: Record<string, string> = {
  // 2026
  '2026-01-23': 'Vasant Panchami',
  '2026-02-15': 'Maha Shivratri',
  '2026-03-03': 'Holika Dahan',
  '2026-03-04': 'Holi',
  '2026-03-19': 'Ugadi',
  '2026-03-21': 'Eid-ul-Fitr',
  '2026-03-27': 'Ram Navami',
  '2026-03-31': 'Mahavir Jayanti',
  '2026-04-02': 'Hanuman Jayanti',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Dr. Ambedkar Jayanti / Baisakhi',
  '2026-05-01': 'Buddha Purnima',
  '2026-05-27': 'Eid-ul-Zuha (Bakrid)',
  '2026-06-26': 'Muharram',
  '2026-08-28': 'Raksha Bandhan',
  '2026-09-04': 'Janmashtami',
  '2026-09-14': 'Ganesh Chaturthi',
  '2026-10-20': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',

  // 2027
  '2027-02-10': 'Vasant Panchami',
  '2027-03-06': 'Maha Shivratri',
  '2027-03-10': 'Eid-ul-Fitr',
  '2027-03-22': 'Holika Dahan',
  '2027-03-23': 'Holi',
  '2027-03-26': 'Good Friday',
  '2027-04-07': 'Ugadi',
  '2027-04-14': 'Dr. Ambedkar Jayanti / Baisakhi',
  '2027-04-15': 'Ram Navami',
  '2027-04-20': 'Mahavir Jayanti',
  '2027-05-16': 'Eid-ul-Zuha (Bakrid)',
  '2027-05-20': 'Buddha Purnima',
  '2027-06-15': 'Muharram',
  '2027-08-17': 'Raksha Bandhan',
  '2027-08-25': 'Janmashtami',
  '2027-09-04': 'Ganesh Chaturthi',
  '2027-10-09': 'Dussehra',
  '2027-10-29': 'Diwali',
  '2027-11-13': 'Guru Nanak Jayanti',
};

function getHoliday(dateStr: string): string | undefined {
  const monthDay = dateStr.slice(5); // Extract MM-DD
  return FIXED_HOLIDAYS[monthDay] || LUNAR_HOLIDAYS[dateStr];
}

// Simple utility to format dates manually without libraries to YYYY-MM-DD local
function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

type Props = {
  currentYear: number;
  currentMonth: number;
  weekStartsOn: 'sun' | 'mon';
  selectedRange: { start: string; end: string } | null;
  hoveredDate: string | null;
  theme: MonthTheme;
  onClickDate: (iso: string) => void;
  onHoverDate: (iso: string) => void;
  onToggleWeekStart: () => void;
};

export function CalendarGrid({
  currentYear, currentMonth, weekStartsOn, selectedRange, hoveredDate,
  theme, onClickDate, onHoverDate, onToggleWeekStart
}: Props) {
  
  const todayISO = toISO(new Date());

  // Generate days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) - 6 (Sat)
  
  // Calculate offset to pad beginning of month
  let startOffset = firstDay;
  if (weekStartsOn === 'mon') {
    startOffset = firstDay === 0 ? 6 : firstDay - 1;
  }

  // 6 rows * 7 columns = 42 total cells
  // We'll calculate the start date for the grid by subtracting startOffset days from the 1st
  const gridStart = new Date(currentYear, currentMonth, 1);
  gridStart.setDate(1 - startOffset);

  const dates: { date: Date; iso: string }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    dates.push({ date: d, iso: toISO(d) });
  }

  const dayNamesMon = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dayNamesSun = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayNames = weekStartsOn === 'mon' ? dayNamesMon : dayNamesSun;

  return (
    <div className="w-full flex-grow flex flex-col pt-4">
      {/* Week start toggle */}
      <div className="flex justify-between items-center px-4 sm:px-6 mb-2">
        <div /> 
        <button 
          onClick={onToggleWeekStart}
          className="text-[10px] text-[#999] uppercase tracking-wider hover:text-[#444] dark:hover:text-[#E8E8E8] transition-colors print:hidden"
        >
          [ {weekStartsOn === 'mon' ? 'Mon' : 'Sun'} First ]
        </button>
      </div>

      <div className="px-4 sm:px-6 w-full max-w-[full]">
        <div className="grid grid-cols-7 gap-y-2 mb-2" role="row">
          {dayNames.map((day, idx) => {
            const isWeekend = day === 'SAT' || day === 'SUN';
            return (
              <div 
                key={day} 
                className="text-[11px] font-semibold tracking-wider text-center"
                style={{ color: isWeekend ? theme.accent : undefined }}
              >
                <span className={!isWeekend ? 'text-[#444] dark:text-[#8888A0]' : ''}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 gap-y-1" role="grid" aria-label={`Calendar ${currentYear}-${currentMonth + 1}`}>
          {dates.map(({ date, iso }, index) => {
            const isCurrentMonth = date.getMonth() === currentMonth;
            const isToday = iso === todayISO;
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            
            const isRowStart = index % 7 === 0;
            const isRowEnd = index % 7 === 6;

            let state: 'none' | 'start' | 'end' | 'single' | 'in-range' | 'hover-range' = 'none';

            if (selectedRange) {
              const { start, end } = selectedRange;
              if (start === end) {
                if (iso === start) state = 'single';
                else if (iso > start && hoveredDate && iso <= hoveredDate) {
                  state = 'hover-range';
                }
              } else {
                if (iso === start) state = 'start';
                else if (iso === end) state = 'end';
                else if (iso > start && iso < end) state = 'in-range';
              }
            }

            return (
              <DateCell
                key={iso}
                dateObj={date}
                isoString={iso}
                isCurrentMonth={isCurrentMonth}
                isToday={isToday}
                isWeekend={isWeekend}
                selectionState={state}
                isRowStart={isRowStart}
                isRowEnd={isRowEnd}
                holidayName={getHoliday(iso)}
                theme={theme}
                onClick={onClickDate}
                onHover={onHoverDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
