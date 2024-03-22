import { useCallback } from "react";
import { RealmContext } from "../../models";
import { BSON } from "realm";
import { Wallet } from "../../models/Wallet";
import { Transaction } from "../../models/Transaction";

export function transactionManager() {
    const {useRealm, useQuery, useObject} = RealmContext
    const realm = useRealm();
    const wallets = useQuery(Wallet);

    const addWallet = useCallback((
        name: string,
        balance: number,
        currencyUnit: string,
    ) => {
        realm.write(() => {
            realm.create(
                'Wallet',
                {
                    _id: new BSON.ObjectId(),
                    name: name,
                    balance: balance,
                    currencyUnit: currencyUnit,
                }
            )
        })
    }, [realm]);

    const getWalletById = useCallback((_id: Realm.BSON.ObjectId) => {
        const wallet = useObject(Wallet, _id);
        return wallet;
    }, [realm]);

    const updateWalletById = useCallback((
        _id: Realm.BSON.ObjectId,
        name: string,
        balance: number,
        currencyUnit: string,
    ) => {
        const wallet = useObject(Wallet, _id);
        
        realm.write(() => {
            wallet!.name = name;
            wallet!.balance = balance;
            wallet!.currencyUnit = currencyUnit;
        });
    }, [realm]);

    const deleteWalletById = useCallback((
        _id: Realm.BSON.ObjectId,
    ) => {
        const wallet = useObject(Wallet, _id);

        const transactions = useQuery(Transaction).filtered(`walletId = ${_id}`);

        realm.delete(transactions);
        realm.delete(wallet);
    }, [realm]);
}