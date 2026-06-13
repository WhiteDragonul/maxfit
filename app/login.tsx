import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Type, Radius, Shadow } from '@/constants/theme';
import { useAuth } from '@/context/Auth';

type Mod = 'login' | 'register';

export default function Login() {
  const insets = useSafeAreaInsets();
  const { login, register } = useAuth();

  const [mod, setMod] = useState<Mod>('login');
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [confirm, setConfirm] = useState('');
  const [vedeParola, setVedeParola] = useState(false);
  const [eroare, setEroare] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const schimbaMod = (m: Mod) => {
    setMod(m);
    setEroare('');
    setInfo('');
    setConfirm('');
  };

  const trimite = async () => {
    setEroare('');
    setInfo('');
    if (mod === 'register' && parola !== confirm) {
      setEroare('Parolele nu coincid.');
      return;
    }
    setLoading(true);
    const r = mod === 'login' ? await login(email, parola) : await register(email, parola);
    setLoading(false);
    if (!r.ok) {
      setEroare(r.eroare);
    } else if (r.info) {
      // cont creat, dar trebuie confirmat pe email → mergem pe tab-ul de autentificare
      setMod('login');
      setParola('');
      setConfirm('');
      setInfo(r.info);
    }
    // la succes cu sesiune, gate-ul din _layout redirecționează automat în aplicație
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 48, paddingBottom: insets.bottom + 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.logo}>
            <MaterialIcons name="fitness-center" size={30} color={Colors.onPrimary} />
          </View>
          <Text style={styles.brandName}>Max Fitness Galați</Text>
          <Text style={styles.brandTag}>Live Max · Be Fit</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{mod === 'login' ? 'Bine ai revenit' : 'Creează un cont'}</Text>
          <Text style={styles.subtitle}>
            {mod === 'login'
              ? 'Conectează-te ca să continui.'
              : 'Înregistrează-te ca să accesezi aplicația.'}
          </Text>

          {/* Segment login/register */}
          <View style={styles.segment}>
            {(['login', 'register'] as Mod[]).map((m) => {
              const activ = m === mod;
              return (
                <TouchableOpacity key={m} style={[styles.segBtn, activ && styles.segBtnActive]} onPress={() => schimbaMod(m)} activeOpacity={0.85}>
                  <Text style={[styles.segText, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
                    {m === 'login' ? 'Autentificare' : 'Cont nou'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Email */}
          <View style={styles.field}>
            <MaterialIcons name="mail-outline" size={20} color={Colors.onSurfaceVariant} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.outline}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Parolă */}
          <View style={styles.field}>
            <MaterialIcons name="lock-outline" size={20} color={Colors.onSurfaceVariant} />
            <TextInput
              style={styles.input}
              placeholder="Parolă"
              placeholderTextColor={Colors.outline}
              secureTextEntry={!vedeParola}
              autoCapitalize="none"
              value={parola}
              onChangeText={setParola}
            />
            <TouchableOpacity onPress={() => setVedeParola((v) => !v)} hitSlop={8}>
              <MaterialIcons name={vedeParola ? 'visibility-off' : 'visibility'} size={20} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          {/* Confirmă parola (doar register) */}
          {mod === 'register' && (
            <View style={styles.field}>
              <MaterialIcons name="lock-outline" size={20} color={Colors.onSurfaceVariant} />
              <TextInput
                style={styles.input}
                placeholder="Confirmă parola"
                placeholderTextColor={Colors.outline}
                secureTextEntry={!vedeParola}
                autoCapitalize="none"
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>
          )}

          {info ? (
            <View style={styles.infoBox}>
              <MaterialIcons name="mark-email-unread" size={18} color={Colors.primary} />
              <Text style={styles.infoText}>{info}</Text>
            </View>
          ) : null}

          {eroare ? (
            <View style={styles.errorBox}>
              <MaterialIcons name="error-outline" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{eroare}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.submit} activeOpacity={0.85} onPress={trimite} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} />
            ) : (
              <Text style={styles.submitText}>{mod === 'login' ? 'Autentifică-te' : 'Creează cont'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchRow} onPress={() => schimbaMod(mod === 'login' ? 'register' : 'login')} activeOpacity={0.7}>
            <Text style={styles.switchText}>
              {mod === 'login' ? 'Nu ai cont? ' : 'Ai deja cont? '}
              <Text style={styles.switchLink}>{mod === 'login' ? 'Înregistrează-te' : 'Conectează-te'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: Spacing.screen, gap: Spacing.section },
  brand: { alignItems: 'center', gap: 8 },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...Shadow.button,
  },
  brandName: { ...Type.headlineMd, color: Colors.onSurface },
  brandTag: { ...Type.label, color: Colors.primary },
  card: { backgroundColor: Colors.surface, borderRadius: 20, padding: Spacing.lg, gap: Spacing.gap, ...Shadow.card },
  title: { ...Type.headlineLg, color: Colors.onSurface },
  subtitle: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginTop: -8 },
  segment: { flexDirection: 'row', backgroundColor: Colors.surfaceAlt, borderRadius: Radius.pill, padding: 4, gap: 4 },
  segBtn: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, alignItems: 'center' },
  segBtnActive: { backgroundColor: Colors.primary, ...Shadow.button },
  segText: { ...Type.label, letterSpacing: 0 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.button,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 12 : 4,
  },
  input: { flex: 1, ...Type.bodyMd, color: Colors.onSurface, paddingVertical: 10 },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  errorText: { ...Type.bodySm, color: Colors.error, flex: 1 },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.primaryTint,
    borderRadius: Radius.button,
    padding: 12,
  },
  infoText: { ...Type.bodySm, color: Colors.onSurface, flex: 1 },
  submit: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: Radius.button,
    alignItems: 'center',
    marginTop: 4,
    ...Shadow.button,
  },
  submitText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  switchRow: { alignItems: 'center', paddingTop: 4 },
  switchText: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  switchLink: { color: Colors.primary, fontFamily: 'Inter_600SemiBold' },
});
