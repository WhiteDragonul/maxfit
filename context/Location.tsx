import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocatieId, LOCATII, Locatie } from '@/constants/data';

const STORAGE_KEY = 'maxfit:locatie:v1';

interface LocationValue {
  locatieId: LocatieId;
  locatie: Locatie;
  setLocatie: (id: LocatieId) => void;
}

const LocationContext = createContext<LocationValue | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locatieId, setLocatieId] = useState<LocatieId>('cosbuc');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw === 'cosbuc' || raw === '21') setLocatieId(raw);
      })
      .catch(() => {});
  }, []);

  const setLocatie = useCallback((id: LocatieId) => {
    setLocatieId(id);
    AsyncStorage.setItem(STORAGE_KEY, id).catch(() => {});
  }, []);

  return (
    <LocationContext.Provider value={{ locatieId, locatie: LOCATII[locatieId], setLocatie }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocatie() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocatie trebuie folosit în interiorul LocationProvider');
  return ctx;
}
