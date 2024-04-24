import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class ShoppingListItem extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    quantity!: number;
    unit!: string;
    iconUrl!: string;
    isDone!: boolean;
    price!: number;
    note!: string;
    listId!: Realm.BSON.ObjectId;

    static schema = {
        name: 'ShoppingListItem',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            quantity: 'int',
            unit: 'string',
            iconUrl: 'string',
            isDone: 'bool',
            price: 'int',
            note: 'string',
            listId: 'objectId',
        }
    }
}