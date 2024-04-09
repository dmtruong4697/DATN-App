import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';

class store {
    lastSync = '';

    constructor() {
        makeAutoObservable(this);
    }

    setLastSync(text: string) {
        this.lastSync = text;
    }

}

const SyncStore = new store;

export { SyncStore }