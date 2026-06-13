// Sursa unică de date pentru MaxFit Galați.
// Date REALE preluate din posterele oficiale (program + prețuri) și site-ul maxfitness.ro.
// Valabile până la 31.12.2026. Durata unei ședințe de clasă: 50 min.

export type LocatieId = 'cosbuc' | '21';

// ─── Locații (contact + program fitness) ────────────────────────────────────
export interface Locatie {
  id: LocatieId;
  nume: string;
  adresa: string;
  telefon: string;
  programFitness: { zile: string; ore: string }[];
}

export const GYM = {
  nume: 'Max Fitness Galați',
  email: 'contact@maxfitness.ro',
  facebook: 'https://www.facebook.com/maxfitnessgalati',
};

export const LOCATII: Record<LocatieId, Locatie> = {
  cosbuc: {
    id: 'cosbuc',
    nume: 'MaxFit Coșbuc',
    adresa: 'Bd. George Coșbuc nr. 117, Galați',
    telefon: '+40 748 039 333',
    programFitness: [
      { zile: 'Luni – Vineri', ore: '05:30 – 00:00' },
      { zile: 'Sâmbătă', ore: '08:00 – 19:00' },
      { zile: 'Duminică', ore: '09:00 – 17:00' },
    ],
  },
  '21': {
    id: '21',
    nume: 'MaxFit 21',
    adresa: 'Bd. Oțelarilor nr. 11, Galați',
    telefon: '+40 748 039 333',
    programFitness: [
      { zile: 'Luni – Vineri', ore: '06:00 – 22:00' },
      { zile: 'Sâmbătă', ore: '09:00 – 17:00' },
      { zile: 'Duminică', ore: '09:00 – 15:00' },
    ],
  },
};

export const LISTA_LOCATII: Locatie[] = [LOCATII.cosbuc, LOCATII['21']];

// ─── Orar clase de grup (REAL, pe locație și zi) ─────────────────────────────
export interface Clasa {
  id: string;
  nume: string;
  categorie: string;
  ora: string;
  durata: string;
  capacitate: number;
  ocupate: number;
}

const mk = (id: string, nume: string, categorie: string, ora: string, ocupate: number, capacitate = 16): Clasa => ({
  id,
  nume,
  categorie,
  ora,
  durata: '50 min',
  capacitate,
  ocupate,
});

