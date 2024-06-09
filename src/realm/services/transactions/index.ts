import { ContextType, useCallback } from "react";
// import { RealmContext } from "../../models";
import { Transaction } from "../../models/Transaction";
import { BSON, OpenRealmBehaviorType } from "realm";
import { Realm } from "realm";
import { Wallet } from "../../models/Wallet";
import { TransactionStore } from "../../../mobx/transaction";
import { createRealmContext } from "@realm/react";
import { Budget } from "../../models/Budget";
import { RealmContext } from "../../models";
import { WalletSelectList } from "../../../mobx/exportData";
import { ActiveStore } from "../../../mobx/active";
import { SyncStore } from "../../../mobx/sync";

type TransactionType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    income: boolean;
    total: number;
    createAt: string;
    createTime: string;
    transactionTypeId: Realm.BSON.ObjectID;
    walletId: Realm.BSON.ObjectID;
    note: string;
    imageUrl: string[];
}

export function getAllTransaction(realm: Realm) {
    const transactions = realm.objects<Transaction>('Transaction');
    return transactions;
};

export function addTransaction(
    realm: Realm, 
    transaction: TransactionType
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', transaction.walletId);

    // update wallet balance
    realm.write(() => {
        if(transaction.income == true) {
            wallet!.balance = wallet!.balance + transaction.total;
        } else {
            wallet!.balance = wallet!.balance - transaction.total;
        }
    })

    // create transaction
    realm.write(() => {
      realm.create('Transaction', transaction);
    });

    ActiveStore.setLastTransaction();
    SyncStore.setSyncStatus();
};

export function addTransactionSync(
    realm: Realm, 
    transaction: TransactionType
) {
    realm.write(() => {
      realm.create('Transaction', transaction);
    });
};

export function getTransactionById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const transaction = realm.objectForPrimaryKey<Transaction>('Transaction', _id);
    return transaction;
};

export function updateTransactionById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    updatedTransaction: TransactionType,
) {
    const transaction = realm.objectForPrimaryKey<Transaction>('Transaction', _id);
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', transaction!.walletId);

    // return money to wallet
    let balance = wallet?.balance;
    if(transaction!.income == true) {
        balance = balance! - transaction!.total;
    } else {
        balance = balance! + transaction!.total;
    }

    // update wallet balance
    if(updatedTransaction.income == true) {
        balance = balance! + updatedTransaction.total;
    } else {
        balance = balance! - updatedTransaction.total;
    }

    realm.write(() => {
        wallet!.balance = balance!;
    })

    realm.write(() => {
        transaction!.income = updatedTransaction.income;
        transaction!.transactionTypeId = updatedTransaction.transactionTypeId;
        transaction!.total = updatedTransaction.total;
        transaction!.createAt = updatedTransaction.createAt;
        transaction!.createTime = updatedTransaction.createTime;
        transaction!.note = updatedTransaction.note;
    })
};

export function deleteTransactionById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const transaction = realm.objectForPrimaryKey<Transaction>('Transaction', _id);
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', transaction!.walletId);

    //return money to wallet
    let balance = wallet?.balance;
    if(transaction!.income == true) {
        balance = balance! - transaction!.total;
    } else {
        balance = balance! + transaction!.total;
    }
    realm.write(() => {
        wallet!.balance = balance!;
    })

    realm.write(() => {
        realm.delete(transaction);
    })
};

export function getTransactionByWalletId(
    realm: Realm,
    walletId: Realm.BSON.ObjectId,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', walletId);
    const allTransaction = realm.objects<Transaction>('Transaction');

    const transactions = allTransaction.filtered('walletId = $0', walletId);
    return transactions;
}

export function getTransactionByWalletAndDay(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    date: string,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', _id);
    const transactions = realm.objects<Transaction>('Transaction').filtered('walletId = $0 AND createAt = $1', _id, date);

    return transactions;
};

export function getTransactionHistory(
    realm: Realm,
    quantity: number,
) {
    const transactions = realm.objects<Transaction>('Transaction');

    if(transactions.length <= quantity) return transactions;
        else return transactions.slice(Math.max(transactions.length - quantity, 0));
};

export function getTransactionByTime(
    realm: Realm,
    startTime: string,
    finishTime: string,
) {

    // const start = new Date(startTime);
    // const finish = new Date(finishTime);
    // const createTime = newDate()
    const transactions = realm.objects<Transaction>('Transaction').
        filtered('createAt >= $0 AND createAt <= $1', startTime, finishTime);
    
    // let total = 0;
    // transactions.map(item => {
    //     total = total + item.total;
    // })

    // const result = {
    //     transactions: transactions,
    //     total: total,
    // }
    return transactions;
}

export function getIncomeTotalByTime(
    realm: Realm,
    startTime: string,
    finishTime: string,
    currencyUnit: string,
) {
    const transactions = realm.objects<Transaction>('Transaction').
        filtered('createAt >= $0 AND createAt <= $1', startTime, finishTime);
    
    let total = 0;
    transactions.map(item => {
        const wallet = realm.objectForPrimaryKey<Wallet>('Wallet',item.walletId);
        if((item.income) && (wallet?.currencyUnit == currencyUnit)) total = total + item.total;
    })

    return total;
}

export function getExpensesTotalByTime(
    realm: Realm,
    startTime: string,
    finishTime: string,
    currencyUnit: string,
) {
    const transactions = realm.objects<Transaction>('Transaction').
        filtered('createAt >= $0 AND createAt <= $1', startTime, finishTime);
    
    let total = 0;
    transactions.map(item => {
        const wallet = realm.objectForPrimaryKey<Wallet>('Wallet',item.walletId);
        if((!item.income) && (wallet?.currencyUnit == currencyUnit)) total = total + item.total;
    })

    return total;
}

export function getTransactionByWalletListAndTime(
    realm: Realm,
    wallets: WalletSelectList[],
    startTime: string,
    finishTime: string,
) {
    let array: TransactionType[] = [];
    wallets.map((item) => {
        if(item.isSelected) {
        const transactions = getTransactionByWalletId(realm, item.wallet._id).filtered('createAt >= $0 AND createAt<=$1', startTime, finishTime);
        if(transactions.length > 0) array = array.concat(transactions);
        }
    })

    return array[0];
}

export function getTransactionByTypeId(
    realm: Realm,
    typeId: Realm.BSON.ObjectId,
) {
    const allTransaction = realm.objects<Transaction>('Transaction');

    const transactions = allTransaction.filtered('transactionTypeId = $0', typeId);
    return transactions;
}

export function deleteAllTransaction(
    realm: Realm,
) {
    const transactions = realm.objects<Transaction>('Transaction');
    realm.write(() => {
        realm.delete(transactions);
    })
};