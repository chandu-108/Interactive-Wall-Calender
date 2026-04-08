import { useState, useEffect } from 'react';
import { CalendarEvent, EventType } from '../types/calendar';

const EVENTS_STORAGE_KEY = 'cal_events';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse events:', error);
        setEvents([]);
      }
    }
    setMounted(true);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  }, [events, mounted]);

  const getEventsForDate = (dateStr: string): CalendarEvent[] => {
    return events.filter(e => e.date === dateStr);
  };

  const addEvent = (dateStr: string, eventType: EventType, eventName: string) => {
    if (!eventName.trim()) return;
    const newEvent: CalendarEvent = {
      id: generateId(),
      date: dateStr,
      type: eventType,
      name: eventName.trim()
    };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const updateEvent = (eventId: string, eventName: string, eventType: EventType) => {
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, name: eventName, type: eventType }
        : e
    ));
  };

  return {
    events,
    getEventsForDate,
    addEvent,
    removeEvent,
    updateEvent,
    mounted
  };
}
