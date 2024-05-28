import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';

class store {
    lastSync = '';
    syncStatus = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLastSync() {
        this.lastSync = (new Date()).toISOString();
        this.syncStatus = false;
    }

    setSyncStatus() {
        this.syncStatus = true;
    }

}

const SyncStore = new store;

export { SyncStore }