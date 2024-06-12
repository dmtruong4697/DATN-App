import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';

class store {
    lastTransaction: Date = new Date("2000-01-01");
    
    constructor() {
        makeAutoObservable(this);
    }

    setLastTransaction() {
        this.lastTransaction = new Date();
    }
    
}

const ActiveStore = new store;

export { ActiveStore }