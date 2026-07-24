import { Country, Match, MatchEvent, MatchScorer, MatchStats, Round, Tournament, TournamentAwards, TournamentBracketSize } from '../types/simulator';
import { getRandomPlayerName } from './playerNames';

const STADIUMS = [
  'Lusail Iconic Stadium, Qatar',
  'Estadio Azteca, Mexico City',
  'MetLife Stadium, New Jersey',
  'Santiago Bernabéu, Madrid',
  'Maracanã Stadium, Rio de Janeiro',
  'Wembley Stadium, London',
  'Allianz Arena, Munich',
  'Camp Nou, Barcelona',
  'San Siro, Milan',
  'Stade de France, Paris',
  'International Stadium Yokohama, Japan',
  'Soccer City, Johannesburg',
  'Signal Iduna Park, Dortmund',
  'Rose Bowl, Pasadena',
  'SoFi Stadium, Los Angeles'
];

const REFEREES = [
  'Szymon Marciniak (POL)',
  'Daniele Orsato (ITA)',
  'Michael Oliver (ENG)',
  'Clément Turpin (FRA)',
  'Anthony Taylor (ENG)',
  'Wilmar Roldán (COL)',
  'César Arturo Ramos (MEX)',
  'Slavko Vinčić (SVN)',
  'Jesús Valenzuela (VEN)',
  'Ismail Elfath (USA)',
  'Mustapha Ghorbal (ALG)'
];

const GOAL_TYPES = [
  'Power Strike',
  'Precision Curler',
  'Header from Corner',
  'Penalty Kick',
  'Tap-in from Close Range',
  'Solo Run & Finish',
  'Volley into Top Corner',
  'Direct Free Kick'
];

const CARD_REASONS = [
  'Tactical Foul',
  'Late Tackle',
  'Dissent to Referee',
  'Handball',
  'Unsporting Conduct',
  'Time Wasting'
];

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

