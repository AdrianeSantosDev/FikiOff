import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventosScreen from './src/screens/EventsScreen';
import MapaScreen from './src/screens/MapScreen';

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  EventosScreen: undefined;
  MapaScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventosScreen" component={EventosScreen} />
        <Stack.Screen name="MapaScreen" component={MapaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
