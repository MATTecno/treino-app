import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SignInScreen } from '../../features/auth/SignInScreen';
import { RegisterScreen } from '../../features/auth/RegisterScreen';
import { WorkoutsScreen } from '../../features/workouts/screens/WorkoutsScreen';
import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { EditProfileScreen } from '../../features/profile/EditProfileScreen';
import { CreateWorkoutScreen } from '../../features/workouts/screens/CreateWorkoutScreen';
import { WorkoutDetailsScreen } from '../../features/workouts/screens/WorkoutDetailsScreen';
import { AddExerciseScreen } from '../../features/workouts/screens/AddExerciseScreen';

import { theme } from '../../design/theme';
import { useAuth } from '../../features/auth/auth.store';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.surface },
      }}
    >
      <Tabs.Screen name="Treinos" component={WorkoutsScreen} />
      <Tabs.Screen name="Perfil" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { isAuthenticated, loadToken } = useAuth();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
          <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
          <Stack.Screen name="AddExercise" component={AddExerciseScreen} />

        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
