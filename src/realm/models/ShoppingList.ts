import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class ShoppingList extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    createAt!: string;
    note!: string;
    currencyUnit!: string;

    static schema = {
        name: 'ShoppingList',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            createAt: 'string',
            note: 'string',
            currencyUnit: 'string',
        }
    }
}