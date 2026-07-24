import React, { useEffect } from 'react';
import { useSimulatorStore } from './store/useSimulatorStore';
import { KnockoutBracket } from './components/KnockoutBracket';
import { CountryDirectory } from './components/CountryDirectory';
import { ChampionCelebration } from './components/ChampionCelebration';
import { HallOfFameModal } from './components/HallOfFameModal';
import { H2HPredictorModal } from './components/H2HPredictorModal';
import { TournamentBracketSize } from './types/simulator';
import { Trophy, Globe, Play, ChevronRight, RefreshCw, ShieldCheck, Sparkles, Medal, Swords } from 'lucide-react';

export const App: React.FC = () => {
  const {
    allCountries,
    sovereignCountries,
    isLoadingCountries,
    currentTournament,
    bracketSize,
    savedTournaments,
    loadCountries,
    setBracketSize,
    startTournament,
    nextRound,
    resetTournament,
    toggleDirectory,
    toggleHallOfFame,
    toggleH2H
  } = useSimulatorStore();

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  if (isLoadingCountries && allCountries.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4 text-slate-100 p-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 p-[2px] animate-spin">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black tracking-wider uppercase">Loading World Cup Simulator</h2>
          <p className="text-xs text-slate-400 font-mono">
            Fetching ~254 Countries via REST Countries v5 API...
          </p>
        </div>
      </div>
    );
  }

  const currentRoundNum = currentTournament ? currentTournament.currentRoundIndex + 1 : 0;
  const totalRoundsNum = currentTournament ? currentTournament.rounds.length : 0;
  const progressPercent = currentTournament
    ? Math.round((currentRoundNum / (totalRoundsNum || 1)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Glass Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-[2px] shadow-lg shadow-emerald-500/10">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                World Cup Knockout Simulator
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                REST Countries v5 • Pure Instant Score Simulation
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center space-x-2.5">
            {/* H2H Exhibition Button */}
            <button
              onClick={() => toggleH2H(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-1.5 transition font-semibold"
            >
              <Swords className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">H2H Exhibition</span>
            </button>

            {/* Hall of Fame Trigger */}
            <button
              onClick={() => toggleHallOfFame(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 flex items-center space-x-1.5 transition font-semibold"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Hall of Fame</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono text-[10px] font-bold">
                {savedTournaments.length}
              </span>
            </button>

            {/* Directory Drawer Trigger */}
            <button
              onClick={() => toggleDirectory(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2 transition"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline font-medium">Browse All Nations</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                {allCountries.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Single Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Tournament Control & Hero Setup Panel */}
        {!currentTournament ? (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{allCountries.length} Nations & Territories Loaded</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Simulate 256-Team Mega World Cup
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every single nation and territory plays in Round 1. 128 simultaneous matches in the Round of 256 with zero byes!
              </p>
            </div>

            {/* Bracket Size & Start Controls */}
            <div className="max-w-md mx-auto bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Tournament Bracket Format
                </label>
                <select
                  value={bracketSize}
                  onChange={(e) => {
                    const val = e.target.value;
                    setBracketSize(val === 'ALL' ? 256 : Number(val) as TournamentBracketSize);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value={256}>
                    256 Teams Mega Bracket (128 Matches in R1 • All 256 teams play!)
                  </option>
                  <option value={128}>
                    128 Teams Bracket (64 Matches in R1)
                  </option>
                  <option value={64}>
                    64 Teams Bracket (32 Matches in R1)
                  </option>
                  <option value={32}>
                    32 Teams Bracket (16 Matches in R1)
                  </option>
                </select>
              </div>

              <button
                onClick={startTournament}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 transition transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start 256-Team Tournament</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Tournament View */
          <div className="space-y-6">
            {/* Progress Bar & Header */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">{currentTournament.name}</span>
                </div>
                <div className="font-mono text-slate-400">
                  Round {currentRoundNum} / {totalRoundsNum}
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Knockout Bracket Grid View */}
            <KnockoutBracket
              tournament={currentTournament}
              onNextRound={nextRound}
              onReset={resetTournament}
            />
          </div>
        )}

      </main>

      {/* Champion Celebration Modal */}
      {currentTournament && currentTournament.status === 'COMPLETED' && (
        <ChampionCelebration tournament={currentTournament} onRestart={resetTournament} />
      )}

      {/* H2H Exhibition Modal */}
      <H2HPredictorModal />

      {/* Hall of Fame Modal */}
      <HallOfFameModal />

      {/* Country Directory Drawer Modal */}
      <CountryDirectory />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>World Cup Knockout Simulator</span>
          <span>REST Countries v5 API • Bearer Auth • 256 Team Full Knockout</span>
        </div>
        <p className="text-[11px] text-slate-500 font-sans italic">
          ⚠️ Disclaimer: Player names, match events, and goal statistics are procedurally generated for simulation purposes and may be fictional or inaccurate.
        </p>
      </footer>

    </div>
  );
};

export default App;
