import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/Auth';

export interface Rezervare {
  key: string; // `${locatieId}-${dataISO}-${classId}`
  classId: string;
  nume: string;
  categorie: string;
  ora: string;
  durata: string;
  locatieId: string;
  locatieNume: string;
  dataISO: string;
  dataLabel: string;
}

interface ReservationsValue {
  rezervari: Rezervare[];
  loading: boolean;
  isReserved: (key: string) => boolean;
  reserve: (rez: Rezervare) => void;
  cancel: (key: string) => void;
}

const ReservationsContext = createContext<ReservationsValue | undefined>(undefined);

const ZILE_SCURT = ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'];
const LUNI_SCURT = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'];

const aziISO = () => new Date().toISOString().slice(0, 10);

const labelData = (iso: string): string => {
  if (iso === aziISO()) return 'Azi';
  const d = new Date(iso);
  return `${ZILE_SCURT[d.getDay()]}, ${d.getDate()} ${LUNI_SCURT[d.getMonth()]}`;
};

function dinRand(row: any): Rezervare {
  return {
    key: `${row.location_id}-${row.class_date}-${row.class_id}`,
    classId: row.class_id,
    nume: row.class_name,
    categorie: row.category ?? '',
    ora: row.class_time,
    durata: '50 min',
    locatieId: row.location_id,
    locatieNume: row.location_name,
    dataISO: row.class_date,
    dataLabel: labelData(row.class_date),
  };
}

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setRezervari([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('reservations')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }) => {
        setRezervari((data ?? []).map(dinRand));
        setLoading(false);
      });
  }, [userId]);

  const isReserved = useCallback((key: string) => rezervari.some((r) => r.key === key), [rezervari]);

  const reserve = useCallback(
    (rez: Rezervare) => {
      setRezervari((prev) => (prev.some((r) => r.key === rez.key) ? prev : [...prev, rez]));
      if (userId) {
        supabase
          .from('reservations')
          .insert({
            user_id: userId,
            location_id: rez.locatieId,
            location_name: rez.locatieNume,
            class_id: rez.classId,
            class_name: rez.nume,
            category: rez.categorie,
            class_time: rez.ora,
            class_date: rez.dataISO,
          })
          .then(() => {});
      }
    },
    [userId],
  );

  const cancel = useCallback(
    (key: string) => {
      const rez = rezervari.find((r) => r.key === key);
      setRezervari((prev) => prev.filter((r) => r.key !== key));
      if (userId && rez) {
        supabase
          .from('reservations')
          .delete()
          .eq('user_id', userId)
          .eq('location_id', rez.locatieId)
          .eq('class_date', rez.dataISO)
          .eq('class_id', rez.classId)
          .then(() => {});
      }
    },
    [userId, rezervari],
  );

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
