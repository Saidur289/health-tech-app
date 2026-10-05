import { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Rect, Text as SvgText } from 'react-native-svg';
import { color, font } from '../theme/tokens';

/** Goal ring: one ring, keylime track, forest progress, value in the middle. */
export function Ring({ value, size = 120, label }: { value: number; size?: number; label: string }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <Svg width={size} height={size} accessibilityLabel={label}>
      <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color.keylime} strokeWidth={stroke} />
      <Circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color.primary} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${c} ${c}`} strokeDashoffset={c * (1 - value)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <SvgText x={size / 2} y={size / 2 + 12} textAnchor="middle" fontFamily={font.display} fontSize={36} fill={color.primary}>
        {`${Math.round(value * 100)}%`}
      </SvgText>
    </Svg>
  );
}

/**
 * Trend line over a sage band for the healthy range.
 * No gridlines, one hairline baseline, latest point marked.
 * Points outside the range get a terracotta dot.
 */
export function TrendChart({ values, low, high, min, max, height = 140, label }: {
  values: number[]; low: number; high: number; min: number; max: number; height?: number; label: string;
}) {
  const [w, setW] = useState(300);
  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);
  const pad = 6;
  const y = (v: number) => pad + (1 - (v - min) / (max - min)) * (height - pad * 2);
  const x = (i: number) => pad + (i / (values.length - 1)) * (w - pad * 2);
  const pts = values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const last = values.length - 1;
  return (
    <View onLayout={onLayout} accessibilityLabel={label}>
      <Svg width={w} height={height}>
        <Rect x={0} y={y(high)} width={w} height={y(low) - y(high)} fill={color.sage} opacity={0.55} />
        <Line x1={0} y1={height - 1} x2={w} y2={height - 1} stroke={color.border} strokeWidth={1} />
        <Polyline points={pts} fill="none" stroke={color.primary} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
        {values.map((v, i) =>
          v < low || v > high ? <Circle key={i} cx={x(i)} cy={y(v)} r={5} fill={color.signal} /> : null,
        )}
        <Circle cx={x(last)} cy={y(values[last])} r={5} fill={color.primary} />
      </Svg>
    </View>
  );
}
