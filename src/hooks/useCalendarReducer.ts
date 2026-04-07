import { useReducer, useEffect } from 'react';
import { CalendarState } from '../types/calendar';

export type CalendarAction =
  | { type: 'NEXT_MONTH' }
  | { type: 'PREV_MONTH' }
  | { type: 'CLICK_DATE'; payload: string }
  | { type: 'SET_HOVERED_DATE'; payload: string | null }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'TOGGLE_WEEK_START' }
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'SET_FLIP_STATE'; payload: 'idle' | 'flipping-out' | 'flipping-in' }
  | { type: 'SET_ACTIVE_NOTE_TAB'; payload: 'month' | 'range' };

const getInitialState = (): CalendarState => {
  const today = new Date();
  
  let isDark = false;
  let weekStartsOn: 'sun' | 'mon' = 'mon';
  
  if (typeof window !== 'undefined') {
    isDark = localStorage.getItem('cal_dark_mode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    weekStartsOn = (localStorage.getItem('cal_week_start') as 'sun' | 'mon') || 'mon';
  }

  return {
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth(),
    selectedRange: null,
    hoveredDate: null,
    weekStartsOn,
    isDark,
    flipState: 'idle',
    activeNoteTab: 'month',
  };
};

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'NEXT_MONTH':
      return {
        ...state,
        currentMonth: state.currentMonth === 11 ? 0 : state.currentMonth + 1,
        currentYear: state.currentMonth === 11 ? state.currentYear + 1 : state.currentYear,
      };
    case 'PREV_MONTH':
      return {
        ...state,
        currentMonth: state.currentMonth === 0 ? 11 : state.currentMonth - 1,
        currentYear: state.currentMonth === 0 ? state.currentYear - 1 : state.currentYear,
      };
    case 'CLICK_DATE': {
      const clicked = action.payload; // YYYY-MM-DD
      const { selectedRange } = state;
      if (!selectedRange) {
        return { ...state, selectedRange: { start: clicked, end: clicked } };
      }
      
      const isStartOnly = selectedRange.start === selectedRange.end;
      
      if (isStartOnly) {
        if (clicked === selectedRange.start) {
          return { ...state, selectedRange: null };
        } else if (clicked > selectedRange.start) {
          return { ...state, selectedRange: { start: selectedRange.start, end: clicked } };
        } else {
          return { ...state, selectedRange: { start: clicked, end: clicked } };
        }
      } else {
        // Multi-day range exists: if clicking within the range, keep it intact
        // (so the range note remains visible). Clicking outside starts fresh.
        const withinRange = clicked >= selectedRange.start && clicked <= selectedRange.end;
        if (withinRange) {
          return state; // no change — preserve range and its note
        }
        return { ...state, selectedRange: { start: clicked, end: clicked } };
      }
    }
    case 'SET_HOVERED_DATE':
      return { ...state, hoveredDate: action.payload };
    case 'CLEAR_SELECTION':
      return { ...state, selectedRange: null };
    case 'TOGGLE_WEEK_START': {
      const newVal = state.weekStartsOn === 'sun' ? 'mon' : 'sun';
      if (typeof window !== 'undefined') localStorage.setItem('cal_week_start', newVal);
      return { ...state, weekStartsOn: newVal };
    }
    case 'SET_DARK_MODE': {
      if (typeof window !== 'undefined') localStorage.setItem('cal_dark_mode', String(action.payload));
      return { ...state, isDark: action.payload };
    }
    case 'SET_FLIP_STATE':
      return { ...state, flipState: action.payload };
    case 'SET_ACTIVE_NOTE_TAB':
      return { ...state, activeNoteTab: action.payload };
    default:
      return state;
  }
}

export function useCalendarReducer() {
  const [state, dispatch] = useReducer(calendarReducer, null, getInitialState);
  
  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDark]);

  return { state, dispatch };
}
