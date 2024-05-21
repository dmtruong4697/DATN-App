import { useCallback } from "react";
import { RealmContext } from "../../models";
import { BSON } from "realm";
import { Wallet } from "../../models/Wallet";
import { Transaction } from "../../models/Transaction";
import { Realm } from "realm";
import { getAllTransaction, getTransactionByWalletId } from "../transactions";
import { ObjectId } from "bson";

type WalletType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    balance: number;
    currencyUnit: string;
}

export function getAllWallet(
    realm: Realm,
) {
    const wallets = realm.objects<Wallet>('Wallet');
    return wallets;
};

export function getWalletById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', _id);
    return wallet;
};

export function addWallet(
    realm: Realm, 
    wallet: WalletType
) {
    realm.write(() => {
      realm.create('Wallet', wallet);
    });
};

export function updateWalletById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    updatedWallet: WalletType,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', _id);

    realm.write(() => {
        wallet!.name = updatedWallet.name;
        wallet!.balance = updatedWallet.balance;
    })
};

export function deleteWalletById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', _id);

    const transactions = getTransactionByWalletId(realm, _id);

    realm.write(() => {
        realm.delete(transactions);
    })

    realm.write(() => {
        realm.delete(wallet);
    })
};

export function getWalletIncomeByWalletAndDay(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    date: string,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', _id);
    const transactions = realm.objects<Transaction>('Transaction').filtered('walletId = $0 AND createAt = $1', _id, date);

    let income = 0;
    transactions.forEach((item) => {
        if(item.income) {
            income = income + item.total;
        }
    })

    return income;
};

export function getWalletExpensesByWalletAndDay(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    date: string,
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', _id);
    const transactions = realm.objects<Transaction>('Transaction').filtered('walletId = $0 AND createAt = $1', _id, date);

    let expenses = 0;
    transactions.forEach((item) => {
        if(!item.income) {
            expenses = expenses + item.total;
        }
    })

    return expenses;
};

export function getWalletIdsByUnit(
    realm: Realm,
    unit: string,
) {
    const w = realm.objects<Wallet>('Wallet');

    const wallets = w.filtered('currencyUnit = $0', unit);
    let result: ObjectId[] = [];
    wallets.map((item) => {
        result.push(item._id);
    })

    return result;
}

export function deleteAllWallet(
    realm: Realm,
) {
    const wallets = realm.objects<Wallet>('Wallet');
    realm.write(() => {
        realm.delete(wallets);
    })
};