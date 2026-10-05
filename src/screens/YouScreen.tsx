import { useState } from 'react';
import { View } from 'react-native';
import { Icon, IconName } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Txt } from '../components/Txt';
import { Badge, Button, Card, Toggle } from '../components/ui';
import { patient } from '../data/sample';
import { color, font, radius, space } from '../theme/tokens';

type Row = { key: string; title: string; desc: string };

const groups: { title: string; icon: IconName; rows: Row[] }[] = [
  {
    title: 'Notifications', icon: 'bell', rows: [
      { key: 'appt', title: 'Appointment reminders', desc: 'The day before and 1 hour before' },
      { key: 'results', title: 'New results', desc: 'When lab results are ready' },
      { key: 'quiet', title: 'Quiet hours', desc: 'Pause non-urgent alerts 10 PM–7 AM' },
    ],
  },
  {
    title: 'Privacy', icon: 'shield', rows: [
      { key: 'share', title: 'Share records with my care team', desc: 'So you don’t repeat tests' },
      { key: 'research', title: 'Contribute to research', desc: 'De-identified data only' },
    ],
  },
];

/** Settings recipe: serif title, white cards of rows, save bottom, destructive isolated. */
export function YouScreen() {
  const [on, setOn] = useState<Record<string, boolean>>({ appt: true, results: true, quiet: true, share: true, research: false });
  const [saved, setSaved] = useState(false);
  const set = (k: string, v: boolean) => { setOn({ ...on, [k]: v }); setSaved(false); };

  return (
    <Screen footer={<Button label={saved ? 'Changes saved' : 'Save changes'} onPress={() => setSaved(true)} />}>
      <View style={{ gap: space[2] }}>
        <Txt variant="label">Settings</Txt>
        <Txt variant="title1" accessibilityRole="header">Your account</Txt>
        <Txt variant="body">Manage your profile, alerts, privacy and devices.</Txt>
      </View>

      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space[4] }}>
        <View style={{ width: 64, height: 64, borderRadius: radius.pill, backgroundColor: color.keylime, alignItems: 'center', justifyContent: 'center' }}>
          <Txt variant="title2" color={color.primary}>{patient.initials}</Txt>
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="title3">Amara Okafor</Txt>
          <Txt variant="caption" color={color.textBody}>Patient ID {patient.id}</Txt>
        </View>
      </Card>

      {groups.map((g) => (
        <View key={g.title} style={{ gap: space[3] }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
            <Icon name={g.icon} size={20} />
            <Txt variant="title3">{g.title}</Txt>
          </View>
          <Card style={{ paddingVertical: 0 }}>
            {g.rows.map((r, i) => (
              <View key={r.key} style={{ flexDirection: 'row', alignItems: 'center', gap: space[4], paddingVertical: 16, minHeight: 64, borderBottomWidth: i < g.rows.length - 1 ? 1 : 0, borderBottomColor: color.divider }}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Txt variant="bodySm" color={color.text} style={{ fontFamily: font.uiSemibold }}>{r.title}</Txt>
                  <Txt variant="caption" color={color.textBody}>{r.desc}</Txt>
                </View>
                <Toggle label={r.title} value={!!on[r.key]} onChange={(v) => set(r.key, v)} />
              </View>
            ))}
          </Card>
        </View>
      ))}

      <View style={{ gap: space[3] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
          <Icon name="watch" size={20} />
          <Txt variant="title3">Connected devices</Txt>
        </View>
        <Card style={{ paddingVertical: 0 }}>
          {[
            { name: 'Smartwatch', meta: 'Synced 5 min ago', badge: 'Connected', status: 'ok' as const },
            { name: 'Blood pressure cuff', meta: 'Synced 7:42 AM', badge: 'Connected', status: 'ok' as const },
            { name: 'Smart scale', meta: 'Last synced 9 days ago', badge: 'Paused', status: 'pending' as const },
          ].map((d, i, arr) => (
            <View key={d.name} style={{ flexDirection: 'row', alignItems: 'center', gap: space[3], paddingVertical: 16, minHeight: 64, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: color.divider }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Txt variant="bodySm" color={color.text} style={{ fontFamily: font.uiSemibold }}>{d.name}</Txt>
                <Txt variant="caption" color={color.textBody}>{d.meta}</Txt>
              </View>
              <Badge label={d.badge} status={d.status} />
            </View>
          ))}
        </Card>
      </View>

      <Card style={{ gap: space[3], borderColor: '#E4C6BF' }}>
        <Txt variant="title3" color={color.signalText}>Close account</Txt>
        <Txt variant="caption" color={color.textBody}>Your providers keep your medical record as required by law. You’ll lose app access.</Txt>
        <Button variant="destructive" label="Close my account" />
      </Card>
    </Screen>
  );
}
