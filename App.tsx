// import React from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from './src/screens/HomeScreen';
// // import DetailsScreen from './src/screens/Galery'; // Exemplo de outra tela
// import { WATERCOLOR_THEME as theme } from './src/theme';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />  
      
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ title: 'Início' }}
//         />
//         <Stack.Screen 
//           name="Details" 
//           component={DetailsScreen} 
//           options={{ title: 'Detalhes' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
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
