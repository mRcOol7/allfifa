import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star, Shield, Zap, Award, Flame, Sparkles } from 'lucide-react';
import { FootballPlayerProfile } from '../engine/playerNames';
import { soundFx } from '../utils/soundFx';

interface FutPlayerCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: FootballPlayerProfile | null;
  teamName: string;
  teamFlag: string;
  goalsScored?: number;
}

export const FutPlayerCardModal: React.FC<FutPlayerCardModalProps> = ({
  isOpen,
  onClose,
  player,
  teamName,
  teamFlag,
  goalsScored = 0
}) => {
  if (!isOpen || !player) return null;

  // Generate realistic FUT ratings based on position
  const rating = player.ovr || 88 + Math.floor(Math.random() * 9); // 88 - 96
  const pac = Math.min(99, Math.max(70, rating + (player.position === 'ST' ? 4 : -2) + Math.floor(Math.random() * 6 - 3)));
  const sho = Math.min(99, Math.max(65, rating + (player.position === 'ST' ? 5 : -10) + Math.floor(Math.random() * 6 - 3)));
  const pas = Math.min(99, Math.max(68, rating + (player.position === 'MID' ? 5 : -4) + Math.floor(Math.random() * 6 - 3)));
  const dri = Math.min(99, Math.max(70, rating + (player.position === 'ST' || player.position === 'MID' ? 4 : -6) + Math.floor(Math.random() * 6 - 3)));
  const def = Math.min(99, Math.max(45, rating + (player.position === 'DEF' ? 8 : -25) + Math.floor(Math.random() * 6 - 3)));
  const phy = Math.min(99, Math.max(65, rating + (player.position === 'DEF' ? 5 : -2) + Math.floor(Math.random() * 6 - 3)));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateY: -15 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-3xl p-5 shadow-2xl text-slate-100 flex flex-col items-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700 z-30"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Title */}
          <div className="text-center space-y-1 mb-4 z-20">
            <div className="flex items-center justify-center space-x-1.5 text-xs font-extrabold text-amber-400 tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>EA FC ULTIMATE TEAM PLAYER CARD</span>
            </div>
            <p className="text-[10px] text-slate-400">Official Tournament Player Performance Roster</p>
          </div>

          {/* FIFA Ultimate Team Gold Icon Card Frame */}
          <div className="relative w-64 h-96 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-1 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.5)] border-2 border-amber-200 flex flex-col overflow-hidden">
            
            {/* Inner Card Background */}
            <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-[22px] p-3 flex flex-col justify-between relative overflow-hidden border border-amber-400/30">
              
              {/* Card Holographic Glow Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />

              {/* Top Left: Rating & Position & Flag */}
              <div className="flex justify-between items-start z-10">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-amber-400 tracking-tighter leading-none drop-shadow">
                    {rating}
                  </span>
                  <span className="text-xs font-extrabold text-amber-200 tracking-widest mt-0.5">
                    {player.position}
                  </span>
                  {teamFlag && (
                    <img src={teamFlag} alt="" className="w-5 h-3.5 object-cover rounded shadow mt-1 border border-slate-700" />
                  )}
                </div>

                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/50 flex items-center justify-center text-amber-400 text-lg shadow">
                  🏆
                </div>
              </div>

              {/* Center Player Silhouette / Avatar */}
              <div className="relative w-full h-32 flex items-center justify-center my-1 z-10">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/30 to-amber-300/20 border-2 border-amber-400/60 flex items-center justify-center text-4xl shadow-xl">
                  👤
                </div>

                {goalsScored > 0 && (
                  <div className="absolute bottom-0 right-8 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 shadow">
                    ⚽ {goalsScored} Goal{goalsScored > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Player Name Banner */}
              <div className="text-center z-10 border-t border-b border-amber-400/40 py-1 bg-amber-500/10 rounded-lg">
                <h3 className="text-sm font-black text-white tracking-wide truncate">
                  {player.name.toUpperCase()}
                </h3>
                <p className="text-[9px] text-amber-300/80 font-mono font-bold truncate">
                  {teamName}
                </p>
              </div>

              {/* Bottom: 6 FIFA Attribute Badges Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-mono font-black z-10 pt-1">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">{pac}</span>
                  <span className="text-[10px] text-slate-400 font-bold">PAC</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">{dri}</span>
                  <span className="text-[10px] text-slate-400 font-bold">DRI</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">{sho}</span>
                  <span className="text-[10px] text-slate-400 font-bold">SHO</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">{def}</span>
                  <span className="text-[10px] text-slate-400 font-bold">DEF</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">{pas}</span>
                  <span className="text-[10px] text-slate-400 font-bold">PAS</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-amber-400">{phy}</span>
                  <span className="text-[10px] text-slate-400 font-bold">PHY</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={onClose}
            className="mt-4 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition shadow-lg"
          >
            Close Inspector 🃏
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
