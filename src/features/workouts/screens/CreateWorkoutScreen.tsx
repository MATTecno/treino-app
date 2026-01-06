import { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Screen } from '../../../ui/layout/Screen';
import { Header } from '../../../ui/layout/Header';
import { Button } from '../../../ui/form/Button';
import { theme } from '../../../design/theme';
import { useWorkoutsStore } from '../workouts.store';
import { useNavigation } from '@react-navigation/native';

export function CreateWorkoutScreen() {
    const navigation = useNavigation<any>();
    const createWorkout = useWorkoutsStore(s => s.createWorkout);
    const [name, setName] = useState('');

    const handleCreate = () => {
        if (!name.trim()) {
            Alert.alert('erro', 'Informe um nome para o treino');
            return;
        }
        const w = createWorkout(name.trim());
        navigation.replace('WorkoutDetails', { workoutId: w.id });
    };

    return (
        <Screen>
            <Header title="Novo treino" onBack={() => navigation.goBack()} />
            <View style={{ marginTop: 16, gap: 12 }}>
                <TextInput
                    placeholder="Nome do treino (ex.: Push A)"
                    placeholderTextColor={theme.colors.textDim}
                    value={name}
                    onChangeText={setName}
                    style={{
                        backgroundColor: theme.colors.surfaceAlt,
                        color: theme.colors.text,
                        padding: 14,
                        borderRadius: theme.radius.md,
                    }}
                />
                <Button title="Criar" onPress={handleCreate} />
            </View>
        </Screen>
    );
}
