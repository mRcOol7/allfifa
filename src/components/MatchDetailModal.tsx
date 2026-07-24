import React, { useState } from 'react';
import { Match } from '../types/simulator';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Shield, Activity, Clock, Trophy } from 'lucide-react';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'STATS'>('TIMELINE');

  if (!match) return null;

  const homeWinner = match.winnerId === match.homeTeam.id;
  const awayWinner = match.winnerId === match.awayTeam.id;

  const events = match.events || [];
  const stats = match.stats;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-100 max-h-[90vh] flex flex-col"
        >
          
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button - Placed cleanly in top right corner */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/80 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 space-y-4 pr-14 bg-slate-900/90 backdrop-blur-xl flex-shrink-0">
            
            {/* Round Badge & Stadium Info */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider">
                {match.roundName}
              </span>

              {match.stadium && (
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300 text-[11px]">
                  <MapPin className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{match.stadium}</span>
                </span>
              )}

              {match.referee && (
                <span className="hidden sm:flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-400 text-[11px]">
                  <Shield className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{match.referee}</span>
                </span>
              )}
            </div>

            {/* Scoreboard */}
            <div className="grid grid-cols-7 items-center gap-2 pt-1">
              
              {/* Home Team */}
              <div className="col-span-3 flex flex-col items-center text-center space-y-1.5">
                <div className={`relative p-1.5 rounded-2xl ${homeWinner ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20' : 'bg-slate-950 border border-slate-800'}`}>
                  <img
                    src={match.homeTeam.flagUrl}
                    alt={match.homeTeam.name}
                    className="w-12 h-9 sm:w-16 sm:h-11 object-cover rounded-xl shadow-md"
                  />
                  {homeWinner && (
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow">
                      WIN
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-base tracking-tight leading-tight text-white">
                    {match.homeTeam.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {match.homeTeam.fifaCode || match.homeTeam.isoCode}
                  </span>
                </div>
              </div>

              {/* Score Center */}
              <div className="col-span-1 flex flex-col items-center justify-center text-center space-y-1">
                <div className="flex items-center space-x-1.5 text-2xl sm:text-3xl font-black text-white font-mono tracking-wider">
                  <span>{match.homeScore}</span>
                  <span className="text-slate-600 text-base sm:text-lg">-</span>
                  <span>{match.awayScore}</span>
                </div>
                {match.isPenalties && match.homePenalties !== undefined && (
                  <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold whitespace-nowrap">
                    ({match.homePenalties} - {match.awayPenalties} PEN)
                  </div>
                )}
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Full Time
                </span>
              </div>

              {/* Away Team */}
              <div className="col-span-3 flex flex-col items-center text-center space-y-1.5">
                <div className={`relative p-1.5 rounded-2xl ${awayWinner ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20' : 'bg-slate-950 border border-slate-800'}`}>
                  <img
                    src={match.awayTeam.flagUrl}
                    alt={match.awayTeam.name}
                    className="w-12 h-9 sm:w-16 sm:h-11 object-cover rounded-xl shadow-md"
                  />
                  {awayWinner && (
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow">
                      WIN
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-base tracking-tight leading-tight text-white">
                    {match.awayTeam.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {match.awayTeam.fifaCode || match.awayTeam.isoCode}
                  </span>
                </div>
              </div>

            </div>

            {/* Tab Controls */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              <button
                onClick={() => setActiveTab('TIMELINE')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  activeTab === 'TIMELINE'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Match Timeline</span>
              </button>

              <button
                onClick={() => setActiveTab('STATS')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  activeTab === 'STATS'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Match Stats</span>
              </button>
            </div>

          </div>

          {/* Scrollable Body Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin">
            
            {activeTab === 'TIMELINE' ? (
              <div className="space-y-4 pl-4 sm:pl-8 pr-2">
                {events.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs font-medium">
                    No goal or card events in this match.
                  </div>
                ) : (
                  <div className="relative border-l-2 border-slate-800 space-y-4 py-1 ml-4 sm:ml-6">
                    {events.map((evt) => {
                      const isGoal = evt.type === 'GOAL';
                      const isYellow = evt.type === 'YELLOW_CARD';
                      const isRed = evt.type === 'RED_CARD';

                      const targetCountry = evt.teamId === match.homeTeam.id ? match.homeTeam : match.awayTeam;

                      return (
                        <div key={evt.id} className="relative flex items-center group pl-6">
                          
                          {/* Minute Node on Vertical Line */}
                          <div className="absolute -left-[17px] w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-slate-200 shadow-md group-hover:border-emerald-400 transition">
                            {evt.minuteDisplay}
                          </div>

                          {/* Event Box */}
                          <div className={`p-3 rounded-2xl border transition w-full shadow-md ${
                            isGoal
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                              : isYellow
                              ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
                              : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                          }`}>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl flex-shrink-0">
                                  {isGoal ? '⚽' : isYellow ? '🟨' : '🟥'}
                                </span>
                                <div>
                                  <div className="flex items-center space-x-2 flex-wrap">
                                    <span className="text-xs font-extrabold text-white">
                                      {evt.player}
                                    </span>
                                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-medium">
                                      {targetCountry.flagUrl && (
                                        <img
                                          src={targetCountry.flagUrl}
                                          alt={targetCountry.name}
                                          className="w-3.5 h-2.5 object-cover rounded-sm"
                                        />
                                      )}
                                      <span>{evt.teamName}</span>
                                    </span>
                                  </div>
                                  {evt.detail && (
                                    <p className="text-[11px] text-slate-300 mt-1 font-medium">
                                      {evt.detail}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex-shrink-0 ${
                                isGoal
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : isYellow
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}>
                                {isGoal ? 'Goal' : isYellow ? 'Yellow Card' : 'Red Card'}
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* MATCH STATS TAB */
              <div className="space-y-3.5">
                {stats ? (
                  <div className="space-y-3">
                    
                    {/* Stat Bar 1: Ball Possession */}
                    <StatComparisonBar
                      label="Ball Possession"
                      homeVal={`${stats.possessionHome}%`}
                      awayVal={`${stats.possessionAway}%`}
                      homePercent={stats.possessionHome}
                      awayPercent={stats.possessionAway}
                    />

                    {/* Stat Bar 2: Total Shots */}
                    <StatComparisonBar
                      label="Total Shots"
                      homeVal={stats.shotsHome}
                      awayVal={stats.shotsAway}
                      homePercent={(stats.shotsHome / (stats.shotsHome + stats.shotsAway || 1)) * 100}
                      awayPercent={(stats.shotsAway / (stats.shotsHome + stats.shotsAway || 1)) * 100}
                    />

                    {/* Stat Bar 3: Shots on Target */}
                    <StatComparisonBar
                      label="Shots on Target"
                      homeVal={stats.shotsOnTargetHome}
                      awayVal={stats.shotsOnTargetAway}
                      homePercent={(stats.shotsOnTargetHome / (stats.shotsOnTargetHome + stats.shotsOnTargetAway || 1)) * 100}
                      awayPercent={(stats.shotsOnTargetAway / (stats.shotsOnTargetHome + stats.shotsOnTargetAway || 1)) * 100}
                    />

                    {/* Stat Bar 4: Corner Kicks */}
                    <StatComparisonBar
                      label="Corner Kicks"
                      homeVal={stats.cornersHome}
                      awayVal={stats.cornersAway}
                      homePercent={(stats.cornersHome / (stats.cornersHome + stats.cornersAway || 1)) * 100}
                      awayPercent={(stats.cornersAway / (stats.cornersHome + stats.cornersAway || 1)) * 100}
                    />

                    {/* Stat Bar 5: Pass Accuracy */}
                    <StatComparisonBar
                      label="Pass Accuracy"
                      homeVal={`${stats.passAccuracyHome}%`}
                      awayVal={`${stats.passAccuracyAway}%`}
                      homePercent={stats.passAccuracyHome}
                      awayPercent={stats.passAccuracyAway}
                    />

                    {/* Stat Bar 6: Fouls */}
                    <StatComparisonBar
                      label="Fouls Committed"
                      homeVal={stats.foulsHome}
                      awayVal={stats.foulsAway}
                      homePercent={(stats.foulsHome / (stats.foulsHome + stats.foulsAway || 1)) * 100}
                      awayPercent={(stats.foulsAway / (stats.foulsHome + stats.foulsAway || 1)) * 100}
                    />

                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    Match stats not available.
                  </div>
                )}
              </div>
            )}

            {/* Disclaimer note */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-sans italic">
              ⚠️ Disclaimer: Player names, match events, and goal statistics are procedurally generated for simulation purposes and may be fictional or inaccurate.
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface StatComparisonBarProps {
  label: string;
  homeVal: string | number;
  awayVal: string | number;
  homePercent: number;
  awayPercent: number;
}

const StatComparisonBar: React.FC<StatComparisonBarProps> = ({
  label,
  homeVal,
  awayVal,
  homePercent,
  awayPercent
}) => {
  return (
    <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-emerald-400 font-mono font-bold text-sm">{homeVal}</span>
        <span className="text-slate-300 text-[11px] font-medium tracking-wide uppercase">{label}</span>
        <span className="text-teal-400 font-mono font-bold text-sm">{awayVal}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
        <div
          className="bg-emerald-500 h-full transition-all duration-500"
          style={{ width: `${Math.max(5, homePercent)}%` }}
        />
        <div
          className="bg-teal-500 h-full transition-all duration-500 ml-auto"
          style={{ width: `${Math.max(5, awayPercent)}%` }}
        />
      </div>
    </div>
  );
};
