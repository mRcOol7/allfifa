import React from 'react';
import { useSimulatorStore } from '../store/useSimulatorStore';
import { History, Trophy, Trash2, Download } from 'lucide-react';
import { Tournament } from '../types/simulator';

export const HistoryView: React.FC = () => {
  const { tournamentHistory, clearHistory } = useSimulatorStore();

  const handleExportJSON = (tourney: Tournament) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tourney, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `world_cup_${tourney.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <History className="w-3.5 h-3.5" />
              <span>Tournament Archives & Records</span>
            </div>
            <h1 className="text-3xl font-black text-white">Tournament History & Hall of Fame</h1>
            <p className="text-xs text-slate-400">Review past tournament champions, full award lists, and export tournament logs.</p>
          </div>

          {tournamentHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      {tournamentHistory.length === 0 ? (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 space-y-3">
          <Trophy className="w-12 h-12 text-slate-700 mx-auto" />
          <p className="text-sm font-semibold">No completed tournaments recorded yet.</p>
          <p className="text-xs">Launch and complete a World Cup tournament to record it in your Hall of Fame!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tournamentHistory.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-6"
            >
              <div className="flex items-center space-x-4">
                {t.champion && (
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 p-2 flex-shrink-0">
                    <img src={t.champion.crestUrl || t.champion.flagSvg} alt="" className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                      {t.totalTeams} TEAMS
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Winner: <strong className="text-amber-400">{t.champion?.name}</strong> • Runner-up: {t.runnerUp?.name}
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                    Completed: {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Export Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExportJSON(t)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 flex items-center space-x-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
