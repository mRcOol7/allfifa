import { Country } from '../types/simulator';

// Comprehensive fallback dataset for all major and minor nations on Earth (~210 nations)
export const FALLBACK_COUNTRIES_DATA: Country[] = [
  {
    id: 'ARG', cca2: 'AR', name: 'Argentina', officialName: 'Argentine Republic',
    flagSvg: 'https://flagcdn.com/ar.svg', flagPng: 'https://flagcdn.com/w320/ar.png',
    region: 'Americas', subregion: 'South America', population: 45376763, capital: 'Buenos Aires',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vxvtut1420658428.png',
    ratings: { att: 91, mid: 88, def: 86, gk: 87, overall: 89 }
  },
  {
    id: 'FRA', cca2: 'FR', name: 'France', officialName: 'French Republic',
    flagSvg: 'https://flagcdn.com/fr.svg', flagPng: 'https://flagcdn.com/w320/fr.png',
    region: 'Europe', subregion: 'Western Europe', population: 67391582, capital: 'Paris',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/qqurpw1420658826.png',
    ratings: { att: 90, mid: 89, def: 88, gk: 87, overall: 89 }
  },
  {
    id: 'BRA', cca2: 'BR', name: 'Brazil', officialName: 'Federative Republic of Brazil',
    flagSvg: 'https://flagcdn.com/br.svg', flagPng: 'https://flagcdn.com/w320/br.png',
    region: 'Americas', subregion: 'South America', population: 212559409, capital: 'Brasília',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/576x311548171095.png',
    ratings: { att: 89, mid: 87, def: 86, gk: 88, overall: 88 }
  },
  {
    id: 'ESP', cca2: 'ES', name: 'Spain', officialName: 'Kingdom of Spain',
    flagSvg: 'https://flagcdn.com/es.svg', flagPng: 'https://flagcdn.com/w320/es.png',
    region: 'Europe', subregion: 'Southern Europe', population: 47351567, capital: 'Madrid',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yutxyx1420659616.png',
    ratings: { att: 88, mid: 90, def: 87, gk: 86, overall: 88 }
  },
  {
    id: 'ENG', cca2: 'GB', name: 'England', officialName: 'England National Football Team',
    flagSvg: 'https://flagcdn.com/gb-eng.svg', flagPng: 'https://flagcdn.com/w320/gb-eng.png',
    region: 'Europe', subregion: 'Northern Europe', population: 56286961, capital: 'London',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vquxrr1420658498.png',
    ratings: { att: 89, mid: 87, def: 86, gk: 84, overall: 87 }
  },
  {
    id: 'GER', cca2: 'DE', name: 'Germany', officialName: 'Federal Republic of Germany',
    flagSvg: 'https://flagcdn.com/de.svg', flagPng: 'https://flagcdn.com/w320/de.png',
    region: 'Europe', subregion: 'Western Europe', population: 83240525, capital: 'Berlin',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uwyqrr1420658593.png',
    ratings: { att: 87, mid: 87, def: 85, gk: 88, overall: 86 }
  },
  {
    id: 'POR', cca2: 'PT', name: 'Portugal', officialName: 'Portuguese Republic',
    flagSvg: 'https://flagcdn.com/pt.svg', flagPng: 'https://flagcdn.com/w320/pt.png',
    region: 'Europe', subregion: 'Southern Europe', population: 10305564, capital: 'Lisbon',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/ssyrtw1420659350.png',
    ratings: { att: 88, mid: 87, def: 85, gk: 85, overall: 86 }
  },
  {
    id: 'ITA', cca2: 'IT', name: 'Italy', officialName: 'Italian Republic',
    flagSvg: 'https://flagcdn.com/it.svg', flagPng: 'https://flagcdn.com/w320/it.png',
    region: 'Europe', subregion: 'Southern Europe', population: 59554023, capital: 'Rome',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xvtupy1420658931.png',
    ratings: { att: 83, mid: 85, def: 87, gk: 88, overall: 85 }
  },
  {
    id: 'NED', cca2: 'NL', name: 'Netherlands', officialName: 'Kingdom of the Netherlands',
    flagSvg: 'https://flagcdn.com/nl.svg', flagPng: 'https://flagcdn.com/w320/nl.png',
    region: 'Europe', subregion: 'Western Europe', population: 17441139, capital: 'Amsterdam',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwsutx1420659083.png',
    ratings: { att: 85, mid: 86, def: 87, gk: 83, overall: 85 }
  },
  {
    id: 'BEL', cca2: 'BE', name: 'Belgium', officialName: 'Kingdom of Belgium',
    flagSvg: 'https://flagcdn.com/be.svg', flagPng: 'https://flagcdn.com/w320/be.png',
    region: 'Europe', subregion: 'Western Europe', population: 11555997, capital: 'Brussels',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/0sxtxx1420658392.png',
    ratings: { att: 84, mid: 85, def: 81, gk: 87, overall: 84 }
  },
  {
    id: 'CRO', cca2: 'HR', name: 'Croatia', officialName: 'Republic of Croatia',
    flagSvg: 'https://flagcdn.com/hr.svg', flagPng: 'https://flagcdn.com/w320/hr.png',
    region: 'Europe', subregion: 'Southern Europe', population: 4047200, capital: 'Zagreb',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyryr1420658474.png',
    ratings: { att: 82, mid: 87, def: 83, gk: 84, overall: 84 }
  },
  {
    id: 'URU', cca2: 'UY', name: 'Uruguay', officialName: 'Oriental Republic of Uruguay',
    flagSvg: 'https://flagcdn.com/uy.svg', flagPng: 'https://flagcdn.com/w320/uy.png',
    region: 'Americas', subregion: 'South America', population: 3473727, capital: 'Montevideo',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/txryuv1420659779.png',
    ratings: { att: 84, mid: 82, def: 83, gk: 81, overall: 83 }
  },
  {
    id: 'MAR', cca2: 'MA', name: 'Morocco', officialName: 'Kingdom of Morocco',
    flagSvg: 'https://flagcdn.com/ma.svg', flagPng: 'https://flagcdn.com/w320/ma.png',
    region: 'Africa', subregion: 'Northern Africa', population: 36910558, capital: 'Rabat',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/twxxtv1420659058.png',
    ratings: { att: 82, mid: 84, def: 84, gk: 85, overall: 83 }
  },
  {
    id: 'JPN', cca2: 'JP', name: 'Japan', officialName: 'Japan',
    flagSvg: 'https://flagcdn.com/jp.svg', flagPng: 'https://flagcdn.com/w320/jp.png',
    region: 'Asia', subregion: 'Eastern Asia', population: 125836021, capital: 'Tokyo',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/trtyuv1420658971.png',
    ratings: { att: 82, mid: 83, def: 81, gk: 79, overall: 82 }
  },
  {
    id: 'COL', cca2: 'CO', name: 'Colombia', officialName: 'Republic of Colombia',
    flagSvg: 'https://flagcdn.com/co.svg', flagPng: 'https://flagcdn.com/w320/co.png',
    region: 'Americas', subregion: 'South America', population: 50882884, capital: 'Bogotá',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyvwx1420658457.png',
    ratings: { att: 83, mid: 82, def: 81, gk: 80, overall: 82 }
  },
  {
    id: 'USA', cca2: 'US', name: 'United States', officialName: 'United States of America',
    flagSvg: 'https://flagcdn.com/us.svg', flagPng: 'https://flagcdn.com/w320/us.png',
    region: 'Americas', subregion: 'North America', population: 329484123, capital: 'Washington, D.C.',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyxyr1420659800.png',
    ratings: { att: 81, mid: 80, def: 79, gk: 81, overall: 80 }
  },
  {
    id: 'SEN', cca2: 'SN', name: 'Senegal', officialName: 'Republic of Senegal',
    flagSvg: 'https://flagcdn.com/sn.svg', flagPng: 'https://flagcdn.com/w320/sn.png',
    region: 'Africa', subregion: 'Western Africa', population: 16743930, capital: 'Dakar',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yvuvxs1420659424.png',
    ratings: { att: 81, mid: 80, def: 81, gk: 80, overall: 80 }
  },
  {
    id: 'KOR', cca2: 'KR', name: 'South Korea', officialName: 'Republic of Korea',
    flagSvg: 'https://flagcdn.com/kr.svg', flagPng: 'https://flagcdn.com/w320/kr.png',
    region: 'Asia', subregion: 'Eastern Asia', population: 51780579, capital: 'Seoul',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uxtrqw1420659546.png',
    ratings: { att: 83, mid: 80, def: 79, gk: 78, overall: 80 }
  },
  {
    id: 'MEX', cca2: 'MX', name: 'Mexico', officialName: 'United Mexican States',
    flagSvg: 'https://flagcdn.com/mx.svg', flagPng: 'https://flagcdn.com/w320/mx.png',
    region: 'Americas', subregion: 'North America', population: 128932753, capital: 'Mexico City',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uvvwxs1420659039.png',
    ratings: { att: 79, mid: 79, def: 78, gk: 80, overall: 79 }
  },
  {
    id: 'SUI', cca2: 'CH', name: 'Switzerland', officialName: 'Swiss Confederation',
    flagSvg: 'https://flagcdn.com/ch.svg', flagPng: 'https://flagcdn.com/w320/ch.png',
    region: 'Europe', subregion: 'Western Europe', population: 8636896, capital: 'Bern',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vuvvwx1420659648.png',
    ratings: { att: 79, mid: 81, def: 81, gk: 83, overall: 80 }
  },
  {
    id: 'DEN', cca2: 'DK', name: 'Denmark', officialName: 'Kingdom of Denmark',
    flagSvg: 'https://flagcdn.com/dk.svg', flagPng: 'https://flagcdn.com/w320/dk.png',
    region: 'Europe', subregion: 'Northern Europe', population: 5831404, capital: 'Copenhagen',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vrxutx1420658485.png',
    ratings: { att: 79, mid: 81, def: 80, gk: 83, overall: 80 }
  },
  {
    id: 'AUT', cca2: 'AT', name: 'Austria', officialName: 'Republic of Austria',
    flagSvg: 'https://flagcdn.com/at.svg', flagPng: 'https://flagcdn.com/w320/at.png',
    region: 'Europe', subregion: 'Central Europe', population: 8916864, capital: 'Vienna',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xuvvww1420658378.png',
    ratings: { att: 79, mid: 81, def: 79, gk: 78, overall: 79 }
  },
  {
    id: 'TUR', cca2: 'TR', name: 'Turkey', officialName: 'Republic of Türkiye',
    flagSvg: 'https://flagcdn.com/tr.svg', flagPng: 'https://flagcdn.com/w320/tr.png',
    region: 'Europe', subregion: 'Southern Europe', population: 84339067, capital: 'Ankara',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyvvy1420659755.png',
    ratings: { att: 80, mid: 80, def: 79, gk: 78, overall: 79 }
  },
  {
    id: 'UKR', cca2: 'UA', name: 'Ukraine', officialName: 'Ukraine',
    flagSvg: 'https://flagcdn.com/ua.svg', flagPng: 'https://flagcdn.com/w320/ua.png',
    region: 'Europe', subregion: 'Eastern Europe', population: 44134693, capital: 'Kyiv',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vxvtux1420659767.png',
    ratings: { att: 80, mid: 80, def: 78, gk: 82, overall: 79 }
  },
  {
    id: 'EGY', cca2: 'EG', name: 'Egypt', officialName: 'Arab Republic of Egypt',
    flagSvg: 'https://flagcdn.com/eg.svg', flagPng: 'https://flagcdn.com/w320/eg.png',
    region: 'Africa', subregion: 'Northern Africa', population: 102334403, capital: 'Cairo',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vtuyvw1420658514.png',
    ratings: { att: 83, mid: 76, def: 76, gk: 77, overall: 78 }
  },
  {
    id: 'NGA', cca2: 'NG', name: 'Nigeria', officialName: 'Federal Republic of Nigeria',
    flagSvg: 'https://flagcdn.com/ng.svg', flagPng: 'https://flagcdn.com/w320/ng.png',
    region: 'Africa', subregion: 'Western Africa', population: 206139587, capital: 'Abuja',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyvyu1420659107.png',
    ratings: { att: 83, mid: 77, def: 76, gk: 76, overall: 78 }
  },
  {
    id: 'CMR', cca2: 'CM', name: 'Cameroon', officialName: 'Republic of Cameroon',
    flagSvg: 'https://flagcdn.com/cm.svg', flagPng: 'https://flagcdn.com/w320/cm.png',
    region: 'Africa', subregion: 'Middle Africa', population: 26545864, capital: 'Yaoundé',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yvqwxv1420658444.png',
    ratings: { att: 78, mid: 77, def: 76, gk: 80, overall: 77 }
  },
  {
    id: 'AUS', cca2: 'AU', name: 'Australia', officialName: 'Commonwealth of Australia',
    flagSvg: 'https://flagcdn.com/au.svg', flagPng: 'https://flagcdn.com/w320/au.png',
    region: 'Oceania', subregion: 'Australia and New Zealand', population: 25687041, capital: 'Canberra',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/tuxvsy1420658368.png',
    ratings: { att: 76, mid: 76, def: 76, gk: 78, overall: 76 }
  },
  {
    id: 'CAN', cca2: 'CA', name: 'Canada', officialName: 'Canada',
    flagSvg: 'https://flagcdn.com/ca.svg', flagPng: 'https://flagcdn.com/w320/ca.png',
    region: 'Americas', subregion: 'North America', population: 38005238, capital: 'Ottawa',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yxtuvy1420658449.png',
    ratings: { att: 80, mid: 76, def: 75, gk: 76, overall: 77 }
  },
  {
    id: 'SWE', cca2: 'SE', name: 'Sweden', officialName: 'Kingdom of Sweden',
    flagSvg: 'https://flagcdn.com/se.svg', flagPng: 'https://flagcdn.com/w320/se.png',
    region: 'Europe', subregion: 'Northern Europe', population: 10353442, capital: 'Stockholm',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/wyvwuu1420659637.png',
    ratings: { att: 80, mid: 77, def: 78, gk: 77, overall: 78 }
  },
  {
    id: 'NOR', cca2: 'NO', name: 'Norway', officialName: 'Kingdom of Norway',
    flagSvg: 'https://flagcdn.com/no.svg', flagPng: 'https://flagcdn.com/w320/no.png',
    region: 'Europe', subregion: 'Northern Europe', population: 5379475, capital: 'Oslo',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vwutxx1420659121.png',
    ratings: { att: 85, mid: 80, def: 75, gk: 75, overall: 79 }
  },
  {
    id: 'POL', cca2: 'PL', name: 'Poland', officialName: 'Republic of Poland',
    flagSvg: 'https://flagcdn.com/pl.svg', flagPng: 'https://flagcdn.com/w320/pl.png',
    region: 'Europe', subregion: 'Central Europe', population: 37958138, capital: 'Warsaw',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vryvvw1420659336.png',
    ratings: { att: 82, mid: 76, def: 76, gk: 81, overall: 78 }
  },
  {
    id: 'SRB', cca2: 'RS', name: 'Serbia', officialName: 'Republic of Serbia',
    flagSvg: 'https://flagcdn.com/rs.svg', flagPng: 'https://flagcdn.com/w320/rs.png',
    region: 'Europe', subregion: 'Southern Europe', population: 6908224, capital: 'Belgrade',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yvvvvw1420659437.png',
    ratings: { att: 81, mid: 79, def: 77, gk: 77, overall: 78 }
  },
  {
    id: 'CHI', cca2: 'CL', name: 'Chile', officialName: 'Republic of Chile',
    flagSvg: 'https://flagcdn.com/cl.svg', flagPng: 'https://flagcdn.com/w320/cl.png',
    region: 'Americas', subregion: 'South America', population: 19116209, capital: 'Santiago',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vrxvwu1420658463.png',
    ratings: { att: 76, mid: 76, def: 76, gk: 75, overall: 76 }
  },
  {
    id: 'PER', cca2: 'PE', name: 'Peru', officialName: 'Republic of Peru',
    flagSvg: 'https://flagcdn.com/pe.svg', flagPng: 'https://flagcdn.com/w320/pe.png',
    region: 'Americas', subregion: 'South America', population: 32971846, capital: 'Lima',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yvvwut1420659325.png',
    ratings: { att: 75, mid: 75, def: 75, gk: 76, overall: 75 }
  },
  {
    id: 'ECU', cca2: 'EC', name: 'Ecuador', officialName: 'Republic of Ecuador',
    flagSvg: 'https://flagcdn.com/ec.svg', flagPng: 'https://flagcdn.com/w320/ec.png',
    region: 'Americas', subregion: 'South America', population: 17643060, capital: 'Quito',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/txvvyu1420658506.png',
    ratings: { att: 78, mid: 79, def: 80, gk: 77, overall: 78 }
  },
  {
    id: 'PAR', cca2: 'PY', name: 'Paraguay', officialName: 'Republic of Paraguay',
    flagSvg: 'https://flagcdn.com/py.svg', flagPng: 'https://flagcdn.com/w320/py.png',
    region: 'Americas', subregion: 'South America', population: 7132530, capital: 'Asunción',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyuvw1420659312.png',
    ratings: { att: 74, mid: 75, def: 77, gk: 74, overall: 75 }
  },
  {
    id: 'VEN', cca2: 'VE', name: 'Venezuela', officialName: 'Bolivarian Republic of Venezuela',
    flagSvg: 'https://flagcdn.com/ve.svg', flagPng: 'https://flagcdn.com/w320/ve.png',
    region: 'Americas', subregion: 'South America', population: 28435943, capital: 'Caracas',
    confederation: 'CONMEBOL', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vrxvvx1420659828.png',
    ratings: { att: 77, mid: 75, def: 74, gk: 74, overall: 75 }
  },
  {
    id: 'SCO', cca2: 'GB', name: 'Scotland', officialName: 'Scotland National Football Team',
    flagSvg: 'https://flagcdn.com/gb-sct.svg', flagPng: 'https://flagcdn.com/w320/gb-sct.png',
    region: 'Europe', subregion: 'Northern Europe', population: 5466000, capital: 'Edinburgh',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uxtvwx1420659404.png',
    ratings: { att: 77, mid: 78, def: 77, gk: 75, overall: 77 }
  },
  {
    id: 'WAL', cca2: 'GB', name: 'Wales', officialName: 'Wales National Football Team',
    flagSvg: 'https://flagcdn.com/gb-wls.svg', flagPng: 'https://flagcdn.com/w320/gb-wls.png',
    region: 'Europe', subregion: 'Northern Europe', population: 3152879, capital: 'Cardiff',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uwwxxv1420659846.png',
    ratings: { att: 76, mid: 76, def: 75, gk: 75, overall: 76 }
  },
  {
    id: 'IRL', cca2: 'IE', name: 'Ireland', officialName: 'Republic of Ireland',
    flagSvg: 'https://flagcdn.com/ie.svg', flagPng: 'https://flagcdn.com/w320/ie.png',
    region: 'Europe', subregion: 'Northern Europe', population: 4994724, capital: 'Dublin',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vwwuvt1420658914.png',
    ratings: { att: 74, mid: 75, def: 76, gk: 76, overall: 75 }
  },
  {
    id: 'CZE', cca2: 'CZ', name: 'Czech Republic', officialName: 'Czech Republic',
    flagSvg: 'https://flagcdn.com/cz.svg', flagPng: 'https://flagcdn.com/w320/cz.png',
    region: 'Europe', subregion: 'Central Europe', population: 10698896, capital: 'Prague',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xuvxvw1420658479.png',
    ratings: { att: 77, mid: 77, def: 76, gk: 75, overall: 76 }
  },
  {
    id: 'HUN', cca2: 'HU', name: 'Hungary', officialName: 'Hungary',
    flagSvg: 'https://flagcdn.com/hu.svg', flagPng: 'https://flagcdn.com/w320/hu.png',
    region: 'Europe', subregion: 'Central Europe', population: 9749763, capital: 'Budapest',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uxtvvx1420658682.png',
    ratings: { att: 78, mid: 77, def: 77, gk: 77, overall: 77 }
  },
  {
    id: 'ROU', cca2: 'RO', name: 'Romania', officialName: 'Romania',
    flagSvg: 'https://flagcdn.com/ro.svg', flagPng: 'https://flagcdn.com/w320/ro.png',
    region: 'Europe', subregion: 'Southeast Europe', population: 19286123, capital: 'Bucharest',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xuvxvu1420659376.png',
    ratings: { att: 75, mid: 75, def: 75, gk: 74, overall: 75 }
  },
  {
    id: 'SVK', cca2: 'SK', name: 'Slovakia', officialName: 'Slovak Republic',
    flagSvg: 'https://flagcdn.com/sk.svg', flagPng: 'https://flagcdn.com/w320/sk.png',
    region: 'Europe', subregion: 'Central Europe', population: 5458827, capital: 'Bratislava',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/sk.svg',
    ratings: { att: 75, mid: 76, def: 76, gk: 75, overall: 75 }
  },
  {
    id: 'SVN', cca2: 'SI', name: 'Slovenia', officialName: 'Republic of Slovenia',
    flagSvg: 'https://flagcdn.com/si.svg', flagPng: 'https://flagcdn.com/w320/si.png',
    region: 'Europe', subregion: 'Central Europe', population: 2100126, capital: 'Ljubljana',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/si.svg',
    ratings: { att: 77, mid: 74, def: 75, gk: 84, overall: 76 }
  },
  {
    id: 'GEO', cca2: 'GE', name: 'Georgia', officialName: 'Georgia',
    flagSvg: 'https://flagcdn.com/ge.svg', flagPng: 'https://flagcdn.com/w320/ge.png',
    region: 'Europe', subregion: 'Eastern Europe', population: 3714000, capital: 'Tbilisi',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/ge.svg',
    ratings: { att: 81, mid: 74, def: 73, gk: 82, overall: 76 }
  },
  {
    id: 'ALG', cca2: 'DZ', name: 'Algeria', officialName: 'People\'s Democratic Republic of Algeria',
    flagSvg: 'https://flagcdn.com/dz.svg', flagPng: 'https://flagcdn.com/w320/dz.png',
    region: 'Africa', subregion: 'Northern Africa', population: 44700000, capital: 'Algiers',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vwyuvt1420658327.png',
    ratings: { att: 79, mid: 78, def: 75, gk: 74, overall: 77 }
  },
  {
    id: 'CIV', cca2: 'CI', name: 'Ivory Coast', officialName: 'Republic of Côte d\'Ivoire',
    flagSvg: 'https://flagcdn.com/ci.svg', flagPng: 'https://flagcdn.com/w320/ci.png',
    region: 'Africa', subregion: 'Western Africa', population: 26378274, capital: 'Yamoussoukro',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vxvvwu1420658943.png',
    ratings: { att: 81, mid: 80, def: 79, gk: 76, overall: 79 }
  },
  {
    id: 'TUN', cca2: 'TN', name: 'Tunisia', officialName: 'Republic of Tunisia',
    flagSvg: 'https://flagcdn.com/tn.svg', flagPng: 'https://flagcdn.com/w320/tn.png',
    region: 'Africa', subregion: 'Northern Africa', population: 11818619, capital: 'Tunis',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uxtvvy1420659742.png',
    ratings: { att: 74, mid: 75, def: 76, gk: 74, overall: 75 }
  },
  {
    id: 'KSA', cca2: 'SA', name: 'Saudi Arabia', officialName: 'Kingdom of Saudi Arabia',
    flagSvg: 'https://flagcdn.com/sa.svg', flagPng: 'https://flagcdn.com/w320/sa.png',
    region: 'Asia', subregion: 'Western Asia', population: 34813871, capital: 'Riyadh',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwyvxt1420659392.png',
    ratings: { att: 74, mid: 74, def: 73, gk: 75, overall: 74 }
  },
  {
    id: 'IRN', cca2: 'IR', name: 'Iran', officialName: 'Islamic Republic of Iran',
    flagSvg: 'https://flagcdn.com/ir.svg', flagPng: 'https://flagcdn.com/w320/ir.png',
    region: 'Asia', subregion: 'Southern Asia', population: 83992949, capital: 'Tehran',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vwyxvw1420658899.png',
    ratings: { att: 78, mid: 74, def: 75, gk: 76, overall: 76 }
  },
  {
    id: 'QAT', cca2: 'QA', name: 'Qatar', officialName: 'State of Qatar',
    flagSvg: 'https://flagcdn.com/qa.svg', flagPng: 'https://flagcdn.com/w320/qa.png',
    region: 'Asia', subregion: 'Western Asia', population: 2881053, capital: 'Doha',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xuvxyw1420659364.png',
    ratings: { att: 75, mid: 74, def: 73, gk: 73, overall: 74 }
  },
  {
    id: 'IRQ', cca2: 'IQ', name: 'Iraq', officialName: 'Republic of Iraq',
    flagSvg: 'https://flagcdn.com/iq.svg', flagPng: 'https://flagcdn.com/w320/iq.png',
    region: 'Asia', subregion: 'Western Asia', population: 40222493, capital: 'Baghdad',
    confederation: 'AFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/uwyxvu1420658887.png',
    ratings: { att: 74, mid: 72, def: 72, gk: 72, overall: 73 }
  },
  {
    id: 'UZB', cca2: 'UZ', name: 'Uzbekistan', officialName: 'Republic of Uzbekistan',
    flagSvg: 'https://flagcdn.com/uz.svg', flagPng: 'https://flagcdn.com/w320/uz.png',
    region: 'Asia', subregion: 'Central Asia', population: 34232050, capital: 'Tashkent',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/uz.svg',
    ratings: { att: 73, mid: 73, def: 72, gk: 71, overall: 72 }
  },
  {
    id: 'NZL', cca2: 'NZ', name: 'New Zealand', officialName: 'New Zealand',
    flagSvg: 'https://flagcdn.com/nz.svg', flagPng: 'https://flagcdn.com/w320/nz.png',
    region: 'Oceania', subregion: 'Australia and New Zealand', population: 5084300, capital: 'Wellington',
    confederation: 'OFC', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/txvvwx1420659097.png',
    ratings: { att: 72, mid: 70, def: 72, gk: 71, overall: 71 }
  },
  {
    id: 'RSA', cca2: 'ZA', name: 'South Africa', officialName: 'Republic of South Africa',
    flagSvg: 'https://flagcdn.com/za.svg', flagPng: 'https://flagcdn.com/w320/za.png',
    region: 'Africa', subregion: 'Southern Africa', population: 59308690, capital: 'Pretoria',
    confederation: 'CAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwywxv1420659559.png',
    ratings: { att: 73, mid: 72, def: 72, gk: 74, overall: 73 }
  },
  {
    id: 'CRC', cca2: 'CR', name: 'Costa Rica', officialName: 'Republic of Costa Rica',
    flagSvg: 'https://flagcdn.com/cr.svg', flagPng: 'https://flagcdn.com/w320/cr.png',
    region: 'Americas', subregion: 'Central America', population: 5094118, capital: 'San José',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/yvuvvv1420658469.png',
    ratings: { att: 71, mid: 72, def: 73, gk: 77, overall: 73 }
  },
  {
    id: 'JAM', cca2: 'JM', name: 'Jamaica', officialName: 'Jamaica',
    flagSvg: 'https://flagcdn.com/jm.svg', flagPng: 'https://flagcdn.com/w320/jm.png',
    region: 'Americas', subregion: 'Caribbean', population: 2961167, capital: 'Kingston',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xuvvwt1420658957.png',
    ratings: { att: 75, mid: 71, def: 72, gk: 72, overall: 73 }
  },
  {
    id: 'HON', cca2: 'HN', name: 'Honduras', officialName: 'Republic of Honduras',
    flagSvg: 'https://flagcdn.com/hn.svg', flagPng: 'https://flagcdn.com/w320/hn.png',
    region: 'Americas', subregion: 'Central America', population: 9904607, capital: 'Tegucigalpa',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/vrxwxv1420658668.png',
    ratings: { att: 70, mid: 70, def: 70, gk: 70, overall: 70 }
  },
  {
    id: 'PAN', cca2: 'PA', name: 'Panama', officialName: 'Republic of Panama',
    flagSvg: 'https://flagcdn.com/pa.svg', flagPng: 'https://flagcdn.com/w320/pa.png',
    region: 'Americas', subregion: 'Central America', population: 4314767, capital: 'Panama City',
    confederation: 'CONCACAF', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/txvwwu1420659300.png',
    ratings: { att: 71, mid: 71, def: 71, gk: 71, overall: 71 }
  },
  {
    id: 'ISL', cca2: 'IS', name: 'Iceland', officialName: 'Iceland',
    flagSvg: 'https://flagcdn.com/is.svg', flagPng: 'https://flagcdn.com/w320/is.png',
    region: 'Europe', subregion: 'Northern Europe', population: 366425, capital: 'Reykjavík',
    confederation: 'UEFA', crestUrl: 'https://media.thesportsdb.com/images/media/team/badge/xwywxu1420658872.png',
    ratings: { att: 72, mid: 73, def: 72, gk: 71, overall: 72 }
  },
  {
    id: 'IND', cca2: 'IN', name: 'India', officialName: 'Republic of India',
    flagSvg: 'https://flagcdn.com/in.svg', flagPng: 'https://flagcdn.com/w320/in.png',
    region: 'Asia', subregion: 'Southern Asia', population: 1380004385, capital: 'New Delhi',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/in.svg',
    ratings: { att: 68, mid: 67, def: 66, gk: 69, overall: 67 }
  },
  {
    id: 'CHN', cca2: 'CN', name: 'China', officialName: 'People\'s Republic of China',
    flagSvg: 'https://flagcdn.com/cn.svg', flagPng: 'https://flagcdn.com/w320/cn.png',
    region: 'Asia', subregion: 'Eastern Asia', population: 1402112000, capital: 'Beijing',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/cn.svg',
    ratings: { att: 69, mid: 68, def: 67, gk: 67, overall: 68 }
  },
  {
    id: 'VIE', cca2: 'VN', name: 'Vietnam', officialName: 'Socialist Republic of Vietnam',
    flagSvg: 'https://flagcdn.com/vn.svg', flagPng: 'https://flagcdn.com/w320/vn.png',
    region: 'Asia', subregion: 'South-Eastern Asia', population: 97338579, capital: 'Hanoi',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/vn.svg',
    ratings: { att: 67, mid: 66, def: 66, gk: 65, overall: 66 }
  },
  {
    id: 'THA', cca2: 'TH', name: 'Thailand', officialName: 'Kingdom of Thailand',
    flagSvg: 'https://flagcdn.com/th.svg', flagPng: 'https://flagcdn.com/w320/th.png',
    region: 'Asia', subregion: 'South-Eastern Asia', population: 69799978, capital: 'Bangkok',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/th.svg',
    ratings: { att: 68, mid: 67, def: 66, gk: 65, overall: 67 }
  },
  {
    id: 'IDN', cca2: 'ID', name: 'Indonesia', officialName: 'Republic of Indonesia',
    flagSvg: 'https://flagcdn.com/id.svg', flagPng: 'https://flagcdn.com/w320/id.png',
    region: 'Asia', subregion: 'South-Eastern Asia', population: 273523615, capital: 'Jakarta',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/id.svg',
    ratings: { att: 67, mid: 66, def: 67, gk: 65, overall: 66 }
  },
  {
    id: 'MAS', cca2: 'MY', name: 'Malaysia', officialName: 'Malaysia',
    flagSvg: 'https://flagcdn.com/my.svg', flagPng: 'https://flagcdn.com/w320/my.png',
    region: 'Asia', subregion: 'South-Eastern Asia', population: 32365999, capital: 'Kuala Lumpur',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/my.svg',
    ratings: { att: 65, mid: 64, def: 64, gk: 63, overall: 64 }
  },
  {
    id: 'FIJ', cca2: 'FJ', name: 'Fiji', officialName: 'Republic of Fiji',
    flagSvg: 'https://flagcdn.com/fj.svg', flagPng: 'https://flagcdn.com/w320/fj.png',
    region: 'Oceania', subregion: 'Melanesia', population: 896445, capital: 'Suva',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/fj.svg',
    ratings: { att: 61, mid: 60, def: 60, gk: 59, overall: 60 }
  },
  {
    id: 'SOL', cca2: 'SB', name: 'Solomon Islands', officialName: 'Solomon Islands',
    flagSvg: 'https://flagcdn.com/sb.svg', flagPng: 'https://flagcdn.com/w320/sb.png',
    region: 'Oceania', subregion: 'Melanesia', population: 686884, capital: 'Honiara',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/sb.svg',
    ratings: { att: 62, mid: 61, def: 60, gk: 59, overall: 61 }
  },
  {
    id: 'TAH', cca2: 'PF', name: 'Tahiti', officialName: 'French Polynesia',
    flagSvg: 'https://flagcdn.com/pf.svg', flagPng: 'https://flagcdn.com/w320/pf.png',
    region: 'Oceania', subregion: 'Polynesia', population: 280908, capital: 'Papeete',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/pf.svg',
    ratings: { att: 60, mid: 59, def: 59, gk: 58, overall: 59 }
  },
  {
    id: 'SMR', cca2: 'SM', name: 'San Marino', officialName: 'Republic of San Marino',
    flagSvg: 'https://flagcdn.com/sm.svg', flagPng: 'https://flagcdn.com/w320/sm.png',
    region: 'Europe', subregion: 'Southern Europe', population: 33938, capital: 'City of San Marino',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/sm.svg',
    ratings: { att: 53, mid: 54, def: 54, gk: 56, overall: 54 }
  },
  {
    id: 'AND', cca2: 'AD', name: 'Andorra', officialName: 'Principality of Andorra',
    flagSvg: 'https://flagcdn.com/ad.svg', flagPng: 'https://flagcdn.com/w320/ad.png',
    region: 'Europe', subregion: 'Southern Europe', population: 77265, capital: 'Andorra la Vella',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/ad.svg',
    ratings: { att: 56, mid: 57, def: 58, gk: 59, overall: 57 }
  },
  {
    id: 'LIE', cca2: 'LI', name: 'Liechtenstein', officialName: 'Principality of Liechtenstein',
    flagSvg: 'https://flagcdn.com/li.svg', flagPng: 'https://flagcdn.com/w320/li.png',
    region: 'Europe', subregion: 'Western Europe', population: 38128, capital: 'Vaduz',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/li.svg',
    ratings: { att: 55, mid: 56, def: 57, gk: 57, overall: 56 }
  },
  {
    id: 'GIB', cca2: 'GI', name: 'Gibraltar', officialName: 'Gibraltar',
    flagSvg: 'https://flagcdn.com/gi.svg', flagPng: 'https://flagcdn.com/w320/gi.png',
    region: 'Europe', subregion: 'Southern Europe', population: 33691, capital: 'Gibraltar',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/gi.svg',
    ratings: { att: 56, mid: 57, def: 57, gk: 58, overall: 57 }
  },
  {
    id: 'FRO', cca2: 'FO', name: 'Faroe Islands', officialName: 'Faroe Islands',
    flagSvg: 'https://flagcdn.com/fo.svg', flagPng: 'https://flagcdn.com/w320/fo.png',
    region: 'Europe', subregion: 'Northern Europe', population: 52912, capital: 'Tórshavn',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/fo.svg',
    ratings: { att: 62, mid: 63, def: 64, gk: 64, overall: 63 }
  },
  {
    id: 'LUX', cca2: 'LU', name: 'Luxembourg', officialName: 'Grand Duchy of Luxembourg',
    flagSvg: 'https://flagcdn.com/lu.svg', flagPng: 'https://flagcdn.com/w320/lu.png',
    region: 'Europe', subregion: 'Western Europe', population: 632275, capital: 'Luxembourg',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/lu.svg',
    ratings: { att: 68, mid: 69, def: 69, gk: 70, overall: 69 }
  },
  {
    id: 'MLT', cca2: 'MT', name: 'Malta', officialName: 'Republic of Malta',
    flagSvg: 'https://flagcdn.com/mt.svg', flagPng: 'https://flagcdn.com/w320/mt.png',
    region: 'Europe', subregion: 'Southern Europe', population: 525285, capital: 'Valletta',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/mt.svg',
    ratings: { att: 60, mid: 61, def: 62, gk: 62, overall: 61 }
  },
  {
    id: 'CYP', cca2: 'CY', name: 'Cyprus', officialName: 'Republic of Cyprus',
    flagSvg: 'https://flagcdn.com/cy.svg', flagPng: 'https://flagcdn.com/w320/cy.png',
    region: 'Europe', subregion: 'Southern Europe', population: 1207359, capital: 'Nicosia',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/cy.svg',
    ratings: { att: 66, mid: 66, def: 67, gk: 67, overall: 66 }
  },
  {
    id: 'EST', cca2: 'EE', name: 'Estonia', officialName: 'Republic of Estonia',
    flagSvg: 'https://flagcdn.com/ee.svg', flagPng: 'https://flagcdn.com/w320/ee.png',
    region: 'Europe', subregion: 'Northern Europe', population: 1331057, capital: 'Tallinn',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/ee.svg',
    ratings: { att: 64, mid: 65, def: 66, gk: 66, overall: 65 }
  },
  {
    id: 'LVA', cca2: 'LV', name: 'Latvia', officialName: 'Republic of Latvia',
    flagSvg: 'https://flagcdn.com/lv.svg', flagPng: 'https://flagcdn.com/w320/lv.png',
    region: 'Europe', subregion: 'Northern Europe', population: 1901548, capital: 'Riga',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/lv.svg',
    ratings: { att: 63, mid: 64, def: 65, gk: 65, overall: 64 }
  },
  {
    id: 'LTU', cca2: 'LT', name: 'Lithuania', officialName: 'Republic of Lithuania',
    flagSvg: 'https://flagcdn.com/lt.svg', flagPng: 'https://flagcdn.com/w320/lt.png',
    region: 'Europe', subregion: 'Northern Europe', population: 2794700, capital: 'Vilnius',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/lt.svg',
    ratings: { att: 63, mid: 64, def: 65, gk: 64, overall: 64 }
  },
  {
    id: 'BLR', cca2: 'BY', name: 'Belarus', officialName: 'Republic of Belarus',
    flagSvg: 'https://flagcdn.com/by.svg', flagPng: 'https://flagcdn.com/w320/by.png',
    region: 'Europe', subregion: 'Eastern Europe', population: 9398861, capital: 'Minsk',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/by.svg',
    ratings: { att: 67, mid: 67, def: 68, gk: 67, overall: 67 }
  },
  {
    id: 'MDA', cca2: 'MD', name: 'Moldova', officialName: 'Republic of Moldova',
    flagSvg: 'https://flagcdn.com/md.svg', flagPng: 'https://flagcdn.com/w320/md.png',
    region: 'Europe', subregion: 'Eastern Europe', population: 2617800, capital: 'Chișinău',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/md.svg',
    ratings: { att: 63, mid: 63, def: 64, gk: 64, overall: 63 }
  },
  {
    id: 'ARM', cca2: 'AM', name: 'Armenia', officialName: 'Republic of Armenia',
    flagSvg: 'https://flagcdn.com/am.svg', flagPng: 'https://flagcdn.com/w320/am.png',
    region: 'Asia', subregion: 'Western Asia', population: 2963243, capital: 'Yerevan',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/am.svg',
    ratings: { att: 71, mid: 69, def: 68, gk: 68, overall: 69 }
  },
  {
    id: 'AZE', cca2: 'AZ', name: 'Azerbaijan', officialName: 'Republic of Azerbaijan',
    flagSvg: 'https://flagcdn.com/az.svg', flagPng: 'https://flagcdn.com/w320/az.png',
    region: 'Asia', subregion: 'Western Asia', population: 10110116, capital: 'Baku',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/az.svg',
    ratings: { att: 66, mid: 66, def: 66, gk: 66, overall: 66 }
  },
  {
    id: 'KAZ', cca2: 'KZ', name: 'Kazakhstan', officialName: 'Republic of Kazakhstan',
    flagSvg: 'https://flagcdn.com/kz.svg', flagPng: 'https://flagcdn.com/w320/kz.png',
    region: 'Asia', subregion: 'Central Asia', population: 18754440, capital: 'Astana',
    confederation: 'UEFA', crestUrl: 'https://flagcdn.com/kz.svg',
    ratings: { att: 68, mid: 68, def: 68, gk: 67, overall: 68 }
  },
  {
    id: 'BOL', cca2: 'BO', name: 'Bolivia', officialName: 'Plurinational State of Bolivia',
    flagSvg: 'https://flagcdn.com/bo.svg', flagPng: 'https://flagcdn.com/w320/bo.png',
    region: 'Americas', subregion: 'South America', population: 11673021, capital: 'Sucre',
    confederation: 'CONMEBOL', crestUrl: 'https://flagcdn.com/bo.svg',
    ratings: { att: 70, mid: 70, def: 71, gk: 70, overall: 70 }
  },
  {
    id: 'CUB', cca2: 'CU', name: 'Cuba', officialName: 'Republic of Cuba',
    flagSvg: 'https://flagcdn.com/cu.svg', flagPng: 'https://flagcdn.com/w320/cu.png',
    region: 'Americas', subregion: 'Caribbean', population: 11326616, capital: 'Havana',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/cu.svg',
    ratings: { att: 63, mid: 62, def: 62, gk: 63, overall: 62 }
  },
  {
    id: 'HAI', cca2: 'HT', name: 'Haiti', officialName: 'Republic of Haiti',
    flagSvg: 'https://flagcdn.com/ht.svg', flagPng: 'https://flagcdn.com/w320/ht.png',
    region: 'Americas', subregion: 'Caribbean', population: 11402528, capital: 'Port-au-Prince',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/ht.svg',
    ratings: { att: 67, mid: 65, def: 65, gk: 65, overall: 66 }
  },
  {
    id: 'TRI', cca2: 'TT', name: 'Trinidad and Tobago', officialName: 'Republic of Trinidad and Tobago',
    flagSvg: 'https://flagcdn.com/tt.svg', flagPng: 'https://flagcdn.com/w320/tt.png',
    region: 'Americas', subregion: 'Caribbean', population: 1399488, capital: 'Port of Spain',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/tt.svg',
    ratings: { att: 66, mid: 65, def: 65, gk: 66, overall: 65 }
  },
  {
    id: 'SLV', cca2: 'SV', name: 'El Salvador', officialName: 'Republic of El Salvador',
    flagSvg: 'https://flagcdn.com/sv.svg', flagPng: 'https://flagcdn.com/w320/sv.png',
    region: 'Americas', subregion: 'Central America', population: 6486205, capital: 'San Salvador',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/sv.svg',
    ratings: { att: 67, mid: 67, def: 67, gk: 66, overall: 67 }
  },
  {
    id: 'GUA', cca2: 'GT', name: 'Guatemala', officialName: 'Republic of Guatemala',
    flagSvg: 'https://flagcdn.com/gt.svg', flagPng: 'https://flagcdn.com/w320/gt.png',
    region: 'Americas', subregion: 'Central America', population: 16858333, capital: 'Guatemala City',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/gt.svg',
    ratings: { att: 67, mid: 67, def: 66, gk: 66, overall: 67 }
  },
  {
    id: 'NCA', cca2: 'NI', name: 'Nicaragua', officialName: 'Republic of Nicaragua',
    flagSvg: 'https://flagcdn.com/ni.svg', flagPng: 'https://flagcdn.com/w320/ni.png',
    region: 'Americas', subregion: 'Central America', population: 6624554, capital: 'Managua',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/ni.svg',
    ratings: { att: 64, mid: 64, def: 63, gk: 63, overall: 64 }
  },
  {
    id: 'SUR', cca2: 'SR', name: 'Suriname', officialName: 'Republic of Suriname',
    flagSvg: 'https://flagcdn.com/sr.svg', flagPng: 'https://flagcdn.com/w320/sr.png',
    region: 'Americas', subregion: 'South America', population: 586632, capital: 'Paramaribo',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/sr.svg',
    ratings: { att: 68, mid: 67, def: 67, gk: 66, overall: 67 }
  },
  {
    id: 'GUY', cca2: 'GY', name: 'Guyana', officialName: 'Co-operative Republic of Guyana',
    flagSvg: 'https://flagcdn.com/gy.svg', flagPng: 'https://flagcdn.com/w320/gy.png',
    region: 'Americas', subregion: 'South America', population: 786559, capital: 'Georgetown',
    confederation: 'CONCACAF', crestUrl: 'https://flagcdn.com/gy.svg',
    ratings: { att: 62, mid: 61, def: 61, gk: 61, overall: 61 }
  },
  {
    id: 'MLI', cca2: 'ML', name: 'Mali', officialName: 'Republic of Mali',
    flagSvg: 'https://flagcdn.com/ml.svg', flagPng: 'https://flagcdn.com/w320/ml.png',
    region: 'Africa', subregion: 'Western Africa', population: 20250833, capital: 'Bamako',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/ml.svg',
    ratings: { att: 76, mid: 76, def: 75, gk: 74, overall: 75 }
  },
  {
    id: 'BFA', cca2: 'BF', name: 'Burkina Faso', officialName: 'Burkina Faso',
    flagSvg: 'https://flagcdn.com/bf.svg', flagPng: 'https://flagcdn.com/w320/bf.png',
    region: 'Africa', subregion: 'Western Africa', population: 20903278, capital: 'Ouagadougou',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/bf.svg',
    ratings: { att: 75, mid: 74, def: 74, gk: 73, overall: 74 }
  },
  {
    id: 'GUI', cca2: 'GN', name: 'Guinea', officialName: 'Republic of Guinea',
    flagSvg: 'https://flagcdn.com/gn.svg', flagPng: 'https://flagcdn.com/w320/gn.png',
    region: 'Africa', subregion: 'Western Africa', population: 13132792, capital: 'Conakry',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/gn.svg',
    ratings: { att: 74, mid: 74, def: 73, gk: 72, overall: 73 }
  },
  {
    id: 'COD', cca2: 'CD', name: 'DR Congo', officialName: 'Democratic Republic of the Congo',
    flagSvg: 'https://flagcdn.com/cd.svg', flagPng: 'https://flagcdn.com/w320/cd.png',
    region: 'Africa', subregion: 'Middle Africa', population: 89561404, capital: 'Kinshasa',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/cd.svg',
    ratings: { att: 76, mid: 75, def: 74, gk: 73, overall: 75 }
  },
  {
    id: 'ZAM', cca2: 'ZM', name: 'Zambia', officialName: 'Republic of Zambia',
    flagSvg: 'https://flagcdn.com/zm.svg', flagPng: 'https://flagcdn.com/w320/zm.png',
    region: 'Africa', subregion: 'Eastern Africa', population: 18383956, capital: 'Lusaka',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/zm.svg',
    ratings: { att: 73, mid: 72, def: 71, gk: 71, overall: 72 }
  },
  {
    id: 'ANG', cca2: 'AO', name: 'Angola', officialName: 'Republic of Angola',
    flagSvg: 'https://flagcdn.com/ao.svg', flagPng: 'https://flagcdn.com/w320/ao.png',
    region: 'Africa', subregion: 'Middle Africa', population: 32866268, capital: 'Luanda',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/ao.svg',
    ratings: { att: 72, mid: 71, def: 71, gk: 71, overall: 71 }
  },
  {
    id: 'GAB', cca2: 'GA', name: 'Gabon', officialName: 'Gabonese Republic',
    flagSvg: 'https://flagcdn.com/ga.svg', flagPng: 'https://flagcdn.com/w320/ga.png',
    region: 'Africa', subregion: 'Middle Africa', population: 2225728, capital: 'Libreville',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/ga.svg',
    ratings: { att: 75, mid: 71, def: 71, gk: 70, overall: 72 }
  },
  {
    id: 'CPV', cca2: 'CV', name: 'Cape Verde', officialName: 'Republic of Cabo Verde',
    flagSvg: 'https://flagcdn.com/cv.svg', flagPng: 'https://flagcdn.com/w320/cv.png',
    region: 'Africa', subregion: 'Western Africa', population: 555988, capital: 'Praia',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/cv.svg',
    ratings: { att: 73, mid: 72, def: 72, gk: 71, overall: 72 }
  },
  {
    id: 'GNQ', cca2: 'GQ', name: 'Equatorial Guinea', officialName: 'Republic of Equatorial Guinea',
    flagSvg: 'https://flagcdn.com/gq.svg', flagPng: 'https://flagcdn.com/w320/gq.png',
    region: 'Africa', subregion: 'Middle Africa', population: 1402985, capital: 'Malabo',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/gq.svg',
    ratings: { att: 73, mid: 72, def: 72, gk: 71, overall: 72 }
  },
  {
    id: 'KEN', cca2: 'KE', name: 'Kenya', officialName: 'Republic of Kenya',
    flagSvg: 'https://flagcdn.com/ke.svg', flagPng: 'https://flagcdn.com/w320/ke.png',
    region: 'Africa', subregion: 'Eastern Africa', population: 53771300, capital: 'Nairobi',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/ke.svg',
    ratings: { att: 68, mid: 67, def: 67, gk: 66, overall: 67 }
  },
  {
    id: 'UGA', cca2: 'UG', name: 'Uganda', officialName: 'Republic of Uganda',
    flagSvg: 'https://flagcdn.com/ug.svg', flagPng: 'https://flagcdn.com/w320/ug.png',
    region: 'Africa', subregion: 'Eastern Africa', population: 45741000, capital: 'Kampala',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/ug.svg',
    ratings: { att: 68, mid: 68, def: 68, gk: 69, overall: 68 }
  },
  {
    id: 'TAN', cca2: 'TZ', name: 'Tanzania', officialName: 'United Republic of Tanzania',
    flagSvg: 'https://flagcdn.com/tz.svg', flagPng: 'https://flagcdn.com/w320/tz.png',
    region: 'Africa', subregion: 'Eastern Africa', population: 59734213, capital: 'Dodoma',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/tz.svg',
    ratings: { att: 67, mid: 66, def: 66, gk: 65, overall: 66 }
  },
  {
    id: 'ETH', cca2: 'ET', name: 'Ethiopia', officialName: 'Federal Democratic Republic of Ethiopia',
    flagSvg: 'https://flagcdn.com/et.svg', flagPng: 'https://flagcdn.com/w320/et.png',
    region: 'Africa', subregion: 'Eastern Africa', population: 114963583, capital: 'Addis Ababa',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/et.svg',
    ratings: { att: 65, mid: 65, def: 64, gk: 64, overall: 65 }
  },
  {
    id: 'SUD', cca2: 'SD', name: 'Sudan', officialName: 'Republic of the Sudan',
    flagSvg: 'https://flagcdn.com/sd.svg', flagPng: 'https://flagcdn.com/w320/sd.png',
    region: 'Africa', subregion: 'Northern Africa', population: 43849269, capital: 'Khartoum',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/sd.svg',
    ratings: { att: 66, mid: 65, def: 65, gk: 64, overall: 65 }
  },
  {
    id: 'BEN', cca2: 'BJ', name: 'Benin', officialName: 'Republic of Benin',
    flagSvg: 'https://flagcdn.com/bj.svg', flagPng: 'https://flagcdn.com/w320/bj.png',
    region: 'Africa', subregion: 'Western Africa', population: 12123198, capital: 'Porto-Novo',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/bj.svg',
    ratings: { att: 69, mid: 68, def: 68, gk: 67, overall: 68 }
  },
  {
    id: 'TOG', cca2: 'TG', name: 'Togo', officialName: 'Togolese Republic',
    flagSvg: 'https://flagcdn.com/tg.svg', flagPng: 'https://flagcdn.com/w320/tg.png',
    region: 'Africa', subregion: 'Western Africa', population: 8278737, capital: 'Lomé',
    confederation: 'CAF', crestUrl: 'https://flagcdn.com/tg.svg',
    ratings: { att: 67, mid: 67, def: 66, gk: 66, overall: 67 }
  },
  {
    id: 'JOR', cca2: 'JO', name: 'Jordan', officialName: 'Hashemite Kingdom of Jordan',
    flagSvg: 'https://flagcdn.com/jo.svg', flagPng: 'https://flagcdn.com/w320/jo.png',
    region: 'Asia', subregion: 'Western Asia', population: 10203140, capital: 'Amman',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/jo.svg',
    ratings: { att: 74, mid: 72, def: 72, gk: 71, overall: 72 }
  },
  {
    id: 'OMA', cca2: 'OM', name: 'Oman', officialName: 'Sultanate of Oman',
    flagSvg: 'https://flagcdn.com/om.svg', flagPng: 'https://flagcdn.com/w320/om.png',
    region: 'Asia', subregion: 'Western Asia', population: 5106622, capital: 'Muscat',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/om.svg',
    ratings: { att: 71, mid: 71, def: 71, gk: 71, overall: 71 }
  },
  {
    id: 'BHR', cca2: 'BH', name: 'Bahrain', officialName: 'Kingdom of Bahrain',
    flagSvg: 'https://flagcdn.com/bh.svg', flagPng: 'https://flagcdn.com/w320/bh.png',
    region: 'Asia', subregion: 'Western Asia', population: 1701583, capital: 'Manama',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/bh.svg',
    ratings: { att: 70, mid: 70, def: 69, gk: 69, overall: 70 }
  },
  {
    id: 'SYR', cca2: 'SY', name: 'Syria', officialName: 'Syrian Arab Republic',
    flagSvg: 'https://flagcdn.com/sy.svg', flagPng: 'https://flagcdn.com/w320/sy.png',
    region: 'Asia', subregion: 'Western Asia', population: 17500657, capital: 'Damascus',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/sy.svg',
    ratings: { att: 72, mid: 69, def: 69, gk: 68, overall: 70 }
  },
  {
    id: 'LBN', cca2: 'LB', name: 'Lebanon', officialName: 'Lebanese Republic',
    flagSvg: 'https://flagcdn.com/lb.svg', flagPng: 'https://flagcdn.com/w320/lb.png',
    region: 'Asia', subregion: 'Western Asia', population: 6825442, capital: 'Beirut',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/lb.svg',
    ratings: { att: 67, mid: 66, def: 66, gk: 66, overall: 66 }
  },
  {
    id: 'PLE', cca2: 'PS', name: 'Palestine', officialName: 'State of Palestine',
    flagSvg: 'https://flagcdn.com/ps.svg', flagPng: 'https://flagcdn.com/w320/ps.png',
    region: 'Asia', subregion: 'Western Asia', population: 4803269, capital: 'Ramallah',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/ps.svg',
    ratings: { att: 69, mid: 67, def: 67, gk: 67, overall: 68 }
  },
  {
    id: 'PRK', cca2: 'KP', name: 'North Korea', officialName: 'Democratic People\'s Republic of Korea',
    flagSvg: 'https://flagcdn.com/kp.svg', flagPng: 'https://flagcdn.com/w320/kp.png',
    region: 'Asia', subregion: 'Eastern Asia', population: 25778815, capital: 'Pyongyang',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/kp.svg',
    ratings: { att: 68, mid: 67, def: 69, gk: 68, overall: 68 }
  },
  {
    id: 'KGZ', cca2: 'KG', name: 'Kyrgyzstan', officialName: 'Kyrgyz Republic',
    flagSvg: 'https://flagcdn.com/kg.svg', flagPng: 'https://flagcdn.com/w320/kg.png',
    region: 'Asia', subregion: 'Central Asia', population: 6591600, capital: 'Bishkek',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/kg.svg',
    ratings: { att: 67, mid: 66, def: 66, gk: 65, overall: 66 }
  },
  {
    id: 'TJK', cca2: 'TJ', name: 'Tajikistan', officialName: 'Republic of Tajikistan',
    flagSvg: 'https://flagcdn.com/tj.svg', flagPng: 'https://flagcdn.com/w320/tj.png',
    region: 'Asia', subregion: 'Central Asia', population: 9537645, capital: 'Dushanbe',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/tj.svg',
    ratings: { att: 69, mid: 68, def: 68, gk: 67, overall: 68 }
  },
  {
    id: 'TKM', cca2: 'TM', name: 'Turkmenistan', officialName: 'Turkmenistan',
    flagSvg: 'https://flagcdn.com/tm.svg', flagPng: 'https://flagcdn.com/w320/tm.png',
    region: 'Asia', subregion: 'Central Asia', population: 6031187, capital: 'Ashgabat',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/tm.svg',
    ratings: { att: 64, mid: 64, def: 64, gk: 63, overall: 64 }
  },
  {
    id: 'SGP', cca2: 'SG', name: 'Singapore', officialName: 'Republic of Singapore',
    flagSvg: 'https://flagcdn.com/sg.svg', flagPng: 'https://flagcdn.com/w320/sg.png',
    region: 'Asia', subregion: 'South-Eastern Asia', population: 5685807, capital: 'Singapore',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/sg.svg',
    ratings: { att: 63, mid: 62, def: 62, gk: 62, overall: 62 }
  },
  {
    id: 'HKG', cca2: 'HK', name: 'Hong Kong', officialName: 'Hong Kong Special Administrative Region of China',
    flagSvg: 'https://flagcdn.com/hk.svg', flagPng: 'https://flagcdn.com/w320/hk.png',
    region: 'Asia', subregion: 'Eastern Asia', population: 7481800, capital: 'City of Victoria',
    confederation: 'AFC', crestUrl: 'https://flagcdn.com/hk.svg',
    ratings: { att: 64, mid: 63, def: 63, gk: 63, overall: 63 }
  },
  {
    id: 'PNG', cca2: 'PG', name: 'Papua New Guinea', officialName: 'Independent State of Papua New Guinea',
    flagSvg: 'https://flagcdn.com/pg.svg', flagPng: 'https://flagcdn.com/w320/pg.png',
    region: 'Oceania', subregion: 'Melanesia', population: 8935094, capital: 'Port Moresby',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/pg.svg',
    ratings: { att: 60, mid: 59, def: 59, gk: 58, overall: 59 }
  },
  {
    id: 'NCL', cca2: 'NC', name: 'New Caledonia', officialName: 'New Caledonia',
    flagSvg: 'https://flagcdn.com/nc.svg', flagPng: 'https://flagcdn.com/w320/nc.png',
    region: 'Oceania', subregion: 'Melanesia', population: 271960, capital: 'Nouméa',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/nc.svg',
    ratings: { att: 62, mid: 61, def: 61, gk: 60, overall: 61 }
  },
  {
    id: 'VUT', cca2: 'VU', name: 'Vanuatu', officialName: 'Republic of Vanuatu',
    flagSvg: 'https://flagcdn.com/vu.svg', flagPng: 'https://flagcdn.com/w320/vu.png',
    region: 'Oceania', subregion: 'Melanesia', population: 307150, capital: 'Port Vila',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/vu.svg',
    ratings: { att: 59, mid: 58, def: 58, gk: 57, overall: 58 }
  },
  {
    id: 'SAM', cca2: 'WS', name: 'Samoa', officialName: 'Independent State of Samoa',
    flagSvg: 'https://flagcdn.com/ws.svg', flagPng: 'https://flagcdn.com/w320/ws.png',
    region: 'Oceania', subregion: 'Polynesia', population: 198410, capital: 'Apia',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/ws.svg',
    ratings: { att: 58, mid: 57, def: 57, gk: 56, overall: 57 }
  },
  {
    id: 'ASA', cca2: 'AS', name: 'American Samoa', officialName: 'American Samoa',
    flagSvg: 'https://flagcdn.com/as.svg', flagPng: 'https://flagcdn.com/w320/as.png',
    region: 'Oceania', subregion: 'Polynesia', population: 55197, capital: 'Pago Pago',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/as.svg',
    ratings: { att: 52, mid: 51, def: 51, gk: 53, overall: 52 }
  },
  {
    id: 'TGA', cca2: 'TO', name: 'Tonga', officialName: 'Kingdom of Tonga',
    flagSvg: 'https://flagcdn.com/to.svg', flagPng: 'https://flagcdn.com/w320/to.png',
    region: 'Oceania', subregion: 'Polynesia', population: 105697, capital: 'Nuku\'alofa',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/to.svg',
    ratings: { att: 54, mid: 54, def: 53, gk: 53, overall: 54 }
  },
  {
    id: 'COK', cca2: 'CK', name: 'Cook Islands', officialName: 'Cook Islands',
    flagSvg: 'https://flagcdn.com/ck.svg', flagPng: 'https://flagcdn.com/w320/ck.png',
    region: 'Oceania', subregion: 'Polynesia', population: 17564, capital: 'Avarua',
    confederation: 'OFC', crestUrl: 'https://flagcdn.com/ck.svg',
    ratings: { att: 53, mid: 53, def: 52, gk: 52, overall: 53 }
  }
];
