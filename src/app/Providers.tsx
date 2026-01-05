// src/app/Providers.tsx
import { PropsWithChildren } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '../design/theme';

// cria o cliente React Query (cache global de requests)
const queryClient = new QueryClient();

// tema de navegação (usa as cores do seu design system)
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bg,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
    primary: theme.colors.primary,
  },
};

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={navTheme}>
        {children}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
