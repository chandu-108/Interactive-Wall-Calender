# 📅 Interactive Wall Calendar

A highly interactive, production-ready React component bridging physical calendar aesthetics with modern web component patterns. Built for a frontend engineering challenge.

## ✨ Overview

This is a beautifully designed digital wall calendar that combines the charm of physical spiral-bound calendars with powerful modern features. Plan your year with an intuitive date range selector, keep personal notes for important events, stay inspired with daily motivational quotes, and never miss a holiday. The calendar features a stunning responsive design that works seamlessly on desktop, tablet, and mobile devices.

**Key Highlights:**
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
- [x] **Print Export** - High-quality print functionality using custom `@media print` with UI chrome removal
- [x] **Dark Mode** - Fully independent dark mode with deep navy tones, securely tracked in preferences

### User Experience
- [x] **Beautiful Modern UI** - Clean, intuitive interface with smooth animations and polished interactions
- [x] **High-Fidelity Page Flip** - 3D CSS perspective animation mimicking physical cardstock page transitions
- [x] **Mobile Responsive** - Flawlessly adapts to mobile with optimized touch targets and collapsing layouts
- [x] **A+ Accessibility** - Robust keyboard navigation and WAI-ARIA compliance for inclusive design
- [x] **Zero Dependencies** - Entire architecture built natively with ES6 `Date` API for optimal performance

## 🛠️ Technology Stack

- **Framework:** Next.js 14+ with React 18+
- **Language:** TypeScript for type-safe development
- **Styling:** CSS Modules with responsive design patterns
- **State Management:** React hooks (useReducer, useState)
- **Storage:** Browser Local Storage for persistent notes
- **APIs:** Native ES6 Date API for all calendar calculations
- **Build Tools:** ESLint for code quality, PostCSS for styling
- **Deployment Ready:** Production-grade performance and accessibility

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

### Range Selection
1. Click a start date to begin range selection
2. Click an end date to complete the range
3. View stats in the Range Summary Bar
4. Switch to Range Notes tab to add notes for this specific period

### Printing
- Click the Print button to open print preview
- All UI chrome is automatically hidden in print view
- Perfect for creating physical wall calendar copies

### Dark Mode
- Toggle dark mode with the moon/sun button in the top navigation
- Preference is saved to localStorage
- Automatically respects system dark mode preference on first load

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
