import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { CountryCard } from './CountryCard';
import { MatchBroadcast } from './MatchBroadcast';
import { Swords, Shuffle, Play, Search } from 'lucide-react';
import { Country } from '../types/simulator';

export const SingleMatchView: React.FC = () => {
  const { allCountries, singleMatch, startSingleMatch } = useSimulatorStore();

  const [homeCountry, setHomeCountry] = useState<Country | null>(allCountries[0] || null);
  const [awayCountry, setAwayCountry] = useState<Country | null>(allCountries[1] || null);
  const [searchHome, setSearchHome] = useState('');
  const [searchAway, setSearchAway] = useState('');

  // Handle default country selection once countries load
  React.useEffect(() => {
    if (allCountries.length >= 2 && !homeCountry) {
      setHomeCountry(allCountries[0]);
      setAwayCountry(allCountries[1]);
    }
  }, [allCountries, homeCountry]);

  const handleRandomize = () => {
    if (allCountries.length < 2) return;
    const idx1 = Math.floor(Math.random() * allCountries.length);
    let idx2 = Math.floor(Math.random() * allCountries.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * allCountries.length);
    }
    setHomeCountry(allCountries[idx1]);
    setAwayCountry(allCountries[idx2]);
  };

  const handleKickoff = () => {
    if (homeCountry && awayCountry && homeCountry.id !== awayCountry.id) {
      startSingleMatch(homeCountry, awayCountry);
    }
  };

  const filteredHome = allCountries.filter(c => c.name.toLowerCase().includes(searchHome.toLowerCase()) || c.id.toLowerCase().includes(searchHome.toLowerCase()));
  const filteredAway = allCountries.filter(c => c.name.toLowerCase().includes(searchAway.toLowerCase()) || c.id.toLowerCase().includes(searchAway.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Swords className="w-3.5 h-3.5" />
              <span>Exhibition Match Simulator</span>
            </div>
            <h1 className="text-3xl font-black text-white">Single Match Exhibition</h1>
            <p className="text-xs text-slate-400">Pick any 2 nations on Earth for a full 90-minute live broadcast simulation.</p>
          </div>

          <button
            onClick={handleRandomize}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center space-x-2 transition-all shadow-md"
          >
            <Shuffle className="w-4 h-4 text-emerald-400" />
            <span>Random Matchup</span>
          </button>
        </div>
      </div>

      {/* Single Match In-Progress Broadcast Display */}
      {singleMatch && (
        <div className="space-y-4">
          <MatchBroadcast match={singleMatch} />
        </div>
      )}

      {/* Matchup Selection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Home Country Selector */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider">Home Team</h3>
            <span className="text-xs font-semibold text-slate-400">{homeCountry?.name || 'Select'}</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search home nation..."
              value={searchHome}
              onChange={(e) => setSearchHome(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {filteredHome.map((country) => (
              <CountryCard
                key={country.id}
                country={country}
                isSelected={homeCountry?.id === country.id}
                onSelect={() => setHomeCountry(country)}
                showDetails={false}
              />
            ))}
          </div>
        </div>

        {/* Away Country Selector */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-cyan-400 uppercase tracking-wider">Away Team</h3>
            <span className="text-xs font-semibold text-slate-400">{awayCountry?.name || 'Select'}</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search away nation..."
              value={searchAway}
              onChange={(e) => setSearchAway(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {filteredAway.map((country) => (
              <CountryCard
                key={country.id}
                country={country}
                isSelected={awayCountry?.id === country.id}
                onSelect={() => setAwayCountry(country)}
                showDetails={false}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Start Match Action Button */}
      {homeCountry && awayCountry && homeCountry.id !== awayCountry.id && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleKickoff}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-sm uppercase tracking-wider flex items-center space-x-2 shadow-2xl shadow-emerald-500/30 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Kick Off Exhibition Match</span>
          </button>
        </div>
      )}

    </div>
  );
};
