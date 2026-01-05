import { useState } from 'react';
import { Screen } from '../../ui/layout/Screen';
import { Header } from '../../ui/layout/Header';
import { Text } from '../../ui/primitives/Text';
import { TextInput, View } from 'react-native';
import { Button } from '../../ui/form/Button';
import { useMutation } from '@tanstack/react-query';
import { registerUser, login } from './auth.api';
import { useErrorNotify } from '../../errors/useErrorNotify';
import { theme } from '../../design/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './auth.store';
import { ENV } from '../../services/env';

export function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const notify = useErrorNotify();
  const nav = useNavigation<any>();
  const { setToken } = useAuth();

  const m = useMutation({
    mutationFn: async () => {
      await registerUser({
        name,
        email,
        password,
        password_confirmation: confirm,
      });

      // Após registro, opcionalmente já loga:
      await login({ email, password });

      // marcar como autenticado
      await setToken(ENV.AUTH_MODE === 'token' ? 'placeholder' : 'placeholder');
    },
    onError: notify,
    onSuccess: () => nav.reset({ index: 0, routes: [{ name: 'AppTabs' }] }),
  });

  return (
    <Screen>
      <Header title="Criar conta" />
      <View style={{ marginTop: 24, gap: 12 }}>
        <Text dim>bem-vindo(a)! preencha seus dados</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor={theme.colors.textDim}
          style={{ backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text, padding: 14, borderRadius: theme.radius.md }}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.colors.textDim}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text, padding: 14, borderRadius: theme.radius.md }}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor={theme.colors.textDim}
          secureTextEntry
          style={{ backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text, padding: 14, borderRadius: theme.radius.md }}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirmar senha"
          placeholderTextColor={theme.colors.textDim}
          secureTextEntry
          style={{ backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text, padding: 14, borderRadius: theme.radius.md }}
          value={confirm}
          onChangeText={setConfirm}
        />

        <Button title="Criar conta" onPress={() => m.mutate()} loading={m.isPending} />
      </View>
    </Screen>
  );
}
