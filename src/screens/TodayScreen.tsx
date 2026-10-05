import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ring, TrendChart } from '../components/charts';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Txt } from '../components/Txt';
import { Badge, Button, Card, ProgressBar, SectionHeader, Segmented, TextLink } from '../components/ui';
import { activity, appointments, heartTrend, metrics, nextVisit, patient, Range } from '../data/sample';
import { color, font, layout, radius, space } from '../theme/tokens';

export function TodayScreen({ goTo }: { goTo: (tab: 'care' | 'results' | 'you') => void }) {
  const [range, setRange] = useState<Range>('week');
  const [joined, setJoined] = useState(false);
  const t = heartTrend[range];

  return (
    <Screen>
      {/* 1 · Context */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: space[4] }}>
        <View style={{ flex: 1, gap: space[2] }}>
          <Txt variant="label">Tuesday · 7 October</Txt>
          <Txt variant="display" accessibilityRole="header">Good morning, {patient.firstName}</Txt>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Your profile"
          onPress={() => goTo('you')}
          style={{ width: 48, height: 48, borderRadius: radius.pill, backgroundColor: color.keylime, alignItems: 'center', justifyContent: 'center' }}
        >
          <Txt variant="bodySm" color={color.primary} style={{ fontFamily: font.uiSemibold }}>{patient.initials}</Txt>
        </Pressable>
      </View>

      {/* 2 · Hero: the one time-sensitive thing, holding the screen's primary action */}
      <Card kind="hero" style={{ gap: space[4] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="label" color={color.sage}>{nextVisit.countdown}</Txt>
          <Icon name="video" stroke={color.sage} />
        </View>
        <View style={{ gap: space[1] }}>
          <Txt variant="title2" color={color.canvas}>{nextVisit.title}</Txt>
          <Txt variant="bodySm" color={color.keylime}>{nextVisit.meta}</Txt>
        </View>
        <Button variant="onHero" label={joined ? 'You’re in the waiting room' : 'Join waiting room'} onPress={() => setJoined(true)} />
        <Txt variant="caption" color={color.sage} style={{ textAlign: 'center' }}>
          {joined ? 'Dr. Marsh will join you at 10:30 AM.' : nextVisit.note}
        </Txt>
      </Card>

      {/* 3 · Daily overview */}
      <View style={{ gap: space[4] }}>
        <View style={{ gap: space[1] }}>
          <Txt variant="title1" accessibilityRole="header">
            You’re <Txt variant="title1" style={{ fontFamily: font.displayItalic }}>on track</Txt> today
          </Txt>
          <Txt variant="caption">All 4 readings in your range · Synced 5 min ago</Txt>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: layout.cardGap }}>
          {metrics.map((m) => (
            <Card key={m.label} onPress={() => goTo('results')} style={{ flexBasis: '47%', flexGrow: 1, minHeight: 168, gap: space[2] }}>
              <Txt variant="caption" color={color.textBody} style={{ fontFamily: font.uiMedium }}>{m.label}</Txt>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
                <Txt variant="metric">{m.value}</Txt>
                {m.unit ? <Txt variant="caption" color={color.textBody}>{m.unit}</Txt> : null}
              </View>
              <Txt variant="caption" color={color.textBody} style={{ marginTop: 'auto' }}>{m.context}</Txt>
              <Badge label={m.status} />
            </Card>
          ))}
        </View>
      </View>

      {/* 4 · Activity */}
      <Card style={{ padding: space[5], gap: 20 }}>
        <SectionHeader title="Activity" action={<Txt variant="caption">Today so far</Txt>} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Ring value={activity.steps / activity.stepsGoal} label={`Steps: ${activity.steps} of ${activity.stepsGoal}`} />
          <View style={{ flex: 1, gap: space[1] }}>
            <Txt variant="caption" color={color.textBody}>Steps</Txt>
            <Txt variant="metric">{activity.steps.toLocaleString('en-US')}</Txt>
            <Txt variant="caption" color={color.textBody}>of {activity.stepsGoal.toLocaleString('en-US')} · about a 15-min walk to go</Txt>
          </View>
        </View>
        <View style={{ gap: space[4] }}>
          <View style={{ gap: space[2] }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Txt variant="bodySm" color={color.text} style={{ fontFamily: font.uiMedium }}>Active minutes</Txt>
              <Txt variant="bodySm">{activity.activeMin} of {activity.activeGoal} min</Txt>
            </View>
            <ProgressBar value={activity.activeMin / activity.activeGoal} />
          </View>
          <View style={{ gap: space[2] }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Txt variant="bodySm" color={color.text} style={{ fontFamily: font.uiMedium }}>Distance</Txt>
              <Txt variant="bodySm">{activity.km} of {activity.kmGoal} km</Txt>
            </View>
            <ProgressBar value={activity.km / activity.kmGoal} />
          </View>
        </View>
      </Card>

      {/* 5 · Trend */}
      <Card style={{ padding: space[5], gap: space[4] }}>
        <View style={{ gap: space[1] }}>
          <Txt variant="title2" accessibilityRole="header">Resting heart rate</Txt>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: space[2], flexWrap: 'wrap' }}>
            <Txt variant="metric">{t.avg}</Txt>
            <Txt variant="bodySm">bpm avg · {t.change}</Txt>
          </View>
        </View>
        <Segmented
          label="Time range"
          value={range}
          onChange={setRange}
          options={[{ id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }, { id: 'year', label: 'Year' }]}
        />
        <TrendChart values={t.v} low={55} high={70} min={50} max={80} label={`Resting heart rate, ${t.avg} bpm average, inside your 55 to 70 range`} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt variant="caption">{t.start}</Txt>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 8, borderRadius: 2, backgroundColor: color.sage }} />
            <Txt variant="caption">Your range 55–70</Txt>
          </View>
          <Txt variant="caption">{t.end}</Txt>
        </View>
      </Card>

      {/* 6 · Insight */}
      <Card kind="insight" style={{ gap: space[2] }}>
        <Txt variant="label">What this means</Txt>
        <Txt variant="body" color={color.textOnInsight}>
          Two early nights lowered your resting heart rate by 3 bpm this week. Keeping a 10:30 PM wind-down should hold it there.
        </Txt>
      </Card>

      {/* 7 · Upcoming appointments */}
      <View style={{ gap: space[4] }}>
        <SectionHeader title="Upcoming appointments" action={<TextLink label="See all" onPress={() => goTo('care')} />} />
        <Card style={{ paddingVertical: 0 }}>
          {appointments.map((a, i) => (
            <Pressable
              key={a.id}
              accessibilityRole="button"
              onPress={() => goTo('care')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: space[4], paddingVertical: 20, borderBottomWidth: i < appointments.length - 1 ? 1 : 0, borderBottomColor: color.divider }}
            >
              <View style={{ width: 56, height: 64, borderRadius: radius.sm, backgroundColor: color.paper, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Txt variant="label" color={color.textBody}>{a.mon}</Txt>
                <Txt variant="metric" style={{ fontSize: 32, lineHeight: 34 }}>{a.day}</Txt>
              </View>
              <View style={{ flex: 1, gap: space[1] }}>
                <Txt variant="title3">{a.title}</Txt>
                <Txt variant="bodySm">{a.meta}</Txt>
                <View style={{ marginTop: 4 }}><Badge label={a.badge} status={a.status} /></View>
              </View>
              <Icon name="chevron" size={20} />
            </Pressable>
          ))}
        </Card>
        <Button variant="secondary" label="Book a visit" onPress={() => goTo('care')} />
      </View>
    </Screen>
  );
}
