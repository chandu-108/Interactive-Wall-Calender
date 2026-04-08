"use client";

import { useState } from 'react';
import { EventType, EVENT_TYPES, CalendarEvent } from '../types/calendar';

type Props = {
  isOpen: boolean;
  selectedDate: string | null;
  isDark: boolean;
  existingEvents?: CalendarEvent[];
  onAddEvent: (eventName: string, eventType: EventType) => void;
  onDeleteEvent?: (eventId: string) => void;
  onClose: () => void;
};

export function AddEventModal({ isOpen, selectedDate, isDark, existingEvents = [], onAddEvent, onDeleteEvent, onClose }: Props) {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>('wine');

  const handleSave = () => {
    if (eventName.trim()) {
      onAddEvent(eventName, eventType);
      setEventName('');
      setEventType('wine');
      onClose();
    }
  };

  const handleCancel = () => {
    setEventName('');
    setEventType('wine');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 print:hidden"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2A2A4A] rounded-lg shadow-2xl p-6 w-[90%] max-w-md z-50 print:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: isDark ? '#E8E8E8' : '#2C2C2C' }}>
          Add Event
        </h2>

        {selectedDate && (
          <p className="text-sm text-center mb-4" style={{ color: isDark ? '#A0A0B0' : '#666' }}>
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}

        <div className="space-y-4">
          {/* Existing Events */}
          {existingEvents.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#E8E8E8' : '#2C2C2C' }}>
                Events on this date:
              </label>
              <div className="space-y-2 max-h-[120px] overflow-y-auto pb-2">
                {existingEvents.map((event, index) => (
                  <div
                    key={`event-${event.id}-${index}`}
                    className="flex items-center justify-between p-2 rounded-md text-sm"
                    style={{
                      backgroundColor: isDark 
                        ? EVENT_TYPES[event.type].colorDark 
                        : EVENT_TYPES[event.type].color,
                      minHeight: '32px'
                    }}
                  >
                    <span className="text-white font-medium truncate flex items-center gap-1 flex-1">
                      <span>{EVENT_TYPES[event.type].emoji}</span>
                      <span className="truncate">{event.name}</span>
                    </span>
                    <button
                      onClick={() => {
                        if (onDeleteEvent) {
                          onDeleteEvent(event.id);
                        }
                      }}
                      className="ml-2 font-bold text-white hover:opacity-70 transition-opacity text-xs flex-shrink-0"
                      title="Delete event"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t" style={{ borderColor: isDark ? '#3A3A5A' : '#DDD' }}></div>
            </div>
          )}

          {/* Add New Event Section */}
          <div>
            <label className="block text-sm font-semibold mb-2 mt-3" style={{ color: isDark ? '#E8E8E8' : '#2C2C2C' }}>
              Add New Event:
            </label>
          </div>

          {/* Event Name */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#E8E8E8' : '#2C2C2C' }}>
              Event Name:
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter event name..."
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none transition-colors"
              style={{
                borderColor: isDark ? '#3A3A5A' : '#DDD',
                backgroundColor: isDark ? '#1A1A2E' : '#FFF',
                color: isDark ? '#E8E8E8' : '#2C2C2C'
              }}
              autoFocus
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: isDark ? '#E8E8E8' : '#2C2C2C' }}>
              Event Type:
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none transition-colors"
              style={{
                borderColor: isDark ? '#3A3A5A' : '#DDD',
                backgroundColor: isDark ? '#1A1A2E' : '#FFF',
                color: isDark ? '#E8E8E8' : '#2C2C2C'
              }}
            >
              {(Object.keys(EVENT_TYPES) as EventType[]).map((type) => (
                <option key={type} value={type} style={{ color: '#2C2C2C', backgroundColor: '#FFF' }}>
                  {EVENT_TYPES[type].emoji} {EVENT_TYPES[type].label}
                </option>
              ))}
            </select>
          </div>

          {/* Event Type Preview */}
          <div className="flex items-center gap-2 p-3 rounded-md" style={{ backgroundColor: isDark ? '#3A3A5A' : '#F0F0F0' }}>
            <span className="text-2xl">{EVENT_TYPES[eventType].emoji}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: isDark ? '#E8E8E8' : '#2C2C2C' }}>
                {EVENT_TYPES[eventType].label}
              </p>
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: isDark ? EVENT_TYPES[eventType].colorDark : EVENT_TYPES[eventType].color
                }}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!eventName.trim()}
            className="flex-1 py-2 px-4 rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            style={{
              backgroundColor: EVENT_TYPES[eventType].color,
              color: '#fff'
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 py-2 px-4 rounded-md font-semibold transition-all"
            style={{
              backgroundColor: isDark ? '#3A3A5A' : '#E8E8E0',
              color: isDark ? '#E8E8E8' : '#2C2C2C'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
