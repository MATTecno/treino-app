import { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Screen } from '../../../ui/layout/Screen';
import { Header } from '../../../ui/layout/Header';
import { Button } from '../../../ui/form/Button';
import { theme } from '../../../design/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWorkoutsStore } from '../workouts.store';

export function AddExerciseScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { workoutId } = route.params;

    const addExercise = useWorkoutsStore(s => s.addExercise);

    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');

    const handleAdd = () => {
        if (!name.trim()) {
            Alert.alert('erro', 'Informe o nome do exercício');
            return;
        }
        addExercise(workoutId, { name: name.trim(), muscleGroup: muscleGroup.trim() || undefined });
        navigation.goBack();
    };

    return (
        <Screen>
            <Header title="Adicionar exercício" onBack={() => navigation.goBack()} />
            <View style={{ marginTop: 16, gap: 12 }}>
                <TextInput
                    placeholder="Nome (ex.: Supino reto)"
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
                <TextInput
                    placeholder="Grupo muscular (opcional)"
                    placeholderTextColor={theme.colors.textDim}
                    value={muscleGroup}
                    onChangeText={setMuscleGroup}
                    style={{
                        backgroundColor: theme.colors.surfaceAlt,
                        color: theme.colors.text,
                        padding: 14,
                        borderRadius: theme.radius.md,
                    }}
                />
                <Button title="Adicionar" onPress={handleAdd} />
            </View>
        </Screen>
    );
}
