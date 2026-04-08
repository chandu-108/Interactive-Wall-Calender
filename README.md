# 📅 Interactive Wall Calendar

A highly interactive, production-ready React component bridging physical calendar aesthetics with modern web component patterns. Built for a frontend engineering challenge.

## ✨ Overview

This is a beautifully designed digital wall calendar that combines the charm of physical spiral-bound calendars with powerful modern features. Plan your year with an intuitive date range selector, keep personal notes for important events, manage events with multiple types (Wine, Birthday, Travel, Important, Party), stay inspired with daily motivational quotes, and never miss a holiday. The calendar features a stunning responsive design that works seamlessly on desktop, tablet, and mobile devices.

**Key Highlights:**
- 🎉 **Event Management** - Add, view, and delete events with 5 color-coded event types
- 📝 **Smart Notes** - Save month-wide or date range specific notes that auto-persist locally
- 📍 **Holiday Awareness** - Never miss important holidays with built-in indicators
- 📅 **Range Selection** - Easily select date ranges with beautiful visual feedback
- 💡 **Daily Inspiration** - Get motivated with inspirational quotes
- 🖨️ **Print Ready** - Export your calendar for physical use
- 🌙 **Dark Mode** - Comfortable viewing in any lighting condition
- ✨ **Beautiful UI** - Modern, polished design with smooth animations

## Design Decisions
- **Physical Aesthetic:** Faithfully recreates the spiral-bound wall calendar via pseudo-elements, drop shadows, background texturation, and layered layouts.
- **Color Theming:** Monthly color themes dynamically derived from hero image moods (warm autumn tones, cool winter blues, vibrant spring greens), injecting a sense of seasonal progression into the data.
- **Range Selection:** The range selection system is constructed via interconnected pill bands (using computed CSS radii spanning DateCell halves) preventing overflow into margins and handling breaking row edges naturally.
- **Note Architecture:** Notes are keyed per month and per date interval, immediately reacting out of localStorage via debounce upon keystrokes and persisting reliably without the need for an external DB.
- **Page Transitions:** Page-flip animation uses 3D CSS perspective logic for low-friction `rotateX` mimicking actual physical cardstock flipping without any external Javascript animation libraries.
- **Native Implementation:** Entire architecture built natively via ES6 `Date` API for zero dependency overhead.

## Run Locally
To test the application:
1. `npm install`
2. `npm run dev`
Open http://localhost:3000 to interact with the interactive demo.

## Features List

### Core Calendar Features
- [x] **Physical Wall Calendar Aesthetic** - Replicates a spiral-bound wall calendar with drop shadows, layered layouts, and authentic visual design
- [x] **Dynamic Monthly Themes** - Auto-generated color schemes for each month derived from beautiful Unsplash hero images
- [x] **Functional Date Grid** - Properly mapped calendar grid (6 rows × 7 columns) with configurable week start (Sun/Mon)
- [x] **Month & Year Display** - Distinct geometric chevron block interface for clear month/year navigation

### Date & Range Selection
- [x] **Smart Range Selector** - Seamless Start/End date range selection with visual range highlighting
- [x] **Range Visualization** - Amber continuous pill connection elegantly handling cell separation and row breaks
- [x] **Range Summary Bar** - Displays selected duration, specific boundary days, and date statistics

### Notes & Journaling
- [x] **Smart Notes Panel** - Two-tab system for Month-wide and Range-specific notes with independent persistence
- [x] **Local Storage Persistence** - Auto-saves notes with 600ms debounce smoothing (no external DB required)
- [x] **Character Counter** - Built-in constraints and character tracking for note management

### Special Features
- [x] **Inspirational Quotes** - Daily motivational quotes displayed in hero panel to inspire and motivate
- [x] **Holidays Display** - Native local holidays indicator with responsive CSS tooltips for easy reference
- [x] **Event Management System** - Add, view, and delete events with 5 event types (Wine, Birthday, Travel, Important, Party)
- [x] **Event Persistence** - All events auto-save to localStorage with unique IDs for reliable tracking
- [x] **Print Export** - High-quality print functionality using custom `@media print` with UI chrome removal
- [x] **Dark Mode** - Fully independent dark mode with deep navy tones, securely tracked in preferences

### User Experience
- [x] **Beautiful Modern UI** - Clean, intuitive interface with smooth animations and polished interactions
- [x] **High-Fidelity Page Flip** - 3D CSS perspective animation mimicking physical cardstock page transitions
- [x] **Mobile Responsive** - Flawlessly adapts to mobile with optimized touch targets and collapsing layouts
- [x] **A+ Accessibility** - Robust keyboard navigation and WAI-ARIA compliance for inclusive design
- [x] **Zero Dependencies** - Entire architecture built natively with ES6 `Date` API for optimal performance

## 🛠️ Technology Stack

- **Framework:** Next.js 16.2.2 with React 18+ and TypeScript
- **Styling:** Tailwind CSS with dark mode support and responsive design
- **State Management:** React hooks (useReducer, useState, useEffect)
- **Data Persistence:** Browser LocalStorage for events, notes, and preferences
- **Build Tools:** Turbopack for fast development and builds
- **APIs:** Native ES6 Date API for all calendar calculations
- **Deployment Ready:** Production-grade performance and accessibility

## 📁 Project Structure

