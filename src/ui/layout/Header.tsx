import { View, Pressable } from 'react-native';
import { Text } from '../primitives/Text';
import { theme } from '../../design/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  onBack?: () => void;
  rightAction?: { icon: keyof typeof Ionicons.glyphMap; onPress: () => void };
};

export function Header({ title, onBack, rightAction }: Props) {
  return (
    <View style={{ height: 56, flexDirection:'row', alignItems:'center', paddingHorizontal:16 }}>
      <View style={{ width: 40 }}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
          </Pressable>
        )}
      </View>
      <View style={{ flex:1, alignItems:'center' }}>
        <Text variant="h2">{title}</Text>
      </View>
      <View style={{ width: 40, alignItems:'flex-end' }}>
        {rightAction && (
          <Pressable onPress={rightAction.onPress} hitSlop={12}>
            <Ionicons name={rightAction.icon} size={22} color={theme.colors.text} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
