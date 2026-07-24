import React, { useState, useEffect } from 'react';
import { Country } from '../types/simulator';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { getFullFootballSquad, FootballPlayerProfile } from '../engine/playerNames';
import { fetchGoalHighlightsFromApi, getRandomGoalHighlight } from '../engine/goalHighlightsData';
import { soundFx } from '../utils/soundFx';
import { X, Play, Pause, RotateCcw, Zap, Flame, Shield, Trophy, Activity, Award, Star, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getFormationPositions = (formation: '4-3-3' | '4-2-3-1' | '3-5-2' | '4-4-2', isLeft: boolean) => {
  if (formation === '4-3-3') {
    return isLeft ? [
      { x: 5, y: 50 }, // GK
      { x: 18, y: 18 }, { x: 20, y: 38 }, { x: 20, y: 62 }, { x: 18, y: 82 }, // 4 DEF
      { x: 34, y: 28 }, { x: 36, y: 50 }, { x: 34, y: 72 }, // 3 MID
      { x: 45, y: 22 }, { x: 48, y: 50 }, { x: 45, y: 78 }  // 3 FWD
    ] : [
      { x: 95, y: 50 }, // GK
      { x: 82, y: 18 }, { x: 80, y: 38 }, { x: 80, y: 62 }, { x: 82, y: 82 }, // 4 DEF
      { x: 66, y: 28 }, { x: 64, y: 50 }, { x: 66, y: 72 }, // 3 MID
      { x: 55, y: 22 }, { x: 52, y: 50 }, { x: 55, y: 78 }  // 3 FWD
    ];
  }

  if (formation === '4-2-3-1') {
    return isLeft ? [
      { x: 5, y: 50 }, // GK
      { x: 18, y: 18 }, { x: 20, y: 38 }, { x: 20, y: 62 }, { x: 18, y: 82 }, // 4 DEF
      { x: 30, y: 35 }, { x: 30, y: 65 }, // 2 CDM
      { x: 40, y: 22 }, { x: 42, y: 50 }, { x: 40, y: 78 }, // 3 AM
      { x: 48, y: 50 } // 1 ST
    ] : [
      { x: 95, y: 50 }, // GK
      { x: 82, y: 18 }, { x: 80, y: 38 }, { x: 80, y: 62 }, { x: 82, y: 82 }, // 4 DEF
      { x: 70, y: 35 }, { x: 70, y: 65 }, // 2 CDM
      { x: 60, y: 22 }, { x: 58, y: 50 }, { x: 60, y: 78 }, // 3 AM
      { x: 52, y: 50 } // 1 ST
    ];
  }

  if (formation === '3-5-2') {
    return isLeft ? [
      { x: 5, y: 50 }, // GK
      { x: 20, y: 25 }, { x: 22, y: 50 }, { x: 20, y: 75 }, // 3 CB
      { x: 35, y: 12 }, { x: 36, y: 33 }, { x: 38, y: 50 }, { x: 36, y: 67 }, { x: 35, y: 88 }, // 5 MID
      { x: 47, y: 35 }, { x: 47, y: 65 } // 2 ST
    ] : [
      { x: 95, y: 50 }, // GK
      { x: 80, y: 25 }, { x: 78, y: 50 }, { x: 80, y: 75 }, // 3 CB
      { x: 65, y: 12 }, { x: 64, y: 33 }, { x: 62, y: 50 }, { x: 64, y: 67 }, { x: 65, y: 88 }, // 5 MID
      { x: 53, y: 35 }, { x: 53, y: 65 } // 2 ST
    ];
  }

  // 4-4-2
  return isLeft ? [
    { x: 5, y: 50 }, // GK
    { x: 18, y: 18 }, { x: 20, y: 38 }, { x: 20, y: 62 }, { x: 18, y: 82 }, // 4 DEF
    { x: 36, y: 15 }, { x: 38, y: 38 }, { x: 38, y: 62 }, { x: 36, y: 85 }, // 4 MID
    { x: 48, y: 35 }, { x: 48, y: 65 } // 2 ST
  ] : [
    { x: 95, y: 50 }, // GK
    { x: 82, y: 18 }, { x: 80, y: 38 }, { x: 80, y: 62 }, { x: 82, y: 82 }, // 4 DEF
    { x: 64, y: 15 }, { x: 62, y: 38 }, { x: 62, y: 62 }, { x: 64, y: 85 }, // 4 MID
    { x: 52, y: 35 }, { x: 52, y: 65 } // 2 ST
  ];
};

const SearchableCountrySelect: React.FC<{
  selectedCountry: Country;
  onSelect: (c: Country) => void;
  label: string;
  allCountries: Country[];
}> = ({ selectedCountry, onSelect, label, allCountries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = allCountries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-left flex items-center justify-between text-slate-200 text-xs font-bold focus:outline-none hover:border-slate-700 transition"
      >
        <span className="truncate flex items-center space-x-1.5">
          <span>{selectedCountry.emoji}</span>
          <span>{selectedCountry.name}</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-mono">🔍 Search</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 space-y-2 flex flex-col">
          <input
            type="text"
            placeholder="Type country name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            autoFocus
          />
          <div className="overflow-y-auto max-h-44 space-y-0.5 pr-1 scrollbar-thin">
            {filtered.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSelect(c);
                  setIsOpen(false);
                  setSearch('');
                }}
                className={`w-full text-left p-1.5 rounded-lg text-xs flex items-center space-x-2 transition ${
                  c.id === selectedCountry.id ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-200'
                }`}
              >
                <span>{c.emoji}</span>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FotMobPitchCard: React.FC<{
  team: Country;
  squad: FootballPlayerProfile[];
  formation: '4-3-3' | '4-2-3-1' | '3-5-2' | '4-4-2';
  shirtColor: 'RED' | 'BLUE';
  goalscorers: Array<{ name: string; minute: number }>;
  substitutions: Array<{ minute: number; teamName: string; playerIn: string; playerOut: string }>;
}> = ({ team, squad, formation, shirtColor, goalscorers, substitutions }) => {
  const starting11 = squad.slice(0, 11);
  const bench = squad.slice(11, 19);

  const getVerticalPositions = (fmt: string) => {
    if (fmt === '4-3-3') {
      return [
        { x: 50, y: 88 }, // GK
        { x: 18, y: 70 }, { x: 38, y: 72 }, { x: 62, y: 72 }, { x: 82, y: 70 }, // 4 DEF
        { x: 28, y: 48 }, { x: 50, y: 52 }, { x: 72, y: 48 }, // 3 MID
        { x: 22, y: 22 }, { x: 50, y: 16 }, { x: 78, y: 22 }  // 3 FWD
      ];
    }
    if (fmt === '4-2-3-1') {
      return [
        { x: 50, y: 88 }, // GK
        { x: 18, y: 70 }, { x: 38, y: 72 }, { x: 62, y: 72 }, { x: 82, y: 70 }, // 4 DEF
        { x: 35, y: 55 }, { x: 65, y: 55 }, // 2 CDM
        { x: 22, y: 34 }, { x: 50, y: 32 }, { x: 78, y: 34 }, // 3 AM
        { x: 50, y: 15 }  // 1 ST
      ];
    }
    if (fmt === '3-5-2') {
      return [
        { x: 50, y: 88 }, // GK
        { x: 25, y: 72 }, { x: 50, y: 74 }, { x: 75, y: 72 }, // 3 CB
        { x: 14, y: 48 }, { x: 32, y: 50 }, { x: 50, y: 52 }, { x: 68, y: 50 }, { x: 86, y: 48 }, // 5 MID
        { x: 35, y: 18 }, { x: 65, y: 18 }  // 2 ST
      ];
    }
    // 4-4-2
    return [
      { x: 50, y: 88 }, // GK
      { x: 18, y: 70 }, { x: 38, y: 72 }, { x: 62, y: 72 }, { x: 82, y: 70 }, // 4 DEF
      { x: 18, y: 48 }, { x: 38, y: 50 }, { x: 62, y: 50 }, { x: 82, y: 48 }, // 4 MID
      { x: 35, y: 18 }, { x: 65, y: 18 }  // 2 ST
    ];
  };

  const positions = getVerticalPositions(formation);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 space-y-2 flex flex-col">
      {/* Team Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 px-1">
        <div className="font-extrabold text-white text-xs truncate flex items-center space-x-1.5">
          {team.flagUrl && <img src={team.flagUrl} alt="" className="w-4 h-3 object-cover rounded" />}
          <span>{team.name}</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-[10px] font-bold">
          {formation}
        </span>
      </div>

      {/* Real Football Green Pitch Container */}
      <div className="relative w-full h-80 sm:h-96 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-xl overflow-hidden border border-emerald-500/40 shadow-inner">
        {/* Pitch Field Markings */}
        <div className="absolute inset-0 border-2 border-white/20 m-2 rounded-lg pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/20 rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 border-b-2 border-x-2 border-white/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-t-2 border-x-2 border-white/20" />

        {/* Render 11 Starting Pitch Players */}
        {starting11.map((player, idx) => {
          const pos = positions[idx] || { x: 50, y: 50 };
          const goalsCount = goalscorers.filter(g => g.name === player.name).length;
          const subOff = substitutions.find(s => s.playerOut === player.name);
          const rating = (6.2 + (goalsCount * 1.2) + (idx === 9 ? 1.0 : 0)).toFixed(1);

          return (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {/* Jersey Shirt Graphic */}
              <div className="relative">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/40 flex items-center justify-center font-bold text-xs shadow-lg transition transform group-hover:scale-110 ${
                    shirtColor === 'RED' ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                >
                  👕
                </div>

                {/* Rating Badge */}
                <div className="absolute -top-1 -right-2 bg-slate-950 border border-white/30 text-amber-300 text-[8px] sm:text-[9px] px-1 rounded-full font-black shadow">
                  {rating}
                </div>

                {/* Goal Badge (⚽) */}
                {goalsCount > 0 && (
                  <div className="absolute -top-2 -left-2 bg-slate-900 border border-white/40 text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    ⚽
                  </div>
                )}

                {/* Subbed Out Badge (🔴 ⬇️) */}
                {subOff && (
                  <div className="absolute -bottom-1 -left-2 bg-rose-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold shadow">
                    ⬇️
                  </div>
                )}
              </div>

              {/* Player Short Name */}
              <span className="text-[9px] sm:text-[10px] font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate max-w-[65px] text-center mt-0.5">
                {player.name.split(' ').pop()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bench Substitutes Section (Matching Screenshot 2) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
          📋 BENCH SUBSTITUTES
        </span>
        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
          {bench.map((bPlayer, bIdx) => {
            const subOn = substitutions.find(s => s.playerIn === bPlayer.name);
            const bGoals = goalscorers.filter(g => g.name === bPlayer.name).length;
            const bRating = subOn ? (6.0 + bGoals * 1.1).toFixed(1) : undefined;

            return (
              <div
                key={bIdx}
                className="flex items-center justify-between bg-slate-950/70 border border-slate-800 p-1.5 rounded-lg text-[11px] font-mono text-slate-300"
              >
                <div className="flex items-center space-x-1.5 truncate">
                  <span className="truncate">{bPlayer.name}</span>
                  {subOn && <span className="text-emerald-400 font-extrabold text-xs">🟢 ⬆️</span>}
                  {bGoals > 0 && <span>⚽</span>}
                </div>
                {bRating && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px]">
                    {bRating}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface LiveMatchSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveMatchSimulatorModal: React.FC<LiveMatchSimulatorModalProps> = ({ isOpen, onClose }) => {
  const { allCountries } = useSimulatorStore();

  const [homeTeam, setHomeTeam] = useState<Country>(allCountries[0] || null);
  const [awayTeam, setAwayTeam] = useState<Country>(allCountries[1] || null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [minute, setMinute] = useState(0);
  const [maxMinute, setMaxMinute] = useState(90);
  const [isExtraTime, setIsExtraTime] = useState(false);
  const [halfTimeSwapped, setHalfTimeSwapped] = useState(false);

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [penaltyResult, setPenaltyResult] = useState<{
    homePen: number;
    awayPen: number;
    isPenalties: boolean;
    logs: string[];
  } | null>(null);

  // Match Substitutions List
  const [substitutions, setSubstitutions] = useState<Array<{
    minute: number;
    teamName: string;
    teamFlag: string;
    playerIn: string;
    playerOut: string;
  }>>([]);

  // Formations & Lineups State
  const [homeFormation, setHomeFormation] = useState<'4-3-3' | '4-2-3-1' | '3-5-2' | '4-4-2'>('4-3-3');
  const [awayFormation, setAwayFormation] = useState<'4-3-3' | '4-2-3-1' | '3-5-2' | '4-4-2'>('4-2-3-1');
  const [matchMode, setMatchMode] = useState<'KNOCKOUT' | 'FRIENDLY'>('KNOCKOUT');
  const [activeViewTab, setActiveViewTab] = useState<'STATS' | 'SUBS' | 'LINEUPS'>('STATS');

  // 2D Tactical Radar & Ball/Player Tracking State
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [homePlayerPos, setHomePlayerPos] = useState(getFormationPositions('4-3-3', true));
  const [awayPlayerPos, setAwayPlayerPos] = useState(getFormationPositions('4-2-3-1', false));
  const [ballActionText, setBallActionText] = useState<string>('Kickoff at center circle');
  const [lastActionType, setLastActionType] = useState<'GOAL' | 'SAVE' | 'SHOT' | 'CARD' | 'PASS' | 'SETPIECE'>('PASS');

  const [homeSquad, setHomeSquad] = useState<FootballPlayerProfile[]>([]);
  const [awaySquad, setAwaySquad] = useState<FootballPlayerProfile[]>([]);

  // Detailed Match Statistics
  const [matchStats, setMatchStats] = useState({
    homeShots: 0,
    awayShots: 0,
    homeOnTarget: 0,
    awayOnTarget: 0,
    homeCorners: 0,
    awayCorners: 0,
    homeYellows: 0,
    awayYellows: 0,
    homeFouls: 0,
    awayFouls: 0,
    homePossession: 50,
    awayPossession: 50,
    motmName: '',
    motmRating: '8.8',
    motmTeamName: '',
    motmTeamFlag: ''
  });

  // Match Events History Feed
  const [eventsHistory, setEventsHistory] = useState<Array<{
    minute: number;
    teamName: string;
    teamFlag: string;
    text: string;
    type: 'GOAL' | 'YELLOW' | 'RED' | 'SAVE' | 'SHOT' | 'SUB' | 'INFO';
  }>>([]);

  const [goalscorers, setGoalscorers] = useState<{
    home: Array<{ name: string; minute: number }>;
    away: Array<{ name: string; minute: number }>;
  }>({ home: [], away: [] });

  const [matchStatus, setMatchStatus] = useState<'NOT_STARTED' | 'PLAYING' | 'FINISHED'>('NOT_STARTED');
  const [winnerMessage, setWinnerMessage] = useState<string>('');

  useEffect(() => {
    if (!homeTeam && allCountries.length > 0) setHomeTeam(allCountries[0]);
    if (!awayTeam && allCountries.length > 1) setAwayTeam(allCountries[1]);
    fetchGoalHighlightsFromApi();
  }, [allCountries]);

  // Generate squads & reset match when teams change
  useEffect(() => {
    if (homeTeam && awayTeam) {
      const hSquad = getFullFootballSquad(homeTeam.id, homeTeam.region);
      const aSquad = getFullFootballSquad(awayTeam.id, awayTeam.region);
      setHomeSquad(hSquad);
      setAwaySquad(aSquad);
      resetMatch();
    }
  }, [homeTeam?.id, awayTeam?.id]);

  // Live Timer loop (1 tick = 1 Minute)
  useEffect(() => {
    let timer: any;
    if (isPlaying && minute < maxMinute) {
      timer = setTimeout(() => {
        simulateNextMinute();
      }, 450);
    } else if (minute >= maxMinute && matchStatus !== 'FINISHED') {
      handleMatchTimeEnd();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, minute, maxMinute, matchStatus, homeScore, awayScore]);

  // Dynamic Formation Positions Update
  useEffect(() => {
    if (minute === 0) {
      setHomePlayerPos(getFormationPositions(homeFormation, !halfTimeSwapped));
      setAwayPlayerPos(getFormationPositions(awayFormation, halfTimeSwapped));
    }
  }, [homeFormation, awayFormation, halfTimeSwapped, minute]);

  // Realistic Individual Player Movement: Only carrier and pressing defender charge to ball!
  const animateIndividualPlayerMovement = (targetX: number, targetY: number, isHomePossession: boolean) => {
    const currentHomeBase = getFormationPositions(homeFormation, !halfTimeSwapped);
    const currentAwayBase = getFormationPositions(awayFormation, halfTimeSwapped);

    const carrierIdx = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const defenderIdx = Math.floor(Math.random() * 10) + 1;

    if (isHomePossession) {
      setHomePlayerPos(currentHomeBase.map((p, idx) => {
        if (idx === 0) return p; // GK stays in goal
        if (idx === carrierIdx) return { x: targetX, y: targetY }; // Ball carrier runs directly to ball!
        const wobbleX = (Math.random() - 0.5) * 4;
        const wobbleY = (Math.random() - 0.5) * 4;
        return {
          x: Math.max(4, Math.min(96, Math.round(p.x + (targetX - p.x) * 0.08 + wobbleX))),
          y: Math.max(6, Math.min(94, Math.round(p.y + (targetY - p.y) * 0.08 + wobbleY)))
        };
      }));

      setAwayPlayerPos(currentAwayBase.map((p, idx) => {
        if (idx === 0) return p;
        if (idx === defenderIdx) return { x: Math.max(4, Math.min(96, targetX - 3)), y: Math.max(6, Math.min(94, targetY + 2)) }; // Defender presses carrier!
        const wobbleX = (Math.random() - 0.5) * 3;
        const wobbleY = (Math.random() - 0.5) * 3;
        return {
          x: Math.max(4, Math.min(96, Math.round(p.x + wobbleX))),
          y: Math.max(6, Math.min(94, Math.round(p.y + wobbleY)))
        };
      }));
    } else {
      setAwayPlayerPos(currentAwayBase.map((p, idx) => {
        if (idx === 0) return p;
        if (idx === carrierIdx) return { x: targetX, y: targetY }; // Away carrier runs to ball!
        const wobbleX = (Math.random() - 0.5) * 4;
        const wobbleY = (Math.random() - 0.5) * 4;
        return {
          x: Math.max(4, Math.min(96, Math.round(p.x + (targetX - p.x) * 0.08 + wobbleX))),
          y: Math.max(6, Math.min(94, Math.round(p.y + (targetY - p.y) * 0.08 + wobbleY)))
        };
      }));

      setHomePlayerPos(currentHomeBase.map((p, idx) => {
        if (idx === 0) return p;
        if (idx === defenderIdx) return { x: Math.max(4, Math.min(96, targetX + 3)), y: Math.max(6, Math.min(94, targetY - 2)) }; // Home defender tackles!
        const wobbleX = (Math.random() - 0.5) * 3;
        const wobbleY = (Math.random() - 0.5) * 3;
        return {
          x: Math.max(4, Math.min(96, Math.round(p.x + wobbleX))),
          y: Math.max(6, Math.min(94, Math.round(p.y + wobbleY)))
        };
      }));
    }
  };

  const resetMatch = () => {
    setIsPlaying(false);
    setMinute(0);
    setMaxMinute(90);
    setIsExtraTime(false);
    setHalfTimeSwapped(false);
    setHomeScore(0);
    setAwayScore(0);
    setPenaltyResult(null);
    setSubstitutions([]);
    setMatchStatus('NOT_STARTED');
    setWinnerMessage('');
    setEventsHistory([]);
    setGoalscorers({ home: [], away: [] });
    setBallPos({ x: 50, y: 50 });
    setHomePlayerPos(getFormationPositions(homeFormation, true));
    setAwayPlayerPos(getFormationPositions(awayFormation, false));
    setBallActionText('Kickoff at center circle');
    setLastActionType('PASS');
    setMatchStats({
      homeShots: 0,
      awayShots: 0,
      homeOnTarget: 0,
      awayOnTarget: 0,
      homeCorners: 0,
      awayCorners: 0,
      homeYellows: 0,
      awayYellows: 0,
      homeFouls: 0,
      awayFouls: 0,
      homePossession: 50,
      awayPossession: 50,
      motmName: '',
      motmRating: '8.8',
      motmTeamName: '',
      motmTeamFlag: ''
    });
  };

  const simulateNextMinute = () => {
    if (minute >= maxMinute) {
      handleMatchTimeEnd();
      return;
    }

    const curMin = minute + 1;
    setMinute(curMin);
    setMatchStatus('PLAYING');

    // HALF TIME AT 45' - SWITCH TEAMS SIDES!
    if (curMin === 45) {
      setHalfTimeSwapped(true);
      soundFx.playCard();
      setEventsHistory(prev => [
        {
          minute: 45,
          teamName: 'HALF TIME',
          teamFlag: '',
          text: `⏸️ HALF TIME! Score: ${homeScore} - ${awayScore}. Teams SWITCH SIDES for the 2nd Half!`,
          type: 'INFO'
        },
        ...prev
      ]);
      setBallPos({ x: 50, y: 50 });
      setHomePlayerPos(getFormationPositions(homeFormation, false));
      setAwayPlayerPos(getFormationPositions(awayFormation, true));
      setBallActionText('2nd Half Kickoff! Teams have switched sides.');
      return;
    }

    const rand = Math.random();
    const isHomeEvent = Math.random() < 0.52; // Slight home advantage
    const activeTeam = isHomeEvent ? homeTeam : awayTeam;
    const activeSquad = isHomeEvent ? homeSquad : awaySquad;
    const defSquad = isHomeEvent ? awaySquad : homeSquad;

    const randomPlayer = activeSquad[Math.floor(Math.random() * activeSquad.length)]?.name || 'Player';
    const randomDef = defSquad[Math.floor(Math.random() * defSquad.length)]?.name || 'Defender';

    // Target goal net depends on half-time side swap
    const homeTargetGoalX = halfTimeSwapped ? 4 : 96;
    const awayTargetGoalX = halfTimeSwapped ? 96 : 4;
    const targetGoalX = isHomeEvent ? homeTargetGoalX : awayTargetGoalX;

    // 1. GOAL Chance (~4% per minute)
    if (rand < 0.04) {
      soundFx.playGoal();
      const pattern = getRandomGoalHighlight(targetGoalX > 50 ? 'right' : 'left');

      if (pattern && pattern.ballPath && pattern.ballPath.length > 0) {
        pattern.ballPath.forEach((pt, stepIdx) => {
          setTimeout(() => {
            setBallPos({ x: pt.x, y: pt.y });
            animateIndividualPlayerMovement(pt.x, pt.y, isHomeEvent);
          }, stepIdx * 140);
        });
      } else {
        const targetY = Math.floor(Math.random() * 20) + 40;
        setBallPos({ x: targetGoalX, y: targetY });
        animateIndividualPlayerMovement(targetGoalX, targetY, isHomeEvent);
      }

      setBallActionText(`⚽ GOAL! ${randomPlayer} scores for ${activeTeam.name}! (${pattern?.assisted ? 'Assisted Build-up' : 'Direct Strike'})`);
      setLastActionType('GOAL');

      if (isHomeEvent) {
        setHomeScore(prev => prev + 1);
        setGoalscorers(prev => ({ ...prev, home: [...prev.home, { name: randomPlayer, minute: curMin }] }));
        setMatchStats(prev => ({ ...prev, homeShots: prev.homeShots + 1, homeOnTarget: prev.homeOnTarget + 1 }));
      } else {
        setAwayScore(prev => prev + 1);
        setGoalscorers(prev => ({ ...prev, away: [...prev.away, { name: randomPlayer, minute: curMin }] }));
        setMatchStats(prev => ({ ...prev, awayShots: prev.awayShots + 1, awayOnTarget: prev.awayOnTarget + 1 }));
      }

      setEventsHistory(prev => [
        {
          minute: curMin,
          teamName: activeTeam.name,
          teamFlag: activeTeam.flagUrl,
          text: `⚽ GOAL! Unbelievable strike by ${randomPlayer}! Smashed into the top corner!`,
          type: 'GOAL'
        },
        ...prev
      ]);

      // RESET BALL TO CENTER & PLAYERS TO FORMATION AFTER GOAL CELEBRATION!
      setTimeout(() => {
        setBallPos({ x: 50, y: 50 });
        setHomePlayerPos(getFormationPositions(homeFormation, !halfTimeSwapped));
        setAwayPlayerPos(getFormationPositions(awayFormation, halfTimeSwapped));
        setBallActionText(`⚽ Kickoff restart from center circle after Goal celebration!`);
        setLastActionType('PASS');
      }, 1200);
    }
    // 2. CORNER KICK (~8% chance)
    else if (rand < 0.12) {
      const cornerX = targetGoalX;
      const cornerY = Math.random() < 0.5 ? 4 : 96;
      setBallPos({ x: cornerX, y: cornerY });
      animateIndividualPlayerMovement(cornerX, cornerY, isHomeEvent);
      setBallActionText(`⛳ CORNER KICK taken by ${randomPlayer}! Whipped into penalty area.`);
      setLastActionType('SETPIECE');

      if (isHomeEvent) {
        setMatchStats(prev => ({ ...prev, homeCorners: prev.homeCorners + 1 }));
      } else {
        setMatchStats(prev => ({ ...prev, awayCorners: prev.awayCorners + 1 }));
      }

      setEventsHistory(prev => [
        {
          minute: curMin,
          teamName: activeTeam.name,
          teamFlag: activeTeam.flagUrl,
          text: `⛳ CORNER KICK! ${randomPlayer} swings high cross into the 6-yard box!`,
          type: 'INFO'
        },
        ...prev
      ]);
    }
    // 3. THROW-IN (~10% chance)
    else if (rand < 0.22) {
      const throwX = isHomeEvent ? (halfTimeSwapped ? 35 : 65) : (halfTimeSwapped ? 65 : 35);
      const throwY = Math.random() < 0.5 ? 4 : 96;
      setBallPos({ x: throwX, y: throwY });
      animateIndividualPlayerMovement(throwX, throwY, isHomeEvent);
      setBallActionText(`🤾 THROW-IN for ${activeTeam.name} by ${randomPlayer} along touchline.`);
      setLastActionType('SETPIECE');
    }
    // 4. FREE KICK (~7% chance)
    else if (rand < 0.29) {
      soundFx.playCard();
      const fkX = isHomeEvent ? (halfTimeSwapped ? 25 : 75) : (halfTimeSwapped ? 75 : 25);
      const fkY = Math.floor(Math.random() * 40) + 30;
      setBallPos({ x: fkX, y: fkY });
      animateIndividualPlayerMovement(fkX, fkY, isHomeEvent);
      setBallActionText(`🎯 DANGEROUS FREE KICK! ${randomPlayer} steps up to shoot over the wall!`);
      setLastActionType('SETPIECE');

      setEventsHistory(prev => [
        {
          minute: curMin,
          teamName: activeTeam.name,
          teamFlag: activeTeam.flagUrl,
          text: `🎯 FREE KICK! ${randomPlayer} hits curling shot around 4-man wall!`,
          type: 'INFO'
        },
        ...prev
      ]);
    }
    // 5. SAVED / SHOT ON TARGET (~8% chance)
    else if (rand < 0.37) {
      const keeper = defSquad[0]?.name || 'Goalkeeper';
      const targetX = isHomeEvent ? (halfTimeSwapped ? 12 : 88) : (halfTimeSwapped ? 88 : 12);
      const targetY = Math.floor(Math.random() * 26) + 37;
      setBallPos({ x: targetX, y: targetY });
      animateIndividualPlayerMovement(targetX, targetY, isHomeEvent);
      setBallActionText(`🧤 SAVE! ${keeper} stops ${randomPlayer}'s volley!`);
      setLastActionType('SAVE');

      if (isHomeEvent) {
        setMatchStats(prev => ({ ...prev, homeShots: prev.homeShots + 1, homeOnTarget: prev.homeOnTarget + 1 }));
      } else {
        setMatchStats(prev => ({ ...prev, awayShots: prev.awayShots + 1, awayOnTarget: prev.awayOnTarget + 1 }));
      }

      setEventsHistory(prev => [
        {
          minute: curMin,
          teamName: activeTeam.name,
          teamFlag: activeTeam.flagUrl,
          text: `🧤 GREAT SAVE! ${keeper} parries away a fierce volley from ${randomPlayer}!`,
          type: 'SAVE'
        },
        ...prev
      ]);
    }
    // 6. YELLOW CARD (~3% chance)
    else if (rand < 0.40) {
      soundFx.playCard();
      const foulX = isHomeEvent ? 45 : 55;
      const foulY = Math.floor(Math.random() * 40) + 30;
      setBallPos({ x: foulX, y: foulY });
      animateIndividualPlayerMovement(foulX, foulY, isHomeEvent);
      setBallActionText(`🟨 FOUL! ${randomPlayer} booked for a heavy tackle.`);
      setLastActionType('CARD');

      if (isHomeEvent) {
        setMatchStats(prev => ({ ...prev, homeYellows: prev.homeYellows + 1, homeFouls: prev.homeFouls + 1 }));
      } else {
        setMatchStats(prev => ({ ...prev, awayYellows: prev.awayYellows + 1, awayFouls: prev.awayFouls + 1 }));
      }

      setEventsHistory(prev => [
        {
          minute: curMin,
          teamName: activeTeam.name,
          teamFlag: activeTeam.flagUrl,
          text: `🟨 YELLOW CARD! Tactical foul by ${randomPlayer} on ${randomDef}.`,
          type: 'YELLOW'
        },
        ...prev
      ]);
    }
    // 7. TACTICAL SUBSTITUTION (~15% chance during 50'-88' mins)
    else if (curMin >= 50 && curMin <= 88 && Math.random() < 0.15 && substitutions.length < 12) {
      soundFx.playCard();
      const pOutIdx = Math.floor(Math.random() * 10) + 1;
      const pInIdx = Math.floor(Math.random() * 5) + 11;
      const pOut = activeSquad[pOutIdx]?.name || 'Player';
      const pIn = activeSquad[pInIdx]?.name || 'Substitute';

      setSubstitutions(prev => [
        { minute: curMin, teamName: activeTeam.name, teamFlag: activeTeam.flagUrl, playerIn: pIn, playerOut: pOut },
        ...prev
      ]);

      setEventsHistory(prev => [
        {
          minute: curMin,
          teamName: activeTeam.name,
          teamFlag: activeTeam.flagUrl,
          text: `🔄 SUB: ${pIn} 🟢 IN ⬅️ ${pOut} 🔴 OUT (${activeTeam.name})`,
          type: 'SUB'
        },
        ...prev
      ]);
      setBallActionText(`🔄 SUB (${curMin}'): ${pIn} replaces ${pOut} for ${activeTeam.name}`);
      setLastActionType('SETPIECE');
    }
    // 8. NORMAL BUILD-UP & PASSING
    else {
      const passX = isHomeEvent
        ? (halfTimeSwapped ? Math.floor(Math.random() * 35) + 25 : Math.floor(Math.random() * 35) + 40)
        : (halfTimeSwapped ? Math.floor(Math.random() * 35) + 40 : Math.floor(Math.random() * 35) + 25);
      const passY = Math.floor(Math.random() * 60) + 20;
      setBallPos({ x: passX, y: passY });
      animateIndividualPlayerMovement(passX, passY, isHomeEvent);
      setBallActionText(`⚽ ${activeTeam.name} build up play via ${randomPlayer}`);
      setLastActionType('PASS');
    }

    if (curMin >= maxMinute) {
      handleMatchTimeEnd(curMin);
    }
  };

  const handleMatchTimeEnd = (currentMin?: number) => {
    const checkMin = currentMin || minute;
    if (checkMin >= 90 && checkMin < 120 && homeScore === awayScore && !isExtraTime && matchMode === 'KNOCKOUT') {
      setIsExtraTime(true);
      setMaxMinute(120);
      setMinute(91);
      soundFx.playCard();
      setEventsHistory(prev => [
        {
          minute: 90,
          teamName: 'EXTRA TIME',
          teamFlag: '',
          text: `⏱️ 90' FULL TIME DRAW (${homeScore} - ${awayScore})! Match goes to EXTRA TIME (30 Mins: 91'-120')!`,
          type: 'INFO'
        },
        ...prev
      ]);
      setBallActionText('⏱️ EXTRA TIME KICKOFF! 30 Mins added to break the tie.');
      return;
    } else if (checkMin >= 120 && homeScore === awayScore && !penaltyResult && matchMode === 'KNOCKOUT') {
      runPenaltyShootout();
      return;
    } else {
      finishMatch();
    }
  };

  const triggerManualExtraTimeOrPenalties = () => {
    if (!isExtraTime && minute >= 90) {
      setIsExtraTime(true);
      setMaxMinute(120);
      setMinute(91);
      setMatchStatus('PLAYING');
      setIsPlaying(true);
      soundFx.playCard();
      setEventsHistory(prev => [
        {
          minute: 90,
          teamName: 'EXTRA TIME',
          teamFlag: '',
          text: `⏱️ EXTRA TIME TRIGGERED! 30 Minutes (91'-120') initiated to resolve draw!`,
          type: 'INFO'
        },
        ...prev
      ]);
      setBallActionText('⏱️ 30 MINS EXTRA TIME INITIATED!');
    } else if (minute >= 120 || isExtraTime) {
      runPenaltyShootout();
    }
  };

  const runPenaltyShootout = () => {
    setIsPlaying(false);
    let hPen = 0;
    let aPen = 0;
    const penLogs: string[] = [];

    // 5 Kicks each
    for (let k = 1; k <= 5; k++) {
      const hPlayer = homeSquad[k]?.name || `Taker ${k}`;
      const aPlayer = awaySquad[k]?.name || `Taker ${k}`;

      if (Math.random() < 0.75) {
        hPen++;
        penLogs.push(`⚽ PK ${k}: ${hPlayer} (${homeTeam.name}) SCORES!`);
      } else {
        penLogs.push(`❌ PK ${k}: ${hPlayer} (${homeTeam.name}) SAVED / MISSED!`);
      }

      if (Math.random() < 0.75) {
        aPen++;
        penLogs.push(`⚽ PK ${k}: ${aPlayer} (${awayTeam.name}) SCORES!`);
      } else {
        penLogs.push(`❌ PK ${k}: ${aPlayer} (${awayTeam.name}) SAVED / MISSED!`);
      }
    }

    // Sudden death if tied
    let suddenK = 6;
    while (hPen === aPen && suddenK <= 10) {
      const hScored = Math.random() < 0.7;
      const aScored = Math.random() < 0.7;
      if (hScored) hPen++;
      if (aScored) aPen++;
      penLogs.push(`🥅 Sudden Death PK ${suddenK}: ${homeTeam.name} ${hScored ? '⚽' : '❌'} - ${awayTeam.name} ${aScored ? '⚽' : '❌'}`);
      suddenK++;
    }

    if (hPen === aPen) hPen++;

    const winner = hPen > aPen ? homeTeam : awayTeam;
    const pResult = {
      homePen: hPen,
      awayPen: aPen,
      isPenalties: true,
      logs: penLogs
    };

    setPenaltyResult(pResult);
    finishMatch(hPen, aPen, winner);
  };

  const finishMatch = (hPen?: number, aPen?: number, pWinner?: Country) => {
    setIsPlaying(false);
    setMatchStatus('FINISHED');
    soundFx.playFanfare();

    const totalShots = matchStats.homeShots + matchStats.awayShots || 10;
    const homePoss = Math.min(68, Math.max(32, Math.round((matchStats.homeShots / totalShots) * 50 + 25)));
    const awayPoss = 100 - homePoss;

    let motm = '';
    let motmTeam = homeTeam;

    if (goalscorers.home.length > 0) {
      motm = goalscorers.home[0].name;
      motmTeam = homeTeam;
    } else if (goalscorers.away.length > 0) {
      motm = goalscorers.away[0].name;
      motmTeam = awayTeam;
    } else {
      motm = homeSquad[0]?.name || 'Goalkeeper';
      motmTeam = homeTeam;
    }

    const rating = (Math.random() * 0.8 + 8.8).toFixed(1);

    setMatchStats(prev => ({
      ...prev,
      homePossession: homePoss,
      awayPossession: awayPoss,
      motmName: motm,
      motmRating: rating,
      motmTeamName: motmTeam.name,
      motmTeamFlag: motmTeam.flagUrl
    }));

    if (hPen !== undefined && aPen !== undefined && pWinner) {
      setWinnerMessage(`🏆 Full-Time (AET)! ${pWinner.name} wins ${hPen} - ${aPen} on Penalties (After ${homeScore}-${awayScore} Draw)!`);
    } else if (homeScore > awayScore) {
      setWinnerMessage(`🏆 Full-Time! ${homeTeam.name} wins ${homeScore} - ${awayScore}${isExtraTime ? ' (AET)' : ''}!`);
    } else if (awayScore > homeScore) {
      setWinnerMessage(`🏆 Full-Time! ${awayTeam.name} wins ${awayScore} - ${homeScore}${isExtraTime ? ' (AET)' : ''}!`);
    } else {
      setWinnerMessage(`🤝 Full-Time! Match ends in a ${homeScore} - ${awayScore} Draw!`);
    }
  };

  const handleTogglePlay = () => {
    if (matchStatus === 'FINISHED') {
      resetMatch();
      setTimeout(() => setIsPlaying(true), 50);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  if (!isOpen || !homeTeam || !awayTeam) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-100 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white">Live 90-Minute Football Match Ticker Simulator</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Live Goals, Cards, Saves, and TV Broadcast Post-Match Summary
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
              title="Close Live Simulator"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto pr-1 space-y-5 pt-3 flex-1 scrollbar-thin">

            {/* Team Pickers, Formations & Match Rules */}
            <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Home Team</span>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono">Formation</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <SearchableCountrySelect
                        selectedCountry={homeTeam}
                        onSelect={(c) => setHomeTeam(c)}
                        label=""
                        allCountries={allCountries}
                      />
                    </div>
                    <select
                      value={homeFormation}
                      onChange={(e) => setHomeFormation(e.target.value as any)}
                      className="bg-slate-900 border border-emerald-500/40 rounded-xl px-2 py-2 text-emerald-400 font-bold focus:outline-none text-xs"
                    >
                      <option value="4-3-3">4-3-3</option>
                      <option value="4-2-3-1">4-2-3-1</option>
                      <option value="3-5-2">3-5-2</option>
                      <option value="4-4-2">4-4-2</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Away Team</span>
                    <span className="text-[10px] font-bold text-amber-400 font-mono">Formation</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <SearchableCountrySelect
                        selectedCountry={awayTeam}
                        onSelect={(c) => setAwayTeam(c)}
                        label=""
                        allCountries={allCountries}
                      />
                    </div>
                    <select
                      value={awayFormation}
                      onChange={(e) => setAwayFormation(e.target.value as any)}
                      className="bg-slate-900 border border-amber-500/40 rounded-xl px-2 py-2 text-amber-400 font-bold focus:outline-none text-xs"
                    >
                      <option value="4-3-3">4-3-3</option>
                      <option value="4-2-3-1">4-2-3-1</option>
                      <option value="3-5-2">3-5-2</option>
                      <option value="4-4-2">4-4-2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Match Rules Mode Selector */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tournament Match Rule:</span>
                <div className="flex items-center space-x-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setMatchMode('KNOCKOUT')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                      matchMode === 'KNOCKOUT'
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    🏆 Cup Final (ET 120' + Penalties PK)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchMode('FRIENDLY')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                      matchMode === 'FRIENDLY'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    ⚽ Friendly (Ends at 90')
                  </button>
                </div>
              </div>
            </div>

            {/* Live Scoreboard Display */}
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-3 shadow-lg">
              
              {/* Minute Clock */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{minute}' / 90' MIN</span>
              </div>

              {/* Teams & Scores */}
              <div className="flex items-center justify-around">
                {/* Home */}
                <div className="text-center space-y-1 w-1/3">
                  {homeTeam.flagUrl && (
                    <img src={homeTeam.flagUrl} alt="" className="w-10 h-7 object-cover rounded mx-auto shadow" />
                  )}
                  <div className="font-extrabold text-sm text-white truncate">{homeTeam.name}</div>
                </div>

                {/* Score */}
                <div className="font-mono font-black text-3xl sm:text-4xl text-emerald-400 px-4">
                  {homeScore} - {awayScore}
                </div>

                {/* Away */}
                <div className="text-center space-y-1 w-1/3">
                  {awayTeam.flagUrl && (
                    <img src={awayTeam.flagUrl} alt="" className="w-10 h-7 object-cover rounded mx-auto shadow" />
                  )}
                  <div className="font-extrabold text-sm text-white truncate">{awayTeam.name}</div>
                </div>
              </div>

              {/* Goalscorers Breakdown */}
              {(goalscorers.home.length > 0 || goalscorers.away.length > 0) && (
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-800/80 text-slate-400">
                  <div className="text-left space-y-0.5">
                    {goalscorers.home.map((g, i) => (
                      <div key={i} className="truncate">⚽ {g.name} {g.minute}'</div>
                    ))}
                  </div>
                  <div className="text-right space-y-0.5">
                    {goalscorers.away.map((g, i) => (
                      <div key={i} className="truncate">{g.name} {g.minute}' ⚽</div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2D REAL-TIME TACTICAL PITCH RADAR & BALL TRACKER */}
              <div className="relative w-full h-44 sm:h-56 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-2 border-emerald-500/40 overflow-hidden shadow-2xl font-mono select-none my-2">
                {/* Pitch Grass Texture & Marking Lines */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Center Pitch Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/40 -translate-x-1/2" />
                
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/60 rounded-full -translate-x-1/2 -translate-y-1/2" />

                {/* Left Penalty Box & Goal Net */}
                <div className="absolute top-1/4 bottom-1/4 left-0 w-16 border-2 border-l-0 border-white/40 bg-white/5" />
                <div className="absolute top-1/3 bottom-1/3 left-0 w-6 border-2 border-l-0 border-white/40" />
                <div className="absolute top-1/2 left-0 w-3 h-12 bg-emerald-400/20 border border-emerald-400 -translate-y-1/2 rounded-r" title="Left Goal Net" />

                {/* Right Penalty Box & Goal Net */}
                <div className="absolute top-1/4 bottom-1/4 right-0 w-16 border-2 border-r-0 border-white/40 bg-white/5" />
                <div className="absolute top-1/3 bottom-1/3 right-0 w-6 border-2 border-r-0 border-white/40" />
                <div className="absolute top-1/2 right-0 w-3 h-12 bg-emerald-400/20 border border-emerald-400 -translate-y-1/2 rounded-l" title="Right Goal Net" />

                {/* 11 Home Team Player Pins (Emerald Motion Animation) */}
                {homePlayerPos.map((p, idx) => (
                  <motion.div
                    key={`home-p-${idx}`}
                    animate={{ left: `${p.x}%`, top: `${p.y}%` }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                    className="absolute z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border border-white shadow-md flex items-center justify-center text-[8px] font-extrabold text-slate-950 -translate-x-1/2 -translate-y-1/2"
                  >
                    {idx === 0 ? '1' : idx + 1}
                  </motion.div>
                ))}

                {/* 11 Away Team Player Pins (Amber Motion Animation) */}
                {awayPlayerPos.map((p, idx) => (
                  <motion.div
                    key={`away-p-${idx}`}
                    animate={{ left: `${p.x}%`, top: `${p.y}%` }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                    className="absolute z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 border border-slate-950 shadow-md flex items-center justify-center text-[8px] font-extrabold text-slate-950 -translate-x-1/2 -translate-y-1/2"
                  >
                    {idx === 0 ? '1' : idx + 1}
                  </motion.div>
                ))}

                {/* Real-Time Animated Glowing Football Physics Marker */}
                <motion.div
                  animate={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="absolute z-20 w-5 h-5 sm:w-6 sm:h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                >
                  <div className={`relative w-full h-full rounded-full flex items-center justify-center text-xs shadow-xl ${
                    lastActionType === 'GOAL' ? 'scale-125 bg-amber-400 animate-ping' : 'bg-white'
                  }`}>
                    ⚽
                  </div>
                </motion.div>

                {/* Half-Time Side Switch Indicator Badge */}
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-2 py-0.5 text-[9px] font-mono text-emerald-400 z-30 font-bold">
                  {halfTimeSwapped ? `2ND HALF 🔁 (Home ⬅️ | ➡️ Away)` : `1ST HALF (Home ➡️ | ⬅️ Away)`}
                </div>

                {/* Pitch Radar Live Action HUD Banner */}
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-xl px-3 py-1.5 flex items-center justify-between text-[10px] font-mono z-30">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="text-slate-300 font-bold truncate">{ballActionText}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400 flex-shrink-0">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" /> <span>{homeTeam.name}</span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" /> <span>{awayTeam.name}</span>
                  </div>
                </div>
              </div>

              {/* Winner Announcement Banner */}
              {winnerMessage && (
                <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-500/50 rounded-xl p-3 text-amber-300 font-extrabold text-sm shadow animate-pulse">
                  {winnerMessage}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-center space-x-3 pt-1">
                <button
                  onClick={handleTogglePlay}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition shadow-md ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : matchStatus === 'FINISHED'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:scale-105'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : matchStatus === 'FINISHED' ? (
                    <RotateCcw className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>
                    {isPlaying
                      ? 'Pause Live'
                      : matchStatus === 'FINISHED'
                      ? 'Restart Match 🔄'
                      : minute === 0
                      ? 'Play 90-Min Live Match'
                      : 'Resume Live Match'}
                  </span>
                </button>

                <button
                  onClick={simulateNextMinute}
                  disabled={isPlaying || matchStatus === 'FINISHED'}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  Step 1 Min
                </button>

                {/* Manual Extra Time / Penalty Trigger Button when Tied */}
                {homeScore === awayScore && minute >= 90 && !penaltyResult && (
                  <button
                    onClick={triggerManualExtraTimeOrPenalties}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black shadow-lg hover:scale-105 transition flex items-center space-x-1.5 animate-bounce"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>{minute < 120 ? 'Play Extra Time (30 Mins ⏱️)' : 'Start Penalty Shootout 🥅'}</span>
                  </button>
                )}

                <button
                  onClick={resetMatch}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition border border-slate-700"
                  title="Reset Live Match"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* REAL FOOTBALL TV BROADCAST POST-MATCH SUMMARY CARD */}
            {matchStatus === 'FINISHED' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 space-y-4 shadow-xl font-mono text-xs"
              >
                {/* Penalty Shootout Score Card (If Penalties Occurred) */}
                {penaltyResult && (
                  <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/20 to-emerald-500/10 border border-emerald-500/40 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-emerald-400 font-extrabold">
                        <Trophy className="w-4 h-4" />
                        <span>PENALTY SHOOTOUT RESULT (PK 🥅)</span>
                      </div>
                      <div className="px-2.5 py-0.5 rounded bg-emerald-400 text-slate-950 font-black text-xs">
                        {penaltyResult.homePen} - {penaltyResult.awayPen} PKs
                      </div>
                    </div>

                    <div className="space-y-1 pt-1 max-h-32 overflow-y-auto pr-1">
                      {penaltyResult.logs.map((log, idx) => (
                        <div key={idx} className="bg-slate-900/90 border border-slate-800 p-1.5 rounded text-[11px] text-slate-200">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Man of the Match Badge */}
                {matchStats.motmName && (
                  <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/20 to-amber-500/10 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                        <Star className="w-5 h-5 fill-slate-950" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-extrabold text-amber-400 tracking-wider block">
                          ⭐ MAN OF THE MATCH (MOTM)
                        </span>
                        <div className="font-extrabold text-sm text-white flex items-center space-x-2">
                          {matchStats.motmTeamFlag && (
                            <img src={matchStats.motmTeamFlag} alt="" className="w-4 h-3 object-cover rounded" />
                          )}
                          <span>{matchStats.motmName}</span>
                          <span className="text-xs text-slate-400">({matchStats.motmTeamName})</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs">
                      {matchStats.motmRating} Rating
                    </div>
                  </div>
                )}

                {/* Broadcast Tabs Navigation */}
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <button
                    onClick={() => setActiveViewTab('STATS')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition ${
                      activeViewTab === 'STATS'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Match Stats</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('SUBS')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition ${
                      activeViewTab === 'SUBS'
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🔄 Substitutions ({substitutions.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('LINEUPS')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition ${
                      activeViewTab === 'LINEUPS'
                        ? 'bg-teal-400 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>📋 Lineups & Formations</span>
                  </button>
                </div>

                {/* TAB 1: MATCH STATS */}
                {activeViewTab === 'STATS' && (
                  <div className="space-y-3 pt-1">
                    {/* Possession % */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span className="text-emerald-400">{matchStats.homePossession}%</span>
                        <span className="text-slate-400 font-normal uppercase text-[10px]">Ball Possession</span>
                        <span className="text-teal-400">{matchStats.awayPossession}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                        <div className="h-full bg-emerald-500" style={{ width: `${matchStats.homePossession}%` }} />
                        <div className="h-full bg-teal-500" style={{ width: `${matchStats.awayPossession}%` }} />
                      </div>
                    </div>

                    {/* Total Shots */}
                    <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="font-bold text-emerald-400 text-xs">{matchStats.homeShots}</span>
                      <span className="text-slate-400 text-[11px]">Total Shots</span>
                      <span className="font-bold text-teal-400 text-xs">{matchStats.awayShots}</span>
                    </div>

                    {/* Shots on Target */}
                    <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="font-bold text-emerald-400 text-xs">{matchStats.homeOnTarget}</span>
                      <span className="text-slate-400 text-[11px]">Shots On Target</span>
                      <span className="font-bold text-teal-400 text-xs">{matchStats.awayOnTarget}</span>
                    </div>

                    {/* Corners */}
                    <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="font-bold text-emerald-400 text-xs">{matchStats.homeCorners}</span>
                      <span className="text-slate-400 text-[11px]">Corners Taken</span>
                      <span className="font-bold text-teal-400 text-xs">{matchStats.awayCorners}</span>
                    </div>

                    {/* Yellow Cards */}
                    <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="font-bold text-amber-400 text-xs">🟨 {matchStats.homeYellows}</span>
                      <span className="text-slate-400 text-[11px]">Yellow Cards</span>
                      <span className="font-bold text-amber-400 text-xs">{matchStats.awayYellows} 🟨</span>
                    </div>

                    {/* Fouls */}
                    <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="font-bold text-rose-400 text-xs">{matchStats.homeFouls}</span>
                      <span className="text-slate-400 text-[11px]">Fouls Committed</span>
                      <span className="font-bold text-rose-400 text-xs">{matchStats.awayFouls}</span>
                    </div>
                  </div>
                )}

                {/* TAB 2: SUBSTITUTIONS SUMMARY & TOP PERFORMERS */}
                {activeViewTab === 'SUBS' && (
                  <div className="space-y-4 pt-1">
                    {/* TOP PERFORMERS GREEN CARD (MATCHING USER SCREENSHOT) */}
                    <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 rounded-2xl p-3.5 text-white shadow-xl space-y-2.5 font-mono">
                      <div className="text-xs font-black uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                          <span>Top Performers</span>
                        </span>
                        <span className="text-[10px] bg-slate-950/30 px-2 py-0.5 rounded font-bold">RATING HIGHLIGHTS</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        {[
                          { player: goalscorers.home[0]?.name || homeSquad[0]?.name || 'H. Kane', pos: 'ST | ' + homeTeam.name, rating: '7.7' },
                          { player: goalscorers.away[0]?.name || awaySquad[0]?.name || 'J. Musiala', pos: 'CAM | ' + awayTeam.name, rating: '7.5' },
                          { player: homeSquad[2]?.name || 'Gavi', pos: 'CM | ' + homeTeam.name, rating: '7.2' },
                        ].map((tp, idx) => (
                          <div key={idx} className="bg-slate-950/20 backdrop-blur border border-white/20 rounded-xl p-2 space-y-1 flex flex-col items-center justify-between">
                            <div className="relative w-8 h-8 rounded-full bg-rose-600 border border-white/40 flex items-center justify-center font-bold text-xs shadow-md">
                              👕
                              <span className="absolute -top-1 -right-2 bg-slate-900 border border-white/40 text-amber-300 text-[9px] px-1 rounded-full font-black">
                                {tp.rating}
                              </span>
                            </div>
                            <div className="font-extrabold text-xs text-white truncate w-full">{tp.player}</div>
                            <div className="text-[9px] opacity-80 font-mono truncate w-full">{tp.pos}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FOTMOB / GOOGLE SPORTS STYLED SUBSTITUTIONS TIMELINE */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-3 font-mono">
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center justify-between">
                        <span className="text-amber-400">⚡ Match Substitutions Timeline</span>
                        <span className="text-[10px] text-slate-500 font-normal">{substitutions.length} SUBS MADE</span>
                      </div>

                      {substitutions.length > 0 ? (
                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          {substitutions.map((sub, idx) => {
                            const isHomeSub = sub.teamName === homeTeam.name;
                            return (
                              <div key={idx} className="grid grid-cols-5 items-center text-xs">
                                {/* Home Sub Column (Left) */}
                                <div className="col-span-2 text-left">
                                  {isHomeSub ? (
                                    <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                                      <span className="text-emerald-400 font-bold">🟢 {sub.playerIn}</span>
                                      <span className="text-rose-400 text-[10px]">🔴 {sub.playerOut}</span>
                                    </div>
                                  ) : (
                                    <div />
                                  )}
                                </div>

                                {/* Minute Badge (Center) */}
                                <div className="text-center">
                                  <span className="font-extrabold text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                                    {sub.minute}'
                                  </span>
                                </div>

                                {/* Away Sub Column (Right) */}
                                <div className="col-span-2 text-right">
                                  {!isHomeSub ? (
                                    <div className="flex items-center justify-end space-x-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                                      <span className="text-emerald-400 font-bold">{sub.playerIn} 🟢</span>
                                      <span className="text-rose-400 text-[10px]">{sub.playerOut} 🔴</span>
                                    </div>
                                  ) : (
                                    <div />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-slate-500 text-center py-6 text-xs">No tactical substitutions recorded yet. Play match to simulate subs!</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: TEAM LINEUPS & FORMATIONS */}
                {activeViewTab === 'LINEUPS' && (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Home Team FotMob Pitch */}
                      <FotMobPitchCard
                        team={homeTeam}
                        squad={homeSquad}
                        formation={homeFormation}
                        shirtColor="RED"
                        goalscorers={goalscorers.home}
                        substitutions={substitutions}
                      />

                      {/* Away Team FotMob Pitch */}
                      <FotMobPitchCard
                        team={awayTeam}
                        squad={awaySquad}
                        formation={awayFormation}
                        shirtColor="BLUE"
                        goalscorers={goalscorers.away}
                        substitutions={substitutions}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Live Ticker Feed */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                🎙️ Minute-by-Minute Live Commentary Ticker Feed
              </span>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {eventsHistory.length > 0 ? (
                  eventsHistory.map((ev, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start space-x-2 p-2 rounded-xl border text-xs ${
                        ev.type === 'GOAL'
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                          : ev.type === 'YELLOW' || ev.type === 'RED'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                          : ev.type === 'SAVE'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-900 border-slate-800/80 text-slate-300'
                      }`}
                    >
                      <span className="font-bold font-mono px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 flex-shrink-0 text-[10px]">
                        {ev.minute}'
                      </span>
                      {ev.teamFlag && <img src={ev.teamFlag} alt="" className="w-4 h-3 object-cover rounded mt-0.5 flex-shrink-0" />}
                      <span className="flex-1 leading-snug">{ev.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">Click Play to start live 90-minute football match!</p>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="pt-1 text-center text-[10px] text-amber-400/70 font-mono pb-2">
              ⚠️ Disclaimer: Live match events, goalscorers, and cards are procedurally simulated for tournament representation and may be incorrect or fictional.
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
