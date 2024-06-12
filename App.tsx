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


import SplashScreen from './src/screens/splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigator/mainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import messaging, { firebase } from '@react-native-firebase/messaging';
import installations from '@react-native-firebase/installations';
import { UserStore } from './src/mobx/auth';
import notifee, { RepeatFrequency, TriggerType } from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { ActiveStore } from './src/mobx/active';

function App(): React.JSX.Element {

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

  const onMessageReceived = (message: FirebaseMessagingTypes.RemoteMessage): Promise<any> => {
      notifee.displayNotification({
        title: 'Your order has been shipped',
        body: `Your order was shipped at!`,
        android: {
          channelId: 'orders',
        },
      });

      const t: any = 'a';
      return t;
  }

  async function onDisplayNotification(message: FirebaseMessagingTypes.RemoteMessage): Promise<any> {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });

    console.log(message);
  }

  function isSameDay(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  // thong bao hang ngay
  const createNotificationChannel = async () => {
    const channelId = await notifee.createChannel({
      id: 'daily-reminder',
      name: 'Daily Reminder',
      // importance: notifee.Importance.HIGH, 
    });

    return channelId;
  };

  const scheduleDailyNotification = async () => {
    const channelId = await createNotificationChannel();

    await notifee.createTriggerNotification({
      title: 'Chào buổi tối!',
      body: (isSameDay(ActiveStore.lastTransaction))? 'Cùng nhau xem lại các giao dịch bạn đã thực hiện trong ngày nhé!':'Hôm nay bạn chưa có giao dịch nào, cùng nhau ghi chép nhé!',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    },
    {
      type: TriggerType.TIMESTAMP, // Trigger at a specific time
      timestamp: 1718193600, // Set notification time to 8:00 PM
      repeatFrequency: RepeatFrequency.DAILY,
    },
  );
  };

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    requestUserPermission();
    getToken();
    messaging().onMessage(onDisplayNotification);
    messaging().setBackgroundMessageHandler(onDisplayNotification);
  },[])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
