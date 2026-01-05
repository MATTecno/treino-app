import { SafeAreaView, View, ViewProps } from 'react-native';
import { theme } from '../../design/theme';

export function Screen({ children, ...rest }: ViewProps) {
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex:1, padding:16 }} {...rest}>{children}</View>
    </SafeAreaView>
  );
}
