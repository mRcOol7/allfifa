export interface BallPathPoint {
  x: number;
  y: number;
}

export interface GoalHighlightPattern {
  id: string;
  assisted: boolean;
  side: 'left' | 'right';
  ballPath: BallPathPoint[];
  goal: BallPathPoint;
}

// Built-in offline fallback patterns extracted from soccerfootballsim.com dataset
export const PRESET_GOAL_HIGHLIGHTS: GoalHighlightPattern[] = [
  {
    id: "left-assist-1",
    assisted: true,
    side: "left",
    ballPath: [
      { x: 74.8, y: 52.0 },
      { x: 70.3, y: 76.0 },
      { x: 54.9, y: 44.6 },
      { x: 34.1, y: 27.8 },
      { x: 28.4, y: 46.2 },
      { x: 14.7, y: 65.2 },
      { x: 4.0, y: 55.4 }
    ],
    goal: { x: 4.0, y: 55.4 }
  },
  {
    id: "left-assist-2",
    assisted: true,
    side: "left",
    ballPath: [
      { x: 76.3, y: 81.0 },
      { x: 58.2, y: 90.0 },
      { x: 49.4, y: 71.6 },
      { x: 38.9, y: 62.4 },
      { x: 35.8, y: 67.0 },
      { x: 15.7, y: 43.4 },
      { x: 10.0, y: 68.4 },
      { x: 4.0, y: 66.0 }
    ],
    goal: { x: 4.0, y: 66.0 }
  },
  {
    id: "right-assist-1",
    assisted: true,
    side: "right",
    ballPath: [
      { x: 25.2, y: 48.0 },
      { x: 29.7, y: 24.0 },
      { x: 45.1, y: 55.4 },
      { x: 65.9, y: 72.2 },
      { x: 71.6, y: 53.8 },
      { x: 85.3, y: 34.8 },
      { x: 96.0, y: 44.6 }
    ],
    goal: { x: 96.0, y: 44.6 }
  },
  {
    id: "right-assist-2",
    assisted: true,
    side: "right",
    ballPath: [
      { x: 23.7, y: 19.0 },
      { x: 41.8, y: 10.0 },
      { x: 50.6, y: 28.4 },
      { x: 61.1, y: 37.6 },
      { x: 64.2, y: 33.0 },
      { x: 84.3, y: 56.6 },
      { x: 90.0, y: 31.6 },
      { x: 96.0, y: 34.0 }
    ],
    goal: { x: 96.0, y: 34.0 }
  }
];

let cachedHighlights: GoalHighlightPattern[] = PRESET_GOAL_HIGHLIGHTS;

export async function fetchGoalHighlightsFromApi(): Promise<GoalHighlightPattern[]> {
  try {
    const res = await fetch('https://soccerfootballsim.com/goalhighlight/goalHighlights.json');
    if (!res.ok) throw new Error('API response not ok');
    const data = await res.json();
    if (data && Array.isArray(data.highlights) && data.highlights.length > 0) {
      // Map y coordinates from 0-50 range to 0-100 range for pitch display
      const mapped: GoalHighlightPattern[] = data.highlights.map((h: any) => ({
        id: h.id,
        assisted: !!h.assisted,
        side: h.side === 'right' ? 'right' : 'left',
        ballPath: (h.ballPath || []).map((p: any) => ({
          x: p.x,
          y: p.y > 50 ? p.y : p.y * 2 // Normalize pitch height scale
        })),
        goal: {
          x: h.goal?.x || (h.side === 'right' ? 96 : 4),
          y: h.goal?.y ? (h.goal.y > 50 ? h.goal.y : h.goal.y * 2) : 50
        }
      }));
      cachedHighlights = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn('Using preset goal highlights fallback:', err);
  }
  return cachedHighlights;
}

export function getRandomGoalHighlight(side: 'left' | 'right'): GoalHighlightPattern {
  const matches = cachedHighlights.filter(h => h.side === side);
  if (matches.length > 0) {
    return matches[Math.floor(Math.random() * matches.length)];
  }
  return PRESET_GOAL_HIGHLIGHTS[0];
}
