import React, { useState, useEffect } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { Country, Match } from '../types/simulator';
import { simulateKnockoutMatch } from '../engine/tournamentEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords, Play, Activity, MapPin, Shield, Clock } from 'lucide-react';

export const H2HPredictorModal: React.FC = () => {
  const { isH2HOpen, toggleH2H, allCountries } = useSimulatorStore();

  const [teamAId, setTeamAId] = useState<string>('');
  const [teamBId, setTeamBId] = useState<string>('');
  const [simulatedMatch, setSimulatedMatch] = useState<Match | null>(null);

  useEffect(() => {
    if (allCountries.length >= 2) {
      // Default to Argentina vs France or top 2 countries
      const arg = allCountries.find(c => c.isoCode === 'ARG' || c.fifaCode === 'ARG') || allCountries[0];
      const fra = allCountries.find(c => c.isoCode === 'FRA' || c.fifaCode === 'FRA') || allCountries[1];
      setTeamAId(arg.id);
      setTeamBId(fra.id);
    }
  }, [allCountries]);

  if (!isH2HOpen) return null;

  const teamA = allCountries.find(c => c.id === teamAId) || allCountries[0];
  const teamB = allCountries.find(c => c.id === teamBId) || allCountries[1];

  const handleSimulateExhibition = () => {
    if (!teamA || !teamB || teamA.id === teamB.id) return;
    const result = simulateKnockoutMatch(teamA, teamB, 'Exhibition Match');
    setSimulatedMatch(result);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleH2H(false)}
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
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => toggleH2H(false)}
            className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/80 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 space-y-4 bg-slate-900/90 backdrop-blur-xl flex-shrink-0 pr-14">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center space-x-2">
                  <span>Head-to-Head Exhibition Match</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Select any 2 nations to simulate an instant match with full commentary & stats!
                </p>
              </div>
            </div>
          </div>

          {/* Body Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin space-y-6">
            
            {/* Team Selection Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              
              {/* Select Team A */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Home Team
                </label>
                <select
                  value={teamAId}
                  onChange={(e) => {
                    setTeamAId(e.target.value);
                    setSimulatedMatch(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                >
                  {allCountries.map(c => (
                    <option key={`a_${c.id}`} value={c.id}>
                      {c.name} ({c.fifaCode || c.isoCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* VS Icon */}
              <div className="sm:col-span-1 flex items-center justify-center pt-2 sm:pt-0">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-xs text-amber-400 shadow">
                  VS
                </div>
              </div>

              {/* Select Team B */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                  Away Team
                </label>
                <select
                  value={teamBId}
                  onChange={(e) => {
                    setTeamBId(e.target.value);
                    setSimulatedMatch(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-teal-500"
                >
                  {allCountries.map(c => (
                    <option key={`b_${c.id}`} value={c.id}>
                      {c.name} ({c.fifaCode || c.isoCode})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Teams Faceoff Banner */}
            {teamA && teamB && (
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-around gap-4 text-center">
                  
                  {/* Team A Badge */}
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={teamA.flagUrl}
                      alt={teamA.name}
                      className="w-16 h-11 object-cover rounded-xl shadow border border-slate-700"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{teamA.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{teamA.region}</span>
                    </div>
                  </div>

                  <span className="text-xl font-black text-slate-600">⚔️</span>

                  {/* Team B Badge */}
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={teamB.flagUrl}
                      alt={teamB.name}
                      className="w-16 h-11 object-cover rounded-xl shadow border border-slate-700"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{teamB.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{teamB.region}</span>
                    </div>
                  </div>

                </div>

                {/* Simulate Button */}
                <button
                  onClick={handleSimulateExhibition}
                  disabled={teamA.id === teamB.id}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Exhibition Match</span>
                </button>
              </div>
            )}

            {/* Simulated Match Result Card */}
            {simulatedMatch && (
              <div className="bg-slate-900 border border-emerald-500/40 p-5 rounded-2xl space-y-4 shadow-xl">
                
                {/* Score Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    EXHIBITION RESULT
                  </span>
                  <div className="flex items-center space-x-3 text-[11px]">
                    {simulatedMatch.stadium && (
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span className="truncate max-w-[180px]">{simulatedMatch.stadium}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Scoreboard */}
                <div className="grid grid-cols-7 items-center gap-2 py-2">
                  <div className="col-span-3 text-center space-y-1">
                    <h3 className="font-extrabold text-sm text-white">{simulatedMatch.homeTeam.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{simulatedMatch.homeTeam.fifaCode}</span>
                  </div>

                  <div className="col-span-1 text-center font-mono font-black text-2xl text-amber-400">
                    {simulatedMatch.homeScore} - {simulatedMatch.awayScore}
                    {simulatedMatch.isPenalties && (
                      <div className="text-[10px] text-amber-400 font-semibold block mt-0.5">
                        ({simulatedMatch.homePenalties}-{simulatedMatch.awayPenalties} PEN)
                      </div>
                    )}
                  </div>

                  <div className="col-span-3 text-center space-y-1">
                    <h3 className="font-extrabold text-sm text-white">{simulatedMatch.awayTeam.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{simulatedMatch.awayTeam.fifaCode}</span>
                  </div>
                </div>

                {/* Timeline Events */}
                {simulatedMatch.events && simulatedMatch.events.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Key Match Events</h5>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                      {simulatedMatch.events.map(evt => (
                        <div key={evt.id} className="flex items-center justify-between text-xs bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-slate-400 text-[11px]">{evt.minuteDisplay}</span>
                            <span className="text-base">{evt.type === 'GOAL' ? '⚽' : evt.type === 'YELLOW_CARD' ? '🟨' : '🟥'}</span>
                            <span className="font-bold text-white text-xs">{evt.player} ({evt.teamName})</span>
                          </div>
                          {evt.detail && <span className="text-[10px] text-slate-400 italic">{evt.detail}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Disclaimer note */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-sans italic">
              ⚠️ Disclaimer: Player names and match events are procedurally simulated.
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
