import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';
// import { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { UserStore } from '../auth';
import { generateDailyNotification } from '../../services/notification';
import notifee, { RepeatFrequency, TriggerType, TimestampTrigger, AndroidImportance } from '@notifee/react-native';
import { ThemeData } from '../../data/themeData';

const date = new Date(Date.now());
date.setHours(21, 0, 0, 0); 

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

  // ham format date
  export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
  
    switch (SettingStore.dateFormat) {
      case 'yyyy/mm/dd':
        return `${year}/${month}/${day}`;
      case 'dd/mm/yyyy':
        return `${day}/${month}/${year}`;
      case 'mm/dd/yyyy':
        return `${month}/${day}/${year}`;
      default:
        throw new Error('Invalid format');
    }
  }

class store {
    language: string = 'en';

    notificationEnable = true;
    notificationTime = date.getTime();

    dateFormat: string = 'dd/mm/yyyy';

    themeColor: string = ThemeData[0].color;

    setThemeColor(color: string) {
      this.themeColor = color;
  }

    setLanguage(lang: string) {
        this.language = lang;
    }

    setDateFormat(format: string) {
      this.dateFormat = format;
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