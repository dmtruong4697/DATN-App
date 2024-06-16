import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';
// import { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { UserStore } from '../auth';
import { generateDailyNotification } from '../../services/notification';
import notifee, { RepeatFrequency, TriggerType, TimestampTrigger, AndroidImportance } from '@notifee/react-native';

const date = new Date(Date.now());
date.setHours(21, 0, 0, 0); // Đặt giờ là 19:00:00

async function createDailyNotification() {
    // Tạo trigger cho thông báo vào 7h tối hằng ngày
    const date = new Date(Date.now());
    date.setHours(21, 0, 0, 0); // Đặt giờ là 19:00:00

    // Nếu thời gian đã qua 7h tối của ngày hiện tại, đặt lịch cho ngày hôm sau
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

    await notifee.createTriggerNotification(
      {
        title: `Chào buổi tối ${UserStore.user.userName}!`,
        body: generateDailyNotification(),
        android: {
          channelId: 'daily-reminder',
        },
      },
      trigger,
    );
  }

class store {
    language: string = 'en';
    notificationEnable = true;
    
    notificationTime = date.getTime();

    setLanguage(lang: string) {
        this.language = lang;
    }

    setNotificationTime(time: number) {
        this.notificationTime = time;
        createDailyNotification();
    }

    setNotificationEnable(bool: boolean) {
        this.notificationEnable = bool;
    }

    formattedNotificationTime() {
        const notificationDate = new Date(this.notificationTime);
        const hours = notificationDate.getHours().toString().padStart(2, '0');
        const minutes = notificationDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
}

const SettingStore = new store;

export { SettingStore }