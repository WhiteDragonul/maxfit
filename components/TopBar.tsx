import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Type } from '@/constants/theme';

interface Props {
  // Modul „acasă": avatar + salut + nume. Dacă e dat `title`, afișează bara cu titlu centrat.
  title?: string;
  name?: string;
  avatar?: string;
}

const salutCurent = () => {
  const ora = new Date().getHours();
  return ora < 12 ? 'Bună dimineața,' : ora < 18 ? 'Bună ziua,' : 'Bună seara,';
};

export default function TopBar({ title, name = 'Alexandru', avatar }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      {title ? (
        <>
          <View style={styles.side} />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.side, { alignItems: 'flex-end' }]}>
            <BellButton />
          </View>
        </>
      ) : (
        <>
          <View style={styles.left}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <MaterialIcons name="person" size={22} color={Colors.onSurfaceVariant} />
              </View>
            )}
            <View>
              <Text style={styles.greeting}>{salutCurent()}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          <BellButton />
        </>
      )}
    </View>
  );
}

function BellButton() {
  return (
    <TouchableOpacity style={styles.bell} activeOpacity={0.7}>
      <MaterialIcons name="notifications-none" size={24} color={Colors.primary} />
      <View style={styles.dot} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  side: { width: 40, justifyContent: 'center' },
  title: {
    flex: 1,
    textAlign: 'center',
    ...Type.headlineMd,
    fontSize: 20,
    color: Colors.primary,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  avatarPlaceholder: {
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  name: { ...Type.headlineMd, fontSize: 20, color: Colors.onSurface },
  bell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.surface,
  },
});
