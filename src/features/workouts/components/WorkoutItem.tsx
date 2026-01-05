import { Pressable, View } from 'react-native';
import { Text } from '../../../ui/primitives/Text';
import { theme } from '../../../design/theme';

export function WorkoutItem({ title, subtitle, onPress }: { title: string; subtitle?: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ backgroundColor: theme.colors.surfaceAlt, padding:16, borderRadius: theme.radius.lg, marginBottom: 10 }}>
      <Text variant="h3">{title}</Text>
      {subtitle ? <Text dim>{subtitle}</Text> : null}
    </Pressable>
  );
}
