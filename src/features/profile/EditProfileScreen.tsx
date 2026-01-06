import { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Screen } from '../../ui/layout/Screen';
import { Header } from '../../ui/layout/Header';
import { Button } from '../../ui/form/Button';
import { Text } from '../../ui/primitives/Text';
import { theme } from '../../design/theme';
import { useNavigation } from '@react-navigation/native';
import { useProfileStore } from './profile.store';

export function EditProfileScreen() {
    const navigation = useNavigation<any>();
    const { user, setUser } = useProfileStore();

    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!name.trim() || !email.trim()) {
            Alert.alert('erro', 'Preencha todos os campos');
            return;
        }

        setLoading(true);

        // TODO: MOCK de persistência (substituir pela API depois)
        setTimeout(() => {
            setUser({
                ...user!,
                name,
                email,
            });

            setLoading(false);
            navigation.goBack();
        }, 800);
    };

    return (
        <Screen>
            <Header
                title="Editar perfil"
                onBack={() => navigation.goBack()}
            />

            <View style={{ marginTop: theme.spacing(6), gap: 12 }}>
                <Text dim>nome</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Seu nome"
                    placeholderTextColor={theme.colors.textDim}
                    style={{
                        backgroundColor: theme.colors.surfaceAlt,
                        color: theme.colors.text,
                        padding: 14,
                        borderRadius: theme.radius.md,
                    }}
                />

                <Text dim>email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Seu email"
                    placeholderTextColor={theme.colors.textDim}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{
                        backgroundColor: theme.colors.surfaceAlt,
                        color: theme.colors.text,
                        padding: 14,
                        borderRadius: theme.radius.md,
                    }}
                />

                <View style={{ marginTop: theme.spacing(6), gap: 10 }}>
                    <Button
                        title="Salvar alterações"
                        loading={loading}
                        onPress={handleSave}
                    />
                    <Button
                        title="Cancelar"
                        kind="ghost"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </Screen>
    );
}
