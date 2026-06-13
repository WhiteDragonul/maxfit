import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'maxfit:abonament:v1';

export type TipPret = 'normal' | 'student';

export interface AbonamentActiv {
  id: string;
  nume: string;
  durata: string;
  luni: number;
  tip: TipPret;
  pret: number;
  startISO: string; // ziua cumpărării (yyyy-mm-dd)
  expiryISO: string; // ziua expirării (yyyy-mm-dd)
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
  cumpara: (input: CumparaInput) => AbonamentActiv;
  anuleaza: () => void;
}

const MembershipContext = createContext<MembershipValue | undefined>(undefined);

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [abonament, setAbonament] = useState<AbonamentActiv | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => raw && setAbonament(JSON.parse(raw)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const persist = (a: AbonamentActiv | null) => {
    if (a) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(a)).catch(() => {});
    else AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  };

  const cumpara = useCallback((input: CumparaInput) => {
    const start = new Date();
    const expiry = new Date(start);
    expiry.setMonth(expiry.getMonth() + input.luni);
    const a: AbonamentActiv = {
      ...input,
      startISO: toISO(start),
      expiryISO: toISO(expiry),
    };
    setAbonament(a);
    persist(a);
    return a;
  }, []);

  const anuleaza = useCallback(() => {
    setAbonament(null);
    persist(null);
  }, []);

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
