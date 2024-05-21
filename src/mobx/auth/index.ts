import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';

export type User = {
    id: Object | null,
    userName: string | null,
    email: string | null,
    avatarImage: string | null,
    token: string | null,
    deviceToken: string | null,
    phoneNumber: string | null,
    dataId: string | null,
}
class store {
    user: User = {
        id: null,
        userName: null,
        email: null,
        avatarImage: null,
        token: null,
        deviceToken: null,
        phoneNumber: null,
        dataId: null,
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
            phoneNumber: null,
            dataId: null,
        };
    }

    setName(name: string) {
        this.user.userName = name;
    }

    setPhoneNumber(number: string) {
        this.user.phoneNumber = number;
    }

    setAvatar(image: string) {
        this.user.avatarImage = image;
    }
    
}

const UserStore = new store;

export { UserStore }