import React from 'react';
import { observable, action, makeObservable, makeAutoObservable } from 'mobx';

class store {
    addTransactionError = '';
    updateTransactionError = '';

    constructor() {
        makeAutoObservable(this);
    }

    setAddError(text: string) {
        this.addTransactionError = text;
    }

    setUpdateError(text: string) {
        this.updateTransactionError = text;
    }
}

const TransactionStore = new store;

export { TransactionStore }