// Index zi: 0 = Luni ... 6 = Duminică. Sâmbătă/Duminică: doar fitness, fără clase.
export const ORAR: Record<LocatieId, Record<number, Clasa[]>> = {
  cosbuc: {
    0: [
      mk('c-lu-0900', 'Vreau să slăbesc', 'Slăbire', '09:00', 6),
      mk('c-lu-1700', 'Step Aerobic', 'Aerobic', '17:00', 9),
      mk('c-lu-1800', 'Body Pump', 'Forță', '18:00', 12),
      mk('c-lu-1900', 'Kangoo Jumps', 'Cardio', '19:00', 7),
      mk('c-lu-2000', 'Vreau să slăbesc', 'Slăbire', '20:00', 5),
    ],
    1: [
      mk('c-ma-1700', 'Movement 4Everyone', 'Funcțional', '17:00', 4),
      mk('c-ma-1800', 'Body Pump', 'Forță', '18:00', 11),
      mk('c-ma-1900', 'Karate', 'Arte marțiale', '19:00', 8),
    ],
    2: [
      mk('c-mi-0900', 'Vreau să slăbesc', 'Slăbire', '09:00', 5),
      mk('c-mi-1700', 'Circuit Aerobic', 'Aerobic', '17:00', 10),
      mk('c-mi-1800', 'Body Pump', 'Forță', '18:00', 13),
      mk('c-mi-1900', 'Kangoo Jumps', 'Cardio', '19:00', 9),
      mk('c-mi-2000', 'Vreau să slăbesc', 'Slăbire', '20:00', 6),
    ],
    3: [
      mk('c-jo-1700', 'Movement 4Everyone', 'Funcțional', '17:00', 5),
      mk('c-jo-1800', 'Body Pump', 'Forță', '18:00', 10),
      mk('c-jo-1900', 'Karate', 'Arte marțiale', '19:00', 7),
    ],
    4: [
      mk('c-vi-0900', 'Vreau să slăbesc', 'Slăbire', '09:00', 4),
      mk('c-vi-1700', 'Fitbal Aerobic', 'Aerobic', '17:00', 8),
      mk('c-vi-1800', 'Body Pump', 'Forță', '18:00', 12),
      mk('c-vi-1900', 'Kangoo Jumps', 'Cardio', '19:00', 16), // plin (exemplu)
      mk('c-vi-2000', 'Vreau să slăbesc', 'Slăbire', '20:00', 6),
    ],
    5: [],
    6: [],
  },
  '21': {
    0: [
      mk('21-lu-0900', 'Morning Aerobic', 'Aerobic', '09:00', 5),
      mk('21-lu-1700', 'Aerobic', 'Aerobic', '17:00', 8),
      mk('21-lu-1900', 'Body Pump', 'Forță', '19:00', 11),
      mk('21-lu-2000', 'Vreau să slăbesc', 'Slăbire', '20:00', 6),
    ],
    1: [mk('21-ma-1700', 'Aerobic', 'Aerobic', '17:00', 7)],
    2: [
      mk('21-mi-0900', 'Morning Aerobic', 'Aerobic', '09:00', 4),
      mk('21-mi-1700', 'Aerobic', 'Aerobic', '17:00', 9),
      mk('21-mi-1900', 'Body Pump', 'Forță', '19:00', 10),
      mk('21-mi-2000', 'Vreau să slăbesc', 'Slăbire', '20:00', 5),
    ],
    3: [mk('21-jo-1700', 'Aerobic', 'Aerobic', '17:00', 6)],
    4: [
      mk('21-vi-0900', 'Morning Aerobic', 'Aerobic', '09:00', 5),
      mk('21-vi-1700', 'Aerobic', 'Aerobic', '17:00', 8),
      mk('21-vi-1900', 'Body Pump', 'Forță', '19:00', 12),
      mk('21-vi-2000', 'Vreau să slăbesc', 'Slăbire', '20:00', 7),
    ],
    5: [],
    6: [],
  },
};

// ─── Prețuri clase (REAL, pe locație) ────────────────────────────────────────
// Coloane: 1 ședință / 8 ședințe / 12 ședințe / Nelimitat. null = indisponibil („-").
export interface PretClasa {
  clasa: string;
  preturi: (number | null)[];
}

export const COLOANE_CLASE = ['1 ședință', '8 ședințe', '12 ședințe', 'Nelimitat'];

export const PRETURI_CLASE: Record<LocatieId, PretClasa[]> = {
  cosbuc: [
    { clasa: 'Aerobic', preturi: [50, 170, 210, null] },
    { clasa: 'Vreau să slăbesc', preturi: [50, 170, 210, null] },
    { clasa: 'Kangoo Jumps', preturi: [50, 170, 210, null] },
    { clasa: 'Body Pump', preturi: [50, 170, 210, 250] },
    { clasa: 'Movement 4Everyone', preturi: [50, 170, null, null] },
  ],
  '21': [
    { clasa: 'Aerobic', preturi: [50, 150, 190, 220] },
    { clasa: 'Vreau să slăbesc', preturi: [50, 170, 210, null] },
    { clasa: 'Body Pump', preturi: [50, 170, 210, null] },
    { clasa: 'Box Personal Trainer', preturi: [70, 500, 650, null] },
  ],
};

// Oferta „all-inclusive" pe locație (toate clasele + fitness full time)
export const OFERTA_CLASE: Record<LocatieId, { text: string; pret: number }> = {
  cosbuc: { text: 'Toate clasele + Fitness Full Time', pret: 400 },
  '21': { text: 'Full Access (toate clasele + Fitness)', pret: 400 },
};

export const SOLAR = [
  { durata: '1 minut', pret: 2.5 },
  { durata: '50 minute', pret: 100 },
  { durata: '100 minute', pret: 170 },
];

