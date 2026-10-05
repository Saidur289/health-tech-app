import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Txt } from '../components/Txt';
import { Badge, Button, Card, SectionHeader, Segmented } from '../components/ui';
import { appointments, bookedSlots, clinicians, days, slots } from '../data/sample';
import { color, font, layout, radius, space } from '../theme/tokens';

/** Booking recipe: clinician card, choices top to bottom, cost + confirm pinned. */
export function CareScreen() {
  const [clinician, setClinician] = useState(clinicians[0].id);
  const [visitType, setVisitType] = useState<'video' | 'person'>('video');
  const [day, setDay] = useState(days[0].id);
  const [slot, setSlot] = useState('10:30 AM');
  const [confirmed, setConfirmed] = useState(false);

  const doc = clinicians.find((c) => c.id === clinician)!;
  const d = days.find((x) => x.id === day)!;

  const footer = confirmed ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3], minHeight: 52 }}>
      <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: color.keylime, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="check" size={18} />
      </View>
      <View style={{ flex: 1 }}>
        <Txt variant="title3" color={color.primary}>Booked for {d.dow} {d.date} Oct, {slot}</Txt>
        <Txt variant="caption">We’ll remind you the day before.</Txt>
      </View>
    </View>
  ) : (
    <View style={{ gap: space[3] }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Txt variant="bodySm">Estimated cost</Txt>
        <Txt variant="bodySm" color={color.text} style={{ fontFamily: font.uiSemibold }}>[COPAY]</Txt>
      </View>
      <Button label={`Confirm ${slot}`} onPress={() => setConfirmed(true)} />
    </View>
  );

  return (
    <Screen footer={footer}>
      <View style={{ gap: space[2] }}>
        <Txt variant="label">Care</Txt>
        <Txt variant="title1" accessibilityRole="header">Book a visit</Txt>
      </View>

      <View style={{ gap: space[3] }}>
        <Txt variant="title3">Clinician</Txt>
        {clinicians.map((c) => {
          const on = c.id === clinician;
          return (
            <Pressable
              key={c.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              onPress={() => { setClinician(c.id); setConfirmed(false); }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: space[4], padding: 16, borderRadius: radius.md, backgroundColor: on ? color.keylime : color.card, borderWidth: on ? 2 : 1, borderColor: on ? color.primary : color.border }}
            >
              <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: on ? color.sage : color.paper, alignItems: 'center', justifyContent: 'center' }}>
                <Txt variant="bodySm" color={color.primary} style={{ fontFamily: font.uiSemibold }}>{c.initials}</Txt>
              </View>
              <View style={{ flex: 1 }}>
                <Txt variant="title3">{c.name}</Txt>
                <Txt variant="caption" color={color.textBody}>{c.role} · In network</Txt>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ gap: space[3] }}>
        <Txt variant="title3">Visit type</Txt>
        <Segmented label="Visit type" value={visitType} onChange={(v) => { setVisitType(v); setConfirmed(false); }} options={[{ id: 'video', label: 'Video' }, { id: 'person', label: 'In person' }]} />
      </View>

      <View style={{ gap: space[3] }}>
        <Txt variant="title3">Day</Txt>
        <View style={{ flexDirection: 'row', gap: space[2] }}>
          {days.map((x) => {
            const on = x.id === day;
            return (
              <Pressable
                key={x.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: on }}
                accessibilityLabel={`${x.dow} ${x.date} October`}
                onPress={() => { setDay(x.id); setConfirmed(false); }}
                style={{ flex: 1, minHeight: 64, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? color.primary : color.card, borderWidth: on ? 0 : 1, borderColor: color.border }}
              >
                <Txt variant="caption" color={on ? color.keylime : color.textBody}>{x.dow}</Txt>
                <Txt variant="title3" color={on ? color.canvas : color.text}>{x.date}</Txt>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={{ gap: space[3] }}>
        <Txt variant="title3">Time</Txt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
          {slots.map((s) => {
            const booked = bookedSlots.includes(s);
            const on = s === slot;
            return (
              <Pressable
                key={s}
                disabled={booked}
                accessibilityRole="radio"
                accessibilityState={{ checked: on, disabled: booked }}
                accessibilityLabel={booked ? `${s}, unavailable` : s}
                onPress={() => { setSlot(s); setConfirmed(false); }}
                style={{ flexBasis: '31%', flexGrow: 1, minHeight: 48, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? color.keylime : color.card, borderWidth: on ? 2 : 1, borderColor: on ? color.primary : color.border, borderStyle: booked ? 'dashed' : 'solid' }}
              >
                <Txt variant="bodySm" color={booked ? color.textMuted : on ? color.primary : color.text} style={{ fontFamily: on ? font.uiSemibold : font.uiMedium, textDecorationLine: booked ? 'line-through' : 'none' }}>{s}</Txt>
              </Pressable>
            );
          })}
        </View>
        <Txt variant="caption">{doc.name} · {visitType === 'video' ? 'Video visit' : 'In person, Mission Street Clinic'} · 20 min</Txt>
      </View>

      <View style={{ gap: space[4], marginTop: space[2] }}>
        <SectionHeader title="Already booked" />
        <Card style={{ paddingVertical: 0 }}>
          {appointments.map((a, i) => (
            <View key={a.id} style={{ paddingVertical: 16, gap: 4, borderBottomWidth: i < appointments.length - 1 ? 1 : 0, borderBottomColor: color.divider }}>
              <Txt variant="title3">{a.title}</Txt>
              <Txt variant="bodySm">{a.mon} {a.day} Oct · {a.meta}</Txt>
              <View style={{ marginTop: 4 }}><Badge label={a.badge} status={a.status} /></View>
            </View>
          ))}
        </Card>
      </View>
      <View style={{ height: layout.cardGap }} />
    </Screen>
  );
}
