export interface ClasaFitness {
  id: string;
  nume: string;
  antrenor: string;
  zi: string;
  ora: string;
  durata: number; // minute
  locuriDisponibile: number;
  icon: string;
}

export interface Abonament {
  id: string;
  nume: string;
  pret: number; // lei / lună
  beneficii: string[];
  popular?: boolean;
}

export interface Antrenament {
  id: string;
  nume: string;
  grupe: string;
  exercitii: { nume: string; seturi: string }[];
}

export const PROGRAM_SALA = [
  { zile: 'Luni – Vineri', ore: '07:00 – 23:00' },
  { zile: 'Sâmbătă', ore: '08:00 – 21:00' },
  { zile: 'Duminică', ore: '09:00 – 20:00' },
];

export const CONTACT = {
  adresa: 'Galați, România',
  telefon: '+40 7xx xxx xxx',
  email: 'contact@maxfit.ro',
  site: 'https://maxfit.ro',
};

export const CLASE: ClasaFitness[] = [
  { id: '1', nume: 'Spinning', antrenor: 'Andrei P.', zi: 'Luni', ora: '18:00', durata: 45, locuriDisponibile: 8, icon: 'bicycle' },
  { id: '2', nume: 'Zumba', antrenor: 'Maria I.', zi: 'Luni', ora: '19:00', durata: 60, locuriDisponibile: 12, icon: 'musical-notes' },
  { id: '3', nume: 'CrossFit', antrenor: 'Vlad D.', zi: 'Marți', ora: '18:30', durata: 60, locuriDisponibile: 5, icon: 'barbell' },
  { id: '4', nume: 'Pilates', antrenor: 'Elena C.', zi: 'Miercuri', ora: '10:00', durata: 50, locuriDisponibile: 10, icon: 'body' },
  { id: '5', nume: 'Kickboxing', antrenor: 'Radu M.', zi: 'Miercuri', ora: '19:00', durata: 60, locuriDisponibile: 6, icon: 'hand-left' },
  { id: '6', nume: 'Yoga', antrenor: 'Ioana S.', zi: 'Joi', ora: '09:00', durata: 60, locuriDisponibile: 15, icon: 'leaf' },
  { id: '7', nume: 'HIIT', antrenor: 'Vlad D.', zi: 'Joi', ora: '18:00', durata: 30, locuriDisponibile: 9, icon: 'flash' },
  { id: '8', nume: 'Spinning', antrenor: 'Andrei P.', zi: 'Vineri', ora: '18:00', durata: 45, locuriDisponibile: 7, icon: 'bicycle' },
  { id: '9', nume: 'Stretching', antrenor: 'Elena C.', zi: 'Sâmbătă', ora: '11:00', durata: 40, locuriDisponibile: 14, icon: 'body' },
];

export const ABONAMENTE: Abonament[] = [
  {
    id: 'basic',
    nume: 'Basic',
    pret: 120,
    beneficii: ['Acces sală 07:00 – 16:00', 'Vestiar și duș', 'Evaluare inițială gratuită'],
  },
  {
    id: 'full',
    nume: 'Full Access',
    pret: 180,
    popular: true,
    beneficii: ['Acces nelimitat la sală', 'Toate clasele incluse', 'Vestiar și duș', 'Plan de antrenament personalizat'],
  },
  {
    id: 'premium',
    nume: 'Premium',
    pret: 280,
    beneficii: ['Tot ce include Full Access', '2 ședințe / lună cu antrenor personal', 'Plan nutrițional', 'Acces prioritar la clase'],
  },
];

export const ANTRENAMENTE: Antrenament[] = [
  {
    id: 'piept-triceps',
    nume: 'Piept & Triceps',
    grupe: 'Împins',
    exercitii: [
      { nume: 'Împins cu bara la orizontal', seturi: '4 × 8-10' },
      { nume: 'Împins cu gantere la înclinat', seturi: '3 × 10-12' },
      { nume: 'Fluturări la cabluri', seturi: '3 × 12-15' },
      { nume: 'Extensii triceps la cablu', seturi: '4 × 10-12' },
      { nume: 'Flotări la paralele', seturi: '3 × max' },
    ],
  },
  {
    id: 'spate-biceps',
    nume: 'Spate & Biceps',
    grupe: 'Tras',
    exercitii: [
      { nume: 'Tracțiuni la bară', seturi: '4 × max' },
      { nume: 'Ramat cu bara', seturi: '4 × 8-10' },
      { nume: 'Tracțiuni la helcometru', seturi: '3 × 10-12' },
      { nume: 'Flexii cu bara', seturi: '3 × 10-12' },
      { nume: 'Flexii ciocan cu gantere', seturi: '3 × 12' },
    ],
  },
  {
    id: 'picioare',
    nume: 'Picioare',
    grupe: 'Membre inferioare',
    exercitii: [
      { nume: 'Genuflexiuni cu bara', seturi: '4 × 8-10' },
      { nume: 'Presă pentru picioare', seturi: '4 × 10-12' },
      { nume: 'Fandări cu gantere', seturi: '3 × 12 / picior' },
      { nume: 'Flexii femurali la aparat', seturi: '3 × 12-15' },
      { nume: 'Ridicări pe vârfuri', seturi: '4 × 15-20' },
    ],
  },
  {
    id: 'umeri-abdomen',
    nume: 'Umeri & Abdomen',
    grupe: 'Umeri / core',
    exercitii: [
      { nume: 'Presă militară cu gantere', seturi: '4 × 8-10' },
      { nume: 'Ridicări laterale', seturi: '4 × 12-15' },
      { nume: 'Face pull la cablu', seturi: '3 × 15' },
      { nume: 'Plank', seturi: '3 × 60 sec' },
      { nume: 'Ridicări de picioare la bară', seturi: '3 × 12-15' },
    ],
  },
];
