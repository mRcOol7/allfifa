import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Tournament } from '../types/simulator';
import { Trophy, Award, Medal, Sparkles, Flame, ShieldAlert, Zap, Repeat } from 'lucide-react';

interface TrophyCeremonyProps {
  tournament: Tournament;
  onNewTournament?: () => void;
}

export const TrophyCeremony: React.FC<TrophyCeremonyProps> = ({ tournament, onNewTournament }) => {
  const champion = tournament.champion;
  const runnerUp = tournament.runnerUp;
  const awards = tournament.awards;

  useEffect(() => {
    // Fire confetti cannon!
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  if (!champion) return null;

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Hero Champion Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-500/50 p-8 shadow-2xl text-center">
        {/* Glow ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>WORLD CUP CHAMPION 2026</span>
          </div>

          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-slate-900 border-2 border-amber-400 p-4 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
              <img src={champion.crestUrl || champion.flagSvg} alt={champion.name} className="w-full h-full object-contain" />
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-black text-lg">
              👑
            </div>
          </div>

          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              {champion.name}
            </h1>
            <p className="text-sm font-semibold text-slate-400 mt-1">
              Official World Cup Winner • {tournament.totalTeams} Nations Tournament
            </p>
          </div>

          {/* Trophy & Runner Up Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <div className="flex items-center space-x-3 bg-slate-900/80 px-5 py-2.5 rounded-2xl border border-amber-500/30">
              <Trophy className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block font-bold">CHAMPION</span>
                <span className="text-sm font-bold text-white">{champion.name}</span>
              </div>
            </div>

            {runnerUp && (
              <div className="flex items-center space-x-3 bg-slate-900/80 px-5 py-2.5 rounded-2xl border border-slate-800">
                <Medal className="w-6 h-6 text-slate-300" />
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-bold">RUNNER-UP</span>
                  <span className="text-sm font-bold text-slate-200">{runnerUp.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tournament Awards Grid */}
      {awards && (
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Official Tournament Awards</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Golden Boot */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs font-black uppercase">GOLDEN BOOT ⚽</span>
                <Trophy className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-white">{awards.goldenBoot.player}</p>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <img src={awards.goldenBoot.team.flagSvg} alt="" className="w-4 h-3 object-cover rounded" />
                <span>{awards.goldenBoot.team.name} • {awards.goldenBoot.goals} Goals</span>
              </div>
            </div>

            {/* Golden Glove */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-teal-400">
                <span className="text-xs font-black uppercase">GOLDEN GLOVE 🧤</span>
                <Award className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-white">{awards.goldenGlove.player}</p>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <img src={awards.goldenGlove.team.flagSvg} alt="" className="w-4 h-3 object-cover rounded" />
                <span>{awards.goldenGlove.team.name} • {awards.goldenGlove.saves} Saves</span>
              </div>
            </div>

            {/* Biggest Upset */}
            {awards.biggestUpset && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-purple-400">
                  <span className="text-xs font-black uppercase">BIGGEST UPSET ⚡</span>
                  <Flame className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-white">{awards.biggestUpset.underdog.name} shock {awards.biggestUpset.favorite.name}</p>
                <span className="text-xs text-slate-400 block">+{awards.biggestUpset.ratingDifference} Rating Difference Upset</span>
              </div>
            )}

            {/* Fastest Goal */}
            {awards.fastestGoal && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-cyan-400">
                  <span className="text-xs font-black uppercase">FASTEST GOAL ⚡</span>
                  <Zap className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-white">{awards.fastestGoal.player}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <img src={awards.fastestGoal.team.flagSvg} alt="" className="w-4 h-3 object-cover rounded" />
                  <span>{awards.fastestGoal.team.name} • {awards.fastestGoal.minute}' Minute</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Restart / Play Again Button */}
      {onNewTournament && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onNewTournament}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-sm uppercase tracking-wider flex items-center space-x-2 shadow-xl shadow-emerald-500/20 transition-all"
          >
            <Repeat className="w-5 h-5" />
            <span>Create New World Cup Tournament</span>
          </button>
        </div>
      )}

    </div>
  );
};
