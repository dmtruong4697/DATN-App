import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class Saving extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    total!: number;
    createAt!: string;
    profit!: number;

    static schema = {
        name: 'Saving',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            total: 'number',
            createAt: 'string',
            profit: 'number',
        }
    }
}