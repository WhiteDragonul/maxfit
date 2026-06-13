import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'maxfit:rezervari:v1';

export interface Rezervare {
  key: string; // unic: `${dataISO}-${classId}`
  classId: string;
  nume: string;
  ora: string;
  durata: string;
  instructor: string;
  sala: string;
  dataISO: string; // ziua rezervării (yyyy-mm-dd)
  dataLabel: string; // ex. „Sâ, 14 iun"
}

interface ReservationsValue {
  rezervari: Rezervare[];
  loading: boolean;
  isReserved: (key: string) => boolean;
  reserve: (rez: Rezervare) => void;
  cancel: (key: string) => void;
}

const ReservationsContext = createContext<ReservationsValue | undefined>(undefined);

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);

  // Încarcă rezervările salvate la pornirea aplicației
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setRezervari(JSON.parse(raw));
      } catch (e) {
        console.warn('Nu am putut încărca rezervările', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persistă la fiecare modificare (după ce s-a terminat încărcarea inițială)
  useEffect(() => {
    if (loading) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rezervari)).catch((e) =>
      console.warn('Nu am putut salva rezervările', e),
    );
  }, [rezervari, loading]);

  const isReserved = useCallback(
    (key: string) => rezervari.some((r) => r.key === key),
    [rezervari],
  );

  const reserve = useCallback((rez: Rezervare) => {
    setRezervari((prev) => (prev.some((r) => r.key === rez.key) ? prev : [...prev, rez]));
  }, []);

  const cancel = useCallback((key: string) => {
    setRezervari((prev) => prev.filter((r) => r.key !== key));
  }, []);

  return (
    <ReservationsContext.Provider value={{ rezervari, loading, isReserved, reserve, cancel }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx) throw new Error('useReservations trebuie folosit în interiorul ReservationsProvider');
  return ctx;
}
