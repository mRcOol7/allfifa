import React, { useState, useEffect } from 'react';
import { Country } from '../types/simulator';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { getFullFootballSquad, FootballPlayerProfile } from '../engine/playerNames';
import { soundFx } from '../utils/soundFx';
import { X, Play, Pause, RotateCcw, Zap, Flame, Shield, Trophy, Activity, Award, Star, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HOME_1ST_HALF = [
  { x: 5, y: 50 },
  { x: 18, y: 20 }, { x: 20, y: 40 }, { x: 20, y: 60 }, { x: 18, y: 80 },
  { x: 35, y: 30 }, { x: 38, y: 50 }, { x: 35, y: 70 },
  { x: 45, y: 25 }, { x: 48, y: 50 }, { x: 45, y: 75 },
];

const AWAY_1ST_HALF = [
  { x: 95, y: 50 },
  { x: 82, y: 20 }, { x: 80, y: 40 }, { x: 80, y: 60 }, { x: 82, y: 80 },
  { x: 65, y: 30 }, { x: 62, y: 50 }, { x: 65, y: 70 },
  { x: 55, y: 25 }, { x: 52, y: 50 }, { x: 55, y: 75 },
];

const HOME_2ND_HALF = [
  { x: 95, y: 50 },
  { x: 82, y: 20 }, { x: 80, y: 40 }, { x: 80, y: 60 }, { x: 82, y: 80 },
  { x: 65, y: 30 }, { x: 62, y: 50 }, { x: 65, y: 70 },
  { x: 55, y: 25 }, { x: 52, y: 50 }, { x: 55, y: 75 },
];

const AWAY_2ND_HALF = [
  { x: 5, y: 50 },
  { x: 18, y: 20 }, { x: 20, y: 40 }, { x: 20, y: 60 }, { x: 18, y: 80 },
  { x: 35, y: 30 }, { x: 38, y: 50 }, { x: 35, y: 70 },
  { x: 45, y: 25 }, { x: 48, y: 50 }, { x: 45, y: 75 },
];

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

  // 2D Tactical Radar & Ball/Player Tracking State
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [homePlayerPos, setHomePlayerPos] = useState(HOME_1ST_HALF);
  const [awayPlayerPos, setAwayPlayerPos] = useState(AWAY_1ST_HALF);
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

  // Realistic Individual Player Movement: Only carrier and pressing defender charge to ball!
  const animateIndividualPlayerMovement = (targetX: number, targetY: number, isHomePossession: boolean) => {
    const currentHomeBase = halfTimeSwapped ? HOME_2ND_HALF : HOME_1ST_HALF;
    const currentAwayBase = halfTimeSwapped ? AWAY_2ND_HALF : AWAY_1ST_HALF;

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
    setMatchStatus('NOT_STARTED');
    setWinnerMessage('');
    setEventsHistory([]);
    setGoalscorers({ home: [], away: [] });
    setBallPos({ x: 50, y: 50 });
    setHomePlayerPos(HOME_1ST_HALF);
    setAwayPlayerPos(AWAY_1ST_HALF);
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
      setHomePlayerPos(HOME_2ND_HALF);
      setAwayPlayerPos(AWAY_2ND_HALF);
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
      const targetY = Math.floor(Math.random() * 20) + 40;
      setBallPos({ x: targetGoalX, y: targetY });
      animateIndividualPlayerMovement(targetGoalX, targetY, isHomeEvent);
      setBallActionText(`⚽ GOAL! ${randomPlayer} scores for ${activeTeam.name}!`);
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
        setHomePlayerPos(halfTimeSwapped ? HOME_2ND_HALF : HOME_1ST_HALF);
        setAwayPlayerPos(halfTimeSwapped ? AWAY_2ND_HALF : AWAY_1ST_HALF);
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
    // 7. NORMAL BUILD-UP & PASSING
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
      handleMatchTimeEnd();
    }
  };

  const handleMatchTimeEnd = () => {
    if (minute >= 90 && minute < 120 && homeScore === awayScore && !isExtraTime) {
      setIsExtraTime(true);
      setMaxMinute(120);
      soundFx.playCard();
      setEventsHistory(prev => [
        {
          minute: 90,
          teamName: 'EXTRA TIME',
          teamFlag: '',
          text: `⏱️ 90' FULL TIME TIED (${homeScore} - ${awayScore})! Match goes to EXTRA TIME (30 Mins)!`,
          type: 'INFO'
        },
        ...prev
      ]);
    } else if (minute >= 120 && homeScore === awayScore && !penaltyResult) {
      runPenaltyShootout();
    } else {
      finishMatch();
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

            {/* Team Pickers */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Home Team</label>
                <select
                  value={homeTeam.id}
                  onChange={(e) => {
                    const c = allCountries.find(x => x.id === e.target.value);
                    if (c) setHomeTeam(c);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none"
                >
                  {allCountries.map(c => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Away Team</label>
                <select
                  value={awayTeam.id}
                  onChange={(e) => {
                    const c = allCountries.find(x => x.id === e.target.value);
                    if (c) setAwayTeam(c);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none"
                >
                  {allCountries.map(c => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
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

                {/* Match Statistics Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2 text-slate-300 font-bold text-xs uppercase">
                    <BarChart2 className="w-4 h-4 text-emerald-400" />
                    <span>Official Match Statistics</span>
                  </div>
                  <span className="text-[10px] text-slate-500">FULL-TIME STATS</span>
                </div>

                {/* Broadcast Stat Bars */}
                <div className="space-y-3">
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
