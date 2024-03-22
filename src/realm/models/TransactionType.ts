import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class TransactionType extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    income!: boolean;
    iconUrl!: string;

    static schema = {
        name: 'TransactionType',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            income: 'bool',
            iconUrl: 'string',
        }
    }
}
