import { Country, Match, MatchScorer, Round, Tournament, TournamentAwards, TournamentBracketSize } from '../types/simulator';
import { getRandomPlayerName } from './playerNames';

export function getRoundName(totalTeamsInRound: number, isFinal: boolean = false): string {
  if (isFinal || totalTeamsInRound === 2) return 'Final';
  if (totalTeamsInRound === 4) return 'Semi-Finals';
  if (totalTeamsInRound === 8) return 'Quarter-Finals';
  if (totalTeamsInRound === 16) return 'Round of 16';
  if (totalTeamsInRound === 32) return 'Round of 32';
  if (totalTeamsInRound === 64) return 'Round of 64';
  if (totalTeamsInRound === 128) return 'Round of 128';
  if (totalTeamsInRound === 256) return 'Round of 256';
  return `Round of ${totalTeamsInRound}`;
}

// Generate realistic football knockout match scores and goal scorers
export function simulateKnockoutMatch(home: Country, away: Country, roundName: string): Match {
  // Goal weights for international knockout matches
  const goalWeights = [0.28, 0.38, 0.20, 0.10, 0.04]; 
  const pickGoal = () => {
    const r = Math.random();
    let acc = 0;
    for (let g = 0; g < goalWeights.length; g++) {
      acc += goalWeights[g];
      if (r <= acc) return g;
    }
    return 1;
  };

  const homeScore = pickGoal();
  const awayScore = pickGoal();

  // Generate Goal Scorers
  const scorers: MatchScorer[] = [];

  for (let i = 0; i < homeScore; i++) {
    const pos = Math.random() < 0.7 ? 'strikers' : 'midfielders';
    const player = getRandomPlayerName(home.id, home.region, pos);
    scorers.push({ player, teamId: home.id, teamName: home.name });
  }

  for (let i = 0; i < awayScore; i++) {
    const pos = Math.random() < 0.7 ? 'strikers' : 'midfielders';
    const player = getRandomPlayerName(away.id, away.region, pos);
    scorers.push({ player, teamId: away.id, teamName: away.name });
  }

  let isPenalties = false;
  let homePenalties: number | undefined;
  let awayPenalties: number | undefined;
  let winnerId: string;

  if (homeScore === awayScore) {
    // Tied knockout match -> Penalty Shootout!
    isPenalties = true;
    let hPen = 3 + Math.floor(Math.random() * 3);
    let aPen = 3 + Math.floor(Math.random() * 3);
    
    if (hPen === aPen) {
      if (Math.random() > 0.5) hPen += 1;
      else aPen += 1;
    }
    
    homePenalties = hPen;
    awayPenalties = aPen;
    winnerId = hPen > aPen ? home.id : away.id;
  } else {
    winnerId = homeScore > awayScore ? home.id : away.id;
  }

  return {
    id: `match_${home.id}_vs_${away.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    roundName,
    homeTeam: home,
    awayTeam: away,
    homeScore,
    awayScore,
    isPenalties,
    homePenalties,
    awayPenalties,
    status: 'COMPLETED',
    winnerId,
    scorers
  };
}

// Calculate Top Goal Scorer and Most Clean Sheets from all completed rounds
export function calculateTournamentAwards(tournament: Tournament): TournamentAwards {
  const playerGoalsMap: Record<string, { player: string; team: Country; goals: number }> = {};
  const teamCleanSheetsMap: Record<string, { team: Country; cleanSheets: number }> = {};

  let totalGoals = 0;
  let totalMatches = 0;

  tournament.rounds.forEach(round => {
    round.matches.forEach(match => {
      if (match.status !== 'COMPLETED' || match.isBye) return;
      totalMatches += 1;
      totalGoals += match.homeScore + match.awayScore;

      // Clean Sheets check
      if (match.awayScore === 0) {
        const id = match.homeTeam.id;
        teamCleanSheetsMap[id] = teamCleanSheetsMap[id]
          ? { team: match.homeTeam, cleanSheets: teamCleanSheetsMap[id].cleanSheets + 1 }
          : { team: match.homeTeam, cleanSheets: 1 };
      }

      if (match.homeScore === 0) {
        const id = match.awayTeam.id;
        teamCleanSheetsMap[id] = teamCleanSheetsMap[id]
          ? { team: match.awayTeam, cleanSheets: teamCleanSheetsMap[id].cleanSheets + 1 }
          : { team: match.awayTeam, cleanSheets: 1 };
      }

      // Goal Scorers check
      if (match.scorers) {
        match.scorers.forEach(s => {
          const team = s.teamId === match.homeTeam.id ? match.homeTeam : match.awayTeam;
          const key = `${s.teamId}_${s.player}`;
          playerGoalsMap[key] = playerGoalsMap[key]
            ? { player: s.player, team, goals: playerGoalsMap[key].goals + 1 }
            : { player: s.player, team, goals: 1 };
        });
      }
    });
  });

  const sortedScorers = Object.values(playerGoalsMap).sort((a, b) => b.goals - a.goals);
  const topScorer = sortedScorers[0];

  const sortedCleanSheets = Object.values(teamCleanSheetsMap).sort((a, b) => b.cleanSheets - a.cleanSheets);
  const mostCleanSheets = sortedCleanSheets[0];

  return {
    topScorer,
    mostCleanSheets,
    totalGoals,
    totalMatches
  };
}

// Fallback bonus wildcards if available fetched countries are 254 (short of 256 by 2)
const BONUS_WILDCARDS: Country[] = [
  {
    id: 'WLD_1',
    alpha2: 'UN',
    name: 'Global All-Stars',
    officialName: 'REST Countries Global XI',
    flagUrl: 'https://flagcdn.com/w160/un.png',
    emoji: '🌐',
    isoCode: 'WLD',
    fifaCode: 'WLD',
    region: 'International',
    population: 8000000000,
    isSovereign: true,
    isUnMember: true
  },
  {
    id: 'WLD_2',
    alpha2: 'AQ',
    name: 'Antarctica',
    officialName: 'Antarctica Continent XI',
    flagUrl: 'https://flagcdn.com/w160/aq.png',
    emoji: '🇦🇶',
    isoCode: 'ATA',
    fifaCode: 'ATA',
    region: 'Oceania',
    population: 5000,
    isSovereign: true,
    isUnMember: false
  }
];

// Create and simulate initial round for selected teams
export function startNewTournament(
  sovereignTeams: Country[],
  allFetchedCountries: Country[],
  size: TournamentBracketSize
): Tournament {
  let pool: Country[] = [];

  if (size === 256 || size === 'ALL') {
    // Combine sovereign + dependencies/territories from allFetchedCountries to build 256 teams
    const merged = [...sovereignTeams];
    const nonSovereigns = allFetchedCountries.filter(c => !c.isSovereign);
    
    nonSovereigns.forEach(c => {
      if (merged.length < 256 && !merged.some(m => m.id === c.id)) {
        merged.push(c);
      }
    });

    // If still under 256, add bonus wildcards
    BONUS_WILDCARDS.forEach(w => {
      if (merged.length < 256 && !merged.some(m => m.id === w.id)) {
        merged.push(w);
      }
    });

    pool = merged.slice(0, 256);
  } else {
    pool = [...sovereignTeams].slice(0, size);
  }

  // Shuffle pool of 256 (or selected size)
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const numTeams = shuffled.length;
  const matches: Match[] = [];
  const r1Name = getRoundName(numTeams);

  // Pair up all teams into 128 matches (0 BYES!)
  for (let i = 0; i < numTeams; i += 2) {
    if (i + 1 < numTeams) {
      const home = shuffled[i];
      const away = shuffled[i + 1];
      const match = simulateKnockoutMatch(home, away, r1Name);
      matches.push(match);
    }
  }

  const initialRound: Round = {
    id: `round_1_${Date.now()}`,
    name: r1Name,
    matches,
    isCompleted: true
  };

  const tourney: Tournament = {
    id: `tourney_${Date.now()}`,
    name: `World Cup Knockout Championship (${numTeams} Teams)`,
    bracketSize: size,
    totalTeams: numTeams,
    rounds: [initialRound],
    currentRoundIndex: 0,
    status: 'IN_PROGRESS',
    createdAt: new Date().toISOString()
  };

  tourney.awards = calculateTournamentAwards(tourney);
  return tourney;
}

// Advance to next round and simulate all matches simultaneously
export function advanceRound(tournament: Tournament): Tournament {
  const updated: Tournament = JSON.parse(JSON.stringify(tournament));
  const currentRound = updated.rounds[updated.currentRoundIndex];

  // Extract winners from current round
  const winners: Country[] = currentRound.matches
    .map(m => (m.winnerId === m.homeTeam.id ? m.homeTeam : m.awayTeam))
    .filter(c => c.id !== 'BYE');

  if (winners.length <= 1) {
    updated.status = 'COMPLETED';
    updated.champion = winners[0];
    const finalMatch = currentRound.matches[0];
    if (finalMatch) {
      updated.runnerUp = finalMatch.winnerId === finalMatch.homeTeam.id ? finalMatch.awayTeam : finalMatch.homeTeam;
    }
    updated.awards = calculateTournamentAwards(updated);
    return updated;
  }

  const nextTeamsCount = winners.length;
  const isFinal = nextTeamsCount === 2;
  const nextRoundName = getRoundName(nextTeamsCount, isFinal);
  const nextMatches: Match[] = [];

  for (let i = 0; i < nextTeamsCount; i += 2) {
    if (i + 1 < nextTeamsCount) {
      const home = winners[i];
      const away = winners[i + 1];
      const match = simulateKnockoutMatch(home, away, nextRoundName);
      nextMatches.push(match);
    }
  }

  const nextRound: Round = {
    id: `round_${updated.rounds.length + 1}_${Date.now()}`,
    name: nextRoundName,
    matches: nextMatches,
    isCompleted: true
  };

  updated.rounds.push(nextRound);
  updated.currentRoundIndex += 1;

  if (nextTeamsCount === 2) {
    const finalMatch = nextMatches[0];
    if (finalMatch) {
      const champ = finalMatch.winnerId === finalMatch.homeTeam.id ? finalMatch.homeTeam : finalMatch.awayTeam;
      const runner = finalMatch.winnerId === finalMatch.homeTeam.id ? finalMatch.awayTeam : finalMatch.homeTeam;
      updated.champion = champ;
      updated.runnerUp = runner;
      updated.status = 'COMPLETED';
    }
  }

  updated.awards = calculateTournamentAwards(updated);
  return updated;
}
