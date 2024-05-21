import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';

class store {
    lastSync = '';
    syncStatus = true;

    constructor() {
        makeAutoObservable(this);
    }

    setLastSync() {
        this.lastSync = (new Date()).toISOString();
    }

}

const SyncStore = new store;

export { SyncStore }