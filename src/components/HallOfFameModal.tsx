import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal, Trash2, Calendar, Target, Globe } from 'lucide-react';
import { Country } from '../types/simulator';

export const HallOfFameModal: React.FC = () => {
  const { isHallOfFameOpen, toggleHallOfFame, savedTournaments, clearHallOfFame } = useSimulatorStore();
  const [activeTab, setActiveTab] = useState<'HISTORY' | 'LEADERBOARD'>('HISTORY');

  if (!isHallOfFameOpen) return null;

  // Calculate country title count leaderboard
  const countryTitlesMap: Record<string, { country: Country; titles: number; runnerUps: number }> = {};

  savedTournaments.forEach(t => {
    if (t.champion) {
      const id = t.champion.id;
      countryTitlesMap[id] = countryTitlesMap[id]
        ? { ...countryTitlesMap[id], titles: countryTitlesMap[id].titles + 1 }
        : { country: t.champion, titles: 1, runnerUps: 0 };
    }
    if (t.runnerUp) {
      const id = t.runnerUp.id;
      countryTitlesMap[id] = countryTitlesMap[id]
        ? { ...countryTitlesMap[id], runnerUps: countryTitlesMap[id].runnerUps + 1 }
        : { country: t.runnerUp, titles: 0, runnerUps: 1 };
    }
  });

  const leaderboardList = Object.values(countryTitlesMap).sort((a, b) => {
    if (b.titles !== a.titles) return b.titles - a.titles;
    return b.runnerUps - a.runnerUps;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleHallOfFame(false)}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-100 max-h-[85vh] flex flex-col"
        >
          
          {/* Top Glow Decorative */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => toggleHallOfFame(false)}
            className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/80 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 space-y-4 bg-slate-900/90 backdrop-blur-xl flex-shrink-0 pr-14">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center space-x-2">
                  <span>World Cup Hall of Fame</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                    {savedTournaments.length} Tournaments
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  History of past World Cup Champions & Titles Leaderboard
                </p>
              </div>
            </div>

            {/* Tab Controls & Clear Button */}
            <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
              <div className="flex items-center space-x-2 flex-1">
                <button
                  onClick={() => setActiveTab('HISTORY')}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                    activeTab === 'HISTORY'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Past Champions</span>
                </button>

                <button
                  onClick={() => setActiveTab('LEADERBOARD')}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                    activeTab === 'LEADERBOARD'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                  }`}
                >
                  <Medal className="w-3.5 h-3.5" />
                  <span>Titles Leaderboard</span>
                </button>
              </div>

              {savedTournaments.length > 0 && (
                <button
                  onClick={clearHallOfFame}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center space-x-1"
                  title="Clear all saved tournament history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}
            </div>
          </div>

          {/* Modal Body Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin">
            
            {activeTab === 'HISTORY' ? (
              <div className="space-y-3">
                {savedTournaments.length === 0 ? (
                  <div className="py-16 text-center space-y-2">
                    <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-slate-400 text-xs font-medium">
                      No completed tournaments in your Hall of Fame yet.
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      Simulate a World Cup to completion to automatically record champions!
                    </p>
                  </div>
                ) : (
                  savedTournaments.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 shadow-md hover:border-slate-700 transition"
                    >
                      {/* Top Meta Line */}
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                        <span className="font-bold text-slate-200">{item.name}</span>
                        <span className="flex items-center space-x-1 text-[11px] text-slate-400 font-mono">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </span>
                      </div>

                      {/* Champion & Runner Up Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        
                        {/* Champion */}
                        <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-500/10 to-transparent p-2.5 rounded-xl border border-amber-500/30">
                          <div className="w-10 h-8 rounded-lg overflow-hidden border border-slate-700 shadow flex-shrink-0">
                            <img
                              src={item.champion.flagUrl}
                              alt={item.champion.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider block">
                              🥇 Champion
                            </span>
                            <h4 className="font-extrabold text-sm text-white truncate">
                              {item.champion.name}
                            </h4>
                          </div>
                        </div>

                        {/* Runner Up */}
                        {item.runnerUp && (
                          <div className="flex items-center space-x-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                            <div className="w-10 h-8 rounded-lg overflow-hidden border border-slate-700 shadow flex-shrink-0">
                              <img
                                src={item.runnerUp.flagUrl}
                                alt={item.runnerUp.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                                🥈 Runner-Up
                              </span>
                              <h4 className="font-extrabold text-sm text-slate-200 truncate">
                                {item.runnerUp.name}
                              </h4>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Bottom Tournament Stats */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                        {item.topScorerPlayer ? (
                          <span className="flex items-center space-x-1">
                            <Target className="w-3 h-3 text-amber-400" />
                            <span>Top Scorer: <strong className="text-slate-200">{item.topScorerPlayer}</strong> ({item.topScorerGoals}G)</span>
                          </span>
                        ) : (
                          <span />
                        )}

                        <span>{item.totalGoals} Goals in {item.totalMatches} Matches</span>
                      </div>

                    </div>
                  ))
                )}
              </div>
            ) : (
              /* LEADERBOARD TAB */
              <div className="space-y-2.5">
                {leaderboardList.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    No championships recorded yet.
                  </div>
                ) : (
                  leaderboardList.map((item, index) => {
                    const rank = index + 1;
                    const isFirst = rank === 1;

                    return (
                      <div
                        key={item.country.id}
                        className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                          isFirst
                            ? 'bg-amber-500/10 border-amber-500/40 shadow-lg'
                            : 'bg-slate-950/60 border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                            isFirst ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                          }`}>
                            #{rank}
                          </div>

                          <div className="flex items-center space-x-3 min-w-0">
                            {item.country.flagUrl ? (
                              <img
                                src={item.country.flagUrl}
                                alt={item.country.name}
                                className="w-8 h-6 object-cover rounded shadow border border-slate-700 flex-shrink-0"
                              />
                            ) : (
                              <span className="text-lg flex-shrink-0">{item.country.emoji}</span>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-white truncate">
                                {item.country.name}
                              </h4>
                              <span className="text-[11px] text-slate-400 truncate block">
                                {item.country.region} • {item.country.fifaCode || item.country.isoCode}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 font-mono flex-shrink-0">
                          <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
                            🏆 {item.titles} {item.titles === 1 ? 'Title' : 'Titles'}
                          </span>
                          {item.runnerUps > 0 && (
                            <span className="px-2 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 font-medium text-[11px]">
                              🥈 {item.runnerUps}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Disclaimer note */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-sans italic">
              ⚠️ Disclaimer: Player names and tournament results are procedurally simulated.
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
