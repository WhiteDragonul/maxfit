# MaxFit Galați — Aplicație mobilă

Aplicația oficială MaxFit (maxfit.ro), sala de fitness din Galați. Construită cu **Expo (React Native)** — un singur cod pentru iOS (App Store) și Android (Google Play).

## Funcționalități

- **Acasă** — banner promo, statistici, clasele zilei
- **Clase** — orar cu filtrare pe zile, rezervare de locuri + confirmare în bottom sheet
- **Antrenamente** — planuri pe grupe musculare, carduri expandabile
- **Abonamente** — 3 pachete cu prețuri și beneficii
- **Profil** — card de membru, QR check-in, acțiuni rapide, contact

## Design

Design "Liquid Vitality" (iOS liquid glass) generat cu Stitch AI — exportul original (HTML + capturi + design system) e păstrat în `stitch_design/` ca referință. Token-urile exacte (culori, fonturi Inter, spacing) sunt în `constants/theme.ts`, iar efectul de sticlă e implementat în `components/GlassCard.tsx` cu expo-blur + expo-linear-gradient.

## Rulare locală

```bash
npm install
npx expo start
```

Scanează codul QR cu aplicația **Expo Go** (din App Store / Google Play) pentru a testa pe telefon.

## Publicare în App Store și Google Play

Se face cu [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas login                      # cont gratuit pe expo.dev
eas build --platform android   # generează .aab pentru Google Play
eas build --platform ios       # generează .ipa pentru App Store (necesită cont Apple Developer, 99$/an)
eas submit --platform android  # trimite în Google Play Console (cont o singură dată, 25$)
eas submit --platform ios      # trimite în App Store Connect
```

Identificatori configurați în `app.json`:
- iOS bundle ID: `ro.maxfit.app`
- Android package: `ro.maxfit.app`

## De înlocuit înainte de publicare

- `assets/icon.png`, `assets/splash.png`, `assets/adaptive-icon.png` — sunt placeholder, pune logo-ul real MaxFit (icon: 1024×1024 px)
- Conținutul ecranelor (clase, prețuri, telefon, nume membru) e cel demo din design-ul Stitch — se modifică direct în fișierele din `app/(tabs)/`
- Pentru conturi reale, rezervări salvate și QR funcțional e nevoie de un backend
