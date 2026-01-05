import { useState, useEffect } from 'react';
import { Screen } from '../../ui/layout/Screen';
import { Header } from '../../ui/layout/Header';
import { Text } from '../../ui/primitives/Text';
import { TextInput, View } from 'react-native';
import { Button } from '../../ui/form/Button';
import { useMutation } from '@tanstack/react-query';
import { login } from './auth.api';
import { useErrorNotify } from '../../errors/useErrorNotify';
import { theme } from '../../design/theme';
import { useAuth } from './auth.store';
import { useNavigation } from '@react-navigation/native';

export function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const notify = useErrorNotify();
    const { setToken, loadToken } = useAuth();
    const nav = useNavigation<any>();

    useEffect(() => { loadToken(); }, []);

    const m = useMutation({
        mutationFn: async () => {
            await login({ email, password });
            // se estiver em modo token, já tem token salvo no SecureStore
            // setToken aqui só para forçar estado local como autenticado
            await setToken('placeholder'); // qualquer string p/ marcar auth no store
        },
        onError: notify,
        onSuccess: () => nav.reset({ index: 0, routes: [{ name: 'AppTabs' }] }),
    });

    return (
        <Screen>
            <Header title="Entrar" />
            <View style={{ marginTop: 24, gap: 12 }}>
                <Text dim>bem-vindo de volta</Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.colors.textDim}
                    style={{ backgroundColor: theme.colors.surfaceAlt, color: theme.colors.text, padding: 14, borderRadius: theme.radius.md }}
                    autoCapitalize="none"
                    keyboardType="email-address"
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
                <Button title="Entrar" onPress={() => m.mutate()} loading={m.isPending} />
                <Button
                    kind="ghost"
                    title="Criar conta"
                    onPress={() => nav.navigate('Register')}
                    style={{ marginTop: 8 }}
                />
            </View>
        </Screen>
    );
}
