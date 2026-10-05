# Claude Demo

A demo health app built with Expo (React Native) in the Parchment & Forest visual style. It runs on iPhone, Android and the web. All data is sample data.

## Screens

- **Today**: greeting, next video visit (main action: Join waiting room), four key readings, activity, resting heart rate trend (Week / Month / Year), insight and upcoming appointments.
- **Care**: book a visit (choose a clinician, visit type, day and time, then confirm).
- **Results**: lab summary with expandable body systems and range bars.
- **You**: profile, notification and privacy toggles, connected devices, close account.

## Run it on your phone

1. Install [Node.js](https://nodejs.org) (version 20 or later).
2. Install **Expo Go** from the App Store or Google Play.
3. In this folder, run:

   ```bash
   npm install
   npx expo start
   ```

4. Scan the QR code shown in the terminal with your phone's camera (iPhone) or the Expo Go app (Android).

To open it in a web browser instead, run `npx expo start --web`.

## Where things live

| Path | What it is |
|---|---|
| `src/theme/tokens.ts` | All colours, fonts, the type scale, spacing and radii. Change the look here. |
| `src/components/` | Reusable parts: `Txt` (text), `Button`, `Card`, `Badge`, `Segmented`, `Toggle`, `ProgressBar`, `RangeBar`, `Ring`, `TrendChart`, `Icon`, `Screen`. |
| `src/screens/` | One file per tab. |
| `src/data/sample.ts` | Sample data. Replace with real data later. |
| `App.tsx` | Loads fonts and switches between tabs. |

## Design rules built in

- Parchment background on every screen; white only for raised cards; no shadows.
- One main (forest green) button per screen.
- Cormorant Garamond for titles and big numbers, Hanken Grotesk for interface text, IBM Plex Mono for small labels.
- Every reading shows a unit, its range or a comparison, and a time.
- Terracotta appears only on out-of-range results, always with a word ("High").

## Next steps

- **Real health data**: Apple HealthKit (iPhone) and Health Connect (Android). These need a development build rather than Expo Go.
- **Accounts and appointments**: add a backend, such as Supabase, for sign-in and storing appointments.
- **Patient data compliance**: if you store real patient data in the US, use HIPAA-compliant services with a signed business associate agreement.
- **Publishing**: `npx eas-cli@latest build` and `npx eas-cli@latest submit` build and submit to the App Store and Google Play.
