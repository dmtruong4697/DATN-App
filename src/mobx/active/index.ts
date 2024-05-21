import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { ImageSourcePropType } from 'react-native';

class store {
    lastTransaction: string = (new Date("2000-01-01")).toISOString();
    
    constructor() {
        makeAutoObservable(this);
    }

    setLastTransaction() {
        this.lastTransaction = (new Date()).toISOString();
    }
    
}

const ActiveStore = new store;

export { ActiveStore }