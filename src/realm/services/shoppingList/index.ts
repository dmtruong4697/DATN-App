import { useCallback } from "react";
import { RealmContext } from "../../models";
import { BSON } from "realm";
import { Wallet } from "../../models/Wallet";
import { Transaction } from "../../models/Transaction";
import { Realm } from "realm";
import { getAllTransaction, getTransactionByWalletId } from "../transactions";
import { ShoppingList } from "../../models/ShoppingList";

type ShoppingListItemType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    quantity: number;
    unit: string;
    iconUrl: string;
    isDone: boolean;
    price: number;
    note: string;
    listId: Realm.BSON.ObjectId;
}

type ShoppingListType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    createAt: string;
    note: string;
    currencyUnit: string;
}

export function getShoppingList(
    realm: Realm,
) {
    const lists = realm.objects<ShoppingList>('ShoppingList');
    return lists;
};

export function getShoppingListById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);
    return list;
};

export function addShoppingList(
    realm: Realm, 
    list: ShoppingListType
) {
    realm.write(() => {
      realm.create('ShoppingList', list);
    });
};

export function updateShoppingListById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    updatedList: ShoppingListType,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);

    realm.write(() => {
        list!.name = updatedList.name;
        list!.note = updatedList.note;
    })
};

export function deleteShoppingListById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);

    // const items = getTransactionByWalletId(realm, _id);

    realm.write(() => {
        realm.delete(items);
    })

    realm.write(() => {
        realm.delete(list);
    })
};