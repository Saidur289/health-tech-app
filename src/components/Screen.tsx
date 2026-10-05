import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { color, layout } from '../theme/tokens';

/** Every screen: parchment canvas, 24px side margins, 32px between sections. */
export function Screen({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.canvas }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: layout.sideMargin, paddingTop: 24, paddingBottom: 40, gap: layout.sectionGap }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer ? (
        <View style={{ paddingHorizontal: layout.sideMargin, paddingTop: 12, paddingBottom: 12, borderTopWidth: 1, borderTopColor: color.border, backgroundColor: color.canvas }}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}
