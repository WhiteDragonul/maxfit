// Sursa unică de date pentru MaxFit Galați.
// Datele de contact, adresele și programul sunt REALE (Max Fitness Galați, maxfitness.ro).
// Prețurile abonamentelor și orarul detaliat al claselor sunt ORIENTATIVE (de înlocuit cu
// cele oficiale înainte de publicare) — tipurile de clase sunt însă cele oferite real de sală.

// ─── Contact & locații (REALE) ──────────────────────────────────────────────
export const GYM = {
  nume: 'Max Fitness Galați',
  email: 'contact@maxfitness.ro',
  facebook: 'https://www.facebook.com/maxfitnessgalati',
  locatii: [
    {
      id: 'cosbuc',
      nume: 'MaxFit Coșbuc',
      adresa: 'Bd. George Coșbuc nr. 117, Galați',
      telefon: '+40 748 039 333',
      program: [
        { zile: 'Luni – Vineri', ore: '06:00 – 23:00' },
        { zile: 'Sâmbătă', ore: '08:00 – 19:00' },
        { zile: 'Duminică', ore: '09:00 – 17:00' },
      ],
    },
    {
      id: '21',
      nume: 'MaxFit 21',
      adresa: 'Bd. Oțelarilor nr. 11, Galați',
      telefon: '+40 748 039 333',
      program: [
        { zile: 'Luni – Vineri', ore: '06:00 – 22:00' },
        { zile: 'Sâmbătă', ore: '09:00 – 17:00' },
        { zile: 'Duminică', ore: '09:00 – 15:00' },
      ],
    },
  ],
} as const;

// Locația principală folosită implicit în UI (homepage, profil)
export const LOCATIE_PRINCIPALA = GYM.locatii[0];

// ─── Clase de grup ──────────────────────────────────────────────────────────
// Tipurile sunt cele oferite real de Max Fitness: Spinning, Zumba, CrossFit,
// TRX, Box, Body Combat, Kangoo Jumps, Step, Aerobic. Orele sunt orientative.

export interface Clasa {
  id: string;
  nume: string;
  categorie: string; // Cardio / Forță / Dans / Funcțional
  ora: string;
  durata: string;
  instructor: string;
  sala: string;
  capacitate: number;
  ocupate: number;
}

