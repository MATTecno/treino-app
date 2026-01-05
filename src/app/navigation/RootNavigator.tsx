import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignInScreen } from '../../features/auth/SignInScreen';
import { RegisterScreen } from '../../features/auth/RegisterScreen';
import { WorkoutsScreen } from '../../features/workouts/screens/WorkoutsScreen';
import { theme } from '../../design/theme';
import { useAuth } from '../../features/auth/auth.store';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: theme.colors.surface } }}
    >
      <Tabs.Screen name="Treinos" component={WorkoutsScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { isAuthenticated, loadToken } = useAuth();
  useEffect(() => { loadToken(); }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
