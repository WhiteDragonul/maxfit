import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/Auth';
import { ABONAMENTE } from '@/constants/data';

export type TipPret = 'normal' | 'student';

export interface AbonamentActiv {
  id: string;
  nume: string;
  durata: string;
  luni: number;
  tip: TipPret;
  pret: number;
  startISO: string;
  expiryISO: string;
}

interface CumparaInput {
  id: string;
  nume: string;
  durata: string;
  luni: number;
  tip: TipPret;
  pret: number;
}

interface MembershipValue {
  abonament: AbonamentActiv | null;
  loading: boolean;
  cumpara: (input: CumparaInput) => Promise<AbonamentActiv>;
  anuleaza: () => void;
}

const MembershipContext = createContext<MembershipValue | undefined>(undefined);

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Reconstituie obiectul din rândul DB + catalogul de planuri (pentru durata/luni)
function dinRand(row: any): AbonamentActiv {
  const plan = ABONAMENTE.find((p) => p.id === row.plan_id);
  return {
    id: row.plan_id,
    nume: row.plan_name,
    durata: plan?.durata ?? '',
    luni: plan?.luni ?? 0,
    tip: row.tip,
    pret: row.price,
    startISO: row.start_date,
    expiryISO: row.expiry_date,
  };
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [abonament, setAbonament] = useState<AbonamentActiv | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setAbonament(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('memberships')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        setAbonament(data ? dinRand(data) : null);
        setLoading(false);
      });
  }, [userId]);

  const cumpara = useCallback(
    async (input: CumparaInput): Promise<AbonamentActiv> => {
      const start = new Date();
      const expiry = new Date(start);
      expiry.setMonth(expiry.getMonth() + input.luni);
      const a: AbonamentActiv = { ...input, startISO: toISO(start), expiryISO: toISO(expiry) };
      setAbonament(a); // optimist
      if (userId) {
        await supabase.from('memberships').upsert({
          user_id: userId,
          plan_id: input.id,
          plan_name: input.nume,
          tip: input.tip,
          price: input.pret,
          start_date: a.startISO,
          expiry_date: a.expiryISO,
        });
      }
      return a;
    },
    [userId],
  );

  const anuleaza = useCallback(() => {
    setAbonament(null);
    if (userId) supabase.from('memberships').delete().eq('user_id', userId).then(() => {});
  }, [userId]);

  return (
    <MembershipContext.Provider value={{ abonament, loading, cumpara, anuleaza }}>
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error('useMembership trebuie folosit în interiorul MembershipProvider');
  return ctx;
}
