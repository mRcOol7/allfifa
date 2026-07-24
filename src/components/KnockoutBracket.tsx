import React, { useState, useEffect } from 'react';
import { Tournament, Round, Match } from '../types/simulator';
import { Trophy, ChevronRight, CheckCircle2, Target, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface KnockoutBracketProps {
  tournament: Tournament;
  onNextRound: () => void;
  onReset: () => void;
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = ({
  tournament,
  onNextRound,
  onReset
}) => {
  const [selectedRoundIdx, setSelectedRoundIdx] = useState<number>(tournament.currentRoundIndex);

  useEffect(() => {
    setSelectedRoundIdx(tournament.currentRoundIndex);
  }, [tournament.currentRoundIndex, tournament.rounds.length]);

  const currentRound = tournament.rounds[selectedRoundIdx] || tournament.rounds[tournament.rounds.length - 1];
  const isLatestRound = selectedRoundIdx === tournament.rounds.length - 1;
  const isCompleted = tournament.status === 'COMPLETED';
  const awards = tournament.awards;

  return (
    <div className="space-y-6">
      
      {/* Tournament Stats Header Banner (Top Scorer & Clean Sheets) */}
      {awards && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-3.5 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Top Goal Scorer */}
          <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 rounded-xl p-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                Top Goal Scorer
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 truncate">
                  {awards.topScorer ? `${awards.topScorer.player} (${awards.topScorer.team.fifaCode || awards.topScorer.team.isoCode})` : 'N/A'}
                </span>
                {awards.topScorer && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">
                    {awards.topScorer.goals} G
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Most Clean Sheets */}
          <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 rounded-xl p-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
                Most Clean Sheets
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 truncate">
                  {awards.mostCleanSheets ? awards.mostCleanSheets.team.name : 'N/A'}
                </span>
                {awards.mostCleanSheets && (
                  <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono font-bold text-[10px]">
                    {awards.mostCleanSheets.cleanSheets} CS
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tournament Totals */}
          <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 rounded-xl p-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                Tournament Stats
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 truncate">
                  {awards.totalMatches} Matches Played
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
                  {awards.totalGoals} Goals
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Round Selection Tabs & Round Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Round Title & Meta */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-100 tracking-wide">
                  {currentRound ? currentRound.name : 'Knockout Round'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                  {currentRound?.matches.length || 0} Matches
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Round {selectedRoundIdx + 1} of {tournament.rounds.length} • All matches simulated simultaneously
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              Reset Tournament
            </button>

            {!isCompleted && isLatestRound && (
              <button
                onClick={onNextRound}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition transform active:scale-95"
              >
                <span>Next Round</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Round Navigation Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          {tournament.rounds.map((r, idx) => {
            const isActive = idx === selectedRoundIdx;
            const isCurrent = idx === tournament.currentRoundIndex;

            return (
              <button
                key={r.id}
                onClick={() => setSelectedRoundIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{r.name}</span>
                {isCurrent && !isCompleted && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matches Grid View for Selected Round */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRound?.id || selectedRoundIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {currentRound?.matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const homeWins = match.winnerId === match.homeTeam.id;
  const awayWins = match.winnerId === match.awayTeam.id;

  if (match.isBye) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {match.homeTeam.flagUrl ? (
            <img
              src={match.homeTeam.flagUrl}
              alt={match.homeTeam.name}
              className="w-7 h-5 object-cover rounded shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="text-base">{match.homeTeam.emoji}</span>
          )}
          <span className="font-semibold text-sm text-slate-200">{match.homeTeam.name}</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-medium">
          AUTOMATIC BYE
        </span>
      </div>
    );
  }

  // Filter goal scorers
  const homeScorers = match.scorers?.filter(s => s.teamId === match.homeTeam.id).map(s => s.player) || [];
  const awayScorers = match.scorers?.filter(s => s.teamId === match.awayTeam.id).map(s => s.player) || [];

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 hover:border-slate-700/80 rounded-xl p-3.5 shadow-lg transition flex flex-col justify-between space-y-3">
      
      {/* Home Team Row */}
      <div
        className={`flex items-center justify-between p-2 rounded-lg transition ${
          homeWins
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-white font-bold'
            : 'bg-slate-950/40 text-slate-400'
        }`}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          {match.homeTeam.flagUrl ? (
            <img
              src={match.homeTeam.flagUrl}
              alt={match.homeTeam.name}
              className="w-7 h-5 object-cover rounded shadow border border-slate-700 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="text-base flex-shrink-0">{match.homeTeam.emoji}</span>
          )}
          <span className="text-xs sm:text-sm font-semibold truncate">
            {match.homeTeam.name}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 flex-shrink-0">
            {match.homeTeam.fifaCode || match.homeTeam.isoCode}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {homeWins && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span
            className={`w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold font-mono ${
              homeWins ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {match.homeScore}
          </span>
        </div>
      </div>

      {/* Scorers & Penalty Details */}
      <div className="space-y-1 px-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="text-slate-600 uppercase tracking-wider text-[10px]">{match.roundName}</span>
          {match.isPenalties && (
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium text-[10px]">
              PEN ({match.homePenalties} - {match.awayPenalties})
            </span>
          )}
        </div>

        {/* Goal Scorers list if any */}
        {(homeScorers.length > 0 || awayScorers.length > 0) && (
          <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/60 flex flex-col space-y-0.5">
            {homeScorers.length > 0 && (
              <div className="truncate">
                <span className="text-emerald-400 font-bold">⚽ {match.homeTeam.fifaCode || match.homeTeam.isoCode}:</span> {homeScorers.join(', ')}
              </div>
            )}
            {awayScorers.length > 0 && (
              <div className="truncate">
                <span className="text-emerald-400 font-bold">⚽ {match.awayTeam.fifaCode || match.awayTeam.isoCode}:</span> {awayScorers.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Away Team Row */}
      <div
        className={`flex items-center justify-between p-2 rounded-lg transition ${
          awayWins
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-white font-bold'
            : 'bg-slate-950/40 text-slate-400'
        }`}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          {match.awayTeam.flagUrl ? (
            <img
              src={match.awayTeam.flagUrl}
              alt={match.awayTeam.name}
              className="w-7 h-5 object-cover rounded shadow border border-slate-700 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="text-base flex-shrink-0">{match.awayTeam.emoji}</span>
          )}
          <span className="text-xs sm:text-sm font-semibold truncate">
            {match.awayTeam.name}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 flex-shrink-0">
            {match.awayTeam.fifaCode || match.awayTeam.isoCode}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {awayWins && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span
            className={`w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold font-mono ${
              awayWins ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {match.awayScore}
          </span>
        </div>
      </div>

    </div>
  );
};