// Orar pe zi a săptămânii (0 = Luni ... 6 = Duminică).
export const ORAR: Record<number, Clasa[]> = {
  0: [
    { id: 'lu-1', nume: 'Spinning Intense', categorie: 'Cardio', ora: '18:00', durata: '50 min', instructor: 'Alexandru M.', sala: 'Sala 2', capacitate: 16, ocupate: 4 },
    { id: 'lu-2', nume: 'CrossFit WOD', categorie: 'Forță', ora: '19:00', durata: '60 min', instructor: 'Mihai T.', sala: 'Sala 1', capacitate: 14, ocupate: 11 },
    { id: 'lu-3', nume: 'Zumba Flow', categorie: 'Dans', ora: '20:15', durata: '45 min', instructor: 'Elena D.', sala: 'Sala 2', capacitate: 20, ocupate: 20 },
  ],
  1: [
    { id: 'ma-1', nume: 'TRX Full Body', categorie: 'Funcțional', ora: '08:00', durata: '45 min', instructor: 'Andrei P.', sala: 'Sala 1', capacitate: 12, ocupate: 5 },
    { id: 'ma-2', nume: 'Body Combat', categorie: 'Cardio', ora: '18:30', durata: '55 min', instructor: 'Cristina V.', sala: 'Sala 2', capacitate: 18, ocupate: 9 },
    { id: 'ma-3', nume: 'Spinning Power', categorie: 'Cardio', ora: '20:00', durata: '50 min', instructor: 'Alexandru M.', sala: 'Sala 2', capacitate: 16, ocupate: 13 },
  ],
  2: [
    { id: 'mi-1', nume: 'Kangoo Jumps', categorie: 'Cardio', ora: '18:00', durata: '50 min', instructor: 'Elena D.', sala: 'Sala 2', capacitate: 15, ocupate: 7 },
    { id: 'mi-2', nume: 'CrossFit WOD', categorie: 'Forță', ora: '19:00', durata: '60 min', instructor: 'Mihai T.', sala: 'Sala 1', capacitate: 14, ocupate: 14 },
    { id: 'mi-3', nume: 'Box Fitness', categorie: 'Forță', ora: '20:15', durata: '60 min', instructor: 'George S.', sala: 'Sala 1', capacitate: 12, ocupate: 6 },
  ],
  3: [
    { id: 'jo-1', nume: 'Step Aerobic', categorie: 'Cardio', ora: '09:00', durata: '45 min', instructor: 'Cristina V.', sala: 'Sala 2', capacitate: 18, ocupate: 3 },
    { id: 'jo-2', nume: 'Spinning Intense', categorie: 'Cardio', ora: '18:30', durata: '50 min', instructor: 'Alexandru M.', sala: 'Sala 2', capacitate: 16, ocupate: 10 },
    { id: 'jo-3', nume: 'Zumba Flow', categorie: 'Dans', ora: '20:00', durata: '45 min', instructor: 'Elena D.', sala: 'Sala 2', capacitate: 20, ocupate: 16 },
  ],
  4: [
    { id: 'vi-1', nume: 'TRX Full Body', categorie: 'Funcțional', ora: '18:00', durata: '45 min', instructor: 'Andrei P.', sala: 'Sala 1', capacitate: 12, ocupate: 8 },
    { id: 'vi-2', nume: 'Body Combat', categorie: 'Cardio', ora: '19:00', durata: '55 min', instructor: 'Cristina V.', sala: 'Sala 2', capacitate: 18, ocupate: 12 },
    { id: 'vi-3', nume: 'CrossFit WOD', categorie: 'Forță', ora: '20:15', durata: '60 min', instructor: 'Mihai T.', sala: 'Sala 1', capacitate: 14, ocupate: 9 },
  ],
  5: [
    { id: 'sa-1', nume: 'Spinning Weekend', categorie: 'Cardio', ora: '10:00', durata: '50 min', instructor: 'Alexandru M.', sala: 'Sala 2', capacitate: 16, ocupate: 6 },
    { id: 'sa-2', nume: 'Kangoo Jumps', categorie: 'Cardio', ora: '11:30', durata: '50 min', instructor: 'Elena D.', sala: 'Sala 2', capacitate: 15, ocupate: 11 },
  ],
  6: [
    { id: 'du-1', nume: 'Zumba Flow', categorie: 'Dans', ora: '11:00', durata: '45 min', instructor: 'Elena D.', sala: 'Sala 2', capacitate: 20, ocupate: 8 },
  ],
};

// ─── Antrenori (personal training) ──────────────────────────────────────────
// Max Fitness oferă real antrenori personali. Numele/specializările sunt orientative.
export interface Antrenor {
  id: string;
  nume: string;
  specializare: string;
  experienta: string; // ex. „8 ani experiență"
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

// ─── Abonamente (PREȚURI ORIENTATIVE — de actualizat cu cele oficiale) ───────
export interface Beneficiu {
  text: string;
  inclus: boolean;
}

export interface Plan {
  id: string;
  nume: string;
  pret: number;
  beneficii: Beneficiu[];
  popular?: boolean;
}

export const PLANURI: Plan[] = [
  {
    id: 'basic',
    nume: 'Basic',
    pret: 150,
    beneficii: [
      { text: 'Acces zonă fitness', inclus: true },
      { text: 'Vestiar & Dușuri', inclus: true },
      { text: 'Clase de grup', inclus: false },
      { text: 'Plan antrenament personalizat', inclus: false },
    ],
  },
  {
    id: 'full',
    nume: 'Full Access',
    pret: 220,
    popular: true,
    beneficii: [
      { text: 'Acces nelimitat zonă fitness', inclus: true },
      { text: 'Vestiar & Dușuri premium', inclus: true },
      { text: 'Acces la toate clasele de grup', inclus: true },
      { text: 'Antrenor Personal', inclus: false },
    ],
  },
  {
    id: 'premium',
    nume: 'Premium',
    pret: 350,
    beneficii: [
      { text: 'Acces nelimitat VIP', inclus: true },
      { text: 'Vestiar privat & prosoape', inclus: true },
      { text: 'Prioritate clase de grup', inclus: true },
      { text: '4 ședințe Antrenor Personal/lună', inclus: true },
    ],
  },
];
