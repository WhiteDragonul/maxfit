# MaxFit Galați — Aplicație mobilă

Aplicația oficială MaxFit (maxfit.ro), sala de fitness din Galați. Construită cu **Expo (React Native)** — un singur cod pentru iOS (App Store) și Android (Google Play).

## Funcționalități

- **Acasă** — clasele zilei, programul sălii, contact
- **Clase** — orar complet cu filtrare pe zile și rezervare de locuri
- **Antrenamente** — planuri de antrenament pe grupe musculare
- **Abonamente** — prețuri și beneficii
- **Profil** — abonament, vizite, cod de check-in

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
- Datele de contact din `constants/data.ts` (telefon, adresă exactă)
- Prețurile și clasele din `constants/data.ts` cu cele reale
- Datele membrului din `app/(tabs)/profil.tsx` sunt demo — pentru conturi reale e nevoie de un backend
