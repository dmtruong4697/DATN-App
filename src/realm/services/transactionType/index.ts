import { useCallback } from "react";
import { RealmContext } from "../../models";
import { TransactionType } from "../../models/TransactionType";
import { BSON } from "realm";
import { Realm } from "realm";

type TransactionTypeType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    income: boolean;
    iconUrl: string;
}

export function getAllTransactionType(realm: Realm) {
    const transactionTypes = realm.objects<TransactionType>('TransactionType');
    return transactionTypes;
};

export function addTransactionType(
    realm: Realm, 
    transactionType: TransactionTypeType
) {
    realm.write(() => {
      realm.create('TransactionType', transactionType);
    });
};

export function getTransactionTypeById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const transactionType = realm.objectForPrimaryKey<TransactionType>('TransactionType', _id);
    return transactionType;
};

export function deleteTransactionTypeById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const transactionType = realm.objectForPrimaryKey<TransactionType>('TransactionType', _id);

    realm.write(() => {
        realm.delete(transactionType);
    })
};

export function getListTransactionType(
    realm: Realm,
    income: boolean,
) {
    const transactionTypes = realm.objects<TransactionType>('TransactionType');
    return transactionTypes.filtered('income = $0', income);
};
