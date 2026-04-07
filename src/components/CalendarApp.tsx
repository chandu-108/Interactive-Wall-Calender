"use client";

import { useState, useEffect } from 'react';
import { useCalendarReducer } from '../hooks/useCalendarReducer';
import { useMonthTheme } from '../hooks/useMonthTheme';
import { CalendarCard } from './CalendarCard';
import { SpiralBinding } from './SpiralBinding';
import { HeroPanel } from './HeroPanel';
import { CalendarGrid } from './CalendarGrid';
import { RangeSummaryBar } from './RangeSummaryBar';
import { NotesPanel } from './NotesPanel';
import { DarkModeToggle } from './DarkModeToggle';
import { PrintButton } from './PrintButton';
import styles from '../styles/flip.module.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function CalendarApp() {
  const { state, dispatch } = useCalendarReducer();
  const theme = useMonthTheme(state.currentMonth, state.isDark);
  const [mounted, setMounted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

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

  if (!mounted) {
    return <div className="min-h-screen py-10 px-4 bg-[#E5E7EB] dark:bg-[#1A1A2E]" />;
  }

  let animateClass = '';
  if (state.flipState === 'flipping-out') animateClass = `${styles.flipOut} ${styles.creaseOverlay}`;
  if (state.flipState === 'flipping-in') animateClass = styles.flipIn;

  return (
    <div className="min-h-screen py-2 sm:py-4 px-4 flex items-center justify-center font-sans">
      <div className="relative w-full max-w-full md:max-w-[700px] lg:max-w-[800px] mx-auto pt-6">
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
          <div className="w-full flex flex-col md:flex-row bg-[#FAFAF5] dark:bg-[#16213E] relative pb-2 rounded-b-[8px]">
            
            {/* Desktop Left Column: NotesPanel */}
            <div className="hidden md:flex print:flex w-full md:w-[28%] flex-shrink-0 pt-6 border-r border-[#E0E0DC] dark:border-[#2E2E4E]">
              <NotesPanel 
                state={state} 
                theme={theme} 
                setActiveTab={(tab) => dispatch({ type: 'SET_ACTIVE_NOTE_TAB', payload: tab })} 
              />
            </div>
            
            {/* Right Column: Month Navigation + Grid */}
            <div className="w-full md:w-[72%] flex flex-col pt-4 pb-2">
              
              {/* Header Navigation positioned correctly inside the Grid Column */}
              <div className="flex justify-between items-center px-4 sm:px-6 mt-2 mb-2 h-10">
                <button 
                  onClick={() => triggerFlip('PREV_MONTH')}
                  disabled={isFlipping}
                  className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none print:hidden ${isFlipping ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ color: theme.accent }}
                  aria-label="Previous month"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-[17px] sm:text-[18px] font-serif font-bold text-[#2C2C2C] dark:text-[#E8E8E8] whitespace-nowrap overflow-hidden text-ellipsis px-2">
                  {MONTH_NAMES[state.currentMonth]} {state.currentYear}
                </div>
                
                <button 
                  onClick={() => triggerFlip('NEXT_MONTH')}
                  disabled={isFlipping}
                  className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none print:hidden ${isFlipping ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ color: theme.accent }}
                  aria-label="Next month"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                onClickDate={(iso) => dispatch({ type: 'CLICK_DATE', payload: iso })}
                onHoverDate={(iso) => dispatch({ type: 'SET_HOVERED_DATE', payload: iso })}
                onToggleWeekStart={() => dispatch({ type: 'TOGGLE_WEEK_START' })}
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
      </div>
    </div>
  );
}
