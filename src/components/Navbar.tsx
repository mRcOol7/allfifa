import React from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { Trophy, Swords, Sliders, History, Play, Pause, Zap, Volume2, VolumeX, Sparkles, FastForward } from 'lucide-react';
import { SimSpeed } from '../types/simulator';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setTab,
    simSpeed,
    setSimSpeed,
    isMuted,
    toggleMute,
    isAutoPlay,
    toggleAutoPlay,
    currentTournament,
    stepActiveMatchMinute,
    activeMatchForBroadcast
  } = useSimulatorStore();

  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isPlaying && activeMatchForBroadcast && activeMatchForBroadcast.status !== 'COMPLETED') {
      const delay = simSpeed === 999 ? 10 : Math.max(50, 1000 / simSpeed);
      interval = setInterval(() => {
        stepActiveMatchMinute();
      }, delay);
    } else if (activeMatchForBroadcast?.status === 'COMPLETED') {
      setIsPlaying(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeMatchForBroadcast, simSpeed, stepActiveMatchMinute]);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setTab('TOURNAMENT')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-[2px] shadow-lg shadow-emerald-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-400">
                  WORLD CUP <span className="text-amber-400">SIMULATOR</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full uppercase tracking-wider">
                  195+ Nations
                </span>
              </div>
              <p className="text-xs text-slate-400">Official FIFA & Rest Countries Broadcast Engine</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setTab('TOURNAMENT')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'TOURNAMENT'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Tournament</span>
            </button>

            <button
              onClick={() => setTab('SINGLE_MATCH')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'SINGLE_MATCH'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>Single Match</span>
            </button>

            <button
              onClick={() => setTab('COUNTRY_EDITOR')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'COUNTRY_EDITOR'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>AI Strength Editor</span>
            </button>

            <button
              onClick={() => setTab('HISTORY_AWARDS')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'HISTORY_AWARDS'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History & Awards</span>
            </button>
          </nav>

          {/* Right Sim Speed Controls */}
          <div className="flex items-center space-x-3">

            {/* Play / Pause Toggle for Live Match */}
            {activeMatchForBroadcast && activeMatchForBroadcast.status !== 'COMPLETED' && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play Sim'}</span>
              </button>
            )}

            {/* Sim Speed Dropdown */}
            <div className="flex items-center bg-slate-900/90 rounded-xl border border-slate-800 p-1">
              {([0.5, 1, 2, 5, 999] as SimSpeed[]).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSimSpeed(spd)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    simSpeed === spd
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={spd === 999 ? 'Instant Sim' : `${spd}x Speed`}
                >
                  {spd === 999 ? <FastForward className="w-3.5 h-3.5" /> : `${spd}x`}
                </button>
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              className={`p-2.5 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-slate-900 border-red-500/30 text-red-400'
                  : 'bg-slate-900 border-slate-800 text-emerald-400 hover:border-emerald-500/40'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
