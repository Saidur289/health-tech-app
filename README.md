<p align="center">
  <img src="./assets/icon.png" alt="HealthPulse Logo" width="120" height="120" style="border-radius: 24px;" />
</p>

<h1 align="center">HealthPulse</h1>

<p align="center">
  <strong>A modern, cross-platform health & wellness companion built with Expo & React Native</strong>
</p>

<p align="center">
  <a href="https://github.com/Saidur289/health-tech-app/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Saidur289/health-tech-app?style=flat-square&color=123F22" alt="License" />
  </a>
  <a href="https://github.com/Saidur289/health-tech-app">
    <img src="https://img.shields.io/github/stars/Saidur289/health-tech-app?style=flat-square&color=123F22" alt="Stars" />
  </a>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-FBF7EE?style=flat-square&labelColor=123F22" alt="Platform" />
  <img src="https://img.shields.io/badge/Expo-SDK%2057-000020?style=flat-square&logo=expo" alt="Expo SDK" />
  <img src="https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=flat-square&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-design-system">Design System</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 📖 Overview

**HealthPulse** is a patient-facing health dashboard that unifies biometric readings, appointment management, lab results, and personalized health insights into a single, beautiful interface. Built using the **Parchment & Forest** design language, it delivers a warm, clinical-grade experience across iOS, Android, and the web.

> **Note**: This project uses sample data for demonstration. It is designed as a production-ready scaffold that can be connected to real health APIs (Apple HealthKit, Google Health Connect, FHIR-compliant backends) with minimal refactoring.

---

## ✨ Features

### 📊 Today Dashboard
- **Personalized greeting** with date context and profile avatar
- **Real-time biometric cards** — Sleep, Resting Heart Rate, Blood Pressure, Blood Oxygen — each with unit, reference range, and status badge
- **Hero card** for upcoming video visits with a *Join Waiting Room* action
- **Activity tracker** with step ring, active minutes, and distance progress bars
- **Resting heart rate trend chart** with Week / Month / Year segmented control and healthy-range overlay
- **AI-powered insight card** that interprets trends in plain language
- **Upcoming appointments** list with quick-book access

### 📅 Care — Appointment Booking
- **Clinician selection** with role, network status, and avatar
- **Visit type toggle** — Video or In-person
- **Interactive day picker** and **time slot grid** with unavailable slots visually disabled
- **Cost estimate** and one-tap **confirmation flow**
- **Already booked** section for at-a-glance schedule management

### 🧬 Results — Lab Report Viewer
- **Summary verdict** with editorial serif typography (*"Mostly in range."*)
- **Percentage optimal hero card** with historical comparison
- **Expandable body system cards** (Heart, Metabolic, Thyroid)
- **Range bars** per biomarker with colored dot indicators (forest = in range, terracotta = out of range)
- **One-tap clinician messaging** for follow-up discussions

