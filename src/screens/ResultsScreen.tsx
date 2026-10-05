import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Txt } from '../components/Txt';
import { Badge, Button, Card, RangeBar } from '../components/ui';
import { results } from '../data/sample';
import { color, font, layout, space } from '../theme/tokens';

/** Results recipe: mono date, serif verdict, big number, systems with range bars. */
export function ResultsScreen() {
  const [open, setOpen] = useState<string | null>('s1');
  const [requested, setRequested] = useState(false);

  return (
    <Screen
      footer={
        <Button
          label={requested ? 'Message sent to Dr. Marsh' : 'Discuss with a clinician'}
          onPress={() => setRequested(true)}
        />
      }
    >
      <View style={{ gap: space[2] }}>
        <Txt variant="label">{results.date}</Txt>
        <Txt variant="title1" accessibilityRole="header">
          Mostly <Txt variant="title1" style={{ fontFamily: font.displayItalic }}>in range.</Txt>
        </Txt>
        <Txt variant="body">One marker is above your range. Dr. Marsh has been notified and will review it.</Txt>
      </View>

      <Card kind="hero" style={{ flexDirection: 'row', alignItems: 'baseline', gap: space[3] }}>
        <Txt variant="display" color={color.canvas} style={{ fontSize: 56, lineHeight: 56 }}>{results.optimalPct}%</Txt>
        <Txt variant="bodySm" color={color.keylime} style={{ flex: 1 }}>
          of {results.total} markers optimal, up from {results.previousPct}% in spring
        </Txt>
      </Card>

      <View style={{ gap: layout.cardGap }}>
        {results.systems.map((s) => {
          const isOpen = open === s.id;
          return (
            <Card key={s.id} style={{ padding: 0 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                onPress={() => setOpen(isOpen ? null : s.id)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: space[3], padding: 20, minHeight: 72 }}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt variant="title3">{s.name}</Txt>
                  <Txt variant="caption" color={color.textBody}>{s.count} markers</Txt>
                </View>
                <Badge label={s.badge} status={s.status} />
                <View style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}>
                  <Icon name="chevron" size={20} />
                </View>
              </Pressable>
              {isOpen ? (
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 20, borderTopWidth: 1, borderTopColor: color.divider, paddingTop: 16 }}>
                  {s.markers.map((m) => {
                    const high = m.value > m.high;
                    const low = m.value < m.low;
                    return (
                      <View key={m.name} style={{ gap: space[2] }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Txt variant="bodySm" color={color.text} style={{ fontFamily: font.uiSemibold }}>{m.name}</Txt>
                          <Txt variant="bodySm" color={high || low ? color.signalText : color.text} style={{ fontFamily: high || low ? font.uiSemibold : font.ui }}>
                            {m.value} {m.unit}{high ? ' · High' : low ? ' · Low' : ''}
                          </Txt>
                        </View>
                        <RangeBar min={m.min} max={m.max} low={m.low} high={m.high} value={m.value} />
                        <Txt variant="caption">Your range {m.low}–{m.high} {m.unit}</Txt>
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
