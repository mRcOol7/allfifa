import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Shield, Play, RotateCcw, Zap, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { Country } from '../types/simulator';
import { FootballPlayerProfile } from '../engine/playerNames';
import { soundFx } from '../utils/soundFx';

interface PenaltyShot {
  shooterName: string;
  teamName: string;
  teamFlag: string;
  direction: 'TOP_LEFT' | 'TOP_CENTER' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';
  isGoal: boolean;
}

interface PenaltyShootoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeTeam: Country;
  awayTeam: Country;
  homeSquad: FootballPlayerProfile[];
  awaySquad: FootballPlayerProfile[];
  onShootoutComplete: (winnerTeam: Country, homePenaltyScore: number, awayPenaltyScore: number) => void;
}

export const PenaltyShootoutModal: React.FC<PenaltyShootoutModalProps> = ({
  isOpen,
  onClose,
  homeTeam,
  awayTeam,
  homeSquad,
  awaySquad,
  onShootoutComplete
}) => {
  const [currentTurn, setCurrentTurn] = useState<'HOME' | 'AWAY'>('HOME');
  const [round, setRound] = useState(1); // 1 to 5+
  const [homeShots, setHomeShots] = useState<PenaltyShot[]>([]);
  const [awayShots, setAwayShots] = useState<PenaltyShot[]>([]);
  
  const [ballPos, setBallPos] = useState({ x: 50, y: 75 });
  const [gkPos, setGkPos] = useState({ x: 50, y: 30 });
  const [shotResultText, setShotResultText] = useState<string | null>(null);
  const [isShooting, setIsShooting] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentTurn('HOME');
      setRound(1);
      setHomeShots([]);
      setAwayShots([]);
      setWinnerMessage(null);
      setShotResultText('Click a Direction or Take Shot to take Penalty!');
      setBallPos({ x: 50, y: 75 });
      setGkPos({ x: 50, y: 30 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const homeScore = homeShots.filter(s => s.isGoal).length;
  const awayScore = awayShots.filter(s => s.isGoal).length;

  const activeTeam = currentTurn === 'HOME' ? homeTeam : awayTeam;
  const activeSquad = currentTurn === 'HOME' ? homeSquad : awaySquad;
  const currentShooterIndex = (round - 1) % activeSquad.length;
  const shooterName = activeSquad[currentShooterIndex]?.name || `Penalty Taker ${round}`;

  const takePenaltyShot = (selectedDirection?: 'TOP_LEFT' | 'TOP_CENTER' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT') => {
    if (isShooting || winnerMessage) return;

    setIsShooting(true);

    const directions: Array<'TOP_LEFT' | 'TOP_CENTER' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'> = [
      'TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'
    ];
    const chosenDirection = selectedDirection || directions[Math.floor(Math.random() * directions.length)];

    // Target coordinates
    let targetX = 50;
    let targetY = 30;
    if (chosenDirection === 'TOP_LEFT') { targetX = 22; targetY = 22; }
    else if (chosenDirection === 'TOP_CENTER') { targetX = 50; targetY = 20; }
    else if (chosenDirection === 'TOP_RIGHT') { targetX = 78; targetY = 22; }
    else if (chosenDirection === 'BOTTOM_LEFT') { targetX = 24; targetY = 38; }
    else if (chosenDirection === 'BOTTOM_RIGHT') { targetX = 76; targetY = 38; }

    // Goalkeeper dive direction
    const gkDiveDirection = directions[Math.floor(Math.random() * directions.length)];
    let gkTargetX = 50;
    let gkTargetY = 30;
    if (gkDiveDirection === 'TOP_LEFT') { gkTargetX = 25; gkTargetY = 24; }
    else if (gkDiveDirection === 'TOP_CENTER') { gkTargetX = 50; gkTargetY = 22; }
    else if (gkDiveDirection === 'TOP_RIGHT') { gkTargetX = 75; gkTargetY = 24; }
    else if (gkDiveDirection === 'BOTTOM_LEFT') { gkTargetX = 28; gkTargetY = 36; }
    else if (gkDiveDirection === 'BOTTOM_RIGHT') { gkTargetX = 72; gkTargetY = 36; }

    // 72% chance of Goal if dive wrong, 25% if dive right
    const isGoal = chosenDirection !== gkDiveDirection ? Math.random() < 0.85 : Math.random() < 0.25;

    // Animate Ball & Keeper Dive
    setGkPos({ x: gkTargetX, y: gkTargetY });
    setBallPos({ x: targetX, y: targetY });

    setTimeout(() => {
      if (isGoal) {
        soundFx.playGoal();
        setShotResultText(`⚽ GOAL! Unstoppable penalty by ${shooterName}!`);
      } else {
        soundFx.playCard();
        setShotResultText(`❌ SAVED / MISSED! Incredible dive by the goalkeeper!`);
      }

      const shotRecord: PenaltyShot = {
        shooterName,
        teamName: activeTeam.name,
        teamFlag: activeTeam.flagUrl,
        direction: chosenDirection,
        isGoal
      };

      let newHomeShots = homeShots;
      let newAwayShots = awayShots;

      if (currentTurn === 'HOME') {
        newHomeShots = [...homeShots, shotRecord];
        setHomeShots(newHomeShots);
        setCurrentTurn('AWAY');
      } else {
        newAwayShots = [...awayShots, shotRecord];
        setAwayShots(newAwayShots);
        setCurrentTurn('HOME');
        setRound(prev => prev + 1);
      }

      // Reset Ball after 1.4s
      setTimeout(() => {
        setBallPos({ x: 50, y: 75 });
        setGkPos({ x: 50, y: 30 });
        setIsShooting(false);

        // Check Winner after Round 5 or Sudden Death
        const hGoals = newHomeShots.filter(s => s.isGoal).length;
        const aGoals = newAwayShots.filter(s => s.isGoal).length;
        const hTaken = newHomeShots.length;
        const aTaken = newAwayShots.length;

        // Early win condition within 5 rounds
        if (hTaken <= 5 && aTaken <= 5) {
          const hRem = 5 - hTaken;
          const aRem = 5 - aTaken;

          if (hGoals > aGoals + aRem) {
            declareWinner(homeTeam, hGoals, aGoals);
            return;
          }
          if (aGoals > hGoals + hRem) {
            declareWinner(awayTeam, hGoals, aGoals);
            return;
          }
        }

        // Sudden death win condition after equal shots taken >= 5
        if (hTaken >= 5 && aTaken >= 5 && hTaken === aTaken) {
          if (hGoals > aGoals) {
            declareWinner(homeTeam, hGoals, aGoals);
            return;
          } else if (aGoals > hGoals) {
            declareWinner(awayTeam, hGoals, aGoals);
            return;
          }
        }
      }, 1400);

    }, 500);
  };

  const declareWinner = (winner: Country, hGoals: number, aGoals: number) => {
    soundFx.playFanfare();
    const msg = `🏆 ${winner.name} WON THE PENALTY SHOOTOUT (${hGoals} - ${aGoals})! 🎉`;
    setWinnerMessage(msg);
    onShootoutComplete(winner, hGoals, aGoals);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-xl bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-5 shadow-2xl text-slate-100 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-wider">
                  SUDDEN DEATH PENALTY SHOOTOUT ⚽
                </h3>
                <p className="text-[10px] text-slate-400">
                  {homeTeam.name} vs {awayTeam.name} • Round {round}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 space-y-4">
            
            {/* Scoreboard Ticker */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              
              {/* Home Team Penalty Tracker */}
              <div className={`p-2 rounded-xl border ${currentTurn === 'HOME' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center justify-center space-x-1.5 mb-1 text-xs font-bold">
                  <img src={homeTeam.flagUrl} alt="" className="w-4 h-3 rounded object-cover" />
                  <span className="truncate">{homeTeam.name}</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {homeScore}
                </div>
                {/* Penalty Dots */}
                <div className="flex justify-center space-x-1 mt-1.5">
                  {Array.from({ length: Math.max(5, homeShots.length) }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        homeShots[i]?.isGoal
                          ? 'bg-emerald-500 text-slate-950'
                          : homeShots[i]
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {homeShots[i]?.isGoal ? '✓' : homeShots[i] ? '✕' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Away Team Penalty Tracker */}
              <div className={`p-2 rounded-xl border ${currentTurn === 'AWAY' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center justify-center space-x-1.5 mb-1 text-xs font-bold">
                  <img src={awayTeam.flagUrl} alt="" className="w-4 h-3 rounded object-cover" />
                  <span className="truncate">{awayTeam.name}</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {awayScore}
                </div>
                {/* Penalty Dots */}
                <div className="flex justify-center space-x-1 mt-1.5">
                  {Array.from({ length: Math.max(5, awayShots.length) }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        awayShots[i]?.isGoal
                          ? 'bg-emerald-500 text-slate-950'
                          : awayShots[i]
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {awayShots[i]?.isGoal ? '✓' : awayShots[i] ? '✕' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Winner Announcement */}
            {winnerMessage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-2 border-amber-400 p-4 rounded-2xl text-center space-y-3"
              >
                <div className="text-base font-extrabold text-amber-300">
                  {winnerMessage}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-lg"
                >
                  Return to Tournament 🏆
                </button>
              </motion.div>
            ) : (
              <>
                {/* Penalty Goal Stadium Visualizer */}
                <div className="relative w-full h-44 bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                  
                  {/* Goal Frame Box */}
                  <div className="relative w-64 h-28 border-4 border-white rounded-t-lg bg-emerald-900/30 flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px] opacity-20" />
                    
                    {/* Goalkeeper 🧤 */}
                    <motion.div
                      animate={{ left: `${gkPos.x}%`, top: `${gkPos.y}%` }}
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center text-xs shadow-xl z-20"
                    >
                      🧤
                    </motion.div>
                  </div>

                  {/* Penalty Spot Football ⚽ */}
                  <motion.div
                    animate={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center text-xs shadow-2xl z-30"
                  >
                    ⚽
                  </motion.div>

                  {/* Active Penalty Taker Banner */}
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 p-1.5 rounded-lg border border-slate-800 text-center text-xs font-bold text-slate-200">
                    Next Penalty: <span className="text-amber-400">{shooterName}</span> ({activeTeam.name})
                  </div>
                </div>

                {/* Shot Direction Picker Controls */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                    SELECT SHOT PLACEMENT DIRECTION:
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={isShooting}
                      onClick={() => takePenaltyShot('TOP_LEFT')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 disabled:opacity-50 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition"
                    >
                       Top Left ↖️
                    </button>
                    <button
                      type="button"
                      disabled={isShooting}
                      onClick={() => takePenaltyShot('TOP_CENTER')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 disabled:opacity-50 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition"
                    >
                       Top Center ⬆️
                    </button>
                    <button
                      type="button"
                      disabled={isShooting}
                      onClick={() => takePenaltyShot('TOP_RIGHT')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 disabled:opacity-50 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition"
                    >
                       Top Right ↗️
                    </button>

                    <button
                      type="button"
                      disabled={isShooting}
                      onClick={() => takePenaltyShot('BOTTOM_LEFT')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 disabled:opacity-50 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition"
                    >
                       Bottom Left ↙️
                    </button>
                    <button
                      type="button"
                      disabled={isShooting}
                      onClick={() => takePenaltyShot()}
                      className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-105 transition"
                    >
                      🎲 Random Shot ⚽
                    </button>
                    <button
                      type="button"
                      disabled={isShooting}
                      onClick={() => takePenaltyShot('BOTTOM_RIGHT')}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 disabled:opacity-50 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition"
                    >
                       Bottom Right ↘️
                    </button>
                  </div>
                </div>

                {/* Outcome Action Text */}
                {shotResultText && (
                  <div className="text-center text-xs font-bold text-emerald-300 bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono">
                    {shotResultText}
                  </div>
                )}
              </>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
