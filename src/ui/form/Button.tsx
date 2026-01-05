import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../primitives/Text';
import { theme } from '../../design/theme';

type Kind = 'primary' | 'ghost' | 'danger';
type Size = 'md' | 'lg';
type Props = {
  title: string;
  onPress?: () => void;
  kind?: Kind;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export function Button({ title, onPress, kind='primary', size='md', loading, disabled, style }: Props) {
  const S = styles(kind, size, disabled);
  return (
    <Pressable style={[S.base, style]} onPress={onPress} disabled={disabled || loading}>
      {loading ? <ActivityIndicator /> : <Text style={S.label} variant="h3">{title}</Text>}
    </Pressable>
  );
}

const styles = (kind: Kind, size: Size, disabled?: boolean) => {
  const pad = size === 'lg' ? theme.spacing(5) : theme.spacing(4);
  const bg = {
    primary: theme.colors.primary,
    ghost: 'transparent',
    danger: theme.colors.error,
  }[kind];

  const border = kind === 'ghost' ? theme.colors.border : 'transparent';
  const color = kind === 'ghost' ? theme.colors.text : '#fff';
  const opacity = disabled ? 0.5 : 1;

  return StyleSheet.create({
    base: {
      backgroundColor: bg,
      paddingVertical: pad,
      paddingHorizontal: theme.spacing(6),
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: border,
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
    },
    label: { color, fontWeight: '700' },
  });
};
