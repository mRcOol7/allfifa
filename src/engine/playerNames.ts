// Localized realistic player name bank for authentic commentary & tournament award tracking

const SPECIFIC_COUNTRY_BANKS: Record<string, { strikers: string[]; midfielders: string[]; defenders: string[]; goalkeepers: string[] }> = {
  ARG: {
    strikers: ['Messi', 'Alvarez', 'Lautaro', 'Di Maria', 'Correa'],
    midfielders: ['De Paul', 'Mac Allister', 'Fernandez', 'Paredes', 'Lo Celso'],
    defenders: ['Romero', 'Otamendi', 'Molina', 'Tagliafico', 'Acuna'],
    goalkeepers: ['Martinez', 'Rulli', 'Armani']
  },
  FRA: {
    strikers: ['Mbappe', 'Giroud', 'Griezmann', 'Thuram', 'Kolo Muani'],
    midfielders: ['Tchouameni', 'Camavinga', 'Rabiot', 'Fofana', 'Zaire-Emery'],
    defenders: ['Hernandez', 'Upamecano', 'Kounde', 'Saliba', 'Konate'],
    goalkeepers: ['Maignan', 'Samba', 'Areola']
  },
  BRA: {
    strikers: ['Vinicius Jr', 'Rodrygo', 'Richarlison', 'Endrick', 'Raphinha'],
    midfielders: ['Casemiro', 'Paqueta', 'Guimaraes', 'Andre', 'Gerson'],
    defenders: ['Marquinhos', 'Militao', 'Danilo', 'Gabriel', 'Arana'],
    goalkeepers: ['Alisson', 'Ederson', 'Bento']
  },
  ENG: {
    strikers: ['Kane', 'Saka', 'Foden', 'Watkins', 'Palmer'],
    midfielders: ['Bellingham', 'Rice', 'Mainoo', 'Gallagher', 'Maddison'],
    defenders: ['Walker', 'Stones', 'Guehi', 'Shaw', 'Alexander-Arnold'],
    goalkeepers: ['Pickford', 'Ramsdale', 'Pope']
  },
  GER: {
    strikers: ['Kai Havertz', 'Nick Woltemade', 'Maximilian Beier', 'Deniz Undav'],
    midfielders: ['Aleksandar Pavlovic', 'Leon Goretzka', 'Jamie Leweling', 'Jamal Musiala', 'Pascal Groß', 'Angelo Stiller', 'Florian Wirtz', 'Leroy Sané', 'Nadiem Amiri', 'Felix Nmecha', 'Assan Ouédraogo'],
    defenders: ['Antonio Rüdiger', 'Waldemar Anton', 'Jonathan Tah', 'Joshua Kimmich', 'Nico Schlotterbeck', 'Nathaniel Brown', 'David Raum', 'Malick Thiaw'],
    goalkeepers: ['Manuel Neuer', 'Oliver Baumann', 'Alexander Nübel']
  },
  ESP: {
    strikers: ['Morata', 'Yamal', 'Williams', 'Oyarzabal', 'Torres'],
    midfielders: ['Rodri', 'Pedri', 'Gavi', 'Ruiz', 'Olmo'],
    defenders: ['Carvajal', 'Laporte', 'Le Normand', 'Cucurella', 'Navas'],
    goalkeepers: ['Simón', 'Raya', 'Kepa']
  },
  POR: {
    strikers: ['Ronaldo', 'Leão', 'Jota', 'Ramos', 'Conceição'],
    midfielders: ['Fernandes', 'Bernardo', 'Vitinha', 'Palhinha', 'Neves'],
    defenders: ['Dias', 'Pepe', 'Mendes', 'Cancelo', 'Inácio'],
    goalkeepers: ['Costa', 'Patrício', 'Sa']
  },
  ITA: {
    strikers: ['Chiesa', 'Retegui', 'Scamacca', 'Raspadori', 'El Shaarawy'],
    midfielders: ['Barella', 'Jorginho', 'Pellegrini', 'Frattesi', 'Cristante'],
    defenders: ['Bastoni', 'Darmian', 'Di Lorenzo', 'Dimarco', 'Mancini'],
    goalkeepers: ['Donnarumma', 'Vicario', 'Meret']
  },
  NED: {
    strikers: ['Depay', 'Gakpo', 'Malen', 'Weghorst', 'Brobbey'],
    midfielders: ['Reijnders', 'Simons', 'Wijnaldum', 'Schouten', 'Veerman'],
    defenders: ['Van Dijk', 'Aké', 'Dumfries', 'De Ligt', 'Frimpong'],
    goalkeepers: ['Verbruggen', 'Bijlow', 'Flekken']
  },
  JPN: {
    strikers: ['Mitoma', 'Kubo', 'Ueda', 'Asano', 'Maeda'],
    midfielders: ['Endo', 'Morita', 'Kamada', 'Doan', 'Minamino'],
    defenders: ['Tomiyasu', 'Itakura', 'Ito', 'Sugawara', 'Machida'],
    goalkeepers: ['Suzuki', 'Maekawa', 'Osako']
  },
  MAR: {
    strikers: ['En-Nesyri', 'Ziyech', 'Boufal', 'Diaz', 'Rahimi'],
    midfielders: ['Amrabat', 'Ounahi', 'Amallah', 'El Khannouss', 'Richardson'],
    defenders: ['Hakimi', 'Saïss', 'Aguerd', 'Mazraoui', 'Attiat Allah'],
    goalkeepers: ['Bounou', 'Munir', 'Benabid']
  },
  USA: {
    strikers: ['Pulisic', 'Balogun', 'Weah', 'Sargent', 'Pepi'],
    midfielders: ['McKennie', 'Musah', 'Adams', 'Reyna', 'De la Torre'],
    defenders: ['Dest', 'Richards', 'Robinson', 'Ream', 'Carter-Vickers'],
    goalkeepers: ['Turner', 'Horvath', 'Johnson']
  },
  KOR: {
    strikers: ['Son Heung-min', 'Hwang Hee-chan', 'Cho Gue-sung', 'Oh Hyeon-gyu'],
    midfielders: ['Lee Kang-in', 'Hwang In-beom', 'Lee Jae-sung', 'Hong Hyun-seok'],
    defenders: ['Kim Min-jae', 'Kim Young-gwon', 'Seol Young-woo', 'Kim Jin-su'],
    goalkeepers: ['Jo Hyeon-woo', 'Kim Seung-gyu']
  },
  MEX: {
    strikers: ['Gimenez', 'Lozano', 'Quiñones', 'Vega', 'Antuna'],
    midfielders: ['Alvarez', 'Chávez', 'Pineda', 'Rodriguez', 'Sanchez'],
    defenders: ['Montes', 'Vásquez', 'Arteaga', 'Sanchez', 'Reyes'],
    goalkeepers: ['Ochoa', 'González', 'Malagón']
  }
};

