import React, { useState } from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { CountryCard } from './CountryCard';
import { Sliders, Search, RotateCcw, Sparkles, Shield, Zap } from 'lucide-react';
import { Country, CountryRatings } from '../types/simulator';

export const RatingsEditor: React.FC = () => {
  const { allCountries, updateCountryRatings, resetCountryRatings } = useSimulatorStore();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(allCountries[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConfederation, setSelectedConfederation] = useState<string>('ALL');

  // Sliders state
  const [att, setAtt] = useState(selectedCountry?.ratings.att || 75);
  const [mid, setMid] = useState(selectedCountry?.ratings.mid || 75);
  const [def, setDef] = useState(selectedCountry?.ratings.def || 75);
  const [gk, setGk] = useState(selectedCountry?.ratings.gk || 75);

  React.useEffect(() => {
    if (selectedCountry) {
      setAtt(selectedCountry.ratings.att);
      setMid(selectedCountry.ratings.mid);
      setDef(selectedCountry.ratings.def);
      setGk(selectedCountry.ratings.gk);
    }
  }, [selectedCountry]);

  const handleCountrySelect = (c: Country) => {
    setSelectedCountry(c);
  };

  const handleSaveRatings = () => {
    if (!selectedCountry) return;
    const overall = Math.round((att * 0.35) + (mid * 0.3) + (def * 0.25) + (gk * 0.1));
    const newRatings: CountryRatings = { att, mid, def, gk, overall };

    updateCountryRatings(selectedCountry.id, newRatings);
    setSelectedCountry({ ...selectedCountry, ratings: newRatings, isCustomRating: true });
  };

  const handleApplyPresetAll = (preset: 'S_TIER' | 'EQUAL' | 'UNDERDOG') => {
    allCountries.forEach((c) => {
      let r: CountryRatings;
      if (preset === 'EQUAL') {
        r = { att: 75, mid: 75, def: 75, gk: 75, overall: 75 };
      } else if (preset === 'S_TIER') {
        r = { att: 88, mid: 88, def: 87, gk: 87, overall: 88 };
      } else {
        r = { att: 62, mid: 62, def: 62, gk: 62, overall: 62 };
      }
      updateCountryRatings(c.id, r);
    });
    if (selectedCountry) {
      setSelectedCountry({ ...selectedCountry, ratings: { att: 75, mid: 75, def: 75, gk: 75, overall: 75 } });
    }
  };

  const filteredCountries = allCountries.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConf = selectedConfederation === 'ALL' || c.confederation === selectedConfederation;
    return matchesSearch && matchesConf;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sliders className="w-3.5 h-3.5" />
              <span>AI Strength & Ratings Editor</span>
            </div>
            <h1 className="text-3xl font-black text-white">Custom Country Strength Editor</h1>
            <p className="text-xs text-slate-400">Modify Attack, Midfield, Defense, and Goalkeeping stats for any of the 195+ nations on Earth.</p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleApplyPresetAll('EQUAL')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all"
            >
              Equalize All (75 OVR)
            </button>
            <button
              onClick={resetCountryRatings}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Country Selector & Filters (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Select Country to Edit</h3>

            <div className="flex items-center space-x-2">
              <div className="relative min-w-[160px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter country..."
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
                <option value="UEFA">UEFA</option>
                <option value="CONMEBOL">CONMEBOL</option>
                <option value="CAF">CAF</option>
                <option value="AFC">AFC</option>
                <option value="CONCACAF">CONCACAF</option>
                <option value="OFC">OFC</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar p-1">
            {filteredCountries.map((c) => (
              <CountryCard
                key={c.id}
                country={c}
                isSelected={selectedCountry?.id === c.id}
                onSelect={() => handleCountrySelect(c)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Attribute Sliders (5 Cols) */}
        {selectedCountry && (
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            {/* Header Selected Country */}
            <div className="flex items-center space-x-4 pb-4 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 p-2 shadow-lg flex-shrink-0">
                <img src={selectedCountry.crestUrl || selectedCountry.flagSvg} alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{selectedCountry.name}</h2>
                <span className="text-xs font-semibold text-emerald-400">{selectedCountry.confederation} • Overall Rating: {Math.round((att * 0.35) + (mid * 0.3) + (def * 0.25) + (gk * 0.1))}</span>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-5">
              {/* ATT Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-400">ATTACK (ATT)</span>
                  <span className="text-white font-mono text-sm">{att}</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={99}
                  value={att}
                  onChange={(e) => setAtt(parseInt(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>

              {/* MID Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-400">MIDFIELD (MID)</span>
                  <span className="text-white font-mono text-sm">{mid}</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={99}
                  value={mid}
                  onChange={(e) => setMid(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>

              {/* DEF Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-cyan-400">DEFENSE (DEF)</span>
                  <span className="text-white font-mono text-sm">{def}</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={99}
                  value={def}
                  onChange={(e) => setDef(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>

              {/* GK Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-purple-400 font-bold">GOALKEEPING (GK)</span>
                  <span className="text-white font-mono text-sm">{gk}</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={99}
                  value={gk}
                  onChange={(e) => setGk(parseInt(e.target.value))}
                  className="w-full accent-purple-400 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Save Action */}
            <button
              onClick={handleSaveRatings}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all"
            >
              Apply Ratings to {selectedCountry.name}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
