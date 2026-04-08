import { useCalendarNotes } from '../hooks/useCalendarNotes';
import { MonthTheme, CalendarState } from '../types/calendar';
import { DailyQuote } from './DailyQuote';

type Props = {
  state: CalendarState;
  theme: MonthTheme;
  setActiveTab: (tab: 'month' | 'range') => void;
};

export function NotesPanel({ state, theme, setActiveTab }: Props) {
  const { currentYear, currentMonth, selectedRange, activeNoteTab, isDark } = state;

  const monthKey = `cal_note_month_${currentYear}_${currentMonth + 1}`;
  const rangeKey = selectedRange && selectedRange.start !== selectedRange.end 
    ? `cal_note_range_${selectedRange.start}_${selectedRange.end}` 
    : null;

  const activeKey = activeNoteTab === 'month' ? monthKey : rangeKey;
  const { note, setNote, showSaved } = useCalendarNotes(activeKey);

  const isRangeModeActive = activeNoteTab === 'range';
  const inactiveColor = isDark ? '#8888A0' : '#999999';
  const lineColor = isDark ? '#2A2A4A' : '#E8E8E0';

  return (
    <div className="w-full px-3 sm:px-4 pb-4 mt-2 flex-grow flex flex-col overflow-hidden">
      {/* Tab buttons — hidden in print, replaced by static label below */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2E2E4E] mb-3 print:hidden">
        <button
          onClick={() => setActiveTab('month')}
          className="pb-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none w-1/2 text-center"
          style={{
            borderBottom: !isRangeModeActive ? `2px solid ${theme.accent}` : '2px solid transparent',
            color: !isRangeModeActive ? (isDark ? '#E8E8E8' : '#2C2C2C') : inactiveColor
          }}
        >
          Month
        </button>
        <button
          onClick={() => setActiveTab('range')}
          className="pb-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none w-1/2 text-center"
          style={{
            borderBottom: isRangeModeActive ? `2px solid ${theme.accent}` : '2px solid transparent',
            color: isRangeModeActive ? (isDark ? '#E8E8E8' : '#2C2C2C') : inactiveColor
          }}
        >
          Range
        </button>
      </div>

      {/* Print-only section label */}
      <div
        className="hidden print:block pb-1 mb-3 text-[9px] font-bold uppercase tracking-wider border-b"
        style={{ color: theme.accent, borderColor: theme.accent }}
      >
        {isRangeModeActive ? 'Range Notes' : 'Month Notes'}
      </div>

      <DailyQuote theme={theme} isDark={isDark} currentYear={currentYear} currentMonth={currentMonth} />

      <div className="relative flex-grow min-h-[88px] flex flex-col">
        {isRangeModeActive && !rangeKey ? (
          <div className="text-[13px] italic mt-2 print:hidden" style={{ color: inactiveColor }}>
            Select a date range to add a note
          </div>
        ) : (
          <>
            {/* Editable textarea — screen only */}
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              maxLength={300}
              className="w-full min-h-[110px] text-[13px] font-sans resize-none focus:outline-none bg-transparent print:hidden"
              style={{
                lineHeight: '22px',
                color: isDark ? '#E8E8E8' : '#2C2C2C',
                backgroundImage: `repeating-linear-gradient(transparent, transparent 21px, ${lineColor} 21px, ${lineColor} 22px)`,
              }}
            />
            {/* Static note text — print only */}
            <p
              className="hidden print:block text-[11px] leading-[18px] whitespace-pre-wrap"
              style={{ color: '#2C2C2C' }}
            >
              {note}
            </p>
          </>
        )}

        {/* Char count / saved indicator — screen only */}
        <div className="flex items-center justify-end space-x-3 text-[10px] mt-1 pr-8 sm:pr-10 print:hidden" style={{ color: inactiveColor }}>
          <span className={`transition-opacity duration-300 ${showSaved ? 'opacity-100' : 'opacity-0'}`}>
            Saved ✓
          </span>
          <span>
            {isRangeModeActive && !rangeKey ? '0 / 300' : `${Math.min(note.length, 300)} / 300`}
          </span>
        </div>
      </div>
    </div>
  );
}