const REGIONAL_NAME_BANKS: Record<string, { strikers: string[]; midfielders: string[]; defenders: string[]; goalkeepers: string[] }> = {
  Africa: {
    strikers: ['Diallo', 'Keita', 'Traoré', 'Mensah', 'Kamara', 'Kouassi', 'Ousseini', 'El-Sayed', 'Zaki', 'Manoel', 'Banda', 'Tau'],
    midfielders: ['Sissoko', 'Toure', 'Sylla', 'Diop', 'Abubakar', 'Konda', 'Okello', 'El-Din', 'Parthenay', 'Mila', 'Chama'],
    defenders: ['Koulibaly', 'Badji', 'Bande', 'Ndlovu', 'Mankwa', 'Kissi', 'Hassan', 'Gardo', 'Kamara', 'Coulibaly'],
    goalkeepers: ['Onyango', 'Diarra', 'Nsimba', 'El-Shenawy']
  },
  Asia: {
    strikers: ['Kim', 'Tanaka', 'Wang', 'Singh', 'Nguyen', 'Al-Mansoor', 'Rahman', 'Aung', 'Oo', 'Lin', 'Ali', 'Shah'],
    midfielders: ['Park', 'Yamamoto', 'Chen', 'Sharma', 'Tran', 'Al-Hassan', 'Aziz', 'Htet', 'Win', 'Jahan'],
    defenders: ['Lee', 'Suzuki', 'Zhang', 'Kumar', 'Pham', 'Al-Sabah', 'Ibrahim', 'Naing', 'Kyaw'],
    goalkeepers: ['Siddique', 'Nakamura', 'Guo', 'Al-Ali', 'Myo']
  },
  Europe: {
    strikers: ['Novak', 'Schneider', 'Petrov', 'Kovac', 'Jensen', 'Lindqvist', 'Nielsen', 'Vella', 'Camilleri', 'Ristovski', 'Trajkovski', 'Dimitrievski'],
    midfielders: ['Varga', 'Sorensen', 'Popov', 'Dimitrov', 'Larsen', 'Weber', 'Muscat', 'Grech', 'Bardhi', 'Elmas'],
    defenders: ['Horvat', 'Nagy', 'Stoica', 'Jovanovic', 'Andersson', 'Hansen', 'Borg', 'Zahra', 'Maniat'],
    goalkeepers: ['Dubois', 'Kovacs', 'Hansen', 'Petrovic', 'Bonello']
  },
  Americas: {
    strikers: ['Lopez', 'Martinez', 'Garcia', 'Hernandez', 'Jean', 'Baptiste', 'Rodriguez', 'Gomez', 'Figueroa', 'Elis', 'Quioto'],
    midfielders: ['Morales', 'Castillo', 'Rios', 'Rojas', 'Delgado', 'Perez', 'Guerrero', 'Pierre', 'Joseph', 'Acosta'],
    defenders: ['Caceres', 'Gimenez', 'Vasquez', 'Medina', 'Reyes', 'Santana', 'Charles', 'Augustin', 'Maynor'],
    goalkeepers: ['Barrios', 'Muslera', 'Navarro', 'Placide', 'Lopez']
  },
  Oceania: {
    strikers: ['Taua', 'Kalu', 'Mara', 'Smith', 'Fiti', 'Vaea', 'Wood', 'Singh', 'Krishna'],
    midfielders: ['Kainoa', 'Tuipulotu', 'Faamausili', 'Mani', 'Keane', 'Thomas', 'Howieson'],
    defenders: ['Tupou', 'Lafaele', 'Tamanisau', 'Hills', 'Boxall', 'Reid'],
    goalkeepers: ['Niko', 'Baker', 'Fonua', 'Sail']
  }
};

