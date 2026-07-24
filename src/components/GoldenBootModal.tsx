import React, { useState } from 'react';
import { TournamentAwards } from '../types/simulator';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Shield, Trophy, Flame } from 'lucide-react';

interface GoldenBootModalProps {
  awards: TournamentAwards | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const GoldenBootModal: React.FC<GoldenBootModalProps> = ({ awards, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'SCORERS' | 'CLEAN_SHEETS'>('SCORERS');

  if (!isOpen || !awards) return null;

  const topScorers = awards.topScorersList || [];
  const topCleanSheets = awards.topCleanSheetsList || [];

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
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-100 max-h-[85vh] flex flex-col"
        >
          
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/80 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 space-y-4 bg-slate-900/90 backdrop-blur-xl flex-shrink-0 pr-14">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center space-x-2">
                  <span>Golden Boot Leaderboard</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </h2>
                <p className="text-xs text-slate-400">
                  Tournament Top Goal Scorers & Golden Glove Defense Standings
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => setActiveTab('SCORERS')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  activeTab === 'SCORERS'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Top Scorers ({topScorers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('CLEAN_SHEETS')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  activeTab === 'CLEAN_SHEETS'
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Golden Glove ({topCleanSheets.length})</span>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin">
            
            {activeTab === 'SCORERS' ? (
              <div className="space-y-2.5">
                {topScorers.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs font-medium">
                    No goal scorers recorded yet.
                  </div>
                ) : (
                  topScorers.map((item, index) => {
                    const rank = index + 1;
                    const isGold = rank === 1;
                    const isSilver = rank === 2;
                    const isBronze = rank === 3;

                    return (
                      <div
                        key={`${item.team.id}_${item.player}_${index}`}
                        className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                          isGold
                            ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                            : isSilver
                            ? 'bg-slate-800/60 border-slate-700'
                            : isBronze
                            ? 'bg-amber-900/20 border-amber-800/40'
                            : 'bg-slate-950/50 border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          {/* Rank Badge */}
                          <div className={`w-8 h-8 rounded-xl font-extrabold text-xs font-mono flex items-center justify-center flex-shrink-0 ${
                            isGold
                              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                              : isSilver
                              ? 'bg-slate-300 text-slate-950'
                              : isBronze
                              ? 'bg-amber-700 text-slate-100'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            #{rank}
                          </div>

                          {/* Flag & Name */}
                          <div className="flex items-center space-x-3 min-w-0">
                            {item.team.flagUrl ? (
                              <img
                                src={item.team.flagUrl}
                                alt={item.team.name}
                                className="w-8 h-6 object-cover rounded shadow border border-slate-700 flex-shrink-0"
                              />
                            ) : (
                              <span className="text-lg flex-shrink-0">{item.team.emoji}</span>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-white truncate">
                                {item.player}
                              </h4>
                              <span className="text-[11px] text-slate-400 truncate block">
                                {item.team.name} ({item.team.fifaCode || item.team.isoCode})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Goals Count Pill */}
                        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-black text-sm flex-shrink-0">
                          <span>{item.goals}</span>
                          <span className="text-[10px] text-amber-400 font-bold uppercase">Goals</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              /* CLEAN SHEETS TAB */
              <div className="space-y-2.5">
                {topCleanSheets.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs font-medium">
                    No clean sheets recorded yet.
                  </div>
                ) : (
                  topCleanSheets.map((item, index) => {
                    const rank = index + 1;
                    return (
                      <div
                        key={`${item.team.id}_cs_${index}`}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold text-xs font-mono flex items-center justify-center flex-shrink-0">
                            #{rank}
                          </div>

                          <div className="flex items-center space-x-3 min-w-0">
                            {item.team.flagUrl ? (
                              <img
                                src={item.team.flagUrl}
                                alt={item.team.name}
                                className="w-8 h-6 object-cover rounded shadow border border-slate-700 flex-shrink-0"
                              />
                            ) : (
                              <span className="text-lg flex-shrink-0">{item.team.emoji}</span>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-white truncate">
                                {item.team.name}
                              </h4>
                              <span className="text-[11px] text-slate-400 truncate block">
                                {item.team.region} • {item.team.fifaCode || item.team.isoCode}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 font-mono font-black text-sm flex-shrink-0">
                          <span>{item.cleanSheets}</span>
                          <span className="text-[10px] text-teal-400 font-bold uppercase">CS</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Disclaimer note */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-sans italic">
              ⚠️ Disclaimer: Player names and goal statistics are procedurally generated for simulation purposes and may be fictional or inaccurate.
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
