export type CalendarState = {
  currentYear: number;
  currentMonth: number;           // 0-indexed
  selectedRange: { start: string; end: string } | null;   // Local YYYY-MM-DD
  hoveredDate: string | null;     // Local YYYY-MM-DD
  weekStartsOn: 'sun' | 'mon';
  isDark: boolean;
  flipState: 'idle' | 'flipping-out' | 'flipping-in';
  activeNoteTab: 'month' | 'range';
};

export type MonthThemeData = MonthTheme & {
  accentDark: string;
  rangeLightDark: string;
  chevronDark: string;
};

export type MonthTheme = {
  accent: string;
  rangeLight: string;
  chevron: string;
};
