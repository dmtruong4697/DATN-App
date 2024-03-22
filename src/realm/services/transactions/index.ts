import { useCallback } from "react";
import { RealmContext } from "../../models";
import { Transaction } from "../../models/Transaction";
import { BSON } from "realm";
import { Realm } from "realm";
import { TransactionType } from "../../models/TransactionType";
import { Wallet } from "../../models/Wallet";
import { TransactionStore } from "../../../mobx/transaction";

export function transactionManager() {
    const {useRealm, useQuery, useObject} = RealmContext
    const realm = useRealm();
    const transactions = useQuery(Transaction);

    const getTransactionById = useCallback((_id: Realm.BSON.ObjectId) => {
        const transaction = useObject(Transaction, _id);
        return transaction;
    }, [realm]);

    const addTransaction = useCallback((
        name: string,
        income: boolean,
        total: number,
        createAt: string,
        transactionTypeId: Realm.BSON.ObjectId,
        walletId: Realm.BSON.ObjectId,
        note: string,
        imageUrl: string,
    ) => {

        const wallet = useObject(Wallet, walletId);

        // if((income == false) && (wallet!.balance < total)) {
        //     TransactionStore.setAddError('Not enough money');
        //     return;
        // }

        realm.write(() => {
            realm.create(
                'Transaction',
                {
                    _id: new BSON.ObjectId(),
                    name: name,
                    income: income,
                    total: total,
                    createAt: Date.now().toString(),
                    transactionTypeId: transactionTypeId,
                    walletId: walletId,
                    note: note,
                    imageUrl: imageUrl,
                }
            )
        })

        realm.write(() => {
            if(income) wallet!.balance = wallet!.balance + total;
                else wallet!.balance = wallet!.balance - total;
        })

    }, [realm]);

    const updateTransactionById = useCallback((
        _id: Realm.BSON.ObjectId,
        name: string,
        income: boolean,
        total: number,
        transactionTypeId: Realm.BSON.ObjectId,
        note: string,
        imageUrl: string,
    ) => {
        const transaction = useObject(Transaction, _id);
        const wallet = useObject(Wallet, transaction!.walletId);

        let balance = wallet!.balance;

        //tinh tong vi tam thoi khi hoan lai tien tu giao dich
        if(transaction!.income == true) {
            balance = balance - transaction!.total;
        } else {
            balance = balance + transaction!.total;
        }

        //tinh tong vi sau khi update giao dich
        if(income == true) {
            balance = balance + total;
        } else {
            balance = balance - total;
        }

        //thong bao khi loi
        // if(balance < 0) {
        //     TransactionStore.setUpdateError('Not enough money');
        //     return;
        // }

        realm.write(() => {
            wallet!.balance = balance;
        })

        realm.write(() => {
            transaction!.name = name;
            transaction!.income = income;
            transaction!.total = total;
            transaction!.transactionTypeId = transactionTypeId;
            transaction!.note = note;
            transaction!.imageUrl = imageUrl;
        });


    }, [realm]);

    const deleteTransactionById = useCallback((_id: Realm.BSON.ObjectId) => {
        const transaction = useObject(Transaction, _id);
        const wallet = useObject(Wallet, transaction!.walletId);

        let balance = wallet!.balance;
        if(transaction!.income == true) {
            balance = balance - transaction!.total;
        } else {
            balance = balance + transaction!.total;
        }

        realm.write(() => {
            wallet!.balance = balance;
        })

        realm.write(() => {
            realm.delete(transaction);
        });
    }, [realm]);
}