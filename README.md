# 🏆 AllFIFA - World Cup Knockout & Live 2D Football Match Simulator

A modern, responsive **World Cup Knockout Simulator & Live 2D Football Match Ticker App** built with React 18, TypeScript, Tailwind CSS, Framer Motion, and Zustand. The application simulates full 256-team World Cup tournaments and features an advanced 2D animated tactical pitch match simulator with real-time player movement, commentary, extra time, penalty shootouts, FotMob-styled lineup cards, and ball trajectory integration.

---

## 🌟 Key Features

### ⚽ Live 90-Minute Football Match Ticker & 2D Tactical Pitch Radar
- **2D Animated Pitch Radar**: Renders 22 individual animated player pins (11 Home vs 11 Away) with Framer Motion spring physics.
- **Ball-Carrier & Pressing Defender Dynamics**: Only the ball-carrier and pressing defender charge directly to ball coordinates while other 20 players make realistic zonal runs.
- **Dynamic Tactical Formations**: Instant pitch coordinate generation for tactics: `4-3-3`, `4-2-3-1`, `3-5-2`, and `4-4-2`.
- **45' Half-Time Side Switch**: Teams switch pitch sides at 45' (`Home` attacks right-to-left in 2nd half).
- **Set Pieces & Sound Effects**: Full audio and visual events for 🤾 Throw-ins, ⛳ Corner Kicks, 🎯 Free Kicks, 🟨 Yellow Cards, 🧤 Saves, and ⚽ Goal Celebrations.
- **Real Trajectory Integration**: Fetches real 2D goal trajectories (`ballPath`) live from `https://soccerfootballsim.com/goalhighlight/goalHighlights.json`.

### ⏱️ Extra Time (91'-120') & Penalty Shootout Engine
- **30 Mins Extra Time**: Tied 90-minute matches seamlessly continue into Extra Time (91'–120').
- **Penalty Shootout (PK 🥅)**: 5-Kick + Sudden Death Penalty Shootout engine with detailed kick-by-kick results log.
- **Match Rules Selector**: Toggle between `🏆 Cup Final / Knockout` (ET + PK) and `⚽ Regular Friendly` (90' Draw).

### 🔍 Searchable Country Dropdown
- **Instant Type-to-Search**: Built-in search input field (`🔍 Search`) inside team selector dropdowns for instant filtering of ~254 nations.

### 📋 FotMob & SofaScore Styled Lineup Visualizer
- **Vertical Green Pitch Cards**: Side-by-side pitch visualizer for Home and Away teams.
- **Player Pins & Rating Badges**: Displays jersey shirt icons (`👕`), player names, live match ratings (*e.g., `7.7`*), goal badges (⚽), subbed-out arrows (⬇️), and MOTM stars (⭐).
- **Bench Substitutes**: Renders bench players under each pitch with subbed-on green up arrows (🟢 ⬆️) and goal icons.
- **Broadcast Substitutions Timeline**: 2-Column player substitution card displaying exact minute, player IN 🟢, and player OUT 🔴.
- **Top Performers Card**: Emerald green summary card featuring the Top 3 Rated Performers.

### 🏆 256-Team World Cup Tournament Bracket
- **Full 256-Team Format**: Simulates 128 simultaneous matches in Round 1 with zero byes.
- **Tournament Awards**: Tracks Golden Boot (Top Scorer) and Golden Glove (Clean Sheets) in real time.
- **REST Countries API Integration**: Fetches ~254 country records using Bearer token authentication with sovereign country filtering and resilient offline fallback dataset.

---

## 🔑 How to Configure the REST Countries API Key

Create a `.env` file in the project root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Open `.env` and configure your API Bearer token:

```env
# REST Countries v5 API Configuration
VITE_REST_COUNTRIES_BEARER_TOKEN=rc_live_your_bearer_token_here
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Execution

1. Navigate to the project directory:
   ```bash
   cd e:\allfifa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` (or `http://localhost:3001`).

### Building for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & Canvas Confetti
- **Icons**: Lucide React
- **State Management**: Zustand
- **Audio Engine**: Web Audio API Sound Effects
- **External Datasets**: REST Countries v5 API & SoccerFootballSim Goal Highlights API
