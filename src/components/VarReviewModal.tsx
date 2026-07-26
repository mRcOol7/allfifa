import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tv, ShieldAlert, CheckCircle, XCircle, Sparkles, Activity } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export interface VarReviewData {
  playerName: string;
  teamName: string;
  reviewType: 'OFFSIDE' | 'GOAL_LINE' | 'PENALTY' | 'RED_CARD';
  originalDecision: 'GOAL' | 'NO_GOAL' | 'FOUL';
  finalDecision: 'GOAL_CONFIRMED' | 'GOAL_CANCELLED' | 'PENALTY_GIVEN' | 'RED_CARD_GIVEN';
  offsideMarginCm?: number;
  ballCrossedPercent?: number;
}

interface VarReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewData: VarReviewData | null;
}

export const VarReviewModal: React.FC<VarReviewModalProps> = ({ isOpen, onClose, reviewData }) => {
  const [step, setStep] = useState<'SCANNING' | 'LINE_GRAPHIC' | 'DECISION'>('SCANNING');

  useEffect(() => {
    if (isOpen && reviewData) {
      setStep('SCANNING');
      soundFx.playCard();

      const t1 = setTimeout(() => {
        setStep('LINE_GRAPHIC');
      }, 2200);

      const t2 = setTimeout(() => {
        setStep('DECISION');
        if (reviewData.finalDecision === 'GOAL_CONFIRMED' || reviewData.finalDecision === 'PENALTY_GIVEN') {
          soundFx.playGoal();
        } else {
          soundFx.playCard();
        }
      }, 4400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen, reviewData]);

  if (!isOpen || !reviewData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/90 backdrop-blur-md font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-lg bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-5 shadow-2xl text-slate-100 flex flex-col overflow-hidden"
        >
          {/* TV Broadcast Header Banner */}
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                <Tv className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-emerald-300 tracking-wider flex items-center space-x-2">
                  <span>VAR VIDEO ASSISTANT REFEREE 📺</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                  FIFA REPLAY CENTRE • {reviewData.reviewType} REVIEW
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

          {/* Replay Visualizer Box */}
          <div className="py-4 space-y-4">
            
            {/* Step 1: Scanning Replay Camera */}
            {step === 'SCANNING' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>SYNCHRONIZING HAWK-EYE 3D PITCH CAMERAS...</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">FRAME: 1080p 120fps</span>
                </div>

                <div className="relative w-full h-32 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/20 to-emerald-500/10 animate-pulse" />
                  
                  {/* Laser Scan Grid Line */}
                  <motion.div
                    animate={{ y: [-50, 50, -50] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="w-full h-0.5 bg-emerald-400 shadow-emerald-400 shadow-lg z-10"
                  />

                  <div className="z-20 text-xs font-bold text-slate-200 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                    Checking {reviewData.playerName} ({reviewData.teamName})
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-mono animate-pulse">
                  Checking potential {reviewData.reviewType.replace('_', ' ')} incident...
                </p>
              </motion.div>
            )}

            {/* Step 2: 3D Offside Line Grid or Goal-Line Sensor */}
            {step === 'LINE_GRAPHIC' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 text-center space-y-3"
              >
                <div className="text-xs font-bold text-cyan-400 flex items-center justify-between">
                  <span>
                    {reviewData.reviewType === 'OFFSIDE'
                      ? '3D SEMI-AUTOMATED OFFSIDE LINE GRID'
                      : reviewData.reviewType === 'GOAL_LINE'
                      ? '4K GOAL-LINE SENSOR TECH'
                      : 'FOUL IMPACT SENSOR REPLAY'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">VIRTUAL CAM 3D</span>
                </div>

                {/* 3D Pitch Lines Render */}
                <div className="relative w-full h-36 bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center p-3">
                  
                  {/* Grass Pitch Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#052e16_50%,#064e3b_50%)] opacity-30 bg-[length:40px_100%]" />

                  {/* Goal Line Frame */}
                  <div className="relative w-44 h-24 border-2 border-white/40 rounded-sm flex items-center justify-center">
                    
                    {/* Defensive Line (Red Line) */}
                    <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-rose-500 shadow-rose-500 shadow-md">
                      <span className="absolute -top-4 -left-3 text-[9px] bg-rose-950 text-rose-300 font-bold px-1 rounded">DEFENDER</span>
                    </div>

                    {/* Attacker Line (Blue Line) */}
                    <div className={`absolute ${reviewData.finalDecision === 'GOAL_CANCELLED' ? 'left-1/4' : 'left-2/5'} top-0 bottom-0 w-1 bg-cyan-400 shadow-cyan-400 shadow-md`}>
                      <span className="absolute -bottom-4 -left-3 text-[9px] bg-cyan-950 text-cyan-300 font-bold px-1 rounded">ATTACKER</span>
                    </div>

                    {/* Football ⚽ */}
                    <div className="w-5 h-5 rounded-full bg-white text-slate-950 font-bold flex items-center justify-center text-[10px] shadow-lg z-20">
                      ⚽
                    </div>
                  </div>
                </div>

                {/* Offside / Sensor Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block uppercase">Incident</span>
                    <span className="text-emerald-400">{reviewData.reviewType}</span>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block uppercase">Margin / Reading</span>
                    <span className={reviewData.finalDecision === 'GOAL_CANCELLED' ? 'text-rose-400 font-extrabold' : 'text-emerald-400 font-extrabold'}>
                      {reviewData.reviewType === 'OFFSIDE'
                        ? reviewData.finalDecision === 'GOAL_CANCELLED' ? 'OFFSIDE (+3.2cm)' : 'ON-SIDE (0.0cm)'
                        : reviewData.reviewType === 'GOAL_LINE' ? '100% OVER LINE' : 'CLEAN PLAY'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Final VAR Screen Decision */}
            {step === 'DECISION' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-5 rounded-2xl border-2 text-center space-y-3 shadow-2xl ${
                  reviewData.finalDecision === 'GOAL_CONFIRMED' || reviewData.finalDecision === 'PENALTY_GIVEN'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500 text-rose-300'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  VAR REFEREE FINAL DECISION
                </div>

                <div className="font-mono font-black text-2xl tracking-wider flex items-center justify-center space-x-2">
                  {reviewData.finalDecision === 'GOAL_CONFIRMED' ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-emerald-400 animate-bounce" />
                      <span className="text-emerald-400">GOAL CONFIRMED! ⚽</span>
                    </>
                  ) : reviewData.finalDecision === 'GOAL_CANCELLED' ? (
                    <>
                      <XCircle className="w-8 h-8 text-rose-500 animate-bounce" />
                      <span className="text-rose-500">NO GOAL (OFFSIDE)! ❌</span>
                    </>
                  ) : reviewData.finalDecision === 'PENALTY_GIVEN' ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-amber-400 animate-bounce" />
                      <span className="text-amber-400">PENALTY AWARDED! 🎯</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-8 h-8 text-rose-500 animate-bounce" />
                      <span className="text-rose-500">RED CARD GIVEN! 🟥</span>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-300 font-mono">
                  {reviewData.finalDecision === 'GOAL_CONFIRMED'
                    ? `Goal Stands for ${reviewData.teamName}! ${reviewData.playerName} is ON-SIDE!`
                    : reviewData.finalDecision === 'GOAL_CANCELLED'
                    ? `Goal Overturned! ${reviewData.playerName} was caught OFFSIDE!`
                    : reviewData.finalDecision === 'PENALTY_GIVEN'
                    ? `Penalty spot kick awarded for ${reviewData.teamName}!`
                    : `Serious foul play confirmed against ${reviewData.playerName}! Red card issued!`}
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition shadow-lg"
                >
                  Resume Live Match ⚽
                </button>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
