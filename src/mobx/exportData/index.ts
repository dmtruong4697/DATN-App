import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';
import { Wallet } from '../../realm/models/Wallet';
import { getAllWallet } from '../../realm/services/wallets';
import { getMonthEnd, getMonthStart, getWeekEnd, getWeekStart, getYearEnd, getYearStart } from '../../realm/services/dateTime';

export type WalletSelectList = {
    wallet: Wallet,
    isSelected: boolean,
}

class store {

    walletData: WalletSelectList[] = [];
    isAll: boolean = false;

    startTime: string = getMonthStart(new Date()).toISOString().slice(0, 10);
    finishTime: string = getMonthEnd(new Date()).toISOString().slice(0, 10);

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    initList(data: WalletSelectList[]) {
        this.walletData = data;
    }

    itemPress(wallet: Wallet) {
        let temp = this.walletData.map((item, i) => {
            return wallet === item.wallet ? { ...item, isSelected: !item.isSelected } : item;
          });
        
        this.walletData = temp;

        if(this.walletData.filter((item) => item.isSelected).length === this.walletData.length) {
            this.isAll = true;
        } else {
            this.isAll = false;
        }
    }  

    selectAll() {
        let newValue = this.walletData.filter((item) => item.isSelected).length === this.walletData.length;
        let temp = this.walletData.map((item) => {
          return { ...item, checked: !newValue };
        });

        this.walletData = temp;

        if(this.walletData.filter((item) => item.isSelected).length === this.walletData.length) {
            this.isAll = true;
        } else {
            this.isAll = false;
        }
    }

    setAllTime() {
        this.startTime = '2000/01/01';
        this.finishTime = '2100/01/01';
    }

    setThisMonth() {
        this.startTime = getMonthStart(new Date()).toISOString().slice(0, 10);
        this.finishTime = getMonthEnd(new Date()).toISOString().slice(0, 10);
    }

    setThisWeek() {
        this.startTime = getWeekStart(new Date()).toISOString().slice(0, 10);
        this.finishTime = getWeekEnd(new Date()).toISOString().slice(0, 10);
    }

    setCustomTime(start: string, end: string) {
        this.startTime = start;
        this.finishTime = end;
    }

    setThisYear() {
        this.startTime = getYearStart(new Date()).toISOString().slice(0, 10);
        this.finishTime = getYearEnd(new Date()).toISOString().slice(0, 10);
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

}

const ExportDataStore = new store;

export { ExportDataStore }