import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { WATERCOLOR_THEME as theme } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="events" options={{ title: 'Events' }} />
        <Stack.Screen name="map" options={{ title: 'Map' }} />
      </Stack>
    </>
  );
}