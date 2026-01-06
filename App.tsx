import { Providers } from './src/app/Providers';
import { ErrorBoundary } from './src/errors/ErrorBoundary';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </Providers>
    </GestureHandlerRootView>
  );
}
