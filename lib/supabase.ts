import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Cheie publishable (client) — destinată aplicației, nu e secretă.
const SUPABASE_URL = 'https://ozfhndjcpmcasmehqddo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_j_Zp_8TeOKnyalprC0ohKQ_lN8kWpBS';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
