export interface Country {
  id: string; // alpha_3 or unique uuid
  alpha2: string; // alpha_2 e.g. "AR"
  name: string;
  officialName: string;
  flagUrl: string; // PNG or SVG flag url
  emoji: string;
  isoCode: string; // ISO 3-letter code
  fifaCode: string; // FIFA code if available, else fallback
  region: string; // Continent e.g. "Europe", "Americas", "Asia"
  subregion?: string;
  population: number;
  isSovereign: boolean;
  isUnMember?: boolean;
}

export interface MatchScorer {
  player: string;
  teamId: string;
  teamName: string;
}

export interface Match {
  id: string;
  roundName: string;
  homeTeam: Country;
  awayTeam: Country;
  homeScore: number;
  awayScore: number;
  isPenalties?: boolean;
  homePenalties?: number;
  awayPenalties?: number;
  status: 'SCHEDULED' | 'COMPLETED';
  winnerId?: string;
  isBye?: boolean;
  scorers?: MatchScorer[];
}

export interface Round {
  id: string;
  name: string;
  matches: Match[];
  isCompleted: boolean;
}

export type TournamentBracketSize = 256 | 128 | 64 | 32 | 16 | 'ALL';

export interface TournamentAwards {
  topScorer?: {
    player: string;
    team: Country;
    goals: number;
  };
  mostCleanSheets?: {
    team: Country;
    cleanSheets: number;
  };
  totalGoals: number;
  totalMatches: number;
}

export interface Tournament {
  id: string;
  name: string;
  bracketSize: TournamentBracketSize;
  totalTeams: number;
  rounds: Round[];
  currentRoundIndex: number;
  status: 'SETUP' | 'IN_PROGRESS' | 'COMPLETED';
  champion?: Country;
  runnerUp?: Country;
  awards?: TournamentAwards;
  createdAt: string;
}
