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
  minute?: number;
  minuteDisplay?: string;
  goalType?: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  minuteDisplay: string;
  type: 'GOAL' | 'PENALTY_GOAL' | 'YELLOW_CARD' | 'RED_CARD';
  teamId: string;
  teamName: string;
  player: string;
  detail?: string;
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  cornersHome: number;
  cornersAway: number;
  foulsHome: number;
  foulsAway: number;
  yellowCardsHome: number;
  yellowCardsAway: number;
  redCardsHome: number;
  redCardsAway: number;
  passAccuracyHome: number;
  passAccuracyAway: number;
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
  stadium?: string;
  referee?: string;
  events?: MatchEvent[];
  stats?: MatchStats;
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
  topScorersList?: Array<{
    player: string;
    team: Country;
    goals: number;
  }>;
  mostCleanSheets?: {
    team: Country;
    cleanSheets: number;
  };
  topCleanSheetsList?: Array<{
    team: Country;
    cleanSheets: number;
  }>;
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

export interface SavedTournament {
  id: string;
  name: string;
  bracketSize: number | string;
  champion: Country;
  runnerUp?: Country;
  topScorerPlayer?: string;
  topScorerGoals?: number;
  topScorerTeamName?: string;
  totalGoals: number;
  totalMatches: number;
  createdAt: string;
}
