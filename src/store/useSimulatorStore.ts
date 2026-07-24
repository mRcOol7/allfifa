import { create } from 'zustand';
import { Country, Tournament, TournamentBracketSize, SavedTournament } from '../types/simulator';
import { fetchRestCountriesV5 } from '../services/restCountriesApi';
import { startNewTournament, advanceRound } from '../engine/tournamentEngine';

const STORAGE_KEY = 'world_cup_hall_of_fame';

interface SimulatorState {
  allCountries: Country[];
  sovereignCountries: Country[];
  isLoadingCountries: boolean;
  currentTournament: Tournament | null;
  bracketSize: TournamentBracketSize;
  isDirectoryOpen: boolean;
  isHallOfFameOpen: boolean;
  isH2HOpen: boolean;
  savedTournaments: SavedTournament[];

  // Actions
  loadCountries: () => Promise<void>;
  loadSavedTournaments: () => void;
  setBracketSize: (size: TournamentBracketSize) => void;
  startTournament: () => void;
  nextRound: () => void;
  resetTournament: () => void;
  toggleDirectory: (open?: boolean) => void;
  toggleHallOfFame: (open?: boolean) => void;
  toggleH2H: (open?: boolean) => void;
  clearHallOfFame: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  allCountries: [],
  sovereignCountries: [],
  isLoadingCountries: false,
  currentTournament: null,
  bracketSize: 256,
  isDirectoryOpen: false,
  isHallOfFameOpen: false,
  isH2HOpen: false,
  savedTournaments: [],

  loadCountries: async () => {
    set({ isLoadingCountries: true });
    get().loadSavedTournaments();
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

  loadSavedTournaments: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({ savedTournaments: parsed });
      }
    } catch (e) {
      console.error('Error loading hall of fame from localStorage:', e);
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
    const { currentTournament, savedTournaments } = get();
    if (!currentTournament || currentTournament.status === 'COMPLETED') return;

    const updated = advanceRound(currentTournament);
    set({ currentTournament: updated });

    // Auto-save tournament when completed
    if (updated.status === 'COMPLETED' && updated.champion) {
      const record: SavedTournament = {
        id: updated.id,
        name: updated.name,
        bracketSize: updated.bracketSize,
        champion: updated.champion,
        runnerUp: updated.runnerUp,
        topScorerPlayer: updated.awards?.topScorer?.player,
        topScorerGoals: updated.awards?.topScorer?.goals,
        topScorerTeamName: updated.awards?.topScorer?.team.name,
        totalGoals: updated.awards?.totalGoals || 0,
        totalMatches: updated.awards?.totalMatches || 0,
        createdAt: updated.createdAt
      };

      const existing = savedTournaments.filter(s => s.id !== record.id);
      const newSaved = [record, ...existing];
      set({ savedTournaments: newSaved });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSaved));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    }
  },

  resetTournament: () => {
    set({ currentTournament: null });
  },

  toggleDirectory: (open) => {
    set((state) => ({
      isDirectoryOpen: open !== undefined ? open : !state.isDirectoryOpen
    }));
  },

  toggleHallOfFame: (open) => {
    set((state) => ({
      isHallOfFameOpen: open !== undefined ? open : !state.isHallOfFameOpen
    }));
  },

  toggleH2H: (open) => {
    set((state) => ({
      isH2HOpen: open !== undefined ? open : !state.isH2HOpen
    }));
  },

  clearHallOfFame: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ savedTournaments: [] });
  }
}));
