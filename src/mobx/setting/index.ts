import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';

class store {
    language: string = 'en';

    setLanguage(lang: string) {
        this.language = lang;
    }
    
}

const SettingStore = new store;

export { SettingStore }