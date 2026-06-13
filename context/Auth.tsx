import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

type Rezultat = { ok: true; info?: string } | { ok: false; eroare: string };

interface AuthValue {
  email: string | null;
  userId: string | null;
  ready: boolean;
  register: (email: string, parola: string) => Promise<Rezultat>;
  login: (email: string, parola: string) => Promise<Rezultat>;
  logout: () => Promise<void>;
  changePassword: (veche: string, noua: string) => Promise<Rezultat>;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

const norm = (e: string) => e.trim().toLowerCase();
const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// Traduce mesajele Supabase în română
function traduceEroare(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('invalid login credentials')) return 'Email sau parolă incorecte.';
  if (m.includes('already registered') || m.includes('already exists')) return 'Există deja un cont cu acest email.';
  if (m.includes('password should be at least')) return 'Parola trebuie să aibă minim 6 caractere.';
  if (m.includes('email not confirmed')) return 'Confirmă-ți emailul înainte de conectare.';
  if (m.includes('unable to validate email')) return 'Introdu o adresă de email validă.';
  return msg;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmailState(data.session?.user.email ?? null);
      setUserId(data.session?.user.id ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmailState(session?.user.email ?? null);
      setUserId(session?.user.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const register = useCallback(async (e: string, parola: string): Promise<Rezultat> => {
    const em = norm(e);
    if (!emailValid(em)) return { ok: false, eroare: 'Introdu o adresă de email validă.' };
    if (parola.length < 6) return { ok: false, eroare: 'Parola trebuie să aibă minim 6 caractere.' };
    const { data, error } = await supabase.auth.signUp({ email: em, password: parola });
    if (error) return { ok: false, eroare: traduceEroare(error.message) };
    // Dacă „Confirm email" e activat, nu primim sesiune până la confirmare
    if (!data.session) {
      return { ok: true, info: `Ți-am trimis un email de confirmare la ${em}. Confirmă-l, apoi conectează-te.` };
    }
    return { ok: true };
  }, []);

  const login = useCallback(async (e: string, parola: string): Promise<Rezultat> => {
    const em = norm(e);
    if (!emailValid(em)) return { ok: false, eroare: 'Introdu o adresă de email validă.' };
    const { error } = await supabase.auth.signInWithPassword({ email: em, password: parola });
    if (error) return { ok: false, eroare: traduceEroare(error.message) };
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const changePassword = useCallback(
    async (veche: string, noua: string): Promise<Rezultat> => {
      if (!email) return { ok: false, eroare: 'Nu ești conectat.' };
      if (noua.length < 6) return { ok: false, eroare: 'Parola nouă trebuie să aibă minim 6 caractere.' };
      // Reverifică parola actuală reautentificând
      const { error: errLogin } = await supabase.auth.signInWithPassword({ email, password: veche });
      if (errLogin) return { ok: false, eroare: 'Parola actuală este incorectă.' };
      const { error } = await supabase.auth.updateUser({ password: noua });
      if (error) return { ok: false, eroare: traduceEroare(error.message) };
      // Deconectează → necesită reconectare cu noua parolă
      await supabase.auth.signOut();
      return { ok: true };
    },
    [email],
  );

  return (
    <AuthContext.Provider value={{ email, userId, ready, register, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth trebuie folosit în interiorul AuthProvider');
  return ctx;
}
