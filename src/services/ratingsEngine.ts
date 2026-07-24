import { CountryRatings, Confederation } from '../types/simulator';

interface KnownNationData {
  att: number;
  mid: number;
  def: number;
  gk: number;
  confederation: Confederation;
}

// Baseline preset ratings for well-known footballing nations
const KNOWN_RATINGS: Record<string, KnownNationData> = {
  ARG: { att: 91, mid: 88, def: 86, gk: 87, confederation: 'CONMEBOL' },
  FRA: { att: 90, mid: 89, def: 88, gk: 87, confederation: 'UEFA' },
  BRA: { att: 89, mid: 87, def: 86, gk: 88, confederation: 'CONMEBOL' },
  ESP: { att: 88, mid: 90, def: 87, gk: 86, confederation: 'UEFA' },
  ENG: { att: 89, mid: 87, def: 86, gk: 84, confederation: 'UEFA' },
  GER: { att: 87, mid: 87, def: 85, gk: 88, confederation: 'UEFA' },
  POR: { att: 88, mid: 87, def: 85, gk: 85, confederation: 'UEFA' },
  NED: { att: 85, mid: 86, def: 87, gk: 83, confederation: 'UEFA' },
  ITA: { att: 83, mid: 85, def: 87, gk: 88, confederation: 'UEFA' },
  BEL: { att: 84, mid: 85, def: 81, gk: 87, confederation: 'UEFA' },
  CRO: { att: 82, mid: 87, def: 83, gk: 84, confederation: 'UEFA' },
  URU: { att: 84, mid: 82, def: 83, gk: 81, confederation: 'CONMEBOL' },
  MAR: { att: 82, mid: 84, def: 84, gk: 85, confederation: 'CAF' },
  JPN: { att: 82, mid: 83, def: 81, gk: 79, confederation: 'AFC' },
  COL: { att: 83, mid: 82, def: 81, gk: 80, confederation: 'CONMEBOL' },
  USA: { att: 81, mid: 80, def: 79, gk: 81, confederation: 'CONCACAF' },
  SEN: { att: 81, mid: 80, def: 81, gk: 80, confederation: 'CAF' },
  KOR: { att: 83, mid: 80, def: 79, gk: 78, confederation: 'AFC' },
  MEX: { att: 79, mid: 79, def: 78, gk: 80, confederation: 'CONCACAF' },
  SUI: { att: 79, mid: 81, def: 81, gk: 83, confederation: 'UEFA' },
  DEN: { att: 79, mid: 81, def: 80, gk: 83, confederation: 'UEFA' },
  AUT: { att: 79, mid: 81, def: 79, gk: 78, confederation: 'UEFA' },
  TUR: { att: 80, mid: 80, def: 79, gk: 78, confederation: 'UEFA' },
  UKR: { att: 80, mid: 80, def: 78, gk: 82, confederation: 'UEFA' },
  ECU: { att: 78, mid: 79, def: 80, gk: 77, confederation: 'CONMEBOL' },
  EGY: { att: 83, mid: 76, def: 76, gk: 77, confederation: 'CAF' },
  NGA: { att: 83, mid: 77, def: 76, gk: 76, confederation: 'CAF' },
  CMR: { att: 78, mid: 77, def: 76, gk: 80, confederation: 'CAF' },
  GHA: { att: 78, mid: 78, def: 76, gk: 75, confederation: 'CAF' },
  CIV: { att: 81, mid: 80, def: 79, gk: 76, confederation: 'CAF' },
  AUS: { att: 76, mid: 76, def: 76, gk: 78, confederation: 'AFC' },
  CAN: { att: 80, mid: 76, def: 75, gk: 76, confederation: 'CONCACAF' },
  SWE: { att: 80, mid: 77, def: 78, gk: 77, confederation: 'UEFA' },
  NOR: { att: 85, mid: 80, def: 75, gk: 75, confederation: 'UEFA' },
  POL: { att: 82, mid: 76, def: 76, gk: 81, confederation: 'UEFA' },
  SRB: { att: 81, mid: 79, def: 77, gk: 77, confederation: 'UEFA' },
  CHI: { att: 76, mid: 76, def: 76, gk: 75, confederation: 'CONMEBOL' },
  PER: { att: 75, mid: 75, def: 75, gk: 76, confederation: 'CONMEBOL' },
  PAR: { att: 74, mid: 75, def: 77, gk: 74, confederation: 'CONMEBOL' },
  VEN: { att: 77, mid: 75, def: 74, gk: 74, confederation: 'CONMEBOL' },
  ALG: { att: 79, mid: 78, def: 75, gk: 74, confederation: 'CAF' },
  TUN: { att: 74, mid: 75, def: 76, gk: 74, confederation: 'CAF' },
  IRN: { att: 78, mid: 74, def: 75, gk: 76, confederation: 'AFC' },
  KSA: { att: 74, mid: 74, def: 73, gk: 75, confederation: 'AFC' },
  QAT: { att: 75, mid: 74, def: 73, gk: 73, confederation: 'AFC' },
  IRQ: { att: 74, mid: 72, def: 72, gk: 72, confederation: 'AFC' },
  UAE: { att: 73, mid: 72, def: 72, gk: 72, confederation: 'AFC' },
  UZB: { att: 73, mid: 73, def: 72, gk: 71, confederation: 'AFC' },
  NZL: { att: 72, mid: 70, def: 72, gk: 71, confederation: 'OFC' },
  CRC: { att: 71, mid: 72, def: 73, gk: 77, confederation: 'CONCACAF' },
  JAM: { att: 75, mid: 71, def: 72, gk: 72, confederation: 'CONCACAF' },
  HON: { att: 70, mid: 70, def: 70, gk: 70, confederation: 'CONCACAF' },
  PAN: { att: 71, mid: 71, def: 71, gk: 71, confederation: 'CONCACAF' },
  RSA: { att: 73, mid: 72, def: 72, gk: 74, confederation: 'CAF' },
  SCO: { att: 77, mid: 78, def: 77, gk: 75, confederation: 'UEFA' },
  WAL: { att: 76, mid: 76, def: 75, gk: 75, confederation: 'UEFA' },
  IRL: { att: 74, mid: 75, def: 76, gk: 76, confederation: 'UEFA' },
  NIR: { att: 71, mid: 72, def: 73, gk: 72, confederation: 'UEFA' },
  GRE: { att: 74, mid: 75, def: 76, gk: 75, confederation: 'UEFA' },
  CZE: { att: 77, mid: 77, def: 76, gk: 75, confederation: 'UEFA' },
  HUN: { att: 78, mid: 77, def: 77, gk: 77, confederation: 'UEFA' },
  ROU: { att: 75, mid: 75, def: 75, gk: 74, confederation: 'UEFA' },
  SVK: { att: 75, mid: 76, def: 76, gk: 75, confederation: 'UEFA' },
  SVN: { att: 77, mid: 74, def: 75, gk: 84, confederation: 'UEFA' },
  GEO: { att: 81, mid: 74, def: 73, gk: 82, confederation: 'UEFA' },
  FIN: { att: 73, mid: 73, def: 73, gk: 77, confederation: 'UEFA' },
  ISL: { att: 72, mid: 73, def: 72, gk: 71, confederation: 'UEFA' },
  CHN: { att: 68, mid: 68, def: 67, gk: 67, confederation: 'AFC' },
  IND: { att: 65, mid: 64, def: 63, gk: 66, confederation: 'AFC' },
  VIE: { att: 66, mid: 65, def: 65, gk: 64, confederation: 'AFC' },
  THA: { att: 67, mid: 66, def: 65, gk: 65, confederation: 'AFC' },
  IDN: { att: 66, mid: 65, def: 66, gk: 64, confederation: 'AFC' },
  MAS: { att: 64, mid: 63, def: 63, gk: 62, confederation: 'AFC' },
  PHI: { att: 62, mid: 62, def: 62, gk: 63, confederation: 'AFC' }
};