### ⚙️ You — Profile & Settings
- **Profile card** with patient initials, name, and ID
- **Notification preferences** — appointment reminders, new results, quiet hours
- **Privacy controls** — record sharing, research contribution opt-in
- **Connected devices** dashboard — Smartwatch, BP cuff, Smart scale with sync status
- **Account closure** with destructive action pattern

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Expo SDK 57](https://expo.dev) | Managed workflow, OTA updates, cross-platform builds |
| **UI Runtime** | [React Native 0.86](https://reactnative.dev) | Native UI components on iOS & Android |
| **Web** | [React Native Web](https://necolas.github.io/react-native-web/) | Web target via Expo |
| **Language** | [TypeScript 6.0](https://www.typescriptlang.org) | End-to-end type safety |
| **Typography** | [Expo Google Fonts](https://github.com/expo/google-fonts) | Cormorant Garamond, Hanken Grotesk, IBM Plex Mono |
| **Icons** | Custom SVG via `react-native-svg` | Hand-crafted, pixel-perfect icon set |
| **State** | React `useState` | Lightweight local state (ready for migration to Zustand/Redux) |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| [Node.js](https://nodejs.org) | ≥ 20.x |
| [npm](https://www.npmjs.com) | ≥ 10.x |
| [Expo Go](https://expo.dev/go) *(mobile)* | Latest |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Saidur289/health-tech-app.git
cd health-tech-app

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

### Running on Devices

| Platform | Command | Notes |
|---|---|---|
| **📱 iOS** | `npm run ios` | Requires Xcode or scan QR with Expo Go |
| **🤖 Android** | `npm run android` | Requires Android Studio or scan QR with Expo Go |
| **🌐 Web** | `npm run web` | Opens at `http://localhost:8081` |
| **📲 Expo Go** | Scan QR code | From the terminal after `npx expo start` |

---

## 📁 Project Structure

```
health-tech-app/
├── App.tsx                        # Root — font loader, tab navigator
├── index.ts                       # Entry point (registerRootComponent)
├── app.json                       # Expo configuration
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
│
├── assets/                        # App icons, splash, favicon
│   ├── icon.png
│   ├── splash-icon.png
│   ├── favicon.png
│   ├── android-icon-foreground.png
│   ├── android-icon-background.png
│   └── android-icon-monochrome.png
│
└── src/
    ├── theme/
    │   └── tokens.ts              # 🎨 Design tokens (colors, fonts, spacing, radii)
    │
    ├── components/
    │   ├── Icon.tsx                # SVG icon library (home, calendar, pulse, user, etc.)
    │   ├── Txt.tsx                 # Typography component with variant system
    │   ├── Screen.tsx              # Scrollable screen wrapper with footer slot
    │   ├── ui.tsx                  # Button, Card, Badge, Segmented, Toggle, ProgressBar, RangeBar
    │   └── charts.tsx             # Ring (donut) and TrendChart components
    │
    ├── screens/
    │   ├── TodayScreen.tsx         # Dashboard — vitals, activity, trends, appointments
    │   ├── CareScreen.tsx          # Booking — clinician, type, day, time, confirm
    │   ├── ResultsScreen.tsx       # Lab results — systems, markers, range bars
    │   └── YouScreen.tsx           # Settings — profile, notifications, privacy, devices
    │
    └── data/
        └── sample.ts              # Mock data layer (swap with real APIs)
```

---

## 🎨 Design System

### Parchment & Forest — Visual Language

HealthPulse follows a bespoke **Parchment & Forest** design language crafted for healthcare applications that need to feel warm, trustworthy, and clinical without being sterile.

#### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `canvas` | `#FBF7EE` | Every screen background |
| `card` | `#FFFFFF` | Raised data cards only |
| `paper` | `#F5EEE1` | Editorial panels, date tiles |
| `keylime` | `#E3F0DC` | Hero panels, selected states, insights |
| `sage` | `#B7D7B9` | Healthy-range bands, ring tracks |
| `primary` | `#123F22` | Forest ink — primary actions, headings |
| `signal` | `#B05A36` | Terracotta — out-of-range, always paired with a word |
| `text` | `#23262A` | Primary ink |
| `textMuted` | `#6C6F73` | Captions only |

#### Typography Scale

| Variant | Font | Size | Use Case |
|---|---|---|---|
| `display` | Cormorant Garamond Light | 48px | Screen hero titles |
| `title1` | Cormorant Garamond Light | 36px | Section headings |
| `metric` | Cormorant Garamond Light | 40px | Large numbers |
| `title2` | Hanken Grotesk SemiBold | 22px | Card headings |
| `title3` | Hanken Grotesk SemiBold | 18px | Sub-headings |
| `body` | Hanken Grotesk Regular | 17px | Paragraphs |
| `button` | Hanken Grotesk SemiBold | 16px | Button labels |
| `caption` | Hanken Grotesk Regular | 13px | Metadata, timestamps |
| `label` | IBM Plex Mono Regular | 12px | Uppercase data labels |

#### Design Principles

1. **Parchment background everywhere** — white is reserved for raised cards only; no shadows
2. **One primary action per screen** — forest green pill button, maximum one per view
3. **Signal = terracotta + word** — out-of-range indicators always pair color with text (e.g., *"High"*), never color alone
4. **Every reading has context** — unit, reference range or comparison, and timestamp
5. **Serif for editorial, sans for interface** — Cormorant Garamond conveys warmth; Hanken Grotesk ensures readability

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────┐
│                   App.tsx                     │
│         Font Loader + Tab Navigator          │
├──────────────────────────────────────────────┤
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  Today   │ │   Care   │ │ Results  │    │
│  │  Screen  │ │  Screen  │ │  Screen  │    │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘    │
│       │             │             │          │
│  ┌──────────┐                               │
│  │   You    │    Screens read from:          │
│  │  Screen  │    • src/data/sample.ts        │
│  └────┬─────┘    • src/theme/tokens.ts       │
│       │                                      │
├───────┴──────────────────────────────────────┤
│              Component Library               │
│  Txt · Card · Button · Badge · Toggle        │
│  Segmented · ProgressBar · RangeBar          │
│  Ring · TrendChart · Icon · Screen           │
├──────────────────────────────────────────────┤
│              Design Tokens                   │
│  color · font · type · space · radius        │
└──────────────────────────────────────────────┘
```

**Key architectural decisions:**
- **Token-driven styling** — All colors, fonts, spacing, and radii flow from a single `tokens.ts` file. Theming or white-labeling requires editing only this file.
- **Composition over configuration** — Components like `Card` accept a `kind` prop (`data`, `hero`, `insight`, `paper`) rather than accepting raw style overrides.
- **Sample data layer** — All mock data lives in `src/data/sample.ts`, making it trivial to swap in real API calls without touching UI code.
- **Zero navigation dependency** — Tab switching is managed via simple `useState` in `App.tsx`, keeping the dependency tree minimal. Ready for migration to React Navigation or Expo Router when needed.

---

## 🗺 Roadmap

| Phase | Feature | Status |
|---|---|---|
| **v1.0** | Core UI with all 4 screens | ✅ Complete |
| **v1.1** | Expo Router navigation | 🔲 Planned |
| **v1.2** | Apple HealthKit integration (dev build) | 🔲 Planned |
| **v1.3** | Google Health Connect integration | 🔲 Planned |
| **v2.0** | Backend integration (Supabase / FHIR) | 🔲 Planned |
| **v2.1** | Authentication (SSO + biometric) | 🔲 Planned |
| **v2.2** | Push notifications (Expo Notifications) | 🔲 Planned |
| **v3.0** | HIPAA-compliant data storage | 🔲 Planned |
| **v3.1** | EAS Build + App Store / Play Store submission | 🔲 Planned |
| **v3.2** | Dark mode / theming support | 🔲 Planned |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m "feat: add medication tracker screen"
   ```
4. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

### Development Guidelines

- **Never hard-code colors, fonts, or spacing** — always use tokens from `src/theme/tokens.ts`
- **One primary action per screen** — follow the existing design pattern
- **TypeScript strict mode** — all code must be fully typed
- **Prefer Expo modules** over third-party libraries when available
- **Test on all platforms** — iOS, Android, and Web before submitting

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev) — Universal React platform
- [React Native](https://reactnative.dev) — Cross-platform UI framework
- [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Hanken Grotesk, IBM Plex Mono
- Design inspired by modern health-tech platforms like [One Medical](https://www.onemedical.com) and [Forward](https://www.goforward.com)

---

<p align="center">
  Built with 💚 by <a href="https://github.com/Saidur289">Saidur289</a>
</p>
