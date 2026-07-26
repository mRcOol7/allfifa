# 🏆 AllFIFA - World Cup Knockout & 2D Tactical Live Match Simulator

A state-of-the-art, responsive **World Cup Knockout Tournament & 2D Tactical Football Live Match Simulator** built with React 18, TypeScript, Tailwind CSS, Framer Motion, and Zustand. The application simulates full 256-team World Cup tournaments and features an advanced 2D animated pitch simulator complete with TV VAR (Video Assistant Referee), interactive sudden death penalty shootouts, live action heatmaps, manager tactical adjustments, EA FC 99 Ultimate Team player card inspectors, and official national squad rosters.

---

## 🌟 Key Features

### 📺 1. TV VAR (Video Assistant Referee) System
- **3D Semi-Automated Offside Line Grid**: Renders 3D laser-aligned pitch lines comparing defender and attacker positioning with precise margin readings (*e.g., "OFFSIDE BY +3.2cm — GOAL CANCELLED"* vs *"ON-SIDE (0.0cm)"*).
- **4K Goal-Line Technology Sensor**: High-speed camera sensor detecting whether the ball 100% crossed the goal line.
- **TV Referee Verdict Reveal**: High-tech verdict graphics (`GOAL CONFIRMED ⚽`, `NO GOAL (OFFSIDE) ❌`, `PENALTY AWARDED 🎯`, `RED CARD GIVEN 🟥`).
- **Seamless Live Pause & Auto-Resume**: The match timer automatically pauses when a VAR incident occurs and resumes seamlessly once the final verdict is confirmed.

### ⚽ 2. Interactive Sudden Death Penalty Shootout Engine
- **Shot Placement Direction Controls**: Choose shot targets in real time: **Top Left ↖️**, **Top Center ⬆️**, **Top Right ↗️**, **Bottom Left ↙️**, **Bottom Right ↘️**, or **Random Shot 🎲**.
- **Goalkeeper Dive & Net Animation**: Animated goalkeeper diving trajectories and goal net ripples.
- **5-Kick & Sudden Death Scoreboard**: Tracks kick-by-kick penalty outcomes (`⚽ GOAL` vs `❌ SAVED / MISSED`) with early win detection.

### 🗺️ 3. Live Pitch Action Heatmap Overlay
- **`Heatmap ON 🔥 / OFF ❄️` Toggle**: Renders real-time action heat density across the 2D pitch radar.
- **Dynamic Radial Heat Density**: Visualizes ball possession and player movement intensity with glowing radial color gradients (**Emerald Green 🟢 $\rightarrow$ Amber 🟡 $\rightarrow$ Glowing Red 🔥**).

### ⚡ 4. Mid-Match Manager Tactical Adjustments Bar
Switch manager tactics during live match play:
- **🔥 High Gegenpress**: Boosts team goal creation and attacking pressure (+65% goal probability).
- **⚡ Blitz Counter-Attack**: Fast-breaks ball progression directly towards the opponent's 18-yard box.
- **🛡️ Park The Bus**: Sets an ultra-defensive low block to protect a lead (-60% opponent scoring chance).
- **Balanced**: Standard tactical setup.

### 🃏 5. EA FC 99-Rated Ultimate Team Player Card Inspector
- **Clickable Goalscorer Badges**: Click any goalscorer on the match scoreboard (`⚽ Mbappe 42' 🃏`) to launch their EA FC 99 Gold Icon Card.
- **Full FIFA Attributes Breakdown**: Displays **PAC** (Pace), **SHO** (Shooting), **PAS** (Passing), **DRI** (Dribbling), **DEF** (Defending), and **PHY** (Physicality).
- **Gold Icon Holographic Styling**: Complete with overall OVR rating, position badge, country flag, and total goal count.

### ⚽ 6. Live 90-Minute Football Match Simulator & 2D Tactical Pitch Radar
- **22 Animated Player Pins**: Renders 11 Home vs 11 Away player pins with Framer Motion spring physics.
- **Tactical Formations**: Instant pitch coordinate generation for `4-3-3`, `4-2-3-1`, `3-5-2`, and `4-4-2`.
- **45' Half-Time Side Switch**: Teams switch pitch sides at 45' (`Home` attacks right-to-left in 2nd half).
- **Set Pieces & Sound Effects**: Full audio and visual events for 🤾 Throw-ins, ⛳ Corner Kicks, 🎯 Free Kicks, 🟨 Yellow Cards, 🧤 Saves, and ⚽ Goals.
- **Real Trajectory Integration**: Uses real 2D goal trajectories (`ballPath`) fetched from `soccerfootballsim.com/goalhighlight/goalHighlights.json`.

### 🇩🇪 7. Official International Squad Rosters & ISO Code Normalization
- **20+ Official Squad Rosters**: Built-in player banks for Germany (Neuer, Rüdiger, Musiala, Wirtz, Havertz, Nagelsmann), Argentina, France, Brazil, England, Spain, Portugal, Italy, and more.
- **ISO Code Alias Normalization**: Mapped ISO 2-letter (`DE`), ISO 3-letter (`DEU`, `GER`), and country names (`Germany`) directly to official squad banks.

### 📋 8. FotMob & SofaScore Lineup Visualizer
- **Vertical Green Pitch Cards**: Side-by-side pitch visualizers for Home and Away teams displaying jersey icons (`👕`), player names, live ratings (*e.g., `7.7`*), goal badges (⚽), and subbed arrows (⬇️).
- **Bench Substitutes**: Renders bench players under each pitch with subbed-on green up arrows (🟢 ⬆️) and goal icons.
- **Substitutions Timeline**: Displays exact minute, player IN 🟢, and player OUT 🔴.

### 🏆 9. 256-Team World Cup Tournament Bracket
- **Full 256-Team Mega Tournament**: Simulates 128 simultaneous matches in Round 1 with zero byes.
- **Golden Boot & Golden Glove**: Real-time award tracking for Top Scorer and Top Clean Sheet Goalkeeper.
- **REST Countries v5 API Integration**: Fetches ~254 country records using Bearer token authentication with resilient offline fallback dataset.

---

## 🔑 How to Configure the REST Countries API Key

Create a `.env` file in the project root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Open `.env` and paste your Bearer API token:

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

### Production Build

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