export function getConfederationFromRegion(region: string, subregion?: string): Confederation {
  const r = (region || '').toLowerCase();
  const sub = (subregion || '').toLowerCase();

  if (r.includes('europe')) return 'UEFA';
  if (r.includes('americas')) {
    if (sub.includes('south america')) return 'CONMEBOL';
    return 'CONCACAF';
  }
  if (r.includes('africa')) return 'CAF';
  if (r.includes('asia')) return 'AFC';
  if (r.includes('oceania')) return 'OFC';
  if (r.includes('antarctic')) return 'OFC';
  return 'OTHER';
}

export function generateCountryRatings(cca3: string, region: string, subregion?: string, population = 1000000): CountryRatings {
  const upper = cca3.toUpperCase();
  if (KNOWN_RATINGS[upper]) {
    const k = KNOWN_RATINGS[upper];
    const overall = Math.round((k.att * 0.35) + (k.mid * 0.3) + (k.def * 0.25) + (k.gk * 0.1));
    return { ...k, overall };
  }

  // Calculate dynamic heuristic base rating for all other ~180 countries
  const conf = getConfederationFromRegion(region, subregion);

  let confBase = 63;
  if (conf === 'UEFA') confBase = 68;
  else if (conf === 'CONMEBOL') confBase = 69;
  else if (conf === 'CONCACAF') confBase = 64;
  else if (conf === 'CAF') confBase = 65;
  else if (conf === 'AFC') confBase = 62;
  else if (conf === 'OFC') confBase = 58;

  // Population scale factor (slight boost for bigger nation talent pools)
  const popFactor = Math.min(6, Math.max(-2, Math.floor(Math.log10(Math.max(population, 10000)) - 5)));

  // Hash code based slight variance so country ratings remain deterministic and unique
  let hash = 0;
  for (let i = 0; i < cca3.length; i++) {
    hash = cca3.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hashVal = Math.abs(hash % 11) - 5; // -5 to +5

  const base = Math.min(79, Math.max(52, confBase + popFactor + hashVal));

  const att = Math.min(84, Math.max(50, base + ((hash % 7) - 3)));
  const mid = Math.min(84, Math.max(50, base + (((hash >> 2) % 7) - 3)));
  const def = Math.min(84, Math.max(50, base + (((hash >> 4) % 7) - 3)));
  const gk = Math.min(85, Math.max(50, base + (((hash >> 6) % 7) - 3)));

  const overall = Math.round((att * 0.35) + (mid * 0.3) + (def * 0.25) + (gk * 0.1));

  return { att, mid, def, gk, overall };
}
