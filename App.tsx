// import React from 'react';
// import { StatusBar } from 'react-native';
// import HomeScreen from './src/screens/HomeScreen';
// import { WATERCOLOR_THEME as theme } from './src/theme';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// export default function App() {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="EventosScreen"
//           screenOptions={{
//             headerShown: false // Remove a barra de topo padrão do Navigation para usar o seu design customizado
//           }}
//         >
//           <Stack.Screen name="EventosScreen" component={EventosScreen} />
//           <Stack.Screen name="MapaScreen" component={MapaScreen} />
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

import React from 'react';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { WATERCOLOR_THEME as theme } from './src/theme';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />  
      <HomeScreen />
    </>
  );
}
