import { useCallback } from "react";
import { RealmContext } from "../../models";
import { BSON } from "realm";
import { Wallet } from "../../models/Wallet";
import { Transaction } from "../../models/Transaction";
import { Realm } from "realm";
import { getTransactionByWalletId } from "../transactions";

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