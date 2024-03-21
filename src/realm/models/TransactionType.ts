import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class TransactionType extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    type!: string;
    iconUrl!: string;

    static schema = {
        name: 'TransactionType',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            type: 'string',
            iconUrl: 'string',
        }
    }
}
