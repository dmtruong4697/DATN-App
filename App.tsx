/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigator/mainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import messaging, { firebase } from '@react-native-firebase/messaging';
import installations from '@react-native-firebase/installations';
import { UserStore } from './src/mobx/auth';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async() => {
    const token = await messaging().getToken();
    UserStore.setDeviceToken(token);
    const id = await installations().getId();
    console.log("Token: ", token);
    console.log("ID: ", id);
  }

  // const bootstrap = async() => {
  //   await inAppMessaging().setMessagesDisplaySuppressed(true);
  // }

  // const fetchConfig = async() => {

  //   await remoteConfig().fetch(50);

  //   await remoteConfig().fetchAndActivate()
  //     .then(fetchedRemotely => {
  //       if (fetchedRemotely) {
  //         console.log('Configs were retrieved from the backend and activated.');
  //         // const newVersion = remoteConfig().getValue('newversion').asString();
  //       } else {
  //         console.log(
  //           'No configs were fetched from the backend, and the local configs were already activated',
  //         );
  //       }
  //     })

  // }

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    requestUserPermission();
    getToken();
    // fetchConfig();
    // bootstrap();
  },[])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