// Generate realistic football knockout match scores, goal scorers, timeline events & stats
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

  const isTie = homeScore === awayScore;
  const maxMinute = isTie ? 120 : 90;

  const scorers: MatchScorer[] = [];
  const events: MatchEvent[] = [];

  // Home Goals
  for (let i = 0; i < homeScore; i++) {
    const pos = Math.random() < 0.7 ? 'strikers' : 'midfielders';
    const player = getRandomPlayerName(home.id, home.region, pos);
    const minute = Math.floor(Math.random() * (maxMinute - 4)) + 4;
    const goalType = GOAL_TYPES[Math.floor(Math.random() * GOAL_TYPES.length)];
    const minuteDisplay = minute > 90 && !isTie ? `90+${minute - 90}'` : `${minute}'`;

    scorers.push({
      player,
      teamId: home.id,
      teamName: home.name,
      minute,
      minuteDisplay,
      goalType
    });

    events.push({
      id: `evt_goal_h_${i}_${Date.now()}`,
      minute,
      minuteDisplay,
      type: 'GOAL',
      teamId: home.id,
      teamName: home.name,
      player,
      detail: goalType
    });
  }

  // Away Goals
  for (let i = 0; i < awayScore; i++) {
    const pos = Math.random() < 0.7 ? 'strikers' : 'midfielders';
    const player = getRandomPlayerName(away.id, away.region, pos);
    const minute = Math.floor(Math.random() * (maxMinute - 4)) + 4;
    const goalType = GOAL_TYPES[Math.floor(Math.random() * GOAL_TYPES.length)];
    const minuteDisplay = minute > 90 && !isTie ? `90+${minute - 90}'` : `${minute}'`;

    scorers.push({
      player,
      teamId: away.id,
      teamName: away.name,
      minute,
      minuteDisplay,
      goalType
    });

    events.push({
      id: `evt_goal_a_${i}_${Date.now()}`,
      minute,
      minuteDisplay,
      type: 'GOAL',
      teamId: away.id,
      teamName: away.name,
      player,
      detail: goalType
    });
  }

  // Yellow Cards Simulation
  const yellowCardsHomeCount = Math.floor(Math.random() * 3);
  const yellowCardsAwayCount = Math.floor(Math.random() * 3);

  for (let i = 0; i < yellowCardsHomeCount; i++) {
    const pos = Math.random() < 0.6 ? 'defenders' : 'midfielders';
    const player = getRandomPlayerName(home.id, home.region, pos);
    const minute = Math.floor(Math.random() * (maxMinute - 10)) + 5;
    const reason = CARD_REASONS[Math.floor(Math.random() * CARD_REASONS.length)];

    events.push({
      id: `evt_yc_h_${i}_${Date.now()}`,
      minute,
      minuteDisplay: `${minute}'`,
      type: 'YELLOW_CARD',
      teamId: home.id,
      teamName: home.name,
      player,
      detail: reason
    });
  }

  for (let i = 0; i < yellowCardsAwayCount; i++) {
    const pos = Math.random() < 0.6 ? 'defenders' : 'midfielders';
    const player = getRandomPlayerName(away.id, away.region, pos);
    const minute = Math.floor(Math.random() * (maxMinute - 10)) + 5;
    const reason = CARD_REASONS[Math.floor(Math.random() * CARD_REASONS.length)];

    events.push({
      id: `evt_yc_a_${i}_${Date.now()}`,
      minute,
      minuteDisplay: `${minute}'`,
      type: 'YELLOW_CARD',
      teamId: away.id,
      teamName: away.name,
      player,
      detail: reason
    });
  }

  // Rare Red Card (3% chance)
  let redCardsHome = 0;
  let redCardsAway = 0;
  if (Math.random() < 0.03) {
    const isHomeRed = Math.random() > 0.5;
    const targetTeam = isHomeRed ? home : away;
    if (isHomeRed) redCardsHome = 1; else redCardsAway = 1;
    const player = getRandomPlayerName(targetTeam.id, targetTeam.region, 'defenders');
    const minute = Math.floor(Math.random() * 45) + 40;

    events.push({
      id: `evt_rc_${Date.now()}`,
      minute,
      minuteDisplay: `${minute}'`,
      type: 'RED_CARD',
      teamId: targetTeam.id,
      teamName: targetTeam.name,
      player,
      detail: 'Serious Foul Play'
    });
  }

  // Sort events chronologically by minute
  events.sort((a, b) => a.minute - b.minute);

  let isPenalties = false;
  let homePenalties: number | undefined;
  let awayPenalties: number | undefined;
  let winnerId: string;

  if (homeScore === awayScore) {
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

  // Generate Realistic Detailed Statistics
  const posHome = Math.floor(Math.random() * 26) + 38; // 38% to 63%
  const posAway = 100 - posHome;

  const shotsHome = Math.max(homeScore, Math.floor(Math.random() * 10) + 4 + homeScore);
  const shotsAway = Math.max(awayScore, Math.floor(Math.random() * 10) + 3 + awayScore);

  const shotsOnTargetHome = Math.max(homeScore, Math.min(shotsHome, homeScore + Math.floor(Math.random() * 5)));
  const shotsOnTargetAway = Math.max(awayScore, Math.min(shotsAway, awayScore + Math.floor(Math.random() * 5)));

  const cornersHome = Math.floor(Math.random() * 8) + 2;
  const cornersAway = Math.floor(Math.random() * 8) + 2;

  const foulsHome = Math.floor(Math.random() * 9) + 6;
  const foulsAway = Math.floor(Math.random() * 9) + 6;

  const passAccuracyHome = Math.floor(Math.random() * 15) + 78;
  const passAccuracyAway = Math.floor(Math.random() * 15) + 76;

  const stats: MatchStats = {
    possessionHome: posHome,
    possessionAway: posAway,
    shotsHome,
    shotsAway,
    shotsOnTargetHome,
    shotsOnTargetAway,
    cornersHome,
    cornersAway,
    foulsHome,
    foulsAway,
    yellowCardsHome: yellowCardsHomeCount,
    yellowCardsAway: yellowCardsAwayCount,
    redCardsHome,
    redCardsAway,
    passAccuracyHome,
    passAccuracyAway
  };

  const stadium = STADIUMS[Math.floor(Math.random() * STADIUMS.length)];
  const referee = REFEREES[Math.floor(Math.random() * REFEREES.length)];

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
    scorers,
    events,
    stats,
    stadium,
    referee
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
  const topScorersList = sortedScorers.slice(0, 10);

  const sortedCleanSheets = Object.values(teamCleanSheetsMap).sort((a, b) => b.cleanSheets - a.cleanSheets);
  const mostCleanSheets = sortedCleanSheets[0];
  const topCleanSheetsList = sortedCleanSheets.slice(0, 5);

  return {
    topScorer,
    topScorersList,
    mostCleanSheets,
    topCleanSheetsList,
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
