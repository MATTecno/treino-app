import { Screen } from '../../ui/layout/Screen';
import { Header } from '../../ui/layout/Header';
import { Text } from '../../ui/primitives/Text';

export function HomeScreen() {
  return (
    <Screen>
      <Header title="início" />
      <Text>Bem-vindo ao treino-app 👋</Text>
    </Screen>
  );
}