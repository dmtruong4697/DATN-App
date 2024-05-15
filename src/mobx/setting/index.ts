import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';

class store {
    user: User = {
        id: null,
        userName: null,
        email: null,
        avatarImage: null,
        token: null,
        deviceToken: null,
    }

    deviceToken = ''

    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentUser(user: User) {
        this.user = user;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setDeviceToken(token: string) {
        this.deviceToken = token;
    }

    logoutUser() {
        this.user = {
            id: null,
            userName: null,
            email: null,
            avatarImage: null,
            token: null,
            deviceToken: null,
        };
    }
    
}

const SettingStore = new store;

export { SettingStore }