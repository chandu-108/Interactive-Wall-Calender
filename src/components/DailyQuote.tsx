import { MonthTheme } from '../types/calendar';

// 48 unique inspirational quotes — one per month from Jan 2025 → Dec 2028
// Key format: "YYYY-M" (no leading zero on month)
const MONTHLY_QUOTES: Record<string, { text: string; author: string }> = {
  // 2025
  '2025-1':  { text: "The beginning is always today.", author: "Mary Shelley" },
  '2025-2':  { text: "Love is the only force capable of transforming an enemy into a friend.", author: "Martin Luther King Jr." },
  '2025-3':  { text: "No winter lasts forever; no spring skips its turn.", author: "Hal Borland" },
  '2025-4':  { text: "April hath put a spirit of youth in everything.", author: "William Shakespeare" },
  '2025-5':  { text: "The earth laughs in flowers.", author: "Ralph Waldo Emerson" },
  '2025-6':  { text: "Deep summer is when laziness finds respectability.", author: "Sam Keen" },
  '2025-7':  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  '2025-8':  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  '2025-9':  { text: "If you fall behind, run faster. Never give up.", author: "Jesse Jackson" },
  '2025-10': { text: "Autumn is a second spring where every leaf is a flower.", author: "Albert Camus" },
  '2025-11': { text: "We must be willing to let go of the life we planned so as to have the life waiting for us.", author: "Joseph Campbell" },
  '2025-12': { text: "As you end this year, know that the best is yet to come.", author: "Unknown" },

  // 2026
  '2026-1':  { text: "Your new life is going to cost you your old one. It's worth it.", author: "Brianna Wiest" },
  '2026-2':  { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
  '2026-3':  { text: "It's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  '2026-4':  { text: "The sun himself is weak when he first rises, and gathers strength and courage as the day gets on.", author: "Charles Dickens" },
  '2026-5':  { text: "One small positive thought in the morning can change your whole day.", author: "Dalai Lama" },
  '2026-6':  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  '2026-7':  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  '2026-8':  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  '2026-9':  { text: "You can't go back and change the beginning, but you can start where you are and change the ending.", author: "C.S. Lewis" },
  '2026-10': { text: "Be so good they can't ignore you.", author: "Steve Martin" },
  '2026-11': { text: "Tomorrow is always fresh, with no mistakes in it yet.", author: "L.M. Montgomery" },
  '2026-12': { text: "Cheers to a new year and another chance for us to get it right.", author: "Oprah Winfrey" },

  // 2027
  '2027-1':  { text: "Believe in the beauty of your dreams and the power of your persistence.", author: "Harriet Tubman" },
  '2027-2':  { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  '2027-3':  { text: "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.", author: "Roald Dahl" },
  '2027-4':  { text: "Everything is possible to him who wills.", author: "Alexandre Dumas" },
  '2027-5':  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" },
  '2027-6':  { text: "Nothing is impossible, the word itself says 'I'm possible!'", author: "Audrey Hepburn" },
  '2027-7':  { text: "Life is short and the world is wide.", author: "Simon Raven" },
  '2027-8':  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  '2027-9':  { text: "We cannot direct the wind, but we can adjust the sails.", author: "Dolly Parton" },
  '2027-10': { text: "You are never too old to set another goal or to dream a new dream.", author: "Leslie Brown" },
  '2027-11': { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Emerson" },
  '2027-12': { text: "It's never too late to become who you might have been.", author: "George Eliot" },

  // 2028
  '2028-1':  { text: "New year — a new chapter, new verse, or just the same old story? Ultimately we write it.", author: "Alex Morritt" },
  '2028-2':  { text: "A small act of kindness today shapes a greater world tomorrow.", author: "Unknown" },
  '2028-3':  { text: "Don't wait for the perfect moment. Take the moment and make it perfect.", author: "Zoey Sayward" },
  '2028-4':  { text: "Spring shows what God can do with a drab and dirty world.", author: "Virgil A. Kraft" },
  '2028-5':  { text: "Your only limit is your mind.", author: "Unknown" },
  '2028-6':  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  '2028-7':  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  '2028-8':  { text: "Great things never come from comfort zones.", author: "Unknown" },
  '2028-9':  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  '2028-10': { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
  '2028-11': { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  '2028-12': { text: "End each year with gratitude and begin the next one with hope.", author: "Unknown" },
};

type Props = {
  theme: MonthTheme;
  isDark: boolean;
  currentYear: number;
  currentMonth: number; // 0-indexed
};

export function DailyQuote({ theme, isDark, currentYear, currentMonth }: Props) {
  const key = `${currentYear}-${currentMonth + 1}`;
  const quote = MONTHLY_QUOTES[key] ?? { text: "Every month is a new beginning.", author: "Unknown" };

  return (
    <div
      className="mx-3 sm:mx-4 mt-3 mb-1 px-3 py-2 rounded-lg border"
      style={{
        borderColor: isDark ? '#2E2E4E' : '#E0E0DC',
        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      }}
    >
      <div
        className="text-[8px] uppercase tracking-widest font-bold mb-1"
        style={{ color: theme.accent }}
      >
        ✦ Monthly Inspiration
      </div>
      <p
        className="text-[11px] leading-[16px] italic"
        style={{ color: isDark ? '#C8C8D8' : '#444444' }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
      <p
        className="text-[9px] mt-1 text-right font-semibold"
        style={{ color: theme.accent }}
      >
        — {quote.author}
      </p>
    </div>
  );
}
