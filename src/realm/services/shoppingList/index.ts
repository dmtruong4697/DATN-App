import { useCallback } from "react";
import { RealmContext } from "../../models";
import { BSON } from "realm";
import { Wallet } from "../../models/Wallet";
import { Transaction } from "../../models/Transaction";
import { Realm } from "realm";
import { getAllTransaction, getTransactionByWalletId } from "../transactions";
import { ShoppingList } from "../../models/ShoppingList";
import { ShoppingListItem } from "../../models/ShoppingListItem";

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

export function getAllShoppingList(
    realm: Realm,
) {
    const lists = realm.objects<ShoppingList>('ShoppingList');
    return lists;
};

export function getAllShoppingListItem(
    realm: Realm,
) {
    const items = realm.objects<ShoppingListItem>('ShoppingListItem');
    return items;
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

export function updateShoppingListNameById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    name: string,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);

    realm.write(() => {
        list!.name = name;
    })
};

export function addShoppingListItem(
    realm: Realm, 
    item: ShoppingListItemType
) {
    realm.write(() => {
      realm.create('ShoppingListItem', item);
    });
};

export function getShoppingListItems(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);

    const allItem = realm.objects<ShoppingListItem>('ShoppingListItem');
    const items = allItem.filtered('listId = $0', _id);
    return items;
};

export function getShoppingListItemById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const item = realm.objectForPrimaryKey<ShoppingListItem>('ShoppingListItem', _id);
    return item;
};

// export function updateShoppingListItem(
//     realm: Realm,
//     _id: Realm.BSON.ObjectId,
//     updatedItem: ShoppingListItemType,
// ) {
//     const item = realm.objectForPrimaryKey<ShoppingListItem>('ShoppingListItem', _id);

//     realm.write(() => {
//         item!.name = updatedItem.name;
//         item!.isDone = updatedItem.isDone;
//         item!.note = updatedItem.note;
//         item!.quantity = updatedItem.quantity;
//         item!.price = updatedItem.price;
//         item!.unit = updatedItem.unit;
//         item!.iconUrl = updatedItem.iconUrl;
//     })

//     return item;
// };

export function setIsDoneShoppingListItem(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    isDone: boolean,
) {
    const item = realm.objectForPrimaryKey<ShoppingListItem>('ShoppingListItem', _id);

    realm.write(() => {
        item!.isDone = isDone;
    })

    return item;
};

export function deleteShoppingListItemById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const item = realm.objectForPrimaryKey<ShoppingListItem>('ShoppingListItem', _id);

    realm.write(() => {
        realm.delete(item);
    })
};

export function deleteShoppingListById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);

    const items = getShoppingListItems(realm, _id);

    realm.write(() => {
        realm.delete(items);
    })

    realm.write(() => {
        realm.delete(list);
    })
};

export function getShoppingListProgress(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const list = realm.objectForPrimaryKey<ShoppingList>('ShoppingList', _id);
    const items = realm.objects<ShoppingListItem>('ShoppingListItem').
    filtered('listId = $0', _id);

    const doneItems = realm.objects<ShoppingListItem>('ShoppingListItem').
    filtered('listId = $0 AND isDone = true', _id);

    if(items.length == 0) return {
        percent: 0,
        total: items.length,
        done: doneItems.length,
    }

    return {
        percent: (doneItems.length)/(items.length),
        total: items.length,
        done: doneItems.length,
    };
};

export function deleteAllShoppingList(
    realm: Realm,
) {
    const lists = realm.objects<ShoppingList>('ShoppingList');
    realm.write(() => {
        realm.delete(lists);
    })
};

export function deleteAllShoppingListItem(
    realm: Realm,
) {
    const items = realm.objects<ShoppingListItem>('ShoppingListItem');
    realm.write(() => {
        realm.delete(items);
    })
};