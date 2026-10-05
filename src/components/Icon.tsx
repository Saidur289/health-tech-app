import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { color } from '../theme/tokens';

export type IconName = 'home' | 'calendar' | 'pulse' | 'user' | 'video' | 'chevron' | 'bell' | 'shield' | 'watch' | 'check';

/** Outline icons only: 1.6px stroke, round caps, 24px grid. */
export function Icon({ name, size = 24, stroke = color.primary }: { name: IconName; size?: number; stroke?: string }) {
  const p = { fill: 'none', stroke, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' && <Path {...p} d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />}
      {name === 'calendar' && (<><Rect {...p} x={3} y={5} width={18} height={16} rx={3} /><Path {...p} d="M3 10h18M8 3v4M16 3v4" /></>)}
      {name === 'pulse' && <Path {...p} d="M3 12h4l2-5 3 10 2-5h7" />}
      {name === 'user' && (<><Circle {...p} cx={12} cy={8} r={4} /><Path {...p} d="M4 21a8 8 0 0 1 16 0" /></>)}
      {name === 'video' && (<><Rect {...p} x={3} y={6} width={13} height={12} rx={3} /><Path {...p} d="M16 10.5l5-3v9l-5-3" /></>)}
      {name === 'chevron' && <Path {...p} d="M9 6l6 6-6 6" />}
      {name === 'bell' && (<><Path {...p} d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><Path {...p} d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>)}
      {name === 'shield' && (<><Path {...p} d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" /><Path {...p} d="M9 12l2 2 4-4" /></>)}
      {name === 'watch' && (<><Rect {...p} x={6} y={6} width={12} height={12} rx={3.5} /><Path {...p} d="M9 6V3h6v3M9 18v3h6v-3M12 9.5V12l1.5 1.5" /></>)}
      {name === 'check' && <Path {...p} strokeWidth={2.4} d="M5 12.5l4.5 4.5L19 7.5" />}
    </Svg>
  );
}
