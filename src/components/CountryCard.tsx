import React from 'react';
import { Country } from '../types/simulator';
import { ShieldCheck, Check } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  isSelected?: boolean;
  onSelect?: () => void;
  showDetails?: boolean;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  isSelected = false,
  onSelect,
  showDetails = true
}) => {
  const getRatingColor = (overall: number) => {
    if (overall >= 85) return 'from-amber-400 to-yellow-500 text-slate-950';
    if (overall >= 80) return 'from-emerald-400 to-teal-500 text-slate-950';
    if (overall >= 75) return 'from-cyan-400 to-blue-500 text-slate-950';
    if (overall >= 68) return 'from-indigo-400 to-purple-500 text-white';
    return 'from-slate-600 to-slate-700 text-slate-200';
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'bg-slate-900/90 border-emerald-500 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-500/50'
          : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70 hover:shadow-lg'
      }`}
    >
      {/* Background Subtle Flag Gradient Overlay */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center pointer-events-none"
           style={{ backgroundImage: `url(${country.flagSvg})` }} />

      <div className="relative p-4 flex items-center justify-between">
        {/* Flag + Crest + Team Name */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-md">
            <img
              src={country.crestUrl || country.flagSvg}
              alt={country.name}
              className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Fallback to flag SVG if crest fails
                (e.target as HTMLImageElement).src = country.flagSvg;
              }}
            />
            {/* Small Flag Badge in corner if crest is different */}
            <div className="absolute bottom-0 right-0 w-5 h-3 border border-slate-950 rounded-tl shadow-sm overflow-hidden">
              <img src={country.flagSvg} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                {country.name}
              </h3>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded border border-slate-700">
                {country.id}
              </span>
            </div>

            {showDetails && (
              <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-emerald-300 font-medium">
                  {country.confederation}
                </span>
                <span>Pop: {(country.population / 1000000).toFixed(1)}M</span>
              </div>
            )}
          </div>
        </div>

        {/* Overall Rating Pill & Selection Checkbox */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className={`px-2.5 py-1 rounded-xl text-xs font-black shadow-md bg-gradient-to-r ${getRatingColor(country.ratings.overall)}`}>
            {country.ratings.overall}
          </div>

          {onSelect && (
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
              isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-950/60'
            }`}>
              {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          )}
        </div>
      </div>

      {/* ATT / MID / DEF / GK Ratings Bar breakdown */}
      {showDetails && (
        <div className="px-4 pb-3 pt-1 grid grid-cols-4 gap-1 text-[10px] font-semibold text-slate-400 border-t border-slate-800/40 mt-1">
          <div className="text-center">
            <span className="block text-[9px] uppercase tracking-wider text-slate-500">ATT</span>
            <span className="text-slate-200">{country.ratings.att}</span>
          </div>
          <div className="text-center">
            <span className="block text-[9px] uppercase tracking-wider text-slate-500">MID</span>
            <span className="text-slate-200">{country.ratings.mid}</span>
          </div>
          <div className="text-center">
            <span className="block text-[9px] uppercase tracking-wider text-slate-500">DEF</span>
            <span className="text-slate-200">{country.ratings.def}</span>
          </div>
          <div className="text-center">
            <span className="block text-[9px] uppercase tracking-wider text-slate-500">GK</span>
            <span className="text-slate-200">{country.ratings.gk}</span>
          </div>
        </div>
      )}
    </div>
  );
};
