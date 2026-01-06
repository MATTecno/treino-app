import { FlatList, View, Alert } from 'react-native';
import { Screen } from '../../../ui/layout/Screen';
import { Header } from '../../../ui/layout/Header';
import { Text } from '../../../ui/primitives/Text';
import { Button } from '../../../ui/form/Button';
import { useWorkoutsStore } from '../workouts.store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../../design/theme';
import { SwipeToDelete } from '@/ui/feedback/SwipeToDelete';

export function WorkoutDetailsScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { workoutId } = route.params;

    const workout = useWorkoutsStore(s => s.workouts.find(w => w.id === workoutId));
    const removeExercise = useWorkoutsStore(s => s.removeExercise);
    const deleteWorkout = useWorkoutsStore(s => s.deleteWorkout);

    if (!workout) return null;

    const onDeleteWorkout = () => {
        Alert.alert('Excluir treino', 'Tem certeza?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: () => {
                    deleteWorkout(workoutId);
                    navigation.goBack();
                },
            },
        ]);
    };

    return (
        <Screen>
            <Header
                title={workout.name}
                onBack={() => navigation.goBack()}
                rightAction={{ icon: 'trash', onPress: onDeleteWorkout }}
            />

            <View style={{ marginTop: 16, gap: 12 }}>
                <Button
                    title="Adicionar exercício"
                    onPress={() => navigation.navigate('AddExercise', { workoutId })}
                />

                <FlatList
                    data={workout.exercises}
                    keyExtractor={(i) => i.id}
                    ListEmptyComponent={() => (
                        <Text dim>Nenhum exercício ainda. toque em “Adicionar exercício”.</Text>
                    )}
                    renderItem={({ item }) => (
                        <SwipeToDelete
                            containerStyle={{ marginBottom: 10 }}
                            onDelete={() =>
                                Alert.alert('Remover exercício', 'Deseja remover este exercício?', [
                                    { text: 'Cancelar', style: 'cancel' },
                                    { text: 'Remover', style: 'destructive', onPress: () => removeExercise(workoutId, item.id) },
                                ])
                            }
                        >
                            <View
                                style={{
                                    padding: 14,
                                    borderRadius: theme.radius.lg,
                                    backgroundColor: theme.colors.surfaceAlt,
                                }}
                            >
                                <Text variant="h3">{item.name}</Text>
                                {item.muscleGroup ? <Text dim>{item.muscleGroup}</Text> : null}
                            </View>
                        </SwipeToDelete>
                    )}
                />
            </View>
        </Screen>
    );
}
