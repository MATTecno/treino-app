import { Providers } from './src/app/Providers';
import { ErrorBoundary } from './src/errors/ErrorBoundary';
import { RootNavigator } from './src/app/navigation/RootNavigator';

export default function App() {
  return (
    <Providers>
      <ErrorBoundary>
        <RootNavigator />
      </ErrorBoundary>
    </Providers>
  );
}
