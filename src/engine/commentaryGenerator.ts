import { MatchEventType } from '../types/simulator';

export function getCommentaryText(
  type: MatchEventType,
  minute: number,
  teamName: string,
  opponentName: string,
  player: string,
  score: [number, number],
  varOutcome?: 'OVERTURNED' | 'CONFIRMED'
): string {
  const [h, a] = score;

  switch (type) {
    case 'GOAL': {
      const phrases = [
        `GOAL! WHAT A STRIKE! ${player} fires a thunderbolt into the top corner for ${teamName}! (${h}-${a})`,
        `GOAL FOR ${teamName}! Beautiful team play finished off cleanly by ${player}! (${h}-${a})`,
        `IN THE BACK OF THE NET! ${player} leaps highest to head home a sensational goal! (${h}-${a})`,
        `GOAL! ${player} pounces on a loose ball inside the box and slots it past the keeper! (${h}-${a})`,
        `SCREAMER! ${player} unleashes an absolute rocket from 30 yards out! Stunning goal for ${teamName}! (${h}-${a})`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }

    case 'PENALTY_GOAL': {
      return `PENALTY SCORED! ${player} steps up with ice in his veins and buries the penalty for ${teamName}! (${h}-${a})`;
    }

    case 'PENALTY_MISSED': {
      const misses = [
        `PENALTY SAVED! What a heroic leap by the keeper to deny ${player}! Score remains ${h}-${a}.`,
        `MISSED PENALTY! ${player} smashes the spot-kick off the crossbar! Tremendous drama! (${h}-${a})`,
        `WIDE! ${player} drags his penalty kick wide of the left post! Unbelievable miss!`
      ];
      return misses[Math.floor(Math.random() * misses.length)];
    }

    case 'YELLOW_CARD': {
      return `YELLOW CARD! The referee pulls out a caution for ${player} (${teamName}) after a late mistimed tackle.`;
    }

    case 'RED_CARD': {
      return `RED CARD! ${player} (${teamName}) is SENT OFF! A reckless challenge leaves ${teamName} down to 10 men!`;
    }

    case 'VAR_GOAL_CHECK': {
      if (varOutcome === 'OVERTURNED') {
        return `VAR DECISION: NO GOAL! After reviewing the pitchside monitor, the goal by ${player} is OVERTURNED for offside!`;
      }
      return `VAR DECISION: GOAL STANDS! The VAR check confirms ${player}'s goal is valid!`;
    }

    case 'VAR_PENALTY_CHECK': {
      if (varOutcome === 'CONFIRMED') {
        return `VAR REVIEW: PENALTY GRANTED! The referee points to the spot after reviewing handball in the box!`;
      }
      return `VAR REVIEW: NO PENALTY! Play continues after checking the incident in the penalty area.`;
    }

    case 'VAR_RED_CARD_CHECK': {
      if (varOutcome === 'CONFIRMED') {
        return `VAR REVIEW: UPGRADED TO RED CARD! Shocking challenge by ${player} leads to a straight red!`;
      }
      return `VAR REVIEW: NO RED CARD! The referee decides a yellow card was sufficient.`;
    }

    case 'INJURY': {
      return `INJURY PAUSE: ${player} (${teamName}) is receiving medical treatment on the pitch after a heavy clash.`;
    }

    case 'SUBSTITUTION': {
      return `SUBSTITUTION FOR ${teamName}: Tactical change as fresh legs enter the match.`;
    }

    case 'CORNER': {
      return `Corner kick awarded to ${teamName}. ${player} steps up to deliver into a crowded 6-yard box.`;
    }

    case 'OFFSIDE': {
      return `Offside flag raised against ${player} (${teamName}), thwarting a dangerous counter-attack.`;
    }

    case 'SAVE': {
      const saves = [
        `OUTSTANDING SAVE! The goalkeeper makes a flying fingertip save to deny ${player}!`,
        `BRILLIANT STOP! ${player}'s low effort is blocked away cleanly by the keeper!`,
        `POINT-BLANK REFLEX SAVE! The keeper keeps ${teamName} in the game with a world-class save!`
      ];
      return saves[Math.floor(Math.random() * saves.length)];
    }

    case 'PERIOD_END': {
      if (minute >= 90 && h === a) {
        return `FULL TIME (${h}-${a})! The match is deadlocked after 90 minutes. Heading to Extra Time!`;
      }
      if (minute >= 90) {
        return `FULL TIME! ${teamName} win a thriller ${h}-${a} against ${opponentName}!`;
      }
      return `HALF TIME (${h}-${a})! The referee blows the whistle to signal the end of the first half.`;
    }

    case 'PENALTY_SHOOTOUT': {
      return `DRAMATIC PENALTY SHOOTOUT! ${teamName} win the penalty shootout ${h}-${a}! What an emotional roller-coaster!`;
    }

    default:
      return `${minute}' Solid tactical battle in midfield between ${teamName} and ${opponentName}.`;
  }
}