function normalizeCountryId(id: string): string {
  const upper = (id || '').toUpperCase().trim();
  if (upper === 'DE' || upper === 'DEU' || upper === 'GERMAN' || upper === 'GERMANY') return 'GER';
  if (upper === 'AR' || upper === 'ARG' || upper === 'ARGENTINA') return 'ARG';
  if (upper === 'FR' || upper === 'FRA' || upper === 'FRANCE') return 'FRA';
  if (upper === 'BR' || upper === 'BRA' || upper === 'BRAZIL') return 'BRA';
  if (upper === 'ES' || upper === 'ESP' || upper === 'SPAIN') return 'ESP';
  if (upper === 'PT' || upper === 'POR' || upper === 'PORTUGAL') return 'POR';
  if (upper === 'IT' || upper === 'ITA' || upper === 'ITALY') return 'ITA';
  if (upper === 'GB' || upper === 'ENG' || upper === 'ENGLAND') return 'ENG';
  return upper;
}

export function getRandomPlayerName(
  countryId: string,
  region: string,
  position: 'strikers' | 'midfielders' | 'defenders' | 'goalkeepers' = 'strikers'
): string {
  const upperId = normalizeCountryId(countryId);

  if (SPECIFIC_COUNTRY_BANKS[upperId] && SPECIFIC_COUNTRY_BANKS[upperId][position]?.length > 0) {
    const list = SPECIFIC_COUNTRY_BANKS[upperId][position];
    return list[Math.floor(Math.random() * list.length)];
  }

  // Normalize region string
  let regKey = 'Europe';
  const normRegion = (region || '').toLowerCase();
  if (normRegion.includes('africa')) regKey = 'Africa';
  else if (normRegion.includes('asia')) regKey = 'Asia';
  else if (normRegion.includes('america') || normRegion.includes('caribbean')) regKey = 'Americas';
  else if (normRegion.includes('oceania')) regKey = 'Oceania';
  else if (normRegion.includes('europe')) regKey = 'Europe';

  const regBank = REGIONAL_NAME_BANKS[regKey] || REGIONAL_NAME_BANKS.Europe;
  const list = regBank[position] || regBank.strikers;
  return list[Math.floor(Math.random() * list.length)];
}

export interface FootballPlayerProfile {
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'ST';
  ovr: number;
}

export function getFullFootballSquad(countryId: string, region: string): FootballPlayerProfile[] {
  const gk = getRandomPlayerName(countryId, region, 'goalkeepers');
  const d1 = getRandomPlayerName(countryId, region, 'defenders');
  const d2 = getRandomPlayerName(countryId, region, 'defenders');
  const d3 = getRandomPlayerName(countryId, region, 'defenders');
  const d4 = getRandomPlayerName(countryId, region, 'defenders');
  const m1 = getRandomPlayerName(countryId, region, 'midfielders');
  const m2 = getRandomPlayerName(countryId, region, 'midfielders');
  const m3 = getRandomPlayerName(countryId, region, 'midfielders');
  const m4 = getRandomPlayerName(countryId, region, 'midfielders');
  const s1 = getRandomPlayerName(countryId, region, 'strikers');
  const s2 = getRandomPlayerName(countryId, region, 'strikers');

  // Deduplicate names if random selection overlaps
  const squadNames = Array.from(new Set([gk, d1, d2, d3, d4, m1, m2, m3, m4, s1, s2]));
  const positions: Array<'GK' | 'DEF' | 'MID' | 'ST'> = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'ST', 'ST'];

  return squadNames.map((name, i) => ({
    name,
    position: positions[i] || 'ST',
    ovr: Math.floor(Math.random() * 12) + 84 // 84 to 95 OVR
  }));
}