```
src/
├── components/
│   ├── CalendarApp.tsx          # Main app container and state orchestration
│   ├── CalendarCard.tsx          # Card wrapper component
│   ├── CalendarGrid.tsx          # Calendar grid layout (7 columns × 6 rows)
│   ├── DateCell.tsx              # Individual date cell with events and holidays
│   ├── AddEventModal.tsx         # Modal for adding and managing events
│   ├── DarkModeToggle.tsx        # Dark mode toggle button
│   ├── HeroPanel.tsx             # Hero image with month/year overlay
│   ├── NotesPanel.tsx            # Notes management interface
│   ├── RangeSummaryBar.tsx       # Date range summary display
│   ├── PrintButton.tsx           # Print functionality button
│   ├── SpiralBinding.tsx         # Decorative spiral binding element
│   └── DailyQuote.tsx            # Daily inspirational quotes display
├── hooks/
│   ├── useCalendarReducer.ts     # Main calendar state management
│   ├── useCalendarEvents.ts      # Event CRUD operations and persistence
│   ├── useCalendarNotes.ts       # Notes management and persistence
│   └── useMonthTheme.ts          # Dynamic monthly color theming
├── types/
│   └── calendar.ts               # TypeScript type definitions
├── styles/
│   └── flip.module.css           # CSS transitions and animations
└── app/
    ├── page.tsx                  # Home page
    ├── layout.tsx                # Root layout
    └── globals.css               # Global styles
```

## 🎯 Event System Architecture

### Core Types
```typescript
type EventType = 'wine' | 'birthday' | 'travel' | 'important' | 'party';

interface CalendarEvent {
  id: string;           // Unique identifier
  date: string;         // ISO format: YYYY-MM-DD
  type: EventType;      // Event type
  name: string;         // Event name/description
}
```

### Event Hook (`useCalendarEvents.ts`)
- **getEventsForDate()** - Retrieve all events for a specific date
- **addEvent()** - Create a new event with unique ID
- **removeEvent()** - Delete an event by ID
- **updateEvent()** - Modify existing event details
- **Auto-persistence** - All operations automatically save to localStorage under `cal_events` key

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation & Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to interact with the interactive calendar demo.

## 💾 How It Works

### Notes Management
- **Month Notes:** Write notes for the entire month - auto-saves to localStorage
- **Range Notes:** Create notes for specific date ranges - perfect for event planning
- Both note types persist independently without requiring a backend database

### Event Management System

#### Supported Event Types
The calendar supports 5 different event types, each with a unique emoji and color-coded styling:

1. **🍷 Wine** - For wine tastings and wine-related events (Light: #EF4444 | Dark: #7F1D1D)
2. **🎂 Birthday** - For birthday celebrations (Light: #F97316 | Dark: #7C2D12)
3. **✈️ Travel** - For trips and travel plans (Light: #3B82F6 | Dark: #1E40AF)
4. **⭐ Important** - For important meetings and deadlines (Light: #8B5CF6 | Dark: #5B21B6)
5. **🎉 Party** - For parties and celebrations (Light: #EC4899 | Dark: #831843)

#### How to Add an Event
1. **Click on any date** in the calendar to open the Event Modal
2. **Enter event details:**
   - Event Name (any custom description)
   - Event Type (select from the 5 types above)
3. **See color preview** of your selected event type
4. **Click Save** to add the event

#### How to View Events
- **On Calendar:** Events appear as colored boxes with emoji and name directly on date cells
- **Maximum display:** Up to 2 events shown per date cell
- **Overflow indicator:** If more than 2 events exist, a "+N" indicator shows the count
- **Hover to delete:** Hover over any event box to reveal the delete button (✕)

#### How to Manage Events
- **Delete from date cell:** Hover over an event box and click the ✕ button
- **Delete from modal:** Click a date to open the modal, view existing events below the "Events on this date" section, and click ✕ to remove them
- **Event persistence:** All events are automatically saved to localStorage with unique IDs
- **Reliable tracking:** Events persist across browser sessions and page reloads

#### Event Display Features
- **Dark mode support:** Event colors automatically adjust for dark mode
- **Date-specific:** Events are tied to specific dates (YYYY-MM-DD format)
- **Emoji indicators:** Each event type displays its unique emoji for quick identification
- **Compact display:** Event names truncate gracefully on smaller displays
- **Scrollable list:** Multiple events visible in modal with scrollable section

### Range Selection
1. Click a start date to begin range selection
2. Click an end date to complete the range
3. View stats in the Range Summary Bar
4. Switch to Range Notes tab to add notes for this specific period

### Dark Mode
- Toggle dark mode with the moon/sun button in the top navigation
- Preference is saved to localStorage
- Automatically respects system dark mode preference on first load
- Event colors adapt perfectly to dark mode with high contrast

### Printing
- Click the Print button to open print preview
- All UI chrome is automatically hidden in print view
- Perfect for creating physical wall calendar copies
- Events and notes print correctly with maintained formatting

## 🎨 Customization

### Month Colors
Calendar colors automatically adjust based on the monthly hero image mood:
- Warm autumn tones (September-November)
- Cool winter blues (December-February)  
- Vibrant spring greens (March-May)
- Bright summer yellows (June-August)

### Week Start
Configure whether your week starts on Sunday or Monday - setting persists in localStorage.

## 📱 Responsive Design

The calendar automatically adapts to all screen sizes:
- **Desktop:** Full feature set with spacious layout
- **Tablet:** Optimized touch interactions
- **Mobile:** Collapsing layout maintaining all functionality

## ♿ Accessibility

- Fully keyboard navigable with standard conventions
- ARIA labels and roles for screen readers
- High contrast mode support
- Focus indicators for keyboard users
- Semantic HTML structure

## 📄 License

This project was built as a frontend engineering challenge showcasing modern React patterns and design implementation.

---

**Built with ❤️ and attention to detail** - A calendar that's both beautiful and functional.
