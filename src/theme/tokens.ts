// Claude Demo — Parchment & Forest design tokens.
// Every screen and component reads from here. Don't hard-code colours,
// sizes or fonts anywhere else.

export const color = {
  canvas: '#FBF7EE', // every screen background
  card: '#FFFFFF', // raised data cards only
  paper: '#F5EEE1', // editorial panels, date tiles, their chat bubbles
  keylime: '#E3F0DC', // hero panels, selected states, insights
  sage: '#B7D7B9', // healthy-range bands, ring tracks on dark
  slate: '#BACFD4', // cool data / preview panels
  primary: '#123F22', // forest ink: primary actions, headings, icons
  primaryPressed: '#0C2F10',
  text: '#23262A', // ink
  textBody: '#3E4146', // graphite
  textMuted: '#6C6F73', // captions only
  textOnInsight: '#1F3A24',
  border: '#E6DFD0', // hairline
  divider: '#EFE9DC',
  track: '#EFE9DC', // progress / range-bar track
  segmentTrack: '#EFEADD',
  inputBorder: '#DDD6C6',
  toggleOff: '#D6CFBF',
  signal: '#B05A36', // terracotta: dots, large accent only
  signalText: '#8A4427',
  signalTint: '#F5E4DA',
  pendingText: '#7A5C14',
  pendingTint: '#F6ECD2',
  infoText: '#2C4F6B',
  infoTint: '#E2EBF1',
  series2: '#5E8F6E',
} as const;

export const font = {
  display: 'CormorantGaramond_300Light',
  displayItalic: 'CormorantGaramond_300Light_Italic',
  ui: 'HankenGrotesk_400Regular',
  uiMedium: 'HankenGrotesk_500Medium',
  uiSemibold: 'HankenGrotesk_600SemiBold',
  data: 'IBMPlexMono_400Regular',
} as const;

// Type scale (size / line height). Use only these.
export const type = {
  display: { fontFamily: font.display, fontSize: 48, lineHeight: 50, letterSpacing: -1.4 },
  title1: { fontFamily: font.display, fontSize: 36, lineHeight: 40, letterSpacing: -0.7 },
  metric: { fontFamily: font.display, fontSize: 40, lineHeight: 40 },
  title2: { fontFamily: font.uiSemibold, fontSize: 22, lineHeight: 29 },
  title3: { fontFamily: font.uiSemibold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: font.ui, fontSize: 17, lineHeight: 27 },
  bodySm: { fontFamily: font.ui, fontSize: 15, lineHeight: 22 },
  button: { fontFamily: font.uiSemibold, fontSize: 16, lineHeight: 20, letterSpacing: 0.16 },
  caption: { fontFamily: font.ui, fontSize: 13, lineHeight: 19 },
  label: { fontFamily: font.data, fontSize: 12, lineHeight: 16, letterSpacing: 1, textTransform: 'uppercase' as const },
} as const;

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 80 } as const;

export const radius = { xs: 4, sm: 12, md: 20, pill: 999 } as const;

export const layout = {
  sideMargin: 24,
  cardPadding: 20,
  cardGap: 12,
  sectionGap: 32,
  targetMin: 48,
} as const;
