import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { color, layout, radius, space } from '../theme/tokens';
import { Txt } from './Txt';

/* ---------- Buttons ---------- */

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'onHero' | 'secondary' | 'destructive';
  style?: ViewStyle;
};

/** Pill buttons. Use exactly one primary (or onHero) per screen. */
export function Button({ label, onPress, variant = 'primary', style }: ButtonProps) {
  const v = buttonStyles[variant];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.btn, v.base, pressed && v.pressed, style]}
    >
      <Txt variant="button" color={v.text}>{label}</Txt>
    </Pressable>
  );
}

const buttonStyles = {
  primary: { base: { backgroundColor: color.primary }, pressed: { backgroundColor: color.primaryPressed }, text: color.canvas },
  onHero: { base: { backgroundColor: color.canvas }, pressed: { backgroundColor: color.keylime }, text: color.primary },
  secondary: { base: { borderWidth: 1, borderColor: color.textBody }, pressed: { backgroundColor: color.paper }, text: color.textBody },
  destructive: { base: { borderWidth: 1, borderColor: '#E4C6BF', backgroundColor: color.card }, pressed: { backgroundColor: '#FBEFEC' }, text: color.signalText },
} as const;

export function TextLink({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} hitSlop={12}>
      <Txt variant="bodySm" color={color.primary} style={{ fontFamily: 'HankenGrotesk_600SemiBold', textDecorationLine: 'underline' }}>
        {label}
      </Txt>
    </Pressable>
  );
}

/* ---------- Cards ---------- */

type CardKind = 'data' | 'hero' | 'insight' | 'paper';

export function Card({ kind = 'data', children, style, onPress }: { kind?: CardKind; children: ReactNode; style?: ViewStyle; onPress?: () => void }) {
  const bg: Record<CardKind, ViewStyle> = {
    data: { backgroundColor: color.card, borderWidth: 1, borderColor: color.border },
    hero: { backgroundColor: color.primary, padding: space[5] },
    insight: { backgroundColor: color.keylime, padding: space[5] },
    paper: { backgroundColor: color.paper },
  };
  const content = [styles.card, bg[kind], style];
  if (onPress) {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [...content, pressed && { opacity: 0.85 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={content}>{children}</View>;
}

/* ---------- Badge ---------- */

export type Status = 'ok' | 'review' | 'pending' | 'info';

const statusColors: Record<Status, { bg: string; ink: string }> = {
  ok: { bg: color.keylime, ink: color.primary },
  review: { bg: color.signalTint, ink: color.signalText },
  pending: { bg: color.pendingTint, ink: color.pendingText },
  info: { bg: color.infoTint, ink: color.infoText },
};

/** Status always pairs a tint with a word. Never colour alone. */
export function Badge({ label, status = 'ok' }: { label: string; status?: Status }) {
  const c = statusColors[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Txt variant="caption" color={c.ink} style={{ fontFamily: 'HankenGrotesk_600SemiBold', fontSize: 12, lineHeight: 16 }}>
        {label}
      </Txt>
    </View>
  );
}

/* ---------- Segmented control ---------- */

export function Segmented<T extends string>({ options, value, onChange, label }: {
  options: { id: T; label: string }[]; value: T; onChange: (id: T) => void; label: string;
}) {
  return (
    <View accessibilityLabel={label} style={styles.segTrack}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.id)}
            style={[styles.segItem, on && { backgroundColor: color.card }]}
          >
            <Txt variant="bodySm" color={on ? color.primary : color.textBody} style={{ fontFamily: on ? 'HankenGrotesk_600SemiBold' : 'HankenGrotesk_500Medium' }}>
              {o.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ---------- Toggle ---------- */

export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      hitSlop={10}
      style={[styles.toggle, { backgroundColor: value ? color.primary : color.toggleOff }]}
    >
      <View style={[styles.knob, { transform: [{ translateX: value ? 20 : 0 }] }]} />
    </Pressable>
  );
}

/* ---------- Progress & range bars ---------- */

export function ProgressBar({ value, fill = color.series2 }: { value: number; fill?: string }) {
  return (
    <View style={styles.track}>
      <View style={{ width: `${Math.min(100, Math.max(0, value * 100))}%`, height: '100%', borderRadius: radius.pill, backgroundColor: fill }} />
    </View>
  );
}

/** Sage band = healthy range. Dot is forest when inside, terracotta when outside. */
export function RangeBar({ min, max, low, high, value }: { min: number; max: number; low: number; high: number; value: number }) {
  const pct = (n: number) => ((n - min) / (max - min)) * 100;
  const inRange = value >= low && value <= high;
  return (
    <View style={[styles.track, { overflow: 'visible', justifyContent: 'center' }]}>
      <View style={{ position: 'absolute', left: `${pct(low)}%`, width: `${pct(high) - pct(low)}%`, top: 0, bottom: 0, borderRadius: radius.pill, backgroundColor: color.sage }} />
      <View style={{ position: 'absolute', left: `${Math.min(97, Math.max(0, pct(value)))}%`, width: 14, height: 14, marginLeft: -7, borderRadius: 7, backgroundColor: inRange ? color.primary : color.signal }} />
    </View>
  );
}

/* ---------- Section header ---------- */

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Txt variant="title2" accessibilityRole="header">{title}</Txt>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: { minHeight: 52, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space[5] },
  card: { borderRadius: radius.md, padding: layout.cardPadding },
  badge: { alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  segTrack: { flexDirection: 'row', gap: 4, padding: 4, borderRadius: radius.sm, backgroundColor: color.segmentTrack },
  segItem: { flex: 1, minHeight: 40, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  toggle: { width: 48, height: 28, borderRadius: radius.pill, padding: 3, justifyContent: 'center' },
  knob: { width: 22, height: 22, borderRadius: 11, backgroundColor: color.canvas },
  track: { height: 8, borderRadius: radius.pill, backgroundColor: color.track, overflow: 'hidden' },
});
