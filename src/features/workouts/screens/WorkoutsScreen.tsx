import { Alert, FlatList, View } from 'react-native';
import { Screen } from '../../../ui/layout/Screen';
import { Header } from '../../../ui/layout/Header';
import { WorkoutItem } from '../components/WorkoutItem';
import { useWorkoutsStore } from '../workouts.store';
import { useNavigation } from '@react-navigation/native';
import { SwipeToDelete } from '@/ui/feedback/SwipeToDelete';

export function WorkoutsScreen() {
  const navigation = useNavigation<any>();
  const workouts = useWorkoutsStore(s => s.workouts);
  const deleteWorkout = useWorkoutsStore(s => s.deleteWorkout);

  return (
    <Screen>
      <Header
        title="Treinos"
        rightAction={{ icon: 'add', onPress: () => navigation.navigate('CreateWorkout') }}
      />
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={workouts}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <SwipeToDelete
              containerStyle={{ marginBottom: 10 }}
              onDelete={() =>
                Alert.alert('Excluir treino', `Deseja excluir "${item.name}"?`, [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Excluir', style: 'destructive', onPress: () => deleteWorkout(item.id) },
                ])
              }
            >
              <WorkoutItem
                title={item.name}
                subtitle={`${item.exercises.length} exercícios`}
                onPress={() => navigation.navigate('WorkoutDetails', { workoutId: item.id })}
              />
            </SwipeToDelete>
          )}
        />
      </View>
    </Screen>
  );
}
