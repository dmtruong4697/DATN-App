import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class Wallet extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    balance!: number;

    static schema = {
        name: 'Wallet',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            balance: 'int',
        }
    }
}
