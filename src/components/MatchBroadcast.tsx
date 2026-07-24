import React, { useState } from 'react';
import { Match, MatchEvent } from '../types/simulator';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { Play, FastForward, Tv, AlertTriangle, Shield, Activity, BarChart2, Flame, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatchBroadcastProps {
  match: Match;
  onNextMatch?: () => void;
}

export const MatchBroadcast: React.FC<MatchBroadcastProps> = ({ match, onNextMatch }) => {
  const { stepActiveMatchMinute, simulateActiveMatchFully, simSpeed } = useSimulatorStore();

  const [activeTab, setActiveTab] = useState<'COMMENTARY' | 'STATS' | 'LINEUPS'>('COMMENTARY');

  const home = match.homeTeam;
  const away = match.awayTeam;
  const isCompleted = match.status === 'COMPLETED';

  const recentVarEvent = match.events.find(
    e => e.minute === match.currentMinute && (e.type.startsWith('VAR_'))
  );

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'GOAL':
      case 'PENALTY_GOAL':
        return <span className="px-2 py-0.5 text-[10px] font-black bg-amber-500 text-slate-950 rounded-full">GOAL ⚽</span>;
      case 'YELLOW_CARD':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-400 text-slate-950 rounded">YELLOW 🟨</span>;
      case 'RED_CARD':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded">RED CARD 🟥</span>;
      case 'VAR_GOAL_CHECK':
      case 'VAR_PENALTY_CHECK':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500 text-white rounded">VAR 📺</span>;
      case 'SAVE':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500 text-slate-950 rounded">SAVE 🧤</span>;
      case 'CORNER':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500 text-white rounded">CORNER 🚩</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 rounded">EVENT</span>;
    }
  };

  const currentMomentum = match.momentumHistory[match.momentumHistory.length - 1] || 0;

  return (
    <div className="space-y-6">

      {/* Top TV Scorebug Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6">
        {/* Animated Stadium BG Lighting & Turf Subtle Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-950 to-slate-950" />

        <div className="relative z-10">

          {/* Broadcast Header Ribbon */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCompleted ? 'bg-slate-500' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isCompleted ? 'bg-slate-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                {isCompleted ? 'FINAL RESULT' : 'LIVE BROADCAST'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-semibold text-emerald-400">{match.roundName}</span>
            </div>

            <div className="text-xs font-medium text-slate-400 flex items-center space-x-2">
              <Tv className="w-3.5 h-3.5 text-emerald-400" />
              <span>{match.venue}</span>
            </div>
          </div>

          {/* Teams & Score Display */}
          <div className="grid grid-cols-12 items-center gap-4 py-2">

            {/* Home Team */}
            <div className="col-span-4 flex flex-col md:flex-row items-center justify-end space-y-2 md:space-y-0 md:space-x-4 text-right">
              <div className="min-w-0">
                <h2 className="text-lg md:text-2xl font-black text-white truncate">{home.name}</h2>
                <span className="text-xs font-semibold text-slate-400">ATT {home.ratings.att} | DEF {home.ratings.def}</span>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-2 shadow-xl flex items-center justify-center flex-shrink-0">
                <img src={home.crestUrl || home.flagSvg} alt={home.name} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Score Center Clock */}
            <div className="col-span-4 flex flex-col items-center justify-center">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-6 py-3 flex items-center space-x-4 shadow-2xl">
                <span className="text-3xl md:text-5xl font-black font-mono text-white tracking-tight">{match.homeScore}</span>
                <span className="text-2xl text-slate-600 font-light">-</span>
                <span className="text-3xl md:text-5xl font-black font-mono text-white tracking-tight">{match.awayScore}</span>
              </div>

              {/* Minute Clock Badge */}
              <div className="mt-3 flex items-center space-x-2">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold rounded-full">
                  {match.isPenalties
                    ? `PEN (${match.homePenalties ?? 0} - ${match.awayPenalties ?? 0})`
                    : `${match.currentMinute}' MIN`}
                </span>
                {match.isExtraTime && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded">ET</span>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="col-span-4 flex flex-col md:flex-row-reverse items-center justify-start space-y-2 md:space-y-0 md:space-x-4 md:space-x-reverse text-left">
              <div className="min-w-0">
                <h2 className="text-lg md:text-2xl font-black text-white truncate">{away.name}</h2>
                <span className="text-xs font-semibold text-slate-400">ATT {away.ratings.att} | DEF {away.ratings.def}</span>
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-2 shadow-xl flex items-center justify-center flex-shrink-0">
                <img src={away.crestUrl || away.flagSvg} alt={away.name} className="w-full h-full object-contain" />
              </div>
            </div>

          </div>

          {/* Quick Sim Action Toolbar */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              {!isCompleted && (
                <>
                  <button
                    onClick={stepActiveMatchMinute}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+1 Minute</span>
                  </button>
                  <button
                    onClick={simulateActiveMatchFully}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Sim Rest of Match</span>
                  </button>
                </>
              )}

              {isCompleted && onNextMatch && (
                <button
                  onClick={onNextMatch}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Next Match / Round</span>
                </button>
              )}
            </div>

            {/* Momentum Indicator Bar */}
            <div className="flex items-center space-x-3 bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800 min-w-[240px]">
              <span className="text-[10px] font-bold text-slate-400">MOMENTUM</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 ${currentMomentum >= 0 ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                  style={{
                    width: `${Math.min(100, Math.abs(currentMomentum))}%`,
                    marginLeft: currentMomentum < 0 ? 'auto' : '0'
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animated VAR Review Monitor Overlay Modal */}
      <AnimatePresence>
        {recentVarEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-2xl bg-purple-950/80 border-2 border-purple-500/50 p-4 shadow-2xl backdrop-blur-md text-white flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900 flex items-center justify-center animate-pulse">
                <Tv className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-purple-300 tracking-wider">VAR MONITOR CHECK IN PROGRESS</span>
                <p className="text-sm font-semibold">{recentVarEvent.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2D Grass Pitch Radar Field */}
      <div className="relative h-44 rounded-3xl bg-emerald-950/60 border border-emerald-500/20 overflow-hidden shadow-inner p-4 flex items-center justify-between">
        {/* Pitch Turf Markings */}
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-3xl m-2 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-emerald-500/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 border-2 border-emerald-500/20 rounded-full pointer-events-none" />

        {/* Left Goal Area */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-24 border-2 border-emerald-500/20 pointer-events-none" />
        {/* Right Goal Area */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-24 border-2 border-emerald-500/20 pointer-events-none" />

        {/* Home Team Squad Radar Marker */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 p-1.5 shadow-lg">
            <img src={home.flagSvg} alt="" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-300 block">{home.name}</span>
            <span className="text-[10px] text-slate-400">{match.stats.home.possession}% Possession</span>
          </div>
        </div>

        {/* Animated Moving Ball Position based on Momentum */}
        <motion.div
          className="relative z-20 w-8 h-8 rounded-full bg-white shadow-xl shadow-white/50 border-2 border-slate-900 flex items-center justify-center text-xs font-black text-slate-950"
          animate={{
            x: `${currentMomentum * 1.8}px`
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        >
          ⚽
        </motion.div>

        {/* Away Team Squad Radar Marker */}
        <div className="relative z-10 flex items-center space-x-3 text-right">
          <div>
            <span className="text-xs font-bold text-emerald-300 block">{away.name}</span>
            <span className="text-[10px] text-slate-400">{match.stats.away.possession}% Possession</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 p-1.5 shadow-lg">
            <img src={away.flagSvg} alt="" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>

      {/* Broadcast Tab Selector (Commentary vs Match Stats) */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('COMMENTARY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'COMMENTARY'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Commentary ({match.events.length})
          </button>
          <button
            onClick={() => setActiveTab('STATS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'STATS'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Match Statistics
          </button>
        </div>

        {/* Tab 1: Live Commentary Stream */}
        {activeTab === 'COMMENTARY' && (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {match.events.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-6 text-center">Match ready for kickoff. Press play to start live simulation!</p>
            ) : (
              match.events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3"
                >
                  <span className="font-mono text-xs font-bold text-emerald-400 w-8 pt-0.5">{ev.minute}'</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      {getEventBadge(ev.type)}
                      <span className="text-xs font-bold text-white">{ev.player || 'Match Event'}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Match Statistics */}
        {activeTab === 'STATS' && (
          <div className="space-y-4 pt-2">
            <StatComparisonRow label="Possession %" homeVal={`${match.stats.home.possession}%`} awayVal={`${match.stats.away.possession}%`} homePct={match.stats.home.possession} awayPct={match.stats.away.possession} />
            <StatComparisonRow label="Total Shots" homeVal={match.stats.home.shots} awayVal={match.stats.away.shots} homePct={match.stats.home.shots * 8} awayPct={match.stats.away.shots * 8} />
            <StatComparisonRow label="Shots on Target" homeVal={match.stats.home.shotsOnTarget} awayVal={match.stats.away.shotsOnTarget} homePct={match.stats.home.shotsOnTarget * 12} awayPct={match.stats.away.shotsOnTarget * 12} />
            <StatComparisonRow label="Expected Goals (xG)" homeVal={match.stats.home.xG} awayVal={match.stats.away.xG} homePct={match.stats.home.xG * 25} awayPct={match.stats.away.xG * 25} />
            <StatComparisonRow label="Corners" homeVal={match.stats.home.corners} awayVal={match.stats.away.corners} homePct={match.stats.home.corners * 15} awayPct={match.stats.away.corners * 15} />
            <StatComparisonRow label="Fouls" homeVal={match.stats.home.fouls} awayVal={match.stats.away.fouls} homePct={match.stats.home.fouls * 10} awayPct={match.stats.away.fouls * 10} />
            <StatComparisonRow label="Goalkeeper Saves" homeVal={match.stats.home.saves} awayVal={match.stats.away.saves} homePct={match.stats.home.saves * 15} awayPct={match.stats.away.saves * 15} />
            <StatComparisonRow label="Yellow Cards" homeVal={match.stats.home.yellowCards} awayVal={match.stats.away.yellowCards} homePct={match.stats.home.yellowCards * 25} awayPct={match.stats.away.yellowCards * 25} />
            <StatComparisonRow label="Red Cards" homeVal={match.stats.home.redCards} awayVal={match.stats.away.redCards} homePct={match.stats.home.redCards * 50} awayPct={match.stats.away.redCards * 50} />
          </div>
        )}
      </div>

    </div>
  );
};

interface StatRowProps {
  label: string;
  homeVal: string | number;
  awayVal: string | number;
  homePct: number;
  awayPct: number;
}

const StatComparisonRow: React.FC<StatRowProps> = ({ label, homeVal, awayVal, homePct, awayPct }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-emerald-400 font-mono">{homeVal}</span>
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="text-emerald-400 font-mono">{awayVal}</span>
      </div>
      <div className="flex h-2 bg-slate-900 rounded-full overflow-hidden space-x-1">
        <div className="h-full bg-emerald-500 rounded-l-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, homePct))}%` }} />
        <div className="h-full bg-teal-500 rounded-r-full transition-all duration-300 ml-auto" style={{ width: `${Math.min(100, Math.max(0, awayPct))}%` }} />
      </div>
    </div>
  );
};
