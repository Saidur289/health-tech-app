import { Text, TextProps, TextStyle } from 'react-native';
import { color, type } from '../theme/tokens';

type Variant = keyof typeof type;

const defaultColor: Record<Variant, string> = {
  display: color.primary,
  title1: color.primary,
  metric: color.primary,
  title2: color.text,
  title3: color.text,
  body: color.textBody,
  bodySm: color.textBody,
  button: color.text,
  caption: color.textMuted,
  label: color.primary,
};

type Props = TextProps & { variant?: Variant; color?: string; style?: TextStyle | TextStyle[] };

/** The only text component. Picks a size from the type scale. */
export function Txt({ variant = 'body', color: c, style, ...rest }: Props) {
  return (
    <Text
      {...rest}
      style={[type[variant] as TextStyle, { color: c ?? defaultColor[variant], fontVariant: ['tabular-nums'] }, style as TextStyle]}
    />
  );
}
