import { View, Image, ActivityIndicator, Alert } from 'react-native';
import { Screen } from '../../ui/layout/Screen';
import { Header } from '../../ui/layout/Header';
import { Text } from '../../ui/primitives/Text';
import { Button } from '../../ui/form/Button';
import { theme } from '../../design/theme';
import { useAuth } from '../auth/auth.store';
import { logout } from '../auth/auth.api';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from './useProfile';

export function ProfileScreen() {
    const { user, loading } = useProfile();
    const { setToken } = useAuth();
    const navigation = useNavigation<any>();

    const handleLogout = () => {
        Alert.alert(
            'Sair da conta',
            'Tem certeza que deseja deslogar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        await setToken(null);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignIn' }],
                        });
                    },
                },
            ]
        );
    };

    if (loading || !user) {
        return (
            <Screen>
                <Header title="Perfil" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            </Screen>
        );
    }

    return (
        <Screen>
            <Header title="Perfil" />

            <View style={{ alignItems: 'center', marginTop: theme.spacing(6) }}>
                <Image
                    source={{
                        uri: user.avatar_url ?? 'https://i.pravatar.cc/300',
                    }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        marginBottom: theme.spacing(4),
                        backgroundColor: theme.colors.surfaceAlt,
                    }}
                />

                <Text variant="h2">{user.name}</Text>
                <Text dim style={{ marginTop: 4 }}>
                    {user.email}
                </Text>
            </View>

            <Button
                title="Editar perfil"
                kind="ghost"
                onPress={() => navigation.navigate('EditProfile')}
                style={{ marginTop: theme.spacing(4) }}
            />

            <View style={{ marginTop: theme.spacing(10) }}>
                <Button
                    title="Sair da conta"
                    kind="danger"
                    onPress={handleLogout}
                />
            </View>
        </Screen>
    );
}
