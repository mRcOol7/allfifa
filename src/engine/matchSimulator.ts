import { Country, Match, MatchEvent, MatchStats, TeamStats, PenaltyShootoutGoal } from '../types/simulator';
import { getRandomPlayerName } from './playerNames';
import { getCommentaryText } from './commentaryGenerator';
import { audioService } from '../services/audioService';

export function createInitialMatch(homeTeam: Country, awayTeam: Country, roundName: string): Match {
  const initialStats: MatchStats = {
    home: {
      possession: 50,
      shots: 0,
      shotsOnTarget: 0,
      xG: 0,
      fouls: 0,
      corners: 0,
      yellowCards: 0,
      redCards: 0,
      saves: 0,
      passes: 0,
      passAccuracy: 82
    },
    away: {
      possession: 50,
      shots: 0,
      shotsOnTarget: 0,
      xG: 0,
      fouls: 0,
      corners: 0,
      yellowCards: 0,
      redCards: 0,
      saves: 0,
      passes: 0,
      passAccuracy: 80
    }
  };

  return {
    id: `match_${homeTeam.id}_${awayTeam.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    roundName,
    homeTeam,
    awayTeam,
    homeScore: 0,
    awayScore: 0,
    status: 'SCHEDULED',
    events: [],
    stats: initialStats,
    currentMinute: 0,
    momentumHistory: [0],
    venue: `${homeTeam.name} International Stadium`
  };
}

export function simulateMatchMinute(currentMatch: Match, isKnockout: boolean = true): Match {
  if (currentMatch.status === 'COMPLETED') {
    return currentMatch;
  }

  const match: Match = JSON.parse(JSON.stringify(currentMatch));
  match.status = 'LIVE';
  match.currentMinute += 1;

  const m = match.currentMinute;
  const home = match.homeTeam;
  const away = match.awayTeam;

  // Check period boundaries
  if (m === 45) {
    const ev: MatchEvent = {
      id: `ev_ht_${m}`,
      minute: 45,
      type: 'PERIOD_END',
      teamId: home.id,
      player: '',
      description: getCommentaryText('PERIOD_END', 45, home.name, away.name, '', [match.homeScore, match.awayScore]),
      scoreAfter: [match.homeScore, match.awayScore]
    };
    match.events.unshift(ev);
    return match;
  }

  if (m === 90 && match.homeScore !== match.awayScore) {
    // Normal match ends
    match.status = 'COMPLETED';
    match.winnerId = match.homeScore > match.awayScore ? home.id : away.id;
    const ev: MatchEvent = {
      id: `ev_ft_${m}`,
      minute: 90,
      type: 'PERIOD_END',
      teamId: match.winnerId,
      player: '',
      description: getCommentaryText('PERIOD_END', 90, home.name, away.name, '', [match.homeScore, match.awayScore]),
      scoreAfter: [match.homeScore, match.awayScore]
    };
    match.events.unshift(ev);
    audioService.playWhistle();
    return match;
  }

  if (m === 90 && match.homeScore === match.awayScore) {
    if (isKnockout) {
      match.isExtraTime = true;
      const ev: MatchEvent = {
        id: `ev_et_${m}`,
        minute: 90,
        type: 'PERIOD_END',
        teamId: home.id,
        player: '',
        description: `90' FULL TIME (TIE ${match.homeScore}-${match.awayScore}). Knockout match proceeds into 30 minutes of Extra Time!`,
        scoreAfter: [match.homeScore, match.awayScore]
      };
      match.events.unshift(ev);
      audioService.playWhistle();
    } else {
      // Draw allowed in group games
      match.status = 'COMPLETED';
      return match;
    }
  }

  if (m === 120 && match.homeScore !== match.awayScore) {
    match.status = 'COMPLETED';
    match.winnerId = match.homeScore > match.awayScore ? home.id : away.id;
    return match;
  }

  if (m === 120 && match.homeScore === match.awayScore) {
    // Penalty shootout trigger
    match.isPenalties = true;
    simulatePenaltyShootout(match);
    match.status = 'COMPLETED';
    audioService.playWhistle();
    return match;
  }

  // Calculate dynamic minute attack probability based on team ratings & card penalties
  const homeRedCount = match.stats.home.redCards;
  const awayRedCount = match.stats.away.redCards;

  const homeAttEff = Math.max(30, home.ratings.att - (homeRedCount * 15));
  const homeDefEff = Math.max(30, home.ratings.def - (homeRedCount * 10));

  const awayAttEff = Math.max(30, away.ratings.att - (awayRedCount * 15));
  const awayDefEff = Math.max(30, away.ratings.def - (awayRedCount * 10));

  // Possession calculation updates
  const midDiff = (home.ratings.mid - away.ratings.mid);
  const homeTargetPoss = Math.min(75, Math.max(25, 50 + Math.round(midDiff * 0.8)));
  match.stats.home.possession = Math.round((match.stats.home.possession * 0.95) + (homeTargetPoss * 0.05));
  match.stats.away.possession = 100 - match.stats.home.possession;

  // Increment passes
  match.stats.home.passes += Math.floor(match.stats.home.possession * 0.12);
  match.stats.away.passes += Math.floor(match.stats.away.possession * 0.12);

  // Momentum swing (-100 home under pressure to +100 home dominating)
  const momentumSwing = (Math.random() * 40 - 20) + (midDiff * 0.5);
  const prevMomentum = match.momentumHistory[match.momentumHistory.length - 1] || 0;
  const newMomentum = Math.min(100, Math.max(-100, Math.round(prevMomentum * 0.7 + momentumSwing)));
  match.momentumHistory.push(newMomentum);

  // Event chance Roll (0 to 1000)
  const roll = Math.floor(Math.random() * 1000);

  // 1. Goal Attempt Roll for Home
  const homeGoalOdds = Math.max(3, Math.round((homeAttEff - awayDefEff * 0.7) * 0.35 + (newMomentum > 30 ? 5 : 0)));
  const awayGoalOdds = Math.max(3, Math.round((awayAttEff - homeDefEff * 0.7) * 0.35 + (newMomentum < -30 ? 5 : 0)));

  // Home Goal check
  if (roll < homeGoalOdds) {
    // Shot taken
    match.stats.home.shots += 1;
    match.stats.home.shotsOnTarget += 1;
    match.stats.home.xG = parseFloat((match.stats.home.xG + 0.28).toFixed(2));

    // VAR Goal check (5% chance of VAR review)
    const varRoll = Math.random();
    let isVarOverturned = false;
    const scorer = getRandomPlayerName(home.id, home.confederation, 'strikers');

    if (varRoll < 0.06) {
      isVarOverturned = true;
      audioService.playVarAlert();
      const varEv: MatchEvent = {
        id: `ev_var_${m}_${Date.now()}`,
        minute: m,
        type: 'VAR_GOAL_CHECK',
        teamId: home.id,
        player: scorer,
        description: getCommentaryText('VAR_GOAL_CHECK', m, home.name, away.name, scorer, [match.homeScore, match.awayScore], 'OVERTURNED'),
        scoreAfter: [match.homeScore, match.awayScore],
        varOutcome: 'OVERTURNED'
      };
      match.events.unshift(varEv);
    } else {
      // Goal Scored!
      match.homeScore += 1;
      audioService.playCrowdGoalRoar();
      audioService.playGoalFanfare();

      const goalEv: MatchEvent = {
        id: `ev_g_${m}_${Date.now()}`,
        minute: m,
        type: 'GOAL',
        teamId: home.id,
        player: scorer,
        description: getCommentaryText('GOAL', m, home.name, away.name, scorer, [match.homeScore, match.awayScore]),
        scoreAfter: [match.homeScore, match.awayScore]
      };
      match.events.unshift(goalEv);
    }
    return match;
  }

  // Away Goal check
  if (roll >= 500 && roll < 500 + awayGoalOdds) {
    match.stats.away.shots += 1;
    match.stats.away.shotsOnTarget += 1;
    match.stats.away.xG = parseFloat((match.stats.away.xG + 0.28).toFixed(2));

    const varRoll = Math.random();
    let isVarOverturned = false;
    const scorer = getRandomPlayerName(away.id, away.confederation, 'strikers');

    if (varRoll < 0.06) {
      isVarOverturned = true;
      audioService.playVarAlert();
      const varEv: MatchEvent = {
        id: `ev_var_${m}_${Date.now()}`,
        minute: m,
        type: 'VAR_GOAL_CHECK',
        teamId: away.id,
        player: scorer,
        description: getCommentaryText('VAR_GOAL_CHECK', m, away.name, home.name, scorer, [match.homeScore, match.awayScore], 'OVERTURNED'),
        scoreAfter: [match.homeScore, match.awayScore],
        varOutcome: 'OVERTURNED'
      };
      match.events.unshift(varEv);
    } else {
      match.awayScore += 1;
      audioService.playCrowdGoalRoar();
      audioService.playGoalFanfare();

      const goalEv: MatchEvent = {
        id: `ev_g_${m}_${Date.now()}`,
        minute: m,
        type: 'GOAL',
        teamId: away.id,
        player: scorer,
        description: getCommentaryText('GOAL', m, away.name, home.name, scorer, [match.homeScore, match.awayScore]),
        scoreAfter: [match.homeScore, match.awayScore]
      };
      match.events.unshift(goalEv);
    }
    return match;
  }

  // 2. Shot & Save Roll (Shot saved or missed)
  if (roll >= 40 && roll < 80) {
    const isHomeShot = roll % 2 === 0;
    const attackingTeam = isHomeShot ? home : away;
    const defendingTeam = isHomeShot ? away : home;
    const attackerStats = isHomeShot ? match.stats.home : match.stats.away;
    const defenderStats = isHomeShot ? match.stats.away : match.stats.home;

    attackerStats.shots += 1;
    attackerStats.xG = parseFloat((attackerStats.xG + 0.09).toFixed(2));

    if (roll % 3 === 0) {
      attackerStats.shotsOnTarget += 1;
      defenderStats.saves += 1;
      const player = getRandomPlayerName(attackingTeam.id, attackingTeam.confederation, 'strikers');
      const saveEv: MatchEvent = {
        id: `ev_sav_${m}_${Date.now()}`,
        minute: m,
        type: 'SAVE',
        teamId: defendingTeam.id,
        player,
        description: getCommentaryText('SAVE', m, defendingTeam.name, attackingTeam.name, player, [match.homeScore, match.awayScore]),
        scoreAfter: [match.homeScore, match.awayScore]
      };
      match.events.unshift(saveEv);
    }
    return match;
  }

  // 3. Corner Kick Roll
  if (roll >= 100 && roll < 135) {
    const isHome = roll % 2 === 0;
    const team = isHome ? home : away;
    const stats = isHome ? match.stats.home : match.stats.away;
    stats.corners += 1;
    const player = getRandomPlayerName(team.id, team.confederation, 'midfielders');
    const cornerEv: MatchEvent = {
      id: `ev_crn_${m}_${Date.now()}`,
      minute: m,
      type: 'CORNER',
      teamId: team.id,
      player,
      description: getCommentaryText('CORNER', m, team.name, isHome ? away.name : home.name, player, [match.homeScore, match.awayScore]),
      scoreAfter: [match.homeScore, match.awayScore]
    };
    match.events.unshift(cornerEv);
    return match;
  }

  // 4. Yellow / Red Card Roll
  if (roll >= 200 && roll < 215) {
    const isHomeFoul = roll % 2 === 0;
    const foulingTeam = isHomeFoul ? home : away;
    const foulingStats = isHomeFoul ? match.stats.home : match.stats.away;
    foulingStats.fouls += 1;

    const isRedCard = roll === 210;
    const player = getRandomPlayerName(foulingTeam.id, foulingTeam.confederation, 'defenders');

    if (isRedCard) {
      foulingStats.redCards += 1;
      audioService.playVarAlert();
      const redEv: MatchEvent = {
        id: `ev_rc_${m}_${Date.now()}`,
        minute: m,
        type: 'RED_CARD',
        teamId: foulingTeam.id,
        player,
        description: getCommentaryText('RED_CARD', m, foulingTeam.name, isHomeFoul ? away.name : home.name, player, [match.homeScore, match.awayScore]),
        scoreAfter: [match.homeScore, match.awayScore]
      };
      match.events.unshift(redEv);
    } else {
      foulingStats.yellowCards += 1;
      const yellowEv: MatchEvent = {
        id: `ev_yc_${m}_${Date.now()}`,
        minute: m,
        type: 'YELLOW_CARD',
        teamId: foulingTeam.id,
        player,
        description: getCommentaryText('YELLOW_CARD', m, foulingTeam.name, isHomeFoul ? away.name : home.name, player, [match.homeScore, match.awayScore]),
        scoreAfter: [match.homeScore, match.awayScore]
      };
      match.events.unshift(yellowEv);
    }
    return match;
  }

  // 5. Offside Roll
  if (roll >= 300 && roll < 312) {
    const isHomeOffside = roll % 2 === 0;
    const team = isHomeOffside ? home : away;
    const player = getRandomPlayerName(team.id, team.confederation, 'strikers');
    const offEv: MatchEvent = {
      id: `ev_off_${m}_${Date.now()}`,
      minute: m,
      type: 'OFFSIDE',
      teamId: team.id,
      player,
      description: getCommentaryText('OFFSIDE', m, team.name, isHomeOffside ? away.name : home.name, player, [match.homeScore, match.awayScore]),
      scoreAfter: [match.homeScore, match.awayScore]
    };
    match.events.unshift(offEv);
    return match;
  }

  return match;
}

