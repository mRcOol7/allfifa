import React, { useState, useEffect } from 'react';
import { Tournament, Round, Match } from '../types/simulator';
import { Trophy, ChevronRight, CheckCircle2, Target, Shield, Activity, Info, Play, Pause, Zap, Flame, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchDetailModal } from './MatchDetailModal';
import { GoldenBootModal } from './GoldenBootModal';

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
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isGoldenBootOpen, setIsGoldenBootOpen] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  useEffect(() => {
    setSelectedRoundIdx(tournament.currentRoundIndex);
  }, [tournament.currentRoundIndex, tournament.rounds.length]);

  // Auto-play interval
  useEffect(() => {
    let interval: any = null;
    if (isAutoPlaying && tournament.status !== 'COMPLETED') {
      interval = setInterval(() => {
        onNextRound();
      }, 1200);
    } else if (tournament.status === 'COMPLETED') {
      setIsAutoPlaying(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, tournament.status, onNextRound]);

  const fastForwardToFinal = () => {
    let currentStatus = tournament.status;
    let safeguard = 0;
    while (currentStatus !== 'COMPLETED' && safeguard < 10) {
      onNextRound();
      safeguard++;
    }
  };

  const currentRound = tournament.rounds[selectedRoundIdx] || tournament.rounds[tournament.rounds.length - 1];
  const isLatestRound = selectedRoundIdx === tournament.rounds.length - 1;
  const isCompleted = tournament.status === 'COMPLETED';
  const awards = tournament.awards;

  // Filter matches based on search query and region filter
  const filteredMatches = (currentRound?.matches || []).filter(match => {
    if (match.isBye) return true;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const hName = match.homeTeam.name.toLowerCase();
      const aName = match.awayTeam.name.toLowerCase();
      const hCode = (match.homeTeam.fifaCode || match.homeTeam.isoCode).toLowerCase();
      const aCode = (match.awayTeam.fifaCode || match.awayTeam.isoCode).toLowerCase();
      
      const matchesSearch = hName.includes(q) || aName.includes(q) || hCode.includes(q) || aCode.includes(q);
      if (!matchesSearch) return false;
    }

    if (selectedRegion === 'PENALTIES') {
      if (!match.isPenalties) return false;
    } else if (selectedRegion !== 'ALL') {
      const hReg = match.homeTeam.region;
      const aReg = match.awayTeam.region;
      if (hReg !== selectedRegion && aReg !== selectedRegion) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Tournament Stats Header Banner (Top Scorer & Clean Sheets & Leaderboard Button) */}
      {awards && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-3.5 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Top Goal Scorer */}
          <div
            onClick={() => setIsGoldenBootOpen(true)}
            className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 rounded-xl p-2.5 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-105 transition">
              <Target className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Golden Boot Leader
                </span>
                <span className="text-[9px] text-amber-400/80 group-hover:underline">View All &rarr;</span>
              </div>
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
          <div
            onClick={() => setIsGoldenBootOpen(true)}
            className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 rounded-xl p-2.5 cursor-pointer transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0 group-hover:scale-105 transition">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                  Golden Glove
                </span>
                <span className="text-[9px] text-teal-400/80 group-hover:underline">View All &rarr;</span>
              </div>
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
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
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
          <div className="flex flex-wrap items-center space-x-2 w-full md:w-auto justify-end gap-y-2">
            
            {/* Auto-Play Toggle */}
            {!isCompleted && (
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                  isAutoPlaying
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoPlaying ? 'Pause Auto-Play' : 'Auto-Play'}</span>
              </button>
            )}

            {/* Fast Forward All */}
            {!isCompleted && (
              <button
                onClick={fastForwardToFinal}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-bold transition flex items-center space-x-1"
                title="Instant Simulate All Remaining Rounds"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate All</span>
              </button>
            )}

            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              Reset
            </button>

            {!isCompleted && isLatestRound && (
              <button
                onClick={onNextRound}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition transform active:scale-95"
              >
                <span>Next Round</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Region Filter Row */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          
          {/* Team Search Input */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team or FIFA code..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Region Filters */}
          <div className="md:col-span-2 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1 pr-1">
              <Filter className="w-3 h-3 text-slate-400" />
              <span>Filter:</span>
            </span>

            {['ALL', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania', 'PENALTIES'].map((reg) => {
              const isActive = selectedRegion === reg;
              return (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
                  }`}
                >
                  {reg === 'ALL' ? 'All Teams' : reg === 'PENALTIES' ? '🧤 Penalties' : reg}
                </button>
              );
            })}
          </div>

        </div>

        {/* Round Navigation Bar */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
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
          {filteredMatches.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-xs font-medium bg-slate-900/40 rounded-2xl border border-slate-800">
              No matches found matching "{searchQuery}" in {currentRound?.name}.
            </div>
          ) : (
            filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} onSelectMatch={setSelectedMatch} />
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Interactive Match Details & Timeline Modal */}
      <MatchDetailModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />

      {/* Golden Boot & Clean Sheets Leaderboard Modal */}
      <GoldenBootModal awards={awards} isOpen={isGoldenBootOpen} onClose={() => setIsGoldenBootOpen(false)} />
    </div>
  );
};

interface MatchCardProps {
  match: Match;
  onSelectMatch: (match: Match) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onSelectMatch }) => {
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
    <div
      onClick={() => onSelectMatch(match)}
      className="group relative bg-slate-900/70 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 rounded-2xl p-3.5 shadow-lg hover:shadow-emerald-500/10 transition duration-200 cursor-pointer flex flex-col justify-between space-y-3 overflow-hidden"
    >
      {/* Corner Indicator for Details */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center space-x-1">
          <Info className="w-3 h-3" />
          <span>Timeline</span>
        </span>
      </div>

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
