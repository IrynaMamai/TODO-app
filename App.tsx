import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ListsScreen from './src/screens/ListsScreen';
import ItemsScreen from './src/screens/ItemsScreen';
import { ITODOList } from './src/redux/types';
import { Provider } from 'react-redux';
import * as eva from '@eva-design/eva';
import store from './src/redux/store';
import React from 'react';

export type RootStackParamList = {
  Lists: undefined;
  Items: ITODOList;
};


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>

      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Lists' component={ListsScreen} />
            <Stack.Screen name='Items' component={ItemsScreen} />
          </Stack.Navigator>

        </NavigationContainer>
      </ApplicationProvider>
      
    </Provider>
  );
}