// ─── Personal Trainer (REAL) ─────────────────────────────────────────────────
export const COLOANE_PT = ['1 ședință', '8 ședințe', '12 ședințe', 'Nelimitat'];
export const PERSONAL_TRAINER: PretClasa[] = [
  { clasa: 'Solo', preturi: [75, 490, 590, 790] },
  { clasa: 'Grup PT', preturi: [69, 450, 490, 690] },
  { clasa: 'Box', preturi: [70, 500, 650, null] },
];
export const NOTA_PT =
  'Ședințele durează 1h. Grup PT — participarea a minimum 2 persoane. Nelimitat — până la 20 de ședințe.';

// ─── Fitness (REAL) ──────────────────────────────────────────────────────────
export const COLOANE_FITNESS = ['Băieți', 'Fete', 'Studenți'];
export const PRETURI_FITNESS: PretClasa[] = [
  { clasa: '1 ședință', preturi: [40, 40, 30] },
  { clasa: '1 săptămână', preturi: [90, 90, 90] },
  { clasa: '2 săptămâni', preturi: [130, 130, 130] },
  { clasa: '3 săptămâni', preturi: [144, 144, 144] },
  { clasa: '1 lună', preturi: [179, 179, 169] },
  { clasa: '1 lună student part-time', preturi: [null, null, 149] },
];
export const NOTA_FITNESS =
  'Prețurile conțin TVA 21%. 1 ședință valabilă 2 ore. Program: Luni–Vineri 05:30–23:00.';

// ─── Abonamente fitness (Silver / Gold / Platinium) (REAL) ───────────────────
export interface Abonament {
  id: string;
  durata: string;
  luni: number; // durata în luni (pentru calculul expirării)
  nume: string;
  normal: number; // preț total normal (RON)
  normalLunar: number;
  student: number; // preț total elevi/studenți
  studentLunar: number;
  popular?: boolean;
}

export const ABONAMENTE: Abonament[] = [
  { id: 'silver', durata: '3 LUNI', luni: 3, nume: 'Silver', normal: 420, normalLunar: 140, student: 390, studentLunar: 130 },
  { id: 'gold', durata: '6 LUNI', luni: 6, nume: 'Gold', normal: 715, normalLunar: 119, student: 615, studentLunar: 102.5, popular: true },
  { id: 'platinium', durata: '1 AN', luni: 12, nume: 'Platinium', normal: 1195, normalLunar: 99, student: 1020, studentLunar: 85 },
];
export const NOTA_ABONAMENTE = 'Toate abonamentele includ freeze 2 săptămâni. Prețuri valabile până la 31.12.2026.';

// ─── Antrenori (personal training) ──────────────────────────────────────────
export interface Antrenor {
  id: string;
  nume: string;
  specializare: string;
  experienta: string;
  descriere: string;
  taguri: string[];
}

export const ANTRENORI: Antrenor[] = [
  {
    id: 'alex',
    nume: 'Alexandru Munteanu',
    specializare: 'Spinning & Cardio',
    experienta: '8 ani experiență',
    descriere: 'Antrenamente de anduranță și ardere a grăsimilor, adaptate oricărui nivel.',
    taguri: ['Cardio', 'Slăbire', 'Anduranță'],
  },
  {
    id: 'mihai',
    nume: 'Mihai Tudor',
    specializare: 'CrossFit & Forță',
    experienta: '10 ani experiență',
    descriere: 'Programe de forță și masă musculară, cu tehnică corectă la ridicări.',
    taguri: ['Forță', 'Hipertrofie', 'CrossFit'],
  },
  {
    id: 'elena',
    nume: 'Elena Dima',
    specializare: 'Group Fitness & Dans',
    experienta: '6 ani experiență',
    descriere: 'Zumba, Kangoo Jumps și tonifiere — energie și distracție garantate.',
    taguri: ['Dans', 'Tonifiere', 'Cardio'],
  },
  {
    id: 'andrei',
    nume: 'Andrei Popa',
    specializare: 'Antrenament Funcțional',
    experienta: '7 ani experiență',
    descriere: 'TRX, mobilitate și recuperare. Ideal pentru începători și reabilitare.',
    taguri: ['Funcțional', 'Mobilitate', 'TRX'],
  },
];
