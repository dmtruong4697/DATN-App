import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';

class store {
    addTransactionError = ''
    constructor() {
        makeAutoObservable(this);
    }

    setError(text: string) {
        this.addTransactionError = text;
    }
}

const TransactionStore = new store;

export { TransactionStore }