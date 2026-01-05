import { FlatList, View } from 'react-native';
import { Screen } from '../../../ui/layout/Screen';
import { Header } from '../../../ui/layout/Header';
import { WorkoutItem } from '../components/WorkoutItem';

const mock = [{ id:'1', name:'Push A', last:'há 3 dias' }, { id:'2', name:'Pull B', last:'—' }];

export function WorkoutsScreen() {
  return (
    <Screen>
      <Header title="treinos" rightAction={{ icon: 'add', onPress: () => {} }} />
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={mock}
          keyExtractor={(i)=>i.id}
          renderItem={({item})=>(
            <WorkoutItem title={item.name} subtitle={`última sessão: ${item.last}`} onPress={() => {}} />
          )}
        />
      </View>
    </Screen>
  );
}
