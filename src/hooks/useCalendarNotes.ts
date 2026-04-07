import { useState, useEffect, useRef } from 'react';

export function useCalendarNotes(key: string | null) {
  const [note, setNote] = useState<string>('');
  const [showSaved, setShowSaved] = useState(false);
  const isInitialMount = useRef(true);
  const currentKey = useRef(key);

  useEffect(() => {
    if (!key) {
      setNote('');
      return;
    }
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      setNote(saved);
    } else {
      setNote('');
    }
    currentKey.current = key;
    isInitialMount.current = true;
  }, [key]);

  useEffect(() => {
    if (!key) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (currentKey.current !== key) return; // Wait for effect 1

    const handler = setTimeout(() => {
      localStorage.setItem(key, note);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    }, 600);

    return () => clearTimeout(handler);
  }, [note, key]);

  return { note, setNote, showSaved };
}
