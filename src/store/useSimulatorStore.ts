import { create } from 'zustand';
import { Country, Tournament, TournamentBracketSize } from '../types/simulator';
import { fetchRestCountriesV5 } from '../services/restCountriesApi';
import { startNewTournament, advanceRound } from '../engine/tournamentEngine';

interface SimulatorState {
  allCountries: Country[];
  sovereignCountries: Country[];
  isLoadingCountries: boolean;
  currentTournament: Tournament | null;
  bracketSize: TournamentBracketSize;
  isDirectoryOpen: boolean;

  // Actions
  loadCountries: () => Promise<void>;
  setBracketSize: (size: TournamentBracketSize) => void;
  startTournament: () => void;
  nextRound: () => void;
  resetTournament: () => void;
  toggleDirectory: (open?: boolean) => void;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  allCountries: [],
  sovereignCountries: [],
  isLoadingCountries: false,
  currentTournament: null,
  bracketSize: 256, // Full 256 teams playing from Round 1
  isDirectoryOpen: false,

  loadCountries: async () => {
    set({ isLoadingCountries: true });
    try {
      const { allCountries, sovereignCountries } = await fetchRestCountriesV5();
      set({
        allCountries,
        sovereignCountries,
        isLoadingCountries: false
      });
    } catch (e) {
      console.error('Error loading countries in store:', e);
      set({ isLoadingCountries: false });
    }
  },

  setBracketSize: (bracketSize) => set({ bracketSize }),

  startTournament: () => {
    const { sovereignCountries, allCountries, bracketSize } = get();
    if (sovereignCountries.length === 0 && allCountries.length === 0) return;
    const tourney = startNewTournament(sovereignCountries, allCountries, bracketSize);
    set({ currentTournament: tourney });
  },

  nextRound: () => {
    const { currentTournament } = get();
    if (!currentTournament || currentTournament.status === 'COMPLETED') return;
    const updated = advanceRound(currentTournament);
    set({ currentTournament: updated });
  },

  resetTournament: () => {
    set({ currentTournament: null });
  },

  toggleDirectory: (open) => {
    set((state) => ({
      isDirectoryOpen: open !== undefined ? open : !state.isDirectoryOpen
    }));
  }
}));
