export type EventType = 'wine' | 'birthday' | 'travel' | 'important' | 'party';

export type CalendarEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  type: EventType;
  name: string;
};

export const EVENT_TYPES: Record<EventType, { emoji: string; label: string; color: string; colorDark: string }> = {
  wine: { emoji: '🍷', label: 'Wine', color: '#DC2626', colorDark: '#EF4444' },
  birthday: { emoji: '🎂', label: 'Birthday', color: '#EC4899', colorDark: '#F472B6' },
  travel: { emoji: '✈️', label: 'Travel', color: '#2563EB', colorDark: '#60A5FA' },
  important: { emoji: '⭐', label: 'Important', color: '#F59E0B', colorDark: '#FBBF24' },
  party: { emoji: '🎉', label: 'Party', color: '#8B5CF6', colorDark: '#A78BFA' }
};

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
