import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';

export type User = {
    id: Object | null,
    userName: string | null,
    email: string | null,
    token: string | null,
    deviceToken: string | null,
}
class store {
    user: User = {
        id: null,
        userName: null,
        email: null,
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
            token: null,
            deviceToken: null,
        };
    }
    
}

const UserStore = new store;

export { UserStore }