import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, CormorantGaramond_300Light, CormorantGaramond_300Light_Italic } from '@expo-google-fonts/cormorant-garamond';
import { HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_600SemiBold } from '@expo-google-fonts/hanken-grotesk';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono';
import { Icon, IconName } from './src/components/Icon';
import { Txt } from './src/components/Txt';
import { CareScreen } from './src/screens/CareScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { TodayScreen } from './src/screens/TodayScreen';
import { YouScreen } from './src/screens/YouScreen';
import { color, font } from './src/theme/tokens';

type Tab = 'today' | 'care' | 'results' | 'you';

const tabs: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'today', label: 'Today', icon: 'home' },
  { id: 'care', label: 'Care', icon: 'calendar' },
  { id: 'results', label: 'Results', icon: 'pulse' },
  { id: 'you', label: 'You', icon: 'user' },
];

export default function App() {
  const [loaded] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_300Light_Italic,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    IBMPlexMono_400Regular,
  });
  const [tab, setTab] = useState<Tab>('today');

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: color.canvas, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={color.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: color.canvas }} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          {tab === 'today' && <TodayScreen goTo={setTab} />}
          {tab === 'care' && <CareScreen />}
          {tab === 'results' && <ResultsScreen />}
          {tab === 'you' && <YouScreen />}
        </View>
        <View accessibilityRole="tablist" style={{ flexDirection: 'row', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 4, borderTopWidth: 1, borderTopColor: color.border, backgroundColor: color.canvas }}>
          {tabs.map((t) => {
            const on = t.id === tab;
            const c = on ? color.primary : color.textMuted;
            return (
              <Pressable
                key={t.id}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                onPress={() => setTab(t.id)}
                style={{ flex: 1, minHeight: 56, alignItems: 'center', justifyContent: 'center', gap: 4 }}
              >
                <Icon name={t.icon} stroke={c} />
                <Txt variant="caption" color={c} style={{ fontFamily: font.uiSemibold, fontSize: 12, lineHeight: 16 }}>{t.label}</Txt>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
