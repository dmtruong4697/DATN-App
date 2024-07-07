/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import SplashScreen from './src/screens/splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigator/mainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import installations from '@react-native-firebase/installations';
import { UserStore } from './src/mobx/auth';
import notifee, { RepeatFrequency, TriggerType, TimestampTrigger, AndroidImportance } from '@notifee/react-native';
import { ActiveStore } from './src/mobx/active';
import { generateDailyNotification } from './src/services/notification';
import { SettingStore } from './src/mobx/setting';
import { GoogleSignin } from '@react-native-community/google-signin';

function App(): React.JSX.Element {

  GoogleSignin.configure({
    webClientId: '159333030534-3cqvdt5pvtvrgmate5plem0tcl5o1e5p.apps.googleusercontent.com',
    androidClientId: '159333030534-leh4cepddkcns39m3j7h319vfp69r1fm.apps.googleusercontent.com',
    // iosClientId: GOOGLE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

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

  async function createDailyNotification() {
    const date = new Date(Date.now());
    date.setHours(21, 0, 0, 0); 

    if (date.getTime() < Date.now()) {
      date.setDate(date.getDate() + 1);
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      // timestamp: date.getTime(),
      timestamp: SettingStore.notificationTime,
      // timestamp: 1718462959,
      repeatFrequency: RepeatFrequency.DAILY,
    };

    if(SettingStore.notificationEnable) {
    await notifee.createTriggerNotification(
      {
        title: `Chào buổi tối!`,
        body: generateDailyNotification(),
        android: {
          channelId: 'daily-reminder',
        },
      },
      trigger,
    );
    }
  }

  async function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
    // Hiển thị thông báo với notifee khi nhận được thông báo từ Firebase Messaging
    await notifee.displayNotification({
      title: message.notification?.title,
      body: message.notification?.body,
      android: {
        channelId: 'fcm',
        smallIcon: 'ic_launcher', // Thay thế bằng biểu tượng nhỏ của bạn
      },
    });
  }

  useEffect(() => {
    requestUserPermission();
    getToken();

    // Tạo kênh thông báo cho Android
    notifee.createChannel({
      id: 'daily-reminder',
      name: 'Daily Reminder',
      importance: AndroidImportance.HIGH,
    }).then(() => {
      createDailyNotification();
    });

    // Tạo kênh thông báo cho FCM
    notifee.createChannel({
      id: 'fcm',
      name: 'FCM Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Đăng ký lắng nghe thông báo foreground
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return () => {
      unsubscribe(); // Hủy đăng ký khi component unmount
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;