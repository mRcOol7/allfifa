import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { KnockoutBracket } from './KnockoutBracket';
import { MatchBroadcast } from './MatchBroadcast';
import { TrophyCeremony } from './TrophyCeremony';
import { CountryCard } from './CountryCard';
import { Match } from '../types/simulator';
import { Trophy, Play, FastForward, Sparkles, Filter, Search, RotateCcw, Shuffle } from 'lucide-react';

export const TournamentView: React.FC = () => {
  const {
    allCountries,
    currentTournament,
    startNewTournament,
    activeMatchForBroadcast,
    advanceRoundOrNextMatch,
    autoPlayEntireTournament
  } = useSimulatorStore();

  const [presetSize, setPresetSize] = useState<number | 'ALL'>(32);
  const [isRandomSeeding, setIsRandomSeeding] = useState(true);
  const [selectedCustomTeams, setSelectedCustomTeams] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConfederation, setSelectedConfederation] = useState<string>('ALL');

  const filteredCountries = allCountries.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConf = selectedConfederation === 'ALL' || c.confederation === selectedConfederation;
    return matchesSearch && matchesConf;
  });

  const toggleTeamSelect = (id: string) => {
    if (selectedCustomTeams.includes(id)) {
      setSelectedCustomTeams(selectedCustomTeams.filter(t => t !== id));
    } else {
      setSelectedCustomTeams([...selectedCustomTeams, id]);
    }
  };

  const handleStartTournament = () => {
    if (selectedCustomTeams.length >= 2) {
      const customObjects = allCountries.filter(c => selectedCustomTeams.includes(c.id));
      startNewTournament(customObjects.length, isRandomSeeding, customObjects);
    } else {
      startNewTournament(presetSize, isRandomSeeding);
    }
  };

  if (!currentTournament) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-slate-950 to-teal-900/20" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>World Cup Tournament Creator</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Create an Epic <span className="text-amber-400">Knockout Tournament</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Simulate realistic tournaments featuring 8, 16, 32, 64, 128, or **ALL 195+ Countries on Earth** with AI-driven minute events, live commentary, VAR reviews, and awards!
            </p>
          </div>
        </div>

        {/* Configuration Setup Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">

          {/* Step 1: Select Bracket Size */}
          <div className="space-y-4">
            <label className="text-sm font-black text-white uppercase tracking-wider block">
              1. Select Tournament Bracket Size
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[8, 16, 32, 64, 128, 'ALL'].map((size) => (
                <button
                  key={String(size)}
                  onClick={() => {
                    setPresetSize(size as any);
                    setSelectedCustomTeams([]);
                  }}
                  className={`p-4 rounded-2xl border text-center transition-all duration-200 ${
                    presetSize === size && selectedCustomTeams.length === 0
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-600 border-emerald-400 text-white font-black shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl font-black block">
                    {size === 'ALL' ? '195+' : size}
                  </span>
                  <span className="text-[11px] opacity-80 uppercase tracking-wider font-semibold">
                    {size === 'ALL' ? 'All Nations' : 'Nations'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Seeding Option */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <h3 className="text-sm font-bold text-white">Seeding & Draw System</h3>
              <p className="text-xs text-slate-400">Random draw allows surprising early matchups; Ranked seeding matches top seeds vs lower seeds.</p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setIsRandomSeeding(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  isRandomSeeding ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Random Draw</span>
              </button>
              <button
                onClick={() => setIsRandomSeeding(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  !isRandomSeeding ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>FIFA Ranked Seeding</span>
              </button>
            </div>
          </div>

          {/* Step 3: Optional Manual Selection or Filters */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Manual Country Picker (Optional)</h3>
                <p className="text-xs text-slate-400">
                  {selectedCustomTeams.length > 0
                    ? `Selected ${selectedCustomTeams.length} Nations manually.`
                    : `Currently using top ${presetSize === 'ALL' ? allCountries.length : presetSize} nations based on preset.`}
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center space-x-2">
                <div className="relative min-w-[180px]">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select
                  value={selectedConfederation}
                  onChange={(e) => setSelectedConfederation(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">All Confederations</option>
                  <option value="UEFA">UEFA (Europe)</option>
                  <option value="CONMEBOL">CONMEBOL (South America)</option>
                  <option value="CAF">CAF (Africa)</option>
                  <option value="AFC">AFC (Asia)</option>
                  <option value="CONCACAF">CONCACAF (North America)</option>
                  <option value="OFC">OFC (Oceania)</option>
                </select>
              </div>
            </div>

            {/* Country Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar p-1">
              {filteredCountries.map((country) => (
                <CountryCard
                  key={country.id}
                  country={country}
                  isSelected={selectedCustomTeams.includes(country.id)}
                  onSelect={() => toggleTeamSelect(country.id)}
                  showDetails={false}
                />
              ))}
            </div>
          </div>

          {/* Start Tournament Launch Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleStartTournament}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch World Cup Tournament</span>
            </button>
          </div>

        </div>

      </div>
    );
  }

  // Active Tournament Mode
  const isTourneyCompleted = currentTournament.status === 'COMPLETED';

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-2xl">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            {currentTournament.status} • {currentTournament.totalTeams} TEAMS
          </span>
          <h1 className="text-2xl font-black text-white">{currentTournament.name}</h1>
        </div>

        <div className="flex items-center space-x-3">
          {!isTourneyCompleted && (
            <>
              <button
                onClick={advanceRoundOrNextMatch}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 border border-slate-700 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next Match</span>
              </button>

              <button
                onClick={autoPlayEntireTournament}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 transition-all"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Auto-Play Full Tournament</span>
              </button>
            </>
          )}

          <button
            onClick={() => useSimulatorStore.setState({ currentTournament: null })}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold flex items-center space-x-1 border border-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Tournament Completed Trophy Ceremony */}
      {isTourneyCompleted && (
        <TrophyCeremony
          tournament={currentTournament}
          onNewTournament={() => useSimulatorStore.setState({ currentTournament: null })}
        />
      )}

      {/* Broadcast Center for Active Selected Match */}
      {activeMatchForBroadcast && (
        <MatchBroadcast
          match={activeMatchForBroadcast}
          onNextMatch={advanceRoundOrNextMatch}
        />
      )}

      {/* Interactive Knockout Bracket Tree View */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Interactive Knockout Bracket</span>
        </h2>

        <KnockoutBracket
          tournament={currentTournament}
          onSelectMatch={(match) => useSimulatorStore.setState({ activeMatchForBroadcast: match })}
          activeMatchId={activeMatchForBroadcast?.id}
        />
      </div>

    </div>
  );
};
