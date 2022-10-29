import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import {
  MainLayout
} from "./screens";

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { CustomFonts } from './constants';

const _loadAssets = async () => {
  await Font.loadAsync(CustomFonts);
};

const Stack = createStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs(true);

  // React.useEffect(() => {
  //   SplashScreen.hide();
  // }, [])

  const [isReady, setReady] = useState(false);

  if (!isReady) {
    // this is what makes sure the fonts are ready before loading the app
    return (
      <AppLoading
        startAsync={_loadAssets} // this loads the fonts
        onFinish={() => setReady(true)}
        onError={e => console.error(e)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Dashboard'}
      >
        <Stack.Screen
          name="Dashboard"
          component={MainLayout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App