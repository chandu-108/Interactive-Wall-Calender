"use client";

import { useState, useEffect } from 'react';
import { useCalendarReducer } from '../hooks/useCalendarReducer';
import { useMonthTheme } from '../hooks/useMonthTheme';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { EventType } from '../types/calendar';
import { CalendarCard } from './CalendarCard';
import { SpiralBinding } from './SpiralBinding';
import { HeroPanel } from './HeroPanel';
import { CalendarGrid } from './CalendarGrid';
import { RangeSummaryBar } from './RangeSummaryBar';
import { NotesPanel } from './NotesPanel';
import { DarkModeToggle } from './DarkModeToggle';
import { PrintButton } from './PrintButton';
import { AddEventModal } from './AddEventModal';
import styles from '../styles/flip.module.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function CalendarApp() {
  const { state, dispatch } = useCalendarReducer();
  const theme = useMonthTheme(state.currentMonth, state.isDark);
  const { events, addEvent, removeEvent, getEventsForDate } = useCalendarEvents();
  const [mounted, setMounted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerFlip = (action: 'NEXT_MONTH' | 'PREV_MONTH') => {
    if (isFlipping) return;
    setIsFlipping(true);
    dispatch({ type: 'SET_FLIP_STATE', payload: 'flipping-out' });
    setTimeout(() => {
      dispatch({ type: action });
      dispatch({ type: 'SET_FLIP_STATE', payload: 'flipping-in' });
      setTimeout(() => {
        dispatch({ type: 'SET_FLIP_STATE', payload: 'idle' });
        setIsFlipping(false);
      }, 480); // tear-in: 450ms + buffer
    }, 580); // tear-out: 550ms + buffer
  };

  const handleDateCellClick = (iso: string) => {
    setSelectedDateForEvent(iso);
    setIsModalOpen(true);
  };

  const handleAddEvent = (eventName: string, eventType: EventType) => {
    if (selectedDateForEvent) {
      addEvent(selectedDateForEvent, eventType, eventName);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    removeEvent(eventId);
  };

  if (!mounted) {
    return <div className="min-h-screen py-10 px-4 bg-[#E5E7EB] dark:bg-[#1A1A2E]" />;
  }

  let animateClass = '';
  if (state.flipState === 'flipping-out') animateClass = `${styles.flipOut} ${styles.creaseOverlay}`;
  if (state.flipState === 'flipping-in') animateClass = styles.flipIn;

  return (
    <div className="min-h-screen py-1 sm:py-2 px-2 sm:px-4 flex items-center justify-center font-sans overflow-y-auto">
      <div className="relative w-full max-w-full md:max-w-[750px] lg:max-w-[850px] xl:max-w-[900px] mx-auto overflow-hidden flex flex-col">
        <SpiralBinding monthIndex={state.currentMonth} theme={theme} />
        <CalendarCard>
        
        <DarkModeToggle 
          isDark={state.isDark} 
          onToggle={() => dispatch({ type: 'SET_DARK_MODE', payload: !state.isDark })} 
        />
        <PrintButton />

        {/* This div handles the flip animation internally so buttons don't disappear */}
        <div className={`w-full flex flex-col items-center relative ${animateClass}`}>
          
          {/* Top Half: Hero Image */}
          <div className="w-full">
            <HeroPanel 
              monthIndex={state.currentMonth} 
              year={state.currentYear} 
              theme={theme} 
            />
          </div>
          
          {/* Bottom Half: Notes (left) + Grid (right) */}
          <div className="w-full flex flex-col md:flex-row bg-[#FAFAF5] dark:bg-[#16213E] relative overflow-hidden rounded-b-[8px]">
            
            {/* Desktop Left Column: NotesPanel */}
            <div className="hidden md:flex print:flex w-full md:w-[25%] flex-shrink-0 pt-2 sm:pt-3 border-r border-[#E0E0DC] dark:border-[#2E2E4E] overflow-hidden">
              <NotesPanel 
                state={state} 
                theme={theme} 
                setActiveTab={(tab) => dispatch({ type: 'SET_ACTIVE_NOTE_TAB', payload: tab })} 
              />
            </div>
            
            {/* Right Column: Month Navigation + Grid */}
            <div className="w-full md:w-[75%] flex flex-col pt-1 sm:pt-2 pb-0 overflow-hidden">
              
              {/* Header Navigation positioned correctly inside the Grid Column */}
              <div className="flex justify-between items-center px-2 sm:px-3 my-1 h-8 sm:h-9 flex-shrink-0">
                <button 
                  onClick={() => triggerFlip('PREV_MONTH')}
                  disabled={isFlipping}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none print:hidden ${isFlipping ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ color: theme.accent }}
                  aria-label="Previous month"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-[14px] sm:text-[16px] font-serif font-bold text-[#2C2C2C] dark:text-[#E8E8E8] whitespace-nowrap overflow-hidden text-ellipsis px-1">
                  {MONTH_NAMES[state.currentMonth]} {state.currentYear}
                </div>
                
                <button 
                  onClick={() => triggerFlip('NEXT_MONTH')}
                  disabled={isFlipping}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none print:hidden ${isFlipping ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ color: theme.accent }}
                  aria-label="Next month"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <CalendarGrid 
                currentYear={state.currentYear}
                currentMonth={state.currentMonth}
                weekStartsOn={state.weekStartsOn}
                selectedRange={state.selectedRange}
                hoveredDate={state.hoveredDate}
                theme={theme}
                events={events}
                isDark={state.isDark}
                onClickDate={(iso) => dispatch({ type: 'CLICK_DATE', payload: iso })}
                onHoverDate={(iso) => dispatch({ type: 'SET_HOVERED_DATE', payload: iso })}
                onToggleWeekStart={() => dispatch({ type: 'TOGGLE_WEEK_START' })}
                onDateCellClick={handleDateCellClick}
                onDeleteEvent={handleDeleteEvent}
              />

              <RangeSummaryBar 
                theme={theme} 
                selectedRange={state.selectedRange} 
                onClear={() => dispatch({ type: 'CLEAR_SELECTION' })} 
              />
              
              {/* Mobile/Tablet Notes Panel — hidden in print (desktop panel handles it) */}
              <div className="md:hidden w-full block border-t border-[#E0E0DC] dark:border-[#2E2E4E] pt-2 print:hidden">
                <NotesPanel 
                  state={state} 
                  theme={theme} 
                  setActiveTab={(tab) => dispatch({ type: 'SET_ACTIVE_NOTE_TAB', payload: tab })} 
                />
              </div>
            </div>
            
          </div>
        </div>
        </CalendarCard>

        <AddEventModal 
          isOpen={isModalOpen}
          selectedDate={selectedDateForEvent}
          isDark={state.isDark}
          existingEvents={selectedDateForEvent ? getEventsForDate(selectedDateForEvent) : []}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
