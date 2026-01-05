import { View } from 'react-native';
import { Text } from '../primitives/Text';
import { Button } from '../form/Button';
import { theme } from '../../design/theme';

export function ErrorView({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', gap:12 }}>
      <Text variant="h3" dim>algo deu errado</Text>
      {message ? <Text dim>{message}</Text> : null}
      {onRetry ? <Button title="tentar novamente" onPress={onRetry} /> : null}
    </View>
  );
}