// Full Instant Simulation helper
export function simulateFullMatch(initialMatch: Match, isKnockout: boolean = true): Match {
  let match = JSON.parse(JSON.stringify(initialMatch));
  const maxMinutes = 125;

  while (match.status !== 'COMPLETED' && match.currentMinute < maxMinutes) {
    match = simulateMatchMinute(match, isKnockout);
  }

  return match;
}

// Penalty Shootout Simulator
function simulatePenaltyShootout(match: Match) {
  let homePen = 0;
  let awayPen = 0;
  const shootoutDetails: PenaltyShootoutGoal[] = [];

  const home = match.homeTeam;
  const away = match.awayTeam;

  // Regular 5 rounds
  for (let i = 0; i < 5; i++) {
    const homeScorer = getRandomPlayerName(home.id, home.confederation, 'strikers');
    const homeSuccess = Math.random() < 0.76;
    if (homeSuccess) homePen += 1;
    shootoutDetails.push({ teamId: home.id, player: homeScorer, scored: homeSuccess });

    const awayScorer = getRandomPlayerName(away.id, away.confederation, 'strikers');
    const awaySuccess = Math.random() < 0.76;
    if (awaySuccess) awayPen += 1;
    shootoutDetails.push({ teamId: away.id, player: awayScorer, scored: awaySuccess });
  }

  // Sudden Death if tied
  let suddenDeathRound = 1;
  while (homePen === awayPen && suddenDeathRound <= 8) {
    const homeScorer = getRandomPlayerName(home.id, home.confederation, 'midfielders');
    const homeSuccess = Math.random() < 0.72;
    if (homeSuccess) homePen += 1;
    shootoutDetails.push({ teamId: home.id, player: homeScorer, scored: homeSuccess });

    const awayScorer = getRandomPlayerName(away.id, away.confederation, 'defenders');
    const awaySuccess = Math.random() < 0.72;
    if (awaySuccess) awayPen += 1;
    shootoutDetails.push({ teamId: away.id, player: awayScorer, scored: awaySuccess });

    suddenDeathRound += 1;
  }

  // Force break tie if still equal
  if (homePen === awayPen) {
    if (Math.random() > 0.5) homePen += 1;
    else awayPen += 1;
  }

  match.homePenalties = homePen;
  match.awayPenalties = awayPen;
  match.penaltyShootoutDetails = shootoutDetails;
  match.winnerId = homePen > awayPen ? home.id : away.id;

  const winnerTeamName = match.winnerId === home.id ? home.name : away.name;
  const shootoutEv: MatchEvent = {
    id: `ev_ps_${Date.now()}`,
    minute: 120,
    type: 'PENALTY_SHOOTOUT',
    teamId: match.winnerId,
    player: '',
    description: getCommentaryText('PENALTY_SHOOTOUT', 120, winnerTeamName, match.winnerId === home.id ? away.name : home.name, '', [homePen, awayPen]),
    scoreAfter: [match.homeScore, match.awayScore]
  };
  match.events.unshift(shootoutEv);
}